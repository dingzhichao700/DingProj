module egret{
    /**
     * 技能类型
     */
    export class SkillType{
        /**
         * 战士技能，普攻 0.4s
         * @type {number}
         */
        public static WARRIOR_NORMAL:number = 11;
        /**
         * 战士技能，刺杀剑术 2s
         * @type {number}
         */
        public static WARRIOR_CISHA:number = 12;
        /**
         * 战士技能，战魂真悟-群攻 4s
         * @type {number}
         */
        public static WARRIOR_ZHANHUN:number = 13;
        /**
         * 战士技能，野蛮冲撞 6s
         * @type {number}
         */
        public static WARRIOR_COLLIDE:number = 14;
        /**
         * 战士技能，烈火爆破-群攻 8s
         * @type {number}
         */
        public static WARRIOR_LIEHUO:number = 15;
        /**
         * 法师技能，普攻 0.4s
         * @type {number}
         */
        public static MAGE_NORMAL:number = 21;
        /**
         * 法师技能，雷电术 2s
         * @type {number}
         */
        public static MAGE_THUNDER:number = 22;
        /**
         * 法师技能，疾光退-群攻 8s
         * @type {number}
         */
        public static MAGE_THUNDER_BACK:number = 23;
        /**
         * 法师技能，金刚净化 6s
         * @type {number}
         */
        public static MAGE_JINGAN:number = 24;
        /**
         * 法师技能，玄冰雷电-群攻 8s
         * @type {number}
         */
        public static MAGE_XUANBING:number = 25;
        /**
         * 射手技能，普攻 0.4s
         * @type {number}
         */
        public static BOWMAN_NORMAL:number = 31;
        /**
         * 射手技能，召唤神兽
         * @type {number}
         */
        public static BOWMAN_CALL:number = 33;
    }
}