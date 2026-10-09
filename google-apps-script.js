/**
 * Google Apps Script для приема заявок с сайта Layner Group
 * Вставьте данный код в Extensions -> Apps Script вашей Google Таблицы.
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var doc = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = doc.getSheetByName("Лиды") || doc.getActiveSheet();

    // Если таблица пустая, создаем шапку таблицы
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Дата и время",
        "Имя / Компания",
        "Телефон / WhatsApp",
        "Машины и тоннаж",
        "Откуда выезд",
        "Лицензия ЕС и CMR",
        "Тип формы",
        "Язык",
        "Источник"
      ]);
      // Стилизуем строку заголовков
      sheet.getRange(1, 1, 1, 9).setFontWeight("bold").setBackground("#237D73").setFontColor("#FFFFFF");
      sheet.setFrozenRows(1);
    }

    var data = {};

    // 1. Попытка распарсить как URL-encoded / Form parameter
    if (e.parameter && Object.keys(e.parameter).length > 0) {
      data = e.parameter;
    }
    // 2. Попытка распарсить JSON payload, если пришел в postData
    else if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        // Fallback
      }
    }

    var dateStr = Utilities.formatDate(new Date(), "Europe/Warsaw", "yyyy-MM-dd HH:mm:ss");

    var row = [
      data.created_at || dateStr,
      data.name || "",
      data.phone || "",
      data.truck_details || "—",
      data.departure || "—",
      data.has_license || "—",
      data.form_type === "quick_hero" ? "Быстрая (Hero)" : "Полная заявка",
      (data.language || "").toUpperCase(),
      data.source || ""
    ];

    sheet.appendRow(row);

    return ContentService.createTextOutput(
      JSON.stringify({ status: "success", message: "Lead saved successfully" })
    ).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ status: "error", error: err.toString() })
    ).setMimeType(ContentService.MimeType.JSON);

  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return ContentService.createTextOutput(
    JSON.stringify({ status: "ok", message: "Layner Group Webhook is active" })
  ).setMimeType(ContentService.MimeType.JSON);
}
