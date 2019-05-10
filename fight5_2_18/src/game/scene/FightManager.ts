module game {
	export class FightManager extends DLG.BaseAction {
		private static _instance: FightManager
	
		protected _isStart: boolean;
		protected m_sceneMar: SceneManager;
		protected m_buffMar: BuffManager;
		/**第几回合 */
		protected _roundNum: number = 0;
		/**最大回合数 */
		protected _roundMaxNum: number = 0;
		/**现在回合中出了多少只怪 */
		protected _monsterNumInRound: number = 0;
		/**现在回合中最多多少只怪 */
		protected _monsterMaxNumInRound: number = 0;
		/**boss在哪一回合里出来 */
		protected _bossBornRound: number;

		/** 挑战boss失败 */
		protected _fightBossFailed: boolean = false;
		
		/**是否正在打boss */
		protected _isFighttingBoss: boolean = false;

		/**是否能打boss关卡 */
		protected _canFightBoss: boolean = false;
		/**可以挑战boss回调 */
		public canFightBossCallBack: Function;
		public canFightBossCallBackTarget: any;
		/**挑战完boss回调 */
		public fightBossCallBack: Function;
		public fightBossCallBackTarget: any;

		protected _useSkillAction: UseSkillAction;
		protected _damageAction: DamageAction;
		/**本关卡中的场景buff */
		protected _sceneHeroBuffs: Array<number>;
		protected _sceneHeroBuffsParame: Array<any>;
		protected _sceneMonsterBuffs: Array<number>;
		protected _sceneMonsterBuffsParame: Array<any>;
	
		/**怪物移动速度减少值 */
		public monsterSpeedCut: number = 0;
		// public quickPutOnBullet: number;
		public monsterNotHit: number = 0;

		private swordLeftTime:number = 0;

		public constructor() {
			super();
			let self = this;
			self.createClock();
			let stage: egret.Stage = DLG.DLGCore.stage;
			stage.addEventListener(egret.Event.ENTER_FRAME, self.checkFightHandler, self);
			stage.addEventListener(egret.TouchEvent.TOUCH_END, self.onClick, self);
			//A
			DLG.KeyBoardManager.getInstance().addListener(self.onFightBoss, self, 65);
			//Q
			DLG.KeyBoardManager.getInstance().addListener(self.test_bigSkillWuYingJian, self, 81);
			//W,剑雨
			DLG.KeyBoardManager.getInstance().addListener(self.doSwordRain, self,87);
		}

		private test_bigSkillWuYingJian(): void {
			let self = this;
			let roleArr: Array<number> = self.m_sceneMar.getAllRoles();
			let len
			len = roleArr.length;
			let i = 0;
			for (i; i < len; i++) {
				let role: IDriver = self.m_sceneMar.getDriverById(roleArr[i], ENUM_DriverType.role);
				if (!role) continue;
				let roleData: RoleData = <RoleData>role.getData();
				if (roleData.skills.indexOf(SkillType.JOB_ZS_10002) != -1) {
					self._useSkillAction.useSkill(role, SkillType.JOB_ZS_10002);
					return;
				}	
			}
		}

		/**剑雨*/
		public doSwordRain(): void{
			if(this.swordLeftTime <= 0){
				return;
			}
			this.swordLeftTime--;
			let self = this;
			let roleArr: Array<number> = self.m_sceneMar.getAllRoles();
			let len
			len = roleArr.length;
			let i = 0;
			for (i; i < len; i++) {
				let role: IDriver = self.m_sceneMar.getDriverById(roleArr[i], ENUM_DriverType.role);
				if (!role) continue;
				let roleData: RoleData = <RoleData>role.getData();
				if (roleData.skills.indexOf(SkillType.JOB_GJS_11002) != -1) {
					self._useSkillAction.useSkill(role, SkillType.JOB_GJS_11002);
					return;
				}	
			}
		}

		public static getInstance(): FightManager {
			let self = this;
			if (!self._instance) {
				self._instance = new FightManager();
			}
			return self._instance;
		}

		public onStop(): void {
			let self = this;
			if (self._isStart !== true) {
				return;
			}
			self._isStart = false;
			self._canFightBoss = false;
			self._fightBossFailed = false;

			self.m_buffMar.onClearSceneHeroBuff();

			self.m_sceneMar.clearDriversByType(ENUM_DriverType.bullet);
			self.m_sceneMar.clearDriversByType(ENUM_DriverType.monster);

			let stage: egret.Stage = DLG.DLGCore.stage;

			stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, self.leaderFightHandler, self);
			stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, self.leaderFightMoveHandler, self);
			stage.removeEventListener(egret.TouchEvent.TOUCH_END, self.leaderStopFightHandler, self);
		}

		private _maxSkillVmcTimes:number = 2;
		private _curSkillVmcTimes:number = 0;
		private _initGap:number = 4000;
		private _startTime:number;

		public onStart(): void {
			let self = this;
			self.onStop();

			this.swordLeftTime = 1;
			if (self._isStart) {
				// debug("已经开了战斗，不需要再重复调用 start");
				return;
			}
			DLG.DLGCore.panel.close(PanelClassConfig.ID_SkillVmcPanel);
			self._curSkillVmcTimes = 0;
			self._startTime = egret.getTimer();
			self._initGap = 4000;
			self._isStart = true;
			self.m_sceneMar = SceneManager.getInstance();
			self.m_buffMar = BuffManager.getInstance();
			self._useSkillAction = DLG.FactoryUtils.getClass(UseSkillAction);
			self._damageAction = DLG.FactoryUtils.getClass(DamageAction);
			self.createSceneBuff();

			let sceneMar = SceneManager.getInstance();
			let heroArr: Array<number> = sceneMar.getAllRoles();
			let i:number = 0;
			let len:number = heroArr.length;;
			for( i=0; i < len ; i++) {
				let role: IDriver = sceneMar.getDriverById(heroArr[i], ENUM_DriverType.role);
				if (!role) continue;
				let roleData: DriverData = role.getData();
				self.onInitHeroBuff(<RoleData>roleData);
			}

			self._isFighttingBoss = false;
			if (self._fightBossFailed == false) {
				let monsterMaxArr = self.m_sceneMar.getSceneCfg().roundMonsterNum.split("|");
				// self._roundMaxNum = monsterMaxArr.length;
				self._roundMaxNum = 1;

				let probability = SceneData.borntBossWeight[self._roundMaxNum];
				self._bossBornRound = DLG.Utils.probabilityIndex(probability) + 1;

			} else {
				self._roundMaxNum = 0
				self._bossBornRound = 0;
			}
		
			self._roundNum = 0;
			self.nextRound();
			self.m_sceneMar.updateWallHp(1000, 1000);
			let stage: egret.Stage = DLG.DLGCore.stage;
			stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, self.leaderFightHandler, self);
			stage.addEventListener(egret.TouchEvent.TOUCH_END, self.leaderStopFightHandler, self);
			stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, self.leaderFightMoveHandler, self);
		}

		public onClick(): void {
			this.doAttack();
		}
		
		/**挑战boss */
		public onFightBoss(): void {
			let self = this;
			if (self._canFightBoss == false)
			{
				// debug('三波小怪还没有打完');
				return;
			}	
			// debug("开始打boss");
			self.m_sceneMar.clearDriversByType(ENUM_DriverType.bullet);
			self.m_sceneMar.clearDriversByType(ENUM_DriverType.monster);
			self._isFighttingBoss = true;
			self._fightBossFailed = false;
			self._roundNum = 0;
			self.nextRound();
		}
		private createSceneBuff(): void {
			let self = this;
			self._sceneHeroBuffs = [];
			self._sceneMonsterBuffs = [];

			self._sceneHeroBuffsParame = [];
			self._sceneMonsterBuffsParame = [];

			let sceneCfg: SceneCfg = self.m_sceneMar.getSceneCfg();
			// let skillsnum = sceneCfg.skillsnumber
			let sceneBuffs: Array<string> = sceneCfg.buffIds.split("|");
			let sceneBuffHold: Array<string> = sceneCfg.buffHold.split('|');
			let buf_attack_nums: Array<string> = sceneCfg.buf_attack_num.split('|');
			let buf_attack_pers: Array<string> = sceneCfg.buf_attack_per.split('|');

			let len: number;
			len = sceneCfg.buffNum
			if (len == sceneBuffs.length) {
				let i: number = 0;
				let len: number = sceneBuffs.length;
				for (i = 0; i < len; i++) {
					if (sceneBuffHold[i] == '1') {
						self._sceneHeroBuffs.push(parseInt(sceneBuffs[i]));
						self._sceneHeroBuffsParame.push([buf_attack_nums[i], buf_attack_pers[i]]);
					} else {
						self._sceneMonsterBuffs.push(parseInt(sceneBuffs[i]));
						self._sceneMonsterBuffsParame.push([buf_attack_nums[i], buf_attack_pers[i]]);
					}
				}
			} else {
				while (self._sceneHeroBuffs.length + self._sceneMonsterBuffs.length < len) {
					let index: number = DLG.Utils.random(0, sceneBuffs.length - 1);
					let buff: number = parseInt(sceneBuffs[index]);
					let buf_attack_num = parseInt(buf_attack_nums[index]);
					let buf_attack_per = parseInt(buf_attack_pers[index]);
					if (sceneBuffHold[index] == '1') {
						self._sceneHeroBuffs.push(buff);
						self._sceneHeroBuffsParame.push([buf_attack_nums[index], buf_attack_pers[index]]);
					
					} else {
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
		}
	
		protected doAttack(): void {
			let self = this;
			let roleArr: Array<number> = self.m_sceneMar.getAllRoles();
			
			for (let i = 0; i < roleArr.length; i++) {
				let role: IDriver = self.m_sceneMar.getDriverById(roleArr[i], ENUM_DriverType.role);
				if (!role)
					continue;

				let roleData: RoleData = <RoleData>role.getData();
				let canAttackMonster: Array<IDriver> = [];
				let len = self.m_sceneMar.getAllMonsterLen();
				let monsterArr: Array<number> = self.m_sceneMar.getAllMonster();
				for (let j = 0; j < len; j++) {
					let monster: IDriver = self.m_sceneMar.getDriverById(monsterArr[j], ENUM_DriverType.monster);
					if (monster.getData().y > 80) {
						canAttackMonster.push(monster);
					}
				}
				if (canAttackMonster.length > 0) {
					let monster: IDriver = canAttackMonster[0];
					if (monster) {
						let monsterData: DriverData = monster.getData();
						role.attack(roleData.skills[0], monsterData.x, monsterData.y);
					}
				}
			}
		}

		protected currentCount: number = 0;
		protected checkFightHandler(event: egret.Event): void {
			let self = this;
			if (!self.m_sceneMar) {
				return;
			}	

			let dataT = self.m_clock.getTime();
			self.currentCount++;
			let currentCount = self.currentCount;
			/*if(self._curSkillVmcTimes < self._maxSkillVmcTimes) {
				if(DLG.DLGCore.panel.getPanelById(PanelClassConfig.ID_GuidePanel) || DLG.DLGCore.panel.getPanelById(PanelClassConfig.ID_WelcomePanel)){
					self._startTime = egret.getTimer();
				}else{
					let gap:number = egret.getTimer() - self._startTime;
					let curGap:number = self._initGap - 1000*self._curSkillVmcTimes;
					curGap  = self._curSkillVmcTimes== 0 ? curGap : curGap + 2500; 
					curGap = Math.max(curGap,2500) ;
					if(gap >= curGap){
						self._startTime = egret.getTimer();
						self._curSkillVmcTimes += 1;
						self.createSkillVmc();
					}
				}	
			}*/

			let monsterArr: Array<number> = self.m_sceneMar.getAllMonster();
			let monsterMap: Array<Array<IDriver>> = [[], [], [], [], [], [], [], [], [], []];
			let canAttackMonster: Array<IDriver> = [];
			let i: number = 0;
			let len: number
			if (self._isStart) {
				len = self.m_sceneMar.getAllMonsterLen();
				if ((self._fightBossFailed == false && self._canFightBoss == false) ||
					(self._canFightBoss == true && self._isFighttingBoss == true)
				) {
					if (currentCount % 20 == 0) {
						self.createRoundMonster();
					}
					if (self._monsterNumInRound >= self._monsterMaxNumInRound && len <= 3) {
						//本回合快打完后，刷下一回合的怪。
						if (self._roundMaxNum > self._roundNum) {
							self.nextRound();
						} else {
							if (len == 0) {
								if (self._isFighttingBoss == true) {
									// debug("本关卡已经打完所有的怪物");
									self.onStop();
									if (self.fightBossCallBack) {
										self.fightBossCallBack.call(self.fightBossCallBackTarget, 1);
									}
									self.m_clock.addTime(3000, 1, self.onStart, self, null);
								} else {
									// debug("打够小怪波数后，可以进入打boss");
									self._canFightBoss = true;
									if (self.canFightBossCallBack) {
										self.canFightBossCallBack.call(self.canFightBossCallBackTarget);
									}
									// self.m_clock.addTime(3000, 1, self.onFightBoss, self, null);///////////////////////////

									self.onStop();
									DLG.DLGCore.panel.show(PanelClassConfig.ID_ResultPanel);
									MissonIManager.getInstance().updateMissionStatus(MainUIManager.getInstance().sceneId);
								}
							}
						}
					}
				} else {
					if (len <= 3) {
						self.createRoundMonster();
					}
				}
				//怪物是否可以攻击，性能优化，500ms攻击一次
				let checkAttack: boolean = currentCount % 25 == 0;
			
				for (i = 0; i < len; i++) {
					let monster: IDriver = self.m_sceneMar.getDriverById(monsterArr[i], ENUM_DriverType.monster);
					if (!monster) continue;
					let monsterData: MonsterData = <MonsterData>monster.getData();
					if (monsterData.isSwoonTime == undefined) {
						if (monsterData.isBoss) {
							if (monsterData.y < monsterData.targetY && monster.isAttack() == false) {
								monster.run();
								monster.move();
							} else {
								if (checkAttack && self._useSkillAction.checkSkillIsCD(monsterData.id, monsterData.skills[0]) == false) {
									monster.attack(monsterData.skills[0], 0, 0,self.monsterNotHit);
								}
							}
						} else {
							if (monster.isAttack() == false) {
								if (monsterData.distance == 2) {
									if (checkAttack && self._useSkillAction.checkCanUseSkill(monsterData.id, monsterData.skills[0], SceneData.boundary - monsterData.y)) {
										monster.attack(monsterData.skills[0], 0, 0,self.monsterNotHit);
									} else {
										if (monsterData.y < monsterData.targetY) {
											monster.run();
											monster.move();
										}
									}
								} else {
									if (monsterData.y < monsterData.targetY) {
										monster.run();
										monster.move();
									} else if(checkAttack && self._useSkillAction.checkSkillIsCD(monsterData.id, monsterData.skills[0]) == false) {
										monster.attack(monsterData.skills[0], 0, 0,self.monsterNotHit);
									}
								}	
							}
						}
					} else {
						if (dataT - monsterData.isSwoonTime > 0) {
							monsterData.isSwoonTime = undefined;
						}	
					}	
				
					if (monsterData.y > 0) {
						let index = Math.floor(monsterData.y / 100);
						monsterMap[index].push(monster);
					}
					if (monsterData.y > 80) {
						canAttackMonster.push(monster);
					}
				}
				//Y排序
				if (currentCount % 10 == 0) {
					let ml: number = 0;
					let mLen: number = monsterMap.length;
					for (ml = 0; ml < mLen; ml++) {
						DLG.SortTools.sortMap(monsterMap[ml], 'y', false);
					}
					DLG.SortTools.sortMap(canAttackMonster, 'y', false);
				}
			}

			let bulletArr: Array<number> = self.m_sceneMar.getAllBullet();
			i = 0;
			len = bulletArr.length;
			let gameWidth: number = GAME_CORE.APP_WIDTH;
			b: for (i = 0; i < len;) {
				let bullet: IDriver = self.m_sceneMar.getDriverById(bulletArr[i], ENUM_DriverType.bullet);
				if (!bullet) continue b;
				let bulletData: BulletData = <BulletData>bullet.getData();
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
				let index = Math.floor(bulletData.y / 100);
				if (index < 0) index = 0
				let m: number = 0;
				index = index >= monsterMap.length ? monsterMap.length-1 : index;
				let checkHitMonster: Array<IDriver> = monsterMap[index].concat();
				if (index != 0) {
					checkHitMonster = checkHitMonster.concat(monsterMap[index - 1])
				}
				if (index != monsterMap.length - 1) {
					checkHitMonster = checkHitMonster.concat(monsterMap[index + 1])
				}
				let mLen: number = checkHitMonster.length;
				m: for (m = 0; m < mLen; m++) {
					let monster: MonsterDriver = <MonsterDriver>checkHitMonster[m];
					if (monster == null) continue m;
					let monsterData: MonsterData = <MonsterData>monster.getData();
				
					if (monsterData) {
						let hp = monsterData.attr.getValue(Enum_Attr.hp);
						if (hp <= 0) {
							self.m_sceneMar.removeDriver(monster);
							continue m;
						}
						if (bulletData.isPierce) {
							if (bulletData.hitTargetIds.length >= bulletData.pierceMaxNum)
							{
								continue m;
							}
							if (bulletData.hitTargetIds.indexOf(monsterData.id) != -1) {
								continue m;
							}
						}
						let mw = monsterData.byAttackRangeW;
						let mh = monsterData.byAttackRangeH;
						let py = monsterData.byAttackRangeY;
						let bds = bulletData.moveAttackRange;
						let mpy = monsterData.y + py;
						if (mpy + mh + bds > bulletData.y && mpy - mh - bds < bulletData.y &&
							monsterData.x + mw > bulletData.x && monsterData.x - mw < bulletData.x) {
							
							self._damageAction.damageBulletAttack(bulletData, monster);

							if (bulletData.isPierce) {
								//穿透子弹
								bulletData.hitTargetIds.push(monsterData.id);
							} else {
								self.m_sceneMar.removeDriver(bullet);
								len = bulletArr.length;
							}
							if (monsterData.attr.getValue(Enum_Attr.hp) <= 0) {
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
		}

		private getMiniNearMonster(monsterArr: Array<IDriver>, roleData: DriverData): IDriver {
			let skillDistance: number = 620;
			let j: number = 0;
		
			let byAttackMonster: IDriver;
			let d: number = 999999;
			//性取优化，只取20个来检测。
			let jLen: number = monsterArr.length > 20 ? 20 : monsterArr.length;
			for (j = 0; j < jLen; j++) {
				let monster: IDriver = monsterArr[j];
				let monsterData: DriverData = monster.getData();
				if (monsterData && roleData.y - monsterData.y <= skillDistance) {
					let distance: number = DLG.Utils.distance(roleData.x, roleData.y, monsterData.x, monsterData.y);
					if (d > distance) {
						byAttackMonster = monster;
						d = distance;
					}
				}
			}
			return byAttackMonster;
		}
	
		protected nextRound(): void {
			let self = this;
			self._roundNum++;
			// debug('当前刷出第 ' + self._roundNum + '波小怪');
			let monsterMaxArr = self.m_sceneMar.getSceneCfg().roundMonsterNum.split("|");
			self._monsterMaxNumInRound = parseInt(monsterMaxArr[self._roundNum - 1]);
			self._monsterNumInRound = 0;
			let sceneCfg: SceneCfg = self.m_sceneMar.getSceneCfg();
			let monsterIds: string[] = sceneCfg.monster.split('|');
		
			if (self._canFightBoss && self._roundNum == self._bossBornRound) {
				let driverdata: MonsterData = self.bornMonsterData(true, parseInt(monsterIds[monsterIds.length - 1]));
				self.m_sceneMar.addDriver(driverdata);
			}
			self.createRoundMonster();
		}

		/**产生一小波怪*/
		private createRoundMonster(): void {
			let self = this;
			let i: number = 0;
			let len: number = Math.ceil(Math.random() * 5);
			if ((self._fightBossFailed == false && self._canFightBoss == false) ||
				(self._canFightBoss == true && self._isFighttingBoss == true)
			) {
				let maxLen = self._monsterMaxNumInRound - self._monsterNumInRound;
				if (len > maxLen) {
					len = maxLen;
				}
				if (self._monsterNumInRound >= self._monsterMaxNumInRound) {
					//如果回合中，怪物出现的数量大于等于 总数量，则判断进入下一回合。
					return;
				}
			}
		
			let sceneCfg: SceneCfg = self.m_sceneMar.getSceneCfg();
			let monsterIds: string[] = sceneCfg.monster.split('|');
		
			for (i = 0; i < len; i++) {
				let driverdata: MonsterData = self.bornMonsterData(false, parseInt(monsterIds[Math.floor(Math.random() * (monsterIds.length - 1))]));
				self.m_sceneMar.addDriver(driverdata);
			}
			self._monsterNumInRound += len;
			monsterIds.length = 0;
			monsterIds = null;
		}

		private createSkillVmc():void{
			DLG.DLGCore.panel.show(PanelClassConfig.ID_SkillVmcPanel);
		}

		/**每个关卡的时候，给人物增加场景中的buff */
		public onInitHeroBuff(driverdata:RoleData): void {
			let self = this;
			//给场景上的人物增加buff
			// let sceneCfg: SceneCfg = self.m_sceneMar.getSceneCfg();
			let buffs: Array<number> = self._sceneHeroBuffs;
			let parame = self._sceneHeroBuffsParame;
			let i: number = 0;
			let iLen: number = buffs.length;
			for (i = 0; i < iLen; i++) {
				if (buffs[i] == 11501) {
					//队长攻击力减少20%，队友攻击力增加10%
					if (driverdata.isLeader) {
						self.m_buffMar.onAddBuffToTargetData(driverdata, ENUM_BuffEffect.ATTACK, 86400000, 0, -2000);
					} else {
						self.m_buffMar.onAddBuffToTargetData(driverdata, ENUM_BuffEffect.ATTACK, 86400000, 0, 1000);
					}
				} else if(buffs[i] == 11601) {
					//队长攻击力增加10%，队友攻击力减少20%
					if (driverdata.isLeader) {
						self.m_buffMar.onAddBuffToTargetData(driverdata, ENUM_BuffEffect.ATTACK, 86400000, 0, 1000);
					} else {
						self.m_buffMar.onAddBuffToTargetData(driverdata, ENUM_BuffEffect.ATTACK, 86400000, 0, -2000);
					}
				} else {
					self.m_buffMar.onAddBuffToTargetData(driverdata, buffs[i], 86400000, parseInt(parame[0]), parseInt(parame[1]));
				}	
			}
			self.m_buffMar.onActionTargetBuff(driverdata, Enum_BuffTrigger.create);
		}

		/**生出一只怪的数据 */
		private bornMonsterData(isBoss: boolean, mid: number): MonsterData {
			let self = this;
			let tmpPointArr = SceneData.roleStandPoint;
			let driverdata: MonsterData = self.m_sceneMar.createDriverData(ENUM_DriverType.monster);
			let rangArr;
			let px: number = DLG.Utils.random(-80, 80);

			driverdata.y = 0;

			let monsterCfg: MonsterCfg = MonsterTable.getCfgById<MonsterCfg>(mid);
			driverdata.attr.setValue(Enum_Attr.speed, monsterCfg.speed - self.monsterSpeedCut);
			driverdata.movieName = monsterCfg.movieName;
			driverdata.monsterCfgId = monsterCfg.id;
			driverdata.distance = monsterCfg.distance;
			if (isBoss) {
				if (Math.random() > 0.5) {
					driverdata.x = tmpPointArr[1] + px;
				} else {
					driverdata.x = tmpPointArr[2] + px;
				}
				driverdata.isBoss = true;
			} else {
				driverdata.x = tmpPointArr[Math.floor((Math.random() * 5))] + px;
			}
			driverdata.attr.setValue(Enum_Attr.hp, monsterCfg.hp);
			driverdata.attr.setValue(Enum_Attr.totalHp, monsterCfg.hp);
			driverdata.attr.setValue(Enum_Attr.def, monsterCfg.def);
			driverdata.attr.setValue(Enum_Attr.magicdefense, monsterCfg.magicdefense);
			driverdata.attr.setValue(Enum_Attr.attack, monsterCfg.attack);
			driverdata.attr.setValue(Enum_Attr.hit, monsterCfg.hit);
			driverdata.attr.setValue(Enum_Attr.resistcrit, monsterCfg.resistcrit);
			driverdata.attr.setValue(Enum_Attr.resistdamage, monsterCfg.resistdamage);
			rangArr = monsterCfg.hitRange.split('|');
			driverdata.byAttackRangeW = parseInt(rangArr[0]);
			driverdata.byAttackRangeH = parseInt(rangArr[1]);
			driverdata.byAttackRangeY = parseInt(rangArr[2]);
			if (driverdata.isBoss) {
				let monsterskills: Array<string> = monsterCfg.monsterskills.split("|");
				let skills = [];
				skills.push(parseInt(monsterskills[0]));
				monsterskills.splice(0, 1);
				let len: number;
				len = monsterCfg.skillsnumber;
				while (skills.length < len) {
					let index: number = DLG.Utils.random(0, monsterskills.length - 1);
					let skill: number = parseInt(monsterskills[index]);
					monsterskills.splice(index, 1)
					skills.push(skill);
				}
				monsterskills.length = 0;
				monsterskills = null;
				driverdata.skills = skills;
				driverdata.targetY = SceneData.boundary + DLG.Utils.random(0, 15);
			} else {
				driverdata.skills = [parseInt(monsterCfg.monsterskills)];
				let skillcfg: SkillCfg = SkillTable.getCfgById<SkillCfg>(driverdata.skills[0]);
				// if (skillcfg && skillcfg.range > 200) {
				if(monsterCfg.distance == 2){
					driverdata.targetY = SceneData.boundary - DLG.Utils.random(skillcfg.distance * 0.3, skillcfg.distance * 0.4);
				} else {
					driverdata.targetY = SceneData.boundary + DLG.Utils.random(-15, 15);
				}
			}
			let sceneCfg: SceneCfg = self.m_sceneMar.getSceneCfg();
			let buffs: Array<number> = self._sceneMonsterBuffs;
			let parame = self._sceneMonsterBuffsParame;
			let i: number = 0;
			let iLen: number = buffs.length;
			for (i = 0; i < iLen; i++) {
				self.m_buffMar.onAddBuffToTargetData(driverdata, buffs[i], 86400000, parseInt(parame[0]), parseInt(parame[1]));
			}
			self.m_buffMar.onActionTargetBuff(driverdata, Enum_BuffTrigger.create);

			rangArr.length = 0;
			rangArr = null;
			return driverdata;
		}

		/**本关卡中，是否挑战boss失败 */
		public getFightBossFailed(): boolean {
			return this._fightBossFailed;
		}

		/**主角是否可以射击 */
		private _leaderCanFight: boolean = false;
		/**主角射击的X Y坐标 */
		private touchStageX: number;
		private touchStageY: number;

		private leaderStopFightHandler(e: egret.TouchEvent): void {
			let self = this;
			if (self._leaderCanFight == true) {
				DLG.DLGCore.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, self.leaderFightMoveHandler, self);
			}
			self._leaderCanFight = false;
		}

		private leaderFightHandler(e: egret.TouchEvent): void {
			let self = this;
			if (self._isStart != true) {
				return;
			}
			let roleArr: Array<number> = self.m_sceneMar.getAllRoles();
			let role: IDriver = self.m_sceneMar.getDriverById(roleArr[0], ENUM_DriverType.role);

			let roleData: DriverData = role.getData();
			let isAttackMonster: boolean = false;

			self._leaderCanFight = true;
		
			self.touchStageX = e.stageX;
			self.touchStageY = e.stageY;
			if (self.touchStageY < SceneData.boundary) {
				self.touchStageY = SceneData.boundary - 100;
			}
			if (self._useSkillAction.checkSkillIsCD(roleData.id, roleData.skills[0]) == false) {
				role.attack(roleData.skills[0], self.touchStageX, self.touchStageY);
				isAttackMonster = true;
			}
		}

		private leaderFightMoveHandler(event: egret.TouchEvent): void {
			let self = this;
			if (self._leaderCanFight == true) {
				self.touchStageX = event.stageX;
				self.touchStageY = event.stageY;
			}
		}
	
	}
}