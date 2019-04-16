var egret;
(function (egret) {
    var WarningView = (function (_super) {
        __extends(WarningView, _super);
        function WarningView() {
            _super.call(this);
            this.layerType = egret.BasePanel.LAYER_WARNING;
            this.skinName = "ui.main.WarningViewSkin";
        }
        var __egretProto__ = WarningView.prototype;
        __egretProto__.onOpen = function () {
            _super.prototype.onOpen.call(this);
            this.boxCon.alpha = 0;
        };
        __egretProto__.showMsg = function (str) {
            egret.Tween.removeTweens(this.boxCon);
            egret.TimerManager.getInstance().removeExecute(this.delayKey);
            this.txtContext.text = str;
            egret.Tween.get(this.boxCon).to({ alpha: 1 }, 200);
            this.delayKey = egret.TimerManager.getInstance().addExecute(this.hide, this, 1500);
        };
        __egretProto__.hide = function () {
            egret.Tween.get(this.boxCon).to({ alpha: 0 }, 300);
        };
        return WarningView;
    })(egret.BasePanel);
    egret.WarningView = WarningView;
    WarningView.prototype.__class__ = "egret.WarningView";
})(egret || (egret = {}));
//# sourceMappingURL=WarningView.js.map