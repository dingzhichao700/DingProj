
module egret {
    export class LoginView extends BasePanel {
        
        private btnStart: egret.gui.UIAsset;
        private imgBg: egret.gui.UIAsset;
        
        public constructor() {
            super();
            this.layerType = BasePanel.LAYER_GUIDE;
            this.skinName = "ui.main.LoginViewSkin";
        }
        
        public onOpen():void {
            this.btnStart.addEventListener(egret.TouchEvent.TOUCH_END,this.onStart,this);
        }

        private onStart(): void {
            this.close();
            
            SceneManager.getInstance().enterScene(SceneType.CITY, 1003);
            (<SceneWindow>SceneManager.getInstance().scene).nextTurn();

            TimerManager.getInstance().addExecute(this.cityMove,this,3000,[],1);
            
            var effect: ElementEffect = <ElementEffect>SceneElementManager.getInstance().getElement(ElementEffect);
            effect.setIsCheckResource(false);
            effect.x = 200;
            effect.y = 200;
            effect.setMovieName(MovieName.EFFECT_01);
            effect.addToScene();
            
            MainControl.getInstance().openMainView();
            MainControl.getInstance().openGuideView();
        }
        
        private cityMove():void {
            RoleManager.getInstance().moveTo3(450, 900);
        }
        
    }
}
