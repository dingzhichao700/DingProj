
module egret {
	export class IsoMapDriver extends IsoMapRender{
		/**
		 * 地图镜头移动类型，默认值:MapMoveType.FACTOR
		 * @see MapMoveType
		 */		
		public moveType:string = MapMoveType.FACTOR;
		/**
		 * 地图停止移动或调用stopMove()后的回调函数  function():void{}
		 */		
		public stopMoveHandler:Function = null;
		/**
		 * 等角投影地图渲染区域矩形位置改变 function(isoMap:IsoMapDriver):void{}
		 * @type {null}
		 */
		private _renderChangeItem:ScriptItem;
		//地图移动速度 
		public _speed:number = 0;
		public _moveFactor:number = 0.2;
		//x,y移动速度
		private _speedX:number = 0;
		private _speedY:number = 0;
		//单次移动地图的最终x,y
		public _targetX:number = 0;
		public _targetY:number = 0;
		
		//是否已添加引擎
		public _isAdded:boolean = false;
		public _isAddedMove:boolean = false;
		//记录移动时的时间点
		private _timeDelay:number = 0;
		//当前目标点地图坐标
		public _currentMapX:number = 0;
		public _currentMapY:number = 0;
		//是否为地图主动移动
		public _isMapMoved:boolean = false;
//		protected var _lastX:Number = 0;
//		protected var _lastY:Number = 0;
		//地图最小坐标
		private _minMapX:number = 0;
		private _minMapY:number = 0;
		//当渲染区域与视口的距离小于此值时即更新此渲染区域位置
		private _renderDisX:number = 0;
		private _renderDisY:number = 0;
		//未渲染的区域宽高
		private _unRenderW:number = 0;
		private _unRenderH:number = 0;
		
		//以下为内存优化
		//IsoMapDriver.getIsoNode()方法专用缓存Point
		public _isoNodePoint:Point = null;
		//getIsoNode()专用缓存对象
		private _nodeLines:Array<any> = null;
		private _nodeColumns:Array<any> = null;
		//getNeerNode()专用缓存对象
		public _nodePoint:Point = null;
		//getNeerNode()专用缓存对象
		public _neerPoint:Point = null;
		//getNeerNode()专用缓存对象
		public _neerNode:IsoNode = null;
		//getNeerNode()专用缓存对象
		public _neerPoint3D:Point3D = null;
		//getNeerNode()专用缓存对象
		public _targetPoint3D:Point3D = null;
		//centerNode()专用缓存对象
		public _centerNode:IsoNode = null;
		
		/**
		 * 构造函数 其它参数应为isoSize的整数倍
		 * @param mapWidth:Number = 1000 地图宽度
		 * @param mapHeight:Number = 1000 地图高度
		 * @param isoSize:Number = 20 节点尺寸(px)
		 * @param viewWidth:Number = 200 视口宽度
		 * @param viewHeight:Number = 160 视口高度
		 * @param renderOffsetWidth:Number = 0 视口宽度向两边扩展的偏移量，使渲染区域大于或等于视口区域，渲染区域宽度为:viewWidth + renderOffsetWidth x 2
		 * @param renderOffsetHeight:Number = 0 视口高度向两边扩展的偏移量，使渲染区域大于或等于视口区域，渲染区域高度为:viewHeight + renderOffsetHeight x 2
		 */		
		public constructor(mapWidth:number=1000, mapHeight:number=1000, isoSize:number=20, viewWidth:number=200, viewHeight:number=160, renderOffsetWidth:number=0, renderOffsetHeight:number=0){
			super(mapWidth, mapHeight, isoSize, viewWidth, viewHeight, renderOffsetWidth, renderOffsetHeight);

			this._nodeLines = [];
			this._nodeColumns = [];

			this._nodePoint = new Point();
			this._neerPoint = new Point();
			this._isoNodePoint = new Point();

			this._neerNode = new IsoNode();
			this._neerNode.init();
			this._centerNode = new IsoNode();
			this._centerNode.init();

			this._neerPoint3D = new Point3D();
			this._targetPoint3D = new Point3D();

			this.speed = 2;
		}

		public get moveFactor():number{
			return this._moveFactor;
		}
		
		/**
		 * moveType == MapMoveType.FACTOR 时地图镜头移动系数，0-1之间，值越大移动越快
		 * @param value:Number
		 * 
		 */
		public set moveFactor(value:number){
			if(this._moveFactor == value) return;
			
			this._moveFactor = Math.max(0,value);
			this._moveFactor = Math.min(1,this._moveFactor);
		}

		/**当前目标点地图坐标y*/
		public get currentMapY():number{
			return this._currentMapY;
		}
		
		/**当前目标点地图坐标x*/
		public get currentMapX():number{
			return this._currentMapX;
		}

		public get speed():number{
			return this._speed;
		}
		
		/**
		 * 地图移动速度，与角色移动速度不同，此字段为控制地图单独平滑移动至某一坐标的速度
		 * @param value:Number 默认值:2px，也是最小值
		 */
		public set speed(value:number){
			if(this._speed == value) 
    			return;
			this._speed = value;
			this._speed = Math.max(2,this._speed);
		}

		/**当前地图视口的中心点所在的节点*/		
		public get centerNode():IsoNode{
			var mPoint:Point = this.centerPoint;
			this._centerNode.copyBy(this.getIsoNode(mPoint.x,mPoint.y));
			return this._centerNode;
		}

		/**地图鼠标x坐标*/		
		public get mapMouseX():number{
			return this._mapTileContainer.anchorX;
		}

		/**地图鼠标y坐标*/		
		public get mapMouseY():number{
			return this._mapTileContainer.anchorY;
		}
		
		public setProperties(mapWidth:number=0, mapHeight:number=0, isoSize:number=0, viewWidth:number=0, viewHeight:number=0, renderOffsetWidth:number=0, renderOffsetHeight:number=0):void{
			super.setProperties(mapWidth, mapHeight, isoSize, viewWidth, viewHeight, renderOffsetWidth, renderOffsetHeight);
			
			this._minMapX = this._viewWidth - this._mapWidth;
			this._minMapY = this._viewHeight - this._mapHeight;
			
			this._renderDisX = this._isoSize * 4;
			this._renderDisY = this._isoSize * 4;
			
			this._unRenderW = this._mapWidth - this._viewWidth - this._renderDisX;
			this._unRenderH = this._mapHeight - this._viewHeight - this._renderDisY;
			
			if(this._currentMapX > 0 && this._currentMapY > 0)
			this.gotoXY(this._currentMapX,this._currentMapY);
			
			//if(this.hasEventListener(IsoMapEvent.ISO_MAP_RENDER_CHANGED))
			//	this.dispatchEvent(new IsoMapEvent(IsoMapEvent.ISO_MAP_RENDER_CHANGED,false,false));
			if(this._renderChangeItem)
				this._renderChangeItem.apply();
		}
		
		public destroy():void{
			if(this._isDestroy) return;
			
			this._mapContainer.removeEventListener(Event.ENTER_FRAME,this.mapContainerEnterFrame,this);
			this._mapTileContainer.removeEventListener(TouchEvent.TOUCH_BEGIN,this.tileContainerMouseDown,this);
			this._mapTileContainer.removeEventListener(TouchEvent.TOUCH_END,this.tileContainerMouseUp,this);
			
			super.destroy();
		}

		/**
		 * 外部更新当前目标点地图坐标xy 
		 * @param x:int
		 * @param y:int
		 */		
		public setCurrentMapXY(x:number,y:number = 0):void{
			this._currentMapX = x;
			this._currentMapY = y;
		}

		/**
		 * 获取目标点的节点数据， 适用于只访问节点数据的场合，不适合用于改变节点数据场合
		 * @param x:Number x坐标
		 * @param y:Number y坐标
		 */		
		public getIsoNode(x:number,y:number):IsoNode{
			var line:number = Math.round(y / this._halfSize);
			var column:number = Math.round(x / this._isoSize);
			
			this._nodeLines[0] = line - 1;
			this._nodeLines[1] = line;
			this._nodeLines[2] = line + 1;
			//虚拟出3列，与地图节点数组中的行列不同，地图节点数组中两个节点为一列，此处一个节点占一列
			this._nodeColumns[0] = column - 1;
			this._nodeColumns[1] = column;
			this._nodeColumns[2] = column + 1;
			
			this._isoNodePoint.x = x;
			this._isoNodePoint.y = y;
			
			//计算3D空间中最靠近坐标的节点
			return this.getNeerNode(this._isoNodePoint,this._nodeLines,this._nodeColumns);
		}

		/**
		 * 地图跳至目标坐标位置，如果坐标不是节点的坐标，将自动计算并跳至最近的节点
		 * @param x:Number x坐标
		 * @param y:Number y坐标
		 */		
		public gotoXY(x:number,y:number):void{
			var node:IsoNode = this.getIsoNode(x,y);
			var point:Point = node.point2D;
			
			this._currentMapX = point.x;
			this._currentMapY = point.y;
			
			var mPoint:Point = this.centerPoint;
			var tx:number = this._mapContainer.x - (this._currentMapX - mPoint.x);
			var ty:number = this._mapContainer.y - (this._currentMapY - mPoint.y);
			
			this.setMapContainerXY(tx,ty);
			this.checkRenderRect(true);
		}

		/**
		 * 地图跳至目标坐标位置，忽略节点数据
		 * @param x:Number x坐标
		 * @param y:Number y坐标
		 */
		public gotoXY2(x:number,y:number):void{
			this._currentMapX = x;
			this._currentMapY = y;

			var mPoint:Point = this.centerPoint;
			var tx:number = this._mapContainer.x - (this._currentMapX - mPoint.x);
			var ty:number = this._mapContainer.y - (this._currentMapY - mPoint.y);

			this.setMapContainerXY(tx,ty);
			this.checkRenderRect(true);
		}

		/**
		 * 地图中心移动至目标位置，此方法为控制地图单独平滑移动至某一坐标的速度，与角色无关
		 * @param x:Number x坐标
		 * @param y:Number y坐标
		 */		
		public moveTo(x:number,y:number):void{
			this._isMapMoved = true;
			
			this.calcDistance(x,y);
			if(!this.checkDistance())
				this.addMoveEngine(true);
		}

		/**
		 * 获取目标位置的距离数据 
		 * @param x:Number
		 * @param y:Number
		 */		
		public getPointDistance(x:number,y:number):Point{
			var data:Point = new Point();
			
			data.x = Math.floor(this.limitValue(x,this._minMapX,0));
			data.y = Math.floor(this.limitValue(y,this._minMapY,0));
			
			return data;
		}

		/**
		 * 停止地图自身的移动
		 * @see moveTo() 
		 * 
		 */		
		public stopMove():void{
			this.addMoveEngine(false);
			this._isMapMoved = false;
			
			this.checkRenderRect();
			
			if(this.stopMoveHandler != null)
				this.stopMoveHandler();
		}

		/**
		 * 设置角色在地图上的坐标，自动校正边界坐标
		 * @param x:Number
		 * @param y:Number
		 */		
		public setMapXY(x:number,y:number):void{
			this.setMapContainerXY(x,y);
			this.checkRenderRect();
		}

		public addListeners():void{
			this._mapTileContainer.addEventListener(TouchEvent.TOUCH_BEGIN,this.tileContainerMouseDown,this);
		}

		/**鼠标按下地图 */		
		public tileContainerMouseDown(e:TouchEvent):void{
			this.addEngine(true);
			
			this._stage.addEventListener(TouchEvent.TOUCH_END,this.tileContainerMouseUp,this);
			
			TimeRecordManager.getInstance().resetRelativeTime("checkStartMove");
		}

		/**鼠标弹起*/		
		public tileContainerMouseUp(e:TouchEvent):void{
			this._stage.removeEventListener(TouchEvent.TOUCH_END,this.tileContainerMouseUp,this);
			
			this.addEngine(false);
		}
		
		/**初始化地图，如当前点数据等*/		
		public initMap():void{
			
		}

		/**
		 * 计算3D空间中以一个节点为中心的5个节点与目标点的最近节点，优点在于独立性强，不依赖地图节点数据，
		 * 缺点在于 此方法频繁使用时需要分配很多内存，IsoMap 覆盖优化此方法,
		 * 适用于只访问节点数据的场合，不适合用于改变节点数据场合
		 * @param target:Point 2D目标点
		 * @param lines:Array 连续的3行
		 * @param columns:Array 连续的3列
		 */		
		public getNeerNode(target:Point,lines:Array<any>,columns:Array<any>):IsoNode{
			var distance:number = Number.POSITIVE_INFINITY;
			var temp:number = 0;
			var lineValue:number = 0;
			var columnValue:number = 0;
			
			var length:number = lines.length;
			var subLength:number = columns.length;
			
			var line:number = 0;
			var column:number = 0;
			var tempX:number = NaN;
			var tempY:number = NaN;
			var tempZ:number = NaN;
			var x:number = NaN;
			var y:number = NaN;
			
			//计算3D坐标点
			//@see IsoUtil.getPoint3D()
			x = target.x / 2;
			y = target.y;
			this._targetPoint3D.x = y + x;
//			_targetPoint3D.y = 0;
			this._targetPoint3D.z = y - x;
			
			for(var i:number = 0; i < length; i++){
				line = lines[i];
				
				if(line < 0) continue;
				
				for(var j:number = 0; j < subLength; j++){
					column = columns[j];
					
					if(column < 0) continue;
					
					lineValue = line % 2;
					columnValue = column % 2;
					
					//奇数行的列一定为奇数，偶数行的列一定为偶数
					if((lineValue == 0 && columnValue == 0) ||
						(lineValue == 1 && columnValue == 1)){
						
						this._nodePoint.x = column * this._isoSize;
						this._nodePoint.y = line * this._halfSize;
						
						//计算3D坐标点
						//@see IsoUtil.getPoint3D()
						x = this._nodePoint.x / 2;
						y = this._nodePoint.y;
						this._neerPoint3D.x = y + x;
//						_neerPoint3D.y = 0;
						this._neerPoint3D.z = y - x;
						
						temp = DimensionUtil.distance3D(this._targetPoint3D,this._neerPoint3D);
						if(temp < distance){
							distance = temp;
							
							tempX = this._neerPoint3D.x;
//							tempY = _neerPoint3D.y;
							tempZ = this._neerPoint3D.z;
							this._neerPoint.x = this._nodePoint.x;
							this._neerPoint.y = this._nodePoint.y;
						}
					}
				}
			}
			
			this._neerPoint3D.x = tempX;
			//						_neerPoint3D.y = 0;
			this._neerPoint3D.z = tempZ;
			
			this._neerNode.point3D = this._neerPoint3D;
			this._neerNode.point2D = this._neerPoint;
			this._neerNode.row = Math.round(this._neerPoint.y / this._halfSize);
			//Math.floor
			this._neerNode.column = (this._neerPoint.x / this._isoSize2) | 0;
			
			return this._neerNode;
		}

		/**
		 * 获取节点数据 
		 * @param row:Number 行索引
		 * @param column:Number 列索引
		 */		
		private getIsoNodeByRow(row:number,column:number):IsoNode{
			var node:IsoNode = new IsoNode();
			node.row = row;
			node.column = column;
			node.point2D = this.getIsoPoint(row,column);
			
			return node;
		}

		/**移动地图*/		
		public moveMap():void{
			if(!this._isMapMoved) return;
			
			if(this.checkDistance()){
				this.stopMove();
				return;
			}
			
			this.updateMap();
			
			if(this.checkDistance())
				this.stopMove();
		}

		/**
		 * 计算移动距离 
		 * @param x:Number
		 * @param y:Number
		 */		
		private calcDistance(x:number,y:number):void{
			var cPoint:Point = this.centerPoint;
			
			var node:IsoNode = this.getIsoNode(x,y);
			var point:Point = new Point(node.point2D.x,node.point2D.y);
			
			point.x = this._mapContainer.x + (cPoint.x - point.x);
			point.y = this._mapContainer.y + (cPoint.y - point.y);
			
			var data:Point = this.getPointDistance(point.x,point.y);
			
			this._targetX = data.x;
			this._targetY = data.y;
			
			var x2:number = this._targetX - this._mapContainer.x;
			var y2:number = this._targetY - this._mapContainer.y;
			var radians:number = Math.atan2(y2,x2);
			
			this._speedX = Math.cos(radians) * this._speed;
			this._speedY = Math.sin(radians) * this._speed;
		}

		/**更新地图坐标*/		
		private updateMap():void{
			var mx:number = this._mapContainer.x;
			var my:number = this._mapContainer.y;
			var dx:number = this._targetX - mx;
			var dy:number = this._targetY - my;
			
			if(this.moveType == MapMoveType.CONSTANT_VELOCITY){
				var sx:number = this._speedX;
				var sy:number = this._speedY;
				
				if(Math.abs(dx) < Math.abs(this._speedX)){
					sx = dx;
				}
				if(Math.abs(dy) < Math.abs(this._speedY)){
					sy = dy;
				}
			}else if(this.moveType == MapMoveType.FACTOR){
				sx = dx * this._moveFactor;
				sy = dy * this._moveFactor;
				
				if(Math.abs(dx) < 1){
					sx = dx;
				}else{
					var ax:number = Math.abs(sx);
					if(ax > 0 && ax < 1){
						sx = sx / ax;
					}
				}
				
				if(Math.abs(dy) < 1){
					sy = dy;
				}else{
					var ay:number = Math.abs(sy);
					if(ay > 0 && ay < 1){
						sy = sy / ay;
					}
				}
			}
			
			var x:number = mx + sx;
			var y:number = my + sy;
			
			//当一个方向已到达目标坐标时，另一个方向速度小于1px则直接到达
			if(x == this._targetX && Math.abs(sy) < 1){
				y = this._targetY;
			}
			if(y == this._targetY && Math.abs(sx) < 1){
				x = this._targetX;
			}
			
			this.setMapXY(x,y);
		}

		/**
		 * 设置地图坐标 
		 * @param x
		 * @param y
		 * 
		 */		
		public setMapContainerXY(x:number,y:number):void{
			//测试用
//			_lastX = _mapContainer.x;
//			_lastY = _mapContainer.y;
			
			x = this.limitValue(x,this._minMapX,0);
			//坐标向下取整数，减少屏幕抖动
			x |= 0;
			this._mapContainer.x = x;
			
			y = this.limitValue(y,this._minMapY,0);
			y |= 0;
			this._mapContainer.y = y;
			
//			var time:Number = getTimer();
//			trace("last time:",_timeDelay - time);
//			_timeDelay = time;
//			trace("xy:",x,y);
//			trace("offset xy:",x - _lastX,y - _lastY);
//			trace();
		}

		/**检测渲染区域位置是否改变*/		
		private checkRenderRect(flag:boolean = false):void{
			if(!flag){
				var mPoint:Point = this.originalPoint;
				
				var x:number = mPoint.x;
				var y:number = mPoint.y;
				
				var rect:Rectangle = this.renderRect;
				var rx:number = rect.x;
				var ry:number = rect.y;
				var rw:number = rect.width;
				var rh:number = rect.height;
				
				//当视口超出渲染区域时，更新渲染区域
				//渲染区域x轴是否达到边界
				var xFlag:boolean = x > this._renderDisX && x < rx + this._renderDisX;
				if(!xFlag){
					//y轴
					var yFlag:boolean = y > this._renderDisY && y < ry + this._renderDisY;
					if(!yFlag){
						//宽度
						var wFlag:boolean = x < this._unRenderW && x + this._viewWidth > rx + rw - this._renderDisX;
						if(!wFlag){
							//高度
							var hFlag:boolean = y < this._unRenderH && y + this._viewHeight > ry + rh - this._renderDisY;
							if(!hFlag){
								//视口达到边界，而渲染区域未达到边界时
								if((x <= this._renderDisX && rx > 0) || 
									(y <= this._renderDisY && ry > 0) || 
									(x >= this._unRenderW && rx + rw < this._mapWidth) ||
									(y >= this._unRenderH && ry + rh < this._mapHeight)){
									var snapFlag:boolean = true;
								}
							}
						}
					}
				}
			}
			
			if(flag || xFlag || yFlag || wFlag || hFlag || snapFlag){
				this.setUpdateData("renderRect");
				this.drawRenderRect();
				this.drawMapRect();
				this.checkTiles(this.renderRect);
				
				//this.dispatchEvent(new IsoMapEvent(IsoMapEvent.ISO_MAP_RENDER_CHANGED,false,false));
				//内存优化
				if(this._renderChangeItem)
					this._renderChangeItem.apply();
			}
		}

		/**
		 *  设置等角投影地图渲染区域矩形位置改变回调
		 * @param handler function(isoMap:IsoMapDriver):void{}
		 * @param target 回调函数所属对象
		 */
		public setRenderChangeHandler(handler:Function,target:Object = null):void{
			if(!this._renderChangeItem){
				this._renderChangeItem = new egret.ScriptItem();
			}

			if(handler){
				var params:Array<any> = [this];
			}else{
				target = null;
				params = null;
			}

			this._renderChangeItem.execute = handler;
			this._renderChangeItem.target = target;
			this._renderChangeItem.params = params;
		}

		/**检测可移动距离是否为0*/		
		private checkDistance():boolean{
			return this._mapContainer.x == this._targetX && this._mapContainer.y == this._targetY;
		}

		/**
		 * 添加或删除按下地图引擎 
		 * @param isAdded
		 */		
		public addEngine(isAdded:boolean):void{
			if(isAdded){
				if(!this._isAdded){
					this._isAdded = true;
					this._mapContainer.addEventListener(Event.ENTER_FRAME,this.mapContainerEnterFrame,this);
				}
			}else{
				if(this._isAdded){
					this._isAdded = false;
					this._mapContainer.removeEventListener(Event.ENTER_FRAME,this.mapContainerEnterFrame,this);
				}
			}
		}

		/**
		 * 添加或删除地图移动引擎 
		 * @param isAdded
		 * 
		 */		
		public addMoveEngine(isAdded:boolean):void{
			if(isAdded){
				if(!this._isAddedMove){
					this._isAddedMove = true;
					this.addEventListener(Event.ENTER_FRAME,this.moveEnterFrame,this);
				}
			}else{
				if(this._isAddedMove){
					this._isAddedMove = false;
					this.removeEventListener(Event.ENTER_FRAME,this.moveEnterFrame,this);
				}
			}
		}

		/**地图移动帧处理*/		
		public moveEnterFrame(e:Event):void{
			this.moveMap();
		}

		/**帧处理*/		
		public mapContainerEnterFrame(e:Event):void{
		}
		
	}
}