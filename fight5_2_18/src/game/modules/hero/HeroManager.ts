module game {
	export class HeroManager extends DLG.BaseAction {
		
		/**第一主角，英雄id */
		public firstHeroId: number;
		
		public constructor() {
			super();
			let self = this;
			self.createSocket();
		}

		private static _instance: HeroManager
		public static getInstance(): HeroManager {
			let self = this;
			if (!self._instance) {
				self._instance = new HeroManager();
			}
			return self._instance;
		}

		public registProtocol(): void {
			let self = this;
			self.m_socket.onDataCallback(CmdCode.ACK_MyInfo, '', self.initHeroInfo, self);
		}

		public addRole(index: number, movieName: string, job: number, attr: AttrData, skills: Array<number>): void {
			let self = this;
			let pointArr = SceneData.roleStandPoint;
			let sceneMar: SceneManager = SceneManager.getInstance();
			let driverdata: RoleData = sceneMar.createDriverData(ENUM_DriverType.role);
			driverdata.x = pointArr[index];
			driverdata.y = 880;
			driverdata.index = index;
			driverdata.attr.clear();
			driverdata.attr = attr;
			driverdata.movieName = movieName;
			driverdata.job = job;
			driverdata.bulletCountMax = 100;

			driverdata.putOnBulletCDTime = 6000;
			if (job == ENUM_JOB_TYPE.JOB_ZS) {
				driverdata.canThreeRatio = 4000
				driverdata.doubleRatio = 5000;
				driverdata.bigWeaponRatio = 1000;
				driverdata.bigWeaponHurtRatio = 5000;
				driverdata.luckHurtExRationMin = 1000;
				driverdata.luckHurtExRationkMax = 5000;
			} else if (job == ENUM_JOB_TYPE.JOB_GJS) {
				driverdata.canThreeRatio = 4000
				driverdata.canFiveRatio = 4000
				driverdata.farHurtExRatio = 800
			} else if (job == ENUM_JOB_TYPE.JOB_CK) {
				driverdata.canThreeRatio = 4000
				driverdata.anshaRatio = 5000;
				driverdata.anshaHurtExRatio = 10000;
				driverdata.anshaLiAttackExValueRatio = 100;
			} else if (job == ENUM_JOB_TYPE.JOB_FS) {
				driverdata.doubleRatio = 5000;
				driverdata.shortHurtExRatio = 1000;
				driverdata.molotovRatio = 5000;
			} else if (job == ENUM_JOB_TYPE.JOB_WS) {
				driverdata.doubleRatio = 5000;
				driverdata.canFiveRatio = 4000
				driverdata.luckHurtExRationMin = 1000;
				driverdata.luckHurtExRationkMax = 5000;
				driverdata.baoFaHurtRatio = 5000;
				driverdata.hpHurtExValueRatio = 5000;
				driverdata.flamerRatio = 5000;
			}
			
			driverdata.skills = skills;
			sceneMar.addDriver(driverdata);
		}

		public removeRoleByDirver(driver: IDriver): void {
			let self = this;
			let sceneMar: SceneManager = SceneManager.getInstance();
			sceneMar.removeDriver(driver);
		}

		/**怪物移动速度减少多少  万分比 */
		public setMonsterSpeedCut(value: number): void {
			FightManager.getInstance().monsterSpeedCut = value/10000;
		}

		private _quickPutOnBullet:number = 0
		/**快速装弹 概率   队伍技能*/
		public setQuickPutOnBullet(value: number): void {
			this._quickPutOnBullet = value/10000;
		}

		public getQuickPutOnBullet(): number {
			return this._quickPutOnBullet;
		}

		/**怪物攻击无效几率提升   value传万分比 */
		public setMonsterNotHit(value: number): void {
			FightManager.getInstance().monsterNotHit = value/10000;
		}

		/**初始化人物信息 */
		public initHeroInfo(type: string, arr: string[]): void {
		}

	}
}