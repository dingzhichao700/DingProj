var egret;
(function (egret) {
    var WuhunView = (function (_super) {
        __extends(WuhunView, _super);
        function WuhunView() {
            _super.call(this);
            this.layerType = egret.BasePanel.LAYER_WINDOW_1;
            this.skinName = "ui.wuhun.WuhunViewSkin";
        }
        var __egretProto__ = WuhunView.prototype;
        __egretProto__.onOpen = function () {
            _super.prototype.onOpen.call(this);
            this.window.btnClose.addEventListener(egret.TouchEvent.TOUCH_END, this.close, this);
            if (!this.clip) {
                this.clip = new egret.AnimeClip();
                this.clip.loadUrl("tiger", true);
                this.boxCon.addElement(this.clip);
            }
        };
        return WuhunView;
    })(egret.BasePanel);
    egret.WuhunView = WuhunView;
    WuhunView.prototype.__class__ = "egret.WuhunView";
})(egret || (egret = {}));
//# sourceMappingURL=WuhunView.js.map