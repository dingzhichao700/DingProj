var ui;
(function (ui) {
    var main;
    (function (main) {
        var LoginViewSkin = (function (_super) {
            __extends(LoginViewSkin, _super);
            function LoginViewSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [960, 640]);
                this.elementsContent = [this.imgBg_i(), this.btnStart_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = LoginViewSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return LoginViewSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.imgBg_i = function () {
                var t = new egret.gui.UIAsset();
                this.imgBg = t;
                this.__s(t, ["height", "source", "width", "x", "y"], [1400, "bgLogin_jpg", 800, -80, -213]);
                return t;
            };
            __egretProto__.btnStart_i = function () {
                var t = new egret.gui.UIAsset();
                this.btnStart = t;
                this.__s(t, ["source", "x", "y"], ["btnStart_png", 181, 811]);
                return t;
            };
            LoginViewSkin._skinParts = ["imgBg", "btnStart"];
            return LoginViewSkin;
        })(egret.gui.Skin);
        main.LoginViewSkin = LoginViewSkin;
        LoginViewSkin.prototype.__class__ = "ui.main.LoginViewSkin";
    })(main = ui.main || (ui.main = {}));
})(ui || (ui = {}));
//# sourceMappingURL=LoginViewSkin.js.map