/**
* 容器基类,所有的容器都应该继承这个
*
*/
var egret;
(function (egret) {
    var BaseView = (function (_super) {
        __extends(BaseView, _super);
        function BaseView() {
            _super.call(this);
            /**组件是否已初始化*/
            this.isCreate = false;
            this.addEventListener(egret.gui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this);
        }
        var __egretProto__ = BaseView.prototype;
        /** 创建完成*/
        __egretProto__.createCompleteEvent = function (event) {
            this.removeEventListener(egret.gui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this);
            this.onCreate();
        };
        __egretProto__.onCreate = function () {
            this.isCreate = true;
        };
        return BaseView;
    })(egret.gui.SkinnableContainer);
    egret.BaseView = BaseView;
    BaseView.prototype.__class__ = "egret.BaseView";
})(egret || (egret = {}));
//# sourceMappingURL=BaseView.js.map