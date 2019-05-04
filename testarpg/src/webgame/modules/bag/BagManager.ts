module egret {
    export class BagManager {

        private _itemData: Array<ItemData>;
        
        private static _instance: BagManager;

        public static getInstance(): BagManager {
            if(!BagManager._instance) {
                BagManager._instance = new BagManager();
            }
            return BagManager._instance;
        }
        
        public constructor() {
            this.init();
        }
        
        private init():void {
            this._itemData = [];
            for(var i: number = 0;i < 25;i++) {
                var vo:ItemData = new ItemData();
                vo.id = i+1;
                vo.num = 1;
                this._itemData.push(vo);
            }
            var vo: ItemData = new ItemData();
            vo.id = 26;
            vo.num = 2;
            this._itemData.push(vo);
        }
        
        public get itemData(): Array<ItemData> {
            if(this._itemData == null){
                this.init();
            }
            return this._itemData;
        }
        
        /**获取物品信息*/
        public getItem(id: number):ItemData {
            for(var i: number = 0;i < this._itemData.length;i++) {
                var vo: ItemData = this._itemData[i];
                if(vo.id == id) {
                    return vo;
                }
            }
            return null;
        } 

        /**获取物品数量*/
        public getItemNum(id: number): number {
            var item: ItemData = this.getItem(id);
            if(item){
                return item.num;
            }
            return 0;
        }
        
        public addItem(id:number, num:number):void {
            var find:Boolean = false;
            for(var i: number = 0;i < this._itemData.length;i++){
                var vo: ItemData = this._itemData[i];
                if(vo.id == id){
                    find = true;
                    vo.num += num;
                }
            }
            if(!find) {
                var newItem: ItemData = new ItemData();
                newItem.id = id;
                newItem.num = num;
                this._itemData.push(newItem);
            }
        }

        public reduceItem(id:number, num:number): void {
            for(var i: number = 0;i < this._itemData.length;i++) {
                var vo: ItemData = this._itemData[i];
                if(vo.id == id) {
                    vo.num -= num;
                    if(vo.num <= 0){
                        this._itemData.splice(i, 1);   
                    }
                }
            }
        }
        
    }
}
