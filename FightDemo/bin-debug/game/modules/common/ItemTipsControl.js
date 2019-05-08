var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var game;
(function (game) {
    var ItemTipsControl = (function (_super) {
        __extends(ItemTipsControl, _super);
        function ItemTipsControl() {
            var _this = _super.call(this) || this;
            var self = _this;
            self.createSocket();
            self.createPanelMar();
            return _this;
        }
        ItemTipsControl.getInstance = function () {
            var self = this;
            if (!self._instance) {
                self._instance = new ItemTipsControl();
            }
            return self._instance;
        };
        ItemTipsControl.prototype.initTips = function (goodsId, btnType, callBackFun, callBackObj, callBackArg) {
            this.goodsId = goodsId;
            this.btnType = btnType;
            this.callBackFun = callBackFun;
            this.callBackObj = callBackObj;
            this.callBackArg = callBackArg;
            DLG.DLGCore.panel.show(game.PanelClassConfig.ID_TipsPanel);
        };
        return ItemTipsControl;
    }(DLG.BaseAction));
    game.ItemTipsControl = ItemTipsControl;
    __reflect(ItemTipsControl.prototype, "game.ItemTipsControl");
})(game || (game = {}));
//# sourceMappingURL=ItemTipsControl.js.map