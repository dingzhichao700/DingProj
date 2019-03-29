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
                this.elementsContent = [this.__3_i(), this.__4_i(), this.__5_i(), this.__6_i(), this.__7_i(), this.__8_i(), this.__9_i(), this.__10_i(), this.__11_i(), this.img_1_i(), this.img_2_i(), this.img_3_i(), this.img_4_i(), this.img_5_i(), this.btnClose_i()];
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
            __egretProto__.__11_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["height", "scale9Grid", "source", "width", "x", "y"], [254, egret.gui.getScale9Grid("3,3,2,2"), "frame_bg_png", 214, 353, 562]);
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["height", "scale9Grid", "source", "width", "x", "y"], [960, egret.gui.getScale9Grid("4,4,24,24"), "bg_19_png", 640, 0, 0]);
                return t;
            };
            __egretProto__.__4_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["height", "source", "width", "x", "y"], [862, "soulRoadBg_nomal_png", 666, -26, 14]);
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["tab_diff_0_png", 473, 848]);
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["tab_normal_1_png", 363, 847]);
                return t;
            };
            __egretProto__.__7_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["height", "scale9Grid", "source", "width", "x", "y"], [253, egret.gui.getScale9Grid("3,3,2,2"), "frame_bg_png", 275, 71, 563]);
                return t;
            };
            __egretProto__.__8_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["height", "scale9Grid", "source", "width", "x", "y"], [227, egret.gui.getScale9Grid("3,3,2,2"), "frame_bg_png", 318, 246, 106]);
                return t;
            };
            __egretProto__.__9_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["height", "scale9Grid", "source", "width", "x", "y"], [203, egret.gui.getScale9Grid("3,3,2,2"), "frame_bg_png", 492, 75, 343]);
                return t;
            };
            __egretProto__.btnClose_i = function () {
                var t = new egret.gui.UIAsset();
                this.btnClose = t;
                this.__s(t, ["source", "x", "y"], ["btn_close1_png", 554, 38]);
                return t;
            };
            __egretProto__.img_1_i = function () {
                var t = new egret.gui.UIAsset();
                this.img_1 = t;
                this.__s(t, ["source", "x", "y"], ["1_1_png", 78, 107]);
                return t;
            };
            __egretProto__.img_2_i = function () {
                var t = new egret.gui.UIAsset();
                this.img_2 = t;
                this.__s(t, ["source", "x", "y"], ["1_2_png", 248, 108]);
                return t;
            };
            __egretProto__.img_3_i = function () {
                var t = new egret.gui.UIAsset();
                this.img_3 = t;
                this.__s(t, ["source", "x", "y"], ["1_3_png", 77, 345]);
                return t;
            };
            __egretProto__.img_4_i = function () {
                var t = new egret.gui.UIAsset();
                this.img_4 = t;
                this.__s(t, ["source", "x", "y"], ["1_4_png", 74, 565]);
                return t;
            };
            __egretProto__.img_5_i = function () {
                var t = new egret.gui.UIAsset();
                this.img_5 = t;
                this.__s(t, ["source", "x", "y"], ["1_5_png", 355, 564]);
                return t;
            };
            __egretProto__.__10_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["height", "scale9Grid", "source", "width", "x", "y"], [227, egret.gui.getScale9Grid("3,3,2,2"), "frame_bg_png", 163, 76, 106]);
                return t;
            };
            SoulRoadViewSkin._skinParts = ["img_1", "img_2", "img_3", "img_4", "img_5", "btnClose"];
            return SoulRoadViewSkin;
        })(egret.gui.Skin);
        soulRoad.SoulRoadViewSkin = SoulRoadViewSkin;
        SoulRoadViewSkin.prototype.__class__ = "ui.soulRoad.SoulRoadViewSkin";
    })(soulRoad = ui.soulRoad || (ui.soulRoad = {}));
})(ui || (ui = {}));
