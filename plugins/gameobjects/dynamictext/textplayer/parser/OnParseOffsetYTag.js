var OnParseOffsetYTag = function (dynamicText, parser) {
    var defaultOffsetY;
    parser
        .on('start', function () {
            defaultOffsetY = dynamicText.textStyle.offsetY;
            dynamicText.textStyle.setOffsetY(0);
        })
        .on('+y', function (y) {
            if (y === undefined) {
                y = defaultOffsetY;
            }
            dynamicText.textStyle.setOffsetY(y);
        })
        .on('-y', function () {
            dynamicText.textStyle.setOffsetY(0);
        })
        .on('complete', function () {
            dynamicText.textStyle.setOffsetY(0);
        })
}

export default OnParseOffsetYTag;