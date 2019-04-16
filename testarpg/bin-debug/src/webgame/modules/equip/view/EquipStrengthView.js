var egret;
(function (egret) {
    var EquipStrengthView = (function (_super) {
        __extends(EquipStrengthView, _super);
        function EquipStrengthView() {
            _super.call(this);
            this.inited = false;
            this.layerType = egret.BasePanel.LAYER_WINDOW_1;
            this.skinName = "ui.equip.StrengthViewSkin";
        }
        var __egretProto__ = EquipStrengthView.prototype;
        __egretProto__.initEquip = function () {
            if (!this.inited) {
                this.inited = true;
                this.itemEquipData = [];
                for (var i = 0; i < 10; i++) {
                    this.itemEquipData.push(0);
                }
            }
        };
        __egretProto__.onOpen = function () {
            _super.prototype.onOpen.call(this);
            this.window.btnClose.addEventListener(egret.TouchEvent.TOUCH_END, this.close, this);
            this.window.btnBack.addEventListener(egret.TouchEvent.TOUCH_END, this.close, this);
            this.btnUp.addEventListener(egret.TouchEvent.TOUCH_END, this.onUp, this);
            this.txtUp.touchEnabled = false;
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
            this.itemList = [];
            for (var i = 0; i < 10; i++) {
                this["item_" + (i + 1)].addEventListener(egret.TouchEvent.TOUCH_END, this.onSelect, this);
                this["item_" + (i + 1)].setAble(false);
                this.itemList.push(this["item_" + (i + 1)]);
            }
            if (!this.inited) {
                this.initEquip();
            }
            this.itemCost.itemId = 26;
            this.itemCost.showNum(true);
            this.imgSucc.alpha = 0;
            this.chooseItem(1); //默认选中第一件装备
            this.update();
        };
        __egretProto__.update = function () {
            if (this.isCreate) {
                this.itemCost.update();
                this.boxAttr.removeAllElements();
                var level = this.getEquipLevel(this.curIndex);
                this.txtEquip.text = this.curItem.info.name + (level == 0 ? "" : ("  " + level + "级"));
                var attrs = this.getAttrByLevel(level);
                for (var i = 0; i < attrs.length; i++) {
                    var label = new egret.gui.Label();
                    label.text = attrs[i];
                    label.size = 22;
                    label.textColor = 0x000000;
                    label.y = 25 * i;
                    this.boxAttr.addElement(label);
                }
            }
        };
        Object.defineProperty(__egretProto__, "curItem", {
            get: function () {
                return this["item_" + this.curIndex];
            },
            enumerable: true,
            configurable: true
        });
        __egretProto__.onUp = function () {
            var num = egret.BagManager.getInstance().getItemNum(26);
            if (num > 0) {
                egret.BagManager.getInstance().reduceItem(26, 1);
                this.upEquipLevel(this.curIndex);
                this.playSucc();
                this.update();
            }
            else {
                egret.MainControl.getInstance().showWarn("强化材料不足");
            }
        };
        __egretProto__.playSucc = function () {
            this.imgSucc.alpha = 0;
            this.imgSucc.y = 350;
            egret.Tween.removeTweens(this.imgSucc);
            egret.TimerManager.getInstance().removeExecute(this.delayKey); //隐藏
            egret.Tween.get(this.imgSucc).to({ y: 100 }, 1000);
            egret.Tween.get(this.imgSucc).to({ alpha: 1 }, 300);
            this.delayKey = egret.TimerManager.getInstance().addExecute(this.playSucc2, this, 1000, [], 1); //隐藏
        };
        __egretProto__.playSucc2 = function () {
            egret.Tween.get(this.imgSucc).to({ alpha: 0 }, 200);
        };
        __egretProto__.onSelect = function (e) {
            var item = e.currentTarget;
            for (var i = 0; i < this.itemList.length; i++) {
                if (this.itemList[i] == item) {
                    this.chooseItem(i + 1);
                }
            }
        };
        //选中某序号的装备
        __egretProto__.chooseItem = function (index) {
            var item = this["item_" + index];
            this.imgIcon.source = "resource/item/" + item.info.id + ".png";
            this.curIndex = index;
            this.update();
        };
        __egretProto__.upEquipLevel = function (index) {
            this.itemEquipData[index - 1] += 1;
        };
        __egretProto__.getEquipLevel = function (index) {
            return this.itemEquipData[index - 1];
        };
        __egretProto__.getAttrByLevel = function (level) {
            return ["力量+" + (100 * level) + "     →     力量+" + (100 * (level + 1))];
        };
        return EquipStrengthView;
    })(egret.BasePanel);
    egret.EquipStrengthView = EquipStrengthView;
    EquipStrengthView.prototype.__class__ = "egret.EquipStrengthView";
})(egret || (egret = {}));
//# sourceMappingURL=EquipStrengthView.js.map