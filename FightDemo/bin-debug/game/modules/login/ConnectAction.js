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
    var ConnectAction = (function (_super) {
        __extends(ConnectAction, _super);
        // protected needShowCreate: boolean = false;
        function ConnectAction() {
            var _this = _super.call(this) || this;
            _this.createSocket();
            _this.createClock();
            _this.createPanelMar();
            return _this;
        }
        ConnectAction.prototype.onExecute = function (quFu) {
            var self = this;
            if (quFu) {
                //显示选择区服界面
                self.m_panelMar.show(game.PanelClassConfig.ID_ServerPanel);
                var loadMainAction = DLG.FactoryUtils.getClass(game.LoadMainResAction);
                loadMainAction.onExecute();
            }
            else {
                if (game.LoginManager.getInstance().agent == 'test') {
                    //显示输入账号界面 
                    self.m_panelMar.show(game.PanelClassConfig.ID_LoginInputPanel);
                }
                else if (game.LoginManager.getInstance().agent == 'debug') {
                    var loadMainAction = DLG.FactoryUtils.getClass(game.LoadMainResAction);
                    loadMainAction.onExecute();
                }
                else {
                    var arr = game.ServerTable.getDataVec();
                    self.connect(arr[arr.length - 1].config);
                    arr.length = 0;
                    arr = null;
                }
            }
        };
        /**开始建立网络链接 */
        ConnectAction.prototype.connect = function (url) {
            var self = this;
            self.m_socket.onConnectByUrl(url, self.onConnectSocket, self.onConnectClose, self);
        };
        /**成功建立连接 */
        ConnectAction.prototype.onConnectSocket = function () {
            var self = this;
            //注册协议
            game.HeroManager.getInstance().registProtocol();
            game.LoginManager.getInstance().registProtocol();
            //发送登陆消息
            game.LoginManager.getInstance().reqloginForPlatform();
        };
        /**建立链接失败 */
        ConnectAction.prototype.onConnectClose = function () {
        };
        ConnectAction.prototype.onDestroy = function () {
            // let self = this;
            // self.needShowCreate = undefined;
            // super.onDestroy();
        };
        return ConnectAction;
    }(DLG.BaseAction));
    game.ConnectAction = ConnectAction;
    __reflect(ConnectAction.prototype, "game.ConnectAction");
})(game || (game = {}));
//# sourceMappingURL=ConnectAction.js.map