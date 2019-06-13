function addColumns(sheet) {
    var addColumnNum = 50
    
    var dataSheet = sheet
    var dataMaxCol = dataSheet.getMaxColumns()

    dataSheet.insertColumnsAfter(dataMaxCol, addColumnNum)

    var refSheet = getSheet(dataSheet.getName() + "(グラフ用)")
    var refMaxCol = refSheet.getMaxColumns()
    var refMaxRow = refSheet.getMaxRows()
    var srcRange = refSheet.getRange(1, refMaxCol, refMaxRow)
    var dstRange = refSheet.getRange(1, refMaxCol, refMaxRow, refMaxCol + addColumnNum)

    refSheet.insertColumnsAfter(refMaxCol, addColumnNum)
    srcRange.autoFill(dstRange, SpreadsheetApp.AutoFillSeries.DEFAULT_SERIES)

    updateChartArea(refSheet)
}

function updateChartArea(sheet) {
    var names = ["items(グラフ用)","treasure(グラフ用)","ticket(グラフ用)"]
    var index = names.indexOf(sheet.getName())
    var chartSheet = getSheet("グラフ")
    var chart = chartSheet.getCharts()[index]

    chart = chart.modify().clearRanges().addRange(sheet.getRange(1, 2, sheet.getMaxRows(), sheet.getMaxColumns())).build()
    chartSheet.updateChart(chart)
}