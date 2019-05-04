
module egret {
    export class LoadingView extends BasePanel {
        
        private boxCon:egret.gui.Group;
        private txtTitle:egret.gui.Label;
        
        public title:string;
        
        public constructor() {
            super();
            this.layerType = BasePanel.LAYER_TIP;
            this.skinName = "ui.main.LoadingViewSkin";
        }
        
        public onOpen():void {
            this.boxCon.alpha = 0;
            this.txtTitle.text = this.title;
//            this.txtTitle.textColor = 0xffffff;
//            this.txtTitle.strokeColor = 0x000000;
//            this.txtTitle.stroke = 2;
            TimerManager.getInstance().addExecute(this.close,this,3000, [], 1);
            Tween.get(this.boxCon).to({alpha:1},500);
        }
    }
    
    
}
