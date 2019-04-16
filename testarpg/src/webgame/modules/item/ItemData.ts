
module egret {
    export class ItemData {
        public id: number = 0;
        public num: number = 0;
        
        public constructor() {
        }
        
        public get cfg():ItemConfig {
            return ItemManager.getInstance().getCfg(this.id);
        }
        
    }
}
