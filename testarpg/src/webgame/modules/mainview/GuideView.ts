
module egret {

    export class GuideView extends BasePanel {
        
        private imgBg: egret.gui.UIAsset;
        private imgRole: egret.gui.UIAsset;
        private imgGuide: egret.gui.UIAsset;
        
        public constructor() {
            super();
            this.layerType = BasePanel.LAYER_GUIDE;
            this.skinName = "ui.main.GuideViewSkin";
        }

        public onOpen(): void {
            this.imgGuide.visible = false;
            
            this.imgRole.addEventListener(egret.TouchEvent.TOUCH_END,this.guideNext,this); 

            ApplicationManager.getInstance().stage.addEventListener(Event.RESIZE,this.resizeHandler,this);
            this.onResize();
        }

        private guideNext(): void {
            this.close();
            return;
            
            this.imgRole.visible = false;
            this.imgGuide.visible = true;
            this.imgBg.alpha = 0.5;
            this.imgBg.addEventListener(egret.TouchEvent.TOUCH_END,this.openSoulRoad,this);
            
            this.showTween();
        }
        
        private showTween(): void {
            var contentH: number = ApplicationManager.CONTENT_H;
            var windowH: number = document.documentElement.clientHeight;
            var globalScale: number = ApplicationManager.getInstance().globalScale;
            var targetY:number = windowH  / globalScale;
            Tween.get(this.imgGuide).to({ y: targetY-500},1000).call(this.reSet, this);
        }

        private reSet(): void {
            var contentH: number = ApplicationManager.CONTENT_H;
            var windowH: number = document.documentElement.clientHeight;
            var globalScale: number = ApplicationManager.getInstance().globalScale;
            var targetY: number = windowH / globalScale;
            Tween.get(this.imgGuide).to({ y: targetY - 450},1000).call(this.showTween,this);
        }

        private openSoulRoad(): void {
            this.close();
            Tween.removeTweens(this.imgGuide);
            SoulRoadControl.getInstance().openSoulRoad();
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
            this.imgBg.y = -(windowH - contentH * globalScale) / (2 * globalScale);
            this.imgBg.x = -(windowW - contentW * globalScale) / (2 * globalScale);
            this.imgBg.scaleX = (windowW / contentW) / globalScale;
            this.imgBg.scaleY = (windowH / contentH) / globalScale;
        }
    }
}
