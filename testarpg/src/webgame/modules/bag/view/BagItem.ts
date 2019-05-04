
module egret {
    export class BagItem extends BaseView {
        
        private imgBg: egret.gui.UIAsset;
        private imgIcon: egret.gui.UIAsset;
        private txtNum: egret.gui.Label;
        private _info:ItemConfig;
        private _touchAble: boolean = true;
        /**是否显示数量*/        
        private _showNum: boolean;
        
        public constructor() {
            super();
            this.skinName = "ui.bag.BagItemSkin";
            this.addEventListener(egret.TouchEvent.TOUCH_END,this.onTouchHandler,this);
        }

        public set itemId(id: number) {
            var vo: ItemConfig = ItemManager.getInstance().getCfg(id);
            this.info = vo;
        }

        public get itemId(): number {
            return this.info.id;
        }
        
        public setAble(value:boolean):void {
            this._touchAble = value;
        } 
        public showNum(value: boolean): void {
            this._showNum = value;
            this.txtNum.visible = this._showNum;
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

            var num: number = BagManager.getInstance().getItemNum(this.info.id);
            this.txtNum.text = num + "";
            if(num > 1) { //数量大于1必显示数量
                this.txtNum.visible = true;
            } else {
                this.txtNum.visible = this._showNum;
            }
        }
        
        private onTouchHandler(e:egret.TouchEvent):void {
            if(this._touchAble){
                ItemTipsControl.getInstance().openTips(this.info.id);
            }
        }
        
	}
}
