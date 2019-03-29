var egret;
(function (egret) {
    var SceneNavigatorDataItem = (function () {
        function SceneNavigatorDataItem() {
            /**
             * x坐标
             */
            this.x = -1;
            /**
             * y坐标
             */
            this.y = -1;
            /**
             * 场景元素id
             */
            this.elementId = 0;
            /**
             * 场景id
             */
            this.sceneId = -1;
        }
        var __egretProto__ = SceneNavigatorDataItem.prototype;
        return SceneNavigatorDataItem;
    })();
    egret.SceneNavigatorDataItem = SceneNavigatorDataItem;
    SceneNavigatorDataItem.prototype.__class__ = "egret.SceneNavigatorDataItem";
})(egret || (egret = {}));
