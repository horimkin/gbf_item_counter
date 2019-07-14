function updateDefinition() {
  var master_ss = SpreadsheetApp.openById('14CaUJow1-Hylcwio8p7rmGDq-jgncH38OLjdHxNRgtA');
  sheetNames = ['アイテム定義', '参照用アイテム定義', 'アイテム種別対照表'];

  sheetNames.forEach(function(name) {
    copyData(master_ss, name);
  });
}

function copyData(origin_ss, sheetName) {
  var src = origin_ss.getSheetByName(sheetName);
  var dst = getSheet(sheetName);
  var lastCol = src.getLastColumn();
  var lastRow = src.getLastRow();
  var data = src.getRange(1, 1, lastRow, lastCol).getValues();

  dst.clear();
  dst.getRange(1, 1, lastRow, lastCol).setValues(data);
}
