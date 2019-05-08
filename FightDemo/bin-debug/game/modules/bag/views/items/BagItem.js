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
    var BagItem = (function (_super) {
        __extends(BagItem, _super);
        function BagItem() {
            var _this = _super.call(this) || this;
            var self = _this;
            self.skinName = "resource/skins/bag/BagItemSkin.exml";
            DLG.DLGCore.event.addEventListener(_this, egret.TouchEvent.TOUCH_TAP, self, self.onBtnTouchHandler);
            return _this;
        }
        BagItem.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            var self = this;
            if (self.data == null) {
                return;
            }
            if (self.isInitView == false) {
                return;
            }
            self.modelId = self.data;
            self.icon_lock.visible = self.modelId < 0;
            if (self.modelId < 0) {
                self.label_txt.text = "";
                self.icon_img.source = null;
            }
            else if (self.modelId == 0) {
                self.label_txt.text = "";
                self.icon_img.source = null;
            }
            else {
                self.label_txt.text = self.modelId + "";
                self.icon_img.source = "goods_" + self.modelId + "_png";
            }
        };
        BagItem.prototype.onBtnTouchHandler = function () {
            if (this.modelId <= 0)
                return;
            game.ItemTipsControl.getInstance().initTips(this.modelId, 0, null, null, null);
        };
        BagItem.prototype.onDestroy = function () {
            _super.prototype.onDestroy.call(this);
        };
        return BagItem;
    }(DLG.CItemRenderer));
    game.BagItem = BagItem;
    __reflect(BagItem.prototype, "game.BagItem");
})(game || (game = {}));
//# sourceMappingURL=BagItem.js.map