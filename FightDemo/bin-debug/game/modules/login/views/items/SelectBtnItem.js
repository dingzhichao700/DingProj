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
    var SelectBtnItem = (function (_super) {
        __extends(SelectBtnItem, _super);
        function SelectBtnItem() {
            var _this = _super.call(this) || this;
            var self = _this;
            self.skinName = "resource/skins/login/SelectBtn.exml";
            DLG.DLGCore.event.addEventListener(self, egret.TouchEvent.TOUCH_TAP, self, self.onSelfClick);
            return _this;
        }
        SelectBtnItem.prototype.dataChanged = function () {
            var self = this;
            if (self._data == null) {
                return;
            }
            if (self.isInitView == false) {
                return;
            }
            self.serverType.text = this.data + "";
        };
        SelectBtnItem.prototype.onSelfClick = function () {
            if (SelectBtnItem.onCallBack) {
                SelectBtnItem.onCallBack.call(SelectBtnItem.onCallTarget);
            }
        };
        SelectBtnItem.prototype.onDestroy = function () {
            _super.prototype.onDestroy.call(this);
        };
        return SelectBtnItem;
    }(DLG.CItemRenderer));
    game.SelectBtnItem = SelectBtnItem;
    __reflect(SelectBtnItem.prototype, "game.SelectBtnItem");
})(game || (game = {}));
//# sourceMappingURL=SelectBtnItem.js.map