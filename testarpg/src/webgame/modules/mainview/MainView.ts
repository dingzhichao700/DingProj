
module egret { 
    export class MainView extends BasePanel{

        private boxTop: egret.gui.Group;
        private boxBottom: egret.gui.Group;
        private boxCon: egret.gui.Group;
        private boxMission: egret.gui.Group;
        private boxNum: egret.gui.Group;
        private boxStory: egret.gui.Group;
        
        private txtName: egret.gui.Label; 
        private txtCoin: egret.gui.Label; 
        private txtScore: egret.gui.Label; 
        private txtExp: egret.gui.Label;
        private txtTarget: egret.gui.Label; 
        
        private imgArrow: egret.gui.UIAsset;
        private btnSoulRoad: egret.gui.UIAsset;
        private btnWuhun: egret.gui.UIAsset;
        private btnBag: egret.gui.UIAsset; 
        private btnEquip: egret.gui.UIAsset;
        private btnSkill: egret.gui.UIAsset;
        private btnStrength: egret.gui.UIAsset;
        private btnGo: egret.gui.UIAsset;
        
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
            this.btnStrength.addEventListener(egret.TouchEvent.TOUCH_END,this.openStrength,this);
            this.btnGo.addEventListener(egret.TouchEvent.TOUCH_END,this.goStory,this); 
            ApplicationManager.getInstance().stage.addEventListener(Event.RESIZE,this.resizeHandler,this);
            
            this.boxMission.alpha = 0;
            
            this.onResize();

            this.update();
            this.showStory(true);
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
                
                this.txtTarget.text = StoryControl.getInstance().getCurTitle();
                if(StoryControl.getInstance().index == 5){
                    this.btnSoulRoad.source = "resource/main/soulRoad.png";
                } else {
                    this.btnSoulRoad.source = "resource/main/soulRoad_gray.png";
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
            if(StoryControl.getInstance().index == 5) {
                SoulRoadControl.getInstance().openSoulRoad();
            } else {
                MainControl.getInstance().showWarn("请完成主线任务，开启斗罗之路");
            }
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

        private openStrength(): void {
            EquipControl.getInstance().openStrengthView();
        } 

        private goStory(): void {
            StoryControl.getInstance().goNextStory();
        } 
        
        /**显示当前关卡名*/        
        public showMission():void {
            this.boxNum.removeAllElements();
            
            var mission: number = StoryControl.getInstance().curMission;
            var str: string = mission.toString();
            for(var i: number = 0;i < str.length;i++){
                var num: number = Number(str[i]);
                var imgNum:egret.gui.UIAsset = new egret.gui.UIAsset();
                imgNum.source = "resource/main/copy_" + num + ".png";
                imgNum.x = 30*i;
                this.boxNum.addElement(imgNum);
            }
            
            TimerManager.getInstance().addExecute(function(): void {
                Tween.get(this.boxMission).to({ alpha: 1 },1000)/*.call(this.reSet,this)*/;
            },this,1000,[],1);//显示
            
            TimerManager.getInstance().addExecute(function():void {
                Tween.get(this.boxMission).to({ alpha: 0 },1000);
            },this,5000,[],1);//隐藏
        }

        public showStory(value:boolean):void {
            this.boxStory.visible = value;

            Tween.removeTweens(this.imgArrow);
            if(value){
                this.imgArrow.x = 0;
                this.showArrow();
            }
        }
        
        private showArrow():void {
            Tween.get(this.imgArrow).to({ x: (this.imgArrow.x == 0 ? 20 : 0)},800).call(this.showArrow,this);
        }
        
    }
}
