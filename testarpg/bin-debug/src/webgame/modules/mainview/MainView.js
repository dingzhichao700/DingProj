var egret;
(function (egret) {
    var MainView = (function (_super) {
        __extends(MainView, _super);
        function MainView() {
            _super.call(this);
            this.layerType = egret.BasePanel.LAYER_UI;
            this.skinName = "ui.main.MainViewSkin";
        }
        var __egretProto__ = MainView.prototype;
        __egretProto__.onOpen = function () {
            _super.prototype.onOpen.call(this);
            this.btnSoulRoad.addEventListener(egret.TouchEvent.TOUCH_END, this.openSoulRoad, this);
            this.btnWuhun.addEventListener(egret.TouchEvent.TOUCH_END, this.openWuhun, this);
            this.btnBag.addEventListener(egret.TouchEvent.TOUCH_END, this.openBag, this);
            this.btnEquip.addEventListener(egret.TouchEvent.TOUCH_END, this.openEquip, this);
        };
        __egretProto__.openSoulRoad = function () {
            egret.SoulRoadControl.getInstance().openSoulRoad();
        };
        __egretProto__.openWuhun = function () {
            egret.WuhunControl.getInstance().openwuhunView();
        };
        __egretProto__.openBag = function () {
            egret.BagControl.getInstance().openBagView();
        };
        __egretProto__.openEquip = function () {
            egret.EquipControl.getInstance().openEquipView();
        };
        return MainView;
    })(egret.BasePanel);
    egret.MainView = MainView;
    MainView.prototype.__class__ = "egret.MainView";
})(egret || (egret = {}));
//# sourceMappingURL=MainView.js.map