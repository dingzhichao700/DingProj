var egret;
(function (egret) {
    /**
     * 影片数据
     */
    var SceneAvatarVo = (function () {
        function SceneAvatarVo() {
            /**
             * 主体动作名称
             */
            this.body = null;
            /**
             * 服装动作名称
             */
            this.clothing = null;
            /**
             * 武器动作名称
             */
            this.weapon = null;
            /**
             * 翅膀动作名称
             */
            this.wing = null;
            /**
             * 坐骑动作名称
             */
            this.mounts = null;
        }
        var __egretProto__ = SceneAvatarVo.prototype;
        return SceneAvatarVo;
    })();
    egret.SceneAvatarVo = SceneAvatarVo;
    SceneAvatarVo.prototype.__class__ = "egret.SceneAvatarVo";
})(egret || (egret = {}));
//# sourceMappingURL=SceneAvatarVo.js.map