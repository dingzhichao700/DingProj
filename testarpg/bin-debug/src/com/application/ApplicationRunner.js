var egret;
(function (egret) {
    /**
     * 游戏启动器，因egret的Main类为外部类，所以使用启动器，使游戏逻辑回到egret包中
     */
    var ApplicationRunner = (function () {
        function ApplicationRunner() {
            egret.LogManager.debug(this, "游戏启动");
        }
        var __egretProto__ = ApplicationRunner.prototype;
        /**
         * 加载资源配置
         */
        __egretProto__.loadConfig = function () {
        };
        /**
         * 初始化组件
         */
        __egretProto__.initComponents = function () {
        };
        /**
         * 设置语言包
         */
        __egretProto__.setLanguage = function () {
        };
        /**
         * 打开窗口
         */
        __egretProto__.openWindows = function () {
        };
        return ApplicationRunner;
    })();
    egret.ApplicationRunner = ApplicationRunner;
    ApplicationRunner.prototype.__class__ = "egret.ApplicationRunner";
})(egret || (egret = {}));
//# sourceMappingURL=ApplicationRunner.js.map