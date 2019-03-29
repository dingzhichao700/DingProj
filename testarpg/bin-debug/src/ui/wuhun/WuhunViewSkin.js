var ui;
(function (ui) {
    var wuhun;
    (function (wuhun) {
        var WuhunViewSkin = (function (_super) {
            __extends(WuhunViewSkin, _super);
            function WuhunViewSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [960, 640]);
                this.elementsContent = [this.window_i(), this.__3_i(), this.__4_i(), this.__5_i(), this.__6_i(), this.boxCon_i(), this.__7_i(), this.__8_i(), this.__9_i(), this.__10_i(), this.__11_i(), this.__12_i(), this.__13_i(), this.__14_i(), this.__15_i(), this.__16_i(), this.__17_i(), this.__18_i(), this.__19_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = WuhunViewSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return WuhunViewSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__11_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["btn_tipicon_png", 135, 710]);
                return t;
            };
            __egretProto__.__12_i = function () {
                var t = new egret.WuhunItem();
                this.__s(t, ["height", "skinName", "width", "x", "y"], [84, ui.wuhun.WuhunItemSkin, 84, 268, 466]);
                return t;
            };
            __egretProto__.__13_i = function () {
                var t = new egret.WuhunItem();
                this.__s(t, ["height", "scaleX", "scaleY", "skinName", "width", "x", "y"], [84, 0.9, 0.9, ui.wuhun.WuhunItemSkin, 84, 142, 456]);
                return t;
            };
            __egretProto__.__14_i = function () {
                var t = new egret.WuhunItem();
                this.__s(t, ["height", "scaleX", "scaleY", "skinName", "width", "x", "y"], [84, 0.7, 0.7, ui.wuhun.WuhunItemSkin, 84, 61, 428]);
                return t;
            };
            __egretProto__.__15_i = function () {
                var t = new egret.WuhunItem();
                this.__s(t, ["height", "scaleX", "scaleY", "skinName", "width", "x", "y"], [84, 0.7, 0.7, ui.wuhun.WuhunItemSkin, 84, 505, 428]);
                return t;
            };
            __egretProto__.__16_i = function () {
                var t = new egret.WuhunItem();
                this.__s(t, ["height", "scaleX", "scaleY", "skinName", "width", "x", "y"], [84, 0.9, 0.9, ui.wuhun.WuhunItemSkin, 84, 404, 456]);
                return t;
            };
            __egretProto__.__17_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["height", "source", "width", "x", "y"], [62, "genius_114_png", 62, 280, 477]);
                return t;
            };
            __egretProto__.__18_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["height", "source", "width", "x", "y"], [53, "genius_116_png", 53, 153, 467]);
                return t;
            };
            __egretProto__.__19_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["height", "source", "width", "x", "y"], [42, "genius_12_png", 42, 69, 437]);
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["title_wuhun_png", 280, 29]);
                return t;
            };
            __egretProto__.__4_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["wuhun_bg_jpg", 61, 173]);
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["title_bg_png", 121, 173]);
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.BaseView();
                this.__s(t, ["height", "skinName", "width", "x", "y"], [80, ui.main.HeadListSkin, 479, 77, 83]);
                return t;
            };
            __egretProto__.__7_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["baihu_png", 284, 182]);
                return t;
            };
            __egretProto__.__8_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["hunhuanstar_png", 397, 601]);
                return t;
            };
            __egretProto__.__9_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["hunhuanmaster_png", 478, 601]);
                return t;
            };
            __egretProto__.boxCon_i = function () {
                var t = new egret.gui.Group();
                this.boxCon = t;
                this.__s(t, ["height", "width", "x", "y"], [209, 253, 62, 175]);
                return t;
            };
            __egretProto__.__10_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["fontFamily", "size", "text", "textColor", "x", "y"], ["微软雅黑", 24, "白虎，攻守兼备的上级武魂", 0x3B3A3A, 179, 714]);
                return t;
            };
            __egretProto__.window_i = function () {
                var t = new egret.WindowView();
                this.window = t;
                this.__s(t, ["height", "skinName", "width"], [200, ui.WindowViewSkin, 200]);
                return t;
            };
            WuhunViewSkin._skinParts = ["window", "boxCon"];
            return WuhunViewSkin;
        })(egret.gui.Skin);
        wuhun.WuhunViewSkin = WuhunViewSkin;
        WuhunViewSkin.prototype.__class__ = "ui.wuhun.WuhunViewSkin";
    })(wuhun = ui.wuhun || (ui.wuhun = {}));
})(ui || (ui = {}));
