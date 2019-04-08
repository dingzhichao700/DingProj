var egret;
(function (egret) {
    var MainControl = (function () {
        function MainControl() {
            this.totalExp = 1.7;
        }
        var __egretProto__ = MainControl.prototype;
        MainControl.getInstance = function () {
            if (!MainControl._instance) {
                MainControl._instance = new MainControl();
            }
            return MainControl._instance;
        };
        __egretProto__.openLogin = function () {
            if (!this.loginView) {
                this.loginView = new egret.LoginView();
            }
            this.loginView.open();
        };
        __egretProto__.openMainView = function () {
            if (!this.mainView) {
                this.mainView = new egret.MainView();
            }
            this.mainView.open();
        };
        __egretProto__.updateMainView = function () {
            if (this.mainView && this.mainView.isOpen) {
                this.mainView.update();
            }
        };
        __egretProto__.openGuideView = function () {
            if (!this.guideView) {
                this.guideView = new egret.GuideView();
            }
            this.guideView.open();
        };
        __egretProto__.openMask = function () {
            if (!this.maskView) {
                this.maskView = new egret.MaskView();
            }
            this.maskView.open();
        };
        __egretProto__.closeMask = function () {
            if (this.maskView && this.maskView.isOpen) {
                this.maskView.close();
            }
        };
        __egretProto__.openLoading = function (title) {
            if (title === void 0) { title = ""; }
            //打开副本loading时一定概率加点经验
            if (Math.random() > 0.5) {
                this.totalExp += 0.01;
                if (this.totalExp > 3.7) {
                    this.totalExp = 3.7;
                }
                this.updateMainView();
            }
            if (!this.loadingView) {
                this.loadingView = new egret.LoadingView();
                this.loadingView.title = title;
            }
            this.loadingView.open();
        };
        return MainControl;
    })();
    egret.MainControl = MainControl;
    MainControl.prototype.__class__ = "egret.MainControl";
})(egret || (egret = {}));
//# sourceMappingURL=MainControl.js.map