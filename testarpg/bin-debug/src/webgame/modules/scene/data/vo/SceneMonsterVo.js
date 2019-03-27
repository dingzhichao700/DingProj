var egret;
(function (egret) {
    /**
     * 怪物场景数据 <br/>
     * @author Dempsey <br/>
     * 2014-2-20
     */
    var SceneMonsterVo = (function (_super) {
        __extends(SceneMonsterVo, _super);
        function SceneMonsterVo() {
            _super.apply(this, arguments);
            /**
             * 基础表 id
             * @type {number}
             */
            this.baseId = 0;
        }
        var __egretProto__ = SceneMonsterVo.prototype;
        return SceneMonsterVo;
    })(egret.SceneDriverVo);
    egret.SceneMonsterVo = SceneMonsterVo;
    SceneMonsterVo.prototype.__class__ = "egret.SceneMonsterVo";
})(egret || (egret = {}));
//# sourceMappingURL=SceneMonsterVo.js.map