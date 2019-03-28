
module egret {
    export class BasePanel extends BaseView {
        
        /**UI层*/
        public static LAYER_UI: number = 0;
        /**一级面板层*/
        public static LAYER_WINDOW_1: number = 1;
        /**二级面板层*/
        public static LAYER_WINDOW_2: number = 2;
        /**tips层*/
        public static LAYER_TIP: number = 3;
        /**引导层*/
        public static LAYER_GUIDE: number = 4;

        /** 类型 0为1级界面*/
        public layerType: number = 0;
        
        /** 是否需要在创建完成时主动打开一次*/
        public needOpenBack: Boolean = false;

        public constructor() {
            super();
        }
        
        public onCreate(): void {
            super.onCreate();
            this.onOpen();//egret.gui.UIEvent.CREATION_COMPLETE好像只会在显示对象被添加到舞台后才会出发，所以onOpen放在这里
        }

        public onOpen(): void {
        }

        public onClose(): void {
        }

        public open(): void {
            ApplicationManager.getInstance().openView(this);
        }

        public close(): void {
            ApplicationManager.getInstance().closeView(this);
        }

    }
}
