/**
 *
 * @author 
 *
 */
module egret {
    export class ItemTips extends BasePanel{
        
        private imgMask:egret.gui.UIAsset;
        private item:BagItem;
        private txtName: egret.gui.Label;
        private txtQuality: egret.gui.Label;
        private _id:number;
        
        public constructor() {
            super();
            this.layerType = BasePanel.LAYER_TIP;
            this.skinName = "ui.item.ItemTipsSkin";
        }

        public onOpen(): void {
            super.onOpen();
            this.imgMask.addEventListener(egret.TouchEvent.TOUCH_END,this.close,this);
            this.update();
        }
        
        public setData(id:number):void {
            this._id = id;
            this.update();
        }
        
        public update():void{
            if(this.isCreate) {
                if(this._id == 0){
                    return;
                }
                var cfg: ItemConfig = ItemManager.getInstance().getCfg(this._id);
                this.item.touchEnabled = false;
                this.item.itemId = this._id;
                this.txtName.text = cfg.name;
                this.txtQuality.text = "品质：" + ItemManager.getInstance().getQuaByType(cfg.quality);
            }
        }
        
    }
}
