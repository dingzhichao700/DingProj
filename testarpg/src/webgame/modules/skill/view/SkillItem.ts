
module egret {
    export class SkillItem extends BaseView {
        
        private _vo:SkillVo;
        private item: WuhunItem;
        private btnUp: egret.gui.UIAsset;
        private imgCoin:egret.gui.UIAsset;
        private txtCost: egret.gui.Label;
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
            this.btnUp.addEventListener(egret.TouchEvent.TOUCH_END,this.onUp,this);
            this.update();
        }
        
        public update() {
            this.item.skillId = this._vo.id;
            var level: number = SkillManager.getInstance().getSkillLevel(this._vo.id);
            this.txtName.text = this._vo.name + " Lv." + level;
            this.txtDesc.text = this._vo.desc;
            this.txtDesc.lineSpacing = 10;
            var cost: number = SkillManager.getInstance().getLevelCost(level);
            this.txtCost.text = cost + "";
            this.txtCost.textColor = MainControl.getInstance().coin >= cost ? 0x00000:0xff0000;
        }

        private onTouchHandler(e: egret.TouchEvent): void {
            if(this._vo.id != 0) {
                SkillControl.getInstance().openskillTip(this._vo.id);
            }
        }
        
        private onUp(): void {
            var level: number = SkillManager.getInstance().getSkillLevel(this._vo.id);
            var cost:number = SkillManager.getInstance().getLevelCost(level);
            if(MainControl.getInstance().coin >= cost){
                SkillManager.getInstance().upSkill(this._vo.id);
                SkillControl.getInstance().updateskillView();
                MainControl.getInstance().reduceCoin(cost);
                MainControl.getInstance().updateMainView();
            } else {
                MainControl.getInstance().showWarn("金币不足");
            }
                
        }
        
    }
}
