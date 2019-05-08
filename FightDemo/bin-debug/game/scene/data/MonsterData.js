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
    var MonsterData = (function (_super) {
        __extends(MonsterData, _super);
        function MonsterData() {
            return _super.call(this) || this;
        }
        MonsterData.prototype.clear = function () {
            _super.prototype.clear.call(this);
            var self = this;
            self.byAttackRangeW = undefined;
            self.byAttackRangeH = undefined;
            self.byAttackRangeY = undefined;
            self.isBoss = undefined;
            self.monsterCfgId = undefined;
            self.targetY = undefined;
            self.isSwoonTime = undefined;
        };
        return MonsterData;
    }(game.DriverData));
    game.MonsterData = MonsterData;
    __reflect(MonsterData.prototype, "game.MonsterData");
})(game || (game = {}));
//# sourceMappingURL=MonsterData.js.map