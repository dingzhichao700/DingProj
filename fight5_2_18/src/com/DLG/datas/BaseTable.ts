module DLG {
	export class BaseTable {
		protected static _table: DLG.Table
	
		protected static init() {

		}
		protected static analysis(dataArr: any[]) {
			if (this._table == undefined) {
				// var dataArr = JSON.parse(RES.getRes(name));
				if (!dataArr) {
					throw new Error('配置文件不存在：' + 　name);
				}
				this._table = new DLG.Table();
				this._table.setData(dataArr);
			}
		}

		public static getCfgById<T>(id: number): T {
			let self = this;
			if (!self._table) {
				self.init();
			}
			let cfg: T;
			cfg = self._table.getObjById(id);
			if (!cfg) {
					throw new Error('配置文件不存在：' + id);
				}
			return cfg;
		}

		public static getDataVec<T>(): Array<T>{
			let self = this;
			if (!self._table) {
				self.init();
			}
			let arr: Array<T>
			arr = self._table.getDatavec();
			return arr;
		}
	}
}