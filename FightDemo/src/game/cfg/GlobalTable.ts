module game {
	export enum ENUM_GLOBAL_ID
	{
		/**伤害加深区间  下限|上限 */
		G_10001 = 10001,
		/**怪物伤害减免区间  下限|上限 */
		G_10002 = 10002,
		/**暴击倍数区间  下限|上限 */
		G_10003 = 10003,
		/**暴击几率区间  下限|上限  */
		G_10004 = 10004,

	}	
	export class GlobalCfg {
		id: number
		/**值 */
		valueStr: string;
		/**值 */
		valueNum: number;
	}
	export class GlobalTable extends DLG.BaseTable {
		private static cfg: DLG.Table
		public static init() {
			this.analysis(CfgData.getDataByUrl(CfgData.global_json));
		}
	}
}