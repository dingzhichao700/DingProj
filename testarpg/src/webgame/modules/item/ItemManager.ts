
module egret {

    export class ItemManager {

        private itemCfgs: Array<ItemConfig>;
        private static ITEM_QUALITY: Array<any> = ["", "白色","橙色","紫色","红色","幻彩"];

        private static ITEM_CONFIG: Array<any> = [
            "1,暴雨梨花针,1,唐门特制暗器之一,是镇门至宝",
            "2,血刃,1,刃边阴冷无比,会吸收敌人的血液",
            "3,血滴子,1,杀人利器,杀人于无形之中",
            "4,袖爪,1,隐藏在长袍中,可发动出其不意的进攻",
            "5,孔明扇,1,一扇生水二扇生火",
            "6,风轮,1,其速如风,无可闪避",
            "7,子母雷,1,双雷一起爆,杀伤力极大",
            "8,阎王贴,1,中者难活,阎王难救",
            "9,龙须针,1,针体细小,伤害巨大",
            "10,明珠结,1,佩戴可辅助修炼",
            "11, 秘银胸甲,1,佩戴后防御提升,以秘银打造",
            "12, 秘银护手,1,以古法对秘银进行萃取,提升秘银韧性的护手",
            "13, 镀金护手,2,富人用来满足虚荣心而镀的真金护手",
            "14, 绛蓝护手,3,被强大僧人施加法咒的护手",
            "15, 秘银护腿,1,佩戴后减少腿部受到的伤害,以秘银打造",
            "16, 镀金护腿,2,传说中永不染血的护腿",
            "17, 绛蓝护腿,3,被法咒加成的护腿,大大提升防御力",
            "18, 秘银长靴,1,佩戴后可提升行进速度,以秘银打造",
            "19, 镀金长靴,2,比秘银长靴耐久更高的长靴",
            "20, 绛蓝长靴,3,穿戴后行走如风",
            "21, 护心戒,4,世家供奉的戒指,世间少有",
            "22, 无畏戒,5,佩戴后提升佩戴者勇气,可鼓舞士气",
            "23, 修罗头盔,4,传说战场战神佩戴的头盔,煞气浓厚",
            "24, 紫水晶,3,战斗时可镇定人心神",
            "25, 蓝水晶,2,战斗时可提升使用者防御",
            "26, 紫神核,3,神界遗落的残骸,修复后可使用,使用后提升友军攻击"];
        
        private static _instance: ItemManager;

        public static getInstance(): ItemManager {
            if(!ItemManager._instance) {
                ItemManager._instance = new ItemManager();
            }
            return ItemManager._instance;
        }

        public constructor() {
        }
        
        private initCfg():void {
            if(!this.itemCfgs) {
                this.itemCfgs = [];
                for(var i: number = 0;i < ItemManager.ITEM_CONFIG.length;i++) {
                    var str: string = ItemManager.ITEM_CONFIG[i];
                    var strList: Array<string> = str.split(",");
                    var cfg: ItemConfig = new ItemConfig();
                    cfg.id = Number(strList[0]);
                    cfg.name = strList[1];
                    cfg.quality = Number(strList[2]); 
                    cfg.desc = strList[3]; 
                    this.itemCfgs.push(cfg);
                }
            }
        }

        /**获取item配置*/
        public getCfg(id:number): ItemConfig {
            this.initCfg();
            for(var i: number = 0;i < this.itemCfgs.length;i++){
                var cfg: ItemConfig = this.itemCfgs[i];
                if(cfg.id == id){
                    return cfg;
                }
            }
            return null;
        }
        
        public getQuaByType(index:number):string {
            return ItemManager.ITEM_QUALITY[index];
        }
        
    }
}
