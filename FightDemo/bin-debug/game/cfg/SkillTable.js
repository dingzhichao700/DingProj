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
    var SkillCfg = (function () {
        function SkillCfg() {
        }
        return SkillCfg;
    }());
    game.SkillCfg = SkillCfg;
    __reflect(SkillCfg.prototype, "game.SkillCfg");
    var SkillTable = (function (_super) {
        __extends(SkillTable, _super);
        function SkillTable() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SkillTable.init = function () {
            this.analysis(game.CfgData.getDataByUrl(game.CfgData.skill_json));
        };
        return SkillTable;
    }(DLG.BaseTable));
    game.SkillTable = SkillTable;
    __reflect(SkillTable.prototype, "game.SkillTable");
})(game || (game = {}));
//# sourceMappingURL=SkillTable.js.map