
module egret {

	export class EnterFrameManager{
		/**
		 * 共用驱动器(EnterFrame执行对象)的项目数量，0为不限制 
		 */		
		public sharedCount:number = 100;
		//单例 
		private static _instance:EnterFrameManager = null;
		
		//逐帧侦听对象
		private _frameSprite:DisplayObjectContainer=null;
		//回调方法项目
		private _executeHashMap:HashMap = null;
		//计时器与回调对象列表
		public _driverDatas:Array<any> = null;
		
		//enterFrameHandler()专用缓存对象
		private _completeArray:Array<any> = null;
		//计时器映射model表
		private _modelMap:HashMap = null;
		//
		private _idGenerator:IDGenerator;
		//
		private _gcId:number = NaN;
		/**
		 * 构造函数
		 * 
		 */
		public constructor(){
			this._executeHashMap = new HashMap();
			this._modelMap = new HashMap();
			this._driverDatas = [];
			this._completeArray = [];
			this._idGenerator = new egret.IDGenerator();
		}
		//
		/**
		 * 单例 
		 * @return 
		 * 
		 */		
		public static getInstance():EnterFrameManager{
			return EnterFrameManager._instance || (EnterFrameManager._instance = new EnterFrameManager());
		}
		//
		/**
		 * 是否已注册回调 
		 * @param execute:Function 回调函数
		 * @return 
		 * 
		 */		
		public hasExecute(id:number):boolean{
			return this._executeHashMap.containsKey(id);
		}
		//
		/**
		 * 获取方法对应的回调函数数据项目 
		 * @param execute:Function 回调函数 
		 * @return 
		 * 
		 */		
		public getItem(id:number):FrameScriptItem{
			return this._executeHashMap.get(id);
		}
		/**
		 * 添加逐帧回调函数，若要循环添加方法，应在添加前调用removeExecute()移除，通过返回的 id 自行判断是否已添加某函数的回调，用于保存此 id 的变量初始化时应设为NaN，否则根据 id 移除回调时，有可能把其它回调移除
		 * @param execute:Function 回调函数
		 * @param target:Object = null 执行函数的对象
		 * @param frameInterval:int = 1 执行回调函数的帧数间隔，最小为 1
		 * @param params:Array <code>execute</code>函数参数列表，数组的每个元素将作为函数的一个参数进行传递，而不将数组作为一个参数传递
		 * @param repeatCount:int = 0  执行次数，0 不限制
		 * @param priority:int = 0  函数优先级，优先级数值大的优先执行，最小值:0
		 *
		 */
		public addExecute(execute:Function, target:any, frameInterval:number = 1, params:Array<any>=null,repeatCount:number = 0, priority:number=0):number{
			var id:number = this._idGenerator.getID();
			while(this._executeHashMap.containsKey(id)){
				id = this._idGenerator.getID();
			}

			if(execute == null){
				LogManager.error(this,"execute不能为空: execute = " + execute);
				return id;
			}

			//js函数实现相同时，会被认为是同一个函数，即使属于不同对象
			//if(this._executeHashMap.containsKey(execute)) return;

			var item:FrameScriptItem = ScriptItemManager.getInstance().getFrameScriptItem(execute,frameInterval,params,priority,target);
			item.repeatCount = repeatCount;
			item.id = id;
			
			this.addScriptItem(item);

			return id;
		}
		//
		/**
		 * 移除计时回调函数 
		 * @param execute:Function 回调函数
		 * 
		 */		
		public removeExecute(id:number):void{
			var item:FrameScriptItem = this._executeHashMap.remove(id);
			
			this.removeScriptItem(item);
			ScriptItemManager.getInstance().recoverScriptItem(item);
		}
		//
		/**
		 * 添加逐帧回调项目 
		 * @param scriptItem:FrameScriptItem 逐帧回调项目
		 * 
		 */
		public addScriptItem(scriptItem:FrameScriptItem):FrameScriptItem{
			if(!scriptItem || isNaN(scriptItem.id)) return null;
			
			if(scriptItem.execute != null)
				this._executeHashMap.put(scriptItem.id,scriptItem);
			
			var isFull:boolean = false;
			var model:ScriptModel = null;
			
			var length:number = this._driverDatas.length;
			for(var i:number = 0;i < length;i++){
				var object:any = this._driverDatas[i];
				model = object.model;
				
				if(this.sharedCount > 0 && model.itemsCount >= this.sharedCount){
					isFull = true;
				}else{
					isFull = false;
					break;
				}
			}
			
			if(!object || isFull){
				object = {
					driver:this.addDriver(null),
					model:new ScriptModel(this.sharedCount)
				};
				this._driverDatas.push(object);
				this._modelMap.put(object.driver.hashCode,object.model);
			}else{
				this.addDriver(object.driver);
			}
			//计时，长时间未使用则从内存中清理
			object.time = 0;
			
			model = object.model;
			model.addScript(scriptItem);
			
			return scriptItem;
		}
		//
		/**
		 * 移除逐帧回调项目，若已移除所有回调函数，将停止逐帧处理  
		 * @param scriptItem:FrameScriptItem 逐帧回调项目
		 * @param destroy:Boolean = false 是否销毁回调项目数据对象，若销毁，则项目属性清空
		 * @return FrameScriptItem 或  null
		 * 
		 */
		public removeScriptItem(scriptItem:FrameScriptItem,destroy:boolean = false):FrameScriptItem{
			if(!scriptItem) return null;
			
			var model:ScriptModel = null;
			
			var length:number = this._driverDatas.length;
			for(var i:number = 0;i < length;i++){
				var object:any = this._driverDatas[i];
				model = object.model;
				
				if(model.hasScriptItem(scriptItem)){
					this._executeHashMap.remove(scriptItem.id);
					
					var result:FrameScriptItem = <FrameScriptItem><any> (model.removeScript(scriptItem,destroy));
					
					//检测是否已移除所有回调
					if(model.itemsCount == 0){
						//计时，长时间未使用则从内存中清理
						object.time = 0;
						
						this.removeDriver(object.driver);
						this.setTimer(true);
					}
					
					break;
				}
			} 
			
			return result;
		}
		//
		/**
		 * 停止计时处理   
		 * 
		 */
		public stop():void{
			if(!this._frameSprite) return;
			
			this._frameSprite.removeEventListener(Event.ENTER_FRAME,this.enterFrameHandler,this);
		}
		//
		/**
		 * 停止所有逐帧回调函数并销毁所有逐帧回调函数，所有FrameScriptItem对象属性清空
		 * 因组件有使用此类，禁止调用
		 */		
		private destroy():void{
			this.stop();
			this._frameSprite = null;
		}
		//
		/**
		 * 启动计时处理 
		 * 
		 */
		private start():void{
			if(!this._frameSprite)
				this._frameSprite = new DisplayObjectContainer();
			if(!this._frameSprite.hasEventListener(Event.ENTER_FRAME))
				this._frameSprite.addEventListener(Event.ENTER_FRAME,this.enterFrameHandler,this);
		}
		//
		/**
		 * 停止计时处理   
		 * 
		 */		
		public removeDriver(driver:DisplayObjectContainer):void{
			if(!driver) return;
			
			driver.removeEventListener(Event.ENTER_FRAME,this.enterFrameHandler,this);
		}
		//
		/**
		 * 启动计时处理 
		 * 
		 */		
		public addDriver(driver:DisplayObjectContainer):DisplayObjectContainer{
			if(!driver)
				driver = new DisplayObjectContainer();
			
			driver.addEventListener(Event.ENTER_FRAME,this.enterFrameHandler,this);
			
			return driver;
		}
		//
		/**
		 * 开启或停止计时器 
		 * @param isStart
		 * 
		 */		
		public setTimer(isStart:boolean):void{
			if(isStart){
				if(!isNaN(this._gcId))
					TimerManager.getInstance().removeExecute(this._gcId);

				this._gcId = TimerManager.getInstance().addExecute(this.gcTimerHandler,this,DateUtil.VALUE_MINUTE);
			}else{
				TimerManager.getInstance().removeExecute(this._gcId);
			}
		}
		//
		/**
		 * 逐帧处理 
		 * @param e
		 * 
		 */		
		private enterFrameHandler(e:Event):void{
			var items:Array<ScriptItem> = null;
			var scriptItem: any= null;
			var model:ScriptModel = null;
			var length:number = 0;
			
			model = this._modelMap.get(e.target.hashCode);
			
			length = model.priorityMax;
			//优先级高的先执行
			for(var i:number = length; i >= 0; i--){
				items = model.items[i];
				var length1:number = model.itemsCount;

				for(var i1:number = 0;i1 < length1;i1++){
					scriptItem = items[i1];
					if(!scriptItem) break;
					//防止一个对象发生错误时导致后面的对象无法执行脚本而崩溃
					//					try{
					scriptItem.apply();
					if(scriptItem.isCompleted)
						this._completeArray.push(scriptItem);
					//					}catch(e:Error){
					//						LogManager.error(EnterFrameManager,"计时回调脚本对象调用错误:" + e);
					//					}
				}
			}
			
			var length2:number = this._completeArray.length;
			for(var i2:number = 0;i2 < length2;i2++){
				scriptItem = this._completeArray[i2];
				this.removeScriptItem(scriptItem);
			}
			
			this._completeArray.length = 0;
		}
		//
		/**
		 * 计时器处理 
		 * @param e
		 * 
		 */		
		public gcTimerHandler():void{
			var model:ScriptModel = null;
			var length:number = 0;
			var object:any = null;
			var driver:DisplayObjectContainer = null;
			
			for(var i:number = 0; i < this._driverDatas.length; i++){
				object = this._driverDatas[i];
				//10分钟未使用并且计时器已停止的对象则清理
				object.time += DateUtil.VALUE_MINUTE;
				
				if(object.time >= DateUtil.VALUE_MINUTE_10){
					driver = object.driver;
					
					if(driver.hasEventListener(Event.ENTER_FRAME)){
						object.time = 0;
					}else{
						model = object.model;
						model.destroy();
						
						this._modelMap.remove(driver.hashCode);
						this._driverDatas.splice(i,1);
						i --;
					}
				}
			}
			
			length = this._driverDatas.length;
			
			//全部清理时，停止GC计时器
			if(length == 0)
				this.setTimer(false);
		}
	}
}