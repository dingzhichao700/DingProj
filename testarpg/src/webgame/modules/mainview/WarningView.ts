module egret {
    
    export class WarningView extends BasePanel {
        
        private txtContext:egret.gui.Label;
        private boxCon:egret.gui.Group;
        private delayKey: number;
        private delayKey2: number;

        private boxPower: egret.gui.Group;
        private boxPowerNum: egret.gui.Group;
        
        private static START_Y:number = 430;
        
        public constructor() {
            super();
            this.layerType = BasePanel.LAYER_WARNING;
            this.skinName = "ui.main.WarningViewSkin";
        }

        public onOpen(): void {
            super.onOpen();
            this.boxCon.alpha = 0;
            this.boxPower.alpha = 0;
        }
        
        public showMsg(str:string):void {
            Tween.removeTweens(this.boxCon);
            TimerManager.getInstance().removeExecute(this.delayKey);
            this.boxCon.alpha = 0;
            
            this.txtContext.text = str;
            Tween.get(this.boxCon).to({ alpha: 1 },200);
            this.delayKey = TimerManager.getInstance().addExecute(function():void {
                Tween.get(this.boxCon).to({ alpha: 0 },300);   
            },this, 1500);
        }

        public showAddPower(value: number) : void {
            TimerManager.getInstance().removeExecute(this.delayKey2);
            Tween.removeTweens(this.boxPower);
            this.boxPower.alpha = 0;
            this.boxPower.y = WarningView.START_Y;
            
            this.boxPowerNum.removeAllElements();
            var str: string = value.toString();
            for(var i: number = 0;i < str.length;i++) {
                var num: number = Number(str[i]);
                var imgNum: egret.gui.UIAsset = new egret.gui.UIAsset();
                imgNum.source = "resource/main/fight_" + num + ".png";
                imgNum.x = 28 * i;
                this.boxPowerNum.addElement(imgNum);
            }

            Tween.get(this.boxPower).to({ alpha: 1,y: WarningView.START_Y+25},500);

            this.delayKey2 = TimerManager.getInstance().addExecute(function(): void {
                Tween.get(this.boxPower).to({ alpha: 0,y: WarningView.START_Y },500);
            },this,3000,[],1);//隐藏
        }
        
    }
}
