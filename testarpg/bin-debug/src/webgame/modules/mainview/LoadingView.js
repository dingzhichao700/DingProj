var egret;
(function (egret) {
    var LoadingView = (function (_super) {
        __extends(LoadingView, _super);
        function LoadingView() {
            _super.call(this);
            this.layerType = egret.BasePanel.LAYER_TIP;
            this.skinName = "ui.main.LoadingViewSkin";
        }
        var __egretProto__ = LoadingView.prototype;
        __egretProto__.onOpen = function () {
            this.boxCon.alpha = 0;
            this.txtTitle.text = this.title;
            egret.TimerManager.getInstance().addExecute(this.close, this, 3000, [], 1);
            egret.Tween.get(this.boxCon).to({ alpha: 1 }, 500);
        };
        return LoadingView;
    })(egret.BasePanel);
    egret.LoadingView = LoadingView;
    LoadingView.prototype.__class__ = "egret.LoadingView";
})(egret || (egret = {}));
//# sourceMappingURL=LoadingView.js.map