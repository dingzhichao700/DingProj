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
    var WeaponItem = (function (_super) {
        __extends(WeaponItem, _super);
        function WeaponItem() {
            var _this = _super.call(this) || this;
            var self = _this;
            self.skinName = "resource/skins/weapon/WeaponItemSkin.exml";
            DLG.DLGCore.event.addEventListener(_this, egret.TouchEvent.TOUCH_TAP, self, self.onBtnTouchHandler);
            return _this;
        }
        WeaponItem.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            var self = this;
            if (self.isInitView == false) {
                return;
            }
            self.info = self.data;
            self.title_img.visible = self.info ? true : false;
            // self.label_txt.visible = self.info ? true :false;
            self.label_txt.visible = false;
            self.icon_lock.visible = self.info ? false : true;
            if (self.info) {
                // self.label_txt.text = self.info.name;
                self.new_icon.visible = self.info.isNew;
                self.icon_img.source = "head_icon" + self.info.weaponId + "_png";
                self.name_img.source = "weapon_title_" + self.info.weaponId + "_png";
            }
            else {
                self.new_icon.visible = false;
                // self.label_txt.text = "";
                self.icon_img.source = null;
                self.name_img.source = null;
            }
        };
        WeaponItem.prototype.onBtnTouchHandler = function () {
            if (WeaponItem.onCallBack) {
                WeaponItem.onCallBack.call(WeaponItem.onCallTarget, this.info, this.itemIndex);
            }
        };
        WeaponItem.prototype.onDestroy = function () {
            _super.prototype.onDestroy.call(this);
        };
        return WeaponItem;
    }(DLG.CItemRenderer));
    game.WeaponItem = WeaponItem;
    __reflect(WeaponItem.prototype, "game.WeaponItem");
})(game || (game = {}));
//# sourceMappingURL=WeaponItem.js.map