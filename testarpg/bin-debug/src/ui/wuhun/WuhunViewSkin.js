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
                this.elementsContent = [this.window_i(), this.__3_i(), this.__4_i(), this.boxCon_i(), this.__5_i(), this.__6_i(), this.__7_i(), this.__8_i(), this.__9_i(), this.__10_i()];
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
            __egretProto__.__3_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["wuhun_bg_jpg", 61, 203]);
                return t;
            };
            __egretProto__.__4_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["title_bg_png", 121, 203]);
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.WuhunItem();
                this.__s(t, ["height", "skinName", "width", "x", "y"], [84, ui.wuhun.WuhunItemSkin, 84, 268, 496]);
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.WuhunItem();
                this.__s(t, ["height", "scaleX", "scaleY", "skinName", "width", "x", "y"], [84, 0.9, 0.9, ui.wuhun.WuhunItemSkin, 84, 142, 486]);
                return t;
            };
            __egretProto__.__7_i = function () {
                var t = new egret.WuhunItem();
                this.__s(t, ["height", "scaleX", "scaleY", "skinName", "width", "x", "y"], [84, 0.7, 0.7, ui.wuhun.WuhunItemSkin, 84, 61, 458]);
                return t;
            };
            __egretProto__.__8_i = function () {
                var t = new egret.WuhunItem();
                this.__s(t, ["height", "scaleX", "scaleY", "skinName", "width", "x", "y"], [84, 0.7, 0.7, ui.wuhun.WuhunItemSkin, 84, 505, 458]);
                return t;
            };
            __egretProto__.__9_i = function () {
                var t = new egret.WuhunItem();
                this.__s(t, ["height", "scaleX", "scaleY", "skinName", "width", "x", "y"], [84, 0.9, 0.9, ui.wuhun.WuhunItemSkin, 84, 404, 486]);
                return t;
            };
            __egretProto__.boxCon_i = function () {
                var t = new egret.gui.Group();
                this.boxCon = t;
                this.__s(t, ["height", "width", "x", "y"], [600, 550, 42, 190]);
                return t;
            };
            __egretProto__.__10_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["title_wuhun_png", 275, 29]);
                return t;
            };
            __egretProto__.window_i = function () {
                var t = new egret.BasePanel();
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
//# sourceMappingURL=WuhunViewSkin.js.map