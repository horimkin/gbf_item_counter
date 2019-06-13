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

    updateFilter(refSheet)
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

function updateFilter(sheet) {
    var filter = sheet.getFilter()
    var typeCriteria = filter.getColumnFilterCriteria(1)
    var nameCriteria = filter.getColumnFilterCriteria(2)

    filter.remove()
    filter = sheet.getRange(1, 1, sheet.getMaxRows(), sheet.getMaxColumns()).createFilter()
    
    // フィルターの条件を指定していなければgetColumnFilterCriteriaでnullが帰ってくる
    // setColumnFilterCriteriaにnullを指定すると応答がなくなる
    if (typeCriteria) {
        filter.setColumnFilterCriteria(1, typeCriteria)
    }
    if (nameCriteria) {
        filter.setColumnFilterCriteria(2, nameCriteria)    
    }
}