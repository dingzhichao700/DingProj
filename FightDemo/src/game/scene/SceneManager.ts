module game {

	export class SceneManager {
		private static _instance: SceneManager
		public static showRang: boolean = false;
		private _mapLayer: SceneMapLayer;
		private _driverLayer: DriverRenderLayer;
		private _effectLayer: egret.Sprite;

		private _sceneId: number;
		private _sceneDta: SceneData;

		private _configLoadOk: boolean;
		private _loadPanelShowOk: boolean;

		/**monster对象池 */
		private _monsterDriverPool: Array<MonsterDriver>;
		/**role对象池 */
		private _roleDriverPool: Array<RoleDriver>;
		private _bulletDriverPool: Array<BulletDriver>;

		/**自增id 当大于 Number.MAX_VALUE，设置为10000 */
		protected static ID: number = 1;

		protected _skillCdMap: Object;
		protected _sceneCfg: SceneCfg;

		public constructor() {
			let self = this;
			self._sceneDta = new SceneData();
			self._monsterDriverPool = [];
			self._roleDriverPool = [];
			self._bulletDriverPool = [];

			self._skillCdMap = {};

			let i: number = 0;
			let len: number = 50;
			for (i = 0; i < len; i++) {
				let driver: MonsterDriver = new MonsterDriver();
				self._monsterDriverPool.push(driver);
			}
			len = 5
			for (i = 0; i < len; i++) {
				let driver: RoleDriver = new RoleDriver();
				self._roleDriverPool.push(driver);
			}
			len = 150
			for (i = 0; i < len; i++) {
				let driver: BulletDriver = new BulletDriver();
				self._bulletDriverPool.push(driver);
			}
			len = 150
			FontBlood._bloodVec = [];
			let arr = FontBlood._bloodVec;
			arr = [];
			for (i = 0; i < len; i++) {
				let blood: FontBlood = new FontBlood();
				arr.push(blood);
			}
		}

		public static getInstance(): SceneManager {
			let self = this;
			if (!self._instance) {
				self._instance = new SceneManager();
			}
			return self._instance;
		}
		
		public initLayer(driverLayer: DriverRenderLayer, mapLayer: SceneMapLayer, _effectLayer: egret.Sprite): void {
			let self = this;
			self._driverLayer = driverLayer;
			self._effectLayer = _effectLayer;
			self._mapLayer = mapLayer;

			self._mapLayer.callBack = self.loadMapCompleteHandler;
			self._mapLayer.callBackTarget = this;
		}
		/**加载完地图成功 回调 */
		protected loadMapCompleteHandler(): void {
			this._configLoadOk = true;
			this.sceneReady();
		}
		public loadIngPanelOk(): void {
			this._loadPanelShowOk = true;
			this.sceneReady();
		}
		protected sceneReady(): void {
			if (LoginManager.getInstance().loadPanelShowOk && this._configLoadOk && this._loadPanelShowOk) {
				let self = this;
				self._mapLayer.x = (GAME_CORE.APP_WIDTH - self._mapLayer.width) / 2;
				self._mapLayer.y = GAME_CORE.APP_HEIGHT - self._mapLayer.height;
				//开始战斗
				FightManager.getInstance().onStart();
			}
		}
		public getEffectLayer(): egret.Sprite {
			return this._effectLayer;
		}
		public getAllMonsterLen(): number {
			let self = this;
			return self._sceneDta.monsterLen;
		}
		public getAllMonster(): Array<number> {
			let self = this;
			return self._sceneDta.monsterIdList;
		}
		public getAllRoles(): Array<number> {
			let self = this;
			return self._sceneDta.roleIdList;
		}
		public getAllBullet(): Array<number> {
			let self = this;
			return self._sceneDta.bulletIdList;
		}
		
		public getDriverById(id: number, type: number): IDriver {
			let self = this;
			let idStr = id + '';

			let _sceneDta: SceneData = self._sceneDta;
			if ((type == ENUM_DriverType.monster || type == undefined) && _sceneDta.monsterDic.hasOwnProperty(idStr)) {
				return _sceneDta.monsterDic[idStr];
			}
			if ((type == ENUM_DriverType.role || type == undefined) && _sceneDta.roleDic.hasOwnProperty(idStr)) {
				return _sceneDta.roleDic[idStr];
			}
			if ((type == ENUM_DriverType.bullet || type == undefined) && _sceneDta.bulletDic.hasOwnProperty(idStr)) {
				return _sceneDta.bulletDic[idStr];
			}
			return null;
		}

		public createDriverData(driverType: number): any {
			let self = this;
			let data: any
			if (driverType == ENUM_DriverType.bullet) {
				data = new BulletData();
			} else if (driverType == ENUM_DriverType.monster) {
				data = new MonsterData();
			} else if (driverType == ENUM_DriverType.role) {
				data = new RoleData();
			}
			data.attr = new AttrData();
			data.buffsAttr = new AttrData();
			data.buffs = [[], [], [], [], []];
			data.driverType = driverType;
			data.id = SceneManager.ID;
			SceneManager.ID++;
			if (data.id == 0) {
				throw new Error('SceneManager_ID值出错')
			}
			if (SceneManager.ID == Number.MAX_VALUE) {
				SceneManager.ID = Number.MIN_VALUE;
			}
			return data;
		}

		public addDriver(driverData: DriverData): IDriver {
			let self = this;
			let type = driverData.driverType
			let driver: IDriver = this.getNewDriverByType(type);
			driver.setData(driverData);
			let sceneData: SceneData = self._sceneDta;
			let layer: number;
			if (type == ENUM_DriverType.monster) {
				sceneData.monsterDic[driver.getData().id + ''] = driver;
				sceneData.monsterLen++;
				sceneData.monsterIdList.push(driver.getData().id);
				layer = ENUM_DriverRenderLayerId.monsterLayer;
			} else if (type == ENUM_DriverType.role) {
				sceneData.roleDic[driver.getData().id + ''] = driver;
				sceneData.roleIdList.push(driver.getData().id);
				layer = ENUM_DriverRenderLayerId.roleLayer;
			} else if (type == ENUM_DriverType.bullet) {
				sceneData.bulletDic[driver.getData().id + ''] = driver;
				sceneData.bulletIdList.push(driver.getData().id);
				layer = ENUM_DriverRenderLayerId.bulletLayer;
			}
			self._driverLayer.addDriver(driver, layer);
			return driver;
		}

		/**清空场上所有对象  */
		public clearDriversByType(type: number): void {
			let self = this;
			let len: number;
			let i: number
			if (type == ENUM_DriverType.monster) {
				len = self.getAllMonsterLen();
				let monsterIdList: Array<number> = self._sceneDta.monsterIdList.concat();
				for (i = 0; i < len; i++) {
					let monster: IDriver = self.getDriverById(monsterIdList[i], ENUM_DriverType.monster);
					if (!monster) continue;
					self.removeDriver(monster);
				}
				monsterIdList.length = 0;
				monsterIdList = null;
			} else if (type == ENUM_DriverType.role) {
				let roleIdList: Array<number> = self.getAllRoles().concat();
				len = roleIdList.length;
				for (i = 0; i < len; i++) {
					let role: IDriver = self.getDriverById(roleIdList[i], ENUM_DriverType.role);
					if (!role) continue;
					self.removeDriver(role);
				}
				roleIdList.length = 0;
				roleIdList = null;
			} else if (type == ENUM_DriverType.bullet) {
				let bulletIdList: Array<number> = self.getAllBullet().concat();
				len = bulletIdList.length;
				for (i = 0; i < len; i++) {
					let bullet: IDriver = self.getDriverById(bulletIdList[i], ENUM_DriverType.bullet);
					if (!bullet) continue;
					self.removeDriver(bullet);
				}
				bulletIdList.length = 0;
				bulletIdList = null;
			}
		}

		public addEffect(effectId: number, playTimes: number, px: number, py: number): void {
			let self = this;
			self._driverLayer.addEffect(effectId, playTimes, px, py);
		}

		public updateWallHp(hp: number, totalHp: number): void {
			let self = this;
			let wall_id: number;
			if (hp / totalHp > 0.8) {
				wall_id = 1;
			}
			self._driverLayer.showWall(wall_id);
		}

		public removeDriverByData(driverData: DriverData): void {
			let self = this;
			let type = driverData.driverType;
			let sceneData: SceneData = self._sceneDta;
			let idStr = driverData.id + '';
			if (type == ENUM_DriverType.monster) {
				sceneData.monsterDic[idStr] = undefined;
				delete sceneData.monsterDic[idStr];
				let index = sceneData.monsterIdList.indexOf(driverData.id);
				if (index != -1) {
					sceneData.monsterIdList.splice(index, 1);
					sceneData.monsterLen--;
				}
				let useSkillAction = DLG.FactoryUtils.getClass(UseSkillAction);
				useSkillAction.clearDriverSkillCD(driverData.id);
			} else if (type == ENUM_DriverType.role) {
				sceneData.roleDic[idStr] = undefined;
				delete sceneData.roleDic[idStr];
				let index = sceneData.roleIdList.indexOf(driverData.id);
				if (index != -1) {
					sceneData.roleIdList.splice(index, 1);
				}
				let useSkillAction = DLG.FactoryUtils.getClass(UseSkillAction);
				useSkillAction.clearDriverSkillCD(driverData.id);
			} else if (type == ENUM_DriverType.bullet) {
				sceneData.bulletDic[idStr] = undefined;
				delete sceneData.bulletDic[idStr];
				let index = sceneData.bulletIdList.indexOf(driverData.id);
				if (index != -1) {
					sceneData.bulletIdList.splice(index, 1);
				}
			}
			let driver: IDriver = self.getDriverById(driverData.id, type);
			// let skillAction:UseSkillAction = DLG.FactoryUtils.getClass(UseSkillAction);

			self._driverLayer.removeDriver(driver);
			self.returnDriverByType(driver);
		}

		public removeDriver(driver: IDriver): void {
			let self = this;
			let driverData: DriverData = driver.getData();
			let type = driverData.driverType;
			let sceneData: SceneData = self._sceneDta;
			let idStr = driverData.id + '';
			if (type == ENUM_DriverType.monster) {
				sceneData.monsterDic[idStr + ''] = undefined;
				delete sceneData.monsterDic[idStr + ''];
				let index = sceneData.monsterIdList.indexOf(driverData.id);
				if (index != -1) {
					sceneData.monsterIdList.splice(index, 1);
					sceneData.monsterLen--;
				}
				let useSkillAction = DLG.FactoryUtils.getClass(UseSkillAction);
				useSkillAction.clearDriverSkillCD(driverData.id);
			} else if (type == ENUM_DriverType.role) {
				sceneData.roleDic[idStr] = undefined;
				delete sceneData.roleDic[idStr];
				let index = sceneData.roleIdList.indexOf(driverData.id);
				if (index != -1) {
					sceneData.roleIdList.splice(index, 1);
				}
				let useSkillAction = DLG.FactoryUtils.getClass(UseSkillAction);
				useSkillAction.clearDriverSkillCD(driverData.id);
			}
			else if (type == ENUM_DriverType.bullet) {
				sceneData.bulletDic[idStr] = undefined;
				delete sceneData.bulletDic[idStr];
				let index = sceneData.bulletIdList.indexOf(driverData.id);
				if (index != -1) {
					sceneData.bulletIdList.splice(index, 1);
				}
			}

			self._driverLayer.removeDriver(driver);
			self.returnDriverByType(driver);
		}

		/**从池里取一个显示对象 */
		protected getNewDriverByType(type: number): IDriver {
			let self = this;
			let driver: IDriver;
			if (type == ENUM_DriverType.monster) {
				if (self._monsterDriverPool.length > 0) {
					return <IDriver>self._monsterDriverPool.pop();
				} else {
					driver = new MonsterDriver();
				}
			} else if (type == ENUM_DriverType.role) {
				if (self._roleDriverPool.length > 0) {
					return <IDriver>self._roleDriverPool.pop();
				} else {
					driver = new RoleDriver();
				}
			} else if (type == ENUM_DriverType.bullet) {
				if (self._bulletDriverPool.length > 0) {
					return <IDriver>self._bulletDriverPool.pop();
				} else {
					driver = new BulletDriver();
				}
			}
			return driver;
		}

		protected returnDriverByType(driver: IDriver): void {
			let self = this;
			if (egret.is(driver, 'MonsterDriver')) {
				self._monsterDriverPool.push(<MonsterDriver>driver);
				// self._driverDataPool.push(driver.getData());
			} else if (egret.is(driver, 'RoleDriver')) {
				self._roleDriverPool.push(<RoleDriver>driver);
				// self._driverDataPool.push(driver.getData());
			} else if (egret.is(driver, 'BulletDriver')) {
				self._bulletDriverPool.push(<BulletDriver>driver);
				// self._bulletDataPool.push(<BulletData>driver.getData());
			}
			driver.clear();
			driver.getData().clear();
			driver.setData(null);
		}

		/**获取指定范围内，某类型的对象
		 *rangeH 如果有值，则查找的是方形范围
		*/
		public getNearRangeDriverByType(type: number, range: number, x: number, y: number, rangeH?: number): Array<IDriver> {
			let arr: Array<IDriver> = [];
			let self = this;
			let len: number;
			let i: number
			if (type == ENUM_DriverType.monster) {
				len = self.getAllMonsterLen();
				let monsterIdList: Array<number> = self._sceneDta.monsterIdList
				for (i = 0; i < len; i++) {
					let monster: IDriver = self.getDriverById(monsterIdList[i], ENUM_DriverType.monster);
					if (!monster) continue;
					if (rangeH) {
						if ((monster.x > x - range && monster.x < x + range) &&
							(monster.y > y - rangeH && monster.y < y + rangeH)) {
							arr.push(monster)
						}
					} else {
						if (range == 9999 || DLG.Utils.distance(x, y, monster.x, monster.y) <= range) {
							arr.push(monster)
						}
					}

				}
			} else if (type == ENUM_DriverType.role) {
				let roleIdList: Array<number> = self.getAllRoles();
				len = roleIdList.length;
				for (i = 0; i < len; i++) {
					let role: IDriver = self.getDriverById(roleIdList[i], ENUM_DriverType.role);
					if (!role) continue;
					if (rangeH) {
						if ((role.x > x - range && role.x < x + range) &&
							(role.y > y - rangeH && role.y < y + rangeH)) {
							arr.push(role)
						}
					} else {
						if (range == 9999 || DLG.Utils.distance(x, y, role.x, role.y) <= range) {
							arr.push(role)
						}
					}
				}

			} else if (type == ENUM_DriverType.bullet) {
				let bulletIdList: Array<number> = self.getAllBullet();
				len = bulletIdList.length;
				for (i = 0; i < len; i++) {
					let bullet: IDriver = self.getDriverById(bulletIdList[i], ENUM_DriverType.bullet);
					if (!bullet) continue;
					if (rangeH) {
						if ((bullet.x > x - range && bullet.x < x + range) &&
							(bullet.y > y - rangeH && bullet.y < y + rangeH)) {
							arr.push(bullet)
						}
					} else {
						if (range == 9999 || DLG.Utils.distance(x, y, bullet.x, bullet.y) <= range) {
							arr.push(bullet)
						}
					}
				}
			}
			return arr
		}

		public changeMap(sceneId: number, showLoadIng: boolean): void {
			let self = this;
			if (self._sceneId == sceneId) {
				return;
			}

			DLG.DLGCore.panel.close(PanelClassConfig.ID_ResultPanel);

			self._loadPanelShowOk = false;
			self._configLoadOk = false;
			if (showLoadIng) {
				DLG.DLGCore.panel.show(PanelClassConfig.ID_LoadPanel);
				let loadPanel: LoadPanel = DLG.DLGCore.panel.getPanelById(PanelClassConfig.ID_LoadPanel) as LoadPanel;
				loadPanel.startLoad(1, self.loadIngPanelOk, self);
			}
			else{
				self._loadPanelShowOk = true;
			}

			self._sceneId = sceneId;
			MainUIManager.getInstance().sceneId = sceneId;
			self.loadMap(sceneId);
		}

		private loadMap(sceneId: number): void {
			let self = this;

			self._sceneCfg = SceneTable.getCfgById<SceneCfg>(sceneId);
			let mapname: string = self._sceneCfg.mapid + '';

			if (self._mapLayer.getMapName() == mapname) {
				self.loadMapCompleteHandler();
				return;
			}
			self._mapLayer.loadMap(mapname, sceneId);
		}

		public addRole(index: number, herovo: HeroVo): void {
			let self = this;
			let driverdata: RoleData = self.createDriverData(ENUM_DriverType.role);
			driverdata.x = SceneData.roleStandPoint[index];
			driverdata.y = 100;
			driverdata.index = index;
			driverdata.attr.clear();
			herovo.attr.clone(driverdata.attr);
			driverdata.skills = herovo.skills;
			self.addDriver(driverdata);
			FightManager.getInstance().onInitHeroBuff(driverdata);
		}

		public removeRoleByIndex(index: number): void {
			let self = this;
			let driverdata: RoleData;
			let driver: IDriver;
			let allRoles: Array<number> = self.getAllRoles();
			let i: number = 0;
			let len: number = allRoles.length;
			for (i = 0; i < len; i++) {
				driver = self.getDriverById(allRoles[i], ENUM_DriverType.role)
				if (driver) {
					driverdata = <RoleData>driver.getData();
					if (driverdata.index == index) {
						self.removeDriver(driver);
						return;
					}
				}
			}
		}

		public removeRoleById(id: number): void {
			let self = this;
			let driverdata: RoleData
			let driver: IDriver
			let allRoles: Array<number> = self.getAllRoles();
			let i: number = 0;
			let len: number = allRoles.length;
			for (i = 0; i < len; i++) {
				if (allRoles[i] == id) {
					driver = self.getDriverById(allRoles[i], ENUM_DriverType.role)
					self.removeDriver(driver);
					return;
				}
			}
		}

		public removeRoleByJob(job: number): void {
			let self = this;
			let driverdata: RoleData
			let driver: IDriver
			let allRoles: Array<number> = self.getAllRoles();
			let i: number = 0;
			let len: number = allRoles.length;
			for (i = 0; i < len; i++) {
				driver = self.getDriverById(allRoles[i], ENUM_DriverType.role)
				if (driver) {
					driverdata = <RoleData>driver.getData();
					if (driverdata.job == job) {
						self.removeDriver(driver);
					}
				}
			}
		}

		public getRoleById(id: number): RoleDriver {
			let self = this;
			let driver: IDriver
			let allRoles: Array<number> = self.getAllRoles();
			let i: number = 0;
			let len: number = allRoles.length;
			for (i = 0; i < len; i++) {
				if (allRoles[i] == id) {
					driver = self.getDriverById(allRoles[i], ENUM_DriverType.role)

					return <RoleDriver>driver;
				}
			}
			return null;
		}

		public getRolesByJob(job: number): Array<RoleDriver> {
			let roles: Array<RoleDriver> = [];
			let self = this;
			let driver: IDriver;
			let driverdata: RoleData
			let allRoles: Array<number> = self.getAllRoles();
			let i: number = 0;
			let len: number = allRoles.length;
			for (i = 0; i < len; i++) {
				driver = self.getDriverById(allRoles[i], ENUM_DriverType.role)
				if (driver) {
					driverdata = <RoleData>driver.getData();
					if (driverdata.job == job) {
						roles.push(<RoleDriver>driver);
					}
				}
			}
			return roles;
		}

		public getSceneCfg(): SceneCfg {
			return this._sceneCfg;
		}

		public getSkillCdMap() {
			return this._skillCdMap;
		}

		public clear(): void {

		}

	}
}