var egret;
(function (egret) {
    var ApplicationEvent = (function (_super) {
        __extends(ApplicationEvent, _super);
        /**
         * 构造函数
         */
        function ApplicationEvent(type, bubbles, cancelable, data) {
            if (bubbles === void 0) { bubbles = false; }
            if (cancelable === void 0) { cancelable = false; }
            if (data === void 0) { data = null; }
            _super.call(this, type, bubbles, cancelable);
            /**
             * 相关数据
             */
            this.data = null;
            this.data = data;
        }
        var __egretProto__ = ApplicationEvent.prototype;
        /**
         * 打开窗口
         */
        ApplicationEvent.WINDOW_OPEN = "windowOpen";
        /**
         * 关闭窗口
         */
        ApplicationEvent.WINDOW_CLOSE = "windowClose";
        /**
         * 窗口调用 recall() 方法
         */
        ApplicationEvent.WINDOW_RECALL = "windowRecall";
        return ApplicationEvent;
    })(egret.Event);
    egret.ApplicationEvent = ApplicationEvent;
    ApplicationEvent.prototype.__class__ = "egret.ApplicationEvent";
})(egret || (egret = {}));
//# sourceMappingURL=ApplicationEvent.js.map