
module egret {

	export class ApplicationEvent extends Event{
		/**
		 * 打开窗口 
		 */		
		public static WINDOW_OPEN:string = "windowOpen";
		/**
		 * 关闭窗口 
		 */		
		public static WINDOW_CLOSE:string = "windowClose";
		/**
		 * 窗口调用 recall() 方法 
		 */		
		public static WINDOW_RECALL:string = "windowRecall";
		
		/**
		 * 相关数据 
		 */		
		public data:any = null;
		
		/**
		 * 构造函数
		 */
		public constructor(type:string, bubbles:boolean=false, cancelable:boolean=false, data:any = null){
			super(type, bubbles, cancelable);
			
			this.data = data;
		}
	}
}