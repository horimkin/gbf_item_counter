ss = SpreadsheetApp.getActiveSpreadsheet()

function onOpen() {
    menu = SpreadsheetApp.getUi().createMenu('スクリプト')
    menu.addItem('HTMLファイル読み込み', 'openDialog')
    menu.addItem('アイテム定義更新', 'updateDefinition')
    menu.addToUi();
}

function openDialog() {
    var html = HtmlService.createHtmlOutputFromFile("open_dialog")
    SpreadsheetApp.getUi().showModalDialog(html, "HTMLファイル読み込み")
}

function getSheet(name) {
    var sheet = ss.getSheetByName(name)
    if (sheet == null) {
        sheet = ss.insertSheet(name)
    }

    return sheet
}

function recordData(form) {
    var html = form.htmlFile.getDataAsString()
    html = trimHtmlString(html)
    var itemData = countItem(html)
    writeData(itemData.items, itemData.itemType)

    Browser.msgBox("保存完了！")
    console.log("completed");
}

function trimHtmlString(html) {
    var trimedStr = html.slice(html.indexOf("<html"), html.lastIndexOf("</html>") + "</html>".length)
    trimedStr = trimedStr.replace(/(<iframe[\s\S]*?<\/iframe>|<head[\s\S]*?<\/head>|<script[\s\S]*?<\/script>)/g, "")
    return trimedStr
}