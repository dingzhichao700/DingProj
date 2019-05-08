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
    var PvpMathcItem = (function (_super) {
        __extends(PvpMathcItem, _super);
        function PvpMathcItem() {
            var _this = _super.call(this) || this;
            var self = _this;
            self.skinName = "resource/skins/weapon/PvpMathcItemSkin.exml";
            DLG.DLGCore.event.addEventListener(_this, egret.TouchEvent.TOUCH_TAP, self, self.onBtnTouchHandler);
            return _this;
        }
        PvpMathcItem.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            var self = this;
            if (self.isInitView == false) {
                return;
            }
            self.info = self.data;
            if (self.info) {
                self.label_txt.text = self.info.name;
                self.icon_img.source = "wuHun_json.wuHun_head_" + self.info.sex + "_png";
            }
            else {
                self.label_txt.text = "";
                self.icon_img.source = null;
            }
        };
        PvpMathcItem.prototype.onBtnTouchHandler = function () {
        };
        PvpMathcItem.prototype.onDestroy = function () {
            _super.prototype.onDestroy.call(this);
        };
        return PvpMathcItem;
    }(DLG.CItemRenderer));
    game.PvpMathcItem = PvpMathcItem;
    __reflect(PvpMathcItem.prototype, "game.PvpMathcItem");
})(game || (game = {}));
//# sourceMappingURL=PvpMathcItem.js.map