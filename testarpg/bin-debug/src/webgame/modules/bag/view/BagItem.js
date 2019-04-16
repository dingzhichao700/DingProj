var egret;
(function (egret) {
    var BagItem = (function (_super) {
        __extends(BagItem, _super);
        function BagItem() {
            _super.call(this);
            this._touchAble = true;
            this.skinName = "ui.bag.BagItemSkin";
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchHandler, this);
        }
        var __egretProto__ = BagItem.prototype;
        Object.defineProperty(__egretProto__, "itemId", {
            get: function () {
                return this.info.id;
            },
            set: function (id) {
                var vo = egret.ItemManager.getInstance().getCfg(id);
                this.info = vo;
            },
            enumerable: true,
            configurable: true
        });
        __egretProto__.setAble = function (value) {
            this._touchAble = value;
        };
        __egretProto__.showNum = function (value) {
            this._showNum = value;
            this.txtNum.visible = this._showNum;
        };
        Object.defineProperty(__egretProto__, "info", {
            get: function () {
                return this._info;
            },
            set: function (vo) {
                this._info = vo;
                if (this.isCreate) {
                    this.update();
                }
            },
            enumerable: true,
            configurable: true
        });
        __egretProto__.onCreate = function () {
            _super.prototype.onCreate.call(this);
            this.update();
        };
        __egretProto__.update = function () {
            //无数据
            if (this.info == null || this.info.id == 0) {
                this.imgIcon.visible = false;
                return;
            }
            this.imgIcon.visible = true;
            this.imgIcon.source = "resource/item/" + this.info.id + ".png";
            this.imgBg.source = "resource/unpack/frame_item_" + this.info.quality + ".png";
            var num = egret.BagManager.getInstance().getItemNum(this.info.id);
            this.txtNum.text = num + "";
            if (num > 1) {
                this.txtNum.visible = true;
            }
            else {
                this.txtNum.visible = this._showNum;
            }
        };
        __egretProto__.onTouchHandler = function (e) {
            if (this._touchAble) {
                egret.ItemTipsControl.getInstance().openTips(this.info.id);
            }
        };
        return BagItem;
    })(egret.BaseView);
    egret.BagItem = BagItem;
    BagItem.prototype.__class__ = "egret.BagItem";
})(egret || (egret = {}));
//# sourceMappingURL=BagItem.js.map