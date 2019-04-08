module egret{
    /**
     * 游戏启动器，因egret的Main类为外部类，所以使用启动器，使游戏逻辑回到egret包中
     */
    export class GameRunner extends ApplicationRunner{
        public constructor(){
            super();

            //性能数据显示(fps,draw,cost)
//            egret.Profiler.getInstance().run();
            this.loadRes();
        }
        
        private loadRes(): void {
            var arr: Array<any> = ["main", "equip", "wuhun", "clip", "soulRoad", "skill"];
            LoadManager.getInstance().loadResList(arr, this.startGame);
        }
        
        private startGame():void {
            ApplicationManager.getInstance().initLayer();
            MainControl.getInstance().openLogin();
        }
    }
}