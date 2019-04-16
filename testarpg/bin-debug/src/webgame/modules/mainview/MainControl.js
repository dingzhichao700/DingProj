var egret;
(function (egret) {
    var MainControl = (function () {
        function MainControl() {
            this._coin = 11000;
            this._totalExp = 1.7;
        }
        var __egretProto__ = MainControl.prototype;
        MainControl.getInstance = function () {
            if (!MainControl._instance) {
                MainControl._instance = new MainControl();
            }
            return MainControl._instance;
        };
        Object.defineProperty(__egretProto__, "coin", {
            get: function () {
                return this._coin;
            },
            enumerable: true,
            configurable: true
        });
        __egretProto__.addCoin = function (value) {
            this._coin += value;
            this.updateMainView();
        };
        __egretProto__.reduceCoin = function (value) {
            this._coin -= value;
            if (this._coin < 0) {
                this._coin = 0;
            }
            this.updateMainView();
        };
        Object.defineProperty(__egretProto__, "totalExp", {
            get: function () {
                return this._totalExp;
            },
            enumerable: true,
            configurable: true
        });
        __egretProto__.addExp = function (value) {
            this._totalExp += value;
            this.updateMainView();
        };
        __egretProto__.openLogin = function () {
            if (!this.loginView) {
                this.loginView = new egret.LoginView();
            }
            this.loginView.open();
        };
        __egretProto__.openWarnView = function () {
            if (!this.warnView) {
                this.warnView = new egret.WarningView();
            }
            this.warnView.open();
        };
        /**显示警告语*/
        __egretProto__.showWarn = function (str) {
            if (this.warnView && this.warnView.isOpen) {
                this.warnView.showMsg(str);
            }
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
        __egretProto__.showMission = function () {
            if (this.mainView && this.mainView.isOpen) {
                this.mainView.showMission();
            }
        };
        __egretProto__.showStory = function (value) {
            if (this.mainView && this.mainView.isOpen) {
                this.mainView.showStory(value);
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
                this.addExp(0.01);
            }
            if (!this.loadingView) {
                this.loadingView = new egret.LoadingView();
            }
            this.loadingView.title = title;
            this.loadingView.open();
        };
        return MainControl;
    })();
    egret.MainControl = MainControl;
    MainControl.prototype.__class__ = "egret.MainControl";
})(egret || (egret = {}));
//# sourceMappingURL=MainControl.js.map