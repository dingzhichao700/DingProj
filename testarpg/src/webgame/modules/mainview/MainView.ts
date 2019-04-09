
module egret { 
    export class MainView extends BasePanel{
        
        private boxCon: egret.gui.Group;
        private boxTop: egret.gui.Group;
        private boxBottom: egret.gui.Group;
        private txtName: egret.gui.Label; 
        private txtCoin: egret.gui.Label; 
        private txtScore: egret.gui.Label; 
        private txtExp: egret.gui.Label;
        private btnSoulRoad: egret.gui.UIAsset;
        private btnWuhun: egret.gui.UIAsset;
        private btnBag: egret.gui.UIAsset; 
        private btnEquip: egret.gui.UIAsset;
        private btnSkill: egret.gui.UIAsset;
        private clip1: AnimeClip;
        private clip2: AnimeClip;
        
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
            this.btnSkill.addEventListener(egret.TouchEvent.TOUCH_END,this.openSkill,this);
            ApplicationManager.getInstance().stage.addEventListener(Event.RESIZE,this.resizeHandler,this);
            this.onResize();

            this.update();
        }
        
        public update():void {
            if(this.isCreate){
                this.txtExp.text = MainControl.getInstance().totalExp.toFixed(2) + "%";
                this.txtCoin.text = MainControl.getInstance().coin + "";

                if(!this.clip1) {
                    this.clip1 = new AnimeClip();
                    this.clip1.loadUrl("expLight",true);
                    this.boxCon.addElement(this.clip1);
                }
                if(!this.clip2) {
                    this.clip2 = new AnimeClip();
                    this.clip2.loadUrl("expBubble",true);
                    this.clip2.x = 20;
                    this.clip2.y = 50;
                    this.boxCon.addElement(this.clip2);
                }
            }
        }
        
        private resizeHandler(e:egret.Event):void {
            this.onResize();
        }
        
        private onResize(): void {
            var contentH: number = ApplicationManager.CONTENT_H;
            var windowH: number = document.documentElement.clientHeight;
            
            var globalScale: number = ApplicationManager.getInstance().globalScale;
            this.boxTop.y = -(windowH - contentH * globalScale) / (2 * globalScale);
            this.boxBottom.y = (windowH + contentH * globalScale) / (2 * globalScale);
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
        
        private openSkill(): void {
            SkillControl.getInstance().openskillView();
        }
        
    }
}
