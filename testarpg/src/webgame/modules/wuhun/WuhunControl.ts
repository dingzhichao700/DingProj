
module egret{
    export class WuhunControl {

        private wuhunView: WuhunView;

        private static _instance: WuhunControl;

        public static getInstance(): WuhunControl {
            if(!WuhunControl._instance) {
                WuhunControl._instance = new WuhunControl();
            }
            return WuhunControl._instance;
        }
        
        public constructor() {
        }

        public openwuhunView(): void {
            if(!this.wuhunView) {
                this.wuhunView = new WuhunView();
            }
            this.wuhunView.open();
        }
    }
}
