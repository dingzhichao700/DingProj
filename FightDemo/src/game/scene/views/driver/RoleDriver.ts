module game {
	export class RoleDriver extends MonsterDriver {
		public constructor() {
			super();
			let self = this;
			self._direction = ENUM_DriverDirection.up;
		}
		protected init(): void {
			let self = this;

			self._bodySkin.setDirection(self._direction);
			self._bodySkin.setMovieName(GAME_PATH.MOVIE_PLAYER_PATH, self._data.movieName);
			self._bodySkin.setAction(ENUM_DriverAction.stand)
			self._bodySkin.loadMovie();
			self.update();
			self.stand();
		
		}
		public attack(skillId: number, px: number, py: number,monsterNotHit?:number): void {
			let self = this;
			super.attack(skillId, px, py);
			let data: DriverData = self._data;
			
			
			if (data.driverType == ENUM_DriverType.role) {
				(<RoleData>data).attackPx = px;
				(<RoleData>data).attackPy = py;
			}
			let useSkillAction: UseSkillAction = DLG.FactoryUtils.getClass(UseSkillAction);
			useSkillAction.useSkill(self, skillId);
			
		}
		

		public onPlayFrameCallBack(frame: number, _totalFrame: number): void {
			let self = this;
			if (self._actionState == ENUM_DriverAction.attack) {
				if (frame == _totalFrame) {
					self.stand();
				}
				// if (index == 2)
				// {
				// let data: DriverData = self._data;
				// if (data)
				// {
				// 	FightManager.getInstance().useSkill(this, data.lastUseSkill  );
				// }
				// } else if (index == _totalFrame - 1)
				// {
				// 	self.stand();
				// }	
			}
			if (frame == _totalFrame)
			{
				let data: RoleData = <RoleData>self._data;
				let skills: Array<number> = data.skills;
				let i:number = 0;
				let len: number = skills.length;
				let useSkillAction: UseSkillAction = DLG.FactoryUtils.getClass(UseSkillAction);
				if (data.job == ENUM_JOB_TYPE.JOB_GJS)
				{
					if (skills.indexOf(SkillType.JOB_GJS_11009) != -1)
					{
						if (useSkillAction.checkSkillIsCD(data.id, SkillType.JOB_GJS_11009) == false)
						{
							useSkillAction.setSkillCdTime(data.id, SkillType.JOB_GJS_11009);
							data.infiniteArrowTimes = 10;
						}	
					}	
				}
				// else if (data.job == ENUM_JOB_TYPE.JOB_FS)
				// {
				// 	if (skills.indexOf(SkillType.JOB_FS_13011) != -1) {
				// 		if (useSkillAction.checkSkillIsCD(data.id, SkillType.JOB_FS_13011) == false)
				// 		{ 
				// 			useSkillAction.setSkillCdTime(data.id, SkillType.JOB_FS_13011);
				// 			data.bigWeaponHaveTimes = data.bigWeaponTotalTimes;
				// 		}
						
				// 	}
				// }	
				
			}	
		}
	
		public nextFrame(): void {
			let self = this;
			self._bodySkin.nextFrame();
		}
	
	}
}