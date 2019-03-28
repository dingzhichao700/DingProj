/**
 *
 * @author 
 *
 */
module egret {
    
    export class EquipView extends BasePanel {
        
        private boxCon:egret.gui.Group;
        private window:WindowView;
        private txtName: egret.gui.Label;
        private txtScore: egret.gui.Label;
        private txtAttack: egret.gui.Label;
        private txtSpeed: egret.gui.Label;
        private txtLife: egret.gui.Label;
        private txtDef: egret.gui.Label;
        private item_1: BagItem;
        private item_2: BagItem;
        private item_3: BagItem;
        private item_4: BagItem;
        private item_5: BagItem;
        private item_6: BagItem;
        private item_7: BagItem;
        private item_8: BagItem;
        private item_9: BagItem;
        private item_10: BagItem;
        private item_11: BagItem;
        private item_12: BagItem;
        private clip: AnimeClip;
        
        public constructor() {
            super();
            this.layerType = BasePanel.LAYER_WINDOW_1;
            this.skinName = "ui.equip.EquipViewSkin";
        }
        
        public onOpen():void {
            super.onOpen();
            this.window.btnClose.addEventListener(egret.TouchEvent.TOUCH_END,this.close,this);
            
            this.item_1.itemId = 23;
            this.item_2.itemId = 12;
            this.item_3.itemId = 11;
            this.item_4.itemId = 17;
            this.item_5.itemId = 20;
            this.item_6.itemId = 9;
            this.item_7.itemId = 7;
            this.item_8.itemId = 8;
            this.item_9.itemId = 1;
            this.item_10.itemId = 21;
            this.item_11.itemId = 22;
            this.item_12.itemId = 10;
            
            if(!this.clip) {
                this.clip = new AnimeClip();
                this.clip.loadUrl("role",true);
                this.boxCon.addElement(this.clip);
            }
        }
    }
}
