
module egret {
    export class MainControl {

        private _power: number = 13071;
        public achi: number;
        private _coin: number = 11000;
        private _totalExp: number = 1.7;

        private loginView: LoginView;
        private loadingView: LoadingView;
        private mainView: MainView;
        private warnView: WarningView;
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
        
        public get power(): number {
            return this._power;
        }

        /**加战力*/
        public addPower(value: number): void {
            this._power += value;
            this.updateMainView();
            if(this.warnView && this.warnView.isOpen) {
                this.warnView.showAddPower(value);
            }
        }
        
        public get coin():number {
            return this._coin;
        }
        
        public addCoin(value:number):void {
            this._coin += value;
            this.updateMainView();
        }

        public reduceCoin(value: number): void {
            this._coin -= value;
            if(this._coin < 0){
                this._coin = 0;
            }
            this.updateMainView();
        }
        
        public get totalExp(): number {
            return this._totalExp;
        }

        public addExp(value: number): void {
            this._totalExp += value;
            this.updateMainView();
        }

        public openLogin(): void {
            if(!this.loginView) {
                this.loginView = new LoginView();
            }
            this.loginView.open();
        } 

        public openWarnView(): void {
            if(!this.warnView) {
                this.warnView = new WarningView();
            }
            this.warnView.open();
        }

        /**显示警告语*/
        public showWarn(str:string):void {
            if(this.warnView && this.warnView.isOpen){
                this.warnView.showMsg(str);
            }
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

        public showMission(): void {
            if(this.mainView && this.mainView.isOpen) {
                this.mainView.showMission();
            }
        } 
        
        public showStory(value:boolean): void {
            if(this.mainView && this.mainView.isOpen) {
                this.mainView.showStory(value);
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
                this.addExp(0.01)
            }
            
            if(!this.loadingView) {
                this.loadingView = new LoadingView();
            }
            this.loadingView.title = title;
            this.loadingView.open();
        }
        
    }
}
