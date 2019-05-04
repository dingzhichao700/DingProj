
module egret{
    export class SoulRoadControl {
        
        private _curIndex:number = 0;

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

        public closeSoulRoad(): void {
            if(this.soulRoad && this.soulRoad.isOpen) {
                this.soulRoad.close();
            }
        }
        
        public get curIndex():number {
            return this._curIndex
        }
        
        /**增加斗罗关卡数*/
        public addIndex(): void {
            this._curIndex++;
            if(this._curIndex > 4){
                this._curIndex = 0;
            }
        }
        
    }
}
