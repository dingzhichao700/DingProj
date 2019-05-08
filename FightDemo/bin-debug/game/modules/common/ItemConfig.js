var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret;
(function (egret) {
    var ItemConfig = (function () {
        function ItemConfig() {
            this.id = 0;
            this.name = "";
            this.quality = 0;
        }
        return ItemConfig;
    }());
    egret.ItemConfig = ItemConfig;
    __reflect(ItemConfig.prototype, "egret.ItemConfig");
})(egret || (egret = {}));
//# sourceMappingURL=ItemConfig.js.map