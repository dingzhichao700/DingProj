
module egret {

	export class IsoMap extends IsoMapDriver{
		/**
		 * 自动寻路可通过的路径类型 
		 */		
		public pathTypes:Array<any> = null;
		/**
		 * 是否支持鼠标持续按下时寻路
		 */		
		public isMulitiClick:boolean = true;
		//地图数据
		private _mapNodes:Array<Array<MapNode>> = null;
		//路径数据
		private _pathNodes:Array<MapNode> = null;
		//绘制的路径节点数据
		private _viewNodes:Array<MapNode> = null;
		//节点颜色表
		private _colorHashMap:HashMap = null;
		private _clickPoint:Point;
		
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
		public constructor(mapWidth:number=1000, mapHeight:number=1000, isoSize:number=20, renderWidth:number=200, renderHeight:number=160, renderOffsetWidth:number=0, renderOffsetHeight:number=0){
			super(mapWidth, mapHeight, isoSize, renderWidth, renderHeight, renderOffsetWidth, renderOffsetHeight);

			this._mapNodes = [];
			this._pathNodes = [];
			this._viewNodes = [];
			this.pathTypes = [];
			this._clickPoint = new egret.Point();
		}
		//

		public set pathNodes(value:Array<MapNode>){
			this._pathNodes = value;
		}
		/**
		 * 当前寻路路径 
		 * @return 
		 * 
		 */
		public get pathNodes():Array<MapNode>{
			return this._pathNodes;
		}

		/**
		 * 地图节点数据 
		 * @return 
		 * 
		 */
		public get mapNodes():Array<Array<MapNode>>{
			return this._mapNodes;
		}

		/**
		 * 设置地图数据 
		 * @param array:Array 地图节点类型2维数组
		 * 
		 */
		public setMapNodes(array:Array<any>):void{
			if(!array || !array[0]){
//				LogManager.error(this,"地图数据为空或空数组");
				return;
			}
			
			//目前节点数据对象缓存起来
//			while(_mapNodes.length > array.length)
//				_mapNodes.pop();
			
			var rows:number = array.length;
			var columns:number = array[0].length;
			var node:MapNode = null;
			var nodes:Array<MapNode> = null;
			
			var point:Point = null;
			while(this._mapNodes.length < rows){
				this._mapNodes.push(new Array<MapNode>());
			}
			
			//构建节点数据
			for(var i:number = 0; i < rows; i++){
				nodes = this._mapNodes[i];
				
				while(nodes.length < columns){
					nodes.push(new MapNode());
				}
				
				for(var j:number = 0; j < columns; j++){
					node = nodes[j];
					
					if(!node.point2D){
						point = this.getIsoPoint(i,j);
						node.row = i;
						node.column = j;
						node.point2D = point;
						node.point3D = IsoUtil.getPoint3D(node.point2D);
						node.depth = IsoUtil.getDepth(node.point3D);
					}
					
					node.type = array[i][j];
					node.size = this._isoSize;
					
					this.setTile(node);
				}
			}
			
			this.initMap();
		}
		/**
		 * 设置地图数据，直接设置地图节点数据为指定类型
		 * @param width 地图宽度
		 * @param height 地图高度
		 * @param type 路径节点类型
		 */
		public setMapNodes2(width:number,height:number,type:number):void{
			var size:number = this._isoSize;
			var half:number = size / 2;
			var size2:number = size * 2;
			var rows:number = Math.ceil(height / half);
			var columns:number = Math.ceil(width / size2);

			if(width % (size2) == 0)
				columns ++;
			if(height % half == 0)
				rows ++;

			var node:MapNode = null;
			var nodes:Array<MapNode> = null;

			var point:Point = null;
			while(this._mapNodes.length < rows){
				this._mapNodes.push(new Array<MapNode>());
			}

			//构建节点数据
			for(var i:number = 0; i < rows; i++){
				nodes = this._mapNodes[i];

				while(nodes.length < columns){
					nodes.push(new MapNode());
				}

				for(var j:number = 0; j < columns; j++){
					node = nodes[j];

					if(!node.point2D){
						point = this.getIsoPoint(i,j);
						node.row = i;
						node.column = j;
						node.point2D = point;
						node.point3D = IsoUtil.getPoint3D(node.point2D);
						node.depth = IsoUtil.getDepth(node.point3D);
					}

					node.type = type
					node.size = this._isoSize;

					this.setTile(node);
				}
			}

			this.initMap();
		}
		//
		/**
		 * 设置地图节点类型
		 * @param rows 行
		 * @param columns 列
		 * @param type 路径节点类型
		 */
		public setMapNodeType(rows:number,columns:number,type:number):void{
			if(this._mapNodes && this._mapNodes[rows]){
				var node:MapNode = this._mapNodes[rows][columns];
				node.type = type;

				this.setTile(node);
			}
		}
		//
		/**
		 * 设置节点类型颜色 ，若显示网格，则根据颜色值标记节点
		 * @param type:Number 节点类型 PathType
		 * @param color:uint 颜色值
		 * 
		 */		
		public setTileTypeColor(type:number,color:number = 0):void{
			if(!this._colorHashMap)
				this._colorHashMap = new HashMap();
			
			this._colorHashMap.put(type,color);
		}
		//
		/**
		 * 获取地图数据节点 
		 * @param row:Number 行
		 * @param column:Number 列
 		 * @return 可能为 null
		 * 
		 */		
		public getMapNode(row:number,column:number):MapNode{
			//性能优化
			if((row > -1 && row < this._mapNodes.length) && (column > -1 && column < this._mapNodes[row].length))
//			if(_mapNodes.length > 0)
				return this._mapNodes[row][column];
			
			return null;
		}
		//
		/**
		 * 计算3D空间中以一个节点为中心的5个节点与目标点的最近节点
		 * 适用于只访问节点数据的场合，不适合用于改变节点数据场合
		 * @param target:Point 2D目标点
		 * @param lines:Array 连续的3行
		 * @param columns:Array 连续的3列
		 * @return 
		 * 
		 */		
		public getNeerNode(target:Point,lines:Array<any>,columns:Array<any>):IsoNode{
			if(this._mapNodes.length == 0)
				return super.getNeerNode(target,lines,columns);
			
			var distance:number = Number.POSITIVE_INFINITY;
			var tempDistance:number = 0;
			var lineValue:number = 0;
			var columnValue:number = 0;

			var length:number = lines.length;
			var subLength:number = columns.length;
			
			var line:number = 0;
			var column:number = 0;
			var tempNode:IsoNode = null;
			var tempX:number = NaN;
			var tempY:number = NaN;
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
						
						tempDistance = DimensionUtil.distance3D(this._targetPoint3D,this._neerPoint3D);
						if(tempDistance < distance){
							distance = tempDistance;
							
							tempX = this._nodePoint.x;
							tempY = this._nodePoint.y;
						}
					}
				}
			}
			
			var tempLine:number = Math.round(tempY / this._halfSize);
			//Math.floor
			var tempColumn:number = (tempX / this._isoSize2) | 0;
			
			return this._mapNodes[tempLine][tempColumn];
		}
		//
		/**
		 * 指定行列是否能通过 
		 * @param row:Number 行
		 * @param column:Number 列
		 * @return 
		 * 
		 */		
		public canCross(row:number,column:number):boolean{
			var node:MapNode = this.getMapNode(row,column);
			
			return this.pathTypes.indexOf(node.type) != -1;
		}
		//
		/**
		 * 初始化地图，如当前点数据等
		 * 
		 */		
		public initMap():void{
			super.initMap();
		}
		//
		public destroy():void{
			if(this._isDestroy) return;
			
			super.destroy();
		}
		//
		//测试用
		private setTile(node:MapNode):void{
			if(this._colorHashMap)
				this.setTileColor(node.row,node.column,this._colorHashMap.get(node.type));
		}
		//
		public addListeners():void{
			super.addListeners();
			
			this._mapTileContainer.addEventListener(TouchEvent.TOUCH_TAP,this.mapTileContainerClick,this);
		}
		//
		/**
		 * 鼠标单击 
		 * @param e
		 * 
		 */		
		private mapTileContainerClick(e:TouchEvent = null):void{
			this._clickPoint.x = e.stageX;
			this._clickPoint.y = e.stageY;
			this.checkStartMove();
			this.dispatchEvent(new IsoMapEvent(IsoMapEvent.ISO_MAP_TILE_CLICK,false,false));
		}
		//
		/**
		 * 检测开始移动事件 
		 * @param checkNode:Boolean = false 是否略过障碍物
		 * 
		 */		
		private checkStartMove(checkNode:boolean = false):void{
			if(this._isMapMoved) return;

			this._mapTileContainer.globalToLocal(this._clickPoint.x,this._clickPoint.y,this._clickPoint);
			
			var x:number = this._clickPoint.x;//this._mapTileContainer.mouseX;
			var y:number = this._clickPoint.y;//this._mapTileContainer.mouseY;
			
			if(checkNode && this._mapNodes.length > 0){
				var node:IsoNode = this.getIsoNode(x,y);
				node = this.getMapNode(node.row,node.column);
				//障碍物时不处理
				if(!node || this.pathTypes.indexOf((<MapNode><any> node).type) == -1) return;
			}
			
			this._currentMapX = x;
			this._currentMapY = y;
			
			this.dispatchEvent(new IsoMapEvent(IsoMapEvent.ISO_MAP_MOVING_START,false,false));
		}
		//
		/**
		 * 帧处理 
		 * @param e
		 * 
		 */		
		public mapContainerEnterFrame(e:Event):void{
			super.mapContainerEnterFrame(e);
			
			if(this.isMulitiClick && !this._isMapMoved){
				var time:number = TimeRecordManager.getInstance().getRelativeTime("checkStartMove");
//				trace("time:" + time);
				if(time > 300){
					TimeRecordManager.getInstance().resetRelativeTime("checkStartMove");
					this.checkStartMove(true);
				}
			}
		}
		//
		/**
		 * 绘制当前路径 
		 * 
		 */		
		public drawCurrentPath():void{
			if(!this._isShowPath){
				this._pathShape.graphics.clear();
				return;
			}
			
			var rect:Rectangle = null;
			if(this._pathPolicy == PathPolicyType.VIEW){
				rect = this.viewRect;
			}else if(this._pathPolicy == PathPolicyType.RENDER){
				rect = this.renderRect;
			}
			var nodes:any = this.getViewNodes(0,this._pathNodes,rect);//_moveIndex
			this.drawPath(nodes);
		}
		//
		/**
		 * 获取绘制的路径点 
		 * @param startIndex:Number 开始节点索引
		 * @param nodes:Vector.<MapNode> 路径节点数组
		 * @param rect:Rectangle 矩形区域，为null时获取开始节点到结束节点之间的所有路径节点
		 * @return 
		 * 
		 */		
		private getViewNodes(startIndex:number,nodes:Array<MapNode>,rect:Rectangle):Array<MapNode>{
			this._viewNodes.length = 0;
			
			var length:number = nodes.length;
			var node:MapNode = null;
			
			for(var i:number = startIndex; i < length; i++){
				node = nodes[i];
				
				this._viewNodes.push(node);
				
				if(rect && !rect.containsPoint(node.point2D))
					break;
			}
			
			return this._viewNodes;
		}
	}
}