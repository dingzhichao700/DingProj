var ui;
(function (ui) {
    var MaskViewSkin = (function (_super) {
        __extends(MaskViewSkin, _super);
        function MaskViewSkin() {
            _super.call(this);
            this.__s = egret.gui.setProperties;
            this.__s(this, ["height", "width"], [960, 640]);
            this.elementsContent = [this.imgMask_i()];
            this.states = [
                new egret.gui.State("normal", []),
                new egret.gui.State("disabled", [])
            ];
        }
        var __egretProto__ = MaskViewSkin.prototype;
        Object.defineProperty(__egretProto__, "skinParts", {
            get: function () {
                return MaskViewSkin._skinParts;
            },
            enumerable: true,
            configurable: true
        });
        __egretProto__.imgMask_i = function () {
            var t = new egret.gui.UIAsset();
            this.imgMask = t;
            this.__s(t, ["height", "scale9Grid", "source", "width"], [960, egret.gui.getScale9Grid("4,4,24,24"), "bg_19_png", 640]);
            return t;
        };
        MaskViewSkin._skinParts = ["imgMask"];
        return MaskViewSkin;
    })(egret.gui.Skin);
    ui.MaskViewSkin = MaskViewSkin;
    MaskViewSkin.prototype.__class__ = "ui.MaskViewSkin";
})(ui || (ui = {}));
//# sourceMappingURL=MaskViewSkin.js.map