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
            this.boxPower.alpha = 0;
        };
        __egretProto__.showMsg = function (str) {
            egret.Tween.removeTweens(this.boxCon);
            egret.TimerManager.getInstance().removeExecute(this.delayKey);
            this.boxCon.alpha = 0;
            this.txtContext.text = str;
            egret.Tween.get(this.boxCon).to({ alpha: 1 }, 200);
            this.delayKey = egret.TimerManager.getInstance().addExecute(function () {
                egret.Tween.get(this.boxCon).to({ alpha: 0 }, 300);
            }, this, 1500);
        };
        __egretProto__.showAddPower = function (value) {
            egret.TimerManager.getInstance().removeExecute(this.delayKey2);
            egret.Tween.removeTweens(this.boxPower);
            this.boxPower.alpha = 0;
            this.boxPower.y = WarningView.START_Y;
            this.boxPowerNum.removeAllElements();
            var str = value.toString();
            for (var i = 0; i < str.length; i++) {
                var num = Number(str[i]);
                var imgNum = new egret.gui.UIAsset();
                imgNum.source = "resource/main/fight_" + num + ".png";
                imgNum.x = 28 * i;
                this.boxPowerNum.addElement(imgNum);
            }
            egret.Tween.get(this.boxPower).to({ alpha: 1, y: WarningView.START_Y + 25 }, 500);
            this.delayKey2 = egret.TimerManager.getInstance().addExecute(function () {
                egret.Tween.get(this.boxPower).to({ alpha: 0, y: WarningView.START_Y }, 500);
            }, this, 3000, [], 1); //隐藏
        };
        WarningView.START_Y = 430;
        return WarningView;
    })(egret.BasePanel);
    egret.WarningView = WarningView;
    WarningView.prototype.__class__ = "egret.WarningView";
})(egret || (egret = {}));
//# sourceMappingURL=WarningView.js.map