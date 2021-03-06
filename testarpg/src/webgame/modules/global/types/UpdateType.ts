module egret{
    export class UpdateType{
        /**玩家升级*/
        public static LEVEL_UP:number = 101;
        /**玩家基本信息改变*/
        public static USER_INFO:number = 102;
        /**玩家收益倍数改变*/
        public static INCOME:number = 103;
        /**玩家无人机电力改变*/
        public static UAV_POWER:number = 104;
        /**玩家遭遇坎坷*/
        public static KANKE:number = 105;
        /**显示好友信息*/
        public static SHOW_FRIEND:number = 106;
        /**跳转到指定导航按钮*/
        public static NAVIGATE_LINK:number = 107;
        /**新手指引*/
        public static GUIDE:number = 108;
        /**战斗经验增加*/
        public static EXP_ADD:number = 201;
        /**激活宠物*/
        public static ADD_PET:number = 301;
        /**宠物停止工作*/
        public static PET_STRIKE:number = 302;
        /**宠物信息变化*/
        public static PET_INFO:number = 301;
        /**宠物工作*/
        public static PET_WORK:number = 304;
        /**道具变化*/
        public static PROP_CHANGE:number = 401;
        /**商城刷新*/
        public static MALL_UPDATE:number = 501;
        /**获取排行榜*/
        public static RANKING:number = 601;
        //场景
        public static PLAYER_EXIT_SCENE:number = 701;
        public static PLAYER_ENTER_SCENE:number = 702;
        public static PLAYER_VO_CHANGED:number = 703;
        /**怪物出生*/
        public static COPY_MONSTER_BORN:number = 704;
        /**伤害生命变化*/
        public static DAMAGE_HP_CHANGE: number = 705;
        /**切换斗罗之路副本*/
        public static CHANGE_SOULROAD: number = 706;
        /**切换副本*/
        public static CHANGE_COPY:number = 707;
        /**进入下一波战斗*/
        public static NEXT_TURN:number = 708;
        /**添加角色*/
        public static ADD_ROLE:number = 709;
        /**添加怪物*/
        public static ADD_MONSTER: number = 710;
        /**进入主城*/
        public static ENTER_CITY: number = 711;
    }
}