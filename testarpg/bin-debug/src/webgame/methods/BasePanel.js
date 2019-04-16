var egret;
(function (egret) {
    var BasePanel = (function (_super) {
        __extends(BasePanel, _super);
        function BasePanel() {
            _super.call(this);
            /** 类型 0为1级界面*/
            this.layerType = 0;
            /**是否序列化完成*/
            //        public isFirstCreate: Boolean = false;
            /**是否打开中（在舞台显示列表中）*/
            this.isOpen = false;
            /** 是否需要在创建完成时主动打开一次*/
            this.needOpenBack = false;
        }
        var __egretProto__ = BasePanel.prototype;
        __egretProto__.onCreate = function () {
            _super.prototype.onCreate.call(this);
            if (!this.isOpen) {
                this.openEnd(); //egret.gui.UIEvent.CREATION_COMPLETE好像只会在显示对象被添加到舞台后才会派发，所以onOpen放在这里  
            }
        };
        __egretProto__.openEnd = function () {
            if (this.isCreate) {
                this.isOpen = true;
                this.onOpen();
            }
        };
        __egretProto__.onOpen = function () {
        };
        __egretProto__.onClose = function () {
        };
        __egretProto__.open = function () {
            egret.ApplicationManager.getInstance().openView(this);
            if (this.layerType == BasePanel.LAYER_WINDOW_1 || this.layerType == BasePanel.LAYER_WINDOW_2) {
                egret.MainControl.getInstance().openMask();
            }
        };
        __egretProto__.close = function () {
            egret.ApplicationManager.getInstance().closeView(this);
            if (this.layerType == BasePanel.LAYER_WINDOW_1 || this.layerType == BasePanel.LAYER_WINDOW_2) {
                egret.MainControl.getInstance().closeMask();
            }
        };
        /**UI层*/
        BasePanel.LAYER_UI = 0;
        /**遮罩层*/
        BasePanel.LAYER_MASK = 1;
        /**一级面板层*/
        BasePanel.LAYER_WINDOW_1 = 2;
        /**二级面板层*/
        BasePanel.LAYER_WINDOW_2 = 3;
        /**tips层*/
        BasePanel.LAYER_TIP = 4;
        /**引导层*/
        BasePanel.LAYER_GUIDE = 5;
        /**警告*/
        BasePanel.LAYER_WARNING = 6;
        return BasePanel;
    })(egret.BaseView);
    egret.BasePanel = BasePanel;
    BasePanel.prototype.__class__ = "egret.BasePanel";
})(egret || (egret = {}));
//# sourceMappingURL=BasePanel.js.map