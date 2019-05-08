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
    var ServerPanel = (function (_super) {
        __extends(ServerPanel, _super);
        function ServerPanel(panelId, fromPanelid) {
            return _super.call(this, panelId) || this;
        }
        ServerPanel.prototype.onShow = function () {
            var arg = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                arg[_i] = arguments[_i];
            }
            _super.prototype.onShow.apply(this, arg);
            var self = this;
            self.main = new ServerView();
            self.addChild(self.main);
            self.main.onLoadCallBack = self.initView;
            self.main.onLoadCallTarget = self;
        };
        ServerPanel.prototype.initView = function () {
            _super.prototype.initView.call(this);
            var self = this;
            self.main.loginBg.source = String("loginBg_jpg");
            self.main.btn_start.setOnClickListener(self, self.loginGame);
            self.main.selectServerBtn.setOnClickListener(self, self.selectServerHandle);
        };
        // public onRefresh(): void {
        // super.onRefresh();
        ServerPanel.prototype.renderViews = function () {
            var self = this;
            var serverId = game.LoginManager.getInstance().selectServerId;
            if (serverId <= 10) {
                self.main.serverName.text = "内测" + serverId + "区(新服)";
            }
            else {
                var qus = serverId - 10;
                self.main.serverName.text = "公测" + qus + "区(新服)";
            }
        };
        /**进入游戏 */
        ServerPanel.prototype.loginGame = function () {
            var configData = game.ServerTable.getCfgById(game.LoginManager.getInstance().selectServerId);
            var url = configData.config;
            var connectAction = DLG.FactoryUtils.getClass(game.ConnectAction);
            connectAction.connect(url);
            // if (DLG.DLGCore.socket.isConnected) {
            // 	LoginManager.getInstance().reqloginForPlatform();
            // }
        };
        /**选区弹框 */
        ServerPanel.prototype.selectServerHandle = function () {
            DLG.DLGCore.panel.show(game.PanelClassConfig.ID_SelectServerPanel);
        };
        ServerPanel.prototype.onDestroy = function () {
            _super.prototype.onDestroy.call(this);
            var self = this;
            if (self.main) {
                self.main.onLoadCallBack = undefined;
                self.main.onLoadCallTarget = undefined;
                self.main.onDestroy();
            }
            self.main = undefined;
        };
        return ServerPanel;
    }(DLG.VPanel));
    game.ServerPanel = ServerPanel;
    __reflect(ServerPanel.prototype, "game.ServerPanel");
})(game || (game = {}));
//# sourceMappingURL=ServerPanel.js.map