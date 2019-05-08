var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var game;
(function (game) {
    var RoleItem = (function (_super) {
        __extends(RoleItem, _super);
        function RoleItem() {
            var _this = _super.call(this) || this;
            var self = _this;
            self.skinName = "resource/skins/wuHun/RoleItemSkin.exml";
            DLG.DLGCore.event.addEventListener(_this, egret.TouchEvent.TOUCH_TAP, self, self.onBtnTouchHandler);
            return _this;
        }
        RoleItem.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            var self = this;
            if (self.isInitView == false) {
                return;
            }
            self.info = self.data;
            if (self.info) {
                self.icon_title.source = "wuHun_head_title_" + self.info.wuHunLv + "_png";
                self.icon_img.source = "wuHun_head_" + self.info.modelId + "_png";
            }
            else {
                self.icon_title.source = null;
                self.icon_img.source = null;
            }
        };
        RoleItem.prototype.onBtnTouchHandler = function () {
            if (RoleItem.onCallBack) {
                RoleItem.onCallBack.call(RoleItem.onCallTarget, this.info, this.itemIndex);
            }
        };
        RoleItem.prototype.onDestroy = function () {
            _super.prototype.onDestroy.call(this);
        };
        return RoleItem;
    }(DLG.CItemRenderer));
    game.RoleItem = RoleItem;
    __reflect(RoleItem.prototype, "game.RoleItem");
})(game || (game = {}));
//# sourceMappingURL=RoleItem.js.map