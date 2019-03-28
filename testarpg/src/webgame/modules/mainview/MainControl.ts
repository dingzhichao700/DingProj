
module egret {
    export class MainControl {
        
        private mainView:MainView;

        private static _instance: MainControl;

        public static getInstance(): MainControl {
            if(!MainControl._instance) {
                MainControl._instance = new MainControl();
            }
            return MainControl._instance;
        }
        
        public constructor() {
        }
        
        public openMainView():void {
            if(!this.mainView){
                this.mainView = new MainView();
            }
            this.mainView.open();
        }
        
    }
}
