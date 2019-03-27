
module egret {

	export class ScriptItemManager{
		private static FRAME_SCRIPT_ITEM:string = "FrameScriptItem";
		private static TIMER_SCRIPT_ITEM:string = "TimerScriptItem";
		private static CLIP_SCRIPT_ITEM:string = "ClipScriptItem";
		
		//单例 
		private static _instance:ScriptItemManager = null;
		//类表
		private _hashMap:HashMap = null;
		/**
		 * 构造函数
		 */
		public constructor(){
			this._hashMap = new HashMap();
		}
		//
		/**
		 * 单例 
		 * @return 
		 * 
		 */		
		public static getInstance():ScriptItemManager{
			return ScriptItemManager._instance || (ScriptItemManager._instance = new ScriptItemManager());
		}
		//
		/**
		 * 获取逐帧回调函数项目  
		 * @param execute:Function 回调函数 
		 * @param frameInterval:int = 1 执行回调函数的帧数间隔，最小为 1
		 * @param params:Array <code>execute</code>函数参数列表，数组的每个元素将作为函数的一个参数进行传递，而不将数组作为一个参数传递
		 * @param priority:int = 0  函数优先级，优先级数值大的优先执行，最小值:0 
		 * @param target:Object = null 执行函数的对象，可能为null 
		 * 
		 */
		public getFrameScriptItem(execute:Function, frameInterval:number = 1, params:Array<any>=null, priority:number=0, target:any=null):FrameScriptItem{
			var items:Array<any> = this.getItems(ScriptItemManager.FRAME_SCRIPT_ITEM);
			var item:FrameScriptItem = null;
			if(items.length > 0){
				item = items.pop();
				item.execute = execute;
				item.frameInterval = frameInterval;
				item.params = params;
				item.priority = priority;
				item.target = target;
			}else{
				item = new FrameScriptItem(execute,frameInterval,params,0,target);
			}
			
			return item;
		}
		//
		/**
		 * 获取计时回调函数项目  
		 * @param execute:Function 回调函数 
		 * @param delay:Number 执行回调函数的时间间隔 ，单位 ms，最小值:20
		 * @param params:Array <code>execute</code>函数参数列表，数组的每个元素将作为函数的一个参数进行传递，而不将数组作为一个参数传递
		 * @param priority:int = 0 函数优先级，优先级数值大的优先执行，最小值:0 
		 * @param target:Object = null 执行函数的对象，可能为null 
		 * 
		 */
		public getTimerScriptItem(execute:Function,delay:number = 20,params:Array<any>=null,priority:number=0,target:any=null):TimerScriptItem{
			var items:Array<any> = this.getItems(ScriptItemManager.TIMER_SCRIPT_ITEM);
			var item:TimerScriptItem = null;
			if(items.length > 0){
				item = items.pop();
				item.execute = execute;
				item.delay = delay;
				item.params = params;
				item.priority = priority;
				item.target = target;
			}else{
				item = new TimerScriptItem(execute,delay,params,priority,target);
			}
			
			return item;
		}
		//
		/**
		 * 获取影片帧回调函数项目 
		 * @param execute:Function 回调函数 
		 * @param frameIndex:int = 1
		 * @param params:Array <code>execute</code>函数参数列表，数组的每个元素将作为函数的一个参数进行传递，而不将数组作为一个参数传递
		 * @param priority:int = 0  函数优先级，优先级数值大的优先执行，最小值:0 
		 * @param target:Object = null 执行函数的对象，可能为null 
		 * 
		 */
		public getClipScriptItem(execute:Function,frameIndex:number = 1,params:Array<any> = null,priority:number = 0,target:any = null):ClipScriptItem{
			var items:Array<any> = this.getItems(ScriptItemManager.CLIP_SCRIPT_ITEM);
			var item:ClipScriptItem = null;
			if(items.length > 0){
				item = items.pop();
				item.execute = execute;
				item.frameIndex = frameIndex;
				item.params = params;
				item.priority = priority;
				item.target = target;
			}else{
				item = new ClipScriptItem(execute,frameIndex,params,priority,target);
			}
			
			return item;
		}
		//
		/**
		 * 回收回调函数数据对象 
		 * @param item:ScriptItem
		 * 
		 */		
		public recoverScriptItem(item:ScriptItem):ScriptItem{
			if(!item) return null;
			
			//去除外部对象引用
			item.destroy();
			
			var type:string = null;
			
			if(item instanceof FrameScriptItem){
				type = ScriptItemManager.FRAME_SCRIPT_ITEM;
			}else if(item instanceof TimerScriptItem){
				type = ScriptItemManager.TIMER_SCRIPT_ITEM;
			}else if(item instanceof ClipScriptItem){
				type = ScriptItemManager.CLIP_SCRIPT_ITEM;
			}
			
			var array:Array<any> = this.getItems(type);
			array.push(item);
			
			return item;
		}
		//
		/**
		 * 获取数据数组 
		 * @param classType:* 类或类字符串
		 * @return 
		 * 
		 */		
		private getItems(classType:string):Array<any>{
			var array:Array<any> = this._hashMap.get(classType);
			if(!array){
				array = [];
				this._hashMap.put(classType,array);
			}
			
			return array;
		}
	}
}