var egret;
(function (egret) {
    /**
     * ScenePlayerVo 场景玩家数据 <br/>
     * @author Dempsey <br/>
     * 2013-10-5
     */
    var ScenePlayerVo = (function (_super) {
        __extends(ScenePlayerVo, _super);
        function ScenePlayerVo() {
            _super.call(this);
            /**
             * 性别 SexType 0：未知，1:男，2：女
             */
            this.sex = 1;
            /**
             * 等级
             */
            this.level = 0;
            /**
             * 职业 VocationType
             */
            this.vocation = 0;
            /**
             * 角色主体等级
             */
            this.bodyLevel = 1;
            /**
             * 武器等级
             */
            this.weaponLevel = 1;
            /**
             * 翅膀等级
             */
            this.wingLevel = 1;
            /**
             * 坐骑等级
             */
            this.mountsLevel = 1;
            /**
             * 坐骑状态 MountedType
             */
            this.mountsState = 1; //1,2,3，正常，坐骑，飞骑
        }
        var __egretProto__ = ScenePlayerVo.prototype;
        return ScenePlayerVo;
    })(egret.SceneDriverVo);
    egret.ScenePlayerVo = ScenePlayerVo;
    ScenePlayerVo.prototype.__class__ = "egret.ScenePlayerVo";
})(egret || (egret = {}));
