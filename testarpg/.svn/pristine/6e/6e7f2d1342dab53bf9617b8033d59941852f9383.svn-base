
module egret {

	export class ScriptModel{
		//函数表
		private _hashMap:HashMap = null;
		//函数按优先级分组数组
		private _items:Array<any> = null;
		//项目数量
		private _itemsCount:number = 0;
		//共享个数
		private _sharedCount:number = 0;
		//当前优先级最大值
		private _priorityMax:number = 0;
		/**
		 * 构造函数
		 */
		public constructor(sharedCount:number = 0){
			//缓存机制
			this._sharedCount = sharedCount;
			if(this._sharedCount <= 0){
				throw new Error("sharedCount 必须大于 0");
			}
			
			this._hashMap = new HashMap();
			this._items = new Array<any>(ScriptItem.PRIORITY_MAX);
		}
		//
		/**
		 * 当前优先级最大值
		 * @return
		 *
		 */
		public get priorityMax():number
		{
			return this._priorityMax;
		}
		//
		/**
		 * 项目数量 
		 * @return 
		 * 
		 */
		public get itemsCount():number{
			return this._itemsCount;
		}

		/**
		 * 回函函数表 
		 * @return 
		 * 
		 */		
		public get hashMap():HashMap{
			return this._hashMap;
		}
		//
		/**
		 * 回函函数项目数组 
		 * @return 
		 * 
		 */		
		public get items():Array<any>{
			return this._items;
		}
		//
		/**
		 * 是否已存在数据对象 
		 * @param scriptItem:ScriptItem
		 * @return 
		 * 
		 */		
		public hasScriptItem(scriptItem:ScriptItem):boolean{
			return this._hashMap.containsKey(scriptItem.id);
		}
		//
		/**
		 * 添加回调函数对象 
		 * @param scriptItem:ScriptItem 回调函数数据对象
		 * @return ScriptItem
		 * 
		 */	
		public addScript(scriptItem:ScriptItem):ScriptItem{
			if(this._hashMap.containsKey(scriptItem.id)) return scriptItem;
			
			var items:Array<ScriptItem> = this._items[scriptItem.priority];
			if(!items){
				items = new Array<ScriptItem>(this._sharedCount);
				this._items[scriptItem.priority] = items;
			}
			items[this._itemsCount] = scriptItem;
			this._hashMap.put(scriptItem.id,true);
			this._itemsCount ++;
			this._priorityMax = Math.max(this._priorityMax,scriptItem.priority);
			
			return scriptItem;
		}
		//
		/**
		 * 移除回调函数对象，若已移除所有回调函数，将停止处理
		 * @param scriptItem:ScriptItem 回调函数数据对象
		 * @param destroy:Boolean = false 是否销毁数据对象，若销毁，则无法重新使用，并且返回 null
		 * @return ScriptItem 或  null
		 * 
		 */
		public removeScript(scriptItem:ScriptItem,destroy:boolean = false):ScriptItem{
			if(!this._hashMap.containsKey(scriptItem.id)) return scriptItem;
			
			var items:Array<ScriptItem> = this._items[scriptItem.priority];
			if(items){
				var length:number = this._itemsCount;
				var index:number = 0;
				
				for(var i:number = 0; i < length; i ++){
					if(items[i] == scriptItem){
						index = length - 1;
						
						//把当前位置的项目与最后一个调换
						if(i < index){
							items[i] = items[index];
						}
						items[index] = null;
						
						this._itemsCount --;
						if(this._itemsCount < 0){
							this._itemsCount = 0;
							this._priorityMax = 0;
						}
						break;
					}
				}
			}
				
			this._hashMap.remove(scriptItem.id);
			
			if(destroy)
				scriptItem.destroy();
			
			return scriptItem;
		}
		//
		/**
		 * 停止所有回调函数并销毁所有回调函数，所有ScriptItem对象将不能重新使用
		 * 
		 */
		public destroy():void{
			this._hashMap = null;
			
			var items:Array<ScriptItem> = null;
			var scriptItem:ScriptItem = null;
			var length:number = this._priorityMax;
			for(var i:number = 0;i < length;i++){
				items = this._items[i];
				var length1:number = this._itemsCount;
				for(var i1:number = 0;i1 < length1;i1++){
					scriptItem = items[i1];
					if(scriptItem)
						scriptItem.destroy();
				}
			}
			this._items = null;
			
			this._itemsCount = 0;
		}
	}
}