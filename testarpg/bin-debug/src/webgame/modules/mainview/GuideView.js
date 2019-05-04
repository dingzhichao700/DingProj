var egret;
(function (egret) {
    var GuideView = (function (_super) {
        __extends(GuideView, _super);
        function GuideView() {
            _super.call(this);
            this.layerType = egret.BasePanel.LAYER_GUIDE;
            this.skinName = "ui.main.GuideViewSkin";
        }
        var __egretProto__ = GuideView.prototype;
        __egretProto__.onOpen = function () {
            this.imgGuide.visible = false;
            this.imgRole.addEventListener(egret.TouchEvent.TOUCH_END, this.guideNext, this);
            egret.ApplicationManager.getInstance().stage.addEventListener(egret.Event.RESIZE, this.resizeHandler, this);
            this.onResize();
        };
        __egretProto__.guideNext = function () {
            this.close();
            return;
            this.imgRole.visible = false;
            this.imgGuide.visible = true;
            this.imgBg.alpha = 0.5;
            this.imgBg.addEventListener(egret.TouchEvent.TOUCH_END, this.openSoulRoad, this);
            this.showTween();
        };
        __egretProto__.showTween = function () {
            var contentH = egret.ApplicationManager.CONTENT_H;
            var windowH = document.documentElement.clientHeight;
            var globalScale = egret.ApplicationManager.getInstance().globalScale;
            var targetY = windowH / globalScale;
            egret.Tween.get(this.imgGuide).to({ y: targetY - 500 }, 1000).call(this.reSet, this);
        };
        __egretProto__.reSet = function () {
            var contentH = egret.ApplicationManager.CONTENT_H;
            var windowH = document.documentElement.clientHeight;
            var globalScale = egret.ApplicationManager.getInstance().globalScale;
            var targetY = windowH / globalScale;
            egret.Tween.get(this.imgGuide).to({ y: targetY - 450 }, 1000).call(this.showTween, this);
        };
        __egretProto__.openSoulRoad = function () {
            this.close();
            egret.Tween.removeTweens(this.imgGuide);
            egret.SoulRoadControl.getInstance().openSoulRoad();
        };
        __egretProto__.resizeHandler = function (e) {
            this.onResize();
        };
        __egretProto__.onResize = function () {
            var contentW = egret.ApplicationManager.CONTENT_W;
            var contentH = egret.ApplicationManager.CONTENT_H;
            var windowW = document.documentElement.clientWidth;
            var windowH = document.documentElement.clientHeight;
            var globalScale = egret.ApplicationManager.getInstance().globalScale;
            this.imgBg.y = -(windowH - contentH * globalScale) / (2 * globalScale);
            this.imgBg.x = -(windowW - contentW * globalScale) / (2 * globalScale);
            this.imgBg.scaleX = (windowW / contentW) / globalScale;
            this.imgBg.scaleY = (windowH / contentH) / globalScale;
        };
        return GuideView;
    })(egret.BasePanel);
    egret.GuideView = GuideView;
    GuideView.prototype.__class__ = "egret.GuideView";
})(egret || (egret = {}));
//# sourceMappingURL=GuideView.js.map