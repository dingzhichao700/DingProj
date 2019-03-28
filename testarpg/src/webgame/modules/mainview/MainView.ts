
module egret { 
    export class MainView extends BasePanel{
        
        private txtName: egret.gui.Label;
        private txtScore: egret.gui.Label; 
        private btnSoulRoad: egret.gui.UIAsset;
        private btnWuhun: egret.gui.UIAsset;
        private btnBag: egret.gui.UIAsset;
        private btnEquip: egret.gui.UIAsset;
        
        public constructor() {
            super();
            this.layerType = BasePanel.LAYER_UI;
            this.skinName = "ui.main.MainViewSkin";
        }

        public onOpen(): void {
            super.onOpen();
            this.btnSoulRoad.addEventListener(egret.TouchEvent.TOUCH_END,this.openSoulRoad,this);
            this.btnWuhun.addEventListener(egret.TouchEvent.TOUCH_END,this.openWuhun,this);
            this.btnBag.addEventListener(egret.TouchEvent.TOUCH_END,this.openBag,this);
            this.btnEquip.addEventListener(egret.TouchEvent.TOUCH_END,this.openEquip,this);
        }
        
        private openSoulRoad(): void {
            SoulRoadControl.getInstance().openSoulRoad();
        }
        
        private openWuhun(): void {
            WuhunControl.getInstance().openwuhunView();
        }
        
        private openBag():void {
            BagControl.getInstance().openBagView();
        }
        
        private openEquip(): void {
            EquipControl.getInstance().openEquipView();
        }
        
    }
}
