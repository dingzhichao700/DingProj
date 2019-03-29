
module egret {
    export class BagView extends BasePanel {
        
        private window:WindowView;
        private itemCon:egret.gui.Group;
        
        public constructor() {
            super();
            this.layerType = BasePanel.LAYER_WINDOW_1;
            this.skinName = "ui.bag.BagViewSkin";
        }
        	
        public onOpen():void {
            super.onOpen();
            this.window.btnClose.addEventListener(egret.TouchEvent.TOUCH_END,this.close,this);
            this.window.btnBack.addEventListener(egret.TouchEvent.TOUCH_END,this.close,this);
            
            this.update();
        }
        
        public update():void {

            this.itemCon.removeAllElements();
            for(var i: number = 0;i < 25;i++) {
                var item:BagItem = new BagItem();
                item.itemId = 1+i;
                item.x = 5 + (i % 6)*81;
                item.y = 5 + Math.floor(i / 6) * 80;
                this.itemCon.addElement(item);
            }
            
//            var equipData: egret.gui.ArrayCollection = new egret.gui.ArrayCollection();
//            equipData.addItem(vo);
//            this.itemList.itemRenderer = new egret.gui.ClassFactory(BagItem);
//            this.itemList.itemRenderer = BagItem;
//            this.itemList.dataProvider = equipData;
//            this.itemList.dataProvider = new egret.gui.ArrayCollection(["item1","item2","item3"]);
        }
        
	}
}
