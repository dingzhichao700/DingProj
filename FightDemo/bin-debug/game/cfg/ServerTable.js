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
    var ServerCfg = (function () {
        function ServerCfg() {
        }
        return ServerCfg;
    }());
    game.ServerCfg = ServerCfg;
    __reflect(ServerCfg.prototype, "game.ServerCfg");
    var ServerTable = (function (_super) {
        __extends(ServerTable, _super);
        function ServerTable() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ServerTable.init = function () {
            this.analysis(RES.getRes(game.CfgData.server_json));
        };
        return ServerTable;
    }(DLG.BaseTable));
    game.ServerTable = ServerTable;
    __reflect(ServerTable.prototype, "game.ServerTable");
})(game || (game = {}));
//# sourceMappingURL=ServerTable.js.map