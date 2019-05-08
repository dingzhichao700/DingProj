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
    var BulletData = (function (_super) {
        __extends(BulletData, _super);
        function BulletData() {
            return _super.call(this) || this;
        }
        BulletData.prototype.clone = function (bullet) {
            var self = this;
            bullet.masterId = self.masterId;
            bullet.job = self.job;
            bullet.rotateMove = self.rotateMove;
            bullet.moveAttackRange = self.moveAttackRange;
            bullet.hittedEnlargeRange = self.hittedEnlargeRange;
            bullet.effect = self.effect;
            bullet.rotation = self.rotation;
            bullet.hitTargetIds = self.hitTargetIds;
            bullet.luckHurtExRationMin = self.luckHurtExRationMin;
            bullet.luckHurtExRationkMax = self.luckHurtExRationkMax;
            bullet.farHurtExRatio = self.farHurtExRatio;
            bullet.shortHurtExRatio = self.shortHurtExRatio;
            bullet.anshaRatio = self.anshaRatio;
            bullet.anshaHurtExRatio = self.anshaHurtExRatio;
            bullet.anshaLiSkillId = self.anshaLiSkillId;
            bullet.firstHurtExValue = self.firstHurtExValue;
            bullet.mengDuHurtValueExRatio = self.mengDuHurtValueExRatio;
            bullet.bigWeaponHurtRatio = self.bigWeaponHurtRatio;
            bullet.forceSwoonRatio = self.forceSwoonRatio;
            bullet.swoonHurtExRatio = self.swoonHurtExRatio;
            bullet.baoFaHurtRatio = self.baoFaHurtRatio;
            bullet.hpHurtExValueRatio = self.hpHurtExValueRatio;
            bullet.skillHurtDamage = self.skillHurtDamage;
            bullet.bulletdamage = self.bulletdamage;
        };
        BulletData.prototype.clear = function () {
            _super.prototype.clear.call(this);
            var self = this;
            self.masterId = undefined;
            // self.attack = undefined;
            // self.crit = undefined;
            // self.tenacity = undefined;
            self.rotation = undefined;
            self.rotateMove = undefined;
            if (self.hitTargetIds && self.hitTargetIds.length > 0) {
                self.hitTargetIds.length = 0;
            }
            self.hitTargetIds = undefined;
            self.isPierce = false;
            self.pierceMaxNum = undefined;
            self.moveAttackRange = 0;
            self.hittedEnlargeRange = 0;
            self.effect = undefined;
            // self.additionalper = undefined;
            // self.additionnum = undefined;
        };
        return BulletData;
    }(game.DriverData));
    game.BulletData = BulletData;
    __reflect(BulletData.prototype, "game.BulletData");
})(game || (game = {}));
//# sourceMappingURL=BulletData.js.map