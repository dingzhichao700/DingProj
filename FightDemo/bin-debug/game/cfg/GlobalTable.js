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
    var ENUM_GLOBAL_ID;
    (function (ENUM_GLOBAL_ID) {
        /**伤害加深区间  下限|上限 */
        ENUM_GLOBAL_ID[ENUM_GLOBAL_ID["G_10001"] = 10001] = "G_10001";
        /**怪物伤害减免区间  下限|上限 */
        ENUM_GLOBAL_ID[ENUM_GLOBAL_ID["G_10002"] = 10002] = "G_10002";
        /**暴击倍数区间  下限|上限 */
        ENUM_GLOBAL_ID[ENUM_GLOBAL_ID["G_10003"] = 10003] = "G_10003";
        /**暴击几率区间  下限|上限  */
        ENUM_GLOBAL_ID[ENUM_GLOBAL_ID["G_10004"] = 10004] = "G_10004";
    })(ENUM_GLOBAL_ID = game.ENUM_GLOBAL_ID || (game.ENUM_GLOBAL_ID = {}));
    var GlobalCfg = (function () {
        function GlobalCfg() {
        }
        return GlobalCfg;
    }());
    game.GlobalCfg = GlobalCfg;
    __reflect(GlobalCfg.prototype, "game.GlobalCfg");
    var GlobalTable = (function (_super) {
        __extends(GlobalTable, _super);
        function GlobalTable() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        GlobalTable.init = function () {
            this.analysis(game.CfgData.getDataByUrl(game.CfgData.global_json));
        };
        return GlobalTable;
    }(DLG.BaseTable));
    game.GlobalTable = GlobalTable;
    __reflect(GlobalTable.prototype, "game.GlobalTable");
})(game || (game = {}));
//# sourceMappingURL=GlobalTable.js.map