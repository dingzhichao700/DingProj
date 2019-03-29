var egret;
(function (egret) {
    /**
     * 场景类型
     */
    var SceneType = (function () {
        function SceneType() {
        }
        var __egretProto__ = SceneType.prototype;
        /**
         * 普通副本
         */
        SceneType.NORMAL_COPY = 1;
        /**
         * Boss副本
         */
        SceneType.BOSS_COPY = 2;
        /**
         * 竞技场
         */
        SceneType.ARENA = 3;
        return SceneType;
    })();
    egret.SceneType = SceneType;
    SceneType.prototype.__class__ = "egret.SceneType";
})(egret || (egret = {}));
