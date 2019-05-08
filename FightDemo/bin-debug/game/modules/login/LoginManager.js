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
    var LoginManager = (function (_super) {
        __extends(LoginManager, _super);
        function LoginManager() {
            var _this = _super.call(this) || this;
            /**平台标识 */
            _this.agent = "debug";
            /**平台服务器的LINUX时间戳(为长整数, 单位为秒) */
            _this.time = "0";
            /**1成年,0未成年,-1未知 */
            _this.isadult = "0";
            /**全小写MD5验证码 */
            _this.sign = "0";
            /**登陆类型 */
            _this.logintype = "0";
            /**平台数据 */
            _this.agentPlusdata = "0";
            /**token */
            _this.token = "0";
            /**区服 */
            _this.qufu = new Array();
            /**选中区服id */
            _this.selectServerId = 1;
            var self = _this;
            self.createSocket();
            self.createPanelMar();
            return _this;
        }
        LoginManager.getInstance = function () {
            var self = this;
            if (!self._instance) {
                self._instance = new LoginManager();
            }
            return self._instance;
        };
        /**获取区服数据 */
        LoginManager.prototype.getServerData = function () {
            var self = this;
            if (!self.serverDataArr) {
                self.serverDataArr = [];
                var list = game.ServerTable.getDataVec();
                var i = 0;
                var iLen = list.length;
                for (i = 0; i < iLen; i++) {
                    var obj = {};
                    obj = { serverId: list[i].id, isNew: false, serverIp: list[i].config };
                    self.serverDataArr.push(obj);
                }
                DLG.SortTools.sortMap(self.serverDataArr, 'serverId', true);
                var obj2 = self.serverDataArr[self.serverDataArr.length - 1];
                obj2.isNew = true;
            }
            return self.serverDataArr;
        };
        /**注册接收协议 */
        LoginManager.prototype.registProtocol = function () {
            var self = this;
            self.m_socket.onDataCallback(game.CmdCode.ACK_LoginSuccess, '', self.loginSuccess, self);
            self.m_socket.onDataCallback(game.CmdCode.ACK_LoginFailed, '', self.loginFailed, self);
            self.m_socket.onDataCallback(game.CmdCode.ACK_Character, '', self.receiveCharacter, self);
            self.m_socket.onDataCallback(game.CmdCode.ACK_APersonOpt, "dinghao", self.dinghaoInfo, self); //顶号消息
        };
        // /**显示创建角色界面 */
        // public showCreateRoleView(): void {
        // 	let self = this;
        // 	//显示创建角色界面
        // 	self.m_panelMar.show(PanelClassConfig.ID_CreateRolePanel);
        // }
        /**本地登录消息发送 */
        LoginManager.prototype.reqlogin = function (serverid, loginUserName, loginPassword) {
            var self = this;
            var sendData = new game.GLoginM();
            sendData.name = loginUserName;
            sendData.password = loginPassword;
            sendData.serverid = serverid;
            //发送本地登录消息
            self.m_socket.onSend(game.CmdCode.REQ_LOGIN, sendData);
        };
        /**发送网络登陆消息 */
        LoginManager.prototype.reqloginForPlatform = function () {
            var self = this;
            var sendData = new game.GLoginForPlatformM();
            sendData.serverId = self.selectServerId;
            sendData.username = self.loginUserName;
            //平台标识
            sendData.agent = self.agent;
            //平台服务器的LINUX时间戳(为长整数, 单位为秒)
            sendData.time = self.time;
            //1成年,0未成年,-1未知
            sendData.isadult = self.isadult;
            //全小写MD5验证码
            sendData.sign = self.sign;
            //登陆类型
            sendData.logintype = self.logintype;
            //平台数据
            sendData.agentPlusdata = self.agentPlusdata;
            //token
            sendData.token = self.token;
            self.m_socket.onSend(game.CmdCode.REQ_LoginForPlatform, sendData);
        };
        /**接收角色相关消息，判断是否有角色 */
        LoginManager.prototype.receiveCharacter = function (obj) {
            var self = this;
            var playerId = Number(obj.playerId);
            if (playerId <= 0) {
                //没有账号 显示创角界面
                // LoginManager.getInstance().showCreateRoleView();
                self.m_panelMar.show(game.PanelClassConfig.ID_CreateRolePanel);
            }
            else {
                //发送选角消息
                var sendData = new game.GSelectCharacterM();
                sendData.playerId = playerId;
                self.m_socket.onSend(game.CmdCode.REQ_SelectCharacter, sendData);
            }
        };
        /**接收登录成功消息 */
        LoginManager.prototype.loginSuccess = function (obj) {
            //发送加载完成消息
            var self = this;
            self.loginMapId = Number(obj.mapId);
            var sendData = new game.GLoadFinishM();
            sendData.type = 0;
            sendData.width = 480;
            sendData.height = 800;
            self.m_socket.onSend(game.CmdCode.REQ_GLoadFinish, sendData);
            self.isloginSuccess = true;
            self.checkComeInGame();
        };
        /**进入游戏 */
        LoginManager.prototype.checkComeInGame = function () {
            var self = this;
            if (self.loadZip && self.loadMainRes /*&& self.isloginSuccess*/) {
                self.m_panelMar.show(game.PanelClassConfig.ID_MainUiPanel);
                /**进入游戏场景 */
                self.loginMapId = 100006;
                self.m_panelMar.closeAll();
                self.m_panelMar.show(game.PanelClassConfig.ID_WelcomePanel);
                new game.SceneWindow();
                game.SceneManager.getInstance().changeMap(self.loginMapId, false);
                var attr = new game.AttrData();
                attr.setValue(game.Enum_Attr.hp, 100);
                attr.setValue(game.Enum_Attr.totalHp, 100);
                attr.setValue(game.Enum_Attr.attack, 1000);
                game.HeroManager.getInstance().addRole(0, 'player1', game.ENUM_JOB_TYPE.job_ZS, attr, [10001, 10002, 10003, 10004, 10005, 10006, 10007, 10008, 10009, 10010, 10011]);
                game.HeroManager.getInstance().addRole(1, 'player1', game.ENUM_JOB_TYPE.JOB_GJS, attr, [11001, 11002, 11003, 11004, 11005, 11006, 11007, 11008, 11009, 11010, 11011]);
                if (Math.random() > 0.5)
                    game.HeroManager.getInstance().addRole(2, 'player1', game.ENUM_JOB_TYPE.JOB_CK, attr, [12001, 12002, 12003, 12004, 12005, 12006, 12007, 12008, 12009, 12010, 12011, 12012]);
                if (Math.random() > 0.5)
                    game.HeroManager.getInstance().addRole(3, 'player1', game.ENUM_JOB_TYPE.JOB_FS, attr, [13001, 13002, 13003, 13004, 13005, 13006, 13007, 13008, 13009]);
                if (Math.random() > 0.5)
                    game.HeroManager.getInstance().addRole(4, 'player1', game.ENUM_JOB_TYPE.JOB_WS, attr, [14001, 14002, 14003, 14004, 14005, 14006, 14007, 14008, 14009, 14010, 14011, 14012]);
            }
        };
        /**接收登录失败消息 */
        LoginManager.prototype.loginFailed = function (type, arr) {
        };
        /**接收顶号消息 */
        LoginManager.prototype.dinghaoInfo = function (type, arr) {
            //显示顶号面板
        };
        return LoginManager;
    }(DLG.BaseAction));
    game.LoginManager = LoginManager;
    __reflect(LoginManager.prototype, "game.LoginManager");
})(game || (game = {}));
//# sourceMappingURL=LoginManager.js.map