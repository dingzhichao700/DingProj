var egret;
(function (egret) {
    var SceneElementEvent = (function (_super) {
        __extends(SceneElementEvent, _super);
        /**
         * 构造函数
         */
        function SceneElementEvent(type, bubbles, cancelable) {
            if (bubbles === void 0) { bubbles = false; }
            if (cancelable === void 0) { cancelable = false; }
            _super.call(this, type, bubbles, cancelable);
        }
        var __egretProto__ = SceneElementEvent.prototype;
        /**
         * 场景元素移动，不冒泡
         */
        SceneElementEvent.SCENE_ELEMENT_MOVING = "sceneElementMoving";
        /**
         * 场景元素移动结束，冒泡
         */
        SceneElementEvent.SCENE_ELEMENT_MOVING_END = "sceneElementMovingEnd";
        /**
         * 场景元素路径改变，不冒泡
         */
        SceneElementEvent.SCENE_ELEMENT_PATH_CHANGED = "sceneElementPathChanged";
        return SceneElementEvent;
    })(egret.Event);
    egret.SceneElementEvent = SceneElementEvent;
    SceneElementEvent.prototype.__class__ = "egret.SceneElementEvent";
})(egret || (egret = {}));
//# sourceMappingURL=SceneElementEvent.js.map