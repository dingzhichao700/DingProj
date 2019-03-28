var egret;
(function (egret) {
    var Application = (function (_super) {
        __extends(Application, _super);
        /**
         * 构造函数
         * @param isMain:Boolean = false 是否为主程序，主程序将注册到ApplicationManager中，并且为单列
         *
         */
        function Application(isMain) {
            if (isMain === void 0) { isMain = false; }
            _super.call(this);
            //this.tabEnabled = false;
            //this.tabChildren = false;
            if (isMain)
                this.addEventListener(egret.Event.ADDED_TO_STAGE, this.thisAddedToStage, this);
        }
        var __egretProto__ = Application.prototype;
        //
        /**
         * 应用程序添加至舞台后自动调用此方法
         *
         */
        __egretProto__.initWindow = function () {
            _super.prototype.initWindow.call(this);
            if (this.stage) {
                egret.ApplicationManager.getInstance().init(this);
            }
            else {
                egret.LogManager.warn(this, "舞台不存在，主程序有误");
            }
        };
        //
        __egretProto__.destroy = function () {
            if (this._isDestroy)
                return;
            _super.prototype.destroy.call(this);
        };
        //
        /**
         * 添加到舞台
         * @param e
         *
         */
        __egretProto__.thisAddedToStage = function (e) {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.thisAddedToStage, this);
            this.initWindow();
        };
        return Application;
    })(egret.Window);
    egret.Application = Application;
    Application.prototype.__class__ = "egret.Application";
})(egret || (egret = {}));
//# sourceMappingURL=Application.js.map