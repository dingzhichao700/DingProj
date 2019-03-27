
module egret {

	export class IsoMapData{
		private static _instance:IsoMapData = null;
		//地图数据
		private _hashMap:HashMap = null;
		
		/**
		 * 构造函数
		 */
		public constructor(){
			this._hashMap = new HashMap();
		}

		public static getInstance():IsoMapData{
			return IsoMapData._instance || (IsoMapData._instance = new IsoMapData());
		}
		//
		/**
		 * 设置地图数据 
		 * @param id:* 数据  id
		 * @param data:* 数据对象
		 * 
		 */		
		public setData(id:any,data:any):void{
			if(this._hashMap.containsKey(id)){
				LogManager.error(this,"重复设置地图数据 id = " + id);
			}else{
				this._hashMap.put(id,data);
			}
		}
		//
		/**
		 * 获取地图数据 
		 * @param id:* 数据  id
		 * @return 
		 * 
		 */		
		public getData(id:any):any{
			return this._hashMap.get(id);
		}

	}
}