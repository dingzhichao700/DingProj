
module egret {
    
    export class SkillView extends BasePanel {
        
        private itemCon:egret.gui.Group;
        private window: WindowView;
        
        private imgSucc: egret.gui.UIAsset;
        private delayKey: number;
        
        public constructor() {
            super();
            this.layerType = BasePanel.LAYER_WINDOW_1;
            this.skinName = "ui.skill.SkillViewSkin";
        }
        
        public onOpen():void {
            super.onOpen();
            this.window.btnClose.addEventListener(egret.TouchEvent.TOUCH_END,this.close,this);
            this.window.btnBack.addEventListener(egret.TouchEvent.TOUCH_END,this.close,this);
            this.imgSucc.alpha = 0;
            
            this.update();
        }
        
        public update():void {
            this.itemCon.removeAllElements();
            var skillList:Array<number> = [1,2,3,4,5];
            for(var i:number = 0; i < skillList.length;i++){
                var vo:SkillVo = new SkillVo();
                vo.id = i+1;
                
                var item:SkillItem = new SkillItem();
                item.y = i * 115;
                item.data = vo;
                this.itemCon.addElement(item);
            }
        }

        public playSucc(): void {
            this.imgSucc.alpha = 0;
            this.imgSucc.y = 350;
            Tween.removeTweens(this.imgSucc);
            TimerManager.getInstance().removeExecute(this.delayKey);//隐藏
            
            Tween.get(this.imgSucc).to({ y: 100 },1000);
            Tween.get(this.imgSucc).to({ alpha: 1 },300);

            this.delayKey = TimerManager.getInstance().addExecute(this.playSucc2,this,1000,[],1);//隐藏
        }

        private playSucc2(): void {
            Tween.get(this.imgSucc).to({ alpha: 0 },200);
        }
        
    }
}
