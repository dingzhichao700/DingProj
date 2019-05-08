var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var SceneManager = (function () {
        function SceneManager() {
            var self = this;
            self._sceneDta = new game.SceneData();
            self._monsterDriverPool = [];
            self._roleDriverPool = [];
            self._bulletDriverPool = [];
            self._skillCdMap = {};
            var i = 0;
            var len = 50;
            for (i = 0; i < len; i++) {
                var driver = new game.MonsterDriver();
                self._monsterDriverPool.push(driver);
            }
            len = 5;
            for (i = 0; i < len; i++) {
                var driver = new game.RoleDriver();
                self._roleDriverPool.push(driver);
            }
            len = 150;
            for (i = 0; i < len; i++) {
                var driver = new game.BulletDriver();
                self._bulletDriverPool.push(driver);
            }
            len = 150;
            game.FontBlood._bloodVec = [];
            var arr = game.FontBlood._bloodVec;
            arr = [];
            for (i = 0; i < len; i++) {
                var blood = new game.FontBlood();
                arr.push(blood);
            }
        }
        SceneManager.getInstance = function () {
            var self = this;
            if (!self._instance) {
                self._instance = new SceneManager();
            }
            return self._instance;
        };
        // /**初始化战斗场景 */
        // public initScene(): void
        // {
        // 	let scene: SceneWindow = new SceneWindow;
        // 	DLG.DLGCore.stage.addChildAt(scene,0);
        // }
        SceneManager.prototype.initLayer = function (driverLayer, mapLayer, _effectLayer) {
            var self = this;
            self._driverLayer = driverLayer;
            self._effectLayer = _effectLayer;
            self._mapLayer = mapLayer;
            self._mapLayer.callBack = self.loadMapCompleteHandler;
            self._mapLayer.callBackTarget = this;
        };
        /**加载完地图成功 回调 */
        SceneManager.prototype.loadMapCompleteHandler = function () {
            this._configLoadOk = true;
            this.sceneReady();
        };
        SceneManager.prototype.loadIngPanelOk = function () {
            this._loadPanelShowOk = true;
            this.sceneReady();
        };
        SceneManager.prototype.sceneReady = function () {
            if (game.LoginManager.getInstance().loadPanelShowOk && this._configLoadOk && this._loadPanelShowOk) {
                var self_1 = this;
                self_1._mapLayer.x = (game.GAME_CORE.APP_WIDTH - self_1._mapLayer.width) / 2;
                self_1._mapLayer.y = game.GAME_CORE.APP_HEIGHT - self_1._mapLayer.height;
                //开始战斗
                game.FightManager.getInstance().onStart();
            }
        };
        SceneManager.prototype.getEffectLayer = function () {
            return this._effectLayer;
        };
        SceneManager.prototype.getAllMonsterLen = function () {
            var self = this;
            return self._sceneDta.monsterLen;
        };
        SceneManager.prototype.getAllMonster = function () {
            var self = this;
            return self._sceneDta.monsterIdList;
        };
        SceneManager.prototype.getAllRoles = function () {
            var self = this;
            return self._sceneDta.roleIdList;
        };
        SceneManager.prototype.getAllBullet = function () {
            var self = this;
            return self._sceneDta.bulletIdList;
        };
        // public getAllDriverByType(): Object
        // {
        // 	let self = this;
        // 	return self._sceneDta.monsterDic;
        // }
        SceneManager.prototype.getDriverById = function (id, type) {
            var self = this;
            var idStr = id + '';
            var _sceneDta = self._sceneDta;
            if ((type == game.ENUM_DriverType.monster || type == undefined) && _sceneDta.monsterDic.hasOwnProperty(idStr)) {
                return _sceneDta.monsterDic[idStr];
            }
            if ((type == game.ENUM_DriverType.role || type == undefined) && _sceneDta.roleDic.hasOwnProperty(idStr)) {
                return _sceneDta.roleDic[idStr];
            }
            if ((type == game.ENUM_DriverType.bullet || type == undefined) && _sceneDta.bulletDic.hasOwnProperty(idStr)) {
                return _sceneDta.bulletDic[idStr];
            }
            return null;
        };
        SceneManager.prototype.createDriverData = function (driverType) {
            var self = this;
            var data;
            if (driverType == game.ENUM_DriverType.bullet) {
                data = new game.BulletData();
            }
            else if (driverType == game.ENUM_DriverType.monster) {
                data = new game.MonsterData();
            }
            else if (driverType == game.ENUM_DriverType.role) {
                data = new game.RoleData();
            }
            data.attr = new game.AttrData();
            data.buffsAttr = new game.AttrData();
            data.buffs = [[], [], [], [], []];
            data.driverType = driverType;
            data.id = SceneManager.ID;
            SceneManager.ID++;
            if (data.id == 0) {
                throw new Error('SceneManager_ID值出错');
            }
            if (SceneManager.ID == Number.MAX_VALUE) {
                SceneManager.ID = Number.MIN_VALUE;
            }
            return data;
        };
        SceneManager.prototype.addDriver = function (driverData) {
            var self = this;
            var type = driverData.driverType;
            var driver = this.getNewDriverByType(type);
            driver.setData(driverData);
            var sceneData = self._sceneDta;
            var layer;
            if (type == game.ENUM_DriverType.monster) {
                sceneData.monsterDic[driver.getData().id + ''] = driver;
                sceneData.monsterLen++;
                sceneData.monsterIdList.push(driver.getData().id);
                layer = game.ENUM_DriverRenderLayerId.monsterLayer;
            }
            else if (type == game.ENUM_DriverType.role) {
                sceneData.roleDic[driver.getData().id + ''] = driver;
                sceneData.roleIdList.push(driver.getData().id);
                layer = game.ENUM_DriverRenderLayerId.roleLayer;
            }
            else if (type == game.ENUM_DriverType.bullet) {
                sceneData.bulletDic[driver.getData().id + ''] = driver;
                sceneData.bulletIdList.push(driver.getData().id);
                layer = game.ENUM_DriverRenderLayerId.bulletLayer;
            }
            self._driverLayer.addDriver(driver, layer);
            return driver;
        };
        /**清空场上所有对象  */
        SceneManager.prototype.clearDriversByType = function (type) {
            var self = this;
            var len;
            var i;
            if (type == game.ENUM_DriverType.monster) {
                len = self.getAllMonsterLen();
                var monsterIdList = self._sceneDta.monsterIdList.concat();
                for (i = 0; i < len; i++) {
                    var monster = self.getDriverById(monsterIdList[i], game.ENUM_DriverType.monster);
                    if (!monster)
                        continue;
                    self.removeDriver(monster);
                }
                monsterIdList.length = 0;
                monsterIdList = null;
            }
            else if (type == game.ENUM_DriverType.role) {
                var roleIdList = self.getAllRoles().concat();
                len = roleIdList.length;
                for (i = 0; i < len; i++) {
                    var role = self.getDriverById(roleIdList[i], game.ENUM_DriverType.role);
                    if (!role)
                        continue;
                    self.removeDriver(role);
                }
                roleIdList.length = 0;
                roleIdList = null;
            }
            else if (type == game.ENUM_DriverType.bullet) {
                var bulletIdList = self.getAllBullet().concat();
                len = bulletIdList.length;
                for (i = 0; i < len; i++) {
                    var bullet = self.getDriverById(bulletIdList[i], game.ENUM_DriverType.bullet);
                    if (!bullet)
                        continue;
                    self.removeDriver(bullet);
                }
                bulletIdList.length = 0;
                bulletIdList = null;
            }
        };
        SceneManager.prototype.addEffect = function (effectId, playTimes, px, py) {
            var self = this;
            self._driverLayer.addEffect(effectId, playTimes, px, py);
        };
        SceneManager.prototype.updateWallHp = function (hp, totalHp) {
            var self = this;
            var wall_id;
            if (hp / totalHp > 0.8) {
                wall_id = 1;
            }
            self._driverLayer.showWall(wall_id);
        };
        // private bombPlayTime: number = 0;
        // private bombY: number = 0
        // public playBomb(): void {
        // 	let self = this;
        // 	if (egret.getTimer() - self.bombPlayTime < 5000) {
        // 		return;
        // 	}
        // 	self.bombPlayTime = egret.getTimer();
        // 	self.bombY = 650
        // 	self.bomb2();
        // }
        // private bomb2(): void {
        // 	let self = this;
        // 	let arr = SceneData.roleStandPoint;
        // 	let ilen: number = arr.length;
        // 	let i: number = 0;
        // 	for (i = 0; i < ilen; i++) {
        // 		let px: number = Math.floor(Math.random() * 20)
        // 		if (Math.random() > 0.5) {
        // 			px = -px;
        // 		}
        // 		this.addEffect('bowsBomb', 1, arr[i] + px, self.bombY + Math.random() * 20)
        // 	}
        // 	if (self.bombY > 150) {
        // 		DLG.DLGCore.clock.addTime(100, 1, self.bomb2, self, null);
        // 	} else {
        // 	}
        // 	self.bombY -= 150;
        // }
        SceneManager.prototype.removeDriverByData = function (driverData) {
            var self = this;
            var type = driverData.driverType;
            var sceneData = self._sceneDta;
            var idStr = driverData.id + '';
            if (type == game.ENUM_DriverType.monster) {
                sceneData.monsterDic[idStr] = undefined;
                delete sceneData.monsterDic[idStr];
                var index = sceneData.monsterIdList.indexOf(driverData.id);
                if (index != -1) {
                    sceneData.monsterIdList.splice(index, 1);
                    sceneData.monsterLen--;
                }
                var useSkillAction = DLG.FactoryUtils.getClass(game.UseSkillAction);
                useSkillAction.clearDriverSkillCD(driverData.id);
            }
            else if (type == game.ENUM_DriverType.role) {
                sceneData.roleDic[idStr] = undefined;
                delete sceneData.roleDic[idStr];
                var index = sceneData.roleIdList.indexOf(driverData.id);
                if (index != -1) {
                    sceneData.roleIdList.splice(index, 1);
                }
                var useSkillAction = DLG.FactoryUtils.getClass(game.UseSkillAction);
                useSkillAction.clearDriverSkillCD(driverData.id);
            }
            else if (type == game.ENUM_DriverType.bullet) {
                sceneData.bulletDic[idStr] = undefined;
                delete sceneData.bulletDic[idStr];
                var index = sceneData.bulletIdList.indexOf(driverData.id);
                if (index != -1) {
                    sceneData.bulletIdList.splice(index, 1);
                }
            }
            var driver = self.getDriverById(driverData.id, type);
            // let skillAction:UseSkillAction = DLG.FactoryUtils.getClass(UseSkillAction);
            self._driverLayer.removeDriver(driver);
            self.returnDriverByType(driver);
        };
        SceneManager.prototype.removeDriver = function (driver) {
            var self = this;
            var driverData = driver.getData();
            var type = driverData.driverType;
            var sceneData = self._sceneDta;
            var idStr = driverData.id + '';
            if (type == game.ENUM_DriverType.monster) {
                sceneData.monsterDic[idStr + ''] = undefined;
                delete sceneData.monsterDic[idStr + ''];
                var index = sceneData.monsterIdList.indexOf(driverData.id);
                if (index != -1) {
                    sceneData.monsterIdList.splice(index, 1);
                    sceneData.monsterLen--;
                }
                var useSkillAction = DLG.FactoryUtils.getClass(game.UseSkillAction);
                useSkillAction.clearDriverSkillCD(driverData.id);
            }
            else if (type == game.ENUM_DriverType.role) {
                sceneData.roleDic[idStr] = undefined;
                delete sceneData.roleDic[idStr];
                var index = sceneData.roleIdList.indexOf(driverData.id);
                if (index != -1) {
                    sceneData.roleIdList.splice(index, 1);
                }
                var useSkillAction = DLG.FactoryUtils.getClass(game.UseSkillAction);
                useSkillAction.clearDriverSkillCD(driverData.id);
            }
            else if (type == game.ENUM_DriverType.bullet) {
                sceneData.bulletDic[idStr] = undefined;
                delete sceneData.bulletDic[idStr];
                var index = sceneData.bulletIdList.indexOf(driverData.id);
                if (index != -1) {
                    sceneData.bulletIdList.splice(index, 1);
                }
            }
            self._driverLayer.removeDriver(driver);
            self.returnDriverByType(driver);
        };
        /**从池里取一个显示对象 */
        SceneManager.prototype.getNewDriverByType = function (type) {
            var self = this;
            var driver;
            if (type == game.ENUM_DriverType.monster) {
                if (self._monsterDriverPool.length > 0) {
                    return self._monsterDriverPool.pop();
                }
                else {
                    driver = new game.MonsterDriver();
                }
            }
            else if (type == game.ENUM_DriverType.role) {
                if (self._roleDriverPool.length > 0) {
                    return self._roleDriverPool.pop();
                }
                else {
                    driver = new game.RoleDriver();
                }
            }
            else if (type == game.ENUM_DriverType.bullet) {
                if (self._bulletDriverPool.length > 0) {
                    return self._bulletDriverPool.pop();
                }
                else {
                    driver = new game.BulletDriver();
                }
            }
            return driver;
        };
        SceneManager.prototype.returnDriverByType = function (driver) {
            var self = this;
            if (egret.is(driver, 'MonsterDriver')) {
                self._monsterDriverPool.push(driver);
            }
            else if (egret.is(driver, 'RoleDriver')) {
                self._roleDriverPool.push(driver);
            }
            else if (egret.is(driver, 'BulletDriver')) {
                self._bulletDriverPool.push(driver);
            }
            driver.clear();
            driver.getData().clear();
            driver.setData(null);
        };
        /**获取指定范围内，某类型的对象
         *rangeH 如果有值，则查找的是方形范围
        */
        SceneManager.prototype.getNearRangeDriverByType = function (type, range, x, y, rangeH) {
            var arr = [];
            var self = this;
            var len;
            var i;
            if (type == game.ENUM_DriverType.monster) {
                len = self.getAllMonsterLen();
                var monsterIdList = self._sceneDta.monsterIdList;
                for (i = 0; i < len; i++) {
                    var monster = self.getDriverById(monsterIdList[i], game.ENUM_DriverType.monster);
                    if (!monster)
                        continue;
                    if (rangeH) {
                        if ((monster.x > x - range && monster.x < x + range) &&
                            (monster.y > y - rangeH && monster.y < y + rangeH)) {
                            arr.push(monster);
                        }
                    }
                    else {
                        if (range == 9999 || DLG.Utils.distance(x, y, monster.x, monster.y) <= range) {
                            arr.push(monster);
                        }
                    }
                }
            }
            else if (type == game.ENUM_DriverType.role) {
                var roleIdList = self.getAllRoles();
                len = roleIdList.length;
                for (i = 0; i < len; i++) {
                    var role = self.getDriverById(roleIdList[i], game.ENUM_DriverType.role);
                    if (!role)
                        continue;
                    if (rangeH) {
                        if ((role.x > x - range && role.x < x + range) &&
                            (role.y > y - rangeH && role.y < y + rangeH)) {
                            arr.push(role);
                        }
                    }
                    else {
                        if (range == 9999 || DLG.Utils.distance(x, y, role.x, role.y) <= range) {
                            arr.push(role);
                        }
                    }
                }
            }
            else if (type == game.ENUM_DriverType.bullet) {
                var bulletIdList = self.getAllBullet();
                len = bulletIdList.length;
                for (i = 0; i < len; i++) {
                    var bullet = self.getDriverById(bulletIdList[i], game.ENUM_DriverType.bullet);
                    if (!bullet)
                        continue;
                    if (rangeH) {
                        if ((bullet.x > x - range && bullet.x < x + range) &&
                            (bullet.y > y - rangeH && bullet.y < y + rangeH)) {
                            arr.push(bullet);
                        }
                    }
                    else {
                        if (range == 9999 || DLG.Utils.distance(x, y, bullet.x, bullet.y) <= range) {
                            arr.push(bullet);
                        }
                    }
                }
            }
            return arr;
        };
        SceneManager.prototype.changeMap = function (sceneId, showLoadIng) {
            var self = this;
            if (self._sceneId == sceneId) {
                return;
            }
            DLG.DLGCore.panel.close(game.PanelClassConfig.ID_ResultPanel);
            self._loadPanelShowOk = false;
            self._configLoadOk = false;
            if (showLoadIng) {
                DLG.DLGCore.panel.show(game.PanelClassConfig.ID_LoadPanel);
                var loadPanel = DLG.DLGCore.panel.getPanelById(game.PanelClassConfig.ID_LoadPanel);
                loadPanel.startLoad(1, self.loadIngPanelOk, self);
            }
            else {
                self._loadPanelShowOk = true;
            }
            self._sceneId = sceneId;
            game.MainUIManager.getInstance().sceneId = sceneId;
            self.loadMap(sceneId);
        };
        SceneManager.prototype.loadMap = function (sceneId) {
            var self = this;
            self._sceneCfg = game.SceneTable.getCfgById(sceneId);
            var mapname = self._sceneCfg.mapid + '';
            if (self._mapLayer.getMapName() == mapname) {
                self.loadMapCompleteHandler();
                return;
            }
            self._mapLayer.loadMap(mapname, sceneId);
        };
        SceneManager.prototype.addRole = function (index, herovo) {
            var self = this;
            var pointArr = game.SceneData.roleStandPoint;
            var driverdata = self.createDriverData(game.ENUM_DriverType.role);
            driverdata.x = pointArr[index];
            driverdata.y = 780;
            driverdata.index = index;
            driverdata.attr.clear();
            herovo.attr.clone(driverdata.attr);
            driverdata.skills = herovo.skills;
            self.addDriver(driverdata);
            game.FightManager.getInstance().onInitHeroBuff(driverdata);
        };
        SceneManager.prototype.removeRoleByIndex = function (index) {
            var self = this;
            var driverdata;
            var driver;
            var allRoles = self.getAllRoles();
            var i = 0;
            var len = allRoles.length;
            for (i = 0; i < len; i++) {
                driver = self.getDriverById(allRoles[i], game.ENUM_DriverType.role);
                if (driver) {
                    driverdata = driver.getData();
                    if (driverdata.index == index) {
                        self.removeDriver(driver);
                        return;
                    }
                }
            }
        };
        SceneManager.prototype.removeRoleById = function (id) {
            var self = this;
            var driverdata;
            var driver;
            var allRoles = self.getAllRoles();
            var i = 0;
            var len = allRoles.length;
            for (i = 0; i < len; i++) {
                if (allRoles[i] == id) {
                    driver = self.getDriverById(allRoles[i], game.ENUM_DriverType.role);
                    self.removeDriver(driver);
                    return;
                }
            }
        };
        SceneManager.prototype.removeRoleByJob = function (job) {
            var self = this;
            var driverdata;
            var driver;
            var allRoles = self.getAllRoles();
            var i = 0;
            var len = allRoles.length;
            for (i = 0; i < len; i++) {
                driver = self.getDriverById(allRoles[i], game.ENUM_DriverType.role);
                if (driver) {
                    driverdata = driver.getData();
                    if (driverdata.job == job) {
                        self.removeDriver(driver);
                    }
                }
            }
        };
        SceneManager.prototype.getRoleById = function (id) {
            var self = this;
            var driver;
            var allRoles = self.getAllRoles();
            var i = 0;
            var len = allRoles.length;
            for (i = 0; i < len; i++) {
                if (allRoles[i] == id) {
                    driver = self.getDriverById(allRoles[i], game.ENUM_DriverType.role);
                    return driver;
                }
            }
            return null;
        };
        SceneManager.prototype.getRolesByJob = function (job) {
            var roles = [];
            var self = this;
            var driver;
            var driverdata;
            var allRoles = self.getAllRoles();
            var i = 0;
            var len = allRoles.length;
            for (i = 0; i < len; i++) {
                driver = self.getDriverById(allRoles[i], game.ENUM_DriverType.role);
                if (driver) {
                    driverdata = driver.getData();
                    if (driverdata.job == job) {
                        roles.push(driver);
                    }
                }
            }
            return roles;
        };
        SceneManager.prototype.getSceneCfg = function () {
            return this._sceneCfg;
        };
        SceneManager.prototype.getSkillCdMap = function () {
            return this._skillCdMap;
        };
        SceneManager.prototype.clear = function () {
        };
        return SceneManager;
    }());
    SceneManager.showRang = false;
    /**自增id 当大于 Number.MAX_VALUE，设置为10000 */
    SceneManager.ID = 1;
    game.SceneManager = SceneManager;
    __reflect(SceneManager.prototype, "game.SceneManager");
})(game || (game = {}));
//# sourceMappingURL=SceneManager.js.map