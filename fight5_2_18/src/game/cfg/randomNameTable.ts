module game {
	export class RandomNameCfg {
		id: number;
		/**名字类型 */
		type: number;
		/**名字 */
		name: string;
	}
	export class RandomNameTable extends DLG.BaseTable {
		private static cfg: DLG.Table
		public static init() {
			this.analysis(RES.getRes(CfgData.randomName_json));
		}
	}
}