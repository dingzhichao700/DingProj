
module egret{
    export class SoulRoadControl {

        private soulRoad: SoulRoadView;

        private static _instance: SoulRoadControl;

        public static getInstance(): SoulRoadControl {
            if(!SoulRoadControl._instance) {
                SoulRoadControl._instance = new SoulRoadControl();
            }
            return SoulRoadControl._instance;
        }
        
        public constructor() {
        }

        public openSoulRoad(): void {
            if(!this.soulRoad) {
                this.soulRoad = new SoulRoadView();
            }
            this.soulRoad.open();
        }
    }
}
