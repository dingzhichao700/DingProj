var egret;
(function (egret) {
    var SkillManager = (function () {
        function SkillManager() {
        }
        var __egretProto__ = SkillManager.prototype;
        SkillManager.getInstance = function () {
            if (!SkillManager._instance) {
                SkillManager._instance = new SkillManager();
            }
            return SkillManager._instance;
        };
        __egretProto__.initCfg = function () {
            if (!this.skillCfgs) {
                this.skillCfgs = [];
                for (var i = 0; i < SkillManager.SKILL_CONFIG.length; i++) {
                    var str = SkillManager.SKILL_CONFIG[i];
                    var strList = str.split(",");
                    var cfg = new SkillCfg();
                    cfg.id = Number(strList[0]);
                    cfg.name = strList[1];
                    cfg.desc = strList[2];
                    this.skillCfgs.push(cfg);
                }
            }
        };
        __egretProto__.getCfg = function (id) {
            this.initCfg();
            for (var i = 0; i < this.skillCfgs.length; i++) {
                var cfg = this.skillCfgs[i];
                if (cfg.id == id) {
                    return cfg;
                }
            }
            return null;
        };
        SkillManager.SKILL_CONFIG = [
            "1,烈焰,灼烧敌人,造成大量伤害",
            "2,暴揍,提高普攻伤害",
            "3,雷神锤,雷神锤降世,横扫敌军",
            "4,暴走,提升召唤物伤害",
            "5,铁爪,对敌人造成撕裂伤害",
            "6,自焚,敌我双方同时受到大量伤害",
            "7,瞬移,提升自身移速",
            "8,致盲,降低敌方命中",
            "9,火球,瞬发一个火球追击敌人",
            "10,沸腾,提升自身攻击伤害",
            "11,复生,为自身添加复活状态",
            "12,狂怒,提升自身攻速和攻击力",
            "13,灵羽,释放三根尾羽追击敌人",
            "14,强化,提升自身攻防属性",
            "15,雷神降临,攻击敌方时附带雷属性伤害",
            "16,召唤强化,提升召唤物属性",
            "17,固守,提升召唤物防御",
            "18,灵魂附体,短时间内提升自身伤害加成属性",
            "19,免疫,短时间内处于无敌状态",
            "20,三叉戟,攻击敌方时附带水属性伤害",
            "21,战无不胜,免疫死亡效果,提升输出",
            "22,潜行,背击敌人时额外附加伤害",
            "23,宝典,提升自身法术伤害",
            "24,汲取,偷取敌方属性补给自身",
            "25,玲珑火,对敌人造成火属性伤害",
            "26,强击,提升破甲伤害",
            "27,返祖,上祖附体,提升自身防御",
            "28,涟漪,减少自己受到的水属性伤害",
            "29,攻击强化,提升自身攻击",
            "30,生命强化,提升自身生命",
            "31,防御强化,提升自身防御",
            "32,肉盾,降低输出并大幅提升防御力"
        ];
        return SkillManager;
    })();
    egret.SkillManager = SkillManager;
    SkillManager.prototype.__class__ = "egret.SkillManager";
})(egret || (egret = {}));
//# sourceMappingURL=SkillManager.js.map