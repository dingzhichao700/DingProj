
module egret {
    export class BagItem extends BaseView {

        private imgBg: egret.gui.UIAsset;
        private imgIcon:egret.gui.UIAsset;
        private _info:ItemConfig;
        
        public constructor() {
            super();
            this.skinName = "ui.bag.BagItemSkin";
            this.addEventListener(egret.TouchEvent.TOUCH_END,this.onTouchHandler,this);
        }

        public set itemId(id: number) {
            var vo: ItemConfig = ItemManager.getInstance().getCfg(id);
            this.info = vo;
        }

        public set info(vo:ItemConfig) {
            this._info = vo;
            if(this.isCreate){
                this.update();
            }
        }
        
        public get info(): ItemConfig {
            return this._info;
        }
        
        public onCreate():void {
            super.onCreate();
            this.update();
        }
        
        public update():void {
            //无数据
            if(this.info == null || this.info.id == 0) {
                this.imgIcon.visible = false;
                return;
            }
            this.imgIcon.visible = true;
            this.imgIcon.source = "resource/item/" + this.info.id + ".png";
            this.imgBg.source = "resource/unpack/frame_item_" + this.info.quality + ".png";
        }
        
        private onTouchHandler(e:egret.TouchEvent):void {
            ItemTipsControl.getInstance().openTips(this.info.id);
        }
        
	}
}
