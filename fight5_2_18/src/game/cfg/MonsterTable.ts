module game {
	export class MonsterCfg {
		id: number;
		/**名字 */
		name: string;
		/**模型 */
		movieName: string;
		/**技能 |分开*/
		// skills: string;
		/**碰撞范围 w|h|py 以|分开 */
		hitRange: string;
		/**类型 1-普通怪 2-精英3-BOSS4-稀有 */
		type: number;
		level: number;
		/**缩放系数 */
		bigper: number;
		/**生命 */
		hp: number;
		/**物防*/
		def: number;
		/**魔防*/
		magicdefense: number;
		/**攻击 */
		attack: number;
		/**命中*/
		hit: number;
		///**闪避 */
		// dodge: number;
		///**	暴击 */
		// crit: number;
		///**韧性 */
		// tenacity: number;
		/**抗暴击 */
		resistcrit:number
		/**抗暴击伤害 */
		resistdamage:number
		/**移动速度 */
		speed: number;
		/**怪物技能个数 */
		skillsnumber: number;
		/**怪物技能区间 */
		monsterskills: string;
		/**区分近远程  1-近程  2-远程*/
		distance: number;

	}
	export class MonsterTable extends DLG.BaseTable {
		public static init() {
			this.analysis(CfgData.getDataByUrl(CfgData.monster_json));
		}
	}
}