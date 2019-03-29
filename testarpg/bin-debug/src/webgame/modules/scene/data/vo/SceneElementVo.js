var egret;
(function (egret) {
    /**
     * SceneElementVo 场景元素数据<br/>
     * @author Dempsey <br/>
     * 2013-9-30
     */
    var SceneElementVo = (function (_super) {
        __extends(SceneElementVo, _super);
        function SceneElementVo() {
            _super.call(this);
            /**
             * 用户 id
             */
            this.id = 0;
            /**
             * id 字符串形式，用于内存优化
             */
            this.idString = null;
            /**
             * x坐标
             */
            this.x = 0;
            /**
             * y坐标
             */
            this.y = 0;
            /**
             * 元素显示的名称
             */
            this.name = "";
        }
        var __egretProto__ = SceneElementVo.prototype;
        return SceneElementVo;
    })(egret.BaseVo);
    egret.SceneElementVo = SceneElementVo;
    SceneElementVo.prototype.__class__ = "egret.SceneElementVo";
})(egret || (egret = {}));
