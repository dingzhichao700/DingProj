
module egret {

	export interface IWindow{
		/**
		 * 窗口层级  
		 * @param value:int @see ApplicationLayerType
		 * 
		 */
		layerType:number;
		//
		/**
		 * 窗口对齐方式 
		 * @param value:int @see AlignType
		 * 
		 */
		align:number;
		//
		/**
		 * ApplicationManager.open()方法打开时自动调用的初始化 方法
		 * 
		 */		
		initWindow():void;
		/**
		 * 添加窗口事件 
		 * 
		 */		
		addEvents():void;
		//
		/**
		 * 全局更新时调用 
		 * @param updateType:int 更新类型
		 * @param args
		 * 
		 */		
		globalUpdate(updateType:number,...args):void;
		//
		/**
		 * 自身更新时调用 
		 * @param args
		 * 
		 */		
		update(...args):void;
		//
		/**
		 * 窗口已实例化，重新打开时，通常用于添加事件，重置显示等
		 * 
		 */		
		recall():void;
		//
		/**
		 * 窗口移除时，主要用于清除事件等 
		 * 
		 */		
		remove():void;
		//
		/**
		 * 添加全局更新类型，当有此类型的更新时，将调用此对象的globalUpdate()方法
		 * @param args 全局更新类型数组
		 * 
		 */		
		addUpdateType(...args):void;
		/**
		 * 移除全局更新类型 
		 * @param args 全局更新类型数组
		 * 
		 */		
		removeUpdateType(...args):void
		//
		/**
		 * 检测是否已注册指定的全局更新类型 
		 * @param updateType:int 
		 * @return 
		 * 
		 */		
		hasUpdateType(updateType:number):boolean;
	}
}