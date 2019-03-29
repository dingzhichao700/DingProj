var egret;
(function (egret) {
    var BagControl = (function () {
        function BagControl() {
        }
        var __egretProto__ = BagControl.prototype;
        BagControl.getInstance = function () {
            if (!BagControl._instance) {
                BagControl._instance = new BagControl();
            }
            return BagControl._instance;
        };
        __egretProto__.openBagView = function () {
            if (!this.bagView) {
                this.bagView = new egret.BagView();
            }
            this.bagView.open();
        };
        return BagControl;
    })();
    egret.BagControl = BagControl;
    BagControl.prototype.__class__ = "egret.BagControl";
})(egret || (egret = {}));
