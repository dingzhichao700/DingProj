module egret{
    /**
     * 游戏启动器，因egret的Main类为外部类，所以使用启动器，使游戏逻辑回到egret包中
     */
    export class ApplicationRunner{
        public constructor(){
            LogManager.debug(this,"游戏启动");
        }

        /**
         * 加载资源配置
         */
        public loadConfig():void{

        }

        /**
         * 初始化组件
         */
        public initComponents():void{

        }
        /**
         * 设置语言包
         */
        public setLanguage():void{

        }
        /**
         * 打开窗口
         */
        public openWindows():void{

        }
    }
}