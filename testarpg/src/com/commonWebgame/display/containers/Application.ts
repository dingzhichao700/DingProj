
module egret {
	export class Application extends Window{
    	
		/**
		 * 构造函数 
		 * @param isMain:Boolean = false 是否为主程序，主程序将注册到ApplicationManager中，并且为单列
		 * 
		 */		
		public constructor(isMain:boolean = false){
			super();
			//this.tabEnabled = false;
			//this.tabChildren = false;
			if(isMain)
				this.addEventListener(Event.ADDED_TO_STAGE,this.thisAddedToStage,this);
		}

		/**应用程序添加至舞台后自动调用此方法*/		
		public initWindow():void{
			super.initWindow();
			
			if(this.stage) {
                ApplicationManager.getInstance().init(this);
			} else {
                LogManager.warn(this,"舞台不存在，主程序有误");
			}
		}

		public destroy():void{
			if(this._isDestroy) 
    			return;
			super.destroy();
		}

		/**添加到舞台*/		
		private thisAddedToStage(e:Event):void{
			this.removeEventListener(Event.ADDED_TO_STAGE,this.thisAddedToStage,this);
			this.initWindow();
		}
		
	}
}