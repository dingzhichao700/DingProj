var egret;
(function (egret) {
    var SceneElementLayerType = (function () {
        function SceneElementLayerType() {
        }
        var __egretProto__ = SceneElementLayerType.prototype;
        /**
         * 层级配置
         */
        SceneElementLayerType.LAYER_MOUSE_CONFIGS = [
            { touchEanbled: false, touchChildren: false },
            { touchEanbled: false, touchChildren: false },
            { touchEanbled: false, touchChildren: false },
            { touchEanbled: false, touchChildren: false },
            { touchEanbled: false, touchChildren: false },
        ];
        /**
         * 头顶buff层
         */
        SceneElementLayerType.BUFF_ABOVE = 4;
        /**
         * 主体buff层
         */
        SceneElementLayerType.BUFF_BODY = 3;
        /**
         * 动作层
         */
        SceneElementLayerType.ACTION = 2;
        /**
         * 地面buff层
         */
        SceneElementLayerType.BUFF_BACKGROUND = 1;
        /**
         * 底层，用于扩展
         */
        SceneElementLayerType.BOTTOM = 0;
        return SceneElementLayerType;
    })();
    egret.SceneElementLayerType = SceneElementLayerType;
    SceneElementLayerType.prototype.__class__ = "egret.SceneElementLayerType";
})(egret || (egret = {}));
