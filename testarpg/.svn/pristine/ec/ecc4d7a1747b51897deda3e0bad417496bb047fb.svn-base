var egret;
(function (egret) {
    var ApplicationConfig = (function () {
        /**
         * 配置应用程序
         * @param main 主程序
         * @param uiStage UI主程序
         * @param runner 启动器，用于初始化游戏逻辑
         */
        function ApplicationConfig(main, runner) {
            var appMain = new egret.ApplicationMain();
            main.addChildAt(appMain, 0);
            new runner();
        }
        var __egretProto__ = ApplicationConfig.prototype;
        return ApplicationConfig;
    })();
    egret.ApplicationConfig = ApplicationConfig;
    ApplicationConfig.prototype.__class__ = "egret.ApplicationConfig";
})(egret || (egret = {}));
//# sourceMappingURL=ApplicationConfig.js.map