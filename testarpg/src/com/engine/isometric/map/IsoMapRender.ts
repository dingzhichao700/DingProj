
module egret {

	export class IsoMapRender extends CoreContainer{
		/**
		 * 场景层级鼠标交互配置 
		 */		
		public layerConfigs:any = null;
		
		//外部渲染容器要放在_mapContainer的最上层
		public _mapContainer:DisplayObjectContainer = null;
		//视口
		public _viewShape:Shape = null;
		//渲染矩形
		public _renderShape:Shape = null;
		//场景容器
		public _sceneContainer:DisplayObjectContainer = null;
		//交互和节点容器
		public _mapTileContainer:Sprite = null;
		//路径
		public _pathShape:Shape = null;
		
		//地图宽高
		public _mapWidth:number = 0;
		public _mapHeight:number = 0;
		//渲染区域和视口宽度偏移量
		public _renderOffsetWidth:number = 0;
		public _renderOffsetHeight:number = 0;
		//视口宽高
		public _viewWidth:number = 0;
		public _viewHeight:number = 0;
		//渲染矩形，大于或等于视口矩形
		public _renderRect:Rectangle = null;
		//视口矩形
		public _viewRect:Rectangle = null;
		//节点尺寸
		public _isoSize:number = 20; 
		//2倍节点尺寸
		public _isoSize2:number = 0;
		//半个节点尺寸
		public _halfSize:number = 0;
		//路径线宽
		public _pathThickness:number = 0;
		//路径颜色
		public _pathColor:number = 0xff9900;
		//渲染点击区域alpha
		public _renderRectAlpha:number = 0;
		
		//视口中心点全局坐标点
		public _cPoint:Point = null;
		public _cPoint2:Point = null;
		//视口原点全局坐标点
		public _oPoint:Point = null;
		public _oPoint2:Point = null;

		//节点集
		public _mapTiles:Array<any> = null;
		
		//更新数据标记
		public _updateData:any = null;
		//上一个标记颜色的节点
		public _lastTileMap:IsoTile = null;
		
//		protected var _stage:Stage = null;
		//是否显示节点
		public _isShowTile:boolean = false;
		//是否显示视口矩形
		public _isShowView:boolean = false;
		//是否显示路径
		public _isShowPath:boolean = false;
		//是否显示渲染矩形
		public _isShowRender:boolean = false;
		//是否绘制交互区域，地图加载完成后设置为 false 以提高效率
		public _isDrawInteractive:boolean = true;
		//路径显示策略
		public _pathPolicy:string = PathPolicyType.VIEW;
		
		//层级列表
		public _layerHashMap:HashMap = null;
		
		//渲染区域最大xy
		private _renderMX:number = 0;
		private _renderMY:number = 0;
		//内存优化，参数
		private _renderParams:Array<any> = null;
		public _stage:Stage = null;
		
		/**
		 * 构造函数 其它参数应为isoSize的整数倍
		 * @param mapWidth:Number = 1000 地图宽度
		 * @param mapHeight:Number = 1000 地图高度
		 * @param isoSize:Number = 20 节点尺寸(px)
		 * @param viewWidth:Number = 200 视口宽度
		 * @param viewHeight:Number = 160 视口高度
		 * @param renderOffsetWidth:Number = 0 视口宽度向两边扩展的偏移量，使渲染区域大于或等于视口区域，渲染区域宽度为:viewWidth + renderOffsetWidth x 2
		 * @param renderOffsetHeight:Number = 0 视口高度向两边扩展的偏移量，使渲染区域大于或等于视口区域，渲染区域高度为:viewHeight + renderOffsetHeight x 2
		 * 
		 */		
		public constructor(mapWidth:number = 1000,mapHeight:number = 1000,isoSize:number = 20,viewWidth:number = 200,viewHeight:number = 160,renderOffsetWidth:number = 0,renderOffsetHeight:number = 0){
			super();
			
			this.touchEnabled = false;
			
			this._updateData = new Object();
			this._renderRect = new Rectangle();
			this._viewRect = new Rectangle();
			this._layerHashMap = new HashMap();
			
			this._oPoint = new Point();
			this._oPoint2 = new Point();
			this._cPoint = new Point();
			this._cPoint2 = new Point();

			this._mapContainer = new DisplayObjectContainer();
			this._mapContainer.touchEnabled= false;
			this.addChild(this._mapContainer);
			
			this._sceneContainer = new DisplayObjectContainer();
			this._sceneContainer.touchEnabled= false;
			this._mapContainer.addChild(this._sceneContainer);
			
			this._mapTileContainer = new Sprite();
			this._mapTileContainer.touchEnabled = true;
			this._mapTileContainer.touchChildren = false;
			this._sceneContainer.addChild(this._mapTileContainer);
			
			this._renderParams = ["renderRect"];
			
			this.showPath(true);
			
			this.setProperties(mapWidth,mapHeight,isoSize,viewWidth,viewHeight,renderOffsetWidth,renderOffsetHeight);
			
			this.addEventListener(Event.ADDED_TO_STAGE,this.thisAddedToStage,this);
		}

		public get isDrawInteractive():boolean{
			return this._isDrawInteractive;
		}
		/**
		 * 是否绘制交互区域，地图加载完成后设置为 false 以提高效率 
		 * @param value:Boolean
		 * 
		 */
		public set isDrawInteractive(value:boolean){
			if(this._isDrawInteractive == value) return;
			
			this._isDrawInteractive = value;
			
			this.drawMapRect();
		}

		/**
		 * 节点容器，也是IsoMap的交互容器，用于定位移动目标
		 * @return 
		 * 
		 */		
		public get mapTileContainer():DisplayObjectContainer{
			return this._mapTileContainer;
		}

		public get renderRectAlpha():number{
			return this._renderRectAlpha;
		}
		/**
		 * 设置渲染区域矩形的alpha 
		 * @param value:Number
		 * @see #showRenderRect()
		 */
		public set renderRectAlpha(value:number){
			if(this._renderRectAlpha == value) return;
			
			this._renderRectAlpha = value;
			
			this.drawMapRect();
		}
		
		public get pathPolicy():string{
			return this._pathPolicy;
		}
		/**
		 * 设置路径显示策略 
		 * @param value:String
		 * @see PathPolicyType
		 */		
		public set pathPolicy(value:string){
			if(this._pathPolicy == value) return;
			
			this._pathPolicy = value;
		}

		public get pathColor():number{
			return this._pathColor;
		}
		/**
		 * 设置路径颜色，设置后下次绘制路径时生效 
		 * @param value:uint 默认值:0xff9900
		 * 
		 */
		public set pathColor(value:number){
			if(this._pathColor == value) return;
			
			this._pathColor = value;
		}

		public get pathThickness():number{
			return this._pathThickness;
		}
		/**
		 * 设置路径线宽，设置后下次绘制路径时生效  
		 * @param value:Number 默认值:0px
		 * 
		 */
		public set pathThickness(value:number){
			if(this._pathThickness == value) return;
			
			this._pathThickness = value;
		}
		/**
		 * 节点尺寸(px) 
		 * @return 
		 * 
		 */
		public get isoSize():number{
			return this._isoSize;
		}
		/**
		 * 渲染区域矩形高度 
		 * @return 
		 * 
		 */
		public get renderOffsetHeight():number{
			return this._renderOffsetHeight;
		}
		/**
		 * 渲染区域矩形宽度 
		 * @return 
		 * 
		 */
		public get renderOffsetWidth():number{
			return this._renderOffsetWidth;
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

		public set x(value:number){
			this._setX(value);
			
			//更新全局原点和中心点
			this.localToGlobal(0,0,this._oPoint);
			this.localToGlobal(this._viewWidth / 2,this._viewHeight / 2,this._cPoint);
		}
		
		public set y(value:number){
			this._setY(value);
			
			//更新全局原点和中心点
			this.localToGlobal(0,0,this._oPoint);
			this.localToGlobal(this._viewWidth / 2,this._viewHeight / 2,this._cPoint);
		}
		
		//
		/**
		 * 视口高度 
		 * @return 
		 * 
		 */		
		public get viewHeight():number{
			return this._viewHeight;
		}
		/**
		 * 视口宽度 
		 * @return 
		 * 
		 */		
		public get viewWidth():number{
			return this._viewWidth;
		}
		/**
		 * 节点总行数 
		 * @return 
		 * @see IsoUtil.drawTiles();
		 */		
		public get totalRows():number{
			var rows:number = Math.ceil(this._mapHeight / this._isoSize);
			if(this._mapHeight % this._isoSize == 0)
				rows ++;
			
			return rows * 2;
		}
		/**
		 * 节点总列数 
		 * @return 
		 * @see IsoUtil.drawTiles();
		 */		
		public get totalColumns():number{
			var columns:number = Math.ceil(this._mapWidth /  this._isoSize2);
			if(this._mapWidth % (this._isoSize2) == 0)
				columns ++;
			
			return columns;
		}
		/**
		 * 视口矩形 
		 * @return 
		 * 
		 */		
		public get viewRect():Rectangle{
			var mPoint:Point = this.originalPoint;
			
			this._viewRect.x = mPoint.x;
			this._viewRect.y = mPoint.y;
			
			return this._viewRect;
		}
		/**
		 * 渲染区域矩形，地图移动时根据需要更新位置 ，视口始终处于此矩形中
		 * @return 
		 * 
		 */		
		public get renderRect():Rectangle{
			if(this.getUpdateData(this._renderParams)){
				var mPoint:Point = this.originalPoint;
				
				var x:number = mPoint.x - this._renderOffsetWidth;
				var maxX:number = this._renderMX;
				if(maxX < 0)
					maxX = 0;
				x = this.limitValue(x,0,this._renderMX);
				
				var y:number = mPoint.y - this._renderOffsetHeight;
				var maxY:number = this._renderMY;
				if(maxY < 0)
					maxY = 0;
				y = this.limitValue(y,0,maxY);
				
				this._renderRect.x = x;
				this._renderRect.y = y;
				
				this.setUpdateData("renderRect",false);
			}
			
			return this._renderRect;
		}
		//
		/**
		 * 当前地图视口原点的坐标，此对象为缓存对象，属性只能引用，不能改变否则会导致混乱
		 * @return 
		 * 
		 */		
		public get originalPoint():Point{
			this._mapContainer.globalToLocal(this._oPoint.x,this._oPoint.y,this._oPoint2);
			
			return this._oPoint2;
		}
		//
		/**
		 * 当前地图视口的中心点的坐标，此对象为缓存对象，属性只能引用，不能改变否则会导致混乱
		 * @return 
		 * 
		 */		
		public get centerPoint():Point{
			this._mapContainer.globalToLocal(this._cPoint.x,this._cPoint.y,this._cPoint2);
			
			return this._cPoint2;
		}
		//
		public destroy():void{
			if(this._isDestroy) return;
			
			//2维数组
			if(this._mapTiles)
			for(var i:number = 0; i < this._mapTiles.length; i++){
				DisplayObjectUtil.destroyTargets.apply(null,this._mapTiles[i]);
			}
			
			super.destroy();
		}
		//
		/**
		 * 设置地图数据， 其它参数应为isoSize的整数倍，参数为0时忽略设置
		 * @param mapWidth:Number = 1000 地图宽度
		 * @param mapHeight:Number = 1000 地图高度
		 * @param isoSize:Number = 20 节点尺寸(px)
		 * @param viewWidth:Number = 200 视口宽度
		 * @param viewHeight:Number = 160 视口高度
		 * @param renderOffsetWidth:Number = 0 视口宽度向两边扩展的偏移量，使渲染区域大于或等于视口区域，渲染区域宽度为:viewWidth + renderOffsetWidth x 2
		 * @param renderOffsetHeight:Number = 0 视口高度向两边扩展的偏移量，使渲染区域大于或等于视口区域，渲染区域高度为:viewHeight + renderOffsetHeight x 2
		 * 
		 */
		public setProperties(mapWidth:number = 0,mapHeight:number = 0,isoSize:number = 0,viewWidth:number = 0,viewHeight:number = 0,renderOffsetWidth:number = 0,renderOffsetHeight:number = 0):void{
			var attrs:Array<any> = ["_mapWidth","_mapHeight","_isoSize","_viewWidth","_viewHeight","_renderOffsetWidth","_renderOffsetHeight"];
			var flags:Array<any> = [];
			
			//变量赋值
			for(var p in arguments){
				if(arguments[p] > 0){
					this[attrs[p]] = arguments[p];
					flags[p] = true;
				}
			}
			
			//渲染区域大于或等于视口区域
			this._renderOffsetWidth = Math.max(0,this._renderOffsetWidth);
			this._renderOffsetHeight = Math.max(0,this._renderOffsetHeight);
			
			this._renderRect.width = this._viewWidth + this._renderOffsetWidth * 2;
			this._renderRect.height = this._viewHeight + this._renderOffsetHeight * 2;
			
			this._viewRect.width = this._viewWidth;
			this._viewRect.height = this._viewHeight;
			
			this._renderMX = this._mapWidth - this._renderRect.width;
			this._renderMY = this._mapHeight - this._renderRect.height;
			
			this.setUpdateData("renderRect");
			this.drawRenderRect();
			//测试专用
//			DisplayObjectUtil.drawRectBorder(_mapContainer,_mapWidth,_mapHeight);
			
			this.showMapTile(this._isShowTile);
			
			this.showViewport(this._isShowView);
			this.localToGlobal(this._viewWidth / 2,this._viewHeight / 2,this._cPoint);
			
			this._halfSize = this._isoSize / 2;
			this._isoSize2 = this._isoSize * 2;
			
			if(this.hasEventListener(IsoMapEvent.ISO_MAP_PROPERTY_CHANGED))
				this.dispatchEvent(new IsoMapEvent(IsoMapEvent.ISO_MAP_PROPERTY_CHANGED,false,false));
		}
		//
		/**
		 * 显示隐藏视口框 ，用于观察调试
		 * @param visible:Boolean = true
		 * 
		 */		
		public showViewport(visible:boolean = true):void{
			this._isShowView = visible;
			
			if(visible){
				if(!this._viewShape){
					this._viewShape = new Shape();
					this.addChild(this._viewShape);
				}
				this._viewShape.visible = true;
				
				if(this.numChildren > 0)
					this.setChildIndex(this._viewShape,this.numChildren - 1);
				
				this.drawView();
			}else if(this._viewShape){
				this._viewShape.visible = false;
			}
		}
		//
		/**
		 * 显示隐藏渲染区域矩形，用于观察调试 
		 * @param visible:Boolean = true
		 * 
		 */		
		public showRenderRect(visible:boolean = true):void{
			this._isShowRender = visible;
			
			if(visible){
				if(!this._renderShape){
					this._renderShape = new Shape();
					this._mapContainer.addChild(this._renderShape);
				}
				
				this._renderShape.visible = true;
				this.setMapLayer();
				this.drawRenderRect();
				
			}else if(this._renderShape){
				this._renderShape.visible = false;
			}
		}
		//
		/**
		 * 显示隐藏节点，用于观察调试
		 * @param visible:Boolean = true
		 * 
		 */		
		public showMapTile(visible:boolean = true):void{
			this._isShowTile = visible;
			
			//销毁之前的节点
			if(this._mapTileContainer.numChildren > 0)
				DisplayObjectUtil.destroyChildren(this._mapTileContainer);
			
			if(visible){
				this._mapTileContainer.graphics.clear();
				this._mapTiles = IsoUtil.drawTiles(this._mapTileContainer,this._mapWidth,this._mapHeight,this._isoSize,0x666666);
			}else{
				this.drawMapRect();
			}
		}
		//
		/**
		 * 显示隐藏路径 
		 * @param visible:Boolean = true
		 * 
		 */		
		public showPath(visible:boolean = true):void{
			this._isShowPath = visible;
			
			if(this._isShowPath){
				if(!this._pathShape){
					this._pathShape = new Shape();
					this._mapContainer.addChild(this._pathShape);
				}
				this.setMapLayer();
				
				this._pathShape.visible = true;
			}else if(this._pathShape){
				this._pathShape.graphics.clear();
				this._pathShape.visible = false;
			}
		}
		//
		/**
		 * 绘制或清除路径
		 * @param nodes:Vector.<IsoNode> 为null时清除路径
		 * 
		 */		
		public drawPath(nodes:Array<IsoNode>):void{
			this._pathShape.graphics.clear();
			
			if(!this._isShowPath) return;
			
			var length:number = 0;
			var node:IsoNode = null;
			var nextNode:IsoNode = null;
			var point:Point = null;
			
			if(nodes)
				length = nodes.length - 1;
			else
				return;
			
			this._pathShape.graphics.lineStyle(this._pathThickness,this._pathColor,1,true,"none");
			
			for(var i:number = 0; i < length; i++){
				node = nodes[i];
				nextNode = nodes[i + 1];
				if(!node || !nextNode) break;
				
				point = this.getIsoPoint(node.row,node.column);
				
				this._pathShape.graphics.moveTo(point.x,point.y);
				
				point = this.getIsoPoint(nextNode.row,nextNode.column);
				
				this._pathShape.graphics.lineTo(point.x,point.y);
			}
		}
		//
		/**
		 * 获取等角投影矩形的中心点 
		 * @param row:Number 行索引
		 * @param column:Number 列索引
		 * @return 
		 * 
		 */		
		public getIsoPoint(row:number,column:number):Point{
			var y:number = row * this._halfSize;
			var x:number = column * this._isoSize2;
			//奇数行，节点坐标向前一个单位
			if(row % 2 == 1)
				x += this._isoSize;
			
			return new Point(x,y);
		}
		//
		/**
		 * 设置节点颜色 
		 * @param row:Number 行索引
		 * @param column:Number 列索引
		 * @param color:uint 颜色
		 * @param info:String = null 显示的信息
		 * 
		 */		
		public setTileColor(row:number,column:number,color:number,info:string = null):void{
			//行列可能超出范围，仅内部使用不作判断限制
			if(this._mapTiles && this._mapTiles[row])
				var tile:IsoTile = this._mapTiles[row][column];
			if(!tile) return;
			
			tile.color = color;
			
			if(info){
				var infoText:TextField = <TextField><any> (tile.getChildByName("infoText"));
				if(!infoText){
					infoText = new TextField();
					//infoText.autoSize = "left";
//					infoText.border = true;
//					infoText.defaultTextFormat = new TextFormat(null,10);
					infoText.size = 10;
					infoText.name = "infoText";
					tile.addChild(infoText);
				}
				infoText.text = info;
				infoText.x = -infoText.width / 2;
				infoText.y = -infoText.height / 2;
			}else{
				infoText = <TextField><any> (tile.getChildByName("infoText"));
				if(infoText && infoText.parent)
					infoText.parent.removeChild(infoText);
			}
		}
		//
		/**
		 * 设置方块标记 
		 * @param row:Number
		 * @param column:Number
		 * 
		 */		
		public showTileText(row:number,column:number):void{
			if(this._mapTiles && this._mapTiles[row])
				var tile:IsoTile = this._mapTiles[row][column];
			if(!tile) return;
			
			var textField:TextField = <TextField><any> (tile.getChildByName("textField"));
			if(!textField){
				textField = new TextField();
				//textField.defaultTextFormat = new TextFormat(null,10,0xffffff);
				tile.addChild(textField);
			}
			//textField.autoSize = "left";
			textField.text = row + "-" + column;
			textField.x = (- textField.width) / 2;
			textField.y = (- textField.height) / 2;
		}
		//
		/**
		 * 检测方块是否在矩形中，不在则从显示列表移除 
		 * @param rect:Rectangle
		 * 
		 */		
		public checkTiles(rect:Rectangle):void{
			if(!this._isShowTile) return;
			
			var row:number = this._mapTiles.length;
			var column:number = this._mapTiles[0].length;
			
			for(var i:number = 0; i < row; i++){
				for(var j:number = 0; j < column; j++){
					var tile:IsoTile = this._mapTiles[i][j];
					
					if(rect.containsPoint(tile.point)){
						if(tile.parent != this._mapTileContainer){
							this._mapTileContainer.addChild(tile);
						}
					}else if(tile.parent){
						tile.parent.removeChild(tile);
					}
				}
			}
		}
		//
		/**
		 * 绘制视口矩形 
		 * 
		 */		
		private drawView():void{
			if(!this._isShowView) return;
			
			DisplayObjectUtil.drawRectBorder(this._viewShape,this._viewWidth,this._viewHeight,0x00ff00,1,2);
			this._viewShape.graphics.moveTo(0,0);
			this._viewShape.graphics.lineTo(this._viewWidth,this._viewHeight);
			this._viewShape.graphics.moveTo(0,this._viewHeight);
			this._viewShape.graphics.lineTo(this._viewWidth,0);
		}
		/**
		 * 设置更新属性类型数据 
		 * @param property:String 需要更新的属性
		 * @param updated:Boolean 标记是否需要更新
		 * 
		 */		
		public setUpdateData(property:string,updated:boolean = true):void{
			this._updateData[property] = updated;
		}
		//
		/**
		 * 获取更新数据，多个属性时用||运算，只要有一个属性为true则返回true
		 * @param args 需要更新的属性列表
		 * @return 
		 * 
		 */		
		public getUpdateData(attrs:Array<any>):boolean{
			var result:boolean = false;
			if(this._updateData){
				var length:number = attrs.length;
				for(var i:number = 0;i < length;i++){
					var v:string = attrs[i];
					result = result || this._updateData[v];

					if(result)
						break;
				}
			}

			return result;
		}
		//
		/**
		 * 添加至舞台 
		 * @param e
		 * 
		 */		
		public thisAddedToStage(e:Event):void{
			this.removeEventListener(Event.ADDED_TO_STAGE,this.thisAddedToStage,this);
			
			this._stage = this.stage;
			
			//更新全局原点和中心点
			this.localToGlobal(0,0,this._oPoint);
			this.localToGlobal(this._viewWidth / 2,this._viewHeight / 2,this._cPoint);
			
			this.addListeners();
		}
		//
		/**
		 * 添加内部事件 
		 * 
		 */		
		public addListeners():void{
			
		}
		/**
		 * 初始化地图 
		 * 
		 */		
		public initMap():void{
			
		}
		//
		/**
		 * 选中节点 
		 * @param row:Number 行索引
		 * @param column:Number 列索引
		 * 
		 */		
		public selectedTile(row:number,column:number):void{
			//行列可能超出范围，仅内部使用不作判断限制
			if(this._mapTiles)
				var tile:IsoTile = this._mapTiles[row][column];
			if(!tile) return;
			
			tile.color = 0xffff00;
			
			if(this._lastTileMap && this._lastTileMap != tile)
				this._lastTileMap.color = 0x666666;
			this._lastTileMap = tile;
		}
		//
		/**
		 * 绘制渲染区域矩形 
		 * 
		 */		
		public drawRenderRect():void{
			if(!this._isShowRender) return;
			
			var rect:Rectangle = this.renderRect;
			
			this._renderShape.graphics.clear();
			this._renderShape.graphics.beginFill(0xff0000,0.3);
			this._renderShape.graphics.lineStyle(3,0xff0000,1);
			this._renderShape.graphics.drawRect(rect.x,rect.y,rect.width,rect.height);
			this._renderShape.graphics.endFill();
		}
		//
		/**
		 * 绘制地图交互区域矩形 
		 * 
		 */		
		public drawMapRect():void{
			this._mapTileContainer.graphics.clear();
			
			//与节点的显示互斥
			if(this._isShowTile) return;
			if(!this._isDrawInteractive) return;
			
			var rect:Rectangle = this.renderRect;
			this._mapTileContainer.graphics.beginFill(0x666666,this._renderRectAlpha);
			this._mapTileContainer.graphics.drawRect(rect.x,rect.y,rect.width,rect.height);
			this._mapTileContainer.graphics.endFill();
		}
		//
		/**
		 * 限制最小值和最大值 
		 * @param value:Number
		 * @param min:Number
		 * @param max:Number
		 * @return 
		 * 
		 */		
		public limitValue(value:number,min:number,max:number):number{
			if(value < min)
				value = min;
			if(value > max)
				value = max;
			
			return value;
		}
		//
		/**
		 * 设置各层位置 
		 * 
		 */		
		private setMapLayer():void{
			var array:Array<any> = [this._sceneContainer,this._renderShape,this._pathShape];
			var target:DisplayObject = null;
			
			for(var i:number = 0; i < array.length; i++){
				target = array[i];
				while(!target || target.parent != this._mapContainer){
					array.splice(i,1);
					
					target = array[i];
					
					if(array.length == 0)
						break;
				}
				
				if(target && target.parent == this._mapContainer){
					this._mapContainer.setChildIndex(target,i);
				}
			}
		}
		////////////////////以下为场景层容器，预留功能
		/**
		 * 获取场景中的层级容器，容器层级会自动调整到层级所在位置 
		 * @param layerType:Number 层级
		 * @see SceneLayerType
		 * @return 
		 * 
		 */		
		public getLayerContainer(layerType:number):DisplayObjectContainer{
			if(!this.layerConfigs){
				LogManager.error(this,"层级配置属性layerConfigs未设置.");
				return null;
			}
			
			var container:DisplayObjectContainer = null;
			container = this._layerHashMap.get(layerType);
			
			if(!container){
				var layerConfig:any = this.layerConfigs[layerType];
				
				container = new DisplayObjectContainer();
				container.name = "sceneContainerLayer" + layerType;
				container.touchEnabled= layerConfig.touchEnabled;
				container.touchChildren = layerConfig.touchChildren;
				this._sceneContainer.addChild(container);
				
				this._layerHashMap.put(layerType,container);
				
				var keys:Array<any> = this._layerHashMap.keys();
				keys.sort(ArrayUtil.numeric);
				
				var length:number = keys.length;
				for(var i:number = 0; i < length; i++){
					this._sceneContainer.setChildIndex(this._layerHashMap.get(keys[i]),i);
				}
			}
			
			return container;
		}
		//
		/**
		 * 设置显示对象在场景上的层级并添加到显示列表中，
		 * @param target:DisplayObject 显示对象
		 * @param layerType:Number 层级 @see SceneLayerType
		 * @param x:Number = int.MAX_VALUE 不为int.MAX_VALUE时设置
		 * @param y:Number = int.MAX_VALUE 不为int.MAX_VALUE时设置
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
		//
		/**
		 * 从场景上移除显示对象 
		 * @param target:DisplayObject 已呈现在地图上的显示对象
		 * @see #show()
		 */		
		public hide(target:DisplayObject):void{
			if(!target) return;
			
			if(target.parent)
				target.parent.removeChild(target);
		}
	}
}