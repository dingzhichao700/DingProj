module game {
	export class EffectCfg {
		id: number
		/**特效 */
		movie: string;
		/**大特效 */
		bigmovie: string;
		/**图层 1底 2中 3顶 */
		layer: number;
		/**部位  1上 2中 3下 */
		site: number;
		/**偏移量 */
		py: number;
		/**显示范围 */
		range: number;
	}
	export class EffectTable extends DLG.BaseTable {
		private static cfg: DLG.Table
		public static init() {
			this.analysis(CfgData.getDataByUrl(CfgData.effect_json));
		}
	}
}