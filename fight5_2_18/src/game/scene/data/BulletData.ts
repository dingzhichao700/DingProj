module game {
	export class BulletData extends DriverData {
		public masterId: number;
		public job: number;
		/**是否旋转移动 */
		public rotateMove: boolean;
		/**是否穿透*/
		public isPierce: boolean;
		/**最大穿透数 */
		public pierceMaxNum: number;
		/**是否移动过程中是伤害范围  如果为0则是普通的单攻*/
		public moveAttackRange: number;
		/**击中后，伤害扩散范围，如果为0则只在受击者上有伤害 */
		public hittedEnlargeRange: number;
		/**受击特效 */
		public effect: number;
		/**额外增加伤害比例 万分比*/
		// public additionalper: number;
		/**额外增加伤害数值 */
		// public additionnum: number;
		/**旋转角度 */
		public rotation: number;
		/**击中过的目标 */
		public hitTargetIds: Array<number>;


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
		/**暗杀之力，skill id*/
		public anshaLiSkillId: number;


		/**先发制人：装弹的第一发伤害增加 万分比 */
		public firstHurtExValue: number;
		/**	猛毒：造成敌人当前体力的 x 额外伤害 万分比（BOSS除外）   */
		public mengDuHurtValueExRatio: number;

		/**巨型武器 伤害加成  万分比 */
		public bigWeaponHurtRatio: number;
		/**是否是火焰弹 */
		public isMolotov: boolean;
		/**火焰枪 */
		public isFlamer: boolean;

		/**强打眩晕概率 万分比*/
		public forceSwoonRatio: number;
		/**眩晕伤害加成 万分比 */
		public swoonHurtExRatio: number;
		/**灵魂爆发：击杀敌人时，有100%的几率对周围造成x%的伤害 万分比 */
		public baoFaHurtRatio: number;
		/**根据敌人失去的体力，造成X%的伤害(Max23） */
		public hpHurtExValueRatio: number;
		/**技能伤害系数 */
		public skillHurtDamage: number;
		/**子弹伤害系数 */
		public bulletdamage: number;

		public constructor() {
			super();
		}
		public clone(bullet:BulletData): void
		{
			let self = this;
			bullet.masterId = self.masterId;
			bullet.job = self.job;
			bullet.rotateMove = self.rotateMove;
			bullet.moveAttackRange = self.moveAttackRange;
			bullet.hittedEnlargeRange = self.hittedEnlargeRange;
			bullet.effect = self.effect;
			bullet.rotation = self.rotation;
			bullet.hitTargetIds = self.hitTargetIds;
			bullet.luckHurtExRationMin = self.luckHurtExRationMin;
			bullet.luckHurtExRationkMax = self.luckHurtExRationkMax;
			bullet.farHurtExRatio = self.farHurtExRatio;
			bullet.shortHurtExRatio = self.shortHurtExRatio;
			bullet.anshaRatio = self.anshaRatio;
			bullet.anshaHurtExRatio = self.anshaHurtExRatio;
			bullet.anshaLiSkillId = self.anshaLiSkillId;
			bullet.firstHurtExValue = self.firstHurtExValue;
			bullet.mengDuHurtValueExRatio = self.mengDuHurtValueExRatio;
			bullet.bigWeaponHurtRatio = self.bigWeaponHurtRatio;
			bullet.forceSwoonRatio = self.forceSwoonRatio;
			bullet.swoonHurtExRatio = self.swoonHurtExRatio;
			bullet.baoFaHurtRatio = self.baoFaHurtRatio;
			bullet.hpHurtExValueRatio = self.hpHurtExValueRatio;
			bullet.skillHurtDamage = self.skillHurtDamage;
			bullet.bulletdamage = self.bulletdamage;
		}
		public clear(): void {
			super.clear();
			let self = this;
			self.masterId = undefined;
			// self.attack = undefined;
			// self.crit = undefined;
			// self.tenacity = undefined;

			self.rotation = undefined;
			self.rotateMove = undefined;
			if (self.hitTargetIds && self.hitTargetIds.length > 0) {
				self.hitTargetIds.length = 0;
			}
			self.hitTargetIds = undefined;

			self.isPierce = false;
			self.pierceMaxNum = undefined;
			self.moveAttackRange = 0;
			self.hittedEnlargeRange = 0;
			self.effect = undefined;
			// self.additionalper = undefined;
			// self.additionnum = undefined;

		}
	}
}