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
    var EffectCfg = (function () {
        function EffectCfg() {
        }
        return EffectCfg;
    }());
    game.EffectCfg = EffectCfg;
    __reflect(EffectCfg.prototype, "game.EffectCfg");
    var EffectTable = (function (_super) {
        __extends(EffectTable, _super);
        function EffectTable() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        EffectTable.init = function () {
            this.analysis(game.CfgData.getDataByUrl(game.CfgData.effect_json));
        };
        return EffectTable;
    }(DLG.BaseTable));
    game.EffectTable = EffectTable;
    __reflect(EffectTable.prototype, "game.EffectTable");
})(game || (game = {}));
//# sourceMappingURL=EffectTable.js.map