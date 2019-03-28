/**
 *
 * @author 
 *
 */
module egret{
    export class ItemTipsControl {

        private tips: ItemTips;

        private static _instance: ItemTipsControl;

        public static getInstance(): ItemTipsControl {
            if(!ItemTipsControl._instance) {
                ItemTipsControl._instance = new ItemTipsControl();
            }
            return ItemTipsControl._instance;
        }
        
        public constructor() {
        }
        
        public openTips(id:number):void {
            if(!this.tips){
                this.tips = new ItemTips();
            }
            this.tips.setData(id);
            this.tips.open();
        }
        
    }
}
