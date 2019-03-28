/**
 *
 * @author
 *
 */
var egret;
(function (egret) {
    var BagView = (function (_super) {
        __extends(BagView, _super);
        function BagView() {
            _super.call(this);
            this.skinName = "ui.bag.BagViewSkin";
        }
        var __egretProto__ = BagView.prototype;
        __egretProto__.initView = function () {
            _super.prototype.initView.call(this);
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_END, this.close, this);
        };
        return BagView;
    })(egret.BasePanel);
    egret.BagView = BagView;
    BagView.prototype.__class__ = "egret.BagView";
})(egret || (egret = {}));
//# sourceMappingURL=BagView.js.map