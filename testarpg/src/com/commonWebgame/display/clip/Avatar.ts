
module egret {

	export class Avatar extends CoreContainer{
		/**
		 * 幽灵(无动作替代图片)默认样式 
		 */		
		public static ghostStyle:DisplayObject = null;
		/**
		 * 幽灵共用位置数据，内存优化
		 */		
		public static ghostBmd:Texture = null;
		/**
		 * 无动作数据时，是否显示幽灵(无动作替代图片) 
		 */		
		public isGhost:boolean = true;
		/**
		 * 动作方向图片是否拆分
		 * @type {boolean}
		 */
		public directionSplit:boolean = true;
		/**
		 * 是否自动检测加载资源，单个方向的模型设置为 false
		 * @type {boolean}
		 */
		public isCheckResource:boolean = true;
		/**
		 * 是否自动加载多部件的图片，使用false时，加载完成主体后，再依次加载武器和翅膀，可提高性能，true时则同时全部加载
		 * @type {boolean}
		 */
		public autoLoadMultiParts:boolean = false;
		/**
		 * 对称方向是否翻转Y轴
		 * @type {boolean}
		 */
		public flipY:boolean = false;
		
		//阴影共享
		private static SHADOW_SHAPE:Shape = null;
		
		public _actionMap:HashMap = null;
		//当前动作方向
		public _direction:number = ActionMovieClipDirectionType.UP;
		//当前动作类型
		public _actionType:number = ActionType.PREPARE;
		
		//阴影
		public _shadow:Shape = null;
		
		//是否正在播放
		public _isPlayed:boolean = false;
		//播放循环次数
		public _loopCount:number = 0;
		//循环计数
		public _loop:number = 0;
		//当前帧索引
		public _frameIndex:number = 0;
		//最大帧索引
		private _frameIndexMax:number = 0;
		//最大帧索引
		public _frameIndexMaxManual:number = 0;
		//上一帧
		public _lastFrameIndex:number = 0;
		//是否已播放至最后一帧
		public _isEnd:boolean = false;
		//是否为开始播放
		public _isStart:boolean = false;
		//延迟
		public _delay:number = 100;
		//帧频
		public _frameRate:number = 0;
		
		//阴影宽高
		public _shadowWidth:number = 0;
		public _shadowHeight:number = 0;
		//幽灵(无动作替代图片) 
		public _ghostTarget:Bitmap = null;
		
		//总帧数
		public _totalFrames:number = 1;
		
		public _actionMovieClipData:ActionMovieClipData = null;
		//加载图片回调
		public _callbackMap:HashMap = null;
		public _callbackTargetMap:HashMap = null;
		//部件表
		public _actionPartMap:HashMap = null;
		//是否已有影片数据
		public _hasActionVo:boolean = false;
		//头顶线  y 坐标
		public _topLineY:number = 0;
		//手动设置的总帧数，用于多个动作帧数不一致时的帧显示处理
		public _totalFramesManual:number = 0;
		//部件缓存
		public _partsCache:Array<any> = null;
		//当前部件数组 @see ActionPartType
		public _partTypes:Array<any> = null;
		//是否已清理影片数据
		public _isClear:boolean = false;
		//播放回调
		public _playCallBack:Function = null;
		public _playCallBackTarget:any;
		private _playId:number;
		//播放方法2回调
		private _startPlayItem:ScriptItem;
		//播放时每帧回调
		private _frameItem:ScriptItem;
		//影片资源地址回调
		private _partItem:ScriptItem;
		//检测影片资源是否完整id
		private _partTimerId:number;

		/**
		 * 构造函数
		 */
		public constructor(){
			super();
			
			this._actionMap = new HashMap();
			this._callbackMap = new HashMap();
			this._callbackTargetMap = new HashMap();
			this._actionPartMap = new HashMap();
			this._partsCache = [];
			
			this._actionMovieClipData = ActionMovieClipData.getInstance();

			this._partItem = new egret.ScriptItem();
			
			//this._shadow = new Shape();
			//this._shadow.cacheAsBitmap = true;
			//this.addChild(this._shadow);
			
			this.touchChildren = false;
			this.touchEnabled = false;

			//this.graphics.lineStyle(1,0xff,1);
			//this.graphics.moveTo(-100,0);
			//this.graphics.lineTo(100,0);
			//this.graphics.moveTo(0,-100);
			//this.graphics.lineTo(0,100);
		}
		
		public get totalFramesManual():number{
			return this._totalFramesManual;
		}
		/**
		 * 手动设置的总帧数，用于多个动作帧数不一致时的帧显示处理，使其从头开始循环取帧 ，默认值 0 表示无效值
		 * @param value
		 * 
		 */
		public set totalFramesManual(value:number){
			if(this._totalFramesManual == value) return;
			
			this._totalFramesManual = value;
			this._frameIndexMaxManual = this._totalFramesManual - 1;
			
			for(var i in this._actionMap.content){
				var amc:ActionMovieClip2 = this._actionMap.content[i];
				amc.totalFramesManual = this._totalFramesManual;
			}
		}
		
		/**
		 * 头顶线  y 坐标，目前只取主体动作的头顶线值，未加载完成时取此对象高度的负值
		 * @return 
		 * 
		 */		
		public get topLineY():number{
			var amc:ActionMovieClip2 = this._actionMap.get(ActionPartType.BODY);
			if(amc && amc.baseMovieClipVo)
				this._topLineY = amc.baseMovieClipVo.topLineY;
			else
				this._topLineY = -this.height;
			
			return this._topLineY;
		}

		public get direction():number{
			return this._direction;
		}
		/**
		 * 影片动作方向，>= 0有效
		 * @param value:int
		 * @see ActionMovieClipDirectionType
		 */
		public set direction(value:number){
			if(this._direction == value) return;
			if(value == -1) return;
			
			this._direction = value;
			
			this.setBaseMovieClipVo(-1,this._direction);
			this.setLayer();
		}
		public get actionType():number{
			return this._actionType;
		}
		/**
		 * 动作类型 
		 * @param value:int
		 * @see ActionMovieClipType
		 */
		public set actionType(value:number){
			if(this._actionType == value) return;
			
			this._actionType = value;
			
			this.setBaseMovieClipVo(this._actionType);
		}
		/**
		 * 总帧数 
		 * @return 
		 * 
		 */
		public get totalFrames():number{
			return this._totalFrames;
		}
		/**
		 * 影片每帧之间的延迟(ms) 
		 * @return 
		 * 
		 */		
		public get delay():number{
			return this._delay;
		}
		
		public get frameRate():number{
			return this._frameRate;
		}
		/**
		 * 影片帧频 
		 * @param value:int
		 * 
		 */
		public set frameRate(value:number){
			if(this._frameRate == value) return;
			
			this._frameRate = value;
			
			if(this._frameRate < 1)
				this._frameRate = 1;
			
			this._delay = Math.floor(1000 / this._frameRate);
			
			if(this._isPlayed){
				this.stopMovie();
				this.playMovie(this._frameIndex,this._loopCount);
			}
		}
		/**
		 * 是否正在播放中 
		 * @return 
		 * 
		 */
		public get isPlayed():boolean{
			return this._isPlayed;
		}
		//
		public get frameIndex():number{
			return this._frameIndex;
		}
		/**
		 * 最大帧索引
		 * @returns {number}
		 */
		public get frameIndexMax():number {
			return this._frameIndexMax;
		}
		/**
		 * 当前帧索引，从0开始，小于总帧数  
		 * @param value:int
		 * 
		 */
		public set frameIndex(value:number){
			if(this._frameIndex == value) return;
			
			this._frameIndex = value;
			
			if(this._frameIndex > this._frameIndexMax)
				this._frameIndex = this._frameIndexMax;
			if(this._frameIndex < 0)
				this._frameIndex = 0;
			
			this.updateFrame();
		}
		/**
		 * 按指定动作类型和方向播放影片 
		 * @param frameIndex:int = -1 开始播放的帧索引，-1时不设置开始播放的帧索引，从当前帧开始播放或从第0帧开始播放
		 * @param actionType:int = -1 动作类型，-1时不设置
		 * @param direction:int = -1 动作方向，-1时不设置
		 * @param loopCount:int = 0  播放循环次数，播放至最后一帧时即算循环了一次，0表示无限循环
		 * @param callBack:Function = null 设置播放次数时，播放完成后回调，仅执行一次
		 * @param thisObj:any = null 播放完成后回调函数所属对象
		 * @param startFun:Function = null 循环播放中开始播放时回调函数，每次循环执行一次
		 * @param startObj:any = null startFun回调函数所属对象
		 */		
		public play(frameIndex:number = -1,actionType:number = -1,direction:number = -1,loopCount:number = 0,callBack:Function = null,thisObj:any = null,startFun:Function = null,startObj:any = null):void{
			this._playCallBack = callBack;
			this._playCallBackTarget = thisObj;

			if(!this._startPlayItem)
				this._startPlayItem = new egret.ScriptItem();
			this._startPlayItem.execute = startFun;
			this._startPlayItem.target = startObj;

			this.setBaseMovieClipVo(actionType,direction);
			this.playMovie(frameIndex,loopCount);
		}
		//
		/**
		 * 停止影片在指定动作类型和方向 
		 * @param frameIndex:int = -1 开始播放的帧索引，-1时不设置开始播放的帧索引，从当前帧开始播放或从第0帧开始播放
		 * @param actionType:int = -1 动作类型，-1时不设置
		 * @param direction:int = -1 动作方向，-1时不设置
		 * 
		 */	
		public stop(frameIndex:number = -1,actionType:number = -1,direction:number = -1):void{
			if(!this._isPlayed) return;

			this.stopMovie();
			this.setBaseMovieClipVo(actionType,direction);
			
			if(frameIndex != -1)
				this.frameIndex = frameIndex;
		}
		//
		/**
		 * 设置每帧回调函数，用于替代事件机制，优化内存
		 * @param fun 回调函数，可设置为 null 删除回调函数
		 * @param obj 回调函数所属对象
		 * @param params 传递给回调函数的参数列表
		 */
		public setFrameHandler(fun:Function,obj:Object = null,params:Array<any> = null):void{
			if(fun){
				if(!this._frameItem)
					this._frameItem = new egret.ScriptItem();
			}else{
				obj = null;
				params = null;
			}

			if(this._frameItem){
				this._frameItem.execute = fun;
				this._frameItem.target = obj;
				this._frameItem.params = params;
			}
		}
		//
		/**
		 * 设置部件数组，用于切换不同部件数量的影片 
		 * @param array:Array 部件数组
		 * @param getPartUrl:Function 获取部件 url 的函数 function(partType:String):String{} partType 为 ActionPartType
		 * @param callBack:Function = null 每加载完成一个部件时回调函数 function():void{}
		 */		
		public setPartTypes(array:Array<any>,getPartUrl:Function,getPartUrlTarget:any = null,callBack:Function = null,callBackTarget:any = null):void{
			this._partItem.execute = getPartUrl;
			this._partItem.target = getPartUrlTarget;
			
			if(this._partTypes != array){
				this._partTypes = array;
				
				for(var key in this._actionMap.content){
					var amc:ActionMovieClip2 = this._actionMap.content[key];
					if(amc.parent)
						amc.parent.removeChild(amc);
					
					this._partsCache.push(amc);
				}
				
				this._actionMap.clear();
				
				var length:number = array.length;
				for(var i = 0;i < length;i++){
					var v:any = array[i];
					amc = this._partsCache.pop();
					if(!amc){
						amc = new ActionMovieClip2();
					}
					
					amc.totalFramesManual = this._totalFramesManual;
					//已在外部调用清空
//					amc.clear();
					this.addChild(amc);
					this._actionMap.put(v,amc);
				}
				
				this.setLayer();
			}
			
			var url:string = null;
			var isGhost:boolean = true;

			var length2:number = this._partTypes.length;
			for(var i2:number = 0;i2 < length2;i2++){
				var partType:string = this._partTypes[i2];
				url = getPartUrl.apply(getPartUrlTarget,[partType]);

				var vo:ActionMovieClipVo = ActionMovieClipData.getInstance().getActionMovieClipVo(url);
				var has:boolean = vo != null;

				if(this.directionSplit){
					has = has && ActionMovieClipData.getInstance().hasDirectionTypeTexture(vo,this._actionType,this._direction);
				}

				if(has){
					this.setActionPart(partType,vo);
					isGhost = false;
				}else{
					this.setActionUrl(partType,url,callBack,callBackTarget);

					if(!this.autoLoadMultiParts && this.isCheckResource){
						break;
					}
				}
			}
			
			this.showGhost(isGhost);

			if(this.isCheckResource && !TimerManager.getInstance().hasExecute(this._partTimerId)){
				this._partTimerId = TimerManager.getInstance().addExecute(this.checkPartResource,this,500);
			}
		}
		//
		/**
		 * 检测当前动作资源是否已全部加载，未加载则开始加载
		 */
		private checkPartResource(actionType:number = -1):void{
			if(actionType == -1)
				actionType = this._actionType;

			var url:string = null;
			var hasAll:boolean = true;

			if(this.directionSplit){
				var length:number = this._partTypes.length;
				out:for(var i:number = 0;i < length;i++){
					var partType:string = this._partTypes[i];
					url = this._partItem.execute.apply(this._partItem.target,[partType]);

					var vo:ActionMovieClipVo = this._actionMovieClipData.getActionMovieClipVo(url);
					var hasFrameTexture:boolean = vo != null;

					for(var direction:number = ActionMovieClipDirectionType.UP; direction <= ActionMovieClipDirectionType.DOWN; direction ++){
						if(actionType == this._actionType && direction == this._direction) continue;

						hasFrameTexture = hasFrameTexture && this._actionMovieClipData.hasDirectionTypeTexture(vo,actionType,direction);

						if(!hasFrameTexture){
							hasAll = false;
							ActionMovieClipManager.getInstance().loadActionMovieClipVo2(url,null,this,actionType,direction);

							break out;
						}
					}
				}
			}

			if(hasAll){
				if(actionType < ActionType.ATTACK){
					actionType ++;
					this.checkPartResource(actionType);
				}else{
					TimerManager.getInstance().removeExecute(this._partTimerId);
				}
			}
		}
		//
		/**
		 * 设置动作部件数据
		 * @param actionPartType:String 动作部件
		 * @param vo:ActionMovieClipVo 动作数据
		 * @param isCombine:Boolean = false 是否强制合成数据，新加载的数据使用 true,以更新最新数据，
		 * 同一部件不同类型的动作数据将被合成，目前取消合成，因合成并未产生更好的效率，并且若要合成，合成后应把
		 * 合成前的数据 url 指向同一数据对象
		 */		
		public setActionPart(actionPartType:string,vo:ActionMovieClipVo,isCombine:boolean = false):void{
			var amc:ActionMovieClip2 = this._actionMap.get(actionPartType);
			if(!amc){
				amc = new ActionMovieClip2();
				amc.totalFramesManual = this._totalFramesManual;
				this.addChild(amc);
				this._actionMap.put(actionPartType,amc);
				
				this.setLayer();
			}else if(isCombine){
//				vo = this._actionMovieClipData.combinneActionMovieClipVo(amc.actionMovieClipVo,vo);
			}
			
			amc.setActionMovieClipVo(vo,this._actionType,this._direction);
			amc.setFrameIndex(this._frameIndex);
			if(vo){
				this._hasActionVo = true;
				
				var frameRate:number = 0;
				var totalFrames:number = 0;
				var tempFR:number = 0;
				var tempTF:number = 0;
				
				tempFR = amc.frameRate;
				tempTF = amc.totalFrames;
				
				if(tempFR > 0)
					frameRate = tempFR;
				if(tempTF > 0)
					totalFrames = tempTF;
				
				if(frameRate > 0)
					this.frameRate = frameRate;
				if(totalFrames > 0){
					this._totalFrames = totalFrames;
					this._frameIndexMax = this._totalFrames - 1;
					
					if(this._frameIndex > this._frameIndexMax)
						this._frameIndex = 0;
				}
				
				this.showGhost(false);
			}else{
				this._hasActionVo = this.checkActionVo();
				
				if(!this._hasActionVo){
					this._totalFrames = amc.totalFrames;
					this._frameIndexMax = this._totalFrames - 1;
					this._delay = 0;
					
					this.showGhost(true);
				}
			}
			if(this._frameIndex > this._frameIndexMax){
				this._frameIndex = this._frameIndexMax;
			}
			if(!this._isPlayed){
				this.play(this._frameIndex,this._actionType,this._direction,this._loopCount,this._playCallBack,this._playCallBackTarget);
			}
			this.updateShadow();
		}
		//
		/**
		 * 检测是否有动作数据 
		 * @return 
		 * 
		 */		
		private checkActionVo():boolean{
			for(var i in this._actionMap.content){
				var amc:ActionMovieClip2 = this._actionMap.content[i];
				if(amc.actionMovieClipVo){
					return true;
					break;
				}
			}
			
			return false;
		}
		//
		/**
		 * 设置动作资源地址 
		 * @param actionPartType:String 动作部件类型 ActionPartType
		 * @param url:String 资源地址
		 * @param callBack:Function = null 加载完成后回调 function():void{}
		 * 
		 */		
		public setActionUrl(actionPartType:string,url:string,callBack:Function = null,callBackTarget:any = null):void{
			this._isClear = false;
			
			if(callBack != null){
				this._callbackMap.put(url,callBack);
				this._callbackTargetMap.put(url,callBackTarget);
			}
			this._actionPartMap.put(url,actionPartType);
			var vo:ActionMovieClipVo = this._actionMovieClipData.getActionMovieClipVo(url);

			if(this.directionSplit){
				if(vo && this._actionMovieClipData.hasDirectionTypeTexture(vo,this._actionType,this._direction)){
					this.loadComplete(url);
				}else{
					ActionMovieClipManager.getInstance().loadActionMovieClipVo2(url,this.loadComplete,this);
				}
			}else{
				if(vo){
					this.loadComplete(url);
				}else{
					ActionMovieClipManager.getInstance().loadActionMovieClipVo(url,this.loadComplete,this);
				}
			}
		}
		//
		/**
		 * 加载动作数据完成 
		 * @param url:String 动作 url
		 * 
		 */		
		private loadComplete(url:string):void{
			var actionPartType:string = this._actionPartMap.remove(url);
			
			if(this._isClear) return;
			
//            LogManager.debug(this,url);
			
			var vo:ActionMovieClipVo = this._actionMovieClipData.getActionMovieClipVo(url);
			if(vo && vo.actionType == this._actionType || !this._hasActionVo)
				this.setActionPart(actionPartType,vo);
			if(!this._isPlayed)
				this.play(this._frameIndex,this._actionType,this._direction,this._loopCount,this._playCallBack,this._playCallBackTarget);
			
			var callBack:Function = this._callbackMap.remove(url);
			var target:any = this._callbackTargetMap.remove(url);
			
			if(callBack != null)
				callBack.apply(target);
		}
		//
		/**
		 * 清空动作数据，影片仍然存在，但没有数据 
		 * 
		 */		
		public clear(isStop:boolean = true):void{
			this._isClear = true;
			
			this._callbackMap.clear();
			this._callbackTargetMap.clear();
			if(isStop)
				this.stopMovie();
			
			for(var i in this._actionMap.content){
				var amc:ActionMovieClip2 = this._actionMap.content[i];
				amc.clear();
			}
		}
		//
		/**
		 * 获取动作部件影片 
		 * @param actionPartType:String 部件类型 ActionPartType
		 * @return 
		 * 
		 */		
		public getActionPart(actionPartType:string):ActionMovieClip2{
			return this._actionMap.get(actionPartType);
		}
		//
		/**
		 * 获取动作部件数据 
		 * @param actionPartType:String 部件类型 ActionPartType
		 * @return 
		 * 
		 */		
		public getActionVo(actionPartType:string):ActionMovieClipVo{
			var amc:ActionMovieClip2 = this._actionMap.get(actionPartType);
			if(amc)
				return amc.actionMovieClipVo;
			
			return null;
		}
		//
		/**
		 * 播放当前数据影片 
		 * @param frameIndex:int = -1 开始播放的帧索引，-1时不设置开始播放的帧索引，从当前帧开始播放或从第0帧开始播放
		 * @param loopCount:int = 0 播放循环次数，播放至最后一帧时即算循环了一次，0表示无限循环
		 * 
		 */		
		public playMovie(frameIndex:number = -1,loopCount:number = 0):void{
			this._loopCount = loopCount;
			this._loop = 0;
			this._isEnd = false;
			
			if(!this._isPlayed){
				this._isStart = true;
				
				if(frameIndex == -1){
					frameIndex = this._frameIndex;
					
					if(frameIndex > this._frameIndexMax)
						frameIndex = 0;
				}
				this._frameIndex = -1;
				this.frameIndex = frameIndex;
				
				//特殊处理，因设置frameIndex属性有改变此值
				this._isStart = true;
				
				if(this._hasActionVo){
					if(!TimerManager.getInstance().hasExecute(this._playId)){
						this._playId = TimerManager.getInstance().addExecute(this.frameExecute,this,this._delay);
					}

					this._isPlayed = true;
				}
			}else{
				if(frameIndex != -1){
					if(this._frameIndex != frameIndex)
						this._frameIndex = frameIndex;
					
					if(this._frameIndex > this._frameIndexMax)
						this._frameIndex = 0;

					this.updateFrame();
				}
			}
		}
		//
		/**
		 * 停止当前数据影片 
		 * 
		 */		
		public stopMovie():void{
			TimerManager.getInstance().removeExecute(this._playId);
			
			this._isPlayed = false;
		}
		//
		/**
		 * 更新阴影 
		 * 
		 */		
		public updateShadow():void{
			return;
			//只有主体支持阴影
			var width:number = 0;
			var height:number = 0;
			var amc:ActionMovieClip2 = this._actionMap.get(ActionPartType.BODY);
			if(amc)
				var baseVo:BaseMovieClipVo = amc.getBaseMovieClipVo(this._actionType,this._direction);

			if(baseVo && baseVo.shadowWidth > 0 && baseVo.shadowHeight > 0){
				width = baseVo.shadowWidth;
				height = baseVo.shadowHeight;
			}
			
			//宽或高为0时清除阴影
			if(width == 0 || height == 0){
				if(this._shadow && this._shadow.parent)
					this._shadow.parent.removeChild(this._shadow);
				
				this._shadowWidth = 0;
				this._shadowHeight = 0;
				return;
			}
			//阴影不变
			if(width == this._shadowWidth && height == this._shadowHeight){
				return;
			}

			if(!this._shadow){
				this._shadow = new egret.Shape();
			}
			if(!this._shadow.parent)
				this.addChildAt(this._shadow,0);
			
			this._shadowWidth = width;
			this._shadowHeight = height;

			//var radioMat:Matrix = new Matrix();
			//radioMat.createGradientBox(-this._shadowWidth,-this._shadowHeight);

			var radius:number = this._shadowWidth > this._shadowHeight ? this._shadowWidth : this._shadowHeight;
			this._shadow.graphics.lineStyle(1,0xffff,1);
			this._shadow.graphics.beginGradientFill(GradientType.RADIAL,[0x0,0x0],[1,0],[0,255]);
			this._shadow.graphics.drawEllipse(0,0,this._shadowWidth,this._shadowHeight);
			//this._shadow.graphics.drawCircle(0,0,radius);
			this._shadow.graphics.endFill();

			if(!this._shadow.filters)
				this._shadow.filters = [new BlurFilter(12,8)];

			this._shadow.x = -this._shadow.width / 2;
			this._shadow.y = -this._shadow.height / 2;
		}
		//
		/**
		 * @private 
		 * 执行帧更新
		 */		
		private frameExecute():void{
			if(this._frameItem && this._frameItem.execute){
				this._frameItem.apply();
			}

			this._lastFrameIndex = this._frameIndex;
			
			//一轮播放结束
			if(this._isEnd){
				this._isEnd = false;
				this._loop ++;
				this._frameIndex = -1;
				
				if(this._loopCount > 0 && this._loop >= this._loopCount){
					this._frameIndex = this._lastFrameIndex;
					this.stopMovie();
					
					this.updateFrame();
					
					if(this._playCallBack != null){
						this._playCallBack.apply(this._playCallBackTarget);
						this._playCallBack = null;
					}
					return;
				}
			}

			if(this._frameIndex == 0){
				if(this._startPlayItem && this._startPlayItem.execute){
					this._startPlayItem.apply();
				}
			}

			this._frameIndex ++;
			this.updateFrame();
			this._isStart = false;
			
			var index:number = this._frameIndexMax;
			if(this._frameIndexMaxManual > 0)
				index = this._frameIndexMaxManual;
			
			if(this._frameIndex >= index){
				this._isEnd = true;
			}
		}
		//
		public destroy():void{
			if(this._isDestroy) return;
			
			this.stopMovie();
			
			super.destroy();
		}
		//
		/**
		 * 更新帧渲染 
		 * @param dispatch:Boolean = true 是否调度事件
		 * 
		 */		
		private updateFrame(dispatch:boolean = true):void{
			//事件机制已用回调函数替代
			//if(dispatch){
			//	if(!this._isStart && this.hasEventListener(ActionMovieClipEvent.CLIP_EXIT_FRAME)){
			//		this.dispatchEvent(new ActionMovieClipEvent(ActionMovieClipEvent.CLIP_EXIT_FRAME,false,false,this._lastFrameIndex));
			//	}
			//	if(this.hasEventListener(ActionMovieClipEvent.CLIP_ENTER_FRAME))
			//		this.dispatchEvent(new ActionMovieClipEvent(ActionMovieClipEvent.CLIP_ENTER_FRAME,false,false,this._frameIndex));
			//}

			for(var i in this._actionMap.content){
				var amc:ActionMovieClip2 = this._actionMap.content[i];
				amc.setFrameIndex(this._frameIndex);
			}
		}
		//
		/**
		 * 显示或隐藏幽灵(无动作替代图片) 
		 * @param visible:Boolean
		 * 
		 */
		public showGhost(visible:boolean):void{
			if(!this.isGhost){
				if(this._ghostTarget){
					if(this._ghostTarget.parent)
						this._ghostTarget.parent.removeChild(this._ghostTarget);
					
					if(this._ghostTarget.texture)
						this._ghostTarget.texture.dispose();
					
					this._ghostTarget = null;
				}
				
				return;
			}
			
			if(!this._ghostTarget){
				this._ghostTarget = new Bitmap();
				//性能优化
				this._ghostTarget.cacheAsBitmap = true;
				this.addChild(this._ghostTarget);
				
				var width:number = 50;
				var height:number = 50;
				if(Avatar.ghostStyle){
					width = Avatar.ghostStyle.width;
					height = Avatar.ghostStyle.height;
				}
				
				//if(!Avatar.ghostBmd){
				//	Avatar.ghostBmd = new BitmapData(width,height,true,0x00000000);
				//	if(Avatar.ghostStyle){
				//		Avatar.ghostBmd.draw(Avatar.ghostStyle);
				//	}else{
				//		Avatar.ghostBmd.noise(Math.random() * 100);
				//	}
				//}
				
				this._ghostTarget.texture = Avatar.ghostBmd;
				
				this._ghostTarget.y = -this._ghostTarget.height;
				this._ghostTarget.x = -this._ghostTarget.width / 2;
			}
			if(this._ghostTarget.visible != visible)
				this._ghostTarget.visible = visible;
		}
		//
		/**
		 * 设置当前播放数据 
		 * @param actionType:int = -1 动作类型，-1时不设置
		 * @param direction:int = -1 动作方向，-1时不设置
		 * 
		 */		
		public setBaseMovieClipVo(actionType:number = -1,direction:number = -1):void{
			if(actionType == -1 && direction == -1) return;
			
			if(actionType != -1)
				this._actionType = actionType;
			if(direction != -1){
				this._direction = direction;
				
				this.setLayer();
			}
			
			var frameRate:number = 0;
			var totalFrames:number = 0;
			var tempFR:number = 0;
			var tempTF:number = 0;
			
			for(var i in this._actionMap.content){
				var amc:ActionMovieClip2 = this._actionMap.content[i];
				amc.flipY = this.flipY;
				amc.setBaseMovieClipVo(actionType,direction);
				amc.setFrameIndex(this._frameIndex);
				tempFR = amc.frameRate;
				tempTF = amc.totalFrames;
				
				if(tempFR > 0)
					frameRate = tempFR;
					if(tempTF > 0)
					totalFrames = tempTF;
			}
			
			if(amc){
				//帧频和总帧数无效时不设置，避免出现加载新动作时，出现播放同一帧多次的情况
				if(frameRate > 0)
					this.frameRate = frameRate;
				if(totalFrames > 0){
					this._totalFrames = totalFrames;
					this._frameIndexMax = this._totalFrames - 1;
					
					if(this._frameIndex > this._frameIndexMax)
						this._frameIndex = 0;
				}
				
				this.updateShadow();
			}
		}
		//
		/**
		 * 调整部件层级 
		 * 
		 */		
		private setLayer():void{
			if(!this._partTypes || this._partTypes.length < 2) return;

			var layers:Array<any> = null;
			
			if(this._direction == ActionMovieClipDirectionType.UP){
					layers = ActionPartType.DIRECTION_UP;
			}else if(this._direction == ActionMovieClipDirectionType.UP_RIGHT || 
				this._direction == this._actionMovieClipData.getReverseDir(ActionMovieClipDirectionType.UP_RIGHT)){
				layers = ActionPartType.DIRECTION_UP_RIGHT;
			}else if(this._direction == ActionMovieClipDirectionType.RIGHT || 
				this._direction == this._actionMovieClipData.getReverseDir(ActionMovieClipDirectionType.RIGHT)){
				layers = ActionPartType.DIRECTION_RIGHT;
			}else if(this._direction == ActionMovieClipDirectionType.DOWN_RIGHT || 
				this._direction == this._actionMovieClipData.getReverseDir(ActionMovieClipDirectionType.DOWN_RIGHT)){
				layers = ActionPartType.DIRECTION_DOWN_RIGHT;
			}else if(this._direction == ActionMovieClipDirectionType.DOWN){
				layers = ActionPartType.DIRECTION_DOWN;
			}
			
            if(!layers){
                LogManager.debug(this,this._direction);
            }
            var length:number = layers.length;
			var index:number = this.numChildren - 1;
			var amc:ActionMovieClip2 = null;
			
			for(var i:number = 0; i < length; i++){
				amc = this._actionMap.get(layers[i]);
				if(amc){
					if(this.getChildIndex(amc) != index)
						this.setChildIndex(amc,index);
					
					index --;
				}
			}
		}
	}
}