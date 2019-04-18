var ui;
(function (ui) {
    var main;
    (function (main) {
        var WarningViewSkin = (function (_super) {
            __extends(WarningViewSkin, _super);
            function WarningViewSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [960, 640]);
                this.elementsContent = [this.boxCon_i(), this.boxPower_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = WarningViewSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return WarningViewSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__4_i = function () {
                var t = new egret.gui.UIAsset();
                t.source = "bg_fight_png";
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["fight_plus_png", 112, 12]);
                return t;
            };
            __egretProto__.boxCon_i = function () {
                var t = new egret.gui.Group();
                this.boxCon = t;
                this.__s(t, ["height", "width", "x", "y"], [38, 439, 103, 161]);
                t.elementsContent = [this.__3_i(), this.txtContext_i()];
                return t;
            };
            __egretProto__.boxPowerNum_i = function () {
                var t = new egret.gui.Group();
                this.boxPowerNum = t;
                this.__s(t, ["height", "width", "x", "y"], [30, 100, 141, 16]);
                return t;
            };
            __egretProto__.boxPower_i = function () {
                var t = new egret.gui.Group();
                this.boxPower = t;
                this.__s(t, ["x", "y"], [170, 430]);
                t.elementsContent = [this.__4_i(), this.__5_i(), this.boxPowerNum_i()];
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["height", "scale9Grid", "source", "width", "x", "y"], [48, egret.gui.getScale9Grid("109,6,42,24"), "bg_warn_png", 423, 0, 0]);
                return t;
            };
            __egretProto__.txtContext_i = function () {
                var t = new egret.gui.Label();
                this.txtContext = t;
                this.__s(t, ["fontFamily", "size", "text", "textAlign", "textColor", "width", "x", "y"], ["微软雅黑", 26, "金钱不足", "center", 0xFFFFFF, 556, -65, 12]);
                return t;
            };
            WarningViewSkin._skinParts = ["txtContext", "boxCon", "boxPowerNum", "boxPower"];
            return WarningViewSkin;
        })(egret.gui.Skin);
        main.WarningViewSkin = WarningViewSkin;
        WarningViewSkin.prototype.__class__ = "ui.main.WarningViewSkin";
    })(main = ui.main || (ui.main = {}));
})(ui || (ui = {}));
//# sourceMappingURL=WarningViewSkin.js.map