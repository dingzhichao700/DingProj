/**
 *
 * @author
 *
 */
var egret;
(function (egret) {
    var EquipView = (function (_super) {
        __extends(EquipView, _super);
        function EquipView() {
            _super.call(this);
            this.layerType = egret.BasePanel.LAYER_WINDOW_1;
            this.skinName = "ui.equip.EquipViewSkin";
        }
        var __egretProto__ = EquipView.prototype;
        __egretProto__.onOpen = function () {
            _super.prototype.onOpen.call(this);
            this.window.btnClose.addEventListener(egret.TouchEvent.TOUCH_END, this.close, this);
            this.item_1.itemId = 23;
            this.item_2.itemId = 12;
            this.item_3.itemId = 11;
            this.item_4.itemId = 17;
            this.item_5.itemId = 20;
            this.item_6.itemId = 9;
            this.item_7.itemId = 7;
            this.item_8.itemId = 8;
            this.item_9.itemId = 1;
            this.item_10.itemId = 21;
            this.item_11.itemId = 22;
            this.item_12.itemId = 10;
            if (!this.clip) {
                this.clip = new egret.AnimeClip();
                this.clip.loadUrl("role", true);
                this.boxCon.addElement(this.clip);
            }
        };
        return EquipView;
    })(egret.BasePanel);
    egret.EquipView = EquipView;
    EquipView.prototype.__class__ = "egret.EquipView";
})(egret || (egret = {}));
//# sourceMappingURL=EquipView.js.map