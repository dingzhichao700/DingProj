module game {
	export class RoleData extends DriverData {
		public job: number;
		public heroId: number;
		/**最大子弹数量 */
		public bulletCountMax: number;
		/**当前子弹数量 */
		public bulletCurrent: number;
		/**双倍消耗子弹概率 */
		public expendDoubleBulletRatio: number;
		/**装弹CD时间 */
		public putOnBulletCDTime: number;
		/**装弹CD额外时间 场景buff产生*/
		public putOnBulletCDTimeEx: number;
		/** 攻击的坐标点*/
		public attackPx: number;
		public attackPy: number;
		/**坐位 */
		public index: number;
		/**是否队长 */
		public isLeader: boolean;
	
		/**产生三发子弹 概率*/
		public canThreeRatio: number;
		/**产生五发子弹 概率*/
		public canFiveRatio: number;
		/**无限弓次数  必定产生三发子弹的次数 */
		public infiniteArrowTimes: number;

		/**双重攻击 概率 */
		public doubleRatio: number;
		/**幸运一击 追加伤害 万分比*/
		public luckHurtExRationMin: number;
		/**幸运一击 追加伤害 万分比*/
		public luckHurtExRationkMax: number;
		/**远距离攻击 额外加成 万分比 */
		public farHurtExRatio: number;
		/**近距离攻击 额外加成 万分比 */
		public shortHurtExRatio: number;
		/**暗杀触发 概率 万分比*/
		public anshaRatio: number;
		/*暗杀触发伤害值 万分比 */
		public anshaHurtExRatio: number;
		/**暗杀之力 攻击力加成 触发暗杀时，攻击力+X%持续5秒*/
		public anshaLiAttackExValueRatio: number;
	
		/**先发制人：装弹的第一发伤害增加 万分比 */
		public firstHurtExValue: number;
		/**	猛毒：造成敌人当前体力的 x 额外伤害 万分比（BOSS除外）   */
		public mengDuHurtValueExRatio: number;

		/**产生巨型武器概率 */
		public bigWeaponRatio: number;
		/**巨型武器 伤害加成  万分比 */
		public bigWeaponHurtRatio: number;
		/**疯狂打击巨型武器总次数 */
		public bigWeaponTotalTimes: number;
		public bigWeaponHaveTimes: number;
		/**强打眩晕概率 万分比*/
		public forceSwoonRatio: number;
		/**眩晕伤害加成 万分比 */
		public swoonHurtExRatio: number;

		/**产生火焰弹概率 */
		public molotovRatio: number;
		/**产生火焰枪概率 */
		public flamerRatio: number;

		/**灵魂爆发：击杀敌人时，有100%的几率对周围造成x%的伤害 万分比 */
		public baoFaHurtRatio: number;
		/**根据敌人失去的体力，最多造成X%的伤害(Max23） */
		public hpHurtExValueRatio: number;

		public constructor() {
			super();
		}

		public clear(): void {
			super.clear();
			let self = this;
			self.attackPx = undefined;
			self.attackPy = undefined;
			self.index = undefined;
			self.heroId = undefined;
		}

	}
}