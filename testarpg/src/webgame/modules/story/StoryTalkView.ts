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
            this.txtCon.lineSpacing = 10;
            this.btnGo.addEventListener(egret.TouchEvent.TOUCH_END,this.okHandler,this);
            
            this.update();
        }
        
        public update(): void {
            var state:number = StoryControl.getInstance().index;
            switch(state){
                case 0:
                    this.txtCon.text = "城外烽火连天，我们栖息的山林刚被山贼占领，现在无家可归，还请壮士肃清山贼";
                    this.txtCoin.text = "500";
                    break;
                case 2:
                    this.txtCon.text = "多谢壮士帮助我们收复家园，这是祖上传下的宝物，可用来开启斗罗之路，请壮士一定要收下";
                    this.txtCoin.text = "500";
                    break;
                case 4:
                    this.txtCon.text = "壮士，这就是斗罗之路了，伴随着机遇和风险，壮士一路保重";
                    this.txtCoin.text = "2000";
                    break;
                case 6:
                    this.txtCon.text = "天呐，壮士果然高人啊，看样子实力大有提升，斗罗之路的宝物可助壮士稳固实力，请前往";
                    this.txtCoin.text = "2000";
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
                    MainControl.getInstance().addCoin(2000);
                    MainControl.getInstance().addExp(0.02);
                    break;
            }
            StoryControl.getInstance().addIndex();
            this.close();
        }
        
    }
}
