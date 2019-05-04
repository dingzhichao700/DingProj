var ui;
(function (ui) {
    var main;
    (function (main) {
        var DamageItemSkin = (function (_super) {
            __extends(DamageItemSkin, _super);
            function DamageItemSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [30, 100]);
                this.elementsContent = [this.imgState_i(), this.txtContent_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = DamageItemSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return DamageItemSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.imgState_i = function () {
                var t = new egret.gui.UIAsset();
                this.imgState = t;
                this.__s(t, ["source", "y"], ["dodge_png", -2]);
                return t;
            };
            __egretProto__.txtContent_i = function () {
                var t = new egret.gui.Label();
                this.txtContent = t;
                this.__s(t, ["size", "text", "textAlign", "textColor", "width", "x", "y"], [18, "标签", "left", 0x000000, 82, 32, 4]);
                return t;
            };
            DamageItemSkin._skinParts = ["imgState", "txtContent"];
            return DamageItemSkin;
        })(egret.gui.Skin);
        main.DamageItemSkin = DamageItemSkin;
        DamageItemSkin.prototype.__class__ = "ui.main.DamageItemSkin";
    })(main = ui.main || (ui.main = {}));
})(ui || (ui = {}));
//# sourceMappingURL=DamageItemSkin.js.map