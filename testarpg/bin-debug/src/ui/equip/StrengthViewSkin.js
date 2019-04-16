var ui;
(function (ui) {
    var equip;
    (function (equip) {
        var StrengthViewSkin = (function (_super) {
            __extends(StrengthViewSkin, _super);
            function StrengthViewSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [960, 640]);
                this.elementsContent = [this.window_i(), this.__3_i(), this.__4_i(), this.__5_i(), this.__6_i(), this.__7_i(), this.__8_i(), this.itemCost_i(), this.item_1_i(), this.item_2_i(), this.item_3_i(), this.item_4_i(), this.item_5_i(), this.item_6_i(), this.item_7_i(), this.item_8_i(), this.item_9_i(), this.item_10_i(), this.__9_i(), this.txtEquip_i(), this.boxAttr_i(), this.btnUp_i(), this.txtUp_i(), this.imgIcon_i(), this.imgSucc_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = StrengthViewSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return StrengthViewSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__4_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["bgStrength_png", 62, 93]);
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["height", "scale9Grid", "source", "width", "x", "y"], [152, egret.gui.getScale9Grid("25,31,4,3"), "bg_38_png", 507, 61, 554]);
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["bg_8_png", 302, 392]);
                return t;
            };
            __egretProto__.__7_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["btn_strengthUp_png", 402, 474]);
                return t;
            };
            __egretProto__.__8_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["imgStrength_png", 157, 165]);
                return t;
            };
            __egretProto__.__9_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["fontFamily", "height", "size", "text", "textAlign", "textColor", "width", "x", "y"], ["微软雅黑", 25, 20, "强化属性", "center", 0xA45F2B, 88, 271, 581]);
                return t;
            };
            __egretProto__.boxAttr_i = function () {
                var t = new egret.gui.Group();
                this.boxAttr = t;
                this.__s(t, ["height", "width", "x", "y"], [66, 284, 173, 620]);
                return t;
            };
            __egretProto__.btnUp_i = function () {
                var t = new egret.gui.UIAsset();
                this.btnUp = t;
                this.__s(t, ["source", "x", "y"], ["btnBg_png", 240, 714]);
                return t;
            };
            __egretProto__.imgIcon_i = function () {
                var t = new egret.gui.UIAsset();
                this.imgIcon = t;
                this.__s(t, ["x", "y"], [285, 245]);
                return t;
            };
            __egretProto__.imgSucc_i = function () {
                var t = new egret.gui.UIAsset();
                this.imgSucc = t;
                this.__s(t, ["source", "x", "y"], ["img_success_png", 206, 350]);
                return t;
            };
            __egretProto__.itemCost_i = function () {
                var t = new egret.BagItem();
                this.itemCost = t;
                this.__s(t, ["height", "skinName", "width", "x", "y"], [72, ui.bag.BagItemSkin, 72, 278, 430]);
                return t;
            };
            __egretProto__.item_10_i = function () {
                var t = new egret.BagItem();
                this.item_10 = t;
                this.__s(t, ["height", "skinName", "width", "x", "y"], [80, ui.bag.BagItemSkin, 80, 487, 463]);
                return t;
            };
            __egretProto__.item_1_i = function () {
                var t = new egret.BagItem();
                this.item_1 = t;
                this.__s(t, ["height", "skinName", "width", "x", "y"], [80, ui.bag.BagItemSkin, 80, 71, 103]);
                return t;
            };
            __egretProto__.item_2_i = function () {
                var t = new egret.BagItem();
                this.item_2 = t;
                this.__s(t, ["height", "skinName", "width", "x", "y"], [80, ui.bag.BagItemSkin, 80, 71, 193]);
                return t;
            };
            __egretProto__.item_3_i = function () {
                var t = new egret.BagItem();
                this.item_3 = t;
                this.__s(t, ["height", "skinName", "width", "x", "y"], [80, ui.bag.BagItemSkin, 80, 71, 283]);
                return t;
            };
            __egretProto__.item_4_i = function () {
                var t = new egret.BagItem();
                this.item_4 = t;
                this.__s(t, ["height", "skinName", "width", "x", "y"], [80, ui.bag.BagItemSkin, 80, 71, 373]);
                return t;
            };
            __egretProto__.item_5_i = function () {
                var t = new egret.BagItem();
                this.item_5 = t;
                this.__s(t, ["height", "skinName", "width", "x", "y"], [80, ui.bag.BagItemSkin, 80, 71, 463]);
                return t;
            };
            __egretProto__.item_6_i = function () {
                var t = new egret.BagItem();
                this.item_6 = t;
                this.__s(t, ["height", "skinName", "width", "x", "y"], [80, ui.bag.BagItemSkin, 80, 487, 103]);
                return t;
            };
            __egretProto__.item_7_i = function () {
                var t = new egret.BagItem();
                this.item_7 = t;
                this.__s(t, ["height", "skinName", "width", "x", "y"], [80, ui.bag.BagItemSkin, 80, 487, 193]);
                return t;
            };
            __egretProto__.item_8_i = function () {
                var t = new egret.BagItem();
                this.item_8 = t;
                this.__s(t, ["height", "skinName", "width", "x", "y"], [80, ui.bag.BagItemSkin, 80, 487, 283]);
                return t;
            };
            __egretProto__.item_9_i = function () {
                var t = new egret.BagItem();
                this.item_9 = t;
                this.__s(t, ["height", "skinName", "width", "x", "y"], [80, ui.bag.BagItemSkin, 80, 487, 373]);
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["title_strength_png", 284, 28]);
                return t;
            };
            __egretProto__.txtEquip_i = function () {
                var t = new egret.gui.Label();
                this.txtEquip = t;
                this.__s(t, ["fontFamily", "height", "size", "text", "textAlign", "textColor", "width", "x", "y"], ["微软雅黑", 25, 22, "玄天头盔 1级", "center", 0x1F1F1F, 224, 199, 362]);
                return t;
            };
            __egretProto__.txtUp_i = function () {
                var t = new egret.gui.Label();
                this.txtUp = t;
                this.__s(t, ["fontFamily", "height", "size", "text", "textAlign", "textColor", "width", "x", "y"], ["微软雅黑", 37, 26, "强 化", "center", 0x000000, 67, 281, 733]);
                return t;
            };
            __egretProto__.window_i = function () {
                var t = new egret.WindowView();
                this.window = t;
                this.__s(t, ["height", "skinName", "width"], [960, ui.WindowViewSkin, 640]);
                return t;
            };
            StrengthViewSkin._skinParts = ["window", "itemCost", "item_1", "item_2", "item_3", "item_4", "item_5", "item_6", "item_7", "item_8", "item_9", "item_10", "txtEquip", "boxAttr", "btnUp", "txtUp", "imgIcon", "imgSucc"];
            return StrengthViewSkin;
        })(egret.gui.Skin);
        equip.StrengthViewSkin = StrengthViewSkin;
        StrengthViewSkin.prototype.__class__ = "ui.equip.StrengthViewSkin";
    })(equip = ui.equip || (ui.equip = {}));
})(ui || (ui = {}));
//# sourceMappingURL=StrengthViewSkin.js.map