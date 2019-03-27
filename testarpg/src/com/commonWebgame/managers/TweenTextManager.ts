
module egret {

	export class TweenTextManager{
		/**
		 * 停留毫秒数，所有类型共用 
		 */		
		public stayTime:number = 2000;
		//单例
		private static _instance:TweenTextManager = null;
		
		//向上缓动的初始停留线，文本的y坐标
		private _topLineY:number = 0;
		//向下缓动距离底端的高度，即距离舞台底端的高度，文本坐标为stage.stageHeight - bottomLineY
		private _bottomLineY:number = 0;
		//Alpha值缓动初始停留线，文本的y坐标
		private _alphaLineY:number = 0;
		//舞台
		private _stage:Stage = null;
		//文本对象和类型表
		private _hashMap:HashMap = null;
		//文本容器
		private _textContainer:DisplayObjectContainer = null;
		//主容器
		private _container:DisplayObjectContainer = null;
		//计时器
		private _timer:Timer = null;
		//停留数据
		private _stayDatas:Array<any> = null;
		private _textFields:Array<TextField>;
		/**
		 * 构造函数
		 */
		public constructor(){
			this._hashMap = new HashMap();
			this._stayDatas = [];
			this._textFields = [];
			
			this._textContainer = new DisplayObjectContainer();
			this._textContainer.touchEnabled = false;
			this._textContainer.touchChildren = false;
			this._textContainer.filters = [new GlowFilter(0x0,1,2,2,3,1)];
		}
		//
		/**
		 * 单例 
		 * @return 
		 * 
		 */		
		public static getInstance():TweenTextManager{
			return TweenTextManager._instance || (TweenTextManager._instance = new TweenTextManager());
		}
		//
		/**
		 * 初始化数据 
		 * @param stage:Stage 舞台
		 * @param container:DisplayObjectContainer 显示文本所使用的容器
		 * @param topLineY:int 向上缓动的初始停留线，文本的y坐标
		 * @param bottomLineY:int 向下缓动距离底端的高度，即距离舞台底端的高度，文本坐标为stage.stageHeight - bottomLineY
		 * @param alphaLineY:int Alpha值缓动初始停留线，文本的y坐标
		 * @param stayTime:int = 3000 停留毫秒数，所有类型共用 
		 * 
		 */		
		public init(stage:Stage,container:DisplayObjectContainer,topLineY:number,bottomLineY:number,alphaLineY:number,stayTime:number = 5000):void{
			if(!stage){
				LogManager.error(this,"舞台不能为空");
				return;
			}
			
			this._stage = stage;
			this._container = container ? container : stage;
			this._topLineY = topLineY;
			this._bottomLineY = bottomLineY;
			this._alphaLineY = alphaLineY;
			this.stayTime = stayTime;
			
			this._stage.addEventListener(Event.RESIZE,this.stageResize,this);
		}
		//
		/**
		 * 缓动文本 
		 * @param text:String 文本字符串
		 * @param type:int = 0 缓动类型，默认值0为向上缓动 TweenTextType
		 * @param format:TextFormat = null 文本格式
		 * @see TweenTextType
		 * 
		 */		
		public tween(text:string,type:number = 0,size:number = 20,color:number = 0xFFff00):void{
			if(!this._stage){
				LogManager.error(this,"未初始化，请调用init()方法初始化数据");
				return;
			}
			
			if(!text) return;

			if(!this._textContainer.parent)
				this._container.addChild(this._textContainer);
			
			var array:Array<any> = this._hashMap.get(type);
			if(!array){
				array = new Array<any>();
				this._hashMap.put(type,array);
			}
			
			var textField:TextField = null;
			var y:number = 0;
			var length:number = array.length;
			var time:number = 0;
			var offset:number = 0;
			var tempTextField:TextField = this.getTextField(text,size,color);
			
			//排列先前的文本
			for(var i:number = length - 1; i >= 0; i--){
				textField = array[i];
				if(type == TweenTextType.MOVE_DOWN){
					y = this._stage.stageHeight - this._bottomLineY + tempTextField.height + offset;
					time = 0.1;
				}else if(type == TweenTextType.MOVE_UP){
					y = this._topLineY - textField.height - offset;
					time = 0.1;
				}else if(type == TweenTextType.ALPHA){
					y = this._alphaLineY - textField.height - offset;
					time = 0.3;
				}
				
				offset += textField.height;

				egret.Tween.removeTweens(textField);
				Tween.get(textField).to({y:y,alpha:1},time).call(this.moveComplete,this,[textField,type]);
			}
			
			//处理当前文本
			textField = tempTextField;
			array.push(textField);
			this._textContainer.addChild(textField);
			
			length = 2;
			if(type == TweenTextType.MOVE_DOWN){
				textField.y = this._stage.stageHeight - this._bottomLineY - textField.height * length;
				y = this._stage.stageHeight - this._bottomLineY;
				time = 0.2;
			}else if(type == TweenTextType.MOVE_UP){
				textField.y = this._topLineY + textField.height * length;
				y = this._topLineY;
				time = 0.2;
			}else if(type == TweenTextType.ALPHA){
				textField.y = this._alphaLineY;
				y = this._alphaLineY;
				time = 0.6;
			}
			textField.alpha = 0;
			
			Tween.removeTweens(textField);
			Tween.get(textField).to({y:y,alpha:1},time).call(this.moveComplete,this,[textField,type]);
		}
		//
		/**
		 * 渐显移动结束，开始计时 
		 * @param textField
		 * @param type
		 * 
		 */		
		private moveComplete(textField:TextField,type:number = 0):void{
			this._stayDatas.push({textField:textField,type:type,time:0,startTime:getTimer()});
			this.setTimer(true);
		}
		//
		/**
		 * 停留结束 
		 * @param textField
		 * @param type
		 * 
		 */		
		private stayComplete(textField:TextField,type:number = 0):void{
			var array:Array<any> = this._hashMap.get(type);
			for(var i:number = 0; i < array.length; i++){
				if(array[i] == textField){
					array.splice(i,1);
					break;
				}
			}
			
			var length:number = 2;
			var y:number = 0;
			if(type == TweenTextType.MOVE_UP){
				y = textField.y - textField.height * length;
			}else if(type == TweenTextType.MOVE_DOWN){
				y = textField.y + textField.height * length;
			}else if(type == TweenTextType.ALPHA){
				y = textField.y;
			}
			
			Tween.get(textField).to({y:y,alpha:0},0.6).call(this.endMoveComplete,this,[textField,type]);
		}
		//
		/**
		 * 移动结束后移除 
		 * @param textField
		 * @param type
		 * 
		 */		
		private endMoveComplete(textField:TextField,type:number = 0):void{
			if(textField.parent)
				textField.parent.removeChild(textField);
			Tween.removeTweens(textField);

			this._textFields.push(textField);
			
			if(this._textContainer.numChildren == 0 && this._textContainer.parent)
				this._textContainer.parent.removeChild(this._textContainer);
		}
		//
		private getTextField(text:string,size:number = 20,color:number = 0xffffff):TextField{
			//因TweenLite和Timer存在异步执行的情况，回收TextField使用时出现不好控制，所以每次都new一个
			var textField:TextField = this._textFields.pop();
			if(!textField)
			textField = new TextField();
			textField.size = size;
			textField.textColor = color;
			textField.text = text;
			textField.textAlign = HorizontalAlign.CENTER;
            textField.multiline = true;
//            textField.wordWrap = true;
			textField.width = this._stage.stageWidth * 0.8;
            textField.height = 50;
			//textField.border = true;
			
			//最大宽度为舞台的0.8
			var width:number = this._stage.stageWidth * 0.8;
			if(textField.width > width){
				textField.width = width;
				textField.multiline = true;
				textField.text = text;
			}

			textField.x = (this._stage.stageWidth - textField.width) / 2;

			return textField;
		}
		//
		/**
		 * 设置计时器 
		 * @param isStart:Boolean 是否开启
		 * 
		 */		
		private setTimer(isStart:boolean):void{
			if(isStart){
				if(!this._timer)
					this._timer = new Timer(100);
				this._timer.addEventListener(TimerEvent.TIMER,this.timerHandler,this);
				this._timer.start();
			}else{
				this._timer.removeEventListener(TimerEvent.TIMER,this.timerHandler,this);
				this._timer.stop();
			}
		}
		//
		/**
		 * 停留时间计算
		 * @param e
		 * 
		 */		
		private timerHandler(e:TimerEvent):void{
			var tempTime:number = getTimer();
			var data:any = null;
			
			for(var i:number = 0; i < this._stayDatas.length; i++){
				data = this._stayDatas[i];
				data.time = tempTime - data.startTime;
				
				//达到停留时间
				if(data.time >= this.stayTime){
					this.stayComplete(data.textField,data.type);
					ObjectUtil.deleteObjectKey(data);
					
					this._stayDatas.splice(i,1);
					i --;
				}
			}
			
			if(this._stayDatas.length == 0)
				this.setTimer(false);
		}
		//
		/**
		 * 舞台宽度改变 
		 * @param e
		 * 
		 */		
		private stageResize(e:Event):void{
			var textField:TextField = null;
			for(var i:number = 0; i < this._textContainer.numChildren; i++){
				textField = <TextField><any> (this._textContainer.getChildAt(i));
				textField.x = (this._stage.stageWidth - textField.width) / 2;
			}
		}
	}
}