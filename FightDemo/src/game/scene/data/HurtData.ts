module game {
	export class HurtData {
		public hurt: number;
		/**幸运一击 */
		public luckHurt: boolean;
		/**远攻加成  */
		public farHurt: boolean;
		/**近攻加成  */
		public shortHurt: boolean;
		/**暗杀 */
		public anShi: boolean;
		/**先发制人 */
		public firstHurt: boolean;
		/**猛毒 */
		public mengDu: boolean;
		/**巨型武器 */
		public bigWeaponHurt: boolean;
		/**强打 */
		public forceSwoon: boolean;
		/**眩晕伤害 */
		public swoonHurt: boolean;
		/**灵魂爆发 */
		public baoFaHurt: boolean;

		/**眩晕 */
		public isSwoon: boolean;
		/**暴击 */
		public isCrit:boolean

		public clear() {
			let self = this;
			self.hurt = undefined;
			self.luckHurt = undefined;
			self.farHurt = undefined;
			self.shortHurt = undefined;
			self.anShi = undefined;
			self.firstHurt = undefined;
			self.mengDu = undefined;
			self.bigWeaponHurt = undefined;
			self.forceSwoon = undefined;
			self.swoonHurt = undefined;
			self.baoFaHurt = undefined;
			self.isSwoon = undefined;
		}
		private static _pool: Array<HurtData> = [];
		public static getHurtData(): HurtData {
			if (HurtData._pool.length > 0) {
				return HurtData._pool.shift();
			}
			let hurt: HurtData = new HurtData();
			return hurt;
		}
		public static returnHurtData(hurt: HurtData): void {
			hurt.clear();
			HurtData._pool.push(hurt);
		}
	}
}