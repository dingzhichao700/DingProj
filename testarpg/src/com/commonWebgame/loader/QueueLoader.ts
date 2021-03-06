
module egret {

	export class QueueLoader implements IDestroy{
		/**
		 * 可同时加载的数量，超出时在队列中等待
		 */		
		public loadCount:number = 6;
		/**
		 * 加载一个资源完成时回调函数  function(url:String,index:int,content:DisplayObject):void{} url:资源地址,index:加载顺序,content:加载到的资源
		 */
		public loadComplete:Function = null;
		/**
		 * 加载错误时回调函数 function(e:IOErrorEvent):void{}
		 */		
		public loadError:Function = null;
		/**
		 * 加载过程时回调函数 function(e:ProgressEvent):void{}
		 */		
		public loadProgress:Function = null;
		/**
		 * 加载未完成时中止加载回调函数 function(url:String,index:int):void{} url:资源地址,index:加载顺序
		 */	
		public loadAbort:Function = null;
		
		//加载的资源url
		private _urls:Array<any> = null;
		//当前加载次序
		private _loadIndex:number = 0;
		//资源数组
		private _contents:Array<any> = null;
		//当前正在加载的资源数量
		private _currentCount:number = 0;
		//是否加载中
		private _isLoading:boolean = false;
		//全部加载完成或未开始加载
		private _isCompleted:boolean = false;
		//加载次序表
		private _indexHashMap:HashMap = null;
		//地址表
		private _urlHashMap:HashMap = null;
		private _callbackObj:any;

		/**
		 * 构造函数 
		 * @param loadCount:int = 2 可同时加载的数量，超出时在队列中等待
		 * @param loadComplete:Function = null 加载一个资源完成时回调函数  function(url:String,index:int,content:DisplayObject):void{} url:资源地址,index:加载顺序,content:加载到的资源
		 * @param loadError:Function = null 加载错误时回调函数 function(url:String,index:int):void{} url:资源地址,index:加载顺序
		 * @param loadProgress:Function = null 加载过程时回调函数 function(e:ProgressEvent):void{}
		 * @param loadAbort:Function = null 加载过程时中止加载回调函数 function(url:String,index:int):void{} url:资源地址,index:加载顺序
		 */		
		public constructor(loadCount:number = 2,target:any = null,loadComplete:Function = null,loadError:Function = null,loadProgress:Function = null,loadAbort:Function = null){
			this.loadCount = Math.max(1,loadCount);
			this.loadComplete = loadComplete;
			this.loadError = loadError;
			this.loadProgress = loadProgress;
			this.loadAbort = loadAbort;
			this._callbackObj = target;
			
			this._urls = [];
			this._contents = [];
			
			this._indexHashMap = new HashMap();
			this._urlHashMap = new HashMap();
		}
		/**
		 * 是否加载中 
		 * @return 
		 * 
		 */		
		public get isLoading():boolean{
			return this._isLoading;
		}
		/**
		 * 是否已加载结束 
		 * @return 
		 * 
		 */		
		public get isCompleted():boolean{
			return this._isCompleted;
		}
		//
		/**
		 * 当前加载次序 
		 * @return 
		 * 
		 */		
		public get loadIndex():number{
			return this._loadIndex;
		}
		//
		public get urls():Array<any>{
			return this._urls;
		}
		/**
		 * 加载的资源数组 
		 * @param value:Array
		 * 
		 */		
		public set urls(value:Array<any>){
			if(!value){
				LogManager.error(this,"参数不能为空: urls = " + value);
				return;
			}
			
			this._urls = value;
			
			this.initLoading();
		}
		//
		/**
		 * 添加加载的资源，支持加载中添加
		 * @param urls:Array:Array
		 * 
		 */		
		public addUrls(urls:Array<any>,isPriority:boolean = true):void{
			if(this._isLoading){
				//加载中，直接添加至队列中
				if(isPriority){
					this._urls = urls.concat(this._urls);
					
					urls = [this._loadIndex + 1,0].concat(urls);
					this._urls.splice.apply(this._urls,urls);
				}else{
					this._urls = this._urls.concat(urls);
				}
				
				if(!this._isLoading)
					this.urls = urls;
			}else{
				this.urls = urls.concat();
			}
		}
		//
		/**
		 * 停止所有正在加载的资源进程 
		 * 
		 */		
		public stopAll():void{
			this._loadIndex = Number.POSITIVE_INFINITY;
			
			this._indexHashMap.clear();
			this._urlHashMap.clear();
			
			if(this._isLoading)
				this._isCompleted = true;
			this._isLoading = false;
		}
		//
		/**
		 * 停止加载并清空数据 
		 * 
		 */		
		public clear():void{
			this.stopAll();
			
			this._urls.length = 0;
			this._contents.length = 0;
		}
		//
		/**
		 * 销毁对象 
		 * 
		 */		
		public destroy():void{
			this.stopAll();
			
			this.loadComplete = null;
			this.loadError = null;
			this.loadProgress = null;
			this.loadAbort = null;
		}
		//
		/**
		 * 初始化加载  
		 * 
		 */		
		private initLoading():void{
			if(!this._urls || this._urls.length == 0) return;
			
//			stopAll();
			
			this._loadIndex = 0;
			this._currentCount = 0;
			
			this.loading();
		}
		/**
		 * 执行加载
		 * 
		 */		
		private loading():void{
			//加载结束
			if(this._loadIndex >= this._urls.length){
				this._isLoading = false;
				this._isCompleted = true;
				
				return;
			}
			
			//同时加载数量限制
			if(this._currentCount < this.loadCount){
				this._isLoading = true;
				this._isCompleted = false;
				
				var url:string = this._urls[this._loadIndex];

				//暂无错误处理
				RES.getResByUrl(url,this.completeHandler,this);
				
				this._indexHashMap.put(url,this._loadIndex);

				this._currentCount ++;
				this._loadIndex ++;
				
				this.loading();
			}
		}
		//加载完成
		private completeHandler(data:any,url:string):void{
			var index:number = this._indexHashMap.get(url);
			this._contents[index] = new Bitmap(data);

			if(this.loadComplete)
				this.loadComplete.apply(this._callbackObj,[url,index,this._contents[index]]);

			this._currentCount --;

			//因手机性能问题，延迟加载
			EnterFrameManager.getInstance().addExecute(this.loading,this,20,null,1);
		}
		//加载过程
		//private progressHandler(e:ProgressEvent):void{
		//	if(this.loadProgress != null)
		//		this.loadProgress(e);
		//}
		////加载错误
		//private ioErrorHandler(e:IOErrorEvent):void{
		//	var loader:Loader = (<LoaderInfo><any> (e.target)).loader;
		//	var url:string = this._urlHashMap.get(loader);
		//	var index:number = this._indexHashMap.get(loader);
		//
		//	if(this.loadError != null)
		//		this.loadError(url,index);
		//
		//	//正常加载完成时回收Loader
		//	this.close(loader);
		//
		//	this.loading();
		//}
		//
		/**
		 * 关闭loader 
		 * @param image
		 * @param isRecover:Boolean = true 是否回收Loader
		 */		
		//private close(loader:Loader,isRecover:boolean = true):void{
		//	loader.contentLoaderInfo.removeEventListener(Event.COMPLETE,this.completeHandler,this);
		//	loader.contentLoaderInfo.removeEventListener(ProgressEvent.PROGRESS,this.progressHandler,this);
		//	loader.contentLoaderInfo.removeEventListener(IOErrorEvent.IO_ERROR,this.ioErrorHandler,this);
		//
		//	try{
		//		loader.close();
		//	}catch(e){
		//
		//	}
		//	loader.unload();
		//	loader.unloadAndStop();
		//
		//	this._indexHashMap.remove(loader);
		//	this._urlHashMap.remove(loader);
		//
		//	this._loadersCur.remove(loader);
		//
		//	if(isRecover)
		//		this._loaders.push(loader);
		//
		//	this._currentCount --;
		//}
	}
}