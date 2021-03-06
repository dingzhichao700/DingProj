
module egret {

	export interface ISceneElement{
		data:SceneElementDataItem;
		/**
		 * 场景元素数据 
		 * @param value
		 * 
		 */
		
		id:string;
		/**
		 * 场景元素显示对象id 
		 * @param value:String
		 * 
		 */
		
		/**
		 * 获取元素深度 
		 * @return 
		 * 
		 */
		depth:number;
		
		/**
		 * 场景元素刷新
		 * 
		 */	
		updateXY():void;
		
		/**
		 * 添加至场景时处理 
		 * 
		 */
		addToScene():void;
		
		/**
		 * 从场景移除时处理 
		 * 
		 */	
		removeFromScene():void;
	}
}