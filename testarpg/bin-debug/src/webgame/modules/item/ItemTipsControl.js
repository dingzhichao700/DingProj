/**
 *
 * @author
 *
 */
var egret;
(function (egret) {
    var ItemTipsControl = (function () {
        function ItemTipsControl() {
        }
        var __egretProto__ = ItemTipsControl.prototype;
        ItemTipsControl.getInstance = function () {
            if (!ItemTipsControl._instance) {
                ItemTipsControl._instance = new ItemTipsControl();
            }
            return ItemTipsControl._instance;
        };
        __egretProto__.openTips = function (id) {
            if (!this.tips) {
                this.tips = new egret.ItemTips();
            }
            this.tips.setData(id);
            this.tips.open();
        };
        return ItemTipsControl;
    })();
    egret.ItemTipsControl = ItemTipsControl;
    ItemTipsControl.prototype.__class__ = "egret.ItemTipsControl";
})(egret || (egret = {}));
