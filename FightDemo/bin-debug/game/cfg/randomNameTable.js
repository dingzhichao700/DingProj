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
    var RandomNameCfg = (function () {
        function RandomNameCfg() {
        }
        return RandomNameCfg;
    }());
    game.RandomNameCfg = RandomNameCfg;
    __reflect(RandomNameCfg.prototype, "game.RandomNameCfg");
    var RandomNameTable = (function (_super) {
        __extends(RandomNameTable, _super);
        function RandomNameTable() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        RandomNameTable.init = function () {
            this.analysis(RES.getRes(game.CfgData.randomName_json));
        };
        return RandomNameTable;
    }(DLG.BaseTable));
    game.RandomNameTable = RandomNameTable;
    __reflect(RandomNameTable.prototype, "game.RandomNameTable");
})(game || (game = {}));
//# sourceMappingURL=randomNameTable.js.map