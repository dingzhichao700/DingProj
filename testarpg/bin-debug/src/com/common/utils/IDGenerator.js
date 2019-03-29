var egret;
(function (egret) {
    var IDGenerator = (function () {
        function IDGenerator(startId) {
            if (startId === void 0) { startId = 0; }
            this._id = 0;
            this._id = startId;
        }
        var __egretProto__ = IDGenerator.prototype;
        /**
         * 从0开始生成一个整型 ID值，介于最小值和最大值之间，ID值不断递增或增减，达到限制值后返回另一极端的限制值
         * @param isIncrease 是否递增
         * @returns {number}
         */
        __egretProto__.getID = function (isIncrease) {
            if (isIncrease === void 0) { isIncrease = true; }
            var id = this._id;
            if (isIncrease) {
                if (this._id >= IDGenerator.MAX_VALUE) {
                    this._id = IDGenerator.MIN_VALUE;
                }
                else {
                    this._id++;
                }
            }
            else {
                if (this._id <= IDGenerator.MIN_VALUE) {
                    this._id = IDGenerator.MAX_VALUE;
                }
                else {
                    this._id--;
                }
            }
            return id;
        };
        /**
         * 最大值，为int的最大值
         * @type {number}
         */
        IDGenerator.MAX_VALUE = 2147483647;
        /**
         * 最小值，为int的最小值
         * @type {number}
         */
        IDGenerator.MIN_VALUE = -2147483648;
        return IDGenerator;
    })();
    egret.IDGenerator = IDGenerator;
    IDGenerator.prototype.__class__ = "egret.IDGenerator";
})(egret || (egret = {}));
