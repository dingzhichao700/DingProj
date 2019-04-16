var ui;
(function (ui) {
    var soulRoad;
    (function (soulRoad) {
        var SoulRoadViewSkin = (function (_super) {
            __extends(SoulRoadViewSkin, _super);
            function SoulRoadViewSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [960, 640]);
                this.elementsContent = [this.__3_i(), this.__4_i(), this.__5_i(), this.__6_i(), this.__7_i(), this.__8_i(), this.__9_i(), this.__10_i(), this.img_0_i(), this.img_1_i(), this.img_2_i(), this.img_3_i(), this.img_4_i(), this.btnClose_i(), this.mask1_i(), this.mask2_i(), this.mask3_i(), this.mask4_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = SoulRoadViewSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return SoulRoadViewSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__3_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["height", "source", "width", "x", "y"], [862, "soulRoadBg_nomal_png", 666, -26, 14]);
                return t;
            };
            __egretProto__.__4_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["tab_diff_0_png", 473, 848]);
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["tab_normal_1_png", 363, 847]);
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["height", "scale9Grid", "source", "width", "x", "y"], [247, egret.gui.getScale9Grid("3,3,2,2"), "frame_bg_png", 224, 76, 106]);
                return t;
            };
            __egretProto__.__7_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["height", "scale9Grid", "source", "width", "x", "y"], [246, egret.gui.getScale9Grid("3,3,2,2"), "frame_bg_png", 261, 306, 106]);
                return t;
            };
            __egretProto__.__8_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["height", "scale9Grid", "source", "width", "x", "y"], [217, egret.gui.getScale9Grid("3,3,2,2"), "frame_bg_png", 493, 75, 360]);
                return t;
            };
            __egretProto__.__9_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["height", "scale9Grid", "source", "width", "x", "y"], [224, egret.gui.getScale9Grid("3,3,2,2"), "frame_bg_png", 247, 75, 586]);
                return t;
            };
            __egretProto__.btnClose_i = function () {
                var t = new egret.gui.UIAsset();
                this.btnClose = t;
                this.__s(t, ["source", "x", "y"], ["btn_close1_png", 554, 38]);
                return t;
            };
            __egretProto__.img_0_i = function () {
                var t = new egret.gui.UIAsset();
                this.img_0 = t;
                this.__s(t, ["source", "x", "y"], ["1_1_png", 78, 108]);
                return t;
            };
            __egretProto__.img_1_i = function () {
                var t = new egret.gui.UIAsset();
                this.img_1 = t;
                this.__s(t, ["source", "x", "y"], ["1_2_png", 308, 108]);
                return t;
            };
            __egretProto__.img_2_i = function () {
                var t = new egret.gui.UIAsset();
                this.img_2 = t;
                this.__s(t, ["source", "x", "y"], ["1_3_png", 77, 362]);
                return t;
            };
            __egretProto__.img_3_i = function () {
                var t = new egret.gui.UIAsset();
                this.img_3 = t;
                this.__s(t, ["source", "x", "y"], ["1_4_png", 77, 589]);
                return t;
            };
            __egretProto__.img_4_i = function () {
                var t = new egret.gui.UIAsset();
                this.img_4 = t;
                this.__s(t, ["source", "x", "y"], ["1_5_png", 330, 589]);
                return t;
            };
            __egretProto__.mask1_i = function () {
                var t = new egret.gui.UIAsset();
                this.mask1 = t;
                this.__s(t, ["height", "scale9Grid", "source", "width", "x", "y"], [243, egret.gui.getScale9Grid("4,4,24,24"), "bg_19_png", 260, 306, 108]);
                return t;
            };
            __egretProto__.mask2_i = function () {
                var t = new egret.gui.UIAsset();
                this.mask2 = t;
                this.__s(t, ["height", "scale9Grid", "source", "width", "x", "y"], [214, egret.gui.getScale9Grid("4,4,24,24"), "bg_19_png", 491, 75, 361]);
                return t;
            };
            __egretProto__.mask3_i = function () {
                var t = new egret.gui.UIAsset();
                this.mask3 = t;
                this.__s(t, ["height", "scale9Grid", "source", "width", "x", "y"], [223, egret.gui.getScale9Grid("4,4,24,24"), "bg_19_png", 245, 77, 587]);
                return t;
            };
            __egretProto__.mask4_i = function () {
                var t = new egret.gui.UIAsset();
                this.mask4 = t;
                this.__s(t, ["height", "scale9Grid", "source", "width", "x", "y"], [223, egret.gui.getScale9Grid("4,4,24,24"), "bg_19_png", 238, 329, 587]);
                return t;
            };
            __egretProto__.__10_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["height", "scale9Grid", "source", "width", "x", "y"], [223, egret.gui.getScale9Grid("3,3,2,2"), "frame_bg_png", 238, 329, 586]);
                return t;
            };
            SoulRoadViewSkin._skinParts = ["img_0", "img_1", "img_2", "img_3", "img_4", "btnClose", "mask1", "mask2", "mask3", "mask4"];
            return SoulRoadViewSkin;
        })(egret.gui.Skin);
        soulRoad.SoulRoadViewSkin = SoulRoadViewSkin;
        SoulRoadViewSkin.prototype.__class__ = "ui.soulRoad.SoulRoadViewSkin";
    })(soulRoad = ui.soulRoad || (ui.soulRoad = {}));
})(ui || (ui = {}));
//# sourceMappingURL=SoulRoadViewSkin.js.map