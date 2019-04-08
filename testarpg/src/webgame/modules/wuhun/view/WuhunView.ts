
module egret {
    
    export class WuhunView extends BasePanel {

        private item1: WuhunItem;
        private item2: WuhunItem;
        private item3: WuhunItem;
        private item4: WuhunItem;
        private item5: WuhunItem;
        
        private boxCon:egret.gui.Group;
        private mc:egret.MovieClip;
        private window: WindowView;
        private clip: AnimeClip;
        
        public constructor() {
            super();
            this.layerType = BasePanel.LAYER_WINDOW_1;
            this.skinName = "ui.wuhun.WuhunViewSkin";
        }
        
        public onOpen():void {
            super.onOpen();
            this.window.btnClose.addEventListener(egret.TouchEvent.TOUCH_END,this.close,this);
            this.window.btnBack.addEventListener(egret.TouchEvent.TOUCH_END,this.close,this);
            
            this.item1.skillId = 1;
            this.item2.skillId = 2;
            this.item3.skillId = 3;

            if(!this.clip) {
                this.clip = new AnimeClip();
                this.clip.loadUrl("tiger",true);
                this.boxCon.addElement(this.clip);
            }
        }
    }
}
