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
    var FightManager = (function (_super) {
        __extends(FightManager, _super);
        function FightManager() {
            var _this = _super.call(this) || this;
            /**第几回合 */
            _this._roundNum = 0;
            /**最大回合数 */
            _this._roundMaxNum = 0;
            /**现在回合中出了多少只怪 */
            _this._monsterNumInRound = 0;
            /**现在回合中最多多少只怪 */
            _this._monsterMaxNumInRound = 0;
            /** 挑战boss失败 */
            _this._fightBossFailed = false;
            /**是否正在打boss */
            _this._isFighttingBoss = false;
            /**是否能打boss关卡 */
            _this._canFightBoss = false;
            /**怪物移动速度减少值 */
            _this.monsterSpeedCut = 0;
            // public quickPutOnBullet: number;
            _this.monsterNotHit = 0;
            _this._maxSkillVmcTimes = 2;
            _this._curSkillVmcTimes = 0;
            _this._initGap = 4000;
            // protected lastTime: number = 0;
            _this.currentCount = 0;
            /**主角是否可以射击 */
            _this._leaderCanFight = false;
            var self = _this;
            self.createClock();
            var stage = DLG.DLGCore.stage;
            stage.addEventListener(egret.Event.ENTER_FRAME, self.checkFightHandler, self);
            //A
            DLG.KeyBoardManager.getInstance().addListener(self.onFightBoss, self, 65);
            //Q
            DLG.KeyBoardManager.getInstance().addListener(self.test_bigSkillWuYingJian, self, 81);
            //W
            DLG.KeyBoardManager.getInstance().addListener(self.test_wwordRain, self, 87);
            return _this;
        }
        FightManager.prototype.test_bigSkillWuYingJian = function () {
            var self = this;
            var roleArr = self.m_sceneMar.getAllRoles();
            var len;
            len = roleArr.length;
            var i = 0;
            for (i; i < len; i++) {
                var role = self.m_sceneMar.getDriverById(roleArr[i], game.ENUM_DriverType.role);
                if (!role)
                    continue;
                var roleData = role.getData();
                if (roleData.skills.indexOf(game.SkillType.JOB_ZS_10002) != -1) {
                    // if (self._useSkillAction.checkSkillIsCD(roleData.id, SkillType.JOB_JK_10002) == false)
                    // {
                    // debug("-----使用无影剑")
                    self._useSkillAction.useSkill(role, game.SkillType.JOB_ZS_10002);
                    // } else {
                    // 	debug("无影剑 CD中")
                    // }	
                    return;
                }
            }
        };
        FightManager.prototype.test_wwordRain = function () {
            var self = this;
            var roleArr = self.m_sceneMar.getAllRoles();
            var len;
            len = roleArr.length;
            var i = 0;
            for (i; i < len; i++) {
                var role = self.m_sceneMar.getDriverById(roleArr[i], game.ENUM_DriverType.role);
                if (!role)
                    continue;
                var roleData = role.getData();
                if (roleData.skills.indexOf(game.SkillType.JOB_GJS_11002) != -1) {
                    // if (self._useSkillAction.checkSkillIsCD(roleData.id, SkillType.JOB_YK_11002) == false)
                    // {
                    // debug("-----使用剑雨")
                    self._useSkillAction.useSkill(role, game.SkillType.JOB_GJS_11002);
                    // } else {
                    // 	debug("剑雨技能CD中")
                    // }
                    return;
                }
            }
        };
        FightManager.getInstance = function () {
            var self = this;
            if (!self._instance) {
                self._instance = new FightManager();
            }
            return self._instance;
        };
        FightManager.prototype.onStop = function () {
            var self = this;
            if (self._isStart !== true) {
                return;
            }
            self._isStart = false;
            self._canFightBoss = false;
            self._fightBossFailed = false;
            self.m_buffMar.onClearSceneHeroBuff();
            self.m_sceneMar.clearDriversByType(game.ENUM_DriverType.bullet);
            self.m_sceneMar.clearDriversByType(game.ENUM_DriverType.monster);
            var stage = DLG.DLGCore.stage;
            stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, self.leaderFightHandler, self);
            stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, self.leaderFightMoveHandler, self);
            stage.removeEventListener(egret.TouchEvent.TOUCH_END, self.leaderStopFightHandler, self);
        };
        FightManager.prototype.onStart = function () {
            var self = this;
            self.onStop();
            if (self._isStart) {
                // debug("已经开了战斗，不需要再重复调用 start");
                return;
            }
            DLG.DLGCore.panel.close(game.PanelClassConfig.ID_SkillVmcPanel);
            self._curSkillVmcTimes = 0;
            self._startTime = egret.getTimer();
            self._initGap = 4000;
            self._isStart = true;
            self.m_sceneMar = game.SceneManager.getInstance();
            self.m_buffMar = game.BuffManager.getInstance();
            self._useSkillAction = DLG.FactoryUtils.getClass(game.UseSkillAction);
            self._damageAction = DLG.FactoryUtils.getClass(game.DamageAction);
            self.createSceneBuff();
            var sceneMar = game.SceneManager.getInstance();
            var heroArr = sceneMar.getAllRoles();
            var i = 0;
            var len = heroArr.length;
            ;
            for (i = 0; i < len; i++) {
                var role = sceneMar.getDriverById(heroArr[i], game.ENUM_DriverType.role);
                if (!role)
                    continue;
                var roleData = role.getData();
                self.onInitHeroBuff(roleData);
            }
            self._isFighttingBoss = false;
            if (self._fightBossFailed == false) {
                var monsterMaxArr = self.m_sceneMar.getSceneCfg().roundMonsterNum.split("|");
                // self._roundMaxNum = monsterMaxArr.length;
                self._roundMaxNum = 1;
                var probability = game.SceneData.borntBossWeight[self._roundMaxNum];
                self._bossBornRound = DLG.Utils.probabilityIndex(probability) + 1;
            }
            else {
                self._roundMaxNum = 0;
                self._bossBornRound = 0;
            }
            self._roundNum = 0;
            self.nextRound();
            self.m_sceneMar.updateWallHp(1000, 1000);
            var stage = DLG.DLGCore.stage;
            stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, self.leaderFightHandler, self);
            stage.addEventListener(egret.TouchEvent.TOUCH_END, self.leaderStopFightHandler, self);
            stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, self.leaderFightMoveHandler, self);
        };
        /**挑战boss */
        FightManager.prototype.onFightBoss = function () {
            var self = this;
            if (self._canFightBoss == false) {
                // debug('三波小怪还没有打完');
                return;
            }
            // debug("开始打boss");
            self.m_sceneMar.clearDriversByType(game.ENUM_DriverType.bullet);
            self.m_sceneMar.clearDriversByType(game.ENUM_DriverType.monster);
            self._isFighttingBoss = true;
            self._fightBossFailed = false;
            self._roundNum = 0;
            self.nextRound();
        };
        FightManager.prototype.createSceneBuff = function () {
            var self = this;
            self._sceneHeroBuffs = [];
            self._sceneMonsterBuffs = [];
            self._sceneHeroBuffsParame = [];
            self._sceneMonsterBuffsParame = [];
            var sceneCfg = self.m_sceneMar.getSceneCfg();
            // let skillsnum = sceneCfg.skillsnumber
            var sceneBuffs = sceneCfg.buffIds.split("|");
            var sceneBuffHold = sceneCfg.buffHold.split('|');
            var buf_attack_nums = sceneCfg.buf_attack_num.split('|');
            var buf_attack_pers = sceneCfg.buf_attack_per.split('|');
            var len;
            len = sceneCfg.buffNum;
            if (len == sceneBuffs.length) {
                var i = 0;
                var len_1 = sceneBuffs.length;
                for (i = 0; i < len_1; i++) {
                    if (sceneBuffHold[i] == '1') {
                        self._sceneHeroBuffs.push(parseInt(sceneBuffs[i]));
                        self._sceneHeroBuffsParame.push([buf_attack_nums[i], buf_attack_pers[i]]);
                    }
                    else {
                        self._sceneMonsterBuffs.push(parseInt(sceneBuffs[i]));
                        self._sceneMonsterBuffsParame.push([buf_attack_nums[i], buf_attack_pers[i]]);
                    }
                }
            }
            else {
                while (self._sceneHeroBuffs.length + self._sceneMonsterBuffs.length < len) {
                    var index = DLG.Utils.random(0, sceneBuffs.length - 1);
                    var buff = parseInt(sceneBuffs[index]);
                    var buf_attack_num = parseInt(buf_attack_nums[index]);
                    var buf_attack_per = parseInt(buf_attack_pers[index]);
                    if (sceneBuffHold[index] == '1') {
                        self._sceneHeroBuffs.push(buff);
                        self._sceneHeroBuffsParame.push([buf_attack_nums[index], buf_attack_pers[index]]);
                    }
                    else {
                        self._sceneMonsterBuffs.push(buff);
                        self._sceneMonsterBuffsParame.push([buf_attack_nums[index], buf_attack_pers[index]]);
                    }
                    sceneBuffs.splice(index, 1);
                    sceneBuffHold.splice(index, 1);
                    buf_attack_nums.splice(index, 1);
                    buf_attack_pers.splice(index, 1);
                }
            }
            sceneBuffs.length = 0;
            sceneBuffs = null;
        };
        FightManager.prototype.checkFightHandler = function (event) {
            var self = this;
            if (!self.m_sceneMar) {
                return;
            }
            var dataT = self.m_clock.getTime();
            self.currentCount++;
            var currentCount = self.currentCount;
            if (self._curSkillVmcTimes < self._maxSkillVmcTimes) {
                if (DLG.DLGCore.panel.getPanelById(game.PanelClassConfig.ID_GuidePanel) || DLG.DLGCore.panel.getPanelById(game.PanelClassConfig.ID_WelcomePanel))
                    self._startTime = egret.getTimer();
                else {
                    var gap = egret.getTimer() - self._startTime;
                    var curGap = self._initGap - 1000 * self._curSkillVmcTimes;
                    curGap = self._curSkillVmcTimes == 0 ? curGap : curGap + 2500;
                    curGap = Math.max(curGap, 2500);
                    if (gap >= curGap) {
                        self._startTime = egret.getTimer();
                        self._curSkillVmcTimes += 1;
                        self.createSkillVmc();
                    }
                }
            }
            // let sceneMar: SceneManager = SceneManager.getInstance();
            var monsterArr = self.m_sceneMar.getAllMonster();
            var monsterMap = [[], [], [], [], [], [], [], [], [], []];
            var canAttackMonster = [];
            var i = 0;
            var len;
            if (self._isStart) {
                len = self.m_sceneMar.getAllMonsterLen();
                if ((self._fightBossFailed == false && self._canFightBoss == false) ||
                    (self._canFightBoss == true && self._isFighttingBoss == true)) {
                    if (currentCount % 20 == 0) {
                        self.createRoundMonster();
                    }
                    if (self._monsterNumInRound >= self._monsterMaxNumInRound && len <= 3) {
                        //本回合快打完后，刷下一回合的怪。
                        if (self._roundMaxNum > self._roundNum) {
                            self.nextRound();
                        }
                        else {
                            if (len == 0) {
                                if (self._isFighttingBoss == true) {
                                    // debug("本关卡已经打完所有的怪物");
                                    self.onStop();
                                    if (self.fightBossCallBack) {
                                        self.fightBossCallBack.call(self.fightBossCallBackTarget, 1);
                                    }
                                    self.m_clock.addTime(3000, 1, self.onStart, self, null);
                                }
                                else {
                                    // debug("打够小怪波数后，可以进入打boss");
                                    self._canFightBoss = true;
                                    if (self.canFightBossCallBack) {
                                        self.canFightBossCallBack.call(self.canFightBossCallBackTarget);
                                    }
                                    // self.m_clock.addTime(3000, 1, self.onFightBoss, self, null);///////////////////////////
                                    self.onStop();
                                    DLG.DLGCore.panel.show(game.PanelClassConfig.ID_ResultPanel);
                                    game.MissonIManager.getInstance().updateMissionStatus(game.MainUIManager.getInstance().sceneId);
                                }
                            }
                        }
                    }
                }
                else {
                    if (len <= 3) {
                        self.createRoundMonster();
                    }
                }
                //怪物是否可以攻击，性能优化，500ms攻击一次
                var checkAttack = currentCount % 25 == 0;
                for (i = 0; i < len; i++) {
                    var monster = self.m_sceneMar.getDriverById(monsterArr[i], game.ENUM_DriverType.monster);
                    if (!monster)
                        continue;
                    var monsterData = monster.getData();
                    if (monsterData.isSwoonTime == undefined) {
                        if (monsterData.isBoss) {
                            if (monsterData.y < monsterData.targetY && monster.isAttack() == false) {
                                monster.run();
                                monster.move();
                            }
                            else {
                                if (checkAttack && self._useSkillAction.checkSkillIsCD(monsterData.id, monsterData.skills[0]) == false) {
                                    monster.attack(monsterData.skills[0], 0, 0, self.monsterNotHit);
                                }
                            }
                        }
                        else {
                            if (monster.isAttack() == false) {
                                if (monsterData.distance == 2) {
                                    if (checkAttack && self._useSkillAction.checkCanUseSkill(monsterData.id, monsterData.skills[0], game.SceneData.boundary - monsterData.y)) {
                                        monster.attack(monsterData.skills[0], 0, 0, self.monsterNotHit);
                                    }
                                    else {
                                        if (monsterData.y < monsterData.targetY) {
                                            monster.run();
                                            monster.move();
                                        }
                                    }
                                }
                                else {
                                    if (monsterData.y < monsterData.targetY) {
                                        monster.run();
                                        monster.move();
                                    }
                                    else if (checkAttack && self._useSkillAction.checkSkillIsCD(monsterData.id, monsterData.skills[0]) == false) {
                                        monster.attack(monsterData.skills[0], 0, 0, self.monsterNotHit);
                                    }
                                }
                            }
                        }
                    }
                    else {
                        if (dataT - monsterData.isSwoonTime > 0) {
                            monsterData.isSwoonTime = undefined;
                        }
                    }
                    if (monsterData.y > 0) {
                        var index = Math.floor(monsterData.y / 100);
                        monsterMap[index].push(monster);
                    }
                    if (monsterData.y > 80) {
                        canAttackMonster.push(monster);
                    }
                }
                //Y排序
                if (currentCount % 10 == 0) {
                    var ml = 0;
                    var mLen = monsterMap.length;
                    for (ml = 0; ml < mLen; ml++) {
                        DLG.SortTools.sortMap(monsterMap[ml], 'y', false);
                    }
                    DLG.SortTools.sortMap(canAttackMonster, 'y', false);
                }
                var roleArr = self.m_sceneMar.getAllRoles();
                len = roleArr.length;
                // if (self._leaderCanFight == true) {
                i = 0;
                // } else {
                // 	i = 1;
                // }
                for (i; i < len; i++) {
                    var role = self.m_sceneMar.getDriverById(roleArr[i], game.ENUM_DriverType.role);
                    if (!role)
                        continue;
                    var roleData = role.getData();
                    if (roleData.bulletCurrent <= 0) {
                        //没有子弹了
                        continue;
                    }
                    if (roleData.isLeader) {
                        if (self._leaderCanFight == true) {
                            //队长射击
                            if (self._useSkillAction.checkSkillIsCD(roleData.id, roleData.skills[0]) == false) {
                                role.attack(roleData.skills[0], self.touchStageX, self.touchStageY);
                            }
                            continue;
                        }
                        else {
                            continue;
                        }
                    }
                    if (canAttackMonster.length > 0) {
                        var skillid = roleData.skills[0];
                        if (self._useSkillAction.checkSkillIsCD(roleData.id, skillid) == false) {
                            //如果可以使用技能,取一个最近的怪来打
                            var monster = self.getMiniNearMonster(canAttackMonster, roleData);
                            if (monster) {
                                var monsterData = monster.getData();
                                role.attack(skillid, monsterData.x, monsterData.y);
                            }
                        }
                    }
                }
            }
            var bulletArr = self.m_sceneMar.getAllBullet();
            i = 0;
            len = bulletArr.length;
            var gameWidth = game.GAME_CORE.APP_WIDTH;
            b: for (i = 0; i < len;) {
                var bullet = self.m_sceneMar.getDriverById(bulletArr[i], game.ENUM_DriverType.bullet);
                if (!bullet)
                    continue b;
                var bulletData = bullet.getData();
                bulletData.y = Math.floor(bulletData.y);
                bullet.move();
                if (bulletData) {
                    if (bulletData.y < -10 || bulletData.x < 0 || bulletData.x > gameWidth) {
                        self.m_sceneMar.removeDriver(bullet);
                        len = bulletArr.length;
                        continue b;
                    }
                }
                //检测是否打到怪。
                var index = Math.floor(bulletData.y / 100);
                if (index < 0)
                    index = 0;
                var m = 0;
                index = index >= monsterMap.length ? monsterMap.length - 1 : index;
                var checkHitMonster = monsterMap[index].concat();
                if (index != 0) {
                    checkHitMonster = checkHitMonster.concat(monsterMap[index - 1]);
                }
                if (index != monsterMap.length - 1) {
                    checkHitMonster = checkHitMonster.concat(monsterMap[index + 1]);
                }
                var mLen = checkHitMonster.length;
                m: for (m = 0; m < mLen; m++) {
                    var monster = checkHitMonster[m];
                    if (monster == null)
                        continue m;
                    var monsterData = monster.getData();
                    if (monsterData) {
                        var hp = monsterData.attr.getValue(game.Enum_Attr.hp);
                        if (hp <= 0) {
                            self.m_sceneMar.removeDriver(monster);
                            continue m;
                        }
                        if (bulletData.isPierce) {
                            if (bulletData.hitTargetIds.length >= bulletData.pierceMaxNum) {
                                continue m;
                            }
                            if (bulletData.hitTargetIds.indexOf(monsterData.id) != -1) {
                                continue m;
                            }
                        }
                        var mw = monsterData.byAttackRangeW;
                        var mh = monsterData.byAttackRangeH;
                        var py = monsterData.byAttackRangeY;
                        var bds = bulletData.moveAttackRange;
                        var mpy = monsterData.y + py;
                        if (mpy + mh + bds > bulletData.y && mpy - mh - bds < bulletData.y &&
                            monsterData.x + mw > bulletData.x && monsterData.x - mw < bulletData.x) {
                            self._damageAction.damageBulletAttack(bulletData, monster);
                            if (bulletData.isPierce) {
                                //穿透子弹
                                bulletData.hitTargetIds.push(monsterData.id);
                            }
                            else {
                                self.m_sceneMar.removeDriver(bullet);
                                len = bulletArr.length;
                            }
                            if (monsterData.attr.getValue(game.Enum_Attr.hp) <= 0) {
                                self.m_sceneMar.removeDriver(monster);
                            }
                            continue b;
                        }
                    }
                }
                i++;
            }
            monsterMap.length = 0;
            monsterMap = null;
            canAttackMonster.length = 0;
            canAttackMonster = null;
        };
        FightManager.prototype.getMiniNearMonster = function (monsterArr, roleData) {
            var skillDistance = 620;
            var j = 0;
            var byAttackMonster;
            var d = 999999;
            //性取优化，只取20个来检测。
            var jLen = monsterArr.length > 20 ? 20 : monsterArr.length;
            for (j = 0; j < jLen; j++) {
                var monster = monsterArr[j];
                var monsterData = monster.getData();
                if (monsterData && roleData.y - monsterData.y <= skillDistance) {
                    var distance = DLG.Utils.distance(roleData.x, roleData.y, monsterData.x, monsterData.y);
                    if (d > distance) {
                        byAttackMonster = monster;
                        d = distance;
                    }
                }
            }
            return byAttackMonster;
        };
        FightManager.prototype.nextRound = function () {
            var self = this;
            self._roundNum++;
            // debug('当前刷出第 ' + self._roundNum + '波小怪');
            var monsterMaxArr = self.m_sceneMar.getSceneCfg().roundMonsterNum.split("|");
            self._monsterMaxNumInRound = parseInt(monsterMaxArr[self._roundNum - 1]);
            self._monsterNumInRound = 0;
            var sceneCfg = self.m_sceneMar.getSceneCfg();
            var monsterIds = sceneCfg.monster.split('|');
            if (self._canFightBoss && self._roundNum == self._bossBornRound) {
                var driverdata = self.bornMonsterData(true, parseInt(monsterIds[monsterIds.length - 1]));
                self.m_sceneMar.addDriver(driverdata);
            }
            self.createRoundMonster();
        };
        /***产生一小波怪 */
        FightManager.prototype.createRoundMonster = function () {
            var self = this;
            var i = 0;
            var len = Math.ceil(Math.random() * 5);
            if ((self._fightBossFailed == false && self._canFightBoss == false) ||
                (self._canFightBoss == true && self._isFighttingBoss == true)) {
                var maxLen = self._monsterMaxNumInRound - self._monsterNumInRound;
                if (len > maxLen) {
                    len = maxLen;
                }
                if (self._monsterNumInRound >= self._monsterMaxNumInRound) {
                    //如果回合中，怪物出现的数量大于等于 总数量，则判断进入下一回合。
                    return;
                }
            }
            var sceneCfg = self.m_sceneMar.getSceneCfg();
            var monsterIds = sceneCfg.monster.split('|');
            for (i = 0; i < len; i++) {
                var driverdata = self.bornMonsterData(false, parseInt(monsterIds[Math.floor(Math.random() * (monsterIds.length - 1))]));
                self.m_sceneMar.addDriver(driverdata);
            }
            self._monsterNumInRound += len;
            monsterIds.length = 0;
            monsterIds = null;
        };
        FightManager.prototype.createSkillVmc = function () {
            DLG.DLGCore.panel.show(game.PanelClassConfig.ID_SkillVmcPanel);
        };
        /**每个关卡的时候，给人物增加场景中的buff */
        FightManager.prototype.onInitHeroBuff = function (driverdata) {
            var self = this;
            //给场景上的人物增加buff
            // let sceneCfg: SceneCfg = self.m_sceneMar.getSceneCfg();
            var buffs = self._sceneHeroBuffs;
            var parame = self._sceneHeroBuffsParame;
            var i = 0;
            var iLen = buffs.length;
            for (i = 0; i < iLen; i++) {
                if (buffs[i] == 11501) {
                    //队长攻击力减少20%，队友攻击力增加10%
                    if (driverdata.isLeader) {
                        self.m_buffMar.onAddBuffToTargetData(driverdata, game.ENUM_BuffEffect.ATTACK, 86400000, 0, -2000);
                    }
                    else {
                        self.m_buffMar.onAddBuffToTargetData(driverdata, game.ENUM_BuffEffect.ATTACK, 86400000, 0, 1000);
                    }
                }
                else if (buffs[i] == 11601) {
                    //队长攻击力增加10%，队友攻击力减少20%
                    if (driverdata.isLeader) {
                        self.m_buffMar.onAddBuffToTargetData(driverdata, game.ENUM_BuffEffect.ATTACK, 86400000, 0, 1000);
                    }
                    else {
                        self.m_buffMar.onAddBuffToTargetData(driverdata, game.ENUM_BuffEffect.ATTACK, 86400000, 0, -2000);
                    }
                }
                else {
                    self.m_buffMar.onAddBuffToTargetData(driverdata, buffs[i], 86400000, parseInt(parame[0]), parseInt(parame[1]));
                }
            }
            self.m_buffMar.onActionTargetBuff(driverdata, game.Enum_BuffTrigger.create);
        };
        /**生出一只怪的数据 */
        FightManager.prototype.bornMonsterData = function (isBoss, mid) {
            var self = this;
            var tmpPointArr = game.SceneData.roleStandPoint;
            var driverdata = self.m_sceneMar.createDriverData(game.ENUM_DriverType.monster);
            var rangArr;
            var px = DLG.Utils.random(-80, 80);
            driverdata.y = 0;
            var monsterCfg = game.MonsterTable.getCfgById(mid);
            driverdata.attr.setValue(game.Enum_Attr.speed, monsterCfg.speed - self.monsterSpeedCut);
            driverdata.movieName = monsterCfg.movieName;
            driverdata.monsterCfgId = monsterCfg.id;
            driverdata.distance = monsterCfg.distance;
            if (isBoss) {
                if (Math.random() > 0.5) {
                    driverdata.x = tmpPointArr[1] + px;
                }
                else {
                    driverdata.x = tmpPointArr[2] + px;
                }
                driverdata.isBoss = true;
            }
            else {
                driverdata.x = tmpPointArr[Math.floor((Math.random() * 5))] + px;
            }
            driverdata.attr.setValue(game.Enum_Attr.hp, monsterCfg.hp);
            driverdata.attr.setValue(game.Enum_Attr.totalHp, monsterCfg.hp);
            driverdata.attr.setValue(game.Enum_Attr.def, monsterCfg.def);
            driverdata.attr.setValue(game.Enum_Attr.magicdefense, monsterCfg.magicdefense);
            driverdata.attr.setValue(game.Enum_Attr.attack, monsterCfg.attack);
            driverdata.attr.setValue(game.Enum_Attr.hit, monsterCfg.hit);
            driverdata.attr.setValue(game.Enum_Attr.resistcrit, monsterCfg.resistcrit);
            driverdata.attr.setValue(game.Enum_Attr.resistdamage, monsterCfg.resistdamage);
            rangArr = monsterCfg.hitRange.split('|');
            driverdata.byAttackRangeW = parseInt(rangArr[0]);
            driverdata.byAttackRangeH = parseInt(rangArr[1]);
            driverdata.byAttackRangeY = parseInt(rangArr[2]);
            if (driverdata.isBoss) {
                var monsterskills = monsterCfg.monsterskills.split("|");
                var skills = [];
                skills.push(parseInt(monsterskills[0]));
                monsterskills.splice(0, 1);
                var len = void 0;
                len = monsterCfg.skillsnumber;
                while (skills.length < len) {
                    var index = DLG.Utils.random(0, monsterskills.length - 1);
                    var skill = parseInt(monsterskills[index]);
                    monsterskills.splice(index, 1);
                    skills.push(skill);
                }
                monsterskills.length = 0;
                monsterskills = null;
                driverdata.skills = skills;
                driverdata.targetY = game.SceneData.boundary + DLG.Utils.random(0, 15);
            }
            else {
                driverdata.skills = [parseInt(monsterCfg.monsterskills)];
                var skillcfg = game.SkillTable.getCfgById(driverdata.skills[0]);
                // if (skillcfg && skillcfg.range > 200) {
                if (monsterCfg.distance == 2) {
                    driverdata.targetY = game.SceneData.boundary - DLG.Utils.random(skillcfg.distance * 0.3, skillcfg.distance * 0.4);
                }
                else {
                    driverdata.targetY = game.SceneData.boundary + DLG.Utils.random(-15, 15);
                }
            }
            var sceneCfg = self.m_sceneMar.getSceneCfg();
            var buffs = self._sceneMonsterBuffs;
            var parame = self._sceneMonsterBuffsParame;
            var i = 0;
            var iLen = buffs.length;
            for (i = 0; i < iLen; i++) {
                self.m_buffMar.onAddBuffToTargetData(driverdata, buffs[i], 86400000, parseInt(parame[0]), parseInt(parame[1]));
            }
            self.m_buffMar.onActionTargetBuff(driverdata, game.Enum_BuffTrigger.create);
            rangArr.length = 0;
            rangArr = null;
            return driverdata;
        };
        /**本关卡中，是否挑战boss失败 */
        FightManager.prototype.getFightBossFailed = function () {
            return this._fightBossFailed;
        };
        FightManager.prototype.leaderStopFightHandler = function (e) {
            var self = this;
            if (self._leaderCanFight == true) {
                DLG.DLGCore.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, self.leaderFightMoveHandler, self);
            }
            self._leaderCanFight = false;
        };
        FightManager.prototype.leaderFightHandler = function (e) {
            var self = this;
            if (self._isStart != true) {
                return;
            }
            var roleArr = self.m_sceneMar.getAllRoles();
            var role = self.m_sceneMar.getDriverById(roleArr[0], game.ENUM_DriverType.role);
            var roleData = role.getData();
            var isAttackMonster = false;
            self._leaderCanFight = true;
            self.touchStageX = e.stageX;
            self.touchStageY = e.stageY;
            if (self.touchStageY < game.SceneData.boundary) {
                self.touchStageY = game.SceneData.boundary - 100;
            }
            if (self._useSkillAction.checkSkillIsCD(roleData.id, roleData.skills[0]) == false) {
                role.attack(roleData.skills[0], self.touchStageX, self.touchStageY);
                isAttackMonster = true;
            }
        };
        FightManager.prototype.leaderFightMoveHandler = function (event) {
            var self = this;
            if (self._leaderCanFight == true) {
                self.touchStageX = event.stageX;
                self.touchStageY = event.stageY;
            }
        };
        return FightManager;
    }(DLG.BaseAction));
    game.FightManager = FightManager;
    __reflect(FightManager.prototype, "game.FightManager");
})(game || (game = {}));
//# sourceMappingURL=FightManager.js.map