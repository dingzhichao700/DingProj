var ui;
(function (ui) {
    var main;
    (function (main) {
        var GuideViewSkin = (function (_super) {
            __extends(GuideViewSkin, _super);
            function GuideViewSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [960, 640]);
                this.elementsContent = [this.imgBg_i(), this.imgRole_i(), this.imgGuide_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = GuideViewSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return GuideViewSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.imgGuide_i = function () {
                var t = new egret.gui.UIAsset();
                this.imgGuide = t;
                this.__s(t, ["source", "x", "y"], ["guideArrow_png", 35, 842]);
                return t;
            };
            __egretProto__.imgRole_i = function () {
                var t = new egret.gui.UIAsset();
                this.imgRole = t;
                this.__s(t, ["source", "x", "y"], ["img_guideRole_png", 103, 65]);
                return t;
            };
            __egretProto__.imgBg_i = function () {
                var t = new egret.gui.UIAsset();
                this.imgBg = t;
                this.__s(t, ["height", "scale9Grid", "source", "width", "x", "y"], [960, egret.gui.getScale9Grid("4,4,24,24"), "bg_19_png", 640, 0, 0]);
                return t;
            };
            GuideViewSkin._skinParts = ["imgBg", "imgRole", "imgGuide"];
            return GuideViewSkin;
        })(egret.gui.Skin);
        main.GuideViewSkin = GuideViewSkin;
        GuideViewSkin.prototype.__class__ = "ui.main.GuideViewSkin";
    })(main = ui.main || (ui.main = {}));
})(ui || (ui = {}));
//# sourceMappingURL=GuideViewSkin.js.map