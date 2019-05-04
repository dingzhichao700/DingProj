
module egret {
    export class MaskView extends BasePanel{
        
        private imgMask:egret.gui.UIAsset;
        
        public constructor() {
            super();
            this.layerType = BasePanel.LAYER_MASK;
            this.skinName = "ui.MaskViewSkin";
        }
        
        public onOpen(): void {
            ApplicationManager.getInstance().stage.addEventListener(Event.RESIZE,this.resizeHandler,this);
            this.onResize();
        }

        private resizeHandler(e: egret.Event): void {
            this.onResize();
        }

        private onResize(): void {
            var contentW: number = ApplicationManager.CONTENT_W;
            var contentH: number = ApplicationManager.CONTENT_H;
            var windowW: number = document.documentElement.clientWidth;
            var windowH: number = document.documentElement.clientHeight;

            var globalScale: number = ApplicationManager.getInstance().globalScale;
            this.imgMask.y = -(windowH - contentH * globalScale) / (2 * globalScale);
            this.imgMask.x = -(windowW - contentW * globalScale) / (2 * globalScale);
            this.imgMask.scaleX = (windowW / contentW) / globalScale;
            this.imgMask.scaleY = (windowH / contentH) / globalScale;
        }
        
    }
}
