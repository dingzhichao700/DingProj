
module egret {

	export class TimeRecordManager{
		//单例
		private static _instance:TimeRecordManager = null;
		//时间记录
		private _timeDict:any = null;
		//相对时间记录
		private _relativeMap:HashMap = null;
		//
		public constructor(){
			this._timeDict = new Object();
			this._relativeMap = new HashMap();
		}
		//
		/**
		 * 单例 
		 * @return 
		 * 
		 */		
		public static getInstance():TimeRecordManager{
			return TimeRecordManager._instance || (TimeRecordManager._instance = new TimeRecordManager());
		}
		//
		/**
		 * 记录运行时间 ，使用getTimer()计算，单位为ms
		 * @param id:* 标识
		 * @param isPrint:Boolean = true 是否输出
		 * @param message:String = null 消息
		 * 
		 */		
		public recordTime(id:any,isPrint:boolean = true,message:any = ""):number{
			var result:number = 0;
			
			var time:number = getTimer();
			if(this._timeDict[id]){
				result = (time - this._timeDict[id]);
				
				if(isPrint){
					console.log("[id=" + id + "]:" + message + " 距离上次记录用时:" + result);
				}
			}
			
			this._timeDict[id] = time;
			
			return result;
		}
		//
		/**
		 * 重置相对时间 
		 * @param id:* 标识符
		 * 
		 */		
		public resetRelativeTime(id:any):void{
			this._relativeMap.put(id,new Date().getTime());
		}
		//
		/**
		 * 获取重置相对时间后，经过的时间(实际经过的系统时间，非getTimer())，单位为ms
		 * @param id:* 标识符
		 * @return 未使用resetRelativeTime()重置时间时返回 -1
		 * 
		 */		
		public getRelativeTime(id:any):number{
			if(this._relativeMap.containsKey(id)){
				var time:number = this._relativeMap.get(id);
				
				return new Date().getTime() - time;
			}
			
			return -1;
		}
	}
}