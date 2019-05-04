/**
* 容器基类,所有的容器都应该继承这个
*
*/
module egret {

    export class BaseView extends egret.gui.SkinnableContainer {
        
        /**组件是否已初始化*/
        public isCreate:Boolean = false;
        
        public constructor() {
            super();
            this.addEventListener(egret.gui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this);
        }
        
        /** 创建完成*/
        private createCompleteEvent(event: egret.gui.UIEvent): void {
            this.removeEventListener(egret.gui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this);
            this.onCreate();
        }

        public onCreate(): void {
            this.isCreate = true;
        }
        
    }
}