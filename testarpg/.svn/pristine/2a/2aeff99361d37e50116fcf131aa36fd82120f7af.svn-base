
module egret {

	export class Window extends CoreContainer implements IWindow{
		/**
		 * 因有两个管理器，因此在打开时设置
		 */
		public applicationManager:any = null;
		//窗口层级
		private _layerType:number = 0;
		//窗口对齐方式，默认无对齐方式
		private _align:number = AlignType.NONE;
		//更新类型注册
		private _updateHashMap:HashMap = null;
		//上下左右
		private _top:number = 0;
		private _bottom:number = 0;
		private _left:number = 0;
		private _right:number = 0;
		
		/**
		 * 构造函数
		 */
		public constructor(layerType:number = 0,align:number = -1){
			super();
			
			this._layerType = layerType;
			this._align = align;
			
			this._updateHashMap = new HashMap();
		}
		//

		public get right():number{
			return this._right;
		}
		/**
		 * 与舞台右边框的距离 ，align属性有右对齐时有效
		 * @param value:Number 默认值:0px
		 * @see AlignType
		 * 
		 */
		public set right(value:number){
			if(this._right == value) return;
			
			this._right = value;
			
			this.align = this._align;
		}

		public get left():number{
			return this._left;
		}
		/**
		 * 与舞台左边框的距离 ，align属性有左对齐时有效
		 * @param value:Number 默认值:0px
		 * @see AlignType
		 * 
		 */
		public set left(value:number){
			if(this._left == value) return;
			
			this._left = value;
			
			this.align = this._align;
		}

		public get bottom():number{
			return this._bottom;
		}
		/**
		 * 与舞台下边框的距离 ，align属性有底对齐时有效
		 * @param value:Number 默认值:0px
		 * @see AlignType
		 * 
		 */
		public set bottom(value:number){
			if(this._bottom == value) return;
			
			this._bottom = value;
			
			this.align = this._align;
		}

		public get top():number{
			return this._top;
		}
		/**
		 * 与舞台上边框的距离 ，align属性有顶对齐时有效
		 * @param value:Number 默认值:0px
		 * @see AlignType
		 * 
		 */
		public set top(value:number){
			if(this._top == value) return;
			
			this._top = value;
			
			this.align = this._align;
		}

		public get align():number{
			return this._align;
		}
		/**
		 * 窗口对齐方式，宽高若有改变时，在宽高改变之后设置
		 * @param value:int @see AlignType
		 * 
		 */	
		public set align(value:number){
			this._align = value;

			if(this.applicationManager)
				this.applicationManager.setAlign(this,this._align);
			else
				ApplicationManager.getInstance().setAlign(this,this._align);
		}

		public get layerType():number{
			return this._layerType;
		}
		/**
		 * 窗口层级
		 * @param value:int @see ApplicationLayerType
		 * 
		 */
		public set layerType(value:number){
			if(this._layerType == value) return;
			
			this._layerType = value;
		}

		/**
		 * ApplicationManager.open()方法打开时自动调用的初始化 方法
		 * 
		 */		
		public initWindow():void{
			
		}
		//
		/**
		 * 添加窗口事件，此方法只在recall()中自动调用，其它地方无调用，需要时手动调用
		 * 
		 */		
		public addEvents():void{

		}
		//
		/**
		 * 全局更新时调用，此方法重写时，不用调用super.globalUpdate()
		 * @param updateType:int 更新类型
		 * @param args
		 * @see #ApplicationManager.globalUpdate()
		 * 
		 */		
		public globalUpdate(updateType:number,...args):void{
			
		}
		//
		/**
		 * 自身更新时调用，此方法重写时，不用调用super.update() 
		 * @param args
		 * @see #ApplicationManager.update()
		 */		
		public update(...args):void{
			
		}
		//
		/**
		 * 窗口已实例化，重新打开时，通常用于添加事件，重置显示等
		 * 
		 */		
		public recall():void{
			//不在舞台上时不添加事件，因如果加载界面未完成时，被关闭了，
			//当加载完成时又会调用此方法，导致事件被添加，有可能导致内存泄漏
			if(this.stage)
				this.addEvents();

			if(this.applicationManager)
				this.applicationManager.dispatchRecall(this);
			else
				ApplicationManager.getInstance().dispatchRecall(this);
		}
		//
		/**
		 * 窗口移除时，主要用于清除事件等 
		 * 
		 */		
		public remove():void{

		}
		//
		/**
		 * 添加全局更新类型，当有此类型的更新时，将调用已添加更新类型的窗口的globalUpdate()方法
		 * @param args 全局更新类型数组
		 * 
		 */		
		public addUpdateType(...args):void{
			var length:number = args.length;
			for(var i:number = 0;i < length;i++){
				var updateType:number = args[i];
				if(!this._updateHashMap.containsKey(updateType))
					this._updateHashMap.put(updateType,true);
			}
		}
		//
		/**
		 * 移除全局更新类型
		 * @param args 全局更新类型数组
		 * 
		 */		
		public removeUpdateType(...args):void{
			var length:number = args.length;
			for(var i:number = 0;i < length;i++){
				var updateType:number = args[i];
				this._updateHashMap.remove(updateType);
			}
		}
		//
		/**
		 * 检测是否已注册指定的全局更新类型 
		 * @param updateType:int 
		 * @return 
		 * 
		 */		
		public hasUpdateType(updateType:number = 0):boolean{
			return this._updateHashMap.get(updateType);
		}
		//
		public destroy():void{
			if(this._isDestroy) return;
			
			super.destroy();
		}
	}
}