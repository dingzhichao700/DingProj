
module egret {

	export class PieceMap2 extends CoreContainer{
		/**
		 * 图片扩展名 
		 */		
		public extension:string = ExtensionType.JPG;
		/**
		 * 图片根目录 
		 */		
		public rootPath:string = "";
		//小地图名称，用于预显示
		public MINI_MAP_NAME:string = "miniMap";
		
		//图片子目录，即图片所在的文件夹
		public _subPath:string = null;
		//地图宽高
		public _mapWidth:number = 0;
		public _mapHeight:number = 0;
		//碎片宽高
		public _pieceWidth:number = 0;
		public _pieceHeight:number = 0;
		
		//渲染矩形
		public _renderRect:Rectangle = null;
		//视口矩形
		public _viewRect:Rectangle = null;
		//排序时临时视口矩形中心点
		private _viewRectPoint:Point = null;
		//碎片矩形
		private _pieceRect:Rectangle = null;
		
		//碎片行列总数
		public _totalRows:number = 0;
		public _totalColumns:number = 0;
		//渲染区域的开始行列和结束行列
		public _startRow:number = 0;
		public _startColumn:number = 0;
		public _endRow:number = 0;
		public _endColumn:number = 0;
		
		//已加载的图片碎片
		public _pieces:Array<any> = null;
		//已显示的图片碎片
		public _piecesAdded:Array<any> = null;
		//碎片url
		public _pieceUrls:Array<any> = null;
		//队列加载器
		public _queueLoader:QueueLoader = null;
		//图片行列数据
		public _rcHashMap:HashMap = null;
		//模糊地图加载器
		public _miniImage:Image = null;
		//模糊地图
		//public _miniBitmap:Bitmap = null;
		//public _miniBmd:Texture = null;
		//已加载到的图片数量
		public _pieceCount:number = 0;
		//碎片总数
		private _pieceCountTotal:number = 0;
		//模糊地图复制时使用参数
		private _miniPoint:Point = null;
		//模糊地图与实际地图比率
		private _miniScaleX:number = 1;
		private _miniScaleY:number = 1;
		//模糊地图矩形数据
		private _miniRect:Rectangle = null;
		//场景缓存，缓存3个
		private _mapCache:HashMap;
		//场景id缓存
		private _mapIds:Array<string>;
		//切片容器
		private _container:DisplayObjectContainer;

		
		/**
		 * 构造函数
		 */
		public constructor(){
			super();

			this.touchEnabled = false;
			this.touchChildren = false;
			
			this._miniImage = new Image(null,0,0,false,this,this.loadMiniComplete);

			//this._miniBitmap = new Bitmap();
			//this.addChild(this._miniBitmap);

			this._container = new egret.DisplayObjectContainer();
			this.addChild(this._container);
			
			this._renderRect = new Rectangle();
			this._pieceRect = new Rectangle();
			this._miniRect = new Rectangle();
			this._viewRectPoint = new Point();
			
			this._pieces = [];
			this._piecesAdded = [];
			this._pieceUrls = [];
			this._mapIds = [];

			this._rcHashMap = new HashMap();
			this._mapCache = new HashMap();

			this._miniPoint = new Point();
			
			this._queueLoader = new QueueLoader(1,this,this.loadComplete,this.loadError,this.loadProgress,this.loadAbort);
		}
		/**
		 * 地图高度 
		 * @return 
		 * 
		 */		
		public get mapHeight():number{
			return this._mapHeight;
		}
		/**
		 * 地图宽度 
		 * @return 
		 * 
		 */
		public get mapWidth():number{
			return this._mapWidth;
		}

		public get renderRect():Rectangle{
			return this._renderRect;
		}
		/**
		 * 渲染区域矩形 
		 * @param value:Rectangle
		 * 
		 */
		public set renderRect(value:Rectangle){
			if(!value){
				this._renderRect.setEmpty();
				
				this.updateRender();
			}
			else if(this._renderRect.x != value.x ||
				this._renderRect.y != value.y || 
				this._renderRect.width != value.width ||
				this._renderRect.height != value.height){
				
				this._renderRect.x = value.x;
				this._renderRect.y = value.y;
				this._renderRect.width = value.width;
				this._renderRect.height = value.height;
				
				//this._miniBitmap.x = this._renderRect.x;
				//this._miniBitmap.y = this._renderRect.y;
				
				this.updateRender();
			}
		}
		/**
		 * 设置地图数据 
		 * @param mapWidth:int = 0 地图宽
		 * @param mapHeight:int = 0 地图高
		 * @param pieceWidth:int = 0 碎片宽
		 * @param pieceHeight:int = 0 碎片高
		 * 
		 */		
		public setProperty(mapWidth:number = 0,mapHeight:number = 0,pieceWidth:number = 0,pieceHeight:number = 0):void{
			var attrs:Array<any> = ["_mapWidth","_mapHeight","_pieceWidth","_pieceHeight"];
			
			for(var p in arguments){
				if(arguments[p] > 0)
					this[attrs[p]] = arguments[p];
			}
			
			for(p in attrs){
				if(this[attrs[p]] <= 0){
					LogManager.error(this,"参数应大于0:" + attrs[p] + " = " + this[attrs[p]]);
					return;
				}
			}
			
			this._totalRows = Math.ceil(this._mapHeight / this._pieceHeight);
			this._totalColumns = Math.ceil(this._mapWidth / this._pieceWidth);
			
			this._pieceCountTotal = this._totalRows * this._totalColumns;

			var config: any = {};
			config.resources = [];

			//缓存碎片数据
			for(var i:number = 0; i < this._totalRows; i++){
				if(this._pieces[i])
					this._pieces[i].length = 0;
				else
					this._pieces[i] = [];
				
				if(this._pieceUrls[i])
					this._pieceUrls[i].length = 0;
				else
					this._pieceUrls[i] = [];
				
				for(var j:number = 0; j < this._totalColumns; j++){
					this._pieceUrls[i][j] = this.rootPath + this._subPath + "/" + i + "_" + j + this.extension;

					config.resources.push({
						name:this._pieceUrls[i][j],
						type:RES.ResourceItem.TYPE_IMAGE,
						url:this._pieceUrls[i][j]
					});
				}
			}

			//因egret2.0无法销毁未配置的资源，手动配置加载数据，用于销毁
			RES.parseConfig(config);
		}
		/**
		 * 初始化数据 
		 * @param data:SceneEditLo 场景编辑数据
		 * 
		 */		
		public initData(data:SceneEditLo):void{
			this._pieceCount = 0;
			this._subPath = data.id + "";
			
			this.setProperty(data.width,data.height,data.pieceWidth,data.pieceHeight);
			
			this._miniImage.width = data.width;
			this._miniImage.height = data.height;
			this._miniImage.url = this.rootPath + this._subPath + "/" + data.id + this.extension;
			this.addChildAt(this._miniImage,0);
		}
		//
		/**
		 * 渲染地图 
		 * @param viewRect:Rectangle 可视矩形
		 * @param renderRect:Rectangle 渲染矩形
		 * 
		 */		
		public renderMap(viewRect:Rectangle,renderRect:Rectangle):void{
			this._viewRect = viewRect;
			this.renderRect = renderRect;
		}
		//
		/**
		 * 清空地图 
		 * 
		 */		
		public clearMap():void{
			this._queueLoader.clear();
			this._rcHashMap.clear();

			this._piecesAdded.length = 0;

			var target:any = null;
			var length:number = this._pieces.length;
			var subLength:number = 0;

			for(var i:number = 0; i < length; i++){
				subLength = this._pieces[i].length;

				for(var j:number = 0; j < subLength; j++){
					target = this._pieces[i][j];
					if(target){
						if(target.parent)
							target.parent.removeChild(target);
					}

					this._pieces[i][j] = null;
				}
			}

			// 若因网络原因导致加载滞后，而容器还存在图片则直接删除
			while(this._container.numChildren > 0){
				this._container.removeChildAt(0);
			}

			//销毁地图切片
			//for(var i:number = 0; i < this._totalRows; i++){
			//	for(var j:number = 0; j < this._totalColumns; j++){
			//		if(this._pieceUrls[i][j]){
			//			RES.destroyRes(this._pieceUrls[i][j]);
			//		}
			//	}
			//}

			//缓存超过3个场景则第一个场景销毁
			if(this._mapCache.size() > 3){
				this.removeCache(this._mapIds.shift());
			}

			if(this._miniImage.content){
				//if((<Bitmap><any> (this._miniImage.content)).texture)
				//	(<Bitmap><any> (this._miniImage.content)).texture.dispose();
				this._miniImage.content = null;
			}
			//if(this._miniBitmap){
			//	this._miniBitmap.texture = null;
			//}
			//if(this._miniBmd){
			//	this._miniBmd.dispose();
			//	this._miniBmd = null;
			//}
			
			this.renderRect = null;
		}
		//
		public destroy():void{
			if(this._isDestroy) return;
			
			super.destroy();
		}
		//
		/**
		 * 更新渲染区域 
		 * 
		 */		
		private updateRender():void{
			var x:number = this._renderRect.x;
			var y:number = this._renderRect.y;
			
			//新区域
			var endY:number = y + this._renderRect.height;
			var endX:number = x + this._renderRect.width;
			
			//Math.floor
			this._startRow = (y / this._pieceHeight) | 0;
			this._startColumn = (x / this._pieceWidth) | 0;
			
			this._endRow = Math.ceil(endY / this._pieceHeight);
			this._endColumn = Math.ceil(endX / this._pieceWidth);
			
			//添加在区域中的碎片
			this.addPieces(this._startRow,this._endRow,this._startColumn,this._endColumn);
			
			var target:DisplayObject = null;
			
			//移除不在区域中的碎片
			var length:number = this._piecesAdded.length;
			
			for(var i:number = 0; i < length; i++){
				target = this._piecesAdded[i];
				this._pieceRect.x = target.x;
				this._pieceRect.y = target.y;
				this._pieceRect.width = target.width;
				this._pieceRect.height = target.height;
				
				if(!this._renderRect.intersects(this._pieceRect)){
					if(target.parent)
						target.parent.removeChild(target);
					
					this._piecesAdded.splice(i,1);
					length = this._piecesAdded.length;
					
					i--;
				}
			}
			
			this.drawBlurryArea();
		}
		//
		/**
		 * 添加碎片 
		 * @param startRow:int 开始行
		 * @param endRow:int 结束行
		 * @param startColumn:int 开始列
		 * @param endColumn:int 结束列
		 * 
		 */		
		private addPieces(startRow:number,endRow:number,startColumn:number,endColumn:number = 0):void{
			//Math方法效率较低
//			startRow = Math.max(0,startRow);
//			startColumn = Math.max(0,startColumn);
//			endRow = Math.min(_totalRows,endRow);
//			endColumn = Math.min(_totalColumns,endColumn);
			//提高效率
			if(startRow < 0)
				startRow = 0;
			if(startColumn < 0)
				startColumn = 0;
			if(endRow > this._totalRows)
				endRow = this._totalRows;
			if(endColumn > this._totalColumns)
				endColumn = this._totalColumns;
			
			var array:Array<any> = [];
			var target:DisplayObject = null;
			var url:string = null;
			
			for(var i:number = startRow; i < endRow; i++){
				for(var j:number = startColumn; j < endColumn; j++){
					target = this._pieces[i][j];

					if(!target){
						target = this.getCache(this._subPath,this._pieceUrls[i][j]);
					}
					
					if(target){
						this._pieces[i][j] = target;

						if(target.parent != this._container){
							this._container.addChild(target);
							this._piecesAdded.push(target);
						}
					}else{
						//加载未加载的图片
						url = this._pieceUrls[i][j];
						
						if(!this._rcHashMap.containsKey(url)){
							this._rcHashMap.put(url,[i,j]);
							array.push({url:url,i:i,j:j});
							
//							trace("添加加载:" + url,[i,j]);
						}
					}
				}
			}
			
			var length:number = array.length;
			if(length > 0){
				if(this._viewRect){
					this._viewRectPoint.x = this._viewRect.x + this._viewRect.width / 2;
					this._viewRectPoint.y = this._viewRect.y + this._viewRect.height / 2;
					array.sort.apply(this,[this.sortPiece]);
				}
				
				var urls:Array<any> = [];
				for(i = 0; i < length; i++){
					urls.push(array[i].url);
				}
				
				this._queueLoader.addUrls(urls);
			}
		}
		//
		/**
		 * 方块排序 
		 * @param a
		 * @param b
		 * @return 
		 * 
		 */		
		private sortPiece(a:any,b:any):number{
			//离视口中心点近的方块优先加载
			var pa:Point = new Point((a.j + 0.5) * this._pieceWidth,(a.i + 0.5) * this._pieceHeight);
			var pb:Point = new Point((b.j + 0.5) * this._pieceWidth,(b.i + 0.5) * this._pieceHeight);
			
			var da:number = Point.distance(pa,this._viewRectPoint);
			var db:number = Point.distance(pb,this._viewRectPoint);
			
			if(da <= db){
				return -1;
			}else{
				return 1;
			}
			
			return 0;
		}
		//
		/**
		 * 是否已加载完全部碎片 
		 * @return 
		 * 
		 */		
		private get isLoadAll():boolean{
			return this._pieceCount >= this._pieceCountTotal;
		}
		//
		/**
		 * 绘制模糊地图 
		 * 
		 */		
		private drawBlurryArea():void{
			if(this.isLoadAll){
				//已全部加载图片时，不用渲染模糊地图 
				//if(this._miniBmd){
				//	this._miniBitmap.texture = null;
				//	this._miniBmd.dispose();
				//	this._miniBmd = null;
				//}

				if(this._miniImage && this._miniImage.parent){
					this._miniImage.parent.removeChild(this._miniImage);
				}
				
				return;
			}

			//目前egret无法复制位图数据
			//if(this._miniImage.content && !this._renderRect.isEmpty()){
			//	var rWidth:number = this._renderRect.width;
			//	var rHeight:number = this._renderRect.height;
			//
			//	this._miniRect.x = parseInt(this._renderRect.x * this._miniScaleX);
			//	this._miniRect.y = parseInt(this._renderRect.y * this._miniScaleY);
			//	this._miniRect.width = parseInt(rWidth * this._miniScaleX);
			//	this._miniRect.height = parseInt(rHeight * this._miniScaleY);
			//
			//	if(!this._miniBmd ||
			//		(this._miniBmd && this._miniBmd.textureWidth != this._miniRect.width ||
			//		this._miniBmd.textureHeight != this._miniRect.height)){
			//
			//		if(this._miniBmd)
			//			this._miniBmd.dispose();
			//		//this._miniBmd = new BitmapData(this._miniRect.width,this._miniRect.height,false,0x0);
			//		this._miniBmd = new egret.Texture();
			//	}
			//
			//	var bmd:Texture = (<Bitmap><any> (this._miniImage.content)).texture;
			//	this._miniBmd.copyPixels(bmd,this._miniRect,this._miniPoint);
			//	this._miniBitmap.bitmapData = this._miniBmd;
			//
			//	this._miniBitmap.width = rWidth;
			//	this._miniBitmap.height = rHeight;
			//}
		}
		//
		/**
		 * 加载图片完成 
		 * @param url:String 图片地址
		 * @param index:int 加载的顺序
		 * @param content:DisplayObject 图片
		 * 
		 */		
		private loadComplete(url:string,index:number,content:DisplayObject):void{
			var array:Array<any> = this._rcHashMap.get(url);
			if(!array) return;

			var row:number = array[0];
			var column:number = array[1];
			
			//content.cacheAsBitmap = true;
			//content.opaqueBackground = 0x0;
			
			this._pieces[row][column] = content;
			content.x = column * this._pieceWidth;
			content.y = row * this._pieceHeight;

			this._container.addChild(content);
			this._piecesAdded.push(content);
			
			this._pieceCount ++;

			this.addCache(this._subPath,url,content);
			
			//LogManager.debug(this,"加载地图碎片成功:row = " + row + ",column = " + column);
		}
		//
		/**
		 * 加载错误 
		 * @param e
		 * 
		 */		
		private loadError(e:IOErrorEvent):void{
			//LogManager.error(this,e.text);
		}
		//
		/**
		 * 加载过程 
		 * @param e
		 * 
		 */		
		private loadProgress(e:ProgressEvent):void{
			
		}
		//
		/**
		 * 中止加载 
		 * @param url
		 * @param index
		 * 
		 */		
		private loadAbort(url:string,index:number = 0):void{
			this._rcHashMap.remove(url);
			
//			trace("中止加载:" + url);
		}
		
		private loadMiniComplete(image:Image):void{
			//if(this._miniImage.content){
			//	var bmd:BitmapData = (<Bitmap><any> (this._miniImage.content)).bitmapData;
			//	this._miniScaleX = bmd.width / _mapWidth;
			//	this._miniScaleY = bmd.height / _mapHeight;
			//}
			//
			//this.drawBlurryArea();
		}
		//
		/**
		 * 增加场景图片缓存
		 * @param id 场景 id
		 * @param url 图片url
		 * @param bitmap 图片
		 */
		public addCache(id:string,url:string,bitmap:DisplayObject):void{
			var sub:HashMap = this._mapCache.get(id);
			if(!sub){
				sub = new egret.HashMap();
				this._mapCache.put(id,sub);

				this._mapIds.push(id);
			}

			sub.put(url,bitmap);
		}
		//
		/**
		 * 获取缓存图片
		 * @param id 场景 id
		 * @param url 图片url
		 * @returns {any}
		 */
		public getCache(id:string,url:string):Bitmap{
			var sub:HashMap = this._mapCache.get(id);
			if(sub){
				return sub.get(url);
			}

			return null;
		}
		//
		/**
		 * 删除缓存图片
		 * @param id 场景 id
		 */
		public removeCache(id:string):void{
			var sub:HashMap = this._mapCache.remove(id);
			if(sub){
				var index:number = this._mapIds.indexOf(id);
				if(index > -1){
					this._mapIds.splice(index,1);
				}
				for(var key in sub.content){
					RES.destroyRes(sub.get(key));
				}
			}
		}
	}
}