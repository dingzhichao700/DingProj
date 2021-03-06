
module egret {

	export class SceneElementMover extends SceneElementInteractive{
		/**
		 * 移动元素的宽度
		 * @type {number}
		 */
		public static MOVER_WIDTH:number = 100;
		/**
		 * 移动元素的高度
		 * @type {number}
		 */
		public static MOVER_HEIGHT:number = 180;

		private static CURRENT_NODE:string = "_currentNode";
		private static TARGET_NODE:string = "_targetNode";
		//经过坐标点最大数量
		private static PASSING_POINT_COUNT:number = 2;
		private static PASSING_NODE_COUNT:number = 2;
		
		/**
		 * 距离目标点超过此值时，将路径分段行走 
		 */
		public pathPartValue:number = 1000;
		/**
		 * 移动时执行的回调函数 function():void{}，内存优化，取代频繁调试事件
		 */		
		public movingHandler:Function = null;
		/**
		 * 移动结束时执行的回调函数 function(target:SceneElementMover):void{}，内存优化，取代频繁调试事件
		 */	
		public movingEndHandler:Function = null;
		/**
		 * 节点改变时回调函数 function(target:SceneElementMover = null):Boolean{} 返回值表示是否可移动至此节点
		 */		
		public nodeChangedHandler:Function = null;
		/**
		 * 调用 stopMove() 时回调函数 function(target:SceneElementMover):void{} 
		 */		
		public onStopMove:Function = null;
		/**
		 * 是否记录经过的路线，无寻路时关闭
		 * @type {boolean}
		 */
		public passingPointFlag:boolean = false;
		
		//地图移动速度 
		public _speed:number = 0;
		//单次移动地图的最终x,y
		private _targetX:number = 0;
		private _targetY:number = 0;
		//当有路径时，到达最后一个目标节点时地图的坐标
		public _finalX:number = 0;
		public _finalY:number = 0;
		
		//单次移动的目标节点
		public _targetNode:IsoNode = null;
		//有路径时的目标节点
		public _pathTargetNode:IsoNode = null;
		//当前视口中心所在的节点
		public _currentNode:IsoNode = null;
		//上次所在节点
		public _lastNode:IsoNode = null;
		//上次所在节点
		public _lastTempNode:IsoNode = null;
		//是否有移动路径，IsoMap类使用
		public _hasPath:boolean = false;
		//是否已设置目标节点
		private _hasSetTarget:boolean = false;
		//上次移动是否已结束
		public _isMovingEnd:boolean = true;
		//是否已调度开始移动事件
		public _isDispatchStart:boolean = false;
		
		//节点尺寸
		public _isoSize:number = 20; 
		//2倍节点尺寸
		public _isoSize2:number = 0;
		//半个节点尺寸
		public _halfSize:number = 0;
		//地图宽高
		public _mapWidth:number = 0;
		public _mapHeight:number = 0;
		public _isoMap:IsoMap = null;
		//跟随时的节点间隔
		public _nodeInterval:number = 2;
		//是否为跟随者
		public _isFollowed:boolean = false;
		
		/**自动寻路的路径类型*/		
		public pathTypes:Array<any> = null;
		//地图数据
		private _mapNodes:Array<Array<MapNode>> = null;
		//路径数据
		private _pathNodes:Array<MapNode> = null;
		//寻路数据缓存
		private _pathTypeMap:HashMap = null;
		//移动节点索引
		private _moveIndex:number = 0;
		//轨道移动节点索引
		private _trackIndex:number = 0;
		//经过的节点
		private _passingNodes:Array<IsoNode> = null;
		//经过的坐标点
		private _passingPoints:Array<PassingPoint> = null;
		//回收数据
		private _recoverPoints:Array<PassingPoint> = null;
		//x,y移动速度
		private _speedX:number = 0;
		private _speedY:number = 0;
		//x,y移动速度绝对值，用于缓存
		private _speedAbsX:number = 0;
		private _speedAbsY:number = 0;
		//测试用，帧时间间隔
		private _timeDelay:number = 0;
		
		//元素距离场景宽高上限值
		private _toplimitOffsetWidth:number = 0;//30;
		private _toplimitOffsetHeight:number = 0;//30;
		//元素距离场景宽高下限值
		private _floorOffsetWidth:number = 0;//100;
		private _floorOffsetHeight:number = 0;//150;
		//最大xy
		public _maxX:number = 0;
		public _maxY:number = 0;
		//目标点较远时，路径最终点
		private _finalPoint:Point = null;
		//是否正在移动中
		public _isMoving:boolean = false;
		//标记是否为主角
		public _isRole:boolean = false;
		
		//以下为内存优化
		//getPointDistance()方法专用缓存Point
		private _distancePoint:Point = null;
		//checkPathPart()方法专用缓存Point
		private _pathPartPoint:Point = null;
		//getIsoPoint()方法专用缓存Point
		private _isoPoint:Point = null;
		
		//getIsoNode()方法专用缓存Point
		private _isoNodePoint:Point = null;
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
		//centerNode()专用缓存对象adda
		public _centerNode:IsoNode = null;
		//经过点的索引
		private _passingIndex:number = 0;
		private _passingNodeIndex:number = 0;
		
		//nodeChangedHandler() 函数回调值，若为 false 则无法移动
		private _nodeChangedFlag:boolean = true;
		private _engineId:number;

		//是否为无路径移动
		private _isNoPath:boolean;
		
		/**构造函数 其它参数应为isoSize的整数倍*/		
		public constructor(){
			super();

			this._pathNodes = [];
			this._pathTypeMap = new HashMap();

			//内存优化，一开始就分配内存，避免频繁分配导出fp执行内存回收
			var length:number = SceneElementMover.PASSING_POINT_COUNT + 1;
			
			this._passingNodes = [];
			this._passingPoints = [];
			this._recoverPoints = [];
			
			for(var i:number = 0; i < length; i++){
				this._recoverPoints[i] = new PassingPoint();
			}
			
			this._isoNodePoint = new Point();
			this._distancePoint = new Point();
			this._pathPartPoint = new Point();
			this._nodePoint = new Point();
			this._neerPoint = new Point();
			this._isoPoint = new Point();
			
			this._targetPoint3D = new Point3D();
			this._neerPoint3D = new Point3D();
			
			this._nodeLines = [];
			this._nodeColumns = [];
			
			this._neerNode = new IsoNode();
			this._neerNode.init();
			
			this._targetNode = new IsoNode();
			this._targetNode.init();
			
			this._currentNode = new IsoNode();
			this._currentNode.init();
			
            this._lastNode = new IsoNode();
            this._lastNode.init();

            this._lastTempNode = new IsoNode();
            this._lastTempNode.init();

			this._centerNode = new IsoNode();
			this._centerNode.init();
		}
		
		/**目标点较远时，路径最终点 */
		public get finalPoint():Point{
			return this._finalPoint;
		}
		
		/**最终目标点地图的坐标 y*/		
		public get finalY():number{
			if(this._finalPoint)
				return this._finalPoint.x;
			return this._finalY;
		}
		
		/**最终目标点地图的坐标 x */		
		public get finalX():number{
			if(this._finalPoint)
				return this._finalPoint.y;
			
			return this._finalX;
		}
		
		public get isRole():boolean{
			return this._isRole;
		}
		
		/**
		 * 标记是否为主角 
		 * @param value
		 * 
		 */
		public set isRole(value:boolean){
			this._isRole = value;
			
			this.pathPartValue = 4600;
		}

		/**是否正在移动中*/
		public get isMoving():boolean{
			return this._isMoving;
		}
		
		/**当前路径节点数组*/
		public get pathNodes():Array<MapNode>{
			return this._pathNodes;
		}

		/**经过的坐标数据点，用于跟随*/
		public get passingPoints():Array<PassingPoint>{
			return this._passingPoints;
		}

		/**经过的路径*/
		public get passingNodes():Array<IsoNode>{
			return this._passingNodes;
		}
		
		/**获取元素深度*/		
		public get depth():number{
			var node:IsoNode = this.currentNode;
			var mapNode:MapNode = this._isoMap.getMapNode(node.row,node.column);
			
			if(mapNode)
				return mapNode.depth;

			return super.getDepth();
		}
		
		public get isFollowed():boolean{
			return this._isFollowed;
		}
		
		/**
		 * 是否为跟随者 
		 * @param value
		 * 
		 */
		public set isFollowed(value:boolean){
			this._isFollowed = value;
		}

		public get nodeInterval():number{
			return this._nodeInterval;
		}
		
		/**
		 * 跟随时的节点间隔或坐标点间隔
		 * @param value:Number 默认值:2
		 * 
		 */
		public set nodeInterval(value:number){
			this._nodeInterval = value;
		}

		public get speed():number{
			return this._speed;
		}
		
		/**
		 * 地图移动速度(移动一个单位)
		 * @param value:Number 默认值:2px，也是最小值
		 * 
		 */
		public set speed(value:number){
			if(this._speed == value) return;
			
			this._speed = value;
			this._speed = Math.max(2,this._speed);
		}

		/**
		 * 上次所在节点
		 * @returns {IsoNode}
		 */
		public get lastNode():IsoNode{
			return this._lastNode;
		}
		
		/**当前视口中心点所在的节点 */
		public get currentNode():IsoNode{
			if(this._currentNode.row == -1){
				this._currentNode.copyBy(this.centerNode);
			}
			//为null时取当前坐标点
			return this._currentNode;
		}

		/**地图是否可移动，到达边界时无法移动*/		
		public get canMove():boolean{
            if(this._x + "" == this._finalX + "" && this._y + "" == this._finalY + ""){
				return false;
			}
			return true;
		}

		/**是否已到达目标坐标点*/		
		public get isArrive():boolean{
            return this._x + "" == this._finalX + "" && this._y + "" == this._finalY + "" && this._finalPoint == null;
		}

		/**
		 * 元素的原点所在的节点 ，适用于只访问节点数据的场合，不适合用于改变节点数据场合
		 * @return 
		 * 
		 */		
		public get centerNode():IsoNode{
			this._centerNode.copyBy(this.getIsoNode(this._x,this._y));
			return this._centerNode;
		}

		/**当前的目标节点*/		
		public get targetNode():IsoNode{
			return this._targetNode;
		}
		
		public destroy():void{
			if(this._isDestroy) return;
			
			this.stopMove();
			
			super.destroy();
		}

		/**清空经过的路径和坐标点*/		
		public clearFollowPoints():void{
			for(var i:number = 0; i < SceneElementMover.PASSING_POINT_COUNT; i++){
				if(this._passingPoints[i]){
					this._recoverPoints[i] = this._passingPoints[i];
					this._passingPoints[i] = null;
				}
			}
			
			this._passingIndex = 0;
			
			var length:number = SceneElementMover.PASSING_NODE_COUNT + 1;
			for(i = 0; i < length; i++){
				this._passingNodes[i] = null;
			}
			
			this._passingNodeIndex = 0;
		}

		/**
		 * 获取目标点的节点数据，没有地图节点数据时使用，有地图节点数据时使用 IsoMap.getIsoNode()，
		 * 适用于只访问节点数据的场合，不适合用于改变节点数据场合
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
		 * 跳至目标坐标位置，如果坐标不是节点的坐标，将自动计算并跳至最近的节点
		 * @param x:Number x坐标
		 * @param y:Number y坐标
		 * 
		 */		
		public gotoXY(x:number,y:number):void{
			this.setTargetNode(this.getIsoNode(x,y));
			
			this._hasSetTarget = true;
			
			this.gotoGrid(this._targetNode.row,this._targetNode.column);
		}

		/**
		 * 跳至目标行列位置 
		 * @param row:Number 行索引
		 * @param column:Number 列索引
		 * 
		 */		
		public gotoGrid(row:number,column:number):void{
			if(!this._hasSetTarget)
				this.setTargetNode(this.getIsoNodeByRow(row,column));
			this._hasSetTarget = false;
			
			var point:Point = this.getIsoPoint(row,column);
			
			this.setXY(point.x,point.y);
			this.setCurrentNode(this.centerNode);
		}

		/**
		 * 移动至目标位置，使用寻路
		 * @param x:Number x坐标
		 * @param y:Number y坐标
		 * 
		 */		
		public moveTo(x:number,y:number,isCheckPart:boolean = true):void{
			this._isNoPath = false;

			this.setCurrentNode(this.centerNode);
			
			this.setTargetNode(this.getIsoNode(x,y));
			
			this._hasSetTarget = true;
			
			this.moveToGridPath(this._targetNode.row,this._targetNode.column,isCheckPart);
		}

		/**
		 * 移动至目标位置，不寻路，移动到节点
		 * @param x:Number x坐标
		 * @param y:Number y坐标
		 * 
		 */		
		public moveTo2(x:number,y:number):void{
			this._isNoPath = false;

			this.setCurrentNode(this.centerNode);
			
			this.setTargetNode(this.getIsoNode(x,y));
			
			this._hasSetTarget = true;
			
			this.moveToGrid(this._targetNode.row,this._targetNode.column);
		}

		/**
		 * 移动至目标位置，不寻路，忽略节点数据
		 * @param x:Number x坐标
		 * @param y:Number y坐标
		 */
		public moveTo3(x:number,y:number):void{
			this._isNoPath = true;

			this.calcDistance(x,y);
			if(!this.checkDistance()){
				this.addEngine(true);

				//播放动作
				var direction:number = ActionMovieClipData.getInstance().calculateDirection(this._x,this._y,x,y);
				this.play(-1,ActionType.WALK,direction);
			}

			this._isMovingEnd = !this.canMove;
			if(!this._isDispatchStart && !this._isMovingEnd){
				this._isDispatchStart = true;
			}
		}

		/**停止移动*/		
		public stopMove():void{
			if(!this._isMoving) return;

			this._finalPoint = null;
			
			this.stopMoveInternal();
			
			if(this.onStopMove != null)
				this.onStopMove.apply(this.scene,[this]);
		}
		
		/**
		 * 内部停止移动，有动作处理 
		 * @param changedAction:Boolean = true 是否改变动作
		 */		
		public stopMoveInternal(changedAction:boolean = true):void{
			if(!this._isMoving) return;
			//路径分段时
			if(this.checkFinalPoint())
    			return;
			
			this.addEngine(false);
			this.clearPathNodes();
			
			if(changedAction)
				this.play(-1,ActionType.PREPARE);
		}

		/**检测分段终点*/		
		private checkFinalPoint():boolean{
			//路径分段时
			if(this._finalPoint){
				this.moveTo(this._finalPoint.x,this._finalPoint.y);
				
				return true;
			}
			return false;
		}

		/**
		 * 移动至目标行列 
		 * @param row:Number 行索引
		 * @param column:Number 列索引
		 */		
		public moveToGrid(row:number,column:number):void{
			if(!this._hasSetTarget)
				this.setTargetNode(this.getIsoNodeByRow(row,column));
			this._hasSetTarget = false;
			
			var point:Point = this.getIsoPoint(row,column);
			var x:number = point.x;
			var y:number = point.y;
			
			this.calcDistance(x,y);
			if(!this.checkDistance()){
				this.addEngine(true);
				
				//播放动作
				var direction:number = ActionMovieClipData.getInstance().calculateDirection(this._x,this._y,x,y);
				this.play(-1,ActionType.WALK,direction);
			}
			
			this._isMovingEnd = !this.canMove;
			if(!this._isDispatchStart && !this._isMovingEnd){
				this._isDispatchStart = true;
			}
		}

		/**
		 * 移动至目标节点
		 * @param row:Number 行索引
		 * @param column:Number 列索引
		 */		
		public moveToNode(node:IsoNode):void{
			this.setTargetNode(node);
			this._hasSetTarget = false;
			
			var point:Point = node.point2D;
			var x:number = point.x;
			var y:number = point.y;
			
			this.calcDistance(x,y);
			if(!this.checkDistance()){
				this.addEngine(true);
				
				//播放动作
				var direction:number = ActionMovieClipData.getInstance().calculateDirection(this._x,this._y,x,y);
				this.play(-1,ActionType.WALK,direction);
			}
			
			this._isMovingEnd = !this.canMove;
			if(!this._isDispatchStart && !this._isMovingEnd){
				this._isDispatchStart = true;
//				this.dispatchEvent(new IsoMapEvent(IsoMapEvent.ISO_MAP_MOVING_START,false,false));
			}
		}

		/**
		 * 按寻路路径行走至目标行列 
		 * @param row:Number 行索引
		 * @param column:Number 列索引
		 */		
		public moveToGridPath(row:number,column:number,isCheckPart:boolean = false):void{
			var tempRow:number = this._currentNode.row;
			var tempColumn:number = this._currentNode.column;
			
			if(row == tempRow && column == tempColumn){
				this.stopMove();
				return;
			}
			
			if(!this._currentNode){
				this.setCurrentNode(this.centerNode);
			}
			
			var length:number = this._mapNodes.length - 1;
			if(row >= length)
				row = length;
			length = this._mapNodes[row].length - 1;
			if(column >= length)
				column = length;
			
			var startNode:MapNode = this._mapNodes[tempRow][tempColumn];
			var endNode:MapNode = this._mapNodes[row][column];
			
			//非当前寻路路径类型，即不可通过
			if(this.pathTypes.indexOf(endNode.type) == -1){
				var neerNode:MapNode = IsoUtil.getNeerNodeByType2(endNode,startNode,this._mapNodes,this.pathTypes);
			}
			if(neerNode)
				endNode = neerNode;
			
			//路径分段
			if(isCheckPart){
				this.checkPathPart(endNode.row,endNode.column);
				return;
			}
			
			//TimeRecordManager.getInstance().resetRelativeTime("find");
			//TimeRecordManager.getInstance().recordTime("find");
			
			//IsoUtil.findPathByNode2(this._pathNodes,startNode,endNode,this._mapNodes,this.pathTypes,false);
			//this._pathNodes = IsoUtil.findPathByNode3(startNode,endNode,this._mapNodes,this.pathTypes);
			
			//TimeRecordManager.getInstance().recordTime("find");
			//有2个节点则走
			if(this._pathNodes.length < 2){
				return;
			}
			
			//计算到达最后一个节点时地图的坐标，用于判断地图移动是否结束，节点移动可能未结束
			var point:Point = endNode.point2D;
			var data:Point = this.getPointDistance(point.x,point.y);
			
			this._finalX = data.x;
			this._finalY = data.y;
			
			if(this.hasEventListener(SceneElementEvent.SCENE_ELEMENT_PATH_CHANGED))
			this.dispatchEvent(new SceneElementEvent(SceneElementEvent.SCENE_ELEMENT_PATH_CHANGED));
			
			this.moveByPath();
		}
		
		/**
		 * 检测路径分段行走 
		 * @param row:int
		 * @param column:int
		 */		
		private checkPathPart(row:number,column:number = 0):void{
			var node:IsoNode = this.getIsoNodeByRow(row,column);
			this._pathPartPoint.x = this._x;
			this._pathPartPoint.y = this._y;
			
			//不用Point.distance()，优化内存
			if(DimensionUtil.distance(node.point2D,this._pathPartPoint) >= this.pathPartValue){
				this._finalPoint = node.point2D;
				
				var rate:number = Math.atan2(this._finalPoint.y - this._y,this._finalPoint.x - this._x);
				
				var tempX:number = Math.cos(rate) * this.pathPartValue;
				var tempY:number = Math.sin(rate) * this.pathPartValue;
				var tenX:number = tempX / 10;
				var tenY:number = tempY / 10;
				
				var x:number = tempX + this._x;
				var y:number = tempY + this._y;
				
				node = this.getIsoNode(x,y);
				
				var count:number = 0;
				
				while(!this._isoMap.canCross(node.row,node.column)){
					x += tenX;
					y += tenY;
					
					node = this._isoMap.getIsoNode(x,y);//getIsoNode(x,y);
					
					count ++;
					if(count > 100){
						LogManager.error(this,"查找分段路径递归达到最大值");
						break;
					}
				}
				
				row = node.row;
				column = node.column;
			}else{
				this._finalPoint = null;
			}
			
			this.moveToGridPath(row,column,false);
		}

		/**
		 * 跟随元素所经过的点 
		 * @param points
		 */		
		public moveByPoints(points:Array<PassingPoint>):void{
			var index:number = points.length - this._nodeInterval * 6;
			if(index >= 0){
				var point:PassingPoint = points[index];
				if(point){
					this.setXY(point.x,point.y);
					
					var direction:number = -1;
					if(!isNaN(point.tx))
						direction = ActionMovieClipData.getInstance().calculateDirection(this._x,this._y,point.tx,point.ty);
					
					this.play(-1,ActionType.WALK,direction);
				}
			}else{
				this.stopMove();
			}
		}

		/**
		 * 跟随元素所经过的路径节点 
		 * @param nodes
		 */		
		public moveByTrack(nodes:Array<IsoNode>):void{
			var index:number = nodes.length - this._nodeInterval;
			if(index >= 0){
				var node:IsoNode = nodes[index];
				this.moveToNode(node);
			}
		}

		/**
		 * 按路径移动 
		 * @param nodes
		 */		
		private moveByPath():void{
			this._moveIndex = 0;
			this._hasPath = true;
			
			this.moveToNextNode();
//			this.dispatchEvent(new IsoMapEvent(IsoMapEvent.ISO_MAP_PATH_START,false,false));
		}

		/**移动至下一个节点*/		
		private moveToNextNode():void{
            if(!this._pathNodes || this._pathNodes.length == 0) return;

			var length:number = this._pathNodes.length;
			
			this._moveIndex ++;
			this._hasPath = !(this._moveIndex >= length);
			
			if(!this._hasPath){
				var index:number = this._moveIndex - 1;
				if(index >= 0 && !this._pathNodes[index]){
					this.stopMove();
				}
				this.clearPathNodes();
				return;
			}
			
			this._pathTargetNode = this._pathNodes[this._moveIndex];
			
			this.moveToNode(this._pathTargetNode);
		}

		/**清空路径数据*/		
		private clearPathNodes():void{
			if(this._pathNodes)
				this._pathNodes.length = 0;
		}

		/**设置当前节点*/		
		public setCurrentNode(node:IsoNode):void{
			this.setNode(node,SceneElementMover.CURRENT_NODE);
		}

		/**
		 * 设置节点数据 
		 * @param node:IsoNode 节点
		 * @param target:String 节点变量，
		 */		
		public setNode(node:IsoNode,target:string,dispatch:boolean = true):void{
			if(this._isNoPath) return;

			var oldNode:IsoNode = this[target];
			var row:number = -1;
			var column:number = -1;
			
			if(oldNode){
				row = oldNode.row;
				column = oldNode.column;

				this._lastTempNode.copyBy(oldNode);
			}
			
			(<IsoNode><any> (this[target])).copyBy(node);
			
			//是否更新了节点
			if(node && (row != node.row || column != node.column)){
				if(target == SceneElementMover.CURRENT_NODE){
                    this._lastNode.copyBy(this._lastTempNode);

					this.setPassingNode(node);
					
					this.checkNode();
					
//					if(dispatch)
//						this.dispatchEvent(new IsoMapEvent(IsoMapEvent.ISO_MAP_CURRENT_NODE_CHANGED,false,false));
				}else if(target == SceneElementMover.TARGET_NODE){
					//目标节点
//					if(dispatch)
//						this.dispatchEvent(new IsoMapEvent(IsoMapEvent.ISO_MAP_TARGET_NODE_CHANGED,false,false));
				}
			}
		}

		/**
		 * 设置目标节点 
		 * @param node:IsoNode
		 */		
		public setTargetNode(node:IsoNode,dispatch:boolean = true):void{
			this.setNode(node,SceneElementMover.TARGET_NODE,dispatch);
		}

		/**
		 * 计算3D空间中以一个节点为中心的5个节点与目标点的最近节点，优点在于独立性强，不依赖地图节点数据，
		 * 缺点在于 此方法频繁使用时需要分配很多内存，IsoMap 覆盖优化此方法，
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
		 * @return 
		 * 
		 */		
		private getIsoNodeByRow(row:number,column:number):IsoNode{
			if(this._isoMap){
				return this._isoMap.getMapNode(row,column);
			}
			
			var node:IsoNode = new IsoNode();
			node.row = row;
			node.column = column;
			node.point2D = this.getIsoPoint(row,column);
			
			return node;
		}

		/**
		 * 计算移动距离 
		 * @param x:Number
		 * @param y:Number
		 * 
		 */		
		private calcDistance(x:number,y:number):void{
			var x2:number = x - this._x;
			var y2:number = y - this._y;
			var radians:number = Math.atan2(y2,x2);
			this._speedX = Math.cos(radians) * this._speed;
			this._speedY = Math.sin(radians) * this._speed;
			this._speedAbsX = Math.abs(this._speedX);
			this._speedAbsY = Math.abs(this._speedY);
			
			var data:Point = this.getPointDistance(x,y);
			
			//地图最终坐标
			this._targetX = data.x;
			this._targetY = data.y;
			
			data = this._targetNode.point2D;
			this.addPassingPoint(this._x,this._y,data.x,data.y);
			
			//有路径时因按路径一个个节点地移动，需要计算到达最终节点时地图坐标点
			if(!this._hasPath){
				this._finalX = this._targetX;
				this._finalY = this._targetY;
			}
		}

		/**
		 * 获取目标位置的距离数据 
		 * @param x:Number
		 * @param y:Number
		 * @return 
		 * 
		 */		
		public getPointDistance(x:number,y:number):Point{
			//地图最终坐标
			var minX:number = 0;//this.width + 10;
			if(this._floorOffsetWidth >= minX)
				minX = this._floorOffsetWidth;
			
			var minY:number = 0;//this.height + 10;
			if(this._floorOffsetHeight >= minY)
				minY = this._floorOffsetHeight;
			
            this._distancePoint.x = this.limitValue(x,minX,this._maxX);
            this._distancePoint.y = this.limitValue(y,minY,this._maxY);
			
			return this._distancePoint;
		}

		/**移动地图*/		
		public moveMap():void{
			if(this.checkDistance()){
				this.stopMoveInternal(!this._isFollowed);
				return;
			}
			
			this.updateMap();
			
			this.addPassingPoint(this._x,this._y);
			
//			if(!_isMovingEnd && this.hasEventListener(SceneElementEvent.SCENE_ELEMENT_MOVING))
//				this.dispatchEvent(new SceneElementEvent(SceneElementEvent.SCENE_ELEMENT_MOVING));
			//内存优化，改为回调函数
			if(!this._isMovingEnd && this.movingHandler != null){
				this.movingHandler.apply(this.scene);
			}
			
			//单次移动结束
            if(this._x + "" == this._targetX + "" && this._y + "" == this._targetY + ""){
				if(this._pathTargetNode)
					this.setCurrentNode(this._pathTargetNode);
				else
					this.setCurrentNode(this._targetNode);
				
				this.moveToNextNode();
				
				if(this.checkDistance())
					this.stopMoveInternal(!this._isFollowed);
				
				//地图移动结束，到达边界或目标点
				if(this.isArrive && !this._isMovingEnd){
					this._isMovingEnd = true;
					this._isDispatchStart = false;
					
					//路径结束
					if(!this._hasPath && this._isMovingEnd)
						this.setCurrentNode(this._targetNode);
					
					//				drawPath(null);
					//				this.dispatchEvent(new IsoMapEvent(IsoMapEvent.ISO_MAP_ARRIVE_TARGET_NODE,false,false));
					
//					this.dispatchEvent(new SceneElementEvent(SceneElementEvent.SCENE_ELEMENT_MOVING_END,true));
//                    LogManager.debug(this,"movingEndHandler" + this.movingEndHandler);
					//内存优化
					if(this.movingEndHandler != null)
						this.movingEndHandler.apply(this.scene,[this]);
				}
			}
//			sendData(ModuleNumber.SCENE,SceneCommand.MOVING,{x:_x,y:_y});
		}

		/**更新地图坐标*/		
		private updateMap():void{
			var x:number = this._x;
			var y:number = this._y;
			var sx:number = this._speedX;
			var sy:number = this._speedY;
			
			var dx:number = this._targetX - x;
			var dy:number = this._targetY - y;
			
			if(Math.abs(dx) < this._speedAbsX){
				sx = dx;
			}
			if(Math.abs(dy) < this._speedAbsY){
				sy = dy;
			}
			
			x += sx;
			y += sy;
			
			//当一个方向已到达目标坐标时，另一个方向速度小于1px则直接到达
//			if(x == _targetX && Math.abs(sy) < 1){
//				y = _targetY;
//			}
//			if(y == _targetY && Math.abs(sx) < 1){
//				x = _targetX;
//			}
			this.setXY(x,y);
		}

		/**
		 * 设置元素坐标，并更新其节点位置
		 * @param x:Number
		 * @param y:Number
		 */		
		public setXY(x:number,y:number):void{
			var width:number = SceneElementMover.MOVER_WIDTH / 2;
			var height:number = SceneElementMover.MOVER_HEIGHT;

			x = this.limitValue(x,width,this._maxX - width);
			y = this.limitValue(y,height,this._maxY);

			if(!this._isNoPath)
				this.setCurrentNode(this.getIsoNode(x,y));
			
			if(!this._nodeChangedFlag){
				return;
			}
			
			var vo:SceneElementVo = this._data.vo;
			if(vo){
				vo.x = x;
				vo.y = y;
			}
			
			this.x = x;
			this.y = y;
		}

		public updateXY():void{
			super.updateXY();
			
			var vo:SceneElementVo = this._data.vo;
			if(vo){
				this.setXY(vo.x,vo.y);
			}
		}

		/**检测可移动距离是否为0*/		
		private checkDistance():boolean{
			//如果有路径时，根据路径判断
			if(this._hasPath) return false;
			
            if(this._x + "" != this._finalX + "" || this._y + "" != this._finalY + "") return false;
			
			return true;
		}

		/**
		 * 添加或删除移动引擎 
		 * @param isAdded
		 */		
		public addEngine(isAdded:boolean):void{
			this._nodeChangedFlag = true;
			
			if(isAdded){
				if(!this._isMoving){
//					this.stage.addEventListener(Event.ENTER_FRAME,mapContainerEnterFrame);
//					if(_isRole)
//						this.addEventListener(Event.ENTER_FRAME,mapContainerEnterFrame);
//					else
						this._engineId =  EnterFrameManager.getInstance().addExecute(this.mapContainerEnterFrame,this);
					
					this._isMoving = true;
				}
			}else{
				if(this._isMoving){
//					this.stage.removeEventListener(Event.ENTER_FRAME,mapContainerEnterFrame);
//					if(_isRole)
//						this.removeEventListener(Event.ENTER_FRAME,mapContainerEnterFrame);
//					else
					EnterFrameManager.getInstance().removeExecute(this._engineId);
					
					this._isMoving = false;
				}
			}
		}

		/**帧处理*/		
		private mapContainerEnterFrame(e:Event = null):void{
//			var time:Number = new Date().time;
//			trace(time - _timeDelay);
//			_timeDelay = time;
			this.moveMap();
		}

		/**
		 * 设置地图数据 
		 * isoMap:IsoMap 参数可为 null
		 */		
		public setMapData(isoMap:IsoMap):void{
			this._isoMap = isoMap;
			
			if(this._isoMap){
				this.pathTypes = this._isoMap.pathTypes;
				this._mapNodes = this._isoMap.mapNodes;
				this._isoSize = this._isoMap.isoSize;
				this._halfSize = this._isoSize / 2;
				this._isoSize2 = this._isoSize * 2;
				this._mapWidth = this._isoMap.mapWidth;
				this._mapHeight = this._isoMap.mapHeight;
				
				this._maxX = this._mapWidth - this._toplimitOffsetWidth;
				this._maxY = this._mapHeight - this._toplimitOffsetHeight;
			}
			this.clearFollowPoints();
		}

		/**
		 * 获取等角投影矩形的中心点 
		 * @param row:Number 行索引
		 * @param column:Number 列索引
		 */		
		public getIsoPoint(row:number,column:number):Point{
			var y:number = row * this._halfSize;
			var x:number = column * this._isoSize2;
			//奇数行，节点坐标向前一个单位
			if(row % 2 == 1)
				x += this._isoSize;
			
			this._isoPoint.x = x;
			this._isoPoint.y = y;
			
			return this._isoPoint;
		}

		/**
		 * 限制最小值和最大值 
		 * @param value:Number
		 * @param min:Number
		 * @param max:Number
		 */		
		public limitValue(value:number,min:number,max:number):number{
			if(value < min)
				value = min;
			if(value > max)
				value = max;
			
			return value;
		}

		/**检测节点类型*/		
		private checkNode():void{
			var node:IsoNode = this.currentNode;
			if(this._isoMap)
				var mapNode:MapNode = this._isoMap.getMapNode(node.row,node.column);
			
			if(mapNode && mapNode.type == PathType.TRANSPARENT){
				this.alpha = 0.6;
			}else{
				this.alpha = 1;
			}
			
			if(this.nodeChangedHandler != null)
				this._nodeChangedFlag = this.nodeChangedHandler.apply(this.scene,[this]);
		}

		/**
		 * 添加经过的点数据 
		 * @param x:Number
		 * @param y:Number
		 * @param tx:Number = NaN 目标点x坐标,NaN表示未指定目标点  
		 * @param ty:Number = NaN 目标点y坐标,NaN表示未指定目标点  
		 */		
		private addPassingPoint(x:number,y:number,tx:number = NaN,ty:number = NaN):void{
			if(!this.passingPointFlag) return;

			var point:PassingPoint = this._recoverPoints[this._passingIndex];
			if(!point){
				throw new Error();
			}
			this._recoverPoints[this._passingIndex] = null;
			
			point.x = x;
			point.y = y;
			
			//未到达目标点时指定，到达目标点后方向不变
			point.tx = tx;
			point.ty = ty;
			
			this._passingPoints[this._passingIndex] = point;
			this._passingIndex ++;
			
			if(this._passingIndex > SceneElementMover.PASSING_POINT_COUNT){
				this._passingIndex = SceneElementMover.PASSING_POINT_COUNT;
				this._recoverPoints[this._passingIndex] = this._passingPoints[0];
				
				//所有节点向前移动一个位置
				var length:number = SceneElementMover.PASSING_POINT_COUNT + 1;
				for(var i:number = 1; i < length; i++){
					this._passingPoints[i - 1] = this._passingPoints[i];
				}
				this._passingPoints[SceneElementMover.PASSING_POINT_COUNT] = null;
			}
		}

		/**
		 * 设置经过的节点数据 
		 * @param node:IsoNode
		 */		
		private setPassingNode(node:IsoNode):void{
			this._passingNodes[this._passingNodeIndex] = node;
			this._passingNodeIndex ++;
			
			if(this._passingNodeIndex > SceneElementMover.PASSING_NODE_COUNT){
				var length:number = SceneElementMover.PASSING_NODE_COUNT + 1;
				this._passingNodeIndex = SceneElementMover.PASSING_NODE_COUNT;
				
				for(var i:number = 1; i < length; i++){
					this._passingNodes[i - 1] = this._passingNodes[i];
				}
				this._passingNodes[SceneElementMover.PASSING_NODE_COUNT] = null;
			}
		}

		public removeFromScene():void{
			this.stopMove();
			//先停止移动，再停止播放
			super.removeFromScene();
		}
		
	}
}