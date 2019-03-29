var ui;
(function (ui) {
    var main;
    (function (main) {
        var HeadListSkin = (function (_super) {
            __extends(HeadListSkin, _super);
            function HeadListSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [80, 500]);
                this.elementsContent = [this.__6_i(), this.__10_i(), this.__14_i(), this.__18_i(), this.__22_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = HeadListSkin.prototype;
            __egretProto__.__10_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["x", "y"], [96, -1]);
                t.elementsContent = [this.__7_i(), this.__8_i(), this.__9_i()];
                return t;
            };
            __egretProto__.__11_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["frame_head_2_bg_png", 7, 8]);
                return t;
            };
            __egretProto__.__12_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["icon_lock_4_png", 17, 15]);
                return t;
            };
            __egretProto__.__13_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["frame_head_0_png", 0, 0]);
                return t;
            };
            __egretProto__.__14_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["x", "y"], [196, -1]);
                t.elementsContent = [this.__11_i(), this.__12_i(), this.__13_i()];
                return t;
            };
            __egretProto__.__15_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["frame_head_2_bg_png", 17, 8]);
                return t;
            };
            __egretProto__.__16_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["icon_lock_4_png", 27, 15]);
                return t;
            };
            __egretProto__.__17_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["frame_head_0_png", 10, 0]);
                return t;
            };
            __egretProto__.__18_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["x", "y"], [286, -1]);
                t.elementsContent = [this.__15_i(), this.__16_i(), this.__17_i()];
                return t;
            };
            __egretProto__.__19_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["frame_head_2_bg_png", 17, 8]);
                return t;
            };
            __egretProto__.__20_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["icon_lock_4_png", 27, 15]);
                return t;
            };
            __egretProto__.__21_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["frame_head_0_png", 10, 0]);
                return t;
            };
            __egretProto__.__22_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["x", "y"], [386, -1]);
                t.elementsContent = [this.__19_i(), this.__20_i(), this.__21_i()];
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["frame_head_2_bg_png", 7, 8]);
                return t;
            };
            __egretProto__.__4_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["height", "source", "width", "x", "y"], [64, "icon_wuhun_12_png", 64, 7, 10]);
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["frame_head_0_png", 0, 0]);
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["x", "y"], [-1, -1]);
                t.elementsContent = [this.__3_i(), this.__4_i(), this.__5_i()];
                return t;
            };
            __egretProto__.__7_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["frame_head_2_bg_png", 7, 8]);
                return t;
            };
            __egretProto__.__8_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["icon_lock_4_png", 17, 15]);
                return t;
            };
            __egretProto__.__9_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["frame_head_0_png", 0, 0]);
                return t;
            };
            return HeadListSkin;
        })(egret.gui.Skin);
        main.HeadListSkin = HeadListSkin;
        HeadListSkin.prototype.__class__ = "ui.main.HeadListSkin";
    })(main = ui.main || (ui.main = {}));
})(ui || (ui = {}));
