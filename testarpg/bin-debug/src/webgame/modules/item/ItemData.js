var egret;
(function (egret) {
    var ItemData = (function () {
        function ItemData() {
            this.id = 0;
            this.num = 0;
        }
        var __egretProto__ = ItemData.prototype;
        Object.defineProperty(__egretProto__, "cfg", {
            get: function () {
                return egret.ItemManager.getInstance().getCfg(this.id);
            },
            enumerable: true,
            configurable: true
        });
        return ItemData;
    })();
    egret.ItemData = ItemData;
    ItemData.prototype.__class__ = "egret.ItemData";
})(egret || (egret = {}));
//# sourceMappingURL=ItemData.js.map