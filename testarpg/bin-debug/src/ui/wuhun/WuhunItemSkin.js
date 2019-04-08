var ui;
(function (ui) {
    var wuhun;
    (function (wuhun) {
        var WuhunItemSkin = (function (_super) {
            __extends(WuhunItemSkin, _super);
            function WuhunItemSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [84, 84]);
                this.elementsContent = [this.__3_i(), this.__4_i(), this.imgIcon_i(), this.__5_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = WuhunItemSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return WuhunItemSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__4_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["btn_plus_green_png", 18, 18]);
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["bg_quan_png", 0, -1]);
                return t;
            };
            __egretProto__.imgIcon_i = function () {
                var t = new egret.gui.UIAsset();
                this.imgIcon = t;
                this.__s(t, ["height", "width", "x", "y"], [61, 61, 11, 11]);
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["bg_itembg_png", 8, 8]);
                return t;
            };
            WuhunItemSkin._skinParts = ["imgIcon"];
            return WuhunItemSkin;
        })(egret.gui.Skin);
        wuhun.WuhunItemSkin = WuhunItemSkin;
        WuhunItemSkin.prototype.__class__ = "ui.wuhun.WuhunItemSkin";
    })(wuhun = ui.wuhun || (ui.wuhun = {}));
})(ui || (ui = {}));
//# sourceMappingURL=WuhunItemSkin.js.map