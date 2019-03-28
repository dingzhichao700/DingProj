
module egret {
    export class BagControl {
        
        private bagView:BagView;
    
        private static _instance: BagControl;
    
        public static getInstance(): BagControl {
            if(!BagControl._instance) {
                BagControl._instance = new BagControl();
            }
            return BagControl._instance;
        }
        
	    public constructor() {
        }
    
        public openBagView():void {
            if(!this.bagView){
                this.bagView = new BagView();
            }
            this.bagView.open();
        }
    }
}
