
module egret {
    export class MainControl {
        
        public totalExp: number = 1.7;
        public coin: number;
        public achi: number;

        private loginView: LoginView;
        private loadingView: LoadingView;
        private mainView: MainView;
        private maskView: MaskView;
        private guideView: GuideView; 

        private static _instance: MainControl;

        public static getInstance(): MainControl {
            if(!MainControl._instance) {
                MainControl._instance = new MainControl();
            }
            return MainControl._instance;
        }
        
        public constructor() {
        }

        public openLogin(): void {
            if(!this.loginView) {
                this.loginView = new LoginView();
            }
            this.loginView.open();
        }
        
        public openMainView():void {
            if(!this.mainView){
                this.mainView = new MainView();
            }
            this.mainView.open();
        }
        
        public updateMainView(): void {
            if(this.mainView && this.mainView.isOpen) {
                this.mainView.update();
            }
        }
        
        public openGuideView(): void {
            if(!this.guideView) {
                this.guideView = new GuideView();
            }
            this.guideView.open();
        }

        public openMask(): void {
            if(!this.maskView) {
                this.maskView = new MaskView();
            }
            this.maskView.open();
        }
        
        public closeMask(): void {
            if(this.maskView && this.maskView.isOpen) {
                this.maskView.close();
            }
        }
        
        public openLoading(title:string = ""):void {
            
            //打开副本loading时一定概率加点经验
            if(Math.random() > 0.5){
                this.totalExp += 0.01;
                if(this.totalExp > 3.7) {
                    this.totalExp = 3.7;
                }
                this.updateMainView();
            }
            
            if(!this.loadingView) {
                this.loadingView = new LoadingView();
                this.loadingView.title = title;
            }
            this.loadingView.open();
        }
        
    }
}
