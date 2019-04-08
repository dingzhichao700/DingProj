var egret;
(function (egret) {
    /**
     * 场景战斗元素基本数据
     */
    var SceneDriverVo = (function (_super) {
        __extends(SceneDriverVo, _super);
        function SceneDriverVo() {
            _super.apply(this, arguments);
            /**
             * 当前血量
             * @type {number}
             */
            this.hp = 1000;
            /**
             * 总血量
             * @type {number}
             */
            this.hpTotal = 1000;
        }
        var __egretProto__ = SceneDriverVo.prototype;
        return SceneDriverVo;
    })(egret.SceneElementVo);
    egret.SceneDriverVo = SceneDriverVo;
    SceneDriverVo.prototype.__class__ = "egret.SceneDriverVo";
})(egret || (egret = {}));
//# sourceMappingURL=SceneDriverVo.js.map