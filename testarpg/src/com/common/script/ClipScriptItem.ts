
module egret {

	export class ClipScriptItem extends ScriptItem{
		//帧索引，最小值:1 
		private _frameIndex:number=0;
		
		/**
		 * 构造函数  
		 * @param execute:Function 回调函数 
		 * @param frameIndex:int = 1
		 * @param params:Array <code>execute</code>函数参数列表，数组的每个元素将作为函数的一个参数进行传递，而不将数组作为一个参数传递
		 * @param priority:int = 0  函数优先级，优先级数值大的优先执行，最小值:0 
		 * @param target:Object = null 执行函数的对象，可能为null 
		 * 
		 */		
		public constructor(execute:Function,frameIndex:number = 1,params:Array<any> = null,priority:number = 0,target:any = null){
			super(execute,params,priority,target);

			if(isNaN(frameIndex) || frameIndex < 1){
				throw  new Error("frameIndex 必须大于等于 1");
			}
			this.frameIndex=frameIndex;
		}

		public get frameIndex():number{
			return this._frameIndex;
		}

		/**
		 * 帧索引，最小值:1，添加至影片后设置此属性将不能使数据对象在正确的帧中执行，应在添加至影片前设置
		 * @param value:int
		 * 
		 */		
		public set frameIndex(value:number){
			if(this._frameIndex == value) return;
			
			this._frameIndex = value;
			this._frameIndex = Math.max(this._frameIndex,1);
		}
		
		public destroy():void{
			this._frameIndex = 0;
			
			super.destroy();
		}

	}
}