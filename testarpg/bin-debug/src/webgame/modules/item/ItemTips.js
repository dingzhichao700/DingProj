var egret;
(function (egret) {
    var ItemTips = (function (_super) {
        __extends(ItemTips, _super);
        function ItemTips() {
            _super.call(this);
            this.layerType = egret.BasePanel.LAYER_TIP;
            this.skinName = "ui.item.ItemTipsSkin";
        }
        var __egretProto__ = ItemTips.prototype;
        __egretProto__.onOpen = function () {
            _super.prototype.onOpen.call(this);
            this.imgMask.addEventListener(egret.TouchEvent.TOUCH_END, this.close, this);
            this.update();
        };
        __egretProto__.setData = function (id) {
            this._id = id;
            this.update();
        };
        __egretProto__.update = function () {
            if (this.isCreate) {
                if (this._id == 0) {
                    return;
                }
                var cfg = egret.ItemManager.getInstance().getCfg(this._id);
                this.item.touchEnabled = false;
                this.item.itemId = this._id;
                this.txtName.text = cfg.name;
                this.txtQuality.text = "品质：" + egret.ItemManager.getInstance().getQuaByType(cfg.quality);
                this.txtDesc.text = cfg.desc;
                this.txtDesc.lineSpacing = 15;
                if (cfg.attrs) {
                    this.lineAttr.visible = this.txtAttr.visible = true;
                    var str = "";
                    var attrNum = 0;
                    for (var key in cfg.attrs) {
                        str += egret.ItemManager.getNameByType(key) + "+" + cfg.attrs[key] + "\n";
                        attrNum++;
                    }
                    this.txtAttr.text = str;
                    this.txtAttr.height = 35 * attrNum;
                    this.txtAttr.lineSpacing = 15;
                    this.imgBg.height = 285 + 35 * attrNum;
                }
                else {
                    this.imgBg.height = 246;
                    this.lineAttr.visible = this.txtAttr.visible = false;
                }
            }
        };
        return ItemTips;
    })(egret.BasePanel);
    egret.ItemTips = ItemTips;
    ItemTips.prototype.__class__ = "egret.ItemTips";
})(egret || (egret = {}));
//# sourceMappingURL=ItemTips.js.map