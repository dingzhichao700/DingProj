module egret {
    export class WuhunItem extends BaseView {
        
        private imgIcon:egret.gui.UIAsset;
        public _skillId:number = 0;
        
        public constructor() {
            super();
            this.skinName = "ui.wuhun.WuhunItemSkin";
            this.addEventListener(egret.TouchEvent.TOUCH_END,this.onTouchHandler,this);
        }
        
        public set skillId(value:number) {
            this._skillId = value;
            this.update();
        }
        
        public onCreate():void {
            super.onCreate();
            this.update();
        }
        
        public update():void {
            if(this.isCreate){
                if(this._skillId != 0) {
                    this.imgIcon.source = "resource/skill/" + this._skillId + ".png";   
                }
            }
        }
        
        private onTouchHandler(e: egret.TouchEvent): void {
            if(this._skillId != 0){
                SkillControl.getInstance().openskillTip(this._skillId);
            }
        }
        
    }
}
