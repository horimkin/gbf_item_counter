function countItem(html) {
    var $ = Cheerio.load(html)
    return {items: getItems($), itemType:getItemType($)}
}

function getItems($) {
    var elements = $('.lis-item')
    var items = new Array(elements.length)

    elements.each(function (i, element) {
        var itemCategory = getItemCategory($(this))
        var imgName = getImgName($(this))
        var itemNum = $(this).children().eq(1).text()

        items[i] = [itemCategory, imgName, itemNum]
    })

    return items
}

function getItemType($) {
    var classNames = $('.btn-item-tabs.active').attr("class").split(" ")

    // 不要に探索しているのであとで修正
    var itemType = classNames.filter(function (className) {
        return !["btn-item-tabs", "active"].some(function (str) {
            return str === className
        })
    }).toString()

    return itemType
}

function getItemCategory(elm) {
    // "lis-item se"や"lis-item btn-evolution-weapon"等から種別を取得する
    var classNames = elm.attr('class').split(" ")
    var itemCategory = classNames.filter(function (str) {
        return str !== "lis-item"
    }).toString().replace("btn-", "")

    return itemCategory
}

function getImgName(elm) {
    // 元のlocationは"~/item/recycling/s/1.jpg"や"~/item/normal/s/1.jpg"のようにファイル名が重複しており、
    // ダウンロード時に1(1).jpgのように置き換えられるので除去する
    var imgSrc = elm.children().eq(0).attr("src")
    var imgName = imgSrc.substr(imgSrc.lastIndexOf("/") + 1)
    return imgName.replace(/\([0-9]+\)/, "")
}
