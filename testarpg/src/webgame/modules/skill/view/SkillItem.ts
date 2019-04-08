
module egret {
    export class SkillItem extends BaseView {
        
        private _vo:SkillVo;
        private item: WuhunItem;
        private txtName: egret.gui.Label;
        private txtDesc: egret.gui.Label;
        
        public constructor() {
            super();
            this.skinName = "ui.skill.SkillItemSkin";
        }
        
        public set data(vo:SkillVo) {
            this._vo = vo;
            if(this.isCreate){
                this.update();
            }
        }
        
        public onCreate():void {
            super.onCreate();
            this.update();
        }
        
        public update() {
            this.item.skillId = this._vo.id;
            this.txtName.text = this._vo.name + " Lv.1";
            this.txtDesc.text = this._vo.desc;
        }

        private onTouchHandler(e: egret.TouchEvent): void {
            if(this._vo.id != 0) {
                SkillControl.getInstance().openskillTip(this._vo.id);
            }
        }
        
    }
}
