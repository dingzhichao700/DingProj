module game {
	export class BulletCfg {
		id: number;
		/**名字 */
		name: string;
		/**模型 */
		movieName: string;
		/**移动速度 */
		speed: number;
		/**是否旋转移动 */
		rotate: number;
		/**是否穿透*/
		penetration: number;
		/**穿透次数 */
		penetrationnum: number;
		/**是否移动过程中是伤害范围  如果为0则是普通的单攻*/
		damagerange: number;
		/**击中后，伤害扩散范围，如果为0则只在受击者上有伤害 */
		diffusionrange: number;
		// /**额外增加伤害比例 万分比*/
		// additionalper: number;
		// /**额外增加伤害数值 */
		// additionnum: number
		// /**多发子弹概率 3发|5发（万分比） */
		// bulletprobability: string;
		/**受击特效 */
		effect: number;
		/**子弹伤害系数 */
		bulletdamage: number
		

	}
	export class BulletTable extends DLG.BaseTable {
		public static init() {
			this.analysis(CfgData.getDataByUrl(CfgData.bullet_json));
		}
	}
}