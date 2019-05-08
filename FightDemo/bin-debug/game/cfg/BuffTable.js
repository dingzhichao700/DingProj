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
    var BuffCfg = (function () {
        function BuffCfg() {
        }
        return BuffCfg;
    }());
    game.BuffCfg = BuffCfg;
    __reflect(BuffCfg.prototype, "game.BuffCfg");
    var BuffTable = (function (_super) {
        __extends(BuffTable, _super);
        function BuffTable() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        BuffTable.init = function () {
            this.analysis(game.CfgData.getDataByUrl(game.CfgData.buff_json));
        };
        return BuffTable;
    }(DLG.BaseTable));
    game.BuffTable = BuffTable;
    __reflect(BuffTable.prototype, "game.BuffTable");
})(game || (game = {}));
//# sourceMappingURL=BuffTable.js.map