var egret;
(function (egret) {
    var UpdateType = (function () {
        function UpdateType() {
        }
        var __egretProto__ = UpdateType.prototype;
        /**玩家升级*/
        UpdateType.LEVEL_UP = 101;
        /**玩家基本信息改变*/
        UpdateType.USER_INFO = 102;
        /**玩家收益倍数改变*/
        UpdateType.INCOME = 103;
        /**玩家无人机电力改变*/
        UpdateType.UAV_POWER = 104;
        /**玩家遭遇坎坷*/
        UpdateType.KANKE = 105;
        /**显示好友信息*/
        UpdateType.SHOW_FRIEND = 106;
        /**跳转到指定导航按钮*/
        UpdateType.NAVIGATE_LINK = 107;
        /**新手指引*/
        UpdateType.GUIDE = 108;
        /**战斗经验增加*/
        UpdateType.EXP_ADD = 201;
        /**激活宠物*/
        UpdateType.ADD_PET = 301;
        /**宠物停止工作*/
        UpdateType.PET_STRIKE = 302;
        /**宠物信息变化*/
        UpdateType.PET_INFO = 301;
        /**宠物工作*/
        UpdateType.PET_WORK = 304;
        /**道具变化*/
        UpdateType.PROP_CHANGE = 401;
        /**商城刷新*/
        UpdateType.MALL_UPDATE = 501;
        /**获取排行榜*/
        UpdateType.RANKING = 601;
        //场景
        UpdateType.PLAYER_EXIT_SCENE = 701;
        UpdateType.PLAYER_ENTER_SCENE = 702;
        UpdateType.PLAYER_VO_CHANGED = 703;
        /**怪物出生*/
        UpdateType.COPY_MONSTER_BORN = 704;
        /**伤害生命变化*/
        UpdateType.DAMAGE_HP_CHANGE = 705;
        /**切换斗罗之路副本*/
        UpdateType.CHANGE_SOULROAD = 706;
        /**切换副本*/
        UpdateType.CHANGE_COPY = 707;
        /**进入下一波战斗*/
        UpdateType.NEXT_TURN = 708;
        /**添加角色*/
        UpdateType.ADD_ROLE = 709;
        /**添加怪物*/
        UpdateType.ADD_MONSTER = 710;
        /**进入主城*/
        UpdateType.ENTER_CITY = 711;
        return UpdateType;
    })();
    egret.UpdateType = UpdateType;
    UpdateType.prototype.__class__ = "egret.UpdateType";
})(egret || (egret = {}));
//# sourceMappingURL=UpdateType.js.map