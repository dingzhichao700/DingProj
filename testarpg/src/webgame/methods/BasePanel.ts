
module egret {
    export class BasePanel extends BaseView {
        
        /**UI层*/
        public static LAYER_UI: number = 0;
        /**遮罩层*/
        public static LAYER_MASK: number = 1;
        /**一级面板层*/
        public static LAYER_WINDOW_1: number = 2;
        /**二级面板层*/
        public static LAYER_WINDOW_2: number = 3;
        /**tips层*/
        public static LAYER_TIP: number = 4;
        /**引导层*/
        public static LAYER_GUIDE: number = 5;
        /**警告*/
        public static LAYER_WARNING: number = 6;

        /** 类型 0为1级界面*/
        public layerType: number = 0;
        
        /**是否序列化完成*/
//        public isFirstCreate: Boolean = false;
        
        /**是否打开中（在舞台显示列表中）*/            
        public isOpen:Boolean = false;
        
        /** 是否需要在创建完成时主动打开一次*/
        public needOpenBack: Boolean = false;

        public constructor() {
            super();
        }
        
        public onCreate(): void {
            super.onCreate();
            if(!this.isOpen){
                this.openEnd();//egret.gui.UIEvent.CREATION_COMPLETE好像只会在显示对象被添加到舞台后才会派发，所以onOpen放在这里  
            }  
        }

        public openEnd(): void {
            if(this.isCreate) {
                this.isOpen = true;
                this.onOpen();
            }
        }
        
        public onOpen(): void {
        }

        public onClose(): void {
        }

        public open(): void {
            ApplicationManager.getInstance().openView(this);
            if(this.layerType == BasePanel.LAYER_WINDOW_1 || this.layerType == BasePanel.LAYER_WINDOW_2){
                MainControl.getInstance().openMask();
            }
        }

        public close(): void {
            ApplicationManager.getInstance().closeView(this);
            if(this.layerType == BasePanel.LAYER_WINDOW_1 || this.layerType == BasePanel.LAYER_WINDOW_2) {
                MainControl.getInstance().closeMask();
            }
        }

    }
}
