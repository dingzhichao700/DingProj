module game {
	export class BuffCfg {
		id: number;
		/**说明  */
		desc: number;
		/**动画 */
		effect: number;
		// /**作用方  1-自己  2-目标  3-队友 4-敌方  */
		// target: number;
		/**作用距离 9999表示全屏 */
		// range: number;
		/**效果类型 */
		actionType: number;
		/**生效条件  1-触发  2-发射子弹  3-死亡  4-定时触发 */
		trigger: number;
	
	}
	export class BuffTable extends DLG.BaseTable {
		protected static type_arr: Array<BuffCfg>
		public static init() {
			this.analysis(CfgData.getDataByUrl(CfgData.buff_json));
		}
	
	}
}