var egret;
(function (egret) {
    var WuhunItem = (function (_super) {
        __extends(WuhunItem, _super);
        function WuhunItem() {
            _super.call(this);
            this.skinName = "ui.wuhun.WuhunItemSkin";
        }
        var __egretProto__ = WuhunItem.prototype;
        Object.defineProperty(__egretProto__, "skillId", {
            set: function (value) {
                this._skillId = value;
            },
            enumerable: true,
            configurable: true
        });
        return WuhunItem;
    })(egret.BaseView);
    egret.WuhunItem = WuhunItem;
    WuhunItem.prototype.__class__ = "egret.WuhunItem";
})(egret || (egret = {}));
