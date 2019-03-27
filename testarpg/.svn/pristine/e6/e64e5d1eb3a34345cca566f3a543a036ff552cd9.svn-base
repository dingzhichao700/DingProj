
module egret {

	export class NumberUtil{
		/**
		 * 构造函数
		 */
		public constructor(){
			throw new Error("NumberUtil just is a static class.");
		}
		//
		/**
		 * 返回指定位数数值字符串，位数不足时高位补0 
		 * @param value:Number 一个数值
		 * @param count:int 返回的字符串位数
		 * @return String
		 * 
		 */		
		public static getMultipleValue(value:number,count:number=2):string{
			var result:string=value + "";
			while(result.length<count){
				result="0"+result;
			}
			
			return result;
		}
		//
		/**
		 * 限制对象的值，若小于最小值则返回最小值，若大于最大值则最大值，否则返回原值
		 * @param value:Number 当前值
		 * @param min:Number 最小值
		 * @param max:Number 最大值
		 * @return 
		 * 
		 */		
		public static limitValue(value:number,min:number = NaN,max:number = NaN):number{
			if(!isNaN(min) && value < min)
				value = min;
			if(!isNaN(max) && value > max)
				value = max;
			
			return value;
		}
	}
}