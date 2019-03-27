
module egret {

	export class SceneElementLo{
		/**
		 * 编号 
		 */		
		public id:number = 0;
		/**
		 * id 的字符串形式，用于内存优化 
		 */		
		private _idString:string = null;
		/**
		 * 场景元素显示的名称 
		 */		
		public name:string = "";
		/**
		 * 表中坐标点数据 
		 */		
		public coorPoint:string = null;
		/**
		 * 场景id 
		 */		
		public sceneId:number = 0;
		/**
		 * 影片名称，不包括路径 
		 */		
		public movieName:string = null;
		/**
		 * 动作类型配置，为空表示有全部动作，有固定类型动作则为模式:0_1_5，表示有3个数值表示的动作类型 
		 */		
		public actionConfig:string = null;
		//坐标点
		private _point:Point = null;
		
		/**
		 * 此方法功能，防止深度复制报错 
		 * @param value
		 * 
		 */		
		public set point(value:Point){
			
		}
		/**
		 * 获取表中的坐标点数据
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
		 * 此方法功能，防止深度复制报错 
		 * @param value
		 * 
		 */	
		public set idString(value:string){
			
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