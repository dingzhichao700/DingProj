var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var BuffData = (function () {
        function BuffData() {
        }
        /**触发buff */
        BuffData.prototype.touch = function () {
            var self = this;
            var target;
            target = game.SceneManager.getInstance().getDriverById(self.mySelfData.id, self.mySelfData.driverType);
            var targetData;
            if (target) {
                targetData = target.getData();
            }
            else {
                targetData = self.mySelfData;
            }
            var attrType;
            if (self.actionType == game.ENUM_BuffEffect.HP) {
                var hp = targetData.attr.getValue(game.Enum_Attr.hp);
                var hpEx = self.getValue(hp);
                targetData.attr.setValue(game.Enum_Attr.hp, hp + hpEx);
                if (target)
                    target.update();
            }
            else if (self.actionType == game.ENUM_BuffEffect.SPEED) {
                var speed = targetData.attr.getValue(game.Enum_Attr.speed);
                var speedex = self.getValue(speed);
                targetData.attr.setValue(game.Enum_Attr.speed, speed + speedex);
            }
            else if (self.actionType == game.ENUM_BuffEffect.CRITIC) {
                attrType = game.Enum_Attr.crit;
            }
            else if (self.actionType == game.ENUM_BuffEffect.PHYSICS_DEF) {
                attrType = game.Enum_Attr.def;
            }
            else if (self.actionType == game.ENUM_BuffEffect.MAGIC_DEF) {
                attrType = game.Enum_Attr.magicdefense;
            }
            else if (self.actionType == game.ENUM_BuffEffect.ATTACK) {
                attrType = game.Enum_Attr.attack;
            }
            else if (self.actionType == game.ENUM_BuffEffect.HIT) {
                attrType = game.Enum_Attr.hit;
            }
            else if (self.actionType == game.ENUM_BuffEffect.ATTACK_SPEED) {
            }
            else if (self.actionType == game.ENUM_BuffEffect.PUTON_BULLET_SPEED) {
                targetData.putOnBulletCDTimeEx = self.getValue(targetData.putOnBulletCDTime);
            }
            else if (self.actionType == game.ENUM_BuffEffect.ATTACK_EXPEND_SPEED) {
                if (targetData.driverType == game.ENUM_DriverType.role) {
                    var expendDoubleBulletRatio = targetData.expendDoubleBulletRatio;
                    var expendDoubleBulletRatioEx = self.getValue(expendDoubleBulletRatio);
                    targetData.expendDoubleBulletRatio = expendDoubleBulletRatioEx;
                }
            }
            else if (self.actionType == game.ENUM_BuffEffect.SWOON) {
                if (targetData.driverType == game.ENUM_DriverType.monster) {
                    if (targetData.isSwoonTime) {
                        if (targetData.isSwoonTime < self.endTime) {
                            targetData.isSwoonTime = self.endTime;
                        }
                    }
                    else {
                        targetData.isSwoonTime = self.endTime;
                    }
                }
            }
            else if (self.actionType == game.ENUM_BuffEffect.HP_MAX) {
                var totalhp = targetData.attr.getValue(game.Enum_Attr.totalHp);
                var addHpEx = self.getValue(totalhp);
                targetData.attr.setValue(game.Enum_Attr.totalHp, totalhp + addHpEx);
                var hp = targetData.attr.getValue(game.Enum_Attr.hp);
                targetData.attr.setValue(game.Enum_Attr.hp, hp + addHpEx);
                if (target)
                    target.update();
            }
            else if (self.actionType == game.ENUM_BuffEffect.MAGIC_HURT_IMMUNE) {
                attrType = game.Enum_Attr.magic_HurtImmune;
            }
            else if (self.actionType == game.ENUM_BuffEffect.PHYSICS_HURT_IMMUNE) {
                attrType = game.Enum_Attr.physics_HurtImmune;
            }
            else if (self.actionType == game.ENUM_BuffEffect.PHYSICS_PUNCTURE) {
                attrType = game.Enum_Attr.physics_puncture;
            }
            else if (self.actionType == game.ENUM_BuffEffect.MAGIC_PUNCTURE) {
                attrType = game.Enum_Attr.magic_puncture;
            }
            if (attrType) {
                var value = targetData.attr.getValue(attrType);
                var valueEx = targetData.buffsAttr.getValue(attrType);
                if (valueEx == undefined) {
                    valueEx = 0;
                }
                self.resultValue = self.getValue(value);
                targetData.buffsAttr.setValue(attrType, valueEx + self.resultValue);
            }
        };
        BuffData.prototype.cancelBuff = function () {
            var self = this;
            var target;
            target = game.SceneManager.getInstance().getDriverById(self.mySelfData.id, self.mySelfData.driverType);
            var targetData;
            if (target) {
                targetData = target.getData();
            }
            else {
                targetData = self.mySelfData;
            }
            var attrType;
            if (self.actionType == game.ENUM_BuffEffect.HP) {
            }
            else if (self.actionType == game.ENUM_BuffEffect.SPEED) {
            }
            else if (self.actionType == game.ENUM_BuffEffect.CRITIC) {
                attrType = game.Enum_Attr.crit;
            }
            else if (self.actionType == game.ENUM_BuffEffect.PHYSICS_DEF) {
                attrType = game.Enum_Attr.def;
            }
            else if (self.actionType == game.ENUM_BuffEffect.MAGIC_DEF) {
                attrType = game.Enum_Attr.magicdefense;
            }
            else if (self.actionType == game.ENUM_BuffEffect.ATTACK) {
                attrType = game.Enum_Attr.attack;
            }
            else if (self.actionType == game.ENUM_BuffEffect.HIT) {
                attrType = game.Enum_Attr.hit;
            }
            else if (self.actionType == game.ENUM_BuffEffect.ATTACK_SPEED) {
            }
            else if (self.actionType == game.ENUM_BuffEffect.PUTON_BULLET_SPEED) {
                targetData.putOnBulletCDTimeEx = 0;
            }
            else if (self.actionType == game.ENUM_BuffEffect.ATTACK_EXPEND_SPEED) {
                targetData.expendDoubleBulletRatio = 0;
            }
            else if (self.actionType == game.ENUM_BuffEffect.SWOON) {
            }
            else if (self.actionType == game.ENUM_BuffEffect.HP_MAX) {
            }
            else if (self.actionType == game.ENUM_BuffEffect.MAGIC_HURT_IMMUNE) {
                attrType = game.Enum_Attr.magic_HurtImmune;
            }
            else if (self.actionType == game.ENUM_BuffEffect.PHYSICS_HURT_IMMUNE) {
                attrType = game.Enum_Attr.physics_HurtImmune;
            }
            else if (self.actionType == game.ENUM_BuffEffect.PHYSICS_PUNCTURE) {
                attrType = game.Enum_Attr.physics_puncture;
            }
            else if (self.actionType == game.ENUM_BuffEffect.MAGIC_PUNCTURE) {
                attrType = game.Enum_Attr.magic_puncture;
            }
            if (attrType) {
                var valueEx = targetData.buffsAttr.getValue(attrType);
                if (valueEx == undefined) {
                    return;
                }
                targetData.buffsAttr.setValue(attrType, valueEx - self.resultValue);
            }
        };
        BuffData.prototype.getValue = function (value, float) {
            if (float === void 0) { float = 0; }
            var v = 0;
            var self = this;
            if (isNaN(self.buf_attack_num) == false && self.buf_attack_num != 0) {
                v = self.buf_attack_num;
            }
            else if (isNaN(self.buf_attack_per) == false && self.buf_attack_per != 0) {
                v = self.buf_attack_per / 10000 * value;
            }
            if (float == 0) {
                return Math.floor(v);
            }
            return v;
        };
        BuffData.prototype.clear = function () {
            var self = this;
            // self.id = BuffData.ID;
            // BuffData.ID++;
            // if (BuffData.ID == Number.MAX_VALUE)
            // {
            // 	BuffData.ID = Number.MIN_VALUE;
            // }
            // self.activeTime = undefined;
            self.endTime = undefined;
            self.nextTouchTime = undefined;
            self.effect = undefined;
            // self.target = undefined;
            // self.targetRang = undefined;
            self.actionType = undefined;
            self.trigger = undefined;
            // self.activeTime = undefined;
            self.buf_attack_num = undefined;
            self.buf_attack_per = undefined;
            self.resultValue = undefined;
            // self.targetData = undefined;
            self.mySelfData = undefined;
        };
        BuffData.getBuffData = function () {
            if (BuffData._pool.length > 0) {
                return BuffData._pool.shift();
            }
            var buff = new BuffData();
            buff.id = BuffData.ID;
            BuffData.ID++;
            if (BuffData.ID == Number.MAX_VALUE) {
                BuffData.ID = Number.MIN_VALUE;
            }
            return buff;
        };
        BuffData.returnBuffData = function (buff) {
            buff.clear();
            BuffData._pool.push(buff);
        };
        return BuffData;
    }());
    /**自增id*/
    BuffData.ID = 0;
    BuffData._pool = [];
    game.BuffData = BuffData;
    __reflect(BuffData.prototype, "game.BuffData");
})(game || (game = {}));
//# sourceMappingURL=BuffData.js.map