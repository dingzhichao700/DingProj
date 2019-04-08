var egret;
(function (egret) {
    /**
     * 因egret的主程序与UI层分开，所以需要两个应用程序，此类为主程序
     * @see ApplicationUI
     */
    var ApplicationMain = (function (_super) {
        __extends(ApplicationMain, _super);
        //
        function ApplicationMain() {
            _super.call(this, true);
        }
        var __egretProto__ = ApplicationMain.prototype;
        //
        __egretProto__.initWindow = function () {
            _super.prototype.initWindow.call(this);
        };
        return ApplicationMain;
    })(egret.Application);
    egret.ApplicationMain = ApplicationMain;
    ApplicationMain.prototype.__class__ = "egret.ApplicationMain";
})(egret || (egret = {}));
//# sourceMappingURL=ApplicationMain.js.map