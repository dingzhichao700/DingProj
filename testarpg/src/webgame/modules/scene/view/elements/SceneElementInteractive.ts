
module egret {

	export class SceneElementInteractive extends SceneElement{
		//鼠标经过的滤镜
		public _overFilters:Array<any> = [
			new GlowFilter(0x00ffff,1,2,2,3,1)
		];
		//纸娃娃影片
        public _avatar: Avatar = null;
        private shadow: egret.gui.UIAsset;

		public _sceneAvatarVo:SceneAvatarVo = null;
		//层级列表
		public _layerHashMap:HashMap = null;
		//影片部件类型集合
		public _partTypes:Array<string>;
		
		public constructor(){
			super();
			
			this.touchEnabled = true;
			
			this._layerHashMap = new HashMap();
			this._sceneAvatarVo = new SceneAvatarVo();
			
			this._avatar = new Avatar();
			this.show(this._avatar,SceneElementLayerType.ACTION);

            this.shadow = new egret.gui.UIAsset();
            this.shadow.source = "resource/main/shadow.png";
            this.shadow.x = -53;
            this.shadow.y = -30;
            this.show(this.shadow,SceneElementLayerType.BOTTOM);
		}

		/**
		 * 设置动作图片是否按方向拆分
		 * @param value
		 */
		public setAvatarDirectionSplit(value:boolean):void{
			this._avatar.directionSplit = value;
		}

		/**
		 * 是否自动检测加载资源，单个方向的模型设置为 false
		 * @param value
		 */
		public setIsCheckResource(value:boolean):void{
			this._avatar.isCheckResource = value;
		}
		
		/**
		 * 快速设置元素数据，自动生成元素id，用于特效类等临时性元素 
		 * @param name 影片名称
		 * 
		 */		
		public setMovieName(name:string):void{
			var item:SceneElementDataItem = this._data;
			if(!item)
				item = new SceneElementDataItem();
			var lo:SceneElementLo = item.lo;
			if(!lo){
				lo = new SceneElementLo();
				lo.id = dataManager().sceneElementData.getAutoElementId();
				lo.idString = lo.id + "";
			}
			lo.movieName = name;
			item.lo = lo;
			
			this.setData(item);
		}

		/**纸娃娃影片*/
		public get avatar():Avatar{
			return this._avatar;
		}

		public get sceneAvatarVo():SceneAvatarVo{
			return this._sceneAvatarVo;
		}

		/**
		 * 纸娃娃数据
		 * @param value
		 */
		public set sceneAvatarVo(value:SceneAvatarVo){
			this._sceneAvatarVo = value;
		}

		/**是否正在播放动作影片*/
		public get isPlayed():boolean{
			return this._avatar.isPlayed;
		}

		public get actionType():number{
			return this._avatar.actionType;
		}
		
		/**
		 * 动作类型 
		 * @param value:int
		 * @see ActionMovieClipType
		 */
		public set actionType(value:number){
			if(this._avatar.actionType == value) return;
			
			this._avatar.actionType = value;
		}

		public get direction():number{
			return this._avatar.direction;
		}
		/**
		 * 影片动作方向 
		 * @param value:int
		 * @see ActionMovieClipDirectionType
		 */
		public set direction(value:number ){
			if(this._avatar.direction == value) return;
			
			this._avatar.direction = value;
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
			if(this._isDestroy) return;
			if(!this._sceneAvatarVo.body) return;

			if(callBack && !thisObj){
				throw new Error("未指定回调函数对象");
			}
			
			this._partTypes = ActionPartType.TYPES_BODY_ONLY;
			//先播放，以设置动作类型和方向
			this._avatar.play(frameIndex,actionType,direction,loopCount,callBack,thisObj,startFun,startObj);
			this._avatar.setPartTypes(this._partTypes,this.getPartUrl,this,this.loadActionComplete,this);
			
			this._namePad.y = this._avatar.topLineY;
		}
		/**加载影片完成*/		
		public loadActionComplete():void{
			this._namePad.y = this._avatar.topLineY;
		}

		/**
		 * 停止影片在指定动作类型和方向 
		 * @param frameIndex:int = -1 开始播放的帧索引，-1时不设置开始播放的帧索引，从当前帧开始播放或从第0帧开始播放
		 * @param actionType:int = -1 动作类型，-1时不设置
		 * @param direction:int = -1 动作方向，-1时不设置
		 * 
		 */	
		public stop(frameIndex:number = -1,actionType:number = -1,direction:number = -1):void{
			this._avatar.stop(frameIndex,actionType,direction);
		}
		
		/**
		 * 设置动作vo 
		 * @param actionPartType:String 动作部件类型 ActionPartType
		 * @param vo:ActionMovieClipVo 影片数据
		 * @see ActionPartType
		 */		
		public setActionVo(actionPartType:string,vo:ActionMovieClipVo):void{
			this._avatar.setActionPart(actionPartType,vo);
		}

		public getActionVo(actionPartType:string):ActionMovieClipVo{
			return this._avatar.getActionVo(actionPartType);
		}

		/**
		 * 设置动作资源地址 
		 * @param actionPartType:String 动作部件类型 ActionPartType
		 * @param url:String 资源地址
		 * @param callBack:Function = null 加载完成后回调 function():void{}
		 * 
		 */		
		public setActionUrl(actionPartType:string,url:string,callBack:Function = null):void{
			this._avatar.setActionUrl(actionPartType,url,callBack);
		}
		/**
		 * 获取元素中的层级容器，容器层级会自动调整到层级所在位置 
		 * @param layerType:int 层级
		 * @see SceneElementLayerType
		 * @return 
		 * 
		 */		
		public getLayerContainer(layerType:number = 0):DisplayObjectContainer{
			var container:DisplayObjectContainer = null;
			container = this._layerHashMap.get(layerType);
			
			if(!container){
				var layerConfig:any = SceneElementLayerType.LAYER_MOUSE_CONFIGS[layerType];
				
				container = new DisplayObjectContainer();
				container.name = "sceneElementInteractiveLayer" + layerType;
				container.touchEnabled = layerConfig.touchEnabled;
				container.touchChildren = layerConfig.touchChildren;
				this.addChild(container);
				
				this._layerHashMap.put(layerType,container);
				
				var keys:Array<any> = this._layerHashMap.keys();
				keys.sort(ArrayUtil.numeric);
				
				var length:number = keys.length;
				for(var i:number = 0; i < length; i++){
					this.setChildIndex(this._layerHashMap.get(keys[i]),i);
				}
			}
			return container;
		}

		/**
		 * 设置显示对象在元素上的层级并添加到显示列表中，
		 * @param target:DisplayObject 显示对象
		 * @param layerType:int 层级 @see SceneElementLayerType
		 * @param x:Number = NaN 不为NaN时设置
		 * @param y:Number = NaN 不为NaN时设置
		 * @see #hide()
		 */		
		public show(target:DisplayObject,layerType:number,x:number = NaN,y:number = NaN):void{
			var container:DisplayObjectContainer = this.getLayerContainer(layerType);
			if(container && target.parent != container)
				container.addChild(target);
			
			if(!isNaN(x))
				target.x = x;
			if(!isNaN(y))
				target.y = y;
		}

		/**
		 * 从元素上移除显示对象 
		 * @param target:DisplayObject 已呈现在地图上的显示对象
		 * @see #show()
		 */		
		public hide(target:DisplayObject):void{
			if(!target) return;
			
			if(target.parent)
				target.parent.removeChild(target);
		}

		/**
		 * 更新动作影片显示
		 * @param vo:SceneElementVo
		 * @param lo:SceneElementLo
		 * 
		 */		
		public updateAvatar(value:SceneElementDataItem):void{
			this.setData(value);
			this._avatar.clear(false);

			if(this.stage && this._partTypes){
				this._avatar.setPartTypes(this._partTypes,this.getPartUrl,this,this.loadActionComplete,this);
			}
		}

		/**
		 * 设置场景元素数据
		 * @param value:SceneElementDataItem
		 * 
		 */		
		public setData(value:SceneElementDataItem):void{
			super.setData(value);
			
			SceneElementData.getInstance().setSceneAvatarVo(this._sceneAvatarVo,value.lo);
		}
		
		/**添加至场景时处理*/		
		public addToScene():void{
			super.addToScene();
		}
		
		public removeFromScene():void{
			super.removeFromScene();
			
			//this.removeEventListener(TouchEvent.TOUCH_ROLL_OVER,this.roleOverHandler,this);
			//this.removeEventListener(TouchEvent.TOUCH_ROLL_OUT,this.roleOutHandler,this);
			
			//this.roleOutHandler();
			this.stop();
			this._avatar.clear();
		}
		
		public destroy():void{
			if(this._isDestroy)
    			return;
			
			this._avatar.destroy();
			
			super.destroy();
		}
		
		public addListeners():void{
			super.addListeners();
			
			//this.addEventListener(TouchEvent.TOUCH_ROLL_OVER,this.roleOverHandler,this);
			//this.addEventListener(TouchEvent.TOUCH_ROLL_OUT,this.roleOutHandler,this);
		}
		
		/**鼠标经过*/		
		public roleOverHandler(event:TouchEvent):void{
			//EnterFrameManager.getInstance().addExecute(this.checkAlpha,8);
		}
		
		/**检测alpha*/		
		public checkAlpha():void{
			//var isTransparent:boolean = BitmapDataUtil.isTransparent(this,this.mouseX,this.mouseY);
			
			//if(isTransparent){
			//	this.filters = null;
			//}else{
			//	if(this.filters != this._overFilters)
			//		this.filters = this._overFilters;
			//}
		}
		
		/**鼠标移出*/		
		public roleOutHandler(event:TouchEvent = null):void{
			//EnterFrameManager.getInstance().removeExecute(this.checkAlpha);
			
			this.filters = null;
		}

		/**
		 * 获取部件影片地址 
		 * @param partType:String ActionPartType 动作影片类型
		 * @return 
		 * 
		 */		
		public getPartUrl(partType:string):string{
			var path:string = PathData.PATH_MOVIES_COMMON;
			
			var movie:string = this._sceneAvatarVo[partType];
			
			//若动作影片改变时，只需要改变
			//_data.lo.movieName的值即可
			var url:string = dataManager().sceneElementData.getActionUrl(path,movie,this._avatar.actionType);
			return url;
		}
		
	}
}