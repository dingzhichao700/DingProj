var ui;
(function (ui) {
    var main;
    (function (main) {
        var MainViewSkin = (function (_super) {
            __extends(MainViewSkin, _super);
            function MainViewSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [960, 640]);
                this.elementsContent = [this.__3_i(), this.__4_i(), this.__5_i(), this.__6_i(), this.__7_i(), this.txtName_i(), this.txtScore_i(), this.__8_i(), this.__9_i(), this.__10_i(), this.__11_i(), this.__12_i(), this.btnSoulRoad_i(), this.btnBag_i(), this.btnWuhun_i(), this.btnEquip_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = MainViewSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return MainViewSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__11_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["scale9Grid", "source", "width", "x", "y"], [egret.gui.getScale9Grid("11,1,68,7"), "main_bottomBar_png", 499, 67, 951]);
                return t;
            };
            __egretProto__.__12_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["lock_exppool_png", 527, 834]);
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["scale9Grid", "source", "width"], [egret.gui.getScale9Grid("237,5,32,32"), "bg_top_4_png", 640]);
                return t;
            };
            __egretProto__.__4_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "y"], ["namebg_png", 1]);
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["frame_head_2_bg_png", 5, 10]);
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["head_1_png", 7, 12]);
                return t;
            };
            __egretProto__.__7_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["frame_head_0_png", -1, 2]);
                return t;
            };
            __egretProto__.__8_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["level9_png", -1, 104]);
                return t;
            };
            __egretProto__.__9_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["word_zhandouli_png", 83, 5]);
                return t;
            };
            __egretProto__.btnBag_i = function () {
                var t = new egret.gui.UIAsset();
                this.btnBag = t;
                this.__s(t, ["source", "x", "y"], ["btn_beibao_png", 277, 875]);
                return t;
            };
            __egretProto__.btnEquip_i = function () {
                var t = new egret.gui.UIAsset();
                this.btnEquip = t;
                this.__s(t, ["source", "x", "y"], ["btn_renwu_png", 408, 878]);
                return t;
            };
            __egretProto__.btnSoulRoad_i = function () {
                var t = new egret.gui.UIAsset();
                this.btnSoulRoad = t;
                this.__s(t, ["source", "y"], ["soulRoad_gray_png", 834]);
                return t;
            };
            __egretProto__.btnWuhun_i = function () {
                var t = new egret.gui.UIAsset();
                this.btnWuhun = t;
                this.__s(t, ["source", "x", "y"], ["btn_jineng_png", 157, 876]);
                return t;
            };
            __egretProto__.__10_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "width", "x", "y"], ["bg_mainbottom_png", 531, 55, 877]);
                return t;
            };
            __egretProto__.txtName_i = function () {
                var t = new egret.gui.Label();
                this.txtName = t;
                this.__s(t, ["size", "text", "textAlign", "width", "x", "y"], [20, "习浩然", "center", 70, 3, 79]);
                return t;
            };
            __egretProto__.txtScore_i = function () {
                var t = new egret.gui.Label();
                this.txtScore = t;
                this.__s(t, ["fontFamily", "italic", "size", "text", "textAlign", "textColor", "width", "x", "y"], ["Arial", true, 24, "31417", "left", 0xFFE97C, 161, 138, 10]);
                return t;
            };
            MainViewSkin._skinParts = ["txtName", "txtScore", "btnSoulRoad", "btnBag", "btnWuhun", "btnEquip"];
            return MainViewSkin;
        })(egret.gui.Skin);
        main.MainViewSkin = MainViewSkin;
        MainViewSkin.prototype.__class__ = "ui.main.MainViewSkin";
    })(main = ui.main || (ui.main = {}));
})(ui || (ui = {}));
//# sourceMappingURL=MainViewSkin.js.map