module game {
	export
		class MovieRenderManager {
		private static _instance: MovieRenderManager

		// protected _timer: egret.Timer;
		public constructor() {
			this.init();
		}
		public static getInstance(): MovieRenderManager {
			let self = this;
			if (!self._instance) {
				self._instance = new MovieRenderManager();
			}
			return self._instance;
		}
		protected init(): void {
			let self = this;
			DLG.DLGCore.clock.addTime(150, 0, self.renderHandler, self, null);
		}
		private count: number = 0;
		protected renderHandler(): void {
			let self = this;
			let sceneMar: SceneManager = SceneManager.getInstance();
			let monsterArr: Array<number> = sceneMar.getAllMonster();
			let i: number = 0;
			let len: number = monsterArr.length;
			self.count++;
			for (i = 0; i < len; i++) {
				let monster: IDriver = sceneMar.getDriverById(monsterArr[i], ENUM_DriverType.monster);
				if (monster == null) continue;
				let monsterdata: MonsterData = <MonsterData>monster.getData();
				if (monsterArr.length > 30 && monster.y < 300) {
					if (self.count == 2) {
						monster.nextFrame();
					}
				} else {
					monster.nextFrame();
				}
			
			}
		
			let roleArr: Array<number> = sceneMar.getAllRoles();
			i = 0;
			len = roleArr.length;
			for (i = 0; i < len; i++) {
				let role: IDriver = sceneMar.getDriverById(roleArr[i], ENUM_DriverType.role);
				if (role == null) break;
				role.nextFrame();
			
			}

			let bulletArr: Array<number> = sceneMar.getAllBullet();
			i = 0;
			len = bulletArr.length;
			for (i = 0; i < len; i++) {
				let bullet: IDriver = sceneMar.getDriverById(roleArr[i], ENUM_DriverType.bullet);
				if (bullet == null) break;
				if (self.count == 2) {
					bullet.nextFrame();
				}
			
			}

			if (self.count == 2) {
				self.count = 0
			}
		}
	}
}