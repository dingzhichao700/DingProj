
module egret {

    export class SkillManager {

        private skillCfgs: Array<SkillCfg>;
        
        private static SKILL_CONFIG: Array<any> = [
            "1,烈焰,灼烧敌人，造成320点火焰伤害",
            "2,暴揍,提高近战角色的普攻伤害，并有概率陷入暴走状态",
            "3,雷神锤,召唤雷神锤降世，横扫敌军，并附加240点雷属性伤害",
            "4,暴走,使己方召唤物陷入暴走状态，提升召唤物伤害",
            "5,铁爪,对敌人造成300点撕裂伤害，并有概率造成流血效果",
            "6,自焚,提升敌我双方受到的伤害，并附加燃烧效果",
            "7,瞬移,提升自身移速，使自身能在场中高速移动",
            "8,致盲,降低敌方命中，使被攻击到的敌人视野缩小",
            "9,火球,瞬发一个火球追击敌人，释放距离越远,伤害越高",
            "10,沸腾,提升自身攻击伤害，并由概率造成多倍伤害",
            "11,复生,为自身添加复活状态，在短时间内受到致命伤害可免疫死亡",
            "12,狂怒,提升自身攻速和攻击力，并提升对同一个敌人造成的伤害",
            "13,灵羽,释放三根尾羽追击敌人，同时被三根尾羽命中的敌人受到额外伤害",
            "14,强化,提升自身攻防属性，持续一定时间，结束后陷入虚弱状态",
            "15,雷神降临,攻击敌方时附带雷属性伤害，并由概率麻痹敌方",
            "16,召唤强化,提升召唤物生命，攻击，防御等基础属性",
            "17,固守,短时间内大幅提升召唤物和自身的防御",
            "18,灵魂附体,短时间内提升自身伤害加成属性，并有几率偷取敌方攻击",
            "19,免疫,短时间内处于无敌状态，并免疫控制效果",
            "20,三叉戟,攻击敌方时附带水属性伤害，并附加持续性的水属性伤害",
            "21,战无不胜,免疫死亡效果，提升输出,击杀敌方后回复血量",
            "22,潜行,背击敌人时额外附加伤害，并有概率造成眩晕",
            "23,宝典,提升自身法术伤害，并提升法术暴击几率",
            "24,汲取,偷取敌方属性补给自身，但只有部分属性会转移给自身",
            "25,玲珑火,对敌人造成火属性伤害，属于持续型技能",
            "26,强击,提升破甲伤害和破甲几率，并使被命中方陷入受损状态",
            "27,返祖,呼唤上祖附体，提升自身防御和攻击，受控制时间延长",
            "28,涟漪,减少自己受到的水属性伤害，并有几率反弹部分伤害给攻击方",
            "29,攻击强化,有几率提升自身2-8倍攻击，提升输出能力",
            "30,生命强化,短时间内提升自身生命，并附加持续回血效果",
            "31,防御强化,降低自身输出，大幅提升自身防御力，并有概率免疫部分伤害",
            "32,肉盾,降低所有受到的伤害50%，免疫控制并嘲讽敌方"];
            
        private static _instance: SkillManager;

        public static getInstance(): SkillManager {
            if(!SkillManager._instance) {
                SkillManager._instance = new SkillManager();
            }
            return SkillManager._instance;
        }
        
        public constructor() {
        }
        
        public initCfg():void {
            if(!this.skillCfgs) {
                this.skillCfgs = [];
                for(var i: number = 0;i < SkillManager.SKILL_CONFIG.length;i++) {
                    var str: string = SkillManager.SKILL_CONFIG[i];
                    var strList: Array<string> = str.split(",");
                    var cfg: SkillCfg = new SkillCfg();
                    cfg.id = Number(strList[0]);
                    cfg.name = strList[1];
                    cfg.desc = strList[2];
                    this.skillCfgs.push(cfg);
                }
            }
        }
        
        public getCfg(id:number):SkillCfg {
            this.initCfg();
            for(var i: number = 0;i < this.skillCfgs.length;i++){
                var cfg:SkillCfg = this.skillCfgs[i];
                if(cfg.id == id){
                    return cfg;
                }
            }
            return null;
        }
        
    }
}
