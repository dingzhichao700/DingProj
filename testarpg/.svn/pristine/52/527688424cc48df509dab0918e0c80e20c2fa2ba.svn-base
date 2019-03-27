
module egret {

	export class TimerManager{
		/**
		 * 共用驱动器(Timer执行者)的项目数量，0为不限制 
		 */		
		public sharedCount:number = 100;
		
		//单例
		private static _instance:TimerManager = null;
		//计时器与回调对象列表
		public _hashMap:HashMap = null;
		//回调方法项目
		public _executeHashMap:HashMap = null;
		//GC计时器
		public _gcTimer:Timer = null;
		//timerHandler()专用缓存对象
		private _completeArray:Array<any> = null;
		//计时器映射model表
		private _modelMap:HashMap = null;
		//
		private _idGenerator:IDGenerator;
		/**
		 * 构造函数
		 * 
		 */
		public constructor(){
			this._hashMap = new HashMap();
			this._executeHashMap = new HashMap();
			this._modelMap = new HashMap();
			this._completeArray = [];
			this._idGenerator = new egret.IDGenerator();
		}
		//
		/**
		 * 单例 
		 * @return 
		 * 
		 */		
		public static getInstance():TimerManager{
			return TimerManager._instance || (TimerManager._instance = new TimerManager());
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
		//
		/**
		 * 添加计时回调函数，若要循环添加方法，应在添加前调用removeExecute()移除，通过返回的 id 自行判断是否已添加某函数的回调，用于保存此 id 的变量初始化时应设为NaN，否则根据 id 移除回调时，有可能把其它回调移除
		 * @param execute:Function 回调函数
		 * @param target:Object = null 执行函数的对象
		 * @param delay:Number 执行回调函数的时间间隔 ，单位 ms，最小值:20
		 * @param params:Array <code>execute</code>函数参数列表，数组的每个元素将作为函数的一个参数进行传递，而不将数组作为一个参数传递
		 * @param repeatCount:int = 0  执行次数，0 不限制
		 * @param priority:int = 0 函数优先级，优先级数值大的优先执行，最小值:0
		 *
		 */
		public addExecute(execute:Function,target:any,delay:number = 20,params:Array<any>=null,repeatCount:number = 0,priority:number=0):number{
			var id:number = this._idGenerator.getID();
			while(this._executeHashMap.containsKey(id)){
				id = this._idGenerator.getID();
			}

			if(execute == null){
				LogManager.error(this,"execute不能为空: execute = " + execute);
				return id;
			}
			
			//if(this._executeHashMap.containsKey(execute)) return;
			
			var item:TimerScriptItem = ScriptItemManager.getInstance().getTimerScriptItem(execute,delay,params,priority,target);
			item.repeatCount = repeatCount;
            item.id = id;

			this.addScriptItem(item);

			return id;
		}
		//
		/**
		 * 移除计时回调函数 
		 * @param execute:Function 回调函数
		 */		
		public removeExecute(id:number):void{
			var item:TimerScriptItem = this._executeHashMap.remove(id);

			this.removeScriptItem(item);
			ScriptItemManager.getInstance().recoverScriptItem(item);
		}
		//
		/**
		 * 添加计时回调项目 
		 * @param scriptItem:TimerScriptItem 计时回调项目
		 * 
		 */		
		private addScriptItem(scriptItem:TimerScriptItem):TimerScriptItem{
			if(!scriptItem || isNaN(scriptItem.id)) return null;

			if(scriptItem.execute != null)
				this._executeHashMap.put(scriptItem.id,scriptItem);
			
			var array:Array<any> = this._hashMap.get(scriptItem.delay);
			
			if(!array){
				array = [];
				this._hashMap.put(scriptItem.delay,array);
			}
			
			var isFull:boolean = false;
			var model:ScriptModel = null;
			
			var length:number = array.length;
			for(var i:number = 0;i < length;i++){
				var object:any = array[i];
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
					timer:this.addTimer(null,scriptItem.delay),
					model:new ScriptModel(this.sharedCount)
				};
				array.push(object);
				
				this._modelMap.put(object.timer.hashCode,object.model);
			}else{
				this.addTimer(object.timer);
			}
			//计时，长时间未使用则从内存中清理
			object.time = 0;
			
			model = object.model;
			model.addScript(scriptItem);
			
			return scriptItem;
		}
		//
		/**
		 * 移除计时回调项目，若已移除所有回调函数，将停止计时处理  
		 * @param scriptItem:TimerScriptItem 计时回调项目
		 * @param destroy:Boolean = false 是否销毁回调项目数据对象，若销毁，则项目属性清空
		 * @return ScriptItem 或  null
		 * 
		 */
		private removeScriptItem(scriptItem:TimerScriptItem,destroy:boolean = false):TimerScriptItem{
			if(!scriptItem) return null;
			
			var array:Array<any> = this._hashMap.get(scriptItem.delay);
			var model:ScriptModel = null;
			
			var length:number = array.length;
			for(var i:number = 0;i < length;i++){
				var object:any = array[i];
				model = object.model;
				
				if(model.hasScriptItem(scriptItem)){
					this._executeHashMap.remove(scriptItem.id);
					
					var result:TimerScriptItem = <TimerScriptItem><any> (model.removeScript(scriptItem,destroy));
					
					//检测是否已移除所有回调
					if(model.itemsCount == 0){
						//计时，长时间未使用则从内存中清理
						object.time = 0;
						
						this.removeTimer(object.timer);
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
		public removeTimer(timer:Timer):void{
			if(!timer) return;
			
			timer.reset();
			timer.removeEventListener(TimerEvent.TIMER,this.timerHandler,this);
		}
		//
		/**
		 * 启动计时处理 
		 * 
		 */		
		public addTimer(timer:Timer,delay:number = 0):Timer{
			if(!timer)
				timer = new Timer(delay);
			
			timer.addEventListener(TimerEvent.TIMER,this.timerHandler,this);
			timer.start();
			
			return timer;
		}
		//
		/**
		 * 计时处理 
		 * @param e
		 * 
		 */		
		public timerHandler(e:TimerEvent):void{
			var timer:Timer = <Timer><any> (e.target);
			var items:Array<ScriptItem> = null;
			var scriptItem:any = null;
			var array:Array<any> = this._hashMap.get(timer.delay);
			var model:ScriptModel = null;
			var length:number = 0;
			
			model = this._modelMap.get(timer.hashCode);

			length = model.priorityMax;
			//优先级高的先执行
			for(var i:number = length; i >= 0; i--){
				items = model.items[i];
				var length1: number = model.itemsCount;

				for(var i1:number = 0;i1 < length1;i1++){
					scriptItem = items[i1];
					if(!scriptItem) break;
					
					//防止一个对象发生错误时导致后面的对象无法执行脚本而崩溃
					//					try{
					scriptItem.apply();
					if(scriptItem.isCompleted)
						this._completeArray.push(scriptItem);
					//					}catch(e:Error){
					//						LogManager.error(TimerManager,"计时回调脚本对象调用错误:" + e);
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
		 * 开启或停止计时器 
		 * @param isStart
		 * 
		 */		
		public setTimer(isStart:boolean):void{
			if(isStart){
				if(!this._gcTimer){
					this._gcTimer = new Timer(DateUtil.VALUE_MINUTE);
				}
				if(!this._gcTimer.running){
					this._gcTimer.addEventListener(TimerEvent.TIMER,this.gcTimerHandler,this);
					this._gcTimer.start();
				}
			}else if(this._gcTimer){
				this._gcTimer.reset();
				this._gcTimer.removeEventListener(TimerEvent.TIMER,this.gcTimerHandler,this);
			}
		}
		//
		/**
		 * 计时器处理 
		 * @param e
		 * 
		 */		
		public gcTimerHandler(e:TimerEvent):void{
			var model:ScriptModel = null;
			var timer:Timer = null;
			var length:number = 0;
			var object:any = null;
			
			for(var key in this._hashMap.content){
				var values:Array<any> = this._hashMap.content[key];
				for(var i:number = 0; i < values.length; i++){
					object = values[i];
					//10分钟未使用并且计时器已停止的对象则清理
					object.time += e.target.delay;
					
					if(object.time >= DateUtil.VALUE_MINUTE_10){
						timer = object.timer;
						
						if(timer.running){
							object.time = 0;
						}else{
							model = object.model;
							model.destroy();
							
							this._modelMap.remove(timer.hashCode);
							values.splice(i,1);
							i --;
						}
					}
				}
				
				length += values.length;
			}
			
			//全部清理时，停止GC计时器
			if(length == 0)
				this.setTimer(false);
		}
	}
}