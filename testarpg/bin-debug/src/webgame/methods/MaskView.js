var egret;
(function (egret) {
    var MaskView = (function (_super) {
        __extends(MaskView, _super);
        function MaskView() {
            _super.call(this);
            this.layerType = egret.BasePanel.LAYER_MASK;
            this.skinName = "ui.MaskViewSkin";
        }
        var __egretProto__ = MaskView.prototype;
        __egretProto__.onOpen = function () {
            egret.ApplicationManager.getInstance().stage.addEventListener(egret.Event.RESIZE, this.resizeHandler, this);
            this.onResize();
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
            this.imgMask.y = -(windowH - contentH * globalScale) / (2 * globalScale);
            this.imgMask.x = -(windowW - contentW * globalScale) / (2 * globalScale);
            this.imgMask.scaleX = (windowW / contentW) / globalScale;
            this.imgMask.scaleY = (windowH / contentH) / globalScale;
        };
        return MaskView;
    })(egret.BasePanel);
    egret.MaskView = MaskView;
    MaskView.prototype.__class__ = "egret.MaskView";
})(egret || (egret = {}));
//# sourceMappingURL=MaskView.js.map