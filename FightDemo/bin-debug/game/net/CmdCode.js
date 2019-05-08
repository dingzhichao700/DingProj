var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var CmdCode = (function () {
        function CmdCode() {
        }
        return CmdCode;
    }());
    /***********           发送的消息              *******/
    CmdCode.REQ_LOGIN = 1201; //本地登录
    CmdCode.REQ_LoginForPlatform = 1205; //网络登录
    CmdCode.REQ_SelectCharacter = 1202; //选择角色
    CmdCode.REQ_CreateCharacter = 1203; //创建角色
    CmdCode.REQ_GLoadFinish = 1204; //登录完成
    /***********           返回的消息              *******/
    CmdCode.ACK_Character = 1101; //玩家角色信息列表
    CmdCode.ACK_LoginSuccess = 1102; //登录成功消息协议
    CmdCode.ACK_LoginFailed = 1106; //登录失败消息协议
    CmdCode.ACK_MyInfo = 2100; //玩家自己信息
    CmdCode.ACK_APersonOpt = 2170;
    game.CmdCode = CmdCode;
    __reflect(CmdCode.prototype, "game.CmdCode");
})(game || (game = {}));
//# sourceMappingURL=CmdCode.js.map