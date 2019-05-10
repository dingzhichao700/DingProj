module game {
	export class MonsterData extends DriverData {
		/**受击范围 */
		public byAttackRangeW: number;
		public byAttackRangeH: number;
		public byAttackRangeY: number;
		public isBoss: boolean;
		public targetY: number;
		public monsterCfgId: number;
		public distance: number;
		/**眩晕 */
		public isSwoonTime: number

		public constructor() {
			super();
		}
		
		public clear(): void {
			super.clear();
			let self = this;
			self.byAttackRangeW = undefined;
			self.byAttackRangeH = undefined;
			self.byAttackRangeY = undefined;
			self.isBoss = undefined;
			self.monsterCfgId = undefined;
			self.targetY = undefined;
			self.isSwoonTime = undefined;
		}

	}
}