module egret {
    export class StoryTalkView extends BasePanel {
        
        private txtCon: egret.gui.Label;
        private txtCoin: egret.gui.Label;
        private txtExp: egret.gui.Label;
        private btnGo: egret.gui.UIAsset; 
        private boxReward: egret.gui.Group;
        
        public constructor() {
            super();
            this.layerType = BasePanel.LAYER_WINDOW_1;
            this.skinName = "ui.story.StoryTalkViewSkin";
        }
        
        public onOpen(): void {
            super.onOpen();
            this.txtCon.lineSpacing = 15;
            this.btnGo.addEventListener(egret.TouchEvent.TOUCH_END,this.okHandler,this);
            
            this.update();
        }
        
        public update(): void {
            var state:number = StoryControl.getInstance().index;
            switch(state){
                case 0:
                    this.txtCon.text = "城外山贼横行，还请壮士肃清山贼";
                    this.txtCoin.text = "500";
                    break;
                case 2:
                    this.txtCon.text = "多谢壮士，这小小心意，还请壮士收下";
                    this.txtCoin.text = "500";
                    break;
                case 4:
                    this.txtCon.text = "壮士，请前往斗罗之路试炼本领";
                    this.txtCoin.text = "1500";
                    break;
                case 6:
                    this.txtCon.text = "壮士武艺高强，请收下这小小心意";
                    this.txtCoin.text = "1500";
                    break;
            }
        }

        private okHandler(): void {
            var state: number = StoryControl.getInstance().index;
            switch(state) {
                case 2:
                    MainControl.getInstance().addCoin(500);
                    MainControl.getInstance().addExp(0.02);
                    break;
                case 6:
                    MainControl.getInstance().addCoin(1500);
                    MainControl.getInstance().addExp(0.02);
                    break;
            }
            StoryControl.getInstance().addIndex();
            this.close();
        }
        
    }
}
