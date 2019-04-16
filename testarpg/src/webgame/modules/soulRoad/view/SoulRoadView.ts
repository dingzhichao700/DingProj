
module egret {
    
    export class SoulRoadView extends BasePanel {
        
        private btnClose: egret.gui.UIAsset;
        private img_0: egret.gui.UIAsset;
        private img_1: egret.gui.UIAsset;
        private img_2: egret.gui.UIAsset;
        private img_3: egret.gui.UIAsset;
        private img_4: egret.gui.UIAsset;
        
        private mask1: egret.gui.UIAsset;
        private mask2: egret.gui.UIAsset;
        private mask3: egret.gui.UIAsset;
        private mask4: egret.gui.UIAsset;
        
        public constructor() {
            super();
            this.layerType = BasePanel.LAYER_WINDOW_1;
            this.skinName = "ui.soulRoad.SoulRoadViewSkin";
        }
        
        public onOpen():void {
            super.onOpen();
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_END,this.close,this);
            this.img_0.addEventListener(egret.TouchEvent.TOUCH_END,this.openFight,this);
            this.img_1.addEventListener(egret.TouchEvent.TOUCH_END,this.openFight,this);
            this.img_2.addEventListener(egret.TouchEvent.TOUCH_END,this.openFight,this);
            this.img_3.addEventListener(egret.TouchEvent.TOUCH_END,this.openFight,this);
            this.img_4.addEventListener(egret.TouchEvent.TOUCH_END,this.openFight,this);
            this.update();
        }
        
        private update():void {
            var index:number = SoulRoadControl.getInstance().curIndex;
            this.mask1.visible = index < 1;
            this.mask2.visible = index < 2;
            this.mask3.visible = index < 3;
            this.mask4.visible = index < 4;
        }
        
        private openFight(e:egret.TouchEvent):void {
            switch(e.currentTarget) {
                case this.img_0:
                case this.img_1:
                case this.img_2:
                case this.img_3:
                case this.img_4:
                    dataManager().sceneData.sceneType = SceneType.BOSS_COPY; 
//                    dataManager().sceneData.sceneType = SceneType.ARENA;
                    globalUpdateWindows([UpdateType.CHANGE_SOULROAD]);
                    break;
            }
            this.close();
        }
    }
}
