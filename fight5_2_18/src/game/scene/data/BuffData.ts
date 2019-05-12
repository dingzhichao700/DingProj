module game {
	
	
	export class BuffData {
		public id;
		public buffId
		// public activeTime;
		public endTime;
		/**下一次受作用的时间 */
		public nextTouchTime;
		// public q_effect_cooldown:number
		/**播放的动画 */
		public effect: string;
		// /** 作用目标（1-自己  2-目标  3-队友  4-敌方  ）*/
		// public target;
		// public targetRang;
		/***效果类型 */
		public actionType;
		/**生效条件  1-触发  2-发射子弹  3-死亡  4-定时触发 */
		public trigger;
		public mySelfData: DriverData;
		// public targetData: DriverData;
		/**持续时间  后端给过来*/
		// public activeTime:number;
		/**buff作用数值  后端给过来*/
		public buf_attack_num;
		/**buff作用万分比 后端给过来*/
		public buf_attack_per;
		/**作用值 */
		public resultValue;

		/**触发buff */
		public touch(): void {
			let self = this;
			
			let target:IDriver
			
			target = SceneManager.getInstance().getDriverById(self.mySelfData.id, self.mySelfData.driverType);
			let targetData: DriverData
			if (target) {
				targetData = target.getData();
			} else
			{
				targetData = self.mySelfData;
			}	
			let attrType;
			
			if (self.actionType == ENUM_BuffEffect.HP)
			{
				
				let hp = targetData.attr.getValue(Enum_Attr.hp);
				let hpEx = self.getValue(hp);
				targetData.attr.setValue(Enum_Attr.hp, hp + hpEx);
				if (target) target.update();
				
			} else if (self.actionType == ENUM_BuffEffect.SPEED)
			{
				let speed = targetData.attr.getValue(Enum_Attr.speed);
				let speedex = self.getValue(speed);
				targetData.attr.setValue(Enum_Attr.speed, speed + speedex);
					
			} else if (self.actionType == ENUM_BuffEffect.CRITIC)
			{
				attrType = Enum_Attr.crit;
			} else if (self.actionType == ENUM_BuffEffect.PHYSICS_DEF)
			{
				attrType = Enum_Attr.def;
			}else if (self.actionType == ENUM_BuffEffect.MAGIC_DEF)
			{
				attrType = Enum_Attr.magicdefense;
			}else if (self.actionType == ENUM_BuffEffect.ATTACK)
			{
				attrType = Enum_Attr.attack;
			}else if (self.actionType == ENUM_BuffEffect.HIT)
			{
				attrType = Enum_Attr.hit;
			}else if (self.actionType == ENUM_BuffEffect.ATTACK_SPEED)
			{
				
			}else if (self.actionType == ENUM_BuffEffect.PUTON_BULLET_SPEED)
			{
				(<RoleData>targetData).putOnBulletCDTimeEx = self.getValue((<RoleData>targetData).putOnBulletCDTime); 
			}else if (self.actionType == ENUM_BuffEffect.ATTACK_EXPEND_SPEED)
			{
				if (targetData.driverType == ENUM_DriverType.role)
				{
					let expendDoubleBulletRatio = (<RoleData>targetData).expendDoubleBulletRatio;
					let expendDoubleBulletRatioEx = self.getValue(expendDoubleBulletRatio);
					(<RoleData>targetData).expendDoubleBulletRatio = expendDoubleBulletRatioEx;
				}
			}else if (self.actionType == ENUM_BuffEffect.SWOON)
			{
				if (targetData.driverType == ENUM_DriverType.monster)
				{
					if ((<MonsterData>targetData).isSwoonTime)
					{
						if ((<MonsterData>targetData).isSwoonTime < self.endTime)
						{
							(<MonsterData>targetData).isSwoonTime = self.endTime;
						}
					} else
					{
						(<MonsterData>targetData).isSwoonTime = self.endTime;
					}	
				}	
			}else if (self.actionType == ENUM_BuffEffect.HP_MAX)
			{
				let totalhp = targetData.attr.getValue(Enum_Attr.totalHp);
				let addHpEx = self.getValue(totalhp);
				targetData.attr.setValue(Enum_Attr.totalHp, totalhp + addHpEx);
				let hp = targetData.attr.getValue(Enum_Attr.hp);
				targetData.attr.setValue(Enum_Attr.hp, hp + addHpEx);
				if (target) target.update();
			}else if (self.actionType == ENUM_BuffEffect.MAGIC_HURT_IMMUNE)
			{
				attrType = Enum_Attr.magic_HurtImmune;
			}else if (self.actionType == ENUM_BuffEffect.PHYSICS_HURT_IMMUNE)
			{
				attrType = Enum_Attr.physics_HurtImmune;
			}else if (self.actionType == ENUM_BuffEffect.PHYSICS_PUNCTURE)
			{
				attrType = Enum_Attr.physics_puncture;
			}else if (self.actionType == ENUM_BuffEffect.MAGIC_PUNCTURE)
			{
				attrType = Enum_Attr.magic_puncture;
			}
			if (attrType)
			{
				let value = targetData.attr.getValue(attrType);
				let valueEx = targetData.buffsAttr.getValue(attrType);
				if (valueEx == undefined)
				{
					valueEx = 0
				}
				self.resultValue = self.getValue(value);
				targetData.buffsAttr.setValue(attrType, valueEx + self.resultValue);
			}
			
		}
		public cancelBuff(): void
		{
			let self = this;
			let target:IDriver
			
			target = SceneManager.getInstance().getDriverById(self.mySelfData.id, self.mySelfData.driverType);
			let targetData: DriverData
			if (target) {
				targetData = target.getData();
			} else
			{
				targetData = self.mySelfData;
			}
			let attrType;
			if (self.actionType == ENUM_BuffEffect.HP)
			{
				
			} else if (self.actionType == ENUM_BuffEffect.SPEED)
			{
					
			}else if (self.actionType == ENUM_BuffEffect.CRITIC)
			{
				attrType = Enum_Attr.crit;
			} else if (self.actionType == ENUM_BuffEffect.PHYSICS_DEF)
			{
				attrType = Enum_Attr.def;
			}else if (self.actionType == ENUM_BuffEffect.MAGIC_DEF)
			{
				attrType = Enum_Attr.magicdefense;
			}else if (self.actionType == ENUM_BuffEffect.ATTACK)
			{
				attrType = Enum_Attr.attack;
			}else if (self.actionType == ENUM_BuffEffect.HIT)
			{
				attrType = Enum_Attr.hit;
			}else if (self.actionType == ENUM_BuffEffect.ATTACK_SPEED)
			{
				
			}else if (self.actionType == ENUM_BuffEffect.PUTON_BULLET_SPEED)
			{
				(<RoleData>targetData).putOnBulletCDTimeEx = 0;
			}else if (self.actionType == ENUM_BuffEffect.ATTACK_EXPEND_SPEED)
			{
				(<RoleData>targetData).expendDoubleBulletRatio = 0;
			}else if (self.actionType == ENUM_BuffEffect.SWOON)
			{
				
			}else if (self.actionType == ENUM_BuffEffect.HP_MAX)
			{
				
			}else if (self.actionType == ENUM_BuffEffect.MAGIC_HURT_IMMUNE)
			{
				attrType = Enum_Attr.magic_HurtImmune;
			}else if (self.actionType == ENUM_BuffEffect.PHYSICS_HURT_IMMUNE)
			{
				attrType = Enum_Attr.physics_HurtImmune;
			}else if (self.actionType == ENUM_BuffEffect.PHYSICS_PUNCTURE)
			{
				attrType = Enum_Attr.physics_puncture;
			}else if (self.actionType == ENUM_BuffEffect.MAGIC_PUNCTURE)
			{
				attrType = Enum_Attr.magic_puncture;
			}
			
			if (attrType)
			{
				let valueEx = targetData.buffsAttr.getValue(attrType);
				if (valueEx == undefined)
				{
					return;
				}
				targetData.buffsAttr.setValue(attrType, valueEx - self.resultValue);
			}
		}

		private getValue(value, float = 0) {
			var v = 0
			let self = this;
			if (isNaN(self.buf_attack_num) == false && self.buf_attack_num != 0) {
				v = self.buf_attack_num;
			} else if (isNaN(self.buf_attack_per) == false && self.buf_attack_per != 0) {
				v = self.buf_attack_per / 10000 * value;
			}
			if (float == 0) {
				return Math.floor(v);
			}
			return v;
		}

		/**自增id*/
		protected static ID = 0;
		public clear(): void {
			let self = this;
			// self.id = BuffData.ID;
			// BuffData.ID++;
			// if (BuffData.ID == Number.MAX_VALUE)
			// {
			// 	BuffData.ID = Number.MIN_VALUE;
			// }
			// self.activeTime = undefined;
			self.endTime = undefined;
			self.nextTouchTime = undefined;
			self.effect = undefined;
			// self.target = undefined;
			// self.targetRang = undefined;
			self.actionType = undefined;
			self.trigger = undefined;
			// self.activeTime = undefined;
			self.buf_attack_num = undefined;
			self.buf_attack_per = undefined;
			self.resultValue = undefined;
			// self.targetData = undefined;
			self.mySelfData = undefined;
		}
		private static _pool: Array<BuffData> = [];
		public static getBuffData(): BuffData {
			if (BuffData._pool.length > 0) {
				return BuffData._pool.shift();
			}
			let buff: BuffData = new BuffData();
			buff.id = BuffData.ID;
			BuffData.ID++;
			if (BuffData.ID == Number.MAX_VALUE) {
				BuffData.ID = Number.MIN_VALUE;
			}
			return buff;
		}
		public static returnBuffData(buff: BuffData): void {
			buff.clear();
			BuffData._pool.push(buff);
		}
	
	}
}