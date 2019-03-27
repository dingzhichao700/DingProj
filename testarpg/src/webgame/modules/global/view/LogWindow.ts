
module egret {

	export class LogWindow extends Window{
		public static getInstance():egret.LogWindow {
			if(!this._instance){
				this._instance = <LogWindow>openWindow(LogWindow);
			}
			return this._instance;
		}
		private static _instance:LogWindow;

		//日志文本
		private _textArea:TextField = null;
		////刷新
		//private _refreshBtn:Button = null;
		////关闭
		//private _closeBtn:Button = null;
		//自动 刷新时间
		private _refreshTime:number = 0;
		private _timerId:number;
		/**
		 * 构造函数
		 */
		public constructor(){
			super();
			this.layerType = ApplicationLayerType.MENU;
		}
		
		public addEvents():void{
			super.addEvents();
			
			//this._refreshBtn.addEventListener(TouchEvent.TOUCH_TAP,this.refreshBtnClick,this);
			//this._closeBtn.addEventListener(TouchEvent.TOUCH_TAP,this.closeBtnClick,this);
		}
		
		public destroy():void{
			if(this._isDestroy) return;
			
			super.destroy();
		}
		
		public initWindow():void{
			super.initWindow();
			
			//this._refreshBtn = new Button("Refresh");
			//this._refreshBtn.textField.size = 20;
			//this._refreshBtn.x = 10;
			//this._refreshBtn.y = 10;
			//this._refreshBtn.width = 80;
			//this.addChild(this._refreshBtn);
			//
			//this._closeBtn = new Button("Close");
			//this._closeBtn.textField.size = 20;
			//this._closeBtn.x = 100;
			//this._closeBtn.y = 10;
			//this._closeBtn.width = 60;
			//this.addChild(this._closeBtn);
			
			this._textArea = new egret.TextField();
			this._textArea.type = TextFieldType.INPUT;
			this._textArea.multiline = true;
			this._textArea.size = 20;
			this._textArea.y = 50;
			this._textArea.border = true;
			this._textArea.width = 600;
			this._textArea.height = 400;
			this.addChild(this._textArea);
			
			var shape:Shape = new Shape();
			this.addChildAt(shape,0);
			DisplayObjectUtil.drawRect(shape,600,450,0x0,0.6,true,0xcccccc);
			
			this.align = AlignType.TOP_CENTER;
			
			this.recall();
		}
		
		public recall():void{
			super.recall();

			//LoadingManager.getInstance().hide();
			
			//this.refreshBtnClick();
			
			//this._timerId = TimerManager.getInstance().addExecute(this.autoRefresh,this,1000);
		}
		
		private autoRefresh():void{
			//this._refreshBtn.label = "Refresh " + this._refreshTime;
			this._refreshTime --;
			
			if(this._refreshTime <= 0){
				this._refreshTime = 3;
				this.refreshBtnClick();
			}
		}
		
		public remove():void{
			super.remove();
			
			//this._refreshBtn.removeEventListener(TouchEvent.TOUCH_TAP,this.refreshBtnClick,this);
			//this._closeBtn.removeEventListener(TouchEvent.TOUCH_TAP,this.closeBtnClick,this);
			TimerManager.getInstance().removeExecute(this._timerId);
		}
		
		public closeBtnClick(event:TouchEvent):void{
			closeWindow(this);
			//因关闭后导致fp失去焦点，快捷键失效，因此设置焦点
			//ApplicationManager.getInstance().stage.focus = ApplicationManager.getInstance().application;
		}

		public refreshBtnClick(event:TouchEvent = null):void{
			this._textArea.text = LogManager.getErrorMessage();
		}
		//
		public setText(...args):void{
			var text:string = "";
			for(var p in args){
				text += args[p] + ",";
			}
			this._textArea.text += text + "\n";
		}
		//
		public clear():void{
			this._textArea.text = "";
		}
	}
}