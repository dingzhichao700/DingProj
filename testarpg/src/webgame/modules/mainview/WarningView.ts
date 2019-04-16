module egret {
    
    export class WarningView extends BasePanel {
        
        private txtContext:egret.gui.Label;
        private boxCon:egret.gui.Group;
        private delayKey:number;
        
        public constructor() {
            super();
            this.layerType = BasePanel.LAYER_WARNING;
            this.skinName = "ui.main.WarningViewSkin";
        }

        public onOpen(): void {
            super.onOpen();
            this.boxCon.alpha = 0;
        }
        
        public showMsg(str:string):void {
            Tween.removeTweens(this.boxCon);
            TimerManager.getInstance().removeExecute(this.delayKey);
            
            this.txtContext.text = str;
            Tween.get(this.boxCon).to({ alpha: 1 },200);
            this.delayKey = TimerManager.getInstance().addExecute(this.hide,this, 1500);
        }
        
        private hide(): void {
            Tween.get(this.boxCon).to({ alpha: 0 },300);
        }
        
    }
}
