
module egret {

    export class StoryMissionView extends BasePanel {
        
        private btnGo:egret.gui.UIAsset;
        private txtTitle:egret.gui.Label;
        
        public constructor() {
            super();
            this.layerType = BasePanel.LAYER_WINDOW_2;
            this.skinName = "ui.story.StoryMissionViewSkin";
        }

        public onOpen(): void {
            super.onOpen();
            this.btnGo.addEventListener(egret.TouchEvent.TOUCH_END,this.onGo,this);
            
            var str:string = "";
            switch(StoryControl.getInstance().index){
                case 2:
                    str = "恭喜您战胜山贼首领";
                    break;
                case 6:
                    str = "恭喜您通过斗罗之路";
                    break;
            }
            this.txtTitle.text = str;
        }
        
        private onGo(): void {//回城
            SceneManager.getInstance().enterScene(SceneType.CITY,1003); 
            globalUpdateWindows([UpdateType.ENTER_CITY]);
            this.close();
        }
    }
}
