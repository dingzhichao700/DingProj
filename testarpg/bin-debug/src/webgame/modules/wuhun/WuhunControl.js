var egret;
(function (egret) {
    var WuhunControl = (function () {
        function WuhunControl() {
        }
        var __egretProto__ = WuhunControl.prototype;
        WuhunControl.getInstance = function () {
            if (!WuhunControl._instance) {
                WuhunControl._instance = new WuhunControl();
            }
            return WuhunControl._instance;
        };
        __egretProto__.openwuhunView = function () {
            if (!this.wuhunView) {
                this.wuhunView = new egret.WuhunView();
            }
            this.wuhunView.open();
        };
        return WuhunControl;
    })();
    egret.WuhunControl = WuhunControl;
    WuhunControl.prototype.__class__ = "egret.WuhunControl";
})(egret || (egret = {}));
