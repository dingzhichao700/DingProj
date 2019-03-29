var egret;
(function (egret) {
    var ApplicationLayerType = (function () {
        function ApplicationLayerType() {
        }
        var __egretProto__ = ApplicationLayerType.prototype;
        /**
         * 层级配置
         */
        ApplicationLayerType.LAYER_MOUSE_CONFIGS = [
            { touchEnabled: false, touchChildren: true, model: false, alpha: 0 },
            { touchEnabled: false, touchChildren: true, model: false, alpha: 0 },
            { touchEnabled: true, touchChildren: true, model: true, alpha: 1 },
            { touchEnabled: false, touchChildren: true, model: false, alpha: 0 },
            { touchEnabled: false, touchChildren: true, model: false, alpha: 0 },
            { touchEnabled: false, touchChildren: true, model: false, alpha: 0 },
            { touchEnabled: true, touchChildren: true, model: true, alpha: 1 },
            { touchEnabled: true, touchChildren: true, model: true, alpha: 0.6 },
            { touchEnabled: true, touchChildren: true, model: true, alpha: 0.6 },
            { touchEnabled: false, touchChildren: false, model: false, alpha: 0 },
            { touchEnabled: false, touchChildren: false, model: false, alpha: 0 },
            { touchEnabled: false, touchChildren: true, model: false, alpha: 0 },
            { touchEnabled: true, touchChildren: false, model: true, alpha: 0 },
            { touchEnabled: false, touchChildren: false, model: false, alpha: 0 },
            { touchEnabled: false, touchChildren: false, model: false, alpha: 0 }
        ];
        /**
         * 鼠标层，显示自定义鼠标等 ，不响应鼠标操作 14
         */
        ApplicationLayerType.MOUSE = 14;
        /**
         * tooltip 层，不响应鼠标操作 13
         */
        ApplicationLayerType.TOOLTIP = 13;
        /**
         * Loading层 12
         */
        ApplicationLayerType.LOADING = 12;
        /**
         * 菜单层 11
         */
        ApplicationLayerType.MENU = 11;
        /**
         * 非场景特效层，不响应鼠标操作 10
         */
        ApplicationLayerType.EFFECT = 10;
        /**
         * 交互拖动层，显示容器之间拖动物件等 9
         */
        ApplicationLayerType.INTERACTIVE = 9;
        /**
         * 顶级弹出层，此层屏蔽下方的层级进行交互 8
         */
        ApplicationLayerType.POP_UP_TOP = 8;
        /**
         * 弹出层，此层屏蔽下方的层级进行交互 7
         */
        ApplicationLayerType.POP_UP = 7;
        /**
         * 全屏层 6
         */
        ApplicationLayerType.FULL_SCREEN_TOP = 6;
        /**
         * 顶级窗口层，显示窗口等交互界面 5
         */
        ApplicationLayerType.WINDOW_TOP = 5;
        /**
         * 顶级UI层 4
         */
        ApplicationLayerType.UI_TOP = 4;
        /**
         * 普通窗口层，显示窗口等交互界面 3
         */
        ApplicationLayerType.WINDOW = 3;
        /**
         * 全屏层 2
         */
        ApplicationLayerType.FULL_SCREEN = 2;
        /**
         * UI层，通常一直显示在界面上的界面层  1
         */
        ApplicationLayerType.UI = 1;
        /**
         * 底层 0
         */
        ApplicationLayerType.BOTTOM = 0;
        return ApplicationLayerType;
    })();
    egret.ApplicationLayerType = ApplicationLayerType;
    ApplicationLayerType.prototype.__class__ = "egret.ApplicationLayerType";
})(egret || (egret = {}));
