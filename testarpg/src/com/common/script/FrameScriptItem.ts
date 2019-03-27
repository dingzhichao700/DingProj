
module egret {

	export class FrameScriptItem extends ScriptItem{
		//执行回调函数的帧数间隔，最小值:1 
		private _frameInterval:number = 1;
		
		//帧计数
		private _frameAmount:number = 0;
		/**
		 * 构造函数  
		 * @param execute:Function 回调函数 
		 * @param frameInterval:int = 1 执行回调函数的帧数间隔，最小为 1
		 * @param params:Array <code>execute</code>函数参数列表，数组的每个元素将作为函数的一个参数进行传递，而不将数组作为一个参数传递
		 * @param priority:int = 0  函数优先级，优先级数值大的优先执行，最小值:0 
		 * @param target:Object = null 执行函数的对象，可能为null 
		 * 
		 */		
		public constructor(execute:Function, frameInterval:number = 1, params:Array<any>=null, priority:number=0, target:any=null){
			super(execute, params, priority, target);

			if(isNaN(frameInterval) || frameInterval < 1){
				throw  new Error("frameInterval 必须大于等于 1");
			}
			this.frameInterval = frameInterval;
		}
		//
		public get frameInterval():number{
			return this._frameInterval;
		}

		/**
		 * 执行回调函数的帧数间隔，最小值:1  
		 * @param value:int 
		 * 
		 */		
		public set frameInterval(value:number){
			if(this._frameInterval == value) return;
			
			this._frameInterval = value;
			this._frameInterval = Math.max(this._frameInterval,1);
		}

		/**
		 * 每间隔frameInterval指定的帧数执行一次回调函数 
		 *
		 */		
		public apply():void{
			if(this.execute == null) return;
			
			this._frameAmount ++;
			
			if(this._frameAmount >= this.frameInterval){
				this._currentCount ++;
				this._frameAmount %= this.frameInterval;
				this.execute.apply(this.target,this.params);
			}
		}
		//
		public destroy():void{
			this._frameInterval = 0;
			this._frameAmount = 0;
			
			super.destroy();
		}
	}
}