module game {
	export class GoodsCfg {
		id: number;
		/**物品类型  1装备  2其他  */
		type: number;
		name:string;
		typeName:string;
		limit:string;
		/**描叙 */
		des: string;
		/**按钮类型 */
		subType: number;
		/**属性  1显示属性 2不显示属性*/
		showAtt:number
		atk:number
		def:number
		hp:number
	}
	export class GoodsTable extends DLG.BaseTable {
		protected static type_arr: Array<GoodsCfg>
		public static init() {
			this.analysis(CfgData.getDataByUrl(CfgData.goods_json));
		}
		public static findSceneArrByType(type: number): Array<GoodsCfg> {
			let self = this;
			if (!self._table) self.init();
			if (self.type_arr) {
				return self.type_arr;
			}
			self.type_arr = [];
			let data: Object = self._table.getData();
			for (var key in data) {
				if (data.hasOwnProperty(key)) {
					var element: GoodsCfg = data[key];
					if (element.type == type) {
						self.type_arr.push(element);
					}
				}
			}
			return self.type_arr;
		}
	}
}