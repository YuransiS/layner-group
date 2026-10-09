/**
 * Google Apps Script для Layner Group CRM
 * 
 * Автоматически создает структуру таблицы с разделением на:
 * - Колонки из формы (заполняются сайтом)
 * - Колонки для менеджера (с выпадающим списком статусов)
 */

var STATUS_OPTIONS = [
  "новая",
  "в работе",
  "не дозвонились",
  "квалифицирована",
  "отказ",
  "сделка"
];

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var doc = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = doc.getSheetByName("Заявки") || doc.getActiveSheet();

    // 1. Инициализация шапки при пустой таблице
    ensureHeaders(sheet);

    // 2. Получение данных из запроса
    var data = {};
    if (e.parameter && Object.keys(e.parameter).length > 0) {
      data = e.parameter;
    } else if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {}
    }

    var now = new Date();
    // Часовой пояс (Варшава / Европа)
    var dateStr = Utilities.formatDate(now, "Europe/Warsaw", "dd.MM.yyyy");
    var timeStr = Utilities.formatDate(now, "Europe/Warsaw", "HH:mm:ss");

    var nextRow = sheet.getLastRow() + 1;
    var companyId = "LG-" + ("0000" + (nextRow - 1)).slice(-5);

    // 3. Формирование строки согласно ТЗ
    var rowData = [
      // Автоматические колонки:
      dateStr,                                              // 1. Дата заявки
      timeStr,                                              // 2. Время заявки
      data.name ? (companyId + " (" + data.name + ")") : companyId, // 3. ID компании / Заявитель
      data.phone || "",                                     // 4. Номер телефона
      data.email || "—",                                    // 5. Email (если оставили на сайте)
      data.has_license || "Да",                             // 6. Есть ли лицензии (ЕС + CMR)
      data.company_status || "Работает (активна)",          // 7. Работают ли (статус деятельности)
      data.truck_details || "—",                            // 8. Количество машин и тоннаж
      data.departure || "—",                                // 9. Откуда выезд
      data.form_type === "quick_hero" ? "Быстрая (Hero)" : "Полная квалификация", // 10. Тип формы
      (data.language || "RU").toUpperCase(),                // 11. Язык
      data.source || "",                                    // 12. Источник (URL)

      // Колонки для менеджера (заполняются вручную):
      "",                                                   // 13. Ответственный менеджер
      "новая",                                              // 14. Статус (по умолчанию "новая")
      "",                                                   // 15. Дата и время первого контакта
      "",                                                   // 16. Комментарий
      ""                                                    // 17. Следующий шаг и дата
    ];

    sheet.appendRow(rowData);

    // 4. Добавляем выпадающий список (Data Validation) для колонки статуса
    var statusCell = sheet.getRange(nextRow, 14);
    var rule = SpreadsheetApp.newDataValidation()
      .requireValueInList(STATUS_OPTIONS, true)
      .setAllowInvalid(false)
      .build();
    statusCell.setDataValidation(rule);

    return ContentService.createTextOutput(
      JSON.stringify({ status: "success", id: companyId })
    ).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ status: "error", message: err.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  var doc = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = doc.getSheetByName("Заявки") || doc.getActiveSheet();
  ensureHeaders(sheet);

  return ContentService.createTextOutput(
    JSON.stringify({ status: "ok", message: "Layner Group CRM Webhook is active" })
  ).setMimeType(ContentService.MimeType.JSON);
}

/**
 * Создает и стилизует структуру колонок в таблице
 */
function ensureHeaders(sheet) {
  if (sheet.getLastRow() > 0) return;

  var headers = [
    // 1-12: Автоматические колонки
    "Дата заявки",
    "Время заявки",
    "ID компании",
    "Номер телефона",
    "Email (если оставили на сайте)",
    "Есть ли лицензии",
    "Работают ли (статус деятельности)",
    "Машины и вес",
    "Откуда выезд",
    "Тип формы",
    "Язык заявки",
    "Источник",

    // 13-17: Колонки для менеджера
    "Ответственный менеджер",
    "Статус",
    "Дата и время первого контакта",
    "Комментарий",
    "Следующий шаг и дата"
  ];

  sheet.appendRow(headers);

  // Стилизация автоматических колонок (Teal #237D73)
  var autoRange = sheet.getRange(1, 1, 1, 12);
  autoRange.setBackground("#237D73")
    .setFontColor("#FFFFFF")
    .setFontWeight("bold")
    .setHorizontalAlignment("center");

  // Стилизация колонок менеджера (Dark Slate / Graphite #123D39)
  var managerRange = sheet.getRange(1, 13, 1, 5);
  managerRange.setBackground("#123D39")
    .setFontColor("#D9FF43")
    .setFontWeight("bold")
    .setHorizontalAlignment("center");

  sheet.setFrozenRows(1);
  sheet.setRowHeight(1, 40);

  // Выравнивание ширины колонок
  sheet.setColumnWidth(1, 110); // Дата
  sheet.setColumnWidth(2, 100); // Время
  sheet.setColumnWidth(3, 180); // ID / Компания
  sheet.setColumnWidth(4, 160); // Телефон
  sheet.setColumnWidth(5, 180); // Email
  sheet.setColumnWidth(6, 140); // Лицензии
  sheet.setColumnWidth(7, 160); // Работают ли
  sheet.setColumnWidth(8, 180); // Машины
  sheet.setColumnWidth(9, 150); // Выезд
  sheet.setColumnWidth(10, 130); // Форма
  sheet.setColumnWidth(11, 100); // Язык
  sheet.setColumnWidth(12, 150); // Источник

  sheet.setColumnWidth(13, 170); // Менеджер
  sheet.setColumnWidth(14, 140); // Статус
  sheet.setColumnWidth(15, 180); // Первый контакт
  sheet.setColumnWidth(16, 220); // Комментарий
  sheet.setColumnWidth(17, 180); // След. шаг
}
