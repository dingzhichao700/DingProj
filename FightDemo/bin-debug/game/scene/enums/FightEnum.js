var game;
(function (game) {
    /**属性枚举 */
    var Enum_Attr;
    (function (Enum_Attr) {
        Enum_Attr[Enum_Attr["hp"] = 1] = "hp";
        Enum_Attr[Enum_Attr["totalHp"] = 2] = "totalHp";
        /**移动速度*/
        Enum_Attr[Enum_Attr["speed"] = 3] = "speed";
        /**物防*/
        Enum_Attr[Enum_Attr["def"] = 4] = "def";
        /**魔防*/
        Enum_Attr[Enum_Attr["magicdefense"] = 5] = "magicdefense";
        /**攻击 */
        Enum_Attr[Enum_Attr["attack"] = 6] = "attack";
        /**	暴击机率 */
        Enum_Attr[Enum_Attr["crit"] = 7] = "crit";
        /**	暴击伤害 */
        Enum_Attr[Enum_Attr["critDamage"] = 8] = "critDamage";
        /**韧性 */
        Enum_Attr[Enum_Attr["tenacity"] = 9] = "tenacity";
        /**物理破甲 */
        Enum_Attr[Enum_Attr["physics_puncture"] = 10] = "physics_puncture";
        /**魔法破甲 */
        Enum_Attr[Enum_Attr["magic_puncture"] = 11] = "magic_puncture";
        /**物理伤害减免 */
        Enum_Attr[Enum_Attr["physics_HurtImmune"] = 12] = "physics_HurtImmune";
        /**魔法伤害减免*/
        Enum_Attr[Enum_Attr["magic_HurtImmune"] = 13] = "magic_HurtImmune";
        /**命中 */
        Enum_Attr[Enum_Attr["hit"] = 14] = "hit";
        /**抗暴击机率 */
        Enum_Attr[Enum_Attr["resistcrit"] = 15] = "resistcrit";
        /**抗暴击伤害 */
        Enum_Attr[Enum_Attr["resistdamage"] = 16] = "resistdamage";
    })(Enum_Attr = game.Enum_Attr || (game.Enum_Attr = {}));
    /***职业 */
    var ENUM_JOB_TYPE;
    (function (ENUM_JOB_TYPE) {
        /**战士 */
        ENUM_JOB_TYPE[ENUM_JOB_TYPE["job_ZS"] = 1] = "job_ZS";
        /**弓箭手 */
        ENUM_JOB_TYPE[ENUM_JOB_TYPE["JOB_GJS"] = 2] = "JOB_GJS";
        /**刺客 */
        ENUM_JOB_TYPE[ENUM_JOB_TYPE["JOB_CK"] = 3] = "JOB_CK";
        /**法师 */
        ENUM_JOB_TYPE[ENUM_JOB_TYPE["JOB_FS"] = 4] = "JOB_FS";
        /**巫师 */
        ENUM_JOB_TYPE[ENUM_JOB_TYPE["JOB_WS"] = 5] = "JOB_WS";
    })(ENUM_JOB_TYPE = game.ENUM_JOB_TYPE || (game.ENUM_JOB_TYPE = {}));
    /**人物动作类型 */
    var ENUM_DriverAction;
    (function (ENUM_DriverAction) {
        ENUM_DriverAction[ENUM_DriverAction["stand"] = 1] = "stand";
        ENUM_DriverAction[ENUM_DriverAction["run"] = 2] = "run";
        ENUM_DriverAction[ENUM_DriverAction["attack"] = 3] = "attack";
    })(ENUM_DriverAction = game.ENUM_DriverAction || (game.ENUM_DriverAction = {}));
    /**人物方向 */
    var ENUM_DriverDirection;
    (function (ENUM_DriverDirection) {
        ENUM_DriverDirection[ENUM_DriverDirection["up"] = 1] = "up";
        ENUM_DriverDirection[ENUM_DriverDirection["down"] = 5] = "down";
    })(ENUM_DriverDirection = game.ENUM_DriverDirection || (game.ENUM_DriverDirection = {}));
    /**地图上的物体对象类型 */
    var ENUM_DriverType;
    (function (ENUM_DriverType) {
        ENUM_DriverType[ENUM_DriverType["monster"] = 1] = "monster";
        ENUM_DriverType[ENUM_DriverType["role"] = 2] = "role";
        ENUM_DriverType[ENUM_DriverType["bullet"] = 3] = "bullet";
    })(ENUM_DriverType = game.ENUM_DriverType || (game.ENUM_DriverType = {}));
    /**地图上物休对象渲染层次 */
    var ENUM_DriverRenderLayerId;
    (function (ENUM_DriverRenderLayerId) {
        ENUM_DriverRenderLayerId[ENUM_DriverRenderLayerId["monsterLayer"] = 1] = "monsterLayer";
        ENUM_DriverRenderLayerId[ENUM_DriverRenderLayerId["bulletLayer"] = 2] = "bulletLayer";
        ENUM_DriverRenderLayerId[ENUM_DriverRenderLayerId["roleLayer"] = 3] = "roleLayer";
    })(ENUM_DriverRenderLayerId = game.ENUM_DriverRenderLayerId || (game.ENUM_DriverRenderLayerId = {}));
    /**怪物类型 */
    var ENUM_Monster_type;
    (function (ENUM_Monster_type) {
        ENUM_Monster_type[ENUM_Monster_type["normal"] = 1] = "normal";
        ENUM_Monster_type[ENUM_Monster_type["elite"] = 2] = "elite";
        ENUM_Monster_type[ENUM_Monster_type["BOSS"] = 3] = "BOSS";
        ENUM_Monster_type[ENUM_Monster_type["minority"] = 4] = "minority";
    })(ENUM_Monster_type = game.ENUM_Monster_type || (game.ENUM_Monster_type = {}));
    /**buff效果类型 */
    var ENUM_BuffEffect;
    (function (ENUM_BuffEffect) {
        /**增加或减少当前生命值 */
        ENUM_BuffEffect[ENUM_BuffEffect["HP"] = 1] = "HP";
        /**增加或减少移动速度 */
        ENUM_BuffEffect[ENUM_BuffEffect["SPEED"] = 2] = "SPEED";
        /**增加或减少暴击 */
        ENUM_BuffEffect[ENUM_BuffEffect["CRITIC"] = 3] = "CRITIC";
        /**增加或减少物理防御 */
        ENUM_BuffEffect[ENUM_BuffEffect["PHYSICS_DEF"] = 4] = "PHYSICS_DEF";
        /**增加或减少魔法防御 */
        ENUM_BuffEffect[ENUM_BuffEffect["MAGIC_DEF"] = 5] = "MAGIC_DEF";
        /**增加或减少攻击力 */
        ENUM_BuffEffect[ENUM_BuffEffect["ATTACK"] = 6] = "ATTACK";
        /**增加或减少命中 */
        ENUM_BuffEffect[ENUM_BuffEffect["HIT"] = 7] = "HIT";
        /**增加或减少攻击速度 */
        ENUM_BuffEffect[ENUM_BuffEffect["ATTACK_SPEED"] = 8] = "ATTACK_SPEED";
        /**增加或减少装弹速度 */
        ENUM_BuffEffect[ENUM_BuffEffect["PUTON_BULLET_SPEED"] = 9] = "PUTON_BULLET_SPEED";
        /** 增加或减少子弹消耗量*/
        ENUM_BuffEffect[ENUM_BuffEffect["ATTACK_EXPEND_SPEED"] = 10] = "ATTACK_EXPEND_SPEED";
        /**眩晕（不能攻击，不能移动） */
        ENUM_BuffEffect[ENUM_BuffEffect["SWOON"] = 11] = "SWOON";
        /**增加或减少血量上限 */
        ENUM_BuffEffect[ENUM_BuffEffect["HP_MAX"] = 12] = "HP_MAX";
        /**魔法伤害减免 */
        ENUM_BuffEffect[ENUM_BuffEffect["MAGIC_HURT_IMMUNE"] = 13] = "MAGIC_HURT_IMMUNE";
        /**物理伤害减免 */
        ENUM_BuffEffect[ENUM_BuffEffect["PHYSICS_HURT_IMMUNE"] = 14] = "PHYSICS_HURT_IMMUNE";
        /**增加或减少物理破甲 */
        ENUM_BuffEffect[ENUM_BuffEffect["PHYSICS_PUNCTURE"] = 17] = "PHYSICS_PUNCTURE";
        /**增加或减少魔法破甲 */
        ENUM_BuffEffect[ENUM_BuffEffect["MAGIC_PUNCTURE"] = 18] = "MAGIC_PUNCTURE";
    })(ENUM_BuffEffect = game.ENUM_BuffEffect || (game.ENUM_BuffEffect = {}));
    /**buff 触发条件*/
    var Enum_BuffTrigger;
    (function (Enum_BuffTrigger) {
        Enum_BuffTrigger[Enum_BuffTrigger["create"] = 1] = "create";
        /** 发射子弹*/
        Enum_BuffTrigger[Enum_BuffTrigger["shooting"] = 2] = "shooting";
        Enum_BuffTrigger[Enum_BuffTrigger["die"] = 3] = "die";
        Enum_BuffTrigger[Enum_BuffTrigger["time"] = 4] = "time";
        Enum_BuffTrigger[Enum_BuffTrigger["max"] = 4] = "max";
    })(Enum_BuffTrigger = game.Enum_BuffTrigger || (game.Enum_BuffTrigger = {}));
    /**buff作用对象 */
    var Enum_BuffTargetType;
    (function (Enum_BuffTargetType) {
        Enum_BuffTargetType[Enum_BuffTargetType["mySelf"] = 1] = "mySelf";
        Enum_BuffTargetType[Enum_BuffTargetType["target"] = 2] = "target";
        Enum_BuffTargetType[Enum_BuffTargetType["teammate"] = 3] = "teammate";
        /**敌方 */
        Enum_BuffTargetType[Enum_BuffTargetType["enemys"] = 4] = "enemys";
    })(Enum_BuffTargetType = game.Enum_BuffTargetType || (game.Enum_BuffTargetType = {}));
})(game || (game = {}));
//# sourceMappingURL=FightEnum.js.map