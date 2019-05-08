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
    var DamageAction = (function (_super) {
        __extends(DamageAction, _super);
        function DamageAction() {
            var _this = _super.call(this) || this;
            _this.isShowLog = false;
            var self = _this;
            self.m_sceneMar = game.SceneManager.getInstance();
            self.createClock();
            var g_value = game.GlobalTable.getCfgById(game.ENUM_GLOBAL_ID.G_10001).valueStr.split("|");
            self.hurtDeepMin = parseInt(g_value[0]);
            self.hurtDeepMax = parseInt(g_value[1]);
            g_value = game.GlobalTable.getCfgById(game.ENUM_GLOBAL_ID.G_10002).valueStr.split("|");
            self.hurtImmuneMin = parseInt(g_value[0]);
            self.hurtImmuneMax = parseInt(g_value[1]);
            g_value = game.GlobalTable.getCfgById(game.ENUM_GLOBAL_ID.G_10003).valueStr.split("|");
            self.critDamageMin = parseInt(g_value[0]);
            self.critDamageMax = parseInt(g_value[1]);
            g_value = game.GlobalTable.getCfgById(game.ENUM_GLOBAL_ID.G_10004).valueStr.split("|");
            self.critRatioMin = parseInt(g_value[0]);
            self.critRatioMax = parseInt(g_value[1]);
            return _this;
        }
        /** 子弹打怪 */
        DamageAction.prototype.damageBulletAttack = function (bulletData, monster) {
            var self = this;
            var utils = DLG.Utils;
            var hurtData = game.HurtData.getHurtData();
            var monsterData = monster.getData();
            var bulletAtt = bulletData.attr;
            var monsterAttr = monsterData.attr;
            var hurtExRatio = 0;
            var hurtExValue = 0;
            if (bulletData.luckHurtExRationMin && bulletData.luckHurtExRationkMax) {
                var add = utils.random(bulletData.luckHurtExRationMin, bulletData.luckHurtExRationkMax);
                hurtExRatio += add;
                hurtData.luckHurt = true;
                if (self.isShowLog)
                    debug('幸运一击伤害加成' + add);
            }
            if (bulletData.farHurtExRatio) {
                var add = (game.SceneData.boundary - monsterData.y) / game.SceneData.boundary * bulletData.farHurtExRatio;
                if (add < 0) {
                    add = 0;
                }
                if (add > bulletData.farHurtExRatio) {
                    add = bulletData.farHurtExRatio;
                }
                hurtExRatio += add;
                hurtData.farHurt = true;
                if (self.isShowLog)
                    debug('远距离攻击伤害加成' + add);
            }
            if (bulletData.shortHurtExRatio) {
                var add = (1 - (game.SceneData.boundary - monsterData.y) / game.SceneData.boundary) * bulletData.shortHurtExRatio;
                if (add < 0) {
                    add = 0;
                }
                if (add > bulletData.shortHurtExRatio) {
                    add = bulletData.shortHurtExRatio;
                }
                hurtExRatio += add;
                hurtData.shortHurt = true;
                if (self.isShowLog)
                    debug('近距离攻击伤害加成' + add);
            }
            if (bulletData.anshaRatio && Math.random() * 10000 <= bulletData.anshaRatio) {
                var add = bulletData.anshaHurtExRatio;
                hurtExRatio += add;
                hurtData.anShi = true;
                if (self.isShowLog)
                    debug('暗杀伤害加成' + add);
                if (bulletData.anshaLiSkillId) {
                }
            }
            if (bulletData.firstHurtExValue) {
                var add = bulletData.firstHurtExValue;
                hurtExRatio += add;
                hurtData.firstHurt = true;
                if (self.isShowLog)
                    debug('先发制人伤害加成' + add);
            }
            if (bulletData.bigWeaponHurtRatio) {
                var add = bulletData.bigWeaponHurtRatio;
                hurtExRatio += add;
                hurtData.bigWeaponHurt = true;
                if (self.isShowLog)
                    debug('巨型武器伤害加成' + add);
            }
            if (bulletData.mengDuHurtValueExRatio) {
                var add = monsterAttr.getValue(game.Enum_Attr.hp) * bulletData.mengDuHurtValueExRatio;
                hurtExRatio += add;
                hurtData.mengDu = true;
                if (self.isShowLog)
                    debug('猛毒伤害加成' + add);
            }
            if (bulletData.forceSwoonRatio && Math.random() * 10000 <= bulletData.forceSwoonRatio) {
                //强打眩晕
                // monsterData.isSwoonTime = self.m_clock.getTime() + 3000;
                hurtData.forceSwoon = true;
                var buff = game.BuffManager.getInstance().onAddBuffToTargetData(monsterData, 11101, 3000, 0, 0);
                buff.touch();
                if (self.isShowLog)
                    debug('强打眩晕---');
            }
            if (monsterData.isSwoonTime && bulletData.swoonHurtExRatio) {
                var add = bulletData.swoonHurtExRatio;
                hurtExRatio += add;
                hurtData.swoonHurt = true;
                if (self.isShowLog)
                    debug('眩晕 伤害加成' + add);
            }
            //当前的失去血的比例
            var loseBloodRatio;
            if (bulletData.hpHurtExValueRatio) {
                loseBloodRatio = (monsterAttr.getValue(game.Enum_Attr.hp) - monsterAttr.getValue(game.Enum_Attr.totalHp)) / monsterAttr.getValue(game.Enum_Attr.totalHp);
            }
            if (self.isShowLog)
                debug('-----------开始计算伤害--------');
            //伤害计算
            self.hurtValue(hurtData, bulletData.job, bulletAtt, monsterAttr, monsterData.buffsAttr, hurtExRatio, hurtExValue, 0, bulletData.skillHurtDamage, bulletData.bulletdamage);
            if (self.isShowLog)
                debug('-----------伤害结果', hurtData.hurt);
            if (bulletData.hpHurtExValueRatio) {
                //根据敌人失去的体力，计算额外伤害
                var hurtHpEx = hurtData.hurt * (1 + loseBloodRatio * (bulletData.hpHurtExValueRatio / 10000));
                hurtData.hurt = hurtData.hurt + hurtHpEx;
                if (self.isShowLog)
                    debug('-----------失去体力额外伤害', hurtHpEx);
                if (self.isShowLog)
                    debug('-----------伤害结果', hurtData.hurt);
            }
            if (bulletData.isMolotov) {
                //火焰弹
                if (self.isShowLog)
                    debug('触发火焰弹');
                var otherTargets = self.m_sceneMar.getNearRangeDriverByType(monsterData.driverType, 150, monsterData.x, monsterData.y);
                var i = 0;
                var len = otherTargets.length;
                for (i = 0; i < len; i++) {
                    var otherMonster = otherTargets[i];
                    var data = otherMonster.getData();
                    if (data && data.attr.getValue(game.Enum_Attr.hp) > 0) {
                        var otherBulletData = self.m_sceneMar.createDriverData(game.ENUM_DriverType.bullet);
                        bulletData.clone(otherBulletData);
                        otherBulletData.isMolotov = undefined;
                        // otherBulletData.skillHurtDamage = bulletData.baoFaHurtRatio / 10000;
                        self.damageBulletAttack(otherBulletData, otherMonster);
                    }
                }
            }
            if (bulletData.isFlamer) {
                //火焰枪
                if (self.isShowLog)
                    debug('触发火焰枪');
                var otherTargets = self.m_sceneMar.getNearRangeDriverByType(monsterData.driverType, 40, monsterData.x, monsterData.y, 60);
                var i = 0;
                var len = otherTargets.length;
                for (i = 0; i < len; i++) {
                    var otherMonster = otherTargets[i];
                    var data = otherMonster.getData();
                    if (data && data.attr.getValue(game.Enum_Attr.hp) > 0) {
                        var otherBulletData = self.m_sceneMar.createDriverData(game.ENUM_DriverType.bullet);
                        bulletData.clone(otherBulletData);
                        otherBulletData.isFlamer = undefined;
                        // otherBulletData.skillHurtDamage = bulletData.baoFaHurtRatio / 10000;
                        self.damageBulletAttack(otherBulletData, otherMonster);
                    }
                }
            }
            var hp = monsterAttr.getValue(game.Enum_Attr.hp);
            hp += hurtData.hurt;
            if (hp <= 0) {
                hp = 0;
                //如果死亡，则判断有没有死亡发动的buff
                game.BuffManager.getInstance().onActionTargetBuff(bulletData, game.Enum_BuffTrigger.die);
                if (bulletData.baoFaHurtRatio) {
                    //灵魂爆发：对周围造成x%的伤害
                    if (self.isShowLog)
                        debug('触发灵魂爆发');
                    var otherTargets = self.m_sceneMar.getNearRangeDriverByType(monsterData.driverType, 150, monsterData.x, monsterData.y);
                    var i = 0;
                    var len = otherTargets.length;
                    for (i = 0; i < len; i++) {
                        var otherMonster = otherTargets[i];
                        var data = otherMonster.getData();
                        if (data && data.attr.getValue(game.Enum_Attr.hp) > 0) {
                            var otherBulletData = self.m_sceneMar.createDriverData(game.ENUM_DriverType.bullet);
                            bulletData.clone(otherBulletData);
                            otherBulletData.baoFaHurtRatio = undefined;
                            otherBulletData.skillHurtDamage = bulletData.baoFaHurtRatio / 10000;
                            self.damageBulletAttack(otherBulletData, otherMonster);
                        }
                    }
                }
            }
            if (self.isShowLog)
                debug('==========================一次伤害结算完毕');
            self.playHurtResult(monster, hurtData, bulletData.effect);
            game.HurtData.returnHurtData(hurtData);
        };
        /**处理伤害表现效果与属性更新  */
        DamageAction.prototype.playHurtResult = function (monster, hurtData, effectid) {
            var self = this;
            var monsterData = monster.getData();
            var monsterAttr = monsterData.attr;
            var hp = monsterAttr.getValue(game.Enum_Attr.hp);
            hp += hurtData.hurt;
            monsterAttr.setValue(game.Enum_Attr.hp, hp);
            monster.showHpBar(true);
            monster.update();
            self.showBlood(self.m_sceneMar.getEffectLayer(), monsterData.x, monsterData.y + monsterData.byAttackRangeY, hurtData.hurt);
            monster.showEffect(effectid);
            monster.showHitEffect();
        };
        /**伤害计算 */
        DamageAction.prototype.hurtValue = function (hurt, job, attrdata, monsterAttr, monsterBuffAttr, attackExRatio, attackExValue, hurtDeep, skillHurtDamage, bulletdamage) {
            var self = this;
            //attackExRatio  传过来的是万分比。
            // 普攻伤害=（（基础攻击*（1+∑攻击百分比加成）+∑固定值加成）-（怪物防御*（1+∑怪物防御百分比加成）+∑怪物防御固定值加成-破甲攻击））*（1+伤害加深）*（1-怪物免伤）
            // 暴击伤害=（（基础攻击*（1+∑攻击百分比加成）+∑固定值加成）-（怪物防御*（1+∑怪物防御百分比加成）+∑怪物防御固定值加成-破甲攻击））*（1+伤害加深）*（1-怪物免伤）*暴击伤害百分比
            var def;
            /** 破甲*/
            var puncture;
            /**怪物免伤 */
            var hurtImmune;
            if (job == game.ENUM_JOB_TYPE.JOB_WS) {
                //魔法系
                def = monsterAttr.getValue(game.Enum_Attr.magicdefense) + monsterBuffAttr.getValue(game.Enum_Attr.magicdefense);
                hurtImmune = monsterBuffAttr.getValue(game.Enum_Attr.magic_HurtImmune);
                puncture = attrdata.getValue(game.Enum_Attr.magic_puncture);
            }
            else {
                def = monsterAttr.getValue(game.Enum_Attr.def) + monsterBuffAttr.getValue(game.Enum_Attr.def);
                hurtImmune = monsterBuffAttr.getValue(game.Enum_Attr.physics_HurtImmune);
                puncture = attrdata.getValue(game.Enum_Attr.physics_puncture);
            }
            var attack = attrdata.getValue(game.Enum_Attr.attack);
            var utils = DLG.Utils;
            var value;
            hurtDeep = hurtDeep / 10000;
            if (self.isShowLog) {
                debug('-----------实质伤害加深', hurtDeep);
            }
            if (hurtDeep < self.hurtDeepMin)
                hurtDeep = self.hurtDeepMin;
            else if (hurtDeep > self.hurtDeepMax)
                hurtDeep = self.hurtDeepMax;
            hurtDeep = 1 + hurtDeep;
            hurtImmune = hurtImmune / 10000;
            if (self.isShowLog)
                debug('-----------实质怪物免伤', hurtImmune);
            if (hurtImmune < self.hurtImmuneMin)
                hurtImmune = self.hurtImmuneMin;
            else if (hurtImmune > self.hurtImmuneMax)
                hurtImmune = self.hurtImmuneMax;
            hurtImmune = 1 - hurtImmune;
            var attackvalue = attack * (1 + attackExRatio / 10000) + attackExValue;
            var defValue = def - puncture;
            if (self.isShowLog) {
                debug('-----------攻：' + attack + '----攻击加成比：' + attackExRatio + '----攻击加成值：' + attackExValue);
                debug('-----------防：' + def + '----破甲：' + puncture);
            }
            value = (attackvalue - defValue) * hurtDeep * hurtImmune;
            if (self.isShowLog)
                debug('-----------伤害值', -value);
            var critRatio = attrdata.getValue(game.Enum_Attr.crit);
            if (self.isShowLog)
                debug('-----------实质暴击率', critRatio / 10000);
            if (critRatio < self.critRatioMin)
                critRatio = self.critRatioMin;
            else if (critRatio > self.critRatioMax)
                critRatio = self.critRatioMax;
            var resistRatio = monsterAttr.getValue(game.Enum_Attr.resistcrit);
            critRatio = (critRatio - resistRatio) / 10000;
            if (critRatio && Math.random() * 10000 < critRatio) {
                var critdamage = attrdata.getValue(game.Enum_Attr.critDamage);
                if (self.isShowLog)
                    debug('-----------实质暴击伤害倍数', critdamage / 10000);
                if (critdamage < self.critDamageMin)
                    critdamage = self.critDamageMin;
                else if (critdamage > self.critDamageMax)
                    critdamage = self.critDamageMax;
                var resistdamage = monsterAttr.getValue(game.Enum_Attr.resistdamage);
                critdamage = (critdamage - resistdamage) / 10000;
                value = value * (1.5 - critdamage);
                if (self.isShowLog)
                    debug('-----------暴击后的伤害值', -value);
                hurt.isCrit = true;
            }
            //真实伤害=理论伤害*技能伤害系数*子弹伤害系数*rand[0.95,1.05]
            value = value * skillHurtDamage * bulletdamage * (utils.random(95, 105) / 100);
            if (self.isShowLog)
                debug('-----------技能伤害系数', skillHurtDamage);
            if (self.isShowLog)
                debug('-----------子弹伤害系数', bulletdamage);
            hurt.hurt = -Math.floor(value);
            if (self.isShowLog)
                debug('-----------真实伤害值', value);
        };
        /**   怪攻击基地*/
        DamageAction.prototype.damageMonsterAttack = function (monster, monsterNotHit) {
            var monsterData = monster.getData();
            var hit = monsterData.attr.getValue(game.Enum_Attr.hit);
            var buffHit = monsterData.buffsAttr.getValue(game.Enum_Attr.hit);
            if (buffHit) {
                hit += buffHit;
            }
            hit -= monsterNotHit;
            if (Math.random() * 10000 < hit) {
                var attack = monsterData.attr.getValue(game.Enum_Attr.attack);
                attack += monsterData.buffsAttr.getValue(game.Enum_Attr.attack);
            }
        };
        DamageAction.prototype.showBlood = function (_layer, x, y, value) {
            var self = this;
            var font = game.FontBlood.createFontBlood();
            font.x = x;
            font.y = y;
            _layer.addChild(font);
            font.setNum(value);
        };
        return DamageAction;
    }(DLG.BaseAction));
    game.DamageAction = DamageAction;
    __reflect(DamageAction.prototype, "game.DamageAction");
})(game || (game = {}));
//# sourceMappingURL=DamageAction.js.map