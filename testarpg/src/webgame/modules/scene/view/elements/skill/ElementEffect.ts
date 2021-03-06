
module egret {

	export class ElementEffect extends SceneElementInteractive{
		/**
		 * 播放次数，达到次数后自动删除或停止，默认为1次，0为不限制次数
		 * @type {number}
		 */
		public playCount:number = 1;
		//宿主
		private _master:DisplayObject = null;
		//x轴位置偏移量
		private _offsetX:number = 0;
		//y轴位置偏移量
		private _offsetY:number = 0;
		/**
		 * 特效播放关键点处理 function(...args):void{} 
		 */		
		public _hitHandler:Function = null;
		private _hitHandlerTarget:Object = null;
		//关键点帧索引参数
		private _frameIndexParam:number = 0;
		//关键点帧索引
		private _frameIndex:number = -1;
		//hitHandler参数
		private _params:Array<any> = null;
		private _posId:number;
		/**
		 * 构造函数
		 */
		public constructor(){
			super();
			
			this.touchChildren = false;
			this.touchEnabled = false;
			
			if(this._namePad.parent)
				this._namePad.parent.removeChild(this._namePad);
			
			this._avatar.isGhost = false;

			this.setIsCheckResource(false);
		}
		/**
		 * 特效播放关键点处理
		 *
		 */		
		public enterFrameHandler():void{
			if(this._hitHandler){
				if(this._frameIndex == -1)
					this._frameIndex = this.getFrameIndex();

				if(this._avatar.frameIndex >= this._frameIndex){
					//this._avatar.removeEventListener(ActionMovieClipEvent.CLIP_ENTER_FRAME,this.enterFrameHandler,this);
					this._hitHandler.apply(this._hitHandlerTarget,this._params);
					this._hitHandler = null;
					this._hitHandlerTarget = null;
				}
			}
		}
		//
		/**
		 * 获取帧索引值 
		 * @return 
		 * 
		 */		
		private getFrameIndex():number{
			var index:number = 0;
			if((this._frameIndexParam < 0 && this._frameIndexParam > -1) || (this._frameIndexParam > 0 && this._frameIndexParam < 1)){
				index = this._avatar.totalFrames * this._frameIndexParam;
			}else if(this._frameIndexParam < 0){
				index = this._avatar.totalFrames + this._frameIndexParam;
			}else if(this._frameIndexParam > 0){
				index = this._frameIndexParam;
			}
			
			if(index < 0)
				index = 0;
			if(index >= this._avatar.totalFrames)
				index = this._avatar.totalFrames - 1;
			
			return index;
		}
		
		//
		/**
		 *  特效播放关键点处理 
		 * @param fun 处理函数 function(...args):void{} 
		 * @param frameIndex:Number = -1 关键点帧索引，即在此帧调用函数，正数为正常索引值，负数为最后一帧开始往前的帧索引值，小数为总帧数的百分比所在的帧索引值
		 * @param args 传递给fun的参数
		 * 
		 */		
		public setHitHandler(fun:Function,target:Object,frameIndex:number = -1,...args):void{
			this._hitHandler = fun;
			this._hitHandlerTarget = target;
			this._params = args;
			this._frameIndexParam = frameIndex;
			
			this._frameIndex = -1;
		}
		
		public addToScene():void{
			super.addToScene();
			
			this.play(0,ActionType.PREPARE,this._avatar.direction,this.playCount,this.playEnd,this);
			//this._avatar.addEventListener(ActionMovieClipEvent.CLIP_ENTER_FRAME,this.enterFrameHandler,this);
			this._avatar.setFrameHandler(this.enterFrameHandler,this);
		}
		//
		/**
		 * 设置特效宿主，特效位置将与宿主同步
		 * @param target:DisplayObject 宿主元素
		 * @param offsetX:Number = 0 x轴位置偏移量
		 * @param offsetY:Number = 0 y轴位置偏移量
		 */		
		public setMaster(target:DisplayObject,offsetX:number  = 0,offsetY:number = 0):void{
			this._master = target;
			this._offsetX = offsetX;
			this._offsetY = offsetY;
			if(!EnterFrameManager.getInstance().hasExecute(this._posId))
				this._posId = EnterFrameManager.getInstance().addExecute(this.ajustPosition,this,1);
		}
		//
		/**
		 * 设置技能角度 
		 * @param rotation 角度值0-360
		 * 
		 */		
		public setEffProperties(rotation:number,scaleX:number = 1,scaleY:number = 1):void{
			this._avatar.rotation = rotation;
			this._avatar.scaleX = scaleX;
			this._avatar.scaleY = scaleY;
		}
		/**
		 * 调整技能坐标 
		 * 
		 */		
		private ajustPosition():void{
			if(!this._master) return;

			this.x = this._master.x + this._offsetX;
			this.y = this._master.y + this._offsetY;
		}
		/**
		 * 播放完成处理
		 * 
		 */		
		public playEnd():void{
			if(this.scene){
				this.scene.removeElement(this);
			}

			this.removeFromScene();
		}
		//
		public removeFromScene():void{
			super.removeFromScene();
			
			this.setEffProperties(0);
			this.playCount = 1;

			this._avatar.direction = ActionMovieClipDirectionType.UP;
			
			//this._avatar.removeEventListener(ActionMovieClipEvent.CLIP_ENTER_FRAME,this.enterFrameHandler,this);
			this._avatar.setFrameHandler(null);
			EnterFrameManager.getInstance().removeExecute(this._posId);
		}
		//
		/**
		 * 获取部件影片地址 
		 * @param partType:String ActionPartType 动作影片类型
		 * @return
		 */		
		public getPartUrl(partType:string):string{
			var path:string = PathData.PATH_MOVIES_EFFECT;
			
			var movie:string = this._sceneAvatarVo[partType];
			
			var url:string = dataManager().sceneElementData.getActionUrl(path,movie,this._avatar.actionType);
			
			return url;
		}
	}
}