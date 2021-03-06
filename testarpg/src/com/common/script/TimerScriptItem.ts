
module egret {

	export class TimerScriptItem extends ScriptItem{
		//执行回调函数的时间间隔 ，单位 ms，最小值:20
		private _delay:number = 20;
		/**
		 * 构造函数  
		 * @param execute:Function 回调函数 
		 * @param delay:Number 执行回调函数的时间间隔 ，单位 ms，最小值:20
		 * @param params:Array <code>execute</code>函数参数列表，数组的每个元素将作为函数的一个参数进行传递，而不将数组作为一个参数传递
		 * @param priority:int = 0 函数优先级，优先级数值大的优先执行，最小值:0 
		 * @param target:Object = null 执行函数的对象，可能为null 
		 * 
		 */	
		public constructor(execute:Function,delay:number = 20,params:Array<any>=null,priority:number=0,target:any=null){
			super(execute,params,priority,target);

			if(isNaN(delay) || delay < 1){
				throw  new Error("delay 必须大于等于 1");
			}
			this.delay=delay;
		}
		//

		/**
		 * 
		 */
		public get delay():number{
			return this._delay;
		}

		/**
		 * 执行回调函数的时间间隔 ，单位 ms，最小值:20
		 * @param value:Number 毫秒数
		 * 
		 */		
		public set delay(value:number){
			if(this._delay == value) return;
			
			this._delay = value;
			this._delay = Math.max(this._delay,20);
		}
		//
		public destroy():void{
			this._delay = 20;
			
			super.destroy();
		}
	}
}