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
    var SelectServerItem = (function (_super) {
        __extends(SelectServerItem, _super);
        function SelectServerItem() {
            var _this = _super.call(this) || this;
            var self = _this;
            self.skinName = "resource/skins/login/SelectServerItem.exml";
            DLG.DLGCore.event.addEventListener(_this, egret.TouchEvent.TOUCH_TAP, self, self.onBtnTouchHandler);
            return _this;
        }
        SelectServerItem.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            var self = this;
            if (self.data == null) {
                return;
            }
            if (self.isInitView == false) {
                return;
            }
            self.serverId = self.data.serverId;
            if (self.data.serverId <= 10) {
                self.serverName.text = "内测" + this.data.serverId + "区";
            }
            else {
                self.serverName.text = "公测" + (this.data.serverId - 10) + "区";
            }
        };
        SelectServerItem.prototype.onBtnTouchHandler = function () {
            var self = this;
            game.LoginManager.getInstance().selectServerId = self.serverId;
            DLG.DLGCore.panel.close(game.PanelClassConfig.ID_SelectServerPanel);
            var serverPanel = DLG.DLGCore.panel.getPanelById(game.PanelClassConfig.ID_ServerPanel);
            serverPanel.onRefresh();
        };
        SelectServerItem.prototype.onDestroy = function () {
            _super.prototype.onDestroy.call(this);
        };
        return SelectServerItem;
    }(DLG.CItemRenderer));
    game.SelectServerItem = SelectServerItem;
    __reflect(SelectServerItem.prototype, "game.SelectServerItem");
})(game || (game = {}));
//# sourceMappingURL=SelectServerItem.js.map