function updateDefinition() {
    var master_ss = SpreadsheetApp.openById("14CaUJow1-Hylcwio8p7rmGDq-jgncH38OLjdHxNRgtA")
    var masterSheet = master_ss.getSheetByName("definition")
    var mySheet = ss.getSheetByName("アイテム定義")
    if (mySheet) {
        ss.deleteSheet(mySheet)
    }
    masterSheet.copyTo(ss).setName("アイテム定義")
}