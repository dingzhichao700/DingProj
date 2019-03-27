
module egret {

	export class DateUtil{
		/**
		 * 毫秒值
		 */		
		public static VALUE_MILLISECOND:number = 1;
		/**
		 * 一秒毫秒值 
		 */		
		public static VALUE_SECOND:number = 1000;
		/**
		 * 一分钟毫秒值 
		 */		
		public static VALUE_MINUTE:number = 60 * DateUtil.VALUE_SECOND;
		/**
		 * 5分钟毫秒值 
		 */		
		public static VALUE_MINUTE_5:number = 5 * 60 * DateUtil.VALUE_SECOND;
		/**
		 * 10分钟毫秒值
		 */		
		public static VALUE_MINUTE_10:number = 1 * 60 * DateUtil.VALUE_SECOND * 10;
		/**
		 * 一小时毫秒值 
		 */		
		public static VALUE_HOUR:number = 3600 * DateUtil.VALUE_SECOND;
		/**
		 * 一天毫秒值 
		 */		
		public static VALUE_DATE:number = 24 * DateUtil.VALUE_HOUR;
		/**
		 * 一星期毫秒值 
		 */		
		public static VALUE_WEEK:number = 7 * DateUtil.VALUE_DATE;
		/**
		 * 一月毫秒值(30天)  
		 */		
		public static VALUE_MONTH:number = 30 * DateUtil.VALUE_DATE;
		/**
		 * 一年毫秒值(365天) 
		 */		
		public static VALUE_YEAR:number = 365 * DateUtil.VALUE_DATE;
		/**
		 * 当前时区时间差毫秒值
		 */		
		public static TIMEZONE_OFFSET:number = new Date().getTimezoneOffset() * DateUtil.VALUE_MINUTE;
		
		private static SIGNS:Array<any> = ["-","-","  ",":",":",""];
		/**
		 * 构造函数
		 */
		public constructor(){
			throw new Error("TimeUtil just is a static class.");
		}
		//
		/**
		 * 根据时间量返回时间对象(相对于1970年标准时间):x年x月x日x时x分x秒x毫秒 具有以下属性:<br/>
		 * years 年<br/>
		 * months 月 0-29<br/>
		 * days 日 0-11<br/>
		 * hours 时 0-23<br/>
		 * minutes 分 0-59<br/>
		 * seconds 秒 0-59<br/>
		 * milliseconds 毫秒 0-999<br/>
		 * @param millisecond:Number毫秒
		 * @return Object
		 */	
		public static getTimeObject(millisecond:number):any{
			var mYear:number = millisecond % DateUtil.VALUE_YEAR;
			var mMonth:number = mYear % DateUtil.VALUE_MONTH;
			var mDate:number = mMonth % DateUtil.VALUE_DATE;
			var mHour:number = mDate % DateUtil.VALUE_HOUR;
			var mMinute:number = mHour % DateUtil.VALUE_MINUTE;
			
			var o:any=new Object();
			o.years = Math.floor(millisecond / DateUtil.VALUE_YEAR);
			o.months = Math.floor(mYear / DateUtil.VALUE_MONTH);
			o.days = Math.floor(mMonth / DateUtil.VALUE_DATE);
			o.hours = Math.floor(mDate / DateUtil.VALUE_HOUR);
			o.minutes = Math.floor(mHour / DateUtil.VALUE_MINUTE);
			o.seconds = Math.floor(mMinute / DateUtil.VALUE_SECOND);
			o.milliseconds = Math.floor(mMinute % DateUtil.VALUE_SECOND);
			
			return o;
		}
		//
		/**
		 * 由指定毫秒数返回倒计时时间:y-m-d h:m:s，如果y,m,d为0则省略，h,m,s始终不省略
		 * @param time:Number 毫秒
		 * @return 
		 * 
		 */		
		public static getTime(time:number):string{
			var o:any=DateUtil.getTimeObject(time);
			var result:string="";
			var array:Array<any>=[o.years,o.months,o.days,o.hours,o.minutes,o.seconds];
			var signs:Array<any>= DateUtil.SIGNS;
			for(var i:number=0;i<array.length;i++){
				if(i>2||array[i]!=0){
					result+=NumberUtil.getMultipleValue(array[i])+signs[i];
				}
			}
			
			return result;
		}
		//
		/**
		 * 获取本地时间对象 
		 * @param time:Number 毫秒值
		 * @return 
		 * 
		 */		
		public static getDate(time:number):Date{
			return new Date(time + DateUtil.TIMEZONE_OFFSET);
		}
	}
}