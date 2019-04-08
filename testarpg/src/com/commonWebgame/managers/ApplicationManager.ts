
module egret {

	export class ApplicationManager extends EventDispatcher{
    	
        public static CONTENT_W: number = 640;
        public static CONTENT_H: number = 960;
        
		/**主应用程序，程序启动后设置*/		
		public application:Application = null;
		/** 应用程序舞台 */		
		public stage:Stage = null;

		/**窗口的容器*/
        private gameCon: Sprite = null;
        private layer_ui: Sprite = null; 
        private layer_mask: Sprite = null;
        private layer_window_1: Sprite = null;
        private layer_window_2: Sprite = null;
        private layer_tip: Sprite = null;
        private layer_guide: Sprite = null;
		
		//层级列表
		private _layerHashMap:HashMap = null;
		//显示对象列表
		private _winHashMap:HashMap = null;
		//显示对象存在时长列表
		private _timeHashMap:HashMap = null;
		//显示对象对齐列表
		private _alignHashMap:HashMap = null;
		//计时回调id
		private _timerId:number;
        /**游戏内容缩放比*/		
		public globalScale:number;

		public constructor(){
			super();
			this._layerHashMap = new HashMap();
			this._winHashMap = new HashMap();
			this._timeHashMap = new HashMap();
			this._alignHashMap = new HashMap();
		}

        private static _instance: ApplicationManager = null;
        
		public static getInstance():ApplicationManager{
			return ApplicationManager._instance || (ApplicationManager._instance = new ApplicationManager());
		}

		/**当前是否处于全屏窗口状态 */		
		public get isFullScreen():boolean{
			var array:Array<any> = [ApplicationLayerType.FULL_SCREEN,ApplicationLayerType.FULL_SCREEN_TOP];
			
			var length:number = array.length;
			for(var i:number = 0;i < length;i++){
				var v:any = array[i];
				var container:DisplayObjectContainer = this._layerHashMap.get(v);
				if(container && container.numChildren > 0) 
					return true;
			}
			return false;
		}

		/**
		 * 初始化主程序和舞台，若多次调用，上次调用时已存在的相关数据将清空，如已保存的而未销毁的窗口
		 * @param application:Application 应用程序
		 * 
		 */		
		public init(application:Application):void{
			if(this.application)
				this.application.destroy();
			
			//application.focusRect = false;
			this.application = application;
			
			if(!this.stage){
				this.stage = application.stage;
                this.stage.addEventListener(Event.RESIZE,this.resizeHandler,this);
                this.onResize();
			}
			
			//以下为重置数据
			//点击某个对象时，对象成为舞台焦点，当焦点一直不变时此属性将一直引用之前的对象，有可能导致内存泄漏
			this.stage.focus = null;
			
			//销毁之前的窗口及相关资源
			var length:number = this._winHashMap.size();
			for(var i in this._winHashMap.content){
				var wins:Array<any> = this._winHashMap.content[i];
				var length1:number = wins.length;
				for(var i1:number = 0;i1 < length1;i1++){
					var win:DisplayObject = wins[i1];
					if("remove" in win)
						win["remove"]();
					if("destroy" in win)
						win["destroy"]();
				}
			}
			
			this._layerHashMap.clear();
			this._winHashMap.clear();
			this._timeHashMap.clear();
			this._alignHashMap.clear();
			
			this.removeTimer();
		}

        /**舞台尺寸更改理 */
        private resizeHandler(e: Event): void {
            this.onResize();
        }
        
        private onResize(): void {
			/*for(var key in this._layerHashMap.content){
				this.setModel(this._layerHashMap.get(key),key);
			}
			for(key in this._alignHashMap.content){
				this.layout(key);
			}*/

            var contentW: number = ApplicationManager.CONTENT_W;
            var contentH: number = ApplicationManager.CONTENT_H;
            var windowW: number = document.documentElement.clientWidth;
            var windowH: number = document.documentElement.clientHeight;
            var ratioContent: number = contentH / contentW;
            var ratioWindow:number = windowH/windowW;

            var scale: number;
            if(ratioWindow >= ratioContent){
                scale = windowW / contentW;
            } else {
                scale = windowH / contentH;
            }
            this.globalScale = scale;
            
            this.application.scaleX = this.application.scaleY = scale;
            this.application.x = (windowW - contentW * scale) / 2;
            this.application.y = (windowH - contentH * scale) / 2;
        }
        
		/**
		 * 获取应用程序中的层级容器，容器层级会自动调整到层级所在位置 
		 * @param layerType:int 层级
		 * @see ApplicationLayerType
		 * @return 
		 * 
		 */		
		public getApplicationLayer(layerType:number = 0):DisplayObjectContainer{
			var container:Sprite = this._layerHashMap.get(layerType);
			if(!container){
				var layerConfig:any = ApplicationLayerType.LAYER_MOUSE_CONFIGS[layerType];
				
				container = new Sprite();
				container.name = "applicationLayer" + layerType;
				container.touchChildren = layerConfig.touchChildren;
				container.touchEnabled = layerConfig.touchEnabled;
				this.application.addChild(container);
				
				this._layerHashMap.put(layerType,container);
				
				var keys:Array<any> = this._layerHashMap.keys();
				keys.sort(ArrayUtil.numeric);
				
				var length:number = keys.length;
				for(var i:number = 0; i < length; i++){
					this.application.setChildIndex(this._layerHashMap.get(keys[i]),i);
				}
			}
			return container;
		}
		
		public initLayer():void {
            if(!this.gameCon) {
                this.gameCon = new Sprite();
                this.layer_ui = new Sprite();
                this.gameCon.addChild(this.layer_ui);
                this.layer_mask = new Sprite();
                this.gameCon.addChild(this.layer_mask);
                this.layer_window_1 = new Sprite();
                this.gameCon.addChild(this.layer_window_1);
                this.layer_window_2 = new Sprite();
                this.gameCon.addChild(this.layer_window_2);
                this.layer_tip = new Sprite();
                this.gameCon.addChild(this.layer_tip);
                this.layer_guide = new Sprite();
                this.gameCon.addChild(this.layer_guide);
            }
            this.application.addChild(this.gameCon);
		}

		/**
		 * 打开显示对象类，并显示在舞台上，并返回显示对象实例 ，如果是IWindow对象将自动调用initWindow()或recall()方法
		 * @param targetClass:Class 显示对象类名称
		 * @param layerType:int = -1 显示对象打开时所处的层级，若targetClass对象存在layerType属性，使用默认值时将自动使用些属性 @see ApplicationLayerType
		 * @param align:int = -1  设置 显示对象在舞台上的对齐类型 ，默认值时不设置对齐，若targetClass对象存在align属性，使用默认值时将自动使用些属性，@see AlignType
		 * @param name:String = null 显示对象名称，若isNew == true时，将设置显示对象的名称为此值，否则将搜索名称为此值的显示对象实例
		 * @param isNew:Boolean = false 是否创建新的实例，为true时，将强制创建一个新的实例，否则会先搜索已存在的实例
		 * @return 
		 * @see #close()
		 */		
		public open(targetClass:any,layerType:number = -1,align:number = -1,name:string = null,isNew:boolean = false):DisplayObject{
			if(!targetClass){
				LogManager.error(this,"targetClass不能为空.");
				return null;
			}
			
			var className:string = getQualifiedClassName(targetClass);
			
			var win:DisplayObject = null;
			var array:Array<any> = null;
			var recall:Function = null;
			var initWindow:Function = null;
			
			array = this._winHashMap.get(className);
			
			//创建新实例并保存
			if(isNew){
				win = new targetClass();
				win.name = name ? name : win.name;
				if("initWindow" in win)
					initWindow = win["initWindow"];
				
				if(!array){
					array = [];
					this._winHashMap.put(className,array);
				}
				array.push(win);
			}else{
				//搜索已存在的实例
				if(name && array){
					var length:number = array.length;
					for(var i:number = 0; i < length; i++){
						if(array[i].name == name){
							win = array[i];
							break;
						}
					}
				}else if(array && array.length > 0){
					win = array[0];
				}
				
				if(!win)
					return this.open(targetClass,layerType,align,name,true);
				else if("recall" in win)
					recall = win["recall"];
			}
			
			//设置层级
			if(layerType == -1){
				if("layerType" in win)
					layerType = win["layerType"];
				else
					layerType = 0;
			}
			//设置对齐方式
			if(align == -1){
				if("align" in win)
					align = win["align"];
				else
					align = 0;
			}
			if("applicationManager" in win)
				win["applicationManager"] = this;
			//显示显示对象
			this.show(win,layerType,align);
			
			if(initWindow != null)
				win['initWindow']();
			if(recall != null)
				win["recall"]();
			
			if(this.hasEventListener(ApplicationEvent.WINDOW_OPEN))
				this.dispatchEvent(new ApplicationEvent(ApplicationEvent.WINDOW_OPEN,false,false,win));
			
			return win;
		}

		/**
		 * 将显示对象从舞台上移除，若存在remove()将自动调用此方法 
		 * @param target:* 值为实例时，只对当前实例做处理，值为类时将对此类的所有实例进行处理
		 * @see #open()
		 */		
		public close(target:any):void{
            if(!target) return;
            
			if(isClass(target)){
				var className:string = getQualifiedClassName(target);
				if(className){
					var array:Array<any> = this._winHashMap.get(className);
                    if(array) {
                        var length: number = array.length;
                        for(var i: number = 0;i < length;i++) {
                            var win: DisplayObject = array[i];
                            this.hide(win);

                            if(this.hasEventListener(ApplicationEvent.WINDOW_CLOSE))
                                this.dispatchEvent(new ApplicationEvent(ApplicationEvent.WINDOW_CLOSE,false,false,win));
                        }
                    }
				}
			}else{
				this.hide(target);
				
				if(this.hasEventListener(ApplicationEvent.WINDOW_CLOSE))
					this.dispatchEvent(new ApplicationEvent(ApplicationEvent.WINDOW_CLOSE,false,false,target));
			}
		}

		/**
		 * 获取显示对象类的实例，不存在时返回null 
		 * @param targetClass:Class 显示对象类
		 * @param addedToStage:Boolean = false 是否已添加到舞台
		 * @param name:String = null 实例名称，使用默认值时不检测名称
		 * @return 
		 */		
		public getTargetInstance(targetClass:any,addedToStage:boolean = false,name:string = null):DisplayObject{
			var className:string = getQualifiedClassName(targetClass);
			var array:Array<any> = this._winHashMap.get(className);
			var result:DisplayObject = null;
			
			var length:number = array.length;
			for(var i:number = 0;i < length;i++){
				var win:DisplayObject = array[i];
				if(addedToStage && name){
					if(win.stage && win.name == name){
						result = win;
						break;
					}
				}else if(addedToStage && !name){
					if(win.stage){
						result = win;
						break;
					}
				}else if(!addedToStage && name){
					if(!win.stage && win.name == name){
						result = win;
						break;
					}
				}else if(!addedToStage && !name){
					if(!win.stage){
						result = win;
						break;
					}
				}
			}
			return result;
		}

		/**
		 * 打开的窗口中是否存在类实例，仅能获知通过open()打开的窗口对象
		 * @param args 类列表
		 */		
		public hasInstance(...args):boolean{
			var length:number = args.length;
			for(var i:number = 0;i < length;i++){
				var targetClass:any = args[i];
				var className:string = getQualifiedClassName(targetClass);
				var array:Array<any> = this._winHashMap.get(className);
				if(array && array.length > 0)
					return true;
			}
			return false;
		}

		/**
		 * 全局更新，调用已注册相关全局更新类型的IWindow的globalUpdate()方法，对象不在舞台时忽略
		 * @param updateTypes:Array 全局更新类型
		 * @param args globalUpdate()方法的参数列表
		 * @see IWindow.globalUpdate
		 * @see IWindow.addUpdateType
		 */		
		public globalUpdate(updateTypes:Array<any>,...args):void{
			var params:Array<any> = null;
			//此方法不能直接遍历 _winHashMap.content ，因有可能在全局更新方法中打开新窗口，导致其遍历顺序改变
			var mapArray:Array<any> = this._winHashMap.values();
			
			var length:number = mapArray.length;
			for(var i:number = 0;i < length;i++){
				var wins:Array<any> = mapArray[i];
				var length1:number = wins.length;
				for(var i1:number = 0;i1 < length1;i1++){
					var win:IWindow = wins[i1];
					if(!win["stage"]) continue;
					
					var length2:number = updateTypes.length;
					for(var i2:number = 0;i2 < length2;i2++){
						var type:number = updateTypes[i2];
						if(win["hasUpdateType"](type)){
							params = [];
							params.push(type);
							params = params.concat(args);
							
							win["globalUpdate"].apply(win,params);
						}
					}
				}
			}
		}

		/**
		 * 局部更新，调用目标对象的update()方法 ,对象不在舞台时忽略
		 * @param targets:Array 类对象数组或实例对象数组
		 * @param args 传递给update()方法的参数列表
		 * 
		 */		
		public update(targets:Array<any>,...args):void{
			var className:string = null;
			var wins:Array<any> = null;
			var params:Array<any> = null;
			
			var length:number = targets.length;
			for(var i:number = 0;i < length;i++){
				var cls:any = targets[i];
				className = getQualifiedClassName(cls);
				
				wins = this._winHashMap.get(className);
				var length1:number = wins.length;
				for(var i1:number = 0;i1 < length1;i1++){
					var win:IWindow = wins[i1];
					if(!win["stage"]) continue;
					
					params = args.concat();
					
					win.update.apply(win,params);
				}
			}
		}

		/**
		 * 设置显示对象对齐方式 ，取消对齐方式或取删除相关对齐方式引用align使用AlignType.NON，
		 * 用此方法设置对齐的并且不是IWindow对象或子类对象，对象不使用时要主动删除相关引用，否则会导致内存泄漏 
		 * @param target:DisplayObject 显示对象
		 * @param align:int 对齐方式
		 * @param top:int 与舞台上边框的距离 ，align属性有顶对齐时有效
		 * @param bottom:int 与舞台下边框的距离 ，align属性有底对齐时有效
		 * @param left:int 与舞台左边框的距离 ，align属性有左对齐时有效
		 * @param right:int 与舞台右边框的距离 ，align属性有右对齐时有效
		 * @see AlignType
		 */		
		public setAlign(target:DisplayObject,align:number,top:number = 0,bottom:number = 0,left:number = 0,right:number = 0):void{
			if(!target){
				LogManager.error(this,"显示对象不能为:" + target);
				return;
			}
			//无对齐
			if(align == AlignType.NONE){
				data = this._alignHashMap.remove(target.hashCode);
				return;
			}
			//已是当前对齐方式，注释掉(因有可能宽高已改变)
//			if(_alignHashMap.containsKey(target.hashCode) && _alignHashMap.getValue(target.hashCode) == align){
//				return;
//			}
			
			var data:AlignItem = this._alignHashMap.get(target.hashCode);
			if(!data)
				data = new AlignItem();
			
			data.align = align;
			data.top = top == 0 && "top" in target ? target["top"] : top;
			data.bottom = bottom == 0 && "bottom" in target ? target["bottom"] : bottom;
			data.left = left == 0 && "left" in target ? target["left"] : left;
			data.right = right == 0 && "right" in target ? target["right"] : right;
			
			this._alignHashMap.put(target.hashCode,data);
			
			this.layout(target);
		}

		/**
		 * 布局显示对象 
		 * @param target:DisplayObject 显示对象
		 * 
		 */		
		private layout(target:DisplayObject):void{
			if(!target || !target.stage) return;
			
			var data:AlignItem = this._alignHashMap.get(target.hashCode);
			
			var x:number = 0;
			var y:number = 0;
			var width:number = this.stage.stageWidth;
			var height:number = this.stage.stageHeight;
			
			var top:number = data.top;
			var bottom:number = data.bottom;
			var left:number = data.left;
			var right:number = data.right;
			var align:number = data.align;
			
			switch(align){
				//左上
				case AlignType.TOP_LEFT:
					x += left;
					y += top;
					break;
				//中上
				case AlignType.TOP_CENTER:
					x = (width - target.width ) / 2;
					y += top;
					break;
				//右上
				case AlignType.TOP_RIGHT:
					x = width - target.width;
					x -= right;
					y += top;
					break;
				//左中
				case AlignType.CENTER_LEFT:
					y = (height - target.height) / 2;
					x += left;
					break;
				//中心
				case AlignType.CENTER:
					x = (width - target.width ) / 2;
					y = (height - target.height) / 2;
					break;
				//右中
				case AlignType.CENTER_RIGHT:
					x = width - target.width;
					y = (height - target.height) / 2;
					x -= right;
					break;
				//左下
				case AlignType.BOTTOM_LEFT:
					y = height - target.height;
					x += left;
					y -= bottom;
					break;
				//中下
				case AlignType.BOTTOM_CENTER:
					x = (width - target.width ) / 2;
					y = height - target.height;
					y -= bottom;
					break;
				//右下
				case AlignType.BOTTOM_RIGHT:
					x = width - target.width;
					y = height - target.height;
					x -= right;
					y -= bottom;
					break;
			}
			
			target.x = x;
			target.y = y;
		}

		/**
		 * 设置显示对象在舞台上的层级并添加到显示列表中，
		 * 用此方法显示而非用open()打开的并且不是IWindow对象或子类对象，要用hide()方法删除相关引用，否则会导致内存泄漏
		 * @param target:DisplayObject 显示对象
		 * @param layerType:int 层级 @see ApplicationLayerType
		 * @param align:int 对齐方式
		 * @param top:int 与舞台上边框的距离 ，align属性有顶对齐时有效
		 * @param bottom:int 与舞台下边框的距离 ，align属性有底对齐时有效
		 * @param left:int 与舞台左边框的距离 ，align属性有左对齐时有效
		 * @param right:int 与舞台右边框的距离 ，align属性有右对齐时有效
		 * @see AlignType
		 * @see #hide()
		 */		
		public show(target:DisplayObject,layerType:number,align:number = -1,top:number = 0,bottom:number = 0,left:number = 0,right:number = 0):void{
			var container:Sprite = <Sprite>(this.getApplicationLayer(layerType));
			if(target.parent != container){
				var lastParent:Sprite = <Sprite>(target.parent);
				container.addChild(target);
				this.checkModel(lastParent);
			}
			this.setAlign(target,align,top,bottom,left,right);
			this.setModel(container,layerType);
		}

		/**
		 * 从舞台上移除显示对象 
		 * @param target:DisplayObject 已呈现在舞台上的显示对象
		 * @see #show()
		 */		
		public hide(target:DisplayObject):void{
			if(!target) return;
			
			var container:Sprite = <Sprite> (target.parent);
			
//			try{
				//因容器destroy()有调用remove(),有可能发生，Error #2094: 事件调度递归溢出
				if(target.parent)
					target.parent.removeChild(target);
//			}catch(e:Error){}
			
			this.checkModel(container);
			
			if("remove" in target)
				target["remove"]();
			
			var className:string = getQualifiedClassName(target);
			if(this._winHashMap.containsKey(className)){
				if(className){
					//重置显示对象最后打开的存在时间
					this._timeHashMap.put(className,0);
					if(!TimerManager.getInstance().hasExecute(this._timerId)){
						this._timerId = TimerManager.getInstance().addExecute(this.timerHandler,this,DateUtil.VALUE_MINUTE,null);
					}
				}
			}else{
				this._alignHashMap.remove(target.hashCode);
			}
		}
		//
		/**
		 * 将窗口切换至指定层  
		 * @param target:Class 窗口类或实例
		 * @param layerType:int 层级 ApplicationLayerType
		 * @param addedToStage:Boolean = true 是否已添加至舞台
		 */		
		public setWindowLayer(target:any,layerType:number,addedToStage:boolean = true):void{
			//instanceof 子类也会返回true
			if(target instanceof Window)
				var win:Window = target;
			else if(isClass(target))
				win = <Window> (this.getTargetInstance(target,addedToStage));
			
			if(win)
				this.show(win,layerType,win.align);
		}

		/**获取舞台中心点 */		
		public get centerPoint():Point{
			return new Point(this.stage.stageWidth / 2,this.stage.stageHeight / 2);
		}

		/**计时器处理 */		
		private timerHandler():void{
			this._timeHashMap.eachKey(this.checkDestroy,this);
			
			var hasCloseTarget:boolean = false;
			var array:Array<any> = this._winHashMap.values();
			var length:number = array.length;
			for(var i:number = 0;i < length;i++){
				var wins:Array<any> = array[i];
				var length1:number = wins.length;
				for(var i1:number = 0;i1 < length1;i1++){
					var win:DisplayObject = wins[i1];
					if(!win.stage){
						hasCloseTarget = true;
						break;
					}
				}
			}
			
			if(!hasCloseTarget){
				this.removeTimer();
				
				//重置所有窗口时间
				for(var p in this._timeHashMap.content){
					this._timeHashMap.content[p] = 0;
				}
			}
		}

		/**显示对象存在时间处理*/		
		private checkDestroy(key:any):void{
			var time:number = this._timeHashMap.get(key);
			time += DateUtil.VALUE_MINUTE;
			var isDestroy:boolean = false;
			
			//长时间未使用的显示对象将被销毁
			if(time >= DateUtil.VALUE_MINUTE){
				var array:Array<any> = this._winHashMap.get(key);
				
				var win:DisplayObject = null;
				for(var i:number = 0; i < array.length; i++){
					win = array[i];
					if(!win.stage){
						//移除并销毁
						if("destroy" in win){
							win["destroy"]();
						}else{
							if(win.parent)
								win.parent.removeChild(win);
						}
						this._alignHashMap.remove(win.hashCode);
						
						array.splice(i,1);
						i --;
					}
				}
				if(array.length == 0){
					//显示对象全部销毁时，停止计时器
					var winCount:number = 0;
					array = this._winHashMap.values();
					var length1:number = array.length;
					for(var i1:number = 0;i1 < length1;i1++){
						var wins:Array<any> = array[i1];
						winCount += wins.length;
						if(winCount > 0)
							break;
					}
					if(winCount == 0){
						this.removeTimer();
					}
					
					this._winHashMap.remove(key);
					this._timeHashMap.remove(key);
					isDestroy = true;
				}
				time = 0;
			}
			
			if(!isDestroy)
				this._timeHashMap.put(key,time);
		}	
		
		/**
		 * 节流事件处理 
		 * @param event
		 * 
		 */		
		//private throttleHandler(event:ThrottleEvent):void{
		//	if(event.state == ThrottleType.THROTTLE || event.state == ThrottleType.PAUSE){
		//		SystemManager.keepFPS(true);
		//	}else if(event.state == ThrottleType.RESUME){
		//		SystemManager.keepFPS(false);
		//	}
		//}
		//
		///**
		// * GC处理
		// *
		// */
		//private gcHandler():void{
			//var value:number = 1 / 1024 / 1024;
			//
			//LogManager.debug(this,"Before gc total memory:" + (System.totalMemory * value).toFixed(2) + "M");
			//SystemManager.gc();
			//LogManager.debug(this,"After gc total memory:" + (System.totalMemory * value).toFixed(2) + "M");
		//}

		/**删除计时回调*/		
		private removeTimer():void{
			TimerManager.getInstance().removeExecute(this._timerId);
		}

		/**
		 * 设置是否绘制下层交互遮罩
		 * @param container
		 * @param layerType
		 * 
		 */		
		private setModel(container:Sprite,layerType:number = 0):void{
			var layerConfig:any = ApplicationLayerType.LAYER_MOUSE_CONFIGS[layerType];
			
			container.graphics.clear();
			
			if(layerConfig.model && container.numChildren > 0){
				container.graphics.beginFill(0x0,layerConfig.alpha);
				container.graphics.drawRect(0,0,this.stage.stageWidth,this.stage.stageHeight);
				container.graphics.endFill();
			}
		}

		/**检测模态是否显示 */		
		private checkModel(container:Sprite):void{
			//处理下层交互遮罩
			if(container)
				for(var key in this._layerHashMap.content){
					if(this._layerHashMap.get(key) == container){
						this.setModel(container,key);
						break;
					}
				}
		}

		/**
		 * 调度 recall() 事件 
		 * @param win:IWindow 当前调用 recall() 的窗口
		 * 
		 */		
		public dispatchRecall(win:IWindow):void{
			if(this.hasEventListener(ApplicationEvent.WINDOW_RECALL))
				this.dispatchEvent(new ApplicationEvent(ApplicationEvent.WINDOW_RECALL,false,false,win));
		}
		
        public openView(view: BasePanel):void {
    		var targetLayer:Sprite = null;
    		switch(view.layerType){
    		    case BasePanel.LAYER_UI:
                    targetLayer = this.layer_ui;
                    break;
                case BasePanel.LAYER_MASK:
                    targetLayer = this.layer_mask;
                    break;
                case BasePanel.LAYER_WINDOW_1:
                    targetLayer = this.layer_window_1;
                    break;
                case BasePanel.LAYER_WINDOW_2:
                    targetLayer = this.layer_window_2;
                    break;
                case BasePanel.LAYER_TIP:
                    targetLayer = this.layer_tip;
                    break;
                case BasePanel.LAYER_GUIDE:
                    targetLayer = this.layer_guide;
                    break;
    		}
            targetLayer.addChild(view);
            view.openEnd();
		}

        public closeView(view: BasePanel): void {
            var targetLayer: Sprite = null;
            switch(view.layerType) {
                case BasePanel.LAYER_UI:
                    targetLayer = this.layer_ui;
                    break;
                case BasePanel.LAYER_MASK:
                    targetLayer = this.layer_mask;
                    break;
                case BasePanel.LAYER_WINDOW_1:
                    targetLayer = this.layer_window_1;
                    break;
                case BasePanel.LAYER_WINDOW_2:
                    targetLayer = this.layer_window_2;
                    break;
                case BasePanel.LAYER_TIP:
                    targetLayer = this.layer_tip;
                    break;
                case BasePanel.LAYER_GUIDE:
                    targetLayer = this.layer_guide;
                    break;
            }
            if(targetLayer.contains(view)){
                targetLayer.removeChild(view);   
            }
            view.isOpen = false;
            view.onClose();
        }
        
	}
}