var egret;
(function (egret) {
    var NumberUtil = (function () {
        /**
         * 构造函数
         */
        function NumberUtil() {
            throw new Error("NumberUtil just is a static class.");
        }
        var __egretProto__ = NumberUtil.prototype;
        //
        /**
         * 返回指定位数数值字符串，位数不足时高位补0
         * @param value:Number 一个数值
         * @param count:int 返回的字符串位数
         * @return String
         *
         */
        NumberUtil.getMultipleValue = function (value, count) {
            if (count === void 0) { count = 2; }
            var result = value + "";
            while (result.length < count) {
                result = "0" + result;
            }
            return result;
        };
        //
        /**
         * 限制对象的值，若小于最小值则返回最小值，若大于最大值则最大值，否则返回原值
         * @param value:Number 当前值
         * @param min:Number 最小值
         * @param max:Number 最大值
         * @return
         *
         */
        NumberUtil.limitValue = function (value, min, max) {
            if (min === void 0) { min = NaN; }
            if (max === void 0) { max = NaN; }
            if (!isNaN(min) && value < min)
                value = min;
            if (!isNaN(max) && value > max)
                value = max;
            return value;
        };
        return NumberUtil;
    })();
    egret.NumberUtil = NumberUtil;
    NumberUtil.prototype.__class__ = "egret.NumberUtil";
})(egret || (egret = {}));
//# sourceMappingURL=NumberUtil.js.map