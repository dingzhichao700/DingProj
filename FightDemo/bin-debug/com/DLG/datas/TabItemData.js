var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var DLG;
(function (DLG) {
    var TabItemData = (function () {
        function TabItemData() {
        }
        TabItemData.prototype.onDestroy = function () {
            this.label = null;
            this.color = null;
            this.strokeColor = null;
            this.data = null;
        };
        return TabItemData;
    }());
    DLG.TabItemData = TabItemData;
    __reflect(TabItemData.prototype, "DLG.TabItemData");
})(DLG || (DLG = {}));
//# sourceMappingURL=TabItemData.js.map