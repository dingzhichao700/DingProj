
module egret {

    export class ItemManager {

        private itemCfgs: Array<ItemConfig>;
        private static ITEM_QUALITY: Array<any> = ["", "白色","橙色","紫色","红色","幻彩"];

        private static ITEM_CONFIG: Array<any> = [
            "1,千钧,2",
            "2,回旋刃,1",
            "3,血滴子,1",
            "4,峨眉爪,1",
            "5,峨眉刺,1",
            "6,峨眉刺,1",
            "7,峨眉刺,1",
            "8,峨眉刺,1",
            "9,双股剑,5",
            "10,乾坤宝珠,4",
            "11,峨眉刺,1",
            "12,峨眉刺,1",
            "13,峨眉刺,3",
            "14,峨眉刺,3",
            "15,峨眉刺,3",
            "16,峨眉刺,3",
            "17,峨眉刺,3",
            "18,峨眉刺,3",
            "19,峨眉刺,3",
            "20,峨眉刺,3",
            "21,峨眉刺,3",
            "22,峨眉刺,3",
            "23,峨眉刺,3",
            "24,峨眉刺,3",
            "25,峨眉刺,3",
            "26,峨眉刺,3"];
        
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
