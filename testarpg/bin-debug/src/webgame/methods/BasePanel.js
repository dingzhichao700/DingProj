var egret;
(function (egret) {
    var BasePanel = (function (_super) {
        __extends(BasePanel, _super);
        function BasePanel() {
            _super.call(this);
            /** 类型 0为1级界面*/
            this.layerType = 0;
            /** 是否需要在创建完成时主动打开一次*/
            this.needOpenBack = false;
        }
        var __egretProto__ = BasePanel.prototype;
        __egretProto__.onCreate = function () {
            _super.prototype.onCreate.call(this);
            this.onOpen(); //egret.gui.UIEvent.CREATION_COMPLETE好像只会在显示对象被添加到舞台后才会出发，所以onOpen放在这里
        };
        __egretProto__.onOpen = function () {
        };
        __egretProto__.onClose = function () {
        };
        __egretProto__.open = function () {
            egret.ApplicationManager.getInstance().openView(this);
        };
        __egretProto__.close = function () {
            egret.ApplicationManager.getInstance().closeView(this);
        };
        /**UI层*/
        BasePanel.LAYER_UI = 0;
        /**一级面板层*/
        BasePanel.LAYER_WINDOW_1 = 1;
        /**二级面板层*/
        BasePanel.LAYER_WINDOW_2 = 2;
        /**tips层*/
        BasePanel.LAYER_TIP = 3;
        /**引导层*/
        BasePanel.LAYER_GUIDE = 4;
        return BasePanel;
    })(egret.BaseView);
    egret.BasePanel = BasePanel;
    BasePanel.prototype.__class__ = "egret.BasePanel";
})(egret || (egret = {}));
//# sourceMappingURL=BasePanel.js.map