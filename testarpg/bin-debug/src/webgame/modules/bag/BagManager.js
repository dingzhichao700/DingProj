var egret;
(function (egret) {
    var BagManager = (function () {
        function BagManager() {
            this.init();
        }
        var __egretProto__ = BagManager.prototype;
        BagManager.getInstance = function () {
            if (!BagManager._instance) {
                BagManager._instance = new BagManager();
            }
            return BagManager._instance;
        };
        __egretProto__.init = function () {
            this._itemData = [];
            for (var i = 0; i < 25; i++) {
                var vo = new egret.ItemData();
                vo.id = i + 1;
                vo.num = 1;
                this._itemData.push(vo);
            }
            var vo = new egret.ItemData();
            vo.id = 26;
            vo.num = 2;
            this._itemData.push(vo);
        };
        Object.defineProperty(__egretProto__, "itemData", {
            get: function () {
                if (this._itemData == null) {
                    this.init();
                }
                return this._itemData;
            },
            enumerable: true,
            configurable: true
        });
        /**获取物品信息*/
        __egretProto__.getItem = function (id) {
            for (var i = 0; i < this._itemData.length; i++) {
                var vo = this._itemData[i];
                if (vo.id == id) {
                    return vo;
                }
            }
            return null;
        };
        /**获取物品数量*/
        __egretProto__.getItemNum = function (id) {
            var item = this.getItem(id);
            if (item) {
                return item.num;
            }
            return 0;
        };
        __egretProto__.addItem = function (id, num) {
            var find = false;
            for (var i = 0; i < this._itemData.length; i++) {
                var vo = this._itemData[i];
                if (vo.id == id) {
                    find = true;
                    vo.num += num;
                }
            }
            if (!find) {
                var newItem = new egret.ItemData();
                newItem.id = id;
                newItem.num = num;
                this._itemData.push(newItem);
            }
        };
        __egretProto__.reduceItem = function (id, num) {
            for (var i = 0; i < this._itemData.length; i++) {
                var vo = this._itemData[i];
                if (vo.id == id) {
                    vo.num -= num;
                    if (vo.num <= 0) {
                        this._itemData.splice(i, 1);
                    }
                }
            }
        };
        return BagManager;
    })();
    egret.BagManager = BagManager;
    BagManager.prototype.__class__ = "egret.BagManager";
})(egret || (egret = {}));
//# sourceMappingURL=BagManager.js.map