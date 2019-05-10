module game {
	export class BuffManager extends DLG.BaseAction {
		private static _instance: BuffManager
		/**带有 定时触发的buff 的对象*/
		private buffTargets: Array<DriverData>;
		public constructor() {
			super();
			let self = this;
			self.createClock();
			self.buffTargets = [];
			self.m_clock.addTime(1000, 1, self.onCheckBuffHandler, self, null);
		}
		public static getInstance(): BuffManager {
			let self = this;
			if (!self._instance) {
				self._instance = new BuffManager();
			}
			return self._instance;
		}
		private onCheckBuffHandler(): void {
			let self = this;
			let len: number
			let i: number
			len = self.buffTargets.length;
			let targetData: DriverData
			for (i = 0; i < len;) {
				targetData = self.buffTargets[i];
				if (!targetData.buffs) {
					//如果怪物已经死亡，清理掉
					self.buffTargets.splice(i, 1);
					break;
				}
				self.onActionTargetBuff(targetData, Enum_BuffTrigger.time);
				self.checkkBuffTimeOut(targetData);
				i++
			}
		}
		/**把某个buff加到某个对象上 */
		public onAddBuffToTargetData(driverdata: DriverData,buffId: number, activeTime: number, buf_attack_num: number, buf_attack_per: number): BuffData {
			let self = this;
			let buffCfg: BuffCfg = BuffTable.getCfgById<BuffCfg>(buffId);

			let buffs: Array<BuffData> = driverdata.buffs[buffCfg.trigger];
			let buff: BuffData;
			let i: number = 0;
			let len: number = buffs.length;
			let dataT: number = self.m_clock.getTime();
			let hasBuff: boolean = false;
			for (i = 0; i < len; i++) {
				if (buffs[i].buffId == buffId) {
					// buff = buffs[i];
					hasBuff = true;
					break;
				}
			}

			buff = BuffData.getBuffData();
			buff.buffId = buffId;
			buffs.push(buff);
			if (buffCfg.trigger == Enum_BuffTrigger.time) {
				buff.nextTouchTime = dataT + 1000;
				if (hasBuff == false) {
					self.buffTargets.push(driverdata);
				}
			}
			buff.actionType = buffCfg.actionType;
			buff.mySelfData = driverdata;
			// buff.targetData = targetDriver;
			// buff.target = buffCfg.target;
			buff.trigger = buffCfg.trigger;
			// buff.activeTime = activeTime;
			buff.buf_attack_num = buf_attack_num;
			buff.buf_attack_per = buf_attack_per;
			if (activeTime == 0) {
				buff.endTime = dataT + 86400000;
			} else {
				buff.endTime = dataT + activeTime;
			}
			// if (buffCfg.trigger == Enum_BuffTrigger.create) {
			// 	buff.touch();
			// }
			return buff;
		}
		// public onActionBuff(buff:BuffData): void
		// {
		// 	buff.touch();
		// }
		/**执行某个类型的buff */
		public onActionTargetBuff(driverdata: IDriverData, trigger_type: number): void {
			let self = this;
			let buffs: Array<BuffData> = driverdata.buffs[trigger_type];
			let buff: BuffData;
			let i: number = 0;
			let len: number = buffs.length;
			if (trigger_type == Enum_BuffTrigger.time) {
				let dataT: number = self.m_clock.getTime();
				for (i = 0; i < len; i++) {
					buff = buffs[i];
					if (dataT > buff.nextTouchTime) {
						buff.touch();
					}
				}
			} else if (trigger_type == Enum_BuffTrigger.die) {
				if (driverdata.attr.getValue(Enum_Attr.hp) <= 0) {
					for (i = 0; i < len; i++) {
						buff = buffs[i];
						buff.touch();
					}
				}
			} else if (trigger_type == Enum_BuffTrigger.shooting) {

				for (i = 0; i < len; i++) {
					buff = buffs[i];
					buff.touch();
				}
			
			} else if (trigger_type == Enum_BuffTrigger.create) {

				for (i = 0; i < len; i++) {
					buff = buffs[i];
					buff.touch();
				}
			
			}
		
		}
		/**检测时间类的buff是否已经过期 */
		private checkkBuffTimeOut(driverdata: IDriverData): void {
			let self = this;
			var dataT: number = self.m_clock.getTime();
			var trigger_type: number = 0;
			var trigger_typeLen: number = Enum_BuffTrigger.max;
			// let driverdata: IDriverData = master.getData();
			for (trigger_type = 1; trigger_type <= trigger_typeLen; trigger_type++) {
			
				var arr: Array<BuffData> = driverdata.buffs[trigger_typeLen];
				if (arr != undefined) {
					var i: number = 0;
					var len: number = arr.length;
					var buff: BuffData;

					if (driverdata.attr.getValue(Enum_Attr.hp) < 0) {
						//已经死
						return;
					}
					for (i = 0; i < len;) {
						buff = arr[i];
						if (buff == undefined) {
							break;
						}
						if (buff.endTime == -1) {
							continue;
						}
						if (buff.endTime <= dataT) {
							buff.cancelBuff();
							//过期
							// arr.splice(i,1);
							len = arr.length;
							continue;
						}
					
						i++
					}
				}
			}
		
		}

		/**清空所有英雄的buff */
		public onClearSceneHeroBuff(): void
		{
			let self = this;
			let sceneMar = SceneManager.getInstance();
			let heroArr: Array<number> = sceneMar.getAllRoles();
			let i:number = 0;
			let len:number = heroArr.length;;
			for( i=0; i < len ; i++)
			{
				let role: IDriver = sceneMar.getDriverById(heroArr[i], ENUM_DriverType.role);
				if (!role) continue;
				let roleData: DriverData = role.getData();
				roleData.clearBuff();
			}
		}
	}
}