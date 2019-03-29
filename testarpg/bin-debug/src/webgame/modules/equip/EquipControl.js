var egret;
(function (egret) {
    var EquipControl = (function () {
        function EquipControl() {
        }
        var __egretProto__ = EquipControl.prototype;
        EquipControl.getInstance = function () {
            if (!EquipControl._instance) {
                EquipControl._instance = new EquipControl();
            }
            return EquipControl._instance;
        };
        __egretProto__.openEquipView = function () {
            if (!this.equipView) {
                this.equipView = new egret.EquipView();
            }
            this.equipView.open();
        };
        return EquipControl;
    })();
    egret.EquipControl = EquipControl;
    EquipControl.prototype.__class__ = "egret.EquipControl";
})(egret || (egret = {}));
