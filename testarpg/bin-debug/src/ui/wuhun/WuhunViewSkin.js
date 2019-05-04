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
                this.elementsContent = [this.window_i(), this.__3_i(), this.__4_i(), this.__5_i(), this.__6_i(), this.boxCon_i(), this.__7_i(), this.__8_i(), this.__9_i(), this.__10_i(), this.__11_i(), this.item1_i(), this.item2_i(), this.item3_i(), this.item4_i(), this.item5_i()];
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
            __egretProto__.__3_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["title_wuhun_png", 280, 29]);
                return t;
            };
            __egretProto__.__4_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["wuhun_bg_jpg", 64, 174]);
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
            __egretProto__.item1_i = function () {
                var t = new egret.WuhunItem();
                this.item1 = t;
                this.__s(t, ["height", "skinName", "width", "x", "y"], [84, ui.wuhun.WuhunItemSkin, 84, 66, 438]);
                return t;
            };
            __egretProto__.item2_i = function () {
                var t = new egret.WuhunItem();
                this.item2 = t;
                this.__s(t, ["height", "scaleX", "scaleY", "skinName", "width", "x", "y"], [84, 1.1, 1.1, ui.wuhun.WuhunItemSkin, 84, 156, 466]);
                return t;
            };
            __egretProto__.item3_i = function () {
                var t = new egret.WuhunItem();
                this.item3 = t;
                this.__s(t, ["height", "scaleX", "scaleY", "skinName", "width", "x", "y"], [84, 1.2, 1.2, ui.wuhun.WuhunItemSkin, 84, 259, 476]);
                return t;
            };
            __egretProto__.item4_i = function () {
                var t = new egret.WuhunItem();
                this.item4 = t;
                this.__s(t, ["height", "scaleX", "scaleY", "skinName", "width", "x", "y"], [84, 1.1, 1.1, ui.wuhun.WuhunItemSkin, 84, 376, 466]);
                return t;
            };
            __egretProto__.item5_i = function () {
                var t = new egret.WuhunItem();
                this.item5 = t;
                this.__s(t, ["height", "skinName", "width", "x", "y"], [84, ui.wuhun.WuhunItemSkin, 84, 476, 438]);
                return t;
            };
            __egretProto__.__10_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["fontFamily", "size", "text", "textColor", "x", "y"], ["微软雅黑", 24, "白虎，攻守兼备的上级武魂", 0x3B3A3A, 179, 716]);
                return t;
            };
            __egretProto__.window_i = function () {
                var t = new egret.WindowView();
                this.window = t;
                this.__s(t, ["height", "skinName", "width"], [200, ui.WindowViewSkin, 200]);
                return t;
            };
            WuhunViewSkin._skinParts = ["window", "boxCon", "item1", "item2", "item3", "item4", "item5"];
            return WuhunViewSkin;
        })(egret.gui.Skin);
        wuhun.WuhunViewSkin = WuhunViewSkin;
        WuhunViewSkin.prototype.__class__ = "ui.wuhun.WuhunViewSkin";
    })(wuhun = ui.wuhun || (ui.wuhun = {}));
})(ui || (ui = {}));
//# sourceMappingURL=WuhunViewSkin.js.map