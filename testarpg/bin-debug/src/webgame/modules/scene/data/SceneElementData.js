var egret;
(function (egret) {
    var SceneElementData = (function () {
        /**
         * 构造函数
         */
        function SceneElementData() {
            this._idGenerator = new egret.IDGenerator(-1);
        }
        var __egretProto__ = SceneElementData.prototype;
        SceneElementData.getInstance = function () {
            return SceneElementData._instance || (SceneElementData._instance = new SceneElementData());
        };
        //
        /**
         * 获取自动生成的场景元素id，非填表id，开始值为 -1，生成负数，避免与服务端数据冲突
         * @return
         *
         */
        __egretProto__.getAutoElementId = function () {
            return this._idGenerator.getID(false);
        };
        //
        /**
         * 场景元素速度
         * @return
         *
         */
        __egretProto__.getElementSpeed = function () {
            return 6;
        };
        //
        /**
         * 获取动作影片地址
         * @param path:String 路径
         * @param movieName:String 影片名称
         * @param actionType:int 动作类型
         * @return
         *
         */
        __egretProto__.getActionUrl = function (path, movieName, actionType) {
            if (actionType === void 0) { actionType = 1; }
            var fileName = movieName + "/" + movieName + "_" + actionType + egret.ExtensionType.JSON;
            return egret.dataManager().pathData.getResourceUrl(path, fileName);
        };
        //
        /**
         * Lo的动作配置数据中是否有指定动作类型
         * @param config:String 动作配置数据
         * @param actionType:int 动作类型
         * @return
         *
         */
        __egretProto__.hasActionType = function (config, actionType) {
            if (actionType === void 0) { actionType = 0; }
            return config.indexOf(actionType.toString()) != -1;
        };
        //
        /**
         * 设置玩家纸娃娃数据，有坐骑
         * @param vo:SceneAvatarVo 纸娃娃数据对象
         * @param vocation:int 职业
         * @param sex:int 性别
         * @param mountsState:int 坐骑状态
         * @param bodyLevel:int 主体等级
         * @param weaponLevel:int 武器等级
         * @param wingLevel:int 翅膀等级
         * @param mountsLevel:int 坐骑等级
         * @return
         *
         */
        __egretProto__.setSceneAvatarVoPlayer = function (vo, vocation, sex, mountsState, bodyLevel, weaponLevel, wingLevel, mountsLevel) {
            if (mountsLevel === void 0) { mountsLevel = 0; }
            //以下为多个部件时
            vo.body = "player_" + vocation + "_" + sex + "_" + bodyLevel + "_" + mountsState;
            vo.weapon = "weapon_" + vocation + "_" + sex + "_" + weaponLevel + "_" + mountsState;
            vo.wing = "wing_" + vocation + "_" + sex + "_" + wingLevel + "_" + mountsState;
            vo.mounts = "mounts_" + vocation + "_" + sex + "_" + mountsLevel + "_" + mountsState;
            return vo;
        };
        //
        /**
         * 设置玩家纸娃娃数据，无坐骑
         * @param vo:SceneAvatarVo 纸娃娃数据对象
         * @param vocation:int 职业
         * @param sex:int 性别
         * @param bodyLevel:int 主体等级
         * @param weaponLevel:int 武器等级
         * @param wingLevel:int 翅膀等级
         * @return
         *
         */
        __egretProto__.setSceneAvatarVoPlayer2 = function (vo, vocation, sex, bodyLevel, weaponLevel, wingLevel) {
            //以下为多个部件时
            vo.body = "player_" + vocation + "_" + sex + "_" + bodyLevel;
            vo.weapon = "weapon_" + vocation + "_" + sex + "_" + weaponLevel;
            vo.wing = "wing_" + vocation + "_" + sex + "_" + wingLevel;
            return vo;
        };
        //
        /**
         * 设置 普通 纸娃娃数据
         * @param vo
         * @param npcLo
         * @return
         *
         */
        __egretProto__.setSceneAvatarVo = function (vo, lo) {
            if (lo)
                vo.body = lo.movieName;
            return vo;
        };
        //
        /**
         * 获取技能动作名称
         * @param vocation 玩家职业
         * @param skillLevel 玩家技能等级
         * @param skillLevel2 玩家普攻技能等级
         * @returns {string}
         */
        __egretProto__.getSkillMovieName = function (vocation, skillLevel, skillLevel2) {
            if (skillLevel2 === void 0) { skillLevel2 = 0; }
            if (skillLevel2 > 0)
                return "skill_" + vocation + "_" + skillLevel + "_" + skillLevel2;
            return "skill_" + vocation + "_" + skillLevel;
        };
        /**
         * 到达元素周围半径，和元素距离小于此半径时，判定已到达
         */
        SceneElementData.ARRIVE_ELEMENT_RADIUS = 40;
        /**
         * 传送点半径，应 >= 地图节点的尺寸
         */
        SceneElementData.ENTRY_POINT_RADIUS = 20;
        SceneElementData._instance = null;
        return SceneElementData;
    })();
    egret.SceneElementData = SceneElementData;
    SceneElementData.prototype.__class__ = "egret.SceneElementData";
})(egret || (egret = {}));
//# sourceMappingURL=SceneElementData.js.map