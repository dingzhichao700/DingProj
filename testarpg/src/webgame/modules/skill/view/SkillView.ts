
module egret {
    
    export class SkillView extends BasePanel {
        
        private itemCon:egret.gui.Group;
        private window: WindowView;
        
        public constructor() {
            super();
            this.layerType = BasePanel.LAYER_WINDOW_1;
            this.skinName = "ui.skill.SkillViewSkin";
        }
        
        public onOpen():void {
            super.onOpen();
            this.window.btnClose.addEventListener(egret.TouchEvent.TOUCH_END,this.close,this);
            this.window.btnBack.addEventListener(egret.TouchEvent.TOUCH_END,this.close,this);
            this.update();
        }
        
        private update():void {
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
    }
}
