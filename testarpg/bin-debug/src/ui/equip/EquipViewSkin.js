var ui;
(function (ui) {
    var equip;
    (function (equip) {
        var EquipViewSkin = (function (_super) {
            __extends(EquipViewSkin, _super);
            function EquipViewSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [960, 640]);
                this.elementsContent = [this.window_i(), this.__3_i(), this.__4_i(), this.boxCon_i(), this.item_1_i(), this.item_2_i(), this.item_3_i(), this.item_4_i(), this.item_5_i(), this.item_6_i(), this.item_7_i(), this.item_8_i(), this.item_9_i(), this.item_10_i(), this.item_11_i(), this.item_12_i(), this.__5_i(), this.__6_i(), this.__7_i(), this.__8_i(), this.__9_i(), this.__10_i(), this.__11_i(), this.__12_i(), this.__13_i(), this.__14_i(), this.txtName_i(), this.txtScore_i(), this.txtAttack_i(), this.txtSpeed_i(), this.txtLife_i(), this.txtDef_i(), this.__15_i(), this.__16_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = EquipViewSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return EquipViewSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__11_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["attackSpeedIcon_png", 329, 695]);
                return t;
            };
            __egretProto__.__12_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["scale9Grid", "source", "width", "x", "y"], [egret.gui.getScale9Grid("4,4,24,24"), "bg_20_png", 177, 369, 695]);
                return t;
            };
            __egretProto__.__13_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["defenceIcon_png", 329, 735]);
                return t;
            };
            __egretProto__.__14_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["scale9Grid", "source", "width", "x", "y"], [egret.gui.getScale9Grid("4,4,24,24"), "bg_20_png", 177, 369, 735]);
                return t;
            };
            __egretProto__.__15_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["level9_png", 272, 126]);
                return t;
            };
            __egretProto__.__16_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["title_equip_png", 280, 29]);
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["height", "scale9Grid", "source", "width", "x", "y"], [600, egret.gui.getScale9Grid("3,3,24,24"), "bg_21_png", 515, 57, 83]);
                return t;
            };
            __egretProto__.__4_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["role_bg_jpg", 63, 152]);
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["bg__20_png", 194, 91]);
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["word_zhanli_png", 195, 629]);
                return t;
            };
            __egretProto__.__7_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["attackIcon_png", 69, 695]);
                return t;
            };
            __egretProto__.__8_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["scale9Grid", "source", "width", "x", "y"], [egret.gui.getScale9Grid("4,4,24,24"), "bg_20_png", 177, 109, 695]);
                return t;
            };
            __egretProto__.__9_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["lifeIcon_png", 69, 735]);
                return t;
            };
            __egretProto__.boxCon_i = function () {
                var t = new egret.gui.Group();
                this.boxCon = t;
                this.__s(t, ["height", "width", "x", "y"], [400, 240, 193, 209]);
                return t;
            };
            __egretProto__.item_10_i = function () {
                var t = new egret.BagItem();
                this.item_10 = t;
                this.__s(t, ["height", "skinName", "width", "x", "y"], [80, ui.bag.BagItemSkin, 80, 488, 400]);
                return t;
            };
            __egretProto__.item_11_i = function () {
                var t = new egret.BagItem();
                this.item_11 = t;
                this.__s(t, ["height", "skinName", "width", "x", "y"], [80, ui.bag.BagItemSkin, 80, 488, 490]);
                return t;
            };
            __egretProto__.item_12_i = function () {
                var t = new egret.BagItem();
                this.item_12 = t;
                this.__s(t, ["height", "skinName", "width", "x", "y"], [80, ui.bag.BagItemSkin, 80, 488, 580]);
                return t;
            };
            __egretProto__.item_1_i = function () {
                var t = new egret.BagItem();
                this.item_1 = t;
                this.__s(t, ["height", "skinName", "width", "x", "y"], [80, ui.bag.BagItemSkin, 80, 72, 130]);
                return t;
            };
            __egretProto__.item_2_i = function () {
                var t = new egret.BagItem();
                this.item_2 = t;
                this.__s(t, ["height", "skinName", "width", "x", "y"], [80, ui.bag.BagItemSkin, 80, 72, 220]);
                return t;
            };
            __egretProto__.item_3_i = function () {
                var t = new egret.BagItem();
                this.item_3 = t;
                this.__s(t, ["height", "skinName", "width", "x", "y"], [80, ui.bag.BagItemSkin, 80, 72, 310]);
                return t;
            };
            __egretProto__.item_4_i = function () {
                var t = new egret.BagItem();
                this.item_4 = t;
                this.__s(t, ["height", "skinName", "width", "x", "y"], [80, ui.bag.BagItemSkin, 80, 72, 400]);
                return t;
            };
            __egretProto__.item_5_i = function () {
                var t = new egret.BagItem();
                this.item_5 = t;
                this.__s(t, ["height", "skinName", "width", "x", "y"], [80, ui.bag.BagItemSkin, 80, 72, 490]);
                return t;
            };
            __egretProto__.item_6_i = function () {
                var t = new egret.BagItem();
                this.item_6 = t;
                this.__s(t, ["height", "skinName", "width", "x", "y"], [80, ui.bag.BagItemSkin, 80, 72, 580]);
                return t;
            };
            __egretProto__.item_7_i = function () {
                var t = new egret.BagItem();
                this.item_7 = t;
                this.__s(t, ["height", "skinName", "width", "x", "y"], [80, ui.bag.BagItemSkin, 80, 488, 130]);
                return t;
            };
            __egretProto__.item_8_i = function () {
                var t = new egret.BagItem();
                this.item_8 = t;
                this.__s(t, ["height", "skinName", "width", "x", "y"], [80, ui.bag.BagItemSkin, 80, 488, 220]);
                return t;
            };
            __egretProto__.item_9_i = function () {
                var t = new egret.BagItem();
                this.item_9 = t;
                this.__s(t, ["height", "skinName", "width", "x", "y"], [80, ui.bag.BagItemSkin, 80, 488, 310]);
                return t;
            };
            __egretProto__.__10_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["scale9Grid", "source", "width", "x", "y"], [egret.gui.getScale9Grid("4,4,24,24"), "bg_20_png", 177, 109, 735]);
                return t;
            };
            __egretProto__.txtAttack_i = function () {
                var t = new egret.gui.Label();
                this.txtAttack = t;
                this.__s(t, ["fontFamily", "size", "text", "textAlign", "width", "x", "y"], ["Arial", 24, "13100", "center", 151, 121, 700]);
                return t;
            };
            __egretProto__.txtDef_i = function () {
                var t = new egret.gui.Label();
                this.txtDef = t;
                this.__s(t, ["fontFamily", "size", "text", "textAlign", "width", "x", "y"], ["Arial", 24, "490", "center", 151, 381, 740]);
                return t;
            };
            __egretProto__.txtLife_i = function () {
                var t = new egret.gui.Label();
                this.txtLife = t;
                this.__s(t, ["fontFamily", "size", "text", "textAlign", "width", "x", "y"], ["Arial", 24, "1530", "center", 151, 121, 740]);
                return t;
            };
            __egretProto__.txtName_i = function () {
                var t = new egret.gui.Label();
                this.txtName = t;
                this.__s(t, ["fontFamily", "size", "text", "textAlign", "width", "x", "y"], ["Arial", 24, "习浩然", "center", 151, 236, 98]);
                return t;
            };
            __egretProto__.txtScore_i = function () {
                var t = new egret.gui.Label();
                this.txtScore = t;
                this.__s(t, ["fontFamily", "height", "size", "text", "textAlign", "textColor", "width", "x", "y"], ["Arial", 31, 30, "31417", "center", 0xFD2323, 138, 268, 637]);
                return t;
            };
            __egretProto__.txtSpeed_i = function () {
                var t = new egret.gui.Label();
                this.txtSpeed = t;
                this.__s(t, ["fontFamily", "size", "text", "textAlign", "width", "x", "y"], ["Arial", 24, "4300", "center", 151, 381, 700]);
                return t;
            };
            __egretProto__.window_i = function () {
                var t = new egret.BasePanel();
                this.window = t;
                this.__s(t, ["height", "skinName", "width"], [200, ui.WindowViewSkin, 200]);
                return t;
            };
            EquipViewSkin._skinParts = ["window", "boxCon", "item_1", "item_2", "item_3", "item_4", "item_5", "item_6", "item_7", "item_8", "item_9", "item_10", "item_11", "item_12", "txtName", "txtScore", "txtAttack", "txtSpeed", "txtLife", "txtDef"];
            return EquipViewSkin;
        })(egret.gui.Skin);
        equip.EquipViewSkin = EquipViewSkin;
        EquipViewSkin.prototype.__class__ = "ui.equip.EquipViewSkin";
    })(equip = ui.equip || (ui.equip = {}));
})(ui || (ui = {}));
//# sourceMappingURL=EquipViewSkin.js.map