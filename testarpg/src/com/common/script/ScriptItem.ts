
module egret {

	export class ScriptItem implements IDestroy{
		/**
		 *  优先级最大值
		 */
		public static PRIORITY_MAX:number = 10;
		/**
		 *  优先级最小值
		 */
		public static PRIORITY_MIN:number = 0;
		//函数优先级，优先级数值大的优先执行，最小值:0
		private _priority:number = 0;
		/**
		 * 标记此对象的唯一ID值
		 * @type {number}
		 */
		public id:number = NaN;
		/**
		 * 执行函数的对象，可能为null 
		 */		
		public target:any = null;

		/**
		 * 回调函数 
		 */		
		public execute:Function = null;
		/**
		 * <code>execute</code>函数参数列表，数组的每个元素将作为函数的一个参数进行传递，而不将数组作为一个参数传递
		 */		
		public params:Array<any> = null;
		/**
		 * 执行次数 
		 */		
		public repeatCount:number = 0;
		//已执行次数
		public _currentCount:number = 0;
		/**
		 * 构造函数  
		 * @param execute:Function 回调函数 
		 * @param params:Array <code>execute</code>函数参数列表，数组的每个元素将作为函数的一个参数进行传递，而不将数组作为一个参数传递
		 * @param priority:uint = 0  函数优先级，优先级数值大的优先执行，最小值:0 
		 * @param target:Object = null 执行函数的对象，可能为null 
		 * 
		 */		
		public constructor(execute:Function = null,params:Array<any> = null,priority:number = 0,target:any = null){
			//if(execute == null)
			//	throw new Error("execute 不能为空");
			
			this.execute = execute;
			this.params = params;
			this.priority = priority;
			this.target = target;
			this._currentCount = 0;
		}
		/**
		 * 当前已执行次数 
		 * @return 
		 * 
		 */		
		public get currentCount():number{
			return this._currentCount;
		}
		//
		public get priority():number{
			return this._priority;
		}
		
		/**
		 * 函数优先级，优先级数值大的优先执行，最小值:0，最大值10
		 * @param value:uint
		 * 
		 */		
		public set priority(value:number){
			if(this._priority == value) return;

			value = Math.max(value,ScriptItem.PRIORITY_MIN);
			value = Math.min(value,ScriptItem.PRIORITY_MAX);
			this._priority = value;
		}
		//
		public get isCompleted():boolean{
			return this.repeatCount > 0 && this._currentCount >= this.repeatCount;
		}
		//
		/**
		 * 执行回调函数 
		 * @param args 逻辑条件参数
		 * 
		 */		
		public apply():any{
			if(this.execute == null) return null;
			
			this._currentCount ++;
			
			return this.execute.apply(this.target,this.params);
		}
		//
		/**
		 * 销毁对象 ，数据清空，对象可重用
		 * 
		 */		
		public destroy():void{
			this._currentCount = 0;
			this.repeatCount = 0;
			this._priority = 0;
			
			this.target = null;
			this.execute = null;
			this.params = null;
		}
	}
}