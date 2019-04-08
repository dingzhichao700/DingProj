var egret;
(function (egret) {
    /**
     * 伤害数据
     */
    var DamageDataItem = (function () {
        function DamageDataItem() {
        }
        var __egretProto__ = DamageDataItem.prototype;
        Object.defineProperty(__egretProto__, "isDodge", {
            get: function () {
                return this._isDodge;
            },
            /**
             * 是否闪避
             */
            set: function (value) {
                this._isDodge = value;
                if (value)
                    this.value = 0;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 清空数据
         */
        __egretProto__.clear = function () {
            this.value = 0;
            this.isCritical = false;
            this._isDodge = false;
        };
        return DamageDataItem;
    })();
    egret.DamageDataItem = DamageDataItem;
    DamageDataItem.prototype.__class__ = "egret.DamageDataItem";
})(egret || (egret = {}));
//# sourceMappingURL=DamageDataItem.js.map