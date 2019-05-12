module game {
	export class UseSkillAction extends DLG.BaseAction {
		protected m_sceneMar: SceneManager;
		protected _damageAction: DamageAction;
		public constructor() {
			super();
			let self = this;
			self.createClock();
			self.m_sceneMar = SceneManager.getInstance();
			self._damageAction = DLG.FactoryUtils.getClass(DamageAction);
		}
		private wuYingJianCount: number;
		private wuYingJianTimeId: number;
		/**无影剑 */
		private bigSkillWuYingJian(driverData: RoleData, skillHurtDamage: number,effectId:number): void
		{
			let self = this;
			
			self.wuYingJianCount --;
			if (self.wuYingJianCount <= 0)
			{
				if (self.wuYingJianTimeId)
				{
					self.m_clock.removeTime(self.wuYingJianTimeId);
					self.wuYingJianTimeId = undefined;
				}	
				return;
			} else {
				if (self.wuYingJianTimeId == undefined)
				{
					self.wuYingJianTimeId = self.m_clock.addTime(100, 0, self.bigSkillWuYingJian, self, [driverData, skillHurtDamage,effectId], true);
				}
			}
			let monsterArr: Array<number> = self.m_sceneMar.getAllMonster().concat();
			let monster: IDriver
			let redo: boolean = true;
			while (redo && monsterArr.length > 0)
			{
				let index: number = DLG.Utils.random(0, monsterArr.length - 1);
				let id: number = monsterArr[index];
				monster = self.m_sceneMar.getDriverById(id, ENUM_DriverType.monster);
				let monsterData: MonsterData = <MonsterData>monster.getData();
				if (monsterData.attr.getValue(Enum_Attr.hp) > 0)
				{
					redo = false;
					self.wuYingJianCount--;
					let hurtData: HurtData = HurtData.getHurtData();
					let damageAction: DamageAction = DLG.FactoryUtils.getClass(DamageAction);
					damageAction.hurtValue(hurtData,driverData.job, driverData.attr,monsterData.attr, monsterData.buffsAttr,
						0, 0, 0, skillHurtDamage, 1);
					damageAction.playHurtResult(<MonsterDriver>monster, hurtData, effectId);
					HurtData.returnHurtData(hurtData);
				} else
				{
					monsterArr.splice(index, 1);
					if (monsterArr.length <= 0)
					{
						self.wuYingJianCount = 0
						redo = false;
					}	
				}	
			}
			monsterArr.length = 0;
			monsterArr = null;
		}
		private swordRainCount: number;
		/**剑雨 */
		private bigSkillJianRain(driverData:RoleData, count:number,skillHurtDamage:number):void
		{
			let self = this;
			self.swordRainCount = count;
			let ncount;
			if (self.swordRainCount > 5)
			{
				ncount = 5;
				self.swordRainCount -= 5;
			} else
			{
				ncount = self.swordRainCount;
				self.swordRainCount = 0;
			}
			self.createWwordRain(driverData, ncount, skillHurtDamage);
			
		}
		private createWwordRain(driverData:RoleData,count:number,skillHurtDamage:number): void
		{
			let self = this;
			let skillCfg: SkillCfg = SkillTable.getCfgById<SkillCfg>(SkillType.JOB_GJS_11002);
			let bulletId: number = skillCfg.bullet;
			bulletId = 10001;
			let bulletCfg: BulletCfg = BulletTable.getCfgById<BulletCfg>(bulletId);
			let tmpPointArr = SceneData.roleStandPoint;
			let i:number = 0;
			let len: number = count > tmpPointArr.length ? tmpPointArr.length : count;
			for( i=0; i < len ; i++)
			{
				let px: number = DLG.Utils.random(-40, 40);
				self.addBullet(driverData, 1, 0, bulletCfg, false, false, skillHurtDamage,tmpPointArr[Math.floor(i)] + px, driverData.y);
			}
			if (self.swordRainCount > 0)
			{
				let ncount;
				if (self.swordRainCount > 5)
				{
					ncount = 5;
					self.swordRainCount -= 5;
				} else
				{
					ncount = self.swordRainCount;
					self.swordRainCount = 0;
				}	
				self.m_clock.addTime(100, 1, self.createWwordRain, self, [driverData, ncount, skillHurtDamage], true);
			}	
			
		}
		/**呐喊 */
		public bigSkillNahan(time: number, skillHurtDamage: number): void
		{
			let self = this;
			let roleArr: Array<number> = self.m_sceneMar.getAllRoles();
			let len:number
			len = roleArr.length;
			let i:number
			for (i; i < len; i++) {
				let role: IDriver = self.m_sceneMar.getDriverById(roleArr[i], ENUM_DriverType.role);
				if (!role) continue;
				let roleData: DriverData = role.getData();
				let buff: BuffData = BuffManager.getInstance().onAddBuffToTargetData(roleData, 1028, 6000, 0, skillHurtDamage);
				buff.touch();
			}
		}
		/**冲击波  */
		public bigSkillChongJiBo(time: number): void
		{
			let self = this;
			let monsterArr: Array<number> = self.m_sceneMar.getAllMonster();
			let monster: IDriver

			let i:number = 0;
			let len:number = monsterArr.length;
			for( i=0; i < len ; i++)
			{
				monster = self.m_sceneMar.getDriverById(monsterArr[i], ENUM_DriverType.monster);
				if (!monster) continue;
				let monsterData: MonsterData = <MonsterData>monster.getData();
				if (monsterData.attr.getValue(Enum_Attr.hp) > 0)
				{
					let buff: BuffData = BuffManager.getInstance().onAddBuffToTargetData(monsterData, 11101, 6000, 0, 0);
					buff.touch();	
				}
			}
		}
		/**暴风雪 */
		public bigSkillBaoFeng(driverData: RoleData,skillHurtDamage: number,effectId): void
		{
			let self = this;
			let monsterArr: Array<number> = self.m_sceneMar.getAllMonster();
			let monster: IDriver

			let i:number = 0;
			let len:number = monsterArr.length;
			for( i=0; i < len ; i++)
			{
				monster = self.m_sceneMar.getDriverById(monsterArr[i], ENUM_DriverType.monster);
				if (!monster) continue;
				let monsterData: MonsterData = <MonsterData>monster.getData();
				if (monsterData.attr.getValue(Enum_Attr.hp) > 0)
				{
					let hurtData: HurtData = HurtData.getHurtData();
					let damageAction: DamageAction = DLG.FactoryUtils.getClass(DamageAction);
					damageAction.hurtValue(hurtData,driverData.job, driverData.attr,monsterData.attr, monsterData.buffsAttr,
						0, 0, 0, skillHurtDamage, 1);
					damageAction.playHurtResult(<MonsterDriver>monster, hurtData, effectId);
					HurtData.returnHurtData(hurtData);
				}
			}
		}
		
		private onPutOnBullet(driverdata: RoleData): void
		{
			driverdata.bulletCurrent = driverdata.bulletCountMax;
		}
		/**产生子弹 */
		private createBullet(driverdata: RoleData, bulletId: number): void {
			let self = this;
			
			if (driverdata.expendDoubleBulletRatio)
			{
				if (Math.random() * 1000 < driverdata.expendDoubleBulletRatio)
				{
					driverdata.bulletCurrent -= 2;
				}
				else
				{
					driverdata.bulletCurrent--;
				}	
			} else
			{
				driverdata.bulletCurrent--;
			}	
			//todo  更新界面上的子弹显示
			if (driverdata.bulletCurrent == 0)
			{
				//是否可以快速装弹
				if (Math.random() < HeroManager.getInstance().getQuickPutOnBullet())
				{
					self.onPutOnBullet(driverdata);
				} else
				{
					let p_time = driverdata.putOnBulletCDTime;
					p_time += driverdata.putOnBulletCDTimeEx;
					self.m_clock.addTime(p_time, 1, self.onPutOnBullet, self, driverdata);
				}	
			}	
			if (driverdata.job == ENUM_JOB_TYPE.job_ZS) {
				let bulletCfg: BulletCfg = BulletTable.getCfgById<BulletCfg>(bulletId);
				let angle: number = Math.atan2(driverdata.y - driverdata.attackPy, driverdata.x - driverdata.attackPx) * 180 / Math.PI - 90;
				let b_ratio = Math.random() * 10000;
				let doubleTimes: number = 1;
				if (b_ratio > driverdata.doubleRatio) {
					doubleTimes = 2
				}
				let isBigWeapon: boolean = false;
				let b_count: number = 1;
				if (driverdata.bigWeaponHaveTimes) {
					//巨型武器
					bulletId = 13002;
					isBigWeapon = true;
					driverdata.bigWeaponHaveTimes--;
				} else {
					if (driverdata.skills.indexOf(SkillType.JOB_ZS_10010) != -1) {
						let r = Math.random() * 10000;
						if (r < driverdata.bigWeaponRatio) {
							//巨型武器
							bulletId = 13002;
							isBigWeapon = true;
						}
					}
				}
				let i: number = 0;
				let len: number = doubleTimes;
				for (i = 0; i < len; i++) {
					let b_count: number = 1;
					let r = Math.random() * 10000;
					let threeRatio: number = driverdata.canThreeRatio;
					if (r < threeRatio) {
						b_count = 3
					}
					if (i == 0) {
						self.addBullet(driverdata, b_count, angle, bulletCfg,false,isBigWeapon);
					} else {
						self.m_clock.addTime(50* i, 1, self.addBullet, self, [driverdata, b_count, angle, bulletCfg,false,isBigWeapon], true);
					}
				}
			} else if (driverdata.job == ENUM_JOB_TYPE.JOB_GJS) {
				let bulletCfg: BulletCfg = BulletTable.getCfgById<BulletCfg>(bulletId);
				let angle: number = Math.atan2(driverdata.y - driverdata.attackPy, driverdata.x - driverdata.attackPx) * 180 / Math.PI - 90;
				let b_count: number = 1;
				if (driverdata.infiniteArrowTimes) {
					driverdata.infiniteArrowTimes--;
					b_count = 3;
				} else {
					let r = Math.random() * 10000;
					let threeRatio: number = driverdata.canThreeRatio;
					let fiveRatio: number = driverdata.canFiveRatio;
					if (r < fiveRatio) {
						b_count = 5;
						// debug("触发分裂箭");
					} else {
						r = Math.random() * 10000;
						if (r < threeRatio) {
							b_count = 3;
							// debug("触发额外射击");
						}
					}
				}
				self.addBullet(driverdata, b_count, angle, bulletCfg);
			} else if (driverdata.job == ENUM_JOB_TYPE.JOB_CK) {
				let bulletCfg: BulletCfg = BulletTable.getCfgById<BulletCfg>(bulletId);
				let angle: number = Math.atan2(driverdata.y - driverdata.attackPy, driverdata.x - driverdata.attackPx) * 180 / Math.PI - 90;
				//子弹是满的，并且有先发制人 概率存在
				//todo
				let firstHurt: boolean = false;

				let b_count: number = 1;
				let r = Math.random() * 10000;
				let threeRatio: number = driverdata.canThreeRatio;
				if (r < threeRatio) {
					b_count = 3
				}
				self.addBullet(driverdata, b_count, angle, bulletCfg, firstHurt);
			} else if (driverdata.job == ENUM_JOB_TYPE.JOB_FS) {
				
				// let isBigWeapon: boolean = false;
				let b_count: number = 1;
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
				let isMolotov: boolean = false;
				// if (isBigWeapon == false)
				// {
					if (driverdata.skills.indexOf(SkillType.JOB_FS_13006) != -1) {
						let r = Math.random() * 10000;
						if (r < driverdata.molotovRatio) {
							//火焰弹
							bulletId = 14001;
							isMolotov = true;
						}
					}
				// }	
				let bulletCfg: BulletCfg = BulletTable.getCfgById<BulletCfg>(bulletId);
				let angle: number = Math.atan2(driverdata.y - driverdata.attackPy, driverdata.x - driverdata.attackPx) * 180 / Math.PI - 90;
				self.addBullet(driverdata, b_count, angle, bulletCfg, false, undefined,undefined,undefined,undefined,isMolotov);
			} else if (driverdata.job == ENUM_JOB_TYPE.JOB_WS) {
				let bulletCfg: BulletCfg = BulletTable.getCfgById<BulletCfg>(bulletId);
				let angle: number = Math.atan2(driverdata.y - driverdata.attackPy, driverdata.x - driverdata.attackPx) * 180 / Math.PI - 90;
				let b_ratio = Math.random() * 10000;
				let doubleTimes: number = 1;
				if (b_ratio > driverdata.doubleRatio) {
					doubleTimes = 2
				}
				let i: number = 0;
				let len: number = doubleTimes;
				let isFlamer:boolean
				if (driverdata.skills.indexOf(SkillType.JOB_WS_14011) != -1) {
					let r = Math.random() * 10000;
					if (r < driverdata.flamerRatio) {
						//火焰枪
						bulletId = 14001;
						isFlamer = true;
					}
				}
				for (i = 0; i < len; i++) {
					let b_count: number = 1;
					let r = Math.random() * 10000;
					let fiveRatio: number = driverdata.canFiveRatio;
					if (r < fiveRatio) {
						b_count = 5
					}
					if (i == 0) {
						self.addBullet(driverdata, b_count, angle, bulletCfg,undefined,undefined,undefined,undefined,undefined,undefined,isFlamer);
					} else {
						self.m_clock.addTime(50 * i, 1, self.addBullet, self, [driverdata, b_count, angle, bulletCfg,undefined,undefined,undefined,undefined,undefined,undefined,isFlamer], true);
					}
				}
			}
			
		}
		/**使用技能，使用前要先判断CD */
		public useSkill(driver: IDriver, skillid: number,monsterNotHit?:number): void {
			let self = this;
			let attackDriverdata: DriverData = driver.getData();
			if (attackDriverdata.attr.getValue(Enum_Attr.hp) > 0) {
				
				if (attackDriverdata.driverType == ENUM_DriverType.role) {
					let skillCfg: SkillCfg = SkillTable.getCfgById<SkillCfg>(skillid);
					if (skillCfg) {
						if (skillid == SkillType.JOB_ZS_10002)
						{ 
							self.wuYingJianCount = 30;
							self.bigSkillWuYingJian(<RoleData>attackDriverdata,50000/10000,3/*skillCfg.effect*/);
						}else if (skillid == SkillType.JOB_GJS_11002)
						{
							self.bigSkillJianRain(<RoleData>attackDriverdata, 50, 30000/10000);
						}else if (skillid == SkillType.JOB_CK_12002)
						{
							self.bigSkillNahan(6000, 30000);
						}else if (skillid == SkillType.JOB_FS_13003)
						{
							self.bigSkillChongJiBo(3000);
						}else if (skillid == SkillType.JOB_WS_14002)
						{
							self.bigSkillBaoFeng(<RoleData>attackDriverdata,30000/10000,skillCfg.effect);
						} else
						{
							//产生子弹
							self.createBullet(<RoleData>attackDriverdata, skillCfg.bullet);
						}	
						self.setSkillCdTime(attackDriverdata.id, skillid);
					}
				
				} else {
					//计算伤害
					let skillCfg: SkillCfg = SkillTable.getCfgById<SkillCfg>(skillid);
					if (skillCfg) {
						self._damageAction.damageMonsterAttack(<MonsterDriver>driver, monsterNotHit);
					}
				}
			}
		
		}
		/***设置CD时间*/
		public setSkillCdTime(driverId: number, skillid: number): void {
			let self = this;
			let map = self.m_sceneMar.getSkillCdMap();
			let driverMap;
			if (map.hasOwnProperty(driverId + '')) {
				driverMap = map[driverId + ''];
			} else {
				driverMap = {};
				map[driverId + ''] = driverMap;
			}
			driverMap[skillid + ''] = self.m_clock.getTime();
		}
		/**技能是否可以使用 */
		public checkCanUseSkill(driverId: number, skillid: number, d: number): boolean {
			let self = this;
			let skillCfg: SkillCfg = SkillTable.getCfgById<SkillCfg>(skillid);
			if (skillCfg && skillCfg.distance >= d ) {
				let map = self.m_sceneMar.getSkillCdMap();
				let driverMap;
				if (map.hasOwnProperty(driverId + '')) {
					driverMap = map[driverId + ''];
				} else {
					return true;
				}
				let cd: number = skillCfg.cd;

				let currentTime: number = self.m_clock.getTime();
				if (driverMap.hasOwnProperty(skillid + '')) {
					if (currentTime - driverMap[skillid + ''] > cd) {
						return true;
					}
				}
			}
			return false;
		
		}


		public checkSkillDistance(skillid: number, d: number): boolean {
			let skillCfg: SkillCfg = SkillTable.getCfgById<SkillCfg>(skillid);
			if (skillCfg.distance >= d) return true;
			return false;
		}
		/**
		 *cutDownCd 负数表示，缩短  正数表示加长
		 */
		public checkSkillIsCD(driverId: number, skillid: number,cutDownCd?:number): boolean {
			let self = this;
			let map = self.m_sceneMar.getSkillCdMap();
			let driverMap;
			if (map.hasOwnProperty(driverId + '')) {
				driverMap = map[driverId + ''];
			} else {
				return false;
			}
			let cd: number = SkillTable.getCfgById<SkillCfg>(skillid).cd;
			if (cutDownCd)
			{
				cd += cutDownCd;
			}	
			if (cd == 0)
			{
				return false;
			}	
			let currentTime: number = self.m_clock.getTime();
			if (driverMap.hasOwnProperty(skillid + '')) {
				if (currentTime - driverMap[skillid + ''] > cd) {
					return false;
				} else {
					return true;
				}
			}
			return false;
		}

		public clearSkillCd(): void {
			let self = this;
			let map = self.m_sceneMar.getSkillCdMap();
			map = {};
		}
		public clearDriverSkillCD(driverId: number): void {
			let self = this;
			let map = self.m_sceneMar.getSkillCdMap();
			let driverMap;
			if (map.hasOwnProperty(driverId + '')) {
				let obj = map[driverId + ''];
				for (var key in obj) {
					if (obj.hasOwnProperty(key)) {
						obj[key] = undefined;
						delete obj[key];
					}
				}
				map[driverId + ''] = undefined;
				delete map[driverId + ''];
			}
		}
		/**
		 *firstHurt 是否可以先发制人
		bigWeapon  是否是巨型武器
		skillHurtDamage  技能伤害系统
		bulletX  bulletY  子弹的固定坐标
		isMolotov 是否是火焰弹
		isFlamer  是否是火焰枪
		 */
		private addBullet(attackDriverdata: RoleData, b_count: number, angle: number, bulletCfg: BulletCfg, firstHurt?: boolean,
			bigWeapon?: boolean, skillHurtDamage?: number, bulletX?: number, bulletY?: number,isMolotov?:boolean,isFlamer?:boolean): void {
			let self = this;
		
		
			let attackValue: number = attackDriverdata.attr.getValue(Enum_Attr.attack);
			let crit: number = attackDriverdata.attr.getValue(Enum_Attr.crit);
			let critDamage: number = attackDriverdata.attr.getValue(Enum_Attr.critDamage);
			let physics_puncture: number = attackDriverdata.attr.getValue(Enum_Attr.physics_puncture);
			let magic_puncture: number = attackDriverdata.attr.getValue(Enum_Attr.magic_puncture);
			let i: number = 0;
			for (i = 0; i < b_count; i++) {
				let bulletdata: BulletData = self.m_sceneMar.createDriverData(ENUM_DriverType.bullet);
				bulletdata.masterId = attackDriverdata.id;
				if (bulletX)
				{
					bulletdata.x = bulletX;
				} else
				{
					bulletdata.x = attackDriverdata.x
				}	
				if (bulletY) {
					bulletdata.y = bulletY;
				} else
				{
					bulletdata.y = attackDriverdata.y - 50;
				}	
				bulletdata.job = attackDriverdata.job;
				bulletdata.movieName = bulletCfg.movieName;
				bulletdata.effect = bulletCfg.effect;
				bulletdata.rotateMove = bulletCfg.rotate == 1;
				bulletdata.isPierce = bulletCfg.penetration == 1;
				if (bulletdata.isPierce)
				{
					bulletdata.pierceMaxNum = bulletCfg.penetrationnum;
				}	
				bulletdata.moveAttackRange = bulletCfg.damagerange;
				//==============人物属性
				bulletdata.attr.setValue(Enum_Attr.attack, attackValue);
				bulletdata.attr.setValue(Enum_Attr.speed, bulletCfg.speed);
				bulletdata.attr.setValue(Enum_Attr.crit, crit);
				bulletdata.attr.setValue(Enum_Attr.critDamage, critDamage);
				bulletdata.attr.setValue(Enum_Attr.physics_puncture, physics_puncture);
				bulletdata.attr.setValue(Enum_Attr.magic_puncture, magic_puncture);
			
				bulletdata.luckHurtExRationMin = attackDriverdata.luckHurtExRationMin;
				bulletdata.luckHurtExRationkMax = attackDriverdata.luckHurtExRationkMax;
				bulletdata.farHurtExRatio = attackDriverdata.farHurtExRatio;
				bulletdata.shortHurtExRatio = attackDriverdata.shortHurtExRatio;
				bulletdata.anshaRatio = attackDriverdata.anshaRatio;
				bulletdata.anshaHurtExRatio = attackDriverdata.anshaHurtExRatio;
				bulletdata.skillHurtDamage = skillHurtDamage == undefined?1:skillHurtDamage;
				bulletdata.bulletdamage = bulletCfg.bulletdamage;
				if (firstHurt)
				{
					bulletdata.firstHurtExValue = attackDriverdata.firstHurtExValue;
				}	
				bulletdata.mengDuHurtValueExRatio = attackDriverdata.mengDuHurtValueExRatio;
				if (bigWeapon)
				{
					bulletdata.bigWeaponHurtRatio = attackDriverdata.bigWeaponHurtRatio;
				}	
				if (isMolotov)
				{
					bulletdata.isMolotov = true;
				}	
				if (isFlamer)
				{
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
				} else if (b_count == 2) {
					if (i == 0) bulletdata.rotation = angle - 10;
					if (i == 1) bulletdata.rotation = angle + 10;
				} else if (b_count == 3) {
					if (i == 0) bulletdata.rotation = angle - 10;
					if (i == 1) bulletdata.rotation = angle;
					if (i == 2) bulletdata.rotation = angle + 10;
				} else if (b_count == 3) {
					if (i == 0) bulletdata.rotation = angle - 20;
					if (i == 1) bulletdata.rotation = angle - 10;
					if (i == 2) bulletdata.rotation = angle + 10;
					if (i == 3) bulletdata.rotation = angle + 20;
				} else if (b_count == 5) {
					if (i == 0) bulletdata.rotation = angle - 20;
					if (i == 1) bulletdata.rotation = angle - 10;
					if (i == 2) bulletdata.rotation = angle;
					if (i == 3) bulletdata.rotation = angle + 10;
					if (i == 4) bulletdata.rotation = angle + 20;
				}
			
				self.m_sceneMar.addDriver(bulletdata);
			}
		}
	}
}