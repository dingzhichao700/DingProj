
module egret {
    export class SkillTips extends BasePanel{
        
        private imgMask:egret.gui.UIAsset;
        private item:WuhunItem;
        private txtName: egret.gui.Label;
        private txtDesc: egret.gui.Label; 
        private _id:number = 0;
        
        public constructor() {
            super();
            this.layerType = BasePanel.LAYER_TIP;
            this.skinName = "ui.skill.SkillTipSkin";
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
                var cfg: SkillCfg = SkillManager.getInstance().getCfg(this._id);
                this.item.touchEnabled = false;
                this.item.skillId = this._id;
                this.txtName.text = cfg.name;
                this.txtDesc.text = cfg.desc;
            }
        }
        
    }
}
