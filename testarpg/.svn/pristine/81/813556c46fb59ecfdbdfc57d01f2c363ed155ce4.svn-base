
module egret {

	export class SceneLo{
		/**
		 * 编号 
		 */		
		public id:number = 0;
		/**
		 * 地图 id 
		 */		
		public mapId:number = 0;
		/**
		 * 场景元素显示的名称 
		 */		
		public name:string = "";
		/**
		 * 默认出生点id 
		 */		
		public bornPoint:number = 0;
		/**
		 * 坐标 
		 */		
		public coorPoint:string = null;
		/**
		 * 势力 InfluenceType
		 */		
		public area:number = 0;
		/**
		 * 城市类型 
		 */		
		public type:number = 0;
		/**
		 * 是否开启 
		 */		
		public enabled:number = 0;
		/**
		 * 是否显示 
		 */		
		public visible:number = 0;
		
		//坐标点
		private _point:Point = null;
		/**
		 * id 的字符串形式，用于内存优化 
		 */		
		private _idString:string = null;
		/**
		 * 坐标点 
		 * @return 
		 * 
		 */
		public get point():Point{
			if(!this._point){
				var array:Array<any> = this.coorPoint.split(",");
				this._point = new Point(array[0],array[1]);
			}
			
			return this._point;
		}
		//
		/**
		 * id 的字符串形式，用于内存优化 
		 */
		public get idString():string{
			if(!this._idString) this._idString = this.id + "";
			
			return this._idString;
		}

	}
}