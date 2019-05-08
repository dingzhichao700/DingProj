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
    var MainUiItem = (function (_super) {
        __extends(MainUiItem, _super);
        function MainUiItem() {
            var _this = _super.call(this) || this;
            var self = _this;
            self.skinName = "resource/skins/mainUi/MainUITabBarItem.exml";
            DLG.DLGCore.event.addEventListener(_this, egret.TouchEvent.TOUCH_TAP, self, self.onBtnTouchHandler);
            return _this;
        }
        MainUiItem.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            var self = this;
            if (self.data == null) {
                return;
            }
            if (self.isInitView == false) {
                return;
            }
            self.btn.setScaleClick(true);
            self.btn.setOnClickListener(self, self.onBtnTouchHandler);
            self.tabId = self.data.tabId;
            self.btn["img"].source = self.data.img;
        };
        MainUiItem.prototype.onBtnTouchHandler = function () {
            var self = this;
            game.MainUIManager.getInstance().selectTabId = self.tabId;
        };
        MainUiItem.prototype.onDestroy = function () {
            _super.prototype.onDestroy.call(this);
        };
        return MainUiItem;
    }(DLG.CItemRenderer));
    game.MainUiItem = MainUiItem;
    __reflect(MainUiItem.prototype, "game.MainUiItem");
})(game || (game = {}));
//# sourceMappingURL=MainUiItem.js.map