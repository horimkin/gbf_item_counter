function writeData(data, sheetName) {
    var sheet = getSheet(sheetName)

    if (sheet.getLastColumn()) {
        updateData(data, sheet)
    } else {
        initData(data, sheet)
    }
}

function initData(data, sheet) {
    sheet.getRange(2, 1, data.length, 3).setValues(data)
    writeTimestamp(sheet, 3)
}

function updateData(data, sheet) {
    var lastCol = sheet.getLastColumn()
    var lastRow = sheet.getLastRow()
    var recordedDataLength = lastRow - 1
    var recordedIds = sheet.getRange(2, 1, recordedDataLength, 2).getValues()
    var maxCol = sheet.getMaxColumns()

    if (lastCol >= maxCol) {
        addColumns(sheet)
    }

    var updData = new Array()
    var newData = new Array()
    var padding = (new Array(lastCol - 2)).fill(0)

    data.forEach(function (dat) {
        var recorded = recordedIds.some(function (id, i) {
            if (dat[0] === id[0] && dat[1] === id[1]) {
                updData.push([dat[2]])
                recordedIds.splice(i, 1)
                return true
            } else {
                return false
            }
        })

        if (!recorded) {
            var index = newData.push(dat) - 1
            Array.prototype.splice.apply(newData[index], [2, 0].concat(padding))
        }
    })

    sheet.getRange(2, lastCol + 1, recordedDataLength, 1).setValues(updData)

    if (newData.length > 0) {
        sheet.getRange(lastRow + 1, 1, newData.length, lastCol + 1).setValues(newData)
    }

    writeTimestamp(sheet, lastCol + 1)
}

function storeTimestamp(unixtime) {
    var sheet = getSheet("temp")
    sheet.hideSheet()
    sheet.getRange(1, 2).setValue(new Date(unixtime))

    console.log("completed");
}

function writeTimestamp(sheet, col) {
    date = getSheet("temp").getRange(1, 2).getValue()
    sheet.getRange(1, col).setValue(date)
}