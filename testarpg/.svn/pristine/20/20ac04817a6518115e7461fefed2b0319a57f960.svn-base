module egret{
    export class ApplicationConfig{
        /**
         * 配置应用程序
         * @param main 主程序
         * @param uiStage UI主程序
         * @param runner 启动器，用于初始化游戏逻辑
         */
        public constructor(main:DisplayObjectContainer,runner:any){
            var appMain:ApplicationMain = new ApplicationMain();
            main.addChildAt(appMain,0);

            new runner();
        }
    }
}