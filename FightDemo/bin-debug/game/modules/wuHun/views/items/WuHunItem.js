var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var WuHunItem = (function () {
    function WuHunItem(main) {
        this._main = main;
        this.icon_img = this._main["icon_img"];
    }
    WuHunItem.prototype.updateView = function (open, itemId1) {
        this.icon_img.source = open ? "goods_" + itemId1 + "_png" : "wuHun_add_icon_png";
    };
    return WuHunItem;
}());
__reflect(WuHunItem.prototype, "WuHunItem");
//# sourceMappingURL=WuHunItem.js.map