
module egret {
    
    export class SoulRoadView extends BasePanel {
        
        private btnClose: egret.gui.UIAsset; 
        private img_1: egret.gui.UIAsset;
        private img_2: egret.gui.UIAsset;
        private img_3: egret.gui.UIAsset;
        private img_4: egret.gui.UIAsset;
        private img_5: egret.gui.UIAsset;
        
        public constructor() {
            super();
            this.layerType = BasePanel.LAYER_WINDOW_1;
            this.skinName = "ui.soulRoad.SoulRoadViewSkin";
        }
        
        public onOpen():void {
            super.onOpen();
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_END,this.close,this);
            this.img_1.addEventListener(egret.TouchEvent.TOUCH_END,this.openFight,this);
            this.img_2.addEventListener(egret.TouchEvent.TOUCH_END,this.openFight,this);
            this.img_3.addEventListener(egret.TouchEvent.TOUCH_END,this.openFight,this);
            this.img_4.addEventListener(egret.TouchEvent.TOUCH_END,this.openFight,this);
            this.img_5.addEventListener(egret.TouchEvent.TOUCH_END,this.openFight,this);
        }
        
        private openFight(e:egret.TouchEvent):void {
            switch(e.currentTarget){
                case this.img_1:
                case this.img_2:
                case this.img_3:
                case this.img_4:
                case this.img_5:
//                    dataManager().sceneData.sceneType = SceneType.BOSS_COPY; 
                    dataManager().sceneData.sceneType = SceneType.ARENA;
                    globalUpdateWindows([UpdateType.CHANGE_SOULROAD]);
                    break;
            }
            this.close();
        }
    }
}
