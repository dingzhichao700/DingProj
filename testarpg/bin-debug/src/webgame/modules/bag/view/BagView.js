var egret;
(function (egret) {
    var BagView = (function (_super) {
        __extends(BagView, _super);
        function BagView() {
            _super.call(this);
            this.layerType = egret.BasePanel.LAYER_WINDOW_1;
            this.skinName = "ui.bag.BagViewSkin";
        }
        var __egretProto__ = BagView.prototype;
        __egretProto__.onOpen = function () {
            _super.prototype.onOpen.call(this);
            this.window.btnClose.addEventListener(egret.TouchEvent.TOUCH_END, this.close, this);
            this.update();
        };
        __egretProto__.update = function () {
            this.itemCon.removeAllElements();
            for (var i = 0; i < 25; i++) {
                var item = new egret.BagItem();
                item.itemId = 1 + i;
                item.x = 5 + (i % 6) * 81;
                item.y = 5 + Math.floor(i / 6) * 80;
                this.itemCon.addElement(item);
            }
            //            var equipData: egret.gui.ArrayCollection = new egret.gui.ArrayCollection();
            //            equipData.addItem(vo);
            //            this.itemList.itemRenderer = new egret.gui.ClassFactory(BagItem);
            //            this.itemList.itemRenderer = BagItem;
            //            this.itemList.dataProvider = equipData;
            //            this.itemList.dataProvider = new egret.gui.ArrayCollection(["item1","item2","item3"]);
        };
        return BagView;
    })(egret.BasePanel);
    egret.BagView = BagView;
    BagView.prototype.__class__ = "egret.BagView";
})(egret || (egret = {}));
//# sourceMappingURL=BagView.js.map