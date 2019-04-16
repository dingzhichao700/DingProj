
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
            
            SceneManager.getInstance().enterScene(SceneType.CITY,1003);
            globalUpdateWindows([UpdateType.ENTER_CITY]);

            var effect: ElementEffect = <ElementEffect>SceneElementManager.getInstance().getElement(ElementEffect);
            effect.setIsCheckResource(false);
            effect.x = 200;
            effect.y = 200;
            effect.setMovieName(MovieName.EFFECT_01);
            effect.addToScene();
            
            MainControl.getInstance().openMainView(); 
            MainControl.getInstance().openWarnView();
            MainControl.getInstance().openGuideView();
        }
        
    }
}
