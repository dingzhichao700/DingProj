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
    var UseSkillAction = (function (_super) {
        __extends(UseSkillAction, _super);
        function UseSkillAction() {
            var _this = _super.call(this) || this;
            var self = _this;
            self.createClock();
            self.m_sceneMar = game.SceneManager.getInstance();
            self._damageAction = DLG.FactoryUtils.getClass(game.DamageAction);
            return _this;
        }
        /**无影剑 */
        UseSkillAction.prototype.bigSkillWuYingJian = function (driverData, skillHurtDamage, effectId) {
            var self = this;
            self.wuYingJianCount--;
            if (self.wuYingJianCount <= 0) {
                if (self.wuYingJianTimeId) {
                    self.m_clock.removeTime(self.wuYingJianTimeId);
                    self.wuYingJianTimeId = undefined;
                }
                return;
            }
            else {
                if (self.wuYingJianTimeId == undefined) {
                    self.wuYingJianTimeId = self.m_clock.addTime(100, 0, self.bigSkillWuYingJian, self, [driverData, skillHurtDamage, effectId], true);
                }
            }
            var monsterArr = self.m_sceneMar.getAllMonster().concat();
            var monster;
            var redo = true;
            while (redo && monsterArr.length > 0) {
                var index = DLG.Utils.random(0, monsterArr.length - 1);
                var id = monsterArr[index];
                monster = self.m_sceneMar.getDriverById(id, game.ENUM_DriverType.monster);
                var monsterData = monster.getData();
                if (monsterData.attr.getValue(game.Enum_Attr.hp) > 0) {
                    redo = false;
                    self.wuYingJianCount--;
                    var hurtData = game.HurtData.getHurtData();
                    var damageAction = DLG.FactoryUtils.getClass(game.DamageAction);
                    damageAction.hurtValue(hurtData, driverData.job, driverData.attr, monsterData.attr, monsterData.buffsAttr, 0, 0, 0, skillHurtDamage, 1);
                    damageAction.playHurtResult(monster, hurtData, effectId);
                    game.HurtData.returnHurtData(hurtData);
                }
                else {
                    monsterArr.splice(index, 1);
                    if (monsterArr.length <= 0) {
                        self.wuYingJianCount = 0;
                        redo = false;
                    }
                }
            }
            monsterArr.length = 0;
            monsterArr = null;
        };
        /**剑雨 */
        UseSkillAction.prototype.bigSkillJianRain = function (driverData, count, skillHurtDamage) {
            var self = this;
            self.swordRainCount = count;
            var ncount;
            if (self.swordRainCount > 5) {
                ncount = 5;
                self.swordRainCount -= 5;
            }
            else {
                ncount = self.swordRainCount;
                self.swordRainCount = 0;
            }
            self.createWwordRain(driverData, ncount, skillHurtDamage);
        };
        UseSkillAction.prototype.createWwordRain = function (driverData, count, skillHurtDamage) {
            var self = this;
            var skillCfg = game.SkillTable.getCfgById(game.SkillType.JOB_GJS_11002);
            var bulletId = skillCfg.bullet;
            bulletId = 10001;
            var bulletCfg = game.BulletTable.getCfgById(bulletId);
            var tmpPointArr = game.SceneData.roleStandPoint;
            var i = 0;
            var len = count > tmpPointArr.length ? tmpPointArr.length : count;
            for (i = 0; i < len; i++) {
                var px = DLG.Utils.random(-40, 40);
                self.addBullet(driverData, 1, 0, bulletCfg, false, false, skillHurtDamage, tmpPointArr[Math.floor(i)] + px, driverData.y);
            }
            if (self.swordRainCount > 0) {
                var ncount = void 0;
                if (self.swordRainCount > 5) {
                    ncount = 5;
                    self.swordRainCount -= 5;
                }
                else {
                    ncount = self.swordRainCount;
                    self.swordRainCount = 0;
                }
                self.m_clock.addTime(100, 1, self.createWwordRain, self, [driverData, ncount, skillHurtDamage], true);
            }
        };
        /**呐喊 */
        UseSkillAction.prototype.bigSkillNahan = function (time, skillHurtDamage) {
            var self = this;
            var roleArr = self.m_sceneMar.getAllRoles();
            var len;
            len = roleArr.length;
            var i;
            for (i; i < len; i++) {
                var role = self.m_sceneMar.getDriverById(roleArr[i], game.ENUM_DriverType.role);
                if (!role)
                    continue;
                var roleData = role.getData();
                var buff = game.BuffManager.getInstance().onAddBuffToTargetData(roleData, 1028, 6000, 0, skillHurtDamage);
                buff.touch();
            }
        };
        /**冲击波  */
        UseSkillAction.prototype.bigSkillChongJiBo = function (time) {
            var self = this;
            var monsterArr = self.m_sceneMar.getAllMonster();
            var monster;
            var i = 0;
            var len = monsterArr.length;
            for (i = 0; i < len; i++) {
                monster = self.m_sceneMar.getDriverById(monsterArr[i], game.ENUM_DriverType.monster);
                if (!monster)
                    continue;
                var monsterData = monster.getData();
                if (monsterData.attr.getValue(game.Enum_Attr.hp) > 0) {
                    var buff = game.BuffManager.getInstance().onAddBuffToTargetData(monsterData, 11101, 6000, 0, 0);
                    buff.touch();
                }
            }
        };
        /**暴风雪 */
        UseSkillAction.prototype.bigSkillBaoFeng = function (driverData, skillHurtDamage, effectId) {
            var self = this;
            var monsterArr = self.m_sceneMar.getAllMonster();
            var monster;
            var i = 0;
            var len = monsterArr.length;
            for (i = 0; i < len; i++) {
                monster = self.m_sceneMar.getDriverById(monsterArr[i], game.ENUM_DriverType.monster);
                if (!monster)
                    continue;
                var monsterData = monster.getData();
                if (monsterData.attr.getValue(game.Enum_Attr.hp) > 0) {
                    var hurtData = game.HurtData.getHurtData();
                    var damageAction = DLG.FactoryUtils.getClass(game.DamageAction);
                    damageAction.hurtValue(hurtData, driverData.job, driverData.attr, monsterData.attr, monsterData.buffsAttr, 0, 0, 0, skillHurtDamage, 1);
                    damageAction.playHurtResult(monster, hurtData, effectId);
                    game.HurtData.returnHurtData(hurtData);
                }
            }
        };
        UseSkillAction.prototype.onPutOnBullet = function (driverdata) {
            driverdata.bulletCurrent = driverdata.bulletCountMax;
        };
        /**产生子弹 */
        UseSkillAction.prototype.createBullet = function (driverdata, bulletId) {
            var self = this;
            if (driverdata.expendDoubleBulletRatio) {
                if (Math.random() * 1000 < driverdata.expendDoubleBulletRatio) {
                    driverdata.bulletCurrent -= 2;
                }
                else {
                    driverdata.bulletCurrent--;
                }
            }
            else {
                driverdata.bulletCurrent--;
            }
            //todo  更新界面上的子弹显示
            if (driverdata.bulletCurrent == 0) {
                //是否可以快速装弹
                if (Math.random() < game.HeroManager.getInstance().getQuickPutOnBullet()) {
                    self.onPutOnBullet(driverdata);
                }
                else {
                    var p_time = driverdata.putOnBulletCDTime;
                    p_time += driverdata.putOnBulletCDTimeEx;
                    self.m_clock.addTime(p_time, 1, self.onPutOnBullet, self, driverdata);
                }
            }
            if (driverdata.job == game.ENUM_JOB_TYPE.job_ZS) {
                var bulletCfg = game.BulletTable.getCfgById(bulletId);
                var angle = Math.atan2(driverdata.y - driverdata.attackPy, driverdata.x - driverdata.attackPx) * 180 / Math.PI - 90;
                var b_ratio = Math.random() * 10000;
                var doubleTimes = 1;
                if (b_ratio > driverdata.doubleRatio) {
                    doubleTimes = 2;
                }
                var isBigWeapon = false;
                var b_count = 1;
                if (driverdata.bigWeaponHaveTimes) {
                    //巨型武器
                    bulletId = 13002;
                    isBigWeapon = true;
                    driverdata.bigWeaponHaveTimes--;
                }
                else {
                    if (driverdata.skills.indexOf(game.SkillType.JOB_ZS_10010) != -1) {
                        var r = Math.random() * 10000;
                        if (r < driverdata.bigWeaponRatio) {
                            //巨型武器
                            bulletId = 13002;
                            isBigWeapon = true;
                        }
                    }
                }
                var i = 0;
                var len = doubleTimes;
                for (i = 0; i < len; i++) {
                    var b_count_1 = 1;
                    var r = Math.random() * 10000;
                    var threeRatio = driverdata.canThreeRatio;
                    if (r < threeRatio) {
                        b_count_1 = 3;
                    }
                    if (i == 0) {
                        self.addBullet(driverdata, b_count_1, angle, bulletCfg, false, isBigWeapon);
                    }
                    else {
                        self.m_clock.addTime(50 * i, 1, self.addBullet, self, [driverdata, b_count_1, angle, bulletCfg, false, isBigWeapon], true);
                    }
                }
            }
            else if (driverdata.job == game.ENUM_JOB_TYPE.JOB_GJS) {
                var bulletCfg = game.BulletTable.getCfgById(bulletId);
                var angle = Math.atan2(driverdata.y - driverdata.attackPy, driverdata.x - driverdata.attackPx) * 180 / Math.PI - 90;
                var b_count = 1;
                if (driverdata.infiniteArrowTimes) {
                    driverdata.infiniteArrowTimes--;
                    b_count = 3;
                }
                else {
                    var r = Math.random() * 10000;
                    var threeRatio = driverdata.canThreeRatio;
                    var fiveRatio = driverdata.canFiveRatio;
                    if (r < fiveRatio) {
                        b_count = 5;
                    }
                    else {
                        r = Math.random() * 10000;
                        if (r < threeRatio) {
                            b_count = 3;
                        }
                    }
                }
                self.addBullet(driverdata, b_count, angle, bulletCfg);
            }
            else if (driverdata.job == game.ENUM_JOB_TYPE.JOB_CK) {
                var bulletCfg = game.BulletTable.getCfgById(bulletId);
                var angle = Math.atan2(driverdata.y - driverdata.attackPy, driverdata.x - driverdata.attackPx) * 180 / Math.PI - 90;
                //子弹是满的，并且有先发制人 概率存在
                //todo
                var firstHurt = false;
                var b_count = 1;
                var r = Math.random() * 10000;
                var threeRatio = driverdata.canThreeRatio;
                if (r < threeRatio) {
                    b_count = 3;
                }
                self.addBullet(driverdata, b_count, angle, bulletCfg, firstHurt);
            }
            else if (driverdata.job == game.ENUM_JOB_TYPE.JOB_FS) {
                // let isBigWeapon: boolean = false;
                var b_count = 1;
                // if (driverdata.bigWeaponHaveTimes) {
                // 	//巨型武器
                // 	bulletId = 13002;
                // 	isBigWeapon = true;
                // 	driverdata.bigWeaponHaveTimes--;
                // } else {
                // 	if (driverdata.skills.indexOf(SkillType.JOB_FS_13006) != -1) {
                // 		let r = Math.random() * 10000;
                // 		if (r < driverdata.bigWeaponRatio) {
                // 			//巨型武器
                // 			bulletId = 13002;
                // 			isBigWeapon = true;
                // 		}
                // 	}
                // }
                var isMolotov = false;
                // if (isBigWeapon == false)
                // {
                if (driverdata.skills.indexOf(game.SkillType.JOB_FS_13006) != -1) {
                    var r = Math.random() * 10000;
                    if (r < driverdata.molotovRatio) {
                        //火焰弹
                        bulletId = 14001;
                        isMolotov = true;
                    }
                }
                // }	
                var bulletCfg = game.BulletTable.getCfgById(bulletId);
                var angle = Math.atan2(driverdata.y - driverdata.attackPy, driverdata.x - driverdata.attackPx) * 180 / Math.PI - 90;
                self.addBullet(driverdata, b_count, angle, bulletCfg, false, undefined, undefined, undefined, undefined, isMolotov);
            }
            else if (driverdata.job == game.ENUM_JOB_TYPE.JOB_WS) {
                var bulletCfg = game.BulletTable.getCfgById(bulletId);
                var angle = Math.atan2(driverdata.y - driverdata.attackPy, driverdata.x - driverdata.attackPx) * 180 / Math.PI - 90;
                var b_ratio = Math.random() * 10000;
                var doubleTimes = 1;
                if (b_ratio > driverdata.doubleRatio) {
                    doubleTimes = 2;
                }
                var i = 0;
                var len = doubleTimes;
                var isFlamer = void 0;
                if (driverdata.skills.indexOf(game.SkillType.JOB_WS_14011) != -1) {
                    var r = Math.random() * 10000;
                    if (r < driverdata.flamerRatio) {
                        //火焰枪
                        bulletId = 14001;
                        isFlamer = true;
                    }
                }
                for (i = 0; i < len; i++) {
                    var b_count = 1;
                    var r = Math.random() * 10000;
                    var fiveRatio = driverdata.canFiveRatio;
                    if (r < fiveRatio) {
                        b_count = 5;
                    }
                    if (i == 0) {
                        self.addBullet(driverdata, b_count, angle, bulletCfg, undefined, undefined, undefined, undefined, undefined, undefined, isFlamer);
                    }
                    else {
                        self.m_clock.addTime(50 * i, 1, self.addBullet, self, [driverdata, b_count, angle, bulletCfg, undefined, undefined, undefined, undefined, undefined, undefined, isFlamer], true);
                    }
                }
            }
        };
        /**使用技能，使用前要先判断CD */
        UseSkillAction.prototype.useSkill = function (driver, skillid, monsterNotHit) {
            var self = this;
            var attackDriverdata = driver.getData();
            if (attackDriverdata.attr.getValue(game.Enum_Attr.hp) > 0) {
                if (attackDriverdata.driverType == game.ENUM_DriverType.role) {
                    var skillCfg = game.SkillTable.getCfgById(skillid);
                    if (skillCfg) {
                        if (skillid == game.SkillType.JOB_ZS_10002) {
                            self.wuYingJianCount = 30;
                            self.bigSkillWuYingJian(attackDriverdata, 50000 / 10000, 3 /*skillCfg.effect*/);
                        }
                        else if (skillid == game.SkillType.JOB_GJS_11002) {
                            self.bigSkillJianRain(attackDriverdata, 50, 30000 / 10000);
                        }
                        else if (skillid == game.SkillType.JOB_CK_12002) {
                            self.bigSkillNahan(6000, 30000);
                        }
                        else if (skillid == game.SkillType.JOB_FS_13003) {
                            self.bigSkillChongJiBo(3000);
                        }
                        else if (skillid == game.SkillType.JOB_WS_14002) {
                            self.bigSkillBaoFeng(attackDriverdata, 30000 / 10000, skillCfg.effect);
                        }
                        else {
                            //产生子弹
                            self.createBullet(attackDriverdata, skillCfg.bullet);
                        }
                        self.setSkillCdTime(attackDriverdata.id, skillid);
                    }
                }
                else {
                    //计算伤害
                    var skillCfg = game.SkillTable.getCfgById(skillid);
                    if (skillCfg) {
                        self._damageAction.damageMonsterAttack(driver, monsterNotHit);
                    }
                }
            }
        };
        /***设置CD时间*/
        UseSkillAction.prototype.setSkillCdTime = function (driverId, skillid) {
            var self = this;
            var map = self.m_sceneMar.getSkillCdMap();
            var driverMap;
            if (map.hasOwnProperty(driverId + '')) {
                driverMap = map[driverId + ''];
            }
            else {
                driverMap = {};
                map[driverId + ''] = driverMap;
            }
            driverMap[skillid + ''] = self.m_clock.getTime();
        };
        /**技能是否可以使用 */
        UseSkillAction.prototype.checkCanUseSkill = function (driverId, skillid, d) {
            var self = this;
            var skillCfg = game.SkillTable.getCfgById(skillid);
            if (skillCfg && skillCfg.distance >= d) {
                var map = self.m_sceneMar.getSkillCdMap();
                var driverMap = void 0;
                if (map.hasOwnProperty(driverId + '')) {
                    driverMap = map[driverId + ''];
                }
                else {
                    return true;
                }
                var cd = skillCfg.cd;
                var currentTime = self.m_clock.getTime();
                if (driverMap.hasOwnProperty(skillid + '')) {
                    if (currentTime - driverMap[skillid + ''] > cd) {
                        return true;
                    }
                }
            }
            return false;
        };
        UseSkillAction.prototype.checkSkillDistance = function (skillid, d) {
            var skillCfg = game.SkillTable.getCfgById(skillid);
            if (skillCfg.distance >= d)
                return true;
            return false;
        };
        /**
         *cutDownCd 负数表示，缩短  正数表示加长
         */
        UseSkillAction.prototype.checkSkillIsCD = function (driverId, skillid, cutDownCd) {
            var self = this;
            var map = self.m_sceneMar.getSkillCdMap();
            var driverMap;
            if (map.hasOwnProperty(driverId + '')) {
                driverMap = map[driverId + ''];
            }
            else {
                return false;
            }
            var cd = game.SkillTable.getCfgById(skillid).cd;
            if (cutDownCd) {
                cd += cutDownCd;
            }
            if (cd == 0) {
                return false;
            }
            var currentTime = self.m_clock.getTime();
            if (driverMap.hasOwnProperty(skillid + '')) {
                if (currentTime - driverMap[skillid + ''] > cd) {
                    return false;
                }
                else {
                    return true;
                }
            }
            return false;
        };
        UseSkillAction.prototype.clearSkillCd = function () {
            var self = this;
            var map = self.m_sceneMar.getSkillCdMap();
            map = {};
        };
        UseSkillAction.prototype.clearDriverSkillCD = function (driverId) {
            var self = this;
            var map = self.m_sceneMar.getSkillCdMap();
            var driverMap;
            if (map.hasOwnProperty(driverId + '')) {
                var obj = map[driverId + ''];
                for (var key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        obj[key] = undefined;
                        delete [key];
                    }
                }
                map[driverId + ''] = undefined;
                delete map[driverId + ''];
            }
        };
        /**
         *firstHurt 是否可以先发制人
        bigWeapon  是否是巨型武器
        skillHurtDamage  技能伤害系统
        bulletX  bulletY  子弹的固定坐标
        isMolotov 是否是火焰弹
        isFlamer  是否是火焰枪
         */
        UseSkillAction.prototype.addBullet = function (attackDriverdata, b_count, angle, bulletCfg, firstHurt, bigWeapon, skillHurtDamage, bulletX, bulletY, isMolotov, isFlamer) {
            var self = this;
            var attackValue = attackDriverdata.attr.getValue(game.Enum_Attr.attack);
            var crit = attackDriverdata.attr.getValue(game.Enum_Attr.crit);
            var critDamage = attackDriverdata.attr.getValue(game.Enum_Attr.critDamage);
            var physics_puncture = attackDriverdata.attr.getValue(game.Enum_Attr.physics_puncture);
            var magic_puncture = attackDriverdata.attr.getValue(game.Enum_Attr.magic_puncture);
            var i = 0;
            for (i = 0; i < b_count; i++) {
                var bulletdata = self.m_sceneMar.createDriverData(game.ENUM_DriverType.bullet);
                bulletdata.masterId = attackDriverdata.id;
                if (bulletX) {
                    bulletdata.x = bulletX;
                }
                else {
                    bulletdata.x = attackDriverdata.x;
                }
                if (bulletY) {
                    bulletdata.y = bulletY;
                }
                else {
                    bulletdata.y = attackDriverdata.y - 50;
                }
                bulletdata.job = attackDriverdata.job;
                bulletdata.movieName = bulletCfg.movieName;
                bulletdata.effect = bulletCfg.effect;
                bulletdata.rotateMove = bulletCfg.rotate == 1;
                bulletdata.isPierce = bulletCfg.penetration == 1;
                if (bulletdata.isPierce) {
                    bulletdata.pierceMaxNum = bulletCfg.penetrationnum;
                }
                bulletdata.moveAttackRange = bulletCfg.damagerange;
                //==============人物属性
                bulletdata.attr.setValue(game.Enum_Attr.attack, attackValue);
                bulletdata.attr.setValue(game.Enum_Attr.speed, bulletCfg.speed);
                bulletdata.attr.setValue(game.Enum_Attr.crit, crit);
                bulletdata.attr.setValue(game.Enum_Attr.critDamage, critDamage);
                bulletdata.attr.setValue(game.Enum_Attr.physics_puncture, physics_puncture);
                bulletdata.attr.setValue(game.Enum_Attr.magic_puncture, magic_puncture);
                bulletdata.luckHurtExRationMin = attackDriverdata.luckHurtExRationMin;
                bulletdata.luckHurtExRationkMax = attackDriverdata.luckHurtExRationkMax;
                bulletdata.farHurtExRatio = attackDriverdata.farHurtExRatio;
                bulletdata.shortHurtExRatio = attackDriverdata.shortHurtExRatio;
                bulletdata.anshaRatio = attackDriverdata.anshaRatio;
                bulletdata.anshaHurtExRatio = attackDriverdata.anshaHurtExRatio;
                bulletdata.skillHurtDamage = skillHurtDamage == undefined ? 1 : skillHurtDamage;
                bulletdata.bulletdamage = bulletCfg.bulletdamage;
                if (firstHurt) {
                    bulletdata.firstHurtExValue = attackDriverdata.firstHurtExValue;
                }
                bulletdata.mengDuHurtValueExRatio = attackDriverdata.mengDuHurtValueExRatio;
                if (bigWeapon) {
                    bulletdata.bigWeaponHurtRatio = attackDriverdata.bigWeaponHurtRatio;
                }
                if (isMolotov) {
                    bulletdata.isMolotov = true;
                }
                if (isFlamer) {
                    bulletdata.isFlamer = true;
                }
                bulletdata.forceSwoonRatio = attackDriverdata.forceSwoonRatio;
                bulletdata.swoonHurtExRatio = attackDriverdata.swoonHurtExRatio;
                bulletdata.baoFaHurtRatio = attackDriverdata.baoFaHurtRatio;
                bulletdata.hpHurtExValueRatio = attackDriverdata.hpHurtExValueRatio;
                //================
                if (bulletdata.isPierce) {
                    bulletdata.hitTargetIds = [];
                }
                if (b_count == 1) {
                    bulletdata.rotation = angle;
                }
                else if (b_count == 2) {
                    if (i == 0)
                        bulletdata.rotation = angle - 10;
                    if (i == 1)
                        bulletdata.rotation = angle + 10;
                }
                else if (b_count == 3) {
                    if (i == 0)
                        bulletdata.rotation = angle - 10;
                    if (i == 1)
                        bulletdata.rotation = angle;
                    if (i == 2)
                        bulletdata.rotation = angle + 10;
                }
                else if (b_count == 3) {
                    if (i == 0)
                        bulletdata.rotation = angle - 20;
                    if (i == 1)
                        bulletdata.rotation = angle - 10;
                    if (i == 2)
                        bulletdata.rotation = angle + 10;
                    if (i == 3)
                        bulletdata.rotation = angle + 20;
                }
                else if (b_count == 5) {
                    if (i == 0)
                        bulletdata.rotation = angle - 20;
                    if (i == 1)
                        bulletdata.rotation = angle - 10;
                    if (i == 2)
                        bulletdata.rotation = angle;
                    if (i == 3)
                        bulletdata.rotation = angle + 10;
                    if (i == 4)
                        bulletdata.rotation = angle + 20;
                }
                self.m_sceneMar.addDriver(bulletdata);
            }
        };
        return UseSkillAction;
    }(DLG.BaseAction));
    game.UseSkillAction = UseSkillAction;
    __reflect(UseSkillAction.prototype, "game.UseSkillAction");
})(game || (game = {}));
//# sourceMappingURL=UseSkillAction.js.map