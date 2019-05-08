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
    var LanCfg = (function () {
        function LanCfg() {
        }
        return LanCfg;
    }());
    game.LanCfg = LanCfg;
    __reflect(LanCfg.prototype, "game.LanCfg");
    var LanTable = (function (_super) {
        __extends(LanTable, _super);
        function LanTable() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        LanTable.init = function () {
            this.analysis(game.CfgData.getDataByUrl(game.CfgData.lan_json));
        };
        return LanTable;
    }(DLG.BaseTable));
    game.LanTable = LanTable;
    __reflect(LanTable.prototype, "game.LanTable");
})(game || (game = {}));
//# sourceMappingURL=LanTable.js.map