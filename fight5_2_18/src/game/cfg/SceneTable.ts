module game {
	export class SceneCfg {
		id: number;
		/**场景类型  1普通野外  2副本  */
		type: number;
		/**场景名字 */
		name: string;
		des: string;
		age:string;
		/**场景二级类型 */
		subType: number;
		/**地图背景id */
		mapid: number;
		/**怪物id 以"|"分开 */
		monster: string;
		/**每波的怪物数量,以|分开 */
		roundMonsterNum: string;
		/**打BOSS需要波数 */
		needwave: number;
		/**副本buff个数 */
		buffNum: number;
		/**副本buff区间 */
		buffIds: string;
		buffHold: string;
		/**buff作用数值*/
		buf_attack_num: string
		/**buff作用万分比*/
		buf_attack_per: string;
		/**Boss掉落 */
		bossReward: number;
		/**小怪掉落 */
		reward: number;
		/**难度系数 与基础属性相乘*/
		difficult: number;
	}
	export class SceneTable extends DLG.BaseTable {
		protected static type_arr: Array<SceneCfg>
		public static init() {
			this.analysis(CfgData.getDataByUrl(CfgData.scene_json));
		}
		public static findSceneArrByType(type: number): Array<SceneCfg> {
			let self = this;
			if (!self._table) self.init();
			if (self.type_arr) {
				return self.type_arr;
			}
			self.type_arr = [];
			let data: Object = self._table.getData();
			for (var key in data) {
				if (data.hasOwnProperty(key)) {
					var element: SceneCfg = data[key];
					if (element.type == type) {
						self.type_arr.push(element);
					}
				}
			}
			return self.type_arr;
		}
	}
}