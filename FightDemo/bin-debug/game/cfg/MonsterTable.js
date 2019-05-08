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
    var MonsterCfg = (function () {
        function MonsterCfg() {
        }
        return MonsterCfg;
    }());
    game.MonsterCfg = MonsterCfg;
    __reflect(MonsterCfg.prototype, "game.MonsterCfg");
    var MonsterTable = (function (_super) {
        __extends(MonsterTable, _super);
        function MonsterTable() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MonsterTable.init = function () {
            this.analysis(game.CfgData.getDataByUrl(game.CfgData.monster_json));
        };
        return MonsterTable;
    }(DLG.BaseTable));
    game.MonsterTable = MonsterTable;
    __reflect(MonsterTable.prototype, "game.MonsterTable");
})(game || (game = {}));
//# sourceMappingURL=MonsterTable.js.map