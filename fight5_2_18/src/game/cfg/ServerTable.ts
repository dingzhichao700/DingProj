module game {
	export class ServerCfg {
		id
		/**ip配置 */
		config: string;
	}
	export class ServerTable extends DLG.BaseTable {
		public static init() {
			this.analysis(RES.getRes(CfgData.server_json));
		}
	}
}