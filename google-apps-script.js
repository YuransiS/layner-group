/**
 * Google Apps Script для Layner Group CRM
 * 
 * Автоматически создает структуру таблицы с разделением на:
 * - Колонки из формы (заполняются сайтом + IP/Geo по Vercel)
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
    var dateStr = Utilities.formatDate(now, "Europe/Warsaw", "dd.MM.yyyy");
    var timeStr = Utilities.formatDate(now, "Europe/Warsaw", "HH:mm:ss");

    var nextRow = sheet.getLastRow() + 1;
    var companyId = "LG-" + ("0000" + (nextRow - 1)).slice(-5);

    // 3. Формирование строки согласно ТЗ
    var rowData = [
      // Автоматические колонки:
      dateStr,                                                              // 1. Дата заявки
      timeStr,                                                              // 2. Время заявки
      data.name ? (companyId + " (" + data.name + ")") : companyId,         // 3. ID компании / Заявитель
      data.phone || "",                                                     // 4. Номер телефона
      data.email || "—",                                                    // 5. Email (если оставили на сайте)
      data.has_license || "Да",                                             // 6. Есть ли лицензии
      data.company_status || "Работает (активна)",                          // 7. Работают ли (статус деятельности)
      data.truck_details || "—",                                            // 8. Машины и вес
      data.departure || "—",                                                // 9. Откуда выезд
      data.ip || "—",                                                       // 10. IP адрес (определен через Vercel)
      data.geo || "—",                                                      // 11. Геолокация (Страна / Город)
      data.form_type === "quick_hero" ? "Быстрая (Hero)" : "Полная заявка", // 12. Тип формы
      (data.language || "RU").toUpperCase(),                                // 13. Язык заявки
      data.source || "",                                                    // 14. Источник (URL)

      // Колонки для менеджера (заполняются вручную):
      "",                                                                   // 15. Ответственный менеджер
      "новая",                                                              // 16. Статус (по умолчанию "новая")
      "",                                                                   // 17. Дата и время первого контакта
      "",                                                                   // 18. Комментарий
      ""                                                                    // 19. Следующий шаг и дата
    ];

    sheet.appendRow(rowData);

    // 4. Добавляем выпадающий список (Data Validation) для колонки статуса (Колонка 16)
    var statusCell = sheet.getRange(nextRow, 16);
    var rule = SpreadsheetApp.newDataValidation()
      .requireValueInList(STATUS_OPTIONS, true)
      .setAllowInvalid(false)
      .build();
    statusCell.setDataValidation(rule);

    return ContentService.createTextOutput(
      JSON.stringify({ status: "success", id: companyId, ip: data.ip })
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

function ensureHeaders(sheet) {
  if (sheet.getLastRow() > 0) return;

  var headers = [
    // 1-14: Автоматические колонки
    "Дата заявки",
    "Время заявки",
    "ID компании",
    "Номер телефона",
    "Email (если оставили на сайте)",
    "Есть ли лицензии",
    "Работают ли (статус деятельности)",
    "Машины и вес",
    "Откуда выезд",
    "IP адрес",
    "Геолокация",
    "Тип формы",
    "Язык заявки",
    "Источник",

    // 15-19: Колонки для менеджера
    "Ответственный менеджер",
    "Статус",
    "Дата и время первого контакта",
    "Комментарий",
    "Следующий шаг и дата"
  ];

  sheet.appendRow(headers);

  // Стилизация колонок формы (Teal #237D73)
  var autoRange = sheet.getRange(1, 1, 1, 14);
  autoRange.setBackground("#237D73")
    .setFontColor("#FFFFFF")
    .setFontWeight("bold")
    .setHorizontalAlignment("center");

  // Стилизация колонок менеджера (Dark Slate #123D39 + Lime #D9FF43)
  var managerRange = sheet.getRange(1, 15, 1, 5);
  managerRange.setBackground("#123D39")
    .setFontColor("#D9FF43")
    .setFontWeight("bold")
    .setHorizontalAlignment("center");

  sheet.setFrozenRows(1);
  sheet.setRowHeight(1, 40);

  sheet.setColumnWidth(1, 110);
  sheet.setColumnWidth(2, 100);
  sheet.setColumnWidth(3, 200);
  sheet.setColumnWidth(4, 160);
  sheet.setColumnWidth(5, 180);
  sheet.setColumnWidth(6, 140);
  sheet.setColumnWidth(7, 160);
  sheet.setColumnWidth(8, 180);
  sheet.setColumnWidth(9, 150);
  sheet.setColumnWidth(10, 130);
  sheet.setColumnWidth(11, 140);
  sheet.setColumnWidth(12, 130);
  sheet.setColumnWidth(13, 100);
  sheet.setColumnWidth(14, 150);

  sheet.setColumnWidth(15, 170);
  sheet.setColumnWidth(16, 140);
  sheet.setColumnWidth(17, 180);
  sheet.setColumnWidth(18, 220);
  sheet.setColumnWidth(19, 180);
}
