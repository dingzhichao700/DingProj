
module egret {
    
    export class WuhunView extends BasePanel {
        
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

            if(!this.clip) {
                this.clip = new AnimeClip();
                this.clip.loadUrl("tiger",true);
                this.boxCon.addElement(this.clip);
            }
        }
    }
}
