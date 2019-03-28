var egret;
(function (egret) {
    var MainControl = (function () {
        function MainControl() {
        }
        var __egretProto__ = MainControl.prototype;
        MainControl.getInstance = function () {
            if (!MainControl._instance) {
                MainControl._instance = new MainControl();
            }
            return MainControl._instance;
        };
        __egretProto__.openMainView = function () {
            if (!this.mainView) {
                this.mainView = new egret.MainView();
            }
            this.mainView.open();
        };
        return MainControl;
    })();
    egret.MainControl = MainControl;
    MainControl.prototype.__class__ = "egret.MainControl";
})(egret || (egret = {}));
//# sourceMappingURL=MainControl.js.map