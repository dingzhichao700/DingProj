
module egret {

	export class LogManager{
		/**
		 * 输出所有日志 
		 */		
		public static LEVEL_ALL:number=0;
		/**
		 * 输出信息和更高级别日志 
		 */		
		public static LEVEL_INFO:number=1;
		/**
		 * 输出调试和更高级别日志 
		 */		
		public static LEVEL_DEBUG:number=2;
		/**
		 * 输出警告级别和更高级别日志 
		 */		
		public static LEVEL_WARN:number=3;
		/**
		 * 输出错误级别和更高级别日志 
		 */		
		public static LEVEL_ERROR:number=4;
		//控制台最大日志数量
		private static MAX_LENGTH:number=500;
		//级别标识
		private static LEVEL_LABELS:Array<string>=Array<string>("ALL","INFO","DEBUG","WARN","ERROR");
		//日志数据对象
		private static _logDatas:Array<any> = null;
		//错误日志
		private static _errDatas:Array<any> = null;
		//当前级别
		private static _level:number= LogManager.LEVEL_ALL;
		//当前长度
		private static _length:number=0;
		//针对的日志对象
		private static _target:any=null;
		//编辑索引
		private static _index:number = 1;
		/**
		 * 构造函数
		 * 
		 */
		public constructor(){
			
		}

		/**
		 * 日志数据 
		 * @return 
		 * 
		 */
		public static get logDatas():Array<any>{
			return LogManager._logDatas;
		}

		/**
		 * 输出警告日志 
		 * @param target:Object 输出日志当前类
		 * @param args 日志列表
		 * 
		 */		
		public static warn(target:any,...args):void{
			LogManager.print(LogManager.LEVEL_WARN,target,args);
		}
		//
		/**
		 * 输出信息日志 
		 * @param target:Object 输出日志当前类
		 * @param args 日志列表
		 * 
		 */		
		public static info(target:any,...args):void{
			LogManager.print(LogManager.LEVEL_INFO,target,args);
		}
		//
		/**
		 * 输出调试日志
		 * @param target:Object 输出日志当前类
		 * @param args 日志列表
		 * 
		 */	
		public static debug(target:any,...args):void{
			LogManager.print(LogManager.LEVEL_DEBUG,target,args);
		}
		//
		/**
		 * 输出错误日志 
		 * @param target :Object 输出日志当前类
		 * @param args 日志列表
		 * 
		 */		
		public static error(target:any,...args):void{
			LogManager.print(LogManager.LEVEL_ERROR,target,args);
		}
		//
		/**
		 * 获取所有日志 html 格式标记级别颜色 
		 * @return 
		 * 
		 */		
		public static getAllMessageHtml():string{
			var line:string = "\n";
			var message:string="";
			
			var length:number = LogManager._logDatas.length;
			for(var i:number=0;i<length;i++){
				if(LogManager._logDatas[i].level == LogManager.LEVEL_ERROR){
					message+= HtmlUtil.getHtml(LogManager._logDatas[i].message,12,"#ff0000");
				}else if(LogManager._logDatas[i].level == LogManager.LEVEL_WARN){
					message+= HtmlUtil.getHtml(LogManager._logDatas[i].message,12,"#FF6600");
				}else{
					message+=LogManager._logDatas[i].message;
				}
				message += line;
			}
			
			return message;
		}
		//
		/**
		 * 获取所有错误日志 html
		 * @return 
		 * 
		 */		
		public static  getErrorMessage():string{
			var line:string = "\n";
			
			var message:string="";
			var length:number = LogManager._errDatas.length;
			
			for(var i:number=0;i<length;i++){
				message+= HtmlUtil.getHtml(LogManager._errDatas[i],12,"#ff0000") + line;
			}
			
			return message;
		}
		//
		/**
		 * 设置日志级别 
		 * @param level:int 日志级别 
		 * 
		 */		
		public static setLevel(level:number = 0):void{
			LogManager.init();
			LogManager._level=level;
			
			for(var i:number=0;i<LogManager._logDatas.length;i++){
				if(LogManager._logDatas[i].level<LogManager._level){
					LogManager._logDatas.splice(i,1);
					i--;
				}
			}
		}
		//
		/**
		 * 设置当前日志的数量长度，超出的将删除 
		 * @param length
		 * 
		 */		
		public static setMaxLength(length:number = 0):void{
			LogManager._length=length;
			
			while(LogManager._logDatas.length>LogManager._length){
				LogManager._logDatas.shift();
			}
		}
		//
		/**
		 * 设置输出日志的对象，非此对象中输出的日志将删除 ，重置为全部输出时时使用 null 作为参数
		 * @param target:Object 
		 * 
		 */		
		public static setTarget(target:any):void{
			LogManager._target=target;
			
			for(var i:number=0;i<LogManager._logDatas.length;i++){
				if(LogManager._logDatas[i].target!=target){
					LogManager._logDatas.splice(i,1);
					i--;
				}
			}
		}
		//
		/**
		 * 输出日志 
		 * @param level:int 级别
		 * @param target:Object 输出日志的对象
		 * @param array:Array
		 * @return 
		 * 
		 */		
		private static print(level:number,target:any,array:Array<any>):string{
			LogManager.init();
			var content:string="";
			
			if(level>=LogManager._level&&(LogManager._target==null||target==LogManager._target)){
				var data:any={
					level:level,
					target:target,
					message:LogManager.getMessage(array)
				};
				
				var className: string = getQualifiedClassName(target);

				var date:Date=new Date();
				content="【"+LogManager.LEVEL_LABELS[level]+"】"+"【#"+(LogManager._index)+" "+
					date.getFullYear()+"."+(date.getMonth()+1)+"."+date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()+"】[class "+
					className+"] "+data.message;
				data.message=content;
				
				LogManager._logDatas.push(data);
				
				if(level == LogManager.LEVEL_ERROR){
					LogManager._errDatas.push(content);
				}
				
				if(LogManager._logDatas.length>LogManager._length){
					LogManager._logDatas.shift();
				}
				if(LogManager._errDatas.length > LogManager._length){
					LogManager._errDatas.shift();
				}
				
				LogManager._index ++;
				if(LogManager._index > LogManager._length){
					LogManager._index = 1;
				}
				
				console.log(content);
			}
			
			return content;
		}
		//
		/**
		 * 组装一条日志 
		 * @param array:Array 日志信息数组
		 * @return 
		 * 
		 */		
		private static getMessage(array:Array<any>):string{
			var message:string="";
			var length:number = array.length;
			for(var i:number = 0;i < length;i++){
				var item:any = array[i];
				message += item + " ";
			}
			
			return message;
		}
		//
		/**
		 * 初始化 
		 * 
		 */		
		private static init():void{
			if(LogManager._logDatas!=null) return;
			
			LogManager._logDatas= [];
			LogManager._errDatas = [];
			
			LogManager.setLevel(LogManager.LEVEL_ALL);
			LogManager.setMaxLength(LogManager.MAX_LENGTH);
		}
	}
}