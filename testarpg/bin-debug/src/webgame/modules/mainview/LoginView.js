var egret;
(function (egret) {
    var LoginView = (function (_super) {
        __extends(LoginView, _super);
        function LoginView() {
            _super.call(this);
            this.layerType = egret.BasePanel.LAYER_GUIDE;
            this.skinName = "ui.main.LoginViewSkin";
        }
        var __egretProto__ = LoginView.prototype;
        __egretProto__.onOpen = function () {
            this.btnStart.addEventListener(egret.TouchEvent.TOUCH_END, this.onStart, this);
        };
        __egretProto__.onStart = function () {
            this.close();
            egret.SceneManager.getInstance().enterScene(egret.SceneType.NORMAL_COPY, 1001);
            egret.SceneManager.getInstance().scene.nextTurn();
            var effect = egret.SceneElementManager.getInstance().getElement(egret.ElementEffect);
            effect.setIsCheckResource(false);
            effect.x = 200;
            effect.y = 200;
            effect.setMovieName(egret.MovieName.EFFECT_01);
            effect.addToScene();
            egret.MainControl.getInstance().openMainView();
            egret.MainControl.getInstance().openGuideView();
        };
        return LoginView;
    })(egret.BasePanel);
    egret.LoginView = LoginView;
    LoginView.prototype.__class__ = "egret.LoginView";
})(egret || (egret = {}));
//# sourceMappingURL=LoginView.js.map