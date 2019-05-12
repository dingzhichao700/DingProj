module game {
	export class LanCfg {
		id
		/**文字内容 */
		text: string;
	}
	export class LanTable extends DLG.BaseTable {

		public static init() {
			this.analysis(CfgData.getDataByUrl(CfgData.lan_json));
		}
	}
}