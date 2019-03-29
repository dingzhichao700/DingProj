var egret;
(function (egret) {
    /**
     * 技能类型
     */
    var SkillType = (function () {
        function SkillType() {
        }
        var __egretProto__ = SkillType.prototype;
        /**
         * 战士技能，普攻 0.4s
         * @type {number}
         */
        SkillType.WARRIOR_NORMAL = 11;
        /**
         * 战士技能，刺杀剑术 2s
         * @type {number}
         */
        SkillType.WARRIOR_CISHA = 12;
        /**
         * 战士技能，战魂真悟-群攻 4s
         * @type {number}
         */
        SkillType.WARRIOR_ZHANHUN = 13;
        /**
         * 战士技能，野蛮冲撞 6s
         * @type {number}
         */
        SkillType.WARRIOR_COLLIDE = 14;
        /**
         * 战士技能，烈火爆破-群攻 8s
         * @type {number}
         */
        SkillType.WARRIOR_LIEHUO = 15;
        /**
         * 法师技能，普攻 0.4s
         * @type {number}
         */
        SkillType.MAGE_NORMAL = 21;
        /**
         * 法师技能，雷电术 2s
         * @type {number}
         */
        SkillType.MAGE_THUNDER = 22;
        /**
         * 法师技能，疾光退-群攻 8s
         * @type {number}
         */
        SkillType.MAGE_THUNDER_BACK = 23;
        /**
         * 法师技能，金刚净化 6s
         * @type {number}
         */
        SkillType.MAGE_JINGAN = 24;
        /**
         * 法师技能，玄冰雷电-群攻 8s
         * @type {number}
         */
        SkillType.MAGE_XUANBING = 25;
        /**
         * 射手技能，普攻 0.4s
         * @type {number}
         */
        SkillType.BOWMAN_NORMAL = 31;
        /**
         * 射手技能，召唤神兽
         * @type {number}
         */
        SkillType.BOWMAN_CALL = 33;
        return SkillType;
    })();
    egret.SkillType = SkillType;
    SkillType.prototype.__class__ = "egret.SkillType";
})(egret || (egret = {}));
