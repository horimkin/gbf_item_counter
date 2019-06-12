function updateDefinition() {
    var master_ss = SpreadsheetApp.openById("14CaUJow1-Hylcwio8p7rmGDq-jgncH38OLjdHxNRgtA")
    var masterSheet = master_ss.getSheetByName("definition")
    var lastCol = masterSheet.getLastColumn()
    var lastRow = masterSheet.getLastRow()
    var masterData = masterSheet.getRange(1, 1, lastRow, lastCol).getValues()

    var mySheet = getSheet("アイテム定義")
    mySheet.clear()
    mySheet.getRange(1, 1, lastRow, lastCol).setValues(masterData)
}