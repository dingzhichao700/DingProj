module egret {
    export class EquipStrengthView extends BasePanel {

        private curIndex:number;
        private window: WindowView; 
        private btnUp: egret.gui.UIAsset;
        private imgIcon: egret.gui.UIAsset; 
        private imgSucc: egret.gui.UIAsset; 
        private txtEquip: egret.gui.Label;
        private txtUp: egret.gui.Label;
        private boxAttr: egret.gui.Group; 
        
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
        private itemCost: BagItem;
        private itemList: Array<BagItem>;
        private itemEquipData:Array<number>;
        private delayKey:number;
        private inited:boolean=false;
        
        public constructor() {
            super();
            this.layerType = BasePanel.LAYER_WINDOW_1;
            this.skinName = "ui.equip.StrengthViewSkin";
        }

        public initEquip(): void {
            if(!this.inited){
                this.inited = true;
                this.itemEquipData = [];
                for(var i: number = 0;i < 10;i++) {
                    this.itemEquipData.push(0);
                }
            }
        }
        
        public onOpen(): void {
            super.onOpen();
            this.window.btnClose.addEventListener(egret.TouchEvent.TOUCH_END,this.close,this);
            this.window.btnBack.addEventListener(egret.TouchEvent.TOUCH_END,this.close,this); 
            this.btnUp.addEventListener(egret.TouchEvent.TOUCH_END,this.onUp,this);
            this.txtUp.touchEnabled = false;

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
            
            this.itemList = []; 
            for(var i:number = 0 ; i < 10;i++){
                this["item_" + (i + 1)].addEventListener(egret.TouchEvent.TOUCH_END,this.onSelect,this); 
                this["item_" + (i + 1)].setAble(false);
                this.itemList.push(this["item_" + (i + 1)]);
            }

            if(!this.inited) {
                this.initEquip();
            }
            
            this.itemCost.itemId = 26;
            this.itemCost.showNum(true);
            this.imgSucc.alpha = 0;
            this.chooseItem(1);//默认选中第一件装备
            
            this.update();
        }
        
        public update():void {
            if(this.isCreate){
                this.itemCost.update();
                
                this.boxAttr.removeAllElements();
                var level: number = this.getEquipLevel(this.curIndex);

                this.txtEquip.text = this.curItem.info.name + (level == 0 ? "" : ("  " + level + "级"));
                
                var attrs: Array<string> = this.getAttrByLevel(level);
                for(var i: number = 0;i < attrs.length;i++) {
                    var label:egret.gui.Label = new egret.gui.Label();
                    label.text = attrs[i];
                    label.size = 22;
                    label.textColor = 0x000000;
                    label.y = 25*i;
                    this.boxAttr.addElement(label);
                }
            }
        }
        
        private get curItem():BagItem {
            return this["item_" + this.curIndex];
        }
        
        private onUp():void {
            var num:number = BagManager.getInstance().getItemNum(26);
            if(num > 0){
                BagManager.getInstance().reduceItem(26, 1);
                this.upEquipLevel(this.curIndex);
                this.playSucc(); 
                this.update();
            } else {
                MainControl.getInstance().showWarn("强化材料不足");
            }
        } 
        
        private playSucc(): void {
            this.imgSucc.alpha = 0;
            this.imgSucc.y = 350;
            Tween.removeTweens(this.imgSucc);
            TimerManager.getInstance().removeExecute(this.delayKey);//隐藏
            
            Tween.get(this.imgSucc).to({ y: 100 },1000);
            Tween.get(this.imgSucc).to({ alpha: 1 },300);

            this.delayKey = TimerManager.getInstance().addExecute(this.playSucc2,this,1000,[],1);//隐藏
        }
        
        private playSucc2(): void {
            Tween.get(this.imgSucc).to({alpha: 0},200);
        }

        private onSelect(e: egret.TouchEvent): void {
            var item:BagItem = e.currentTarget;
            for(var i: number = 0;i < this.itemList.length;i++) {
                if(this.itemList[i] == item){
                    this.chooseItem(i+1);
                }
            }
        }
        
        //选中某序号的装备
        private chooseItem(index: number): void {
            var item: BagItem = this["item_" + index];
            this.imgIcon.source = "resource/item/" + item.info.id + ".png";
            this.curIndex = index;
            this.update();
        }

        private upEquipLevel(index: number): void {
            this.itemEquipData[index - 1] += 1;
        }
        
        private getEquipLevel(index:number):number {
            return this.itemEquipData[index - 1];
        }
        
        private getAttrByLevel(level:number):Array<string>{
            return ["力量+" + (100 * level) + "     →     力量+" + (100 * (level+1))];
        }
        
    }
}
