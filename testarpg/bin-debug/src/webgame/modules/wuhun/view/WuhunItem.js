var egret;
(function (egret) {
    var WuhunItem = (function (_super) {
        __extends(WuhunItem, _super);
        function WuhunItem() {
            _super.call(this);
            this._skillId = 0;
            this.skinName = "ui.wuhun.WuhunItemSkin";
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchHandler, this);
        }
        var __egretProto__ = WuhunItem.prototype;
        Object.defineProperty(__egretProto__, "skillId", {
            set: function (value) {
                this._skillId = value;
                this.update();
            },
            enumerable: true,
            configurable: true
        });
        __egretProto__.onCreate = function () {
            _super.prototype.onCreate.call(this);
            this.update();
        };
        __egretProto__.update = function () {
            if (this.isCreate) {
                if (this._skillId != 0) {
                    this.imgIcon.source = "resource/skill/" + this._skillId + ".png";
                }
            }
        };
        __egretProto__.onTouchHandler = function (e) {
            if (this._skillId != 0) {
                egret.SkillControl.getInstance().openskillTip(this._skillId);
            }
        };
        return WuhunItem;
    })(egret.BaseView);
    egret.WuhunItem = WuhunItem;
    WuhunItem.prototype.__class__ = "egret.WuhunItem";
})(egret || (egret = {}));
//# sourceMappingURL=WuhunItem.js.map