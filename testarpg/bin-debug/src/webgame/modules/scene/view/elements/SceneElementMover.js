var egret;
(function (egret) {
    var SceneElementMover = (function (_super) {
        __extends(SceneElementMover, _super);
        /**构造函数 其它参数应为isoSize的整数倍*/
        function SceneElementMover() {
            _super.call(this);
            /**
             * 距离目标点超过此值时，将路径分段行走
             */
            this.pathPartValue = 1000;
            /**
             * 移动时执行的回调函数 function():void{}，内存优化，取代频繁调试事件
             */
            this.movingHandler = null;
            /**
             * 移动结束时执行的回调函数 function(target:SceneElementMover):void{}，内存优化，取代频繁调试事件
             */
            this.movingEndHandler = null;
            /**
             * 节点改变时回调函数 function(target:SceneElementMover = null):Boolean{} 返回值表示是否可移动至此节点
             */
            this.nodeChangedHandler = null;
            /**
             * 调用 stopMove() 时回调函数 function(target:SceneElementMover):void{}
             */
            this.onStopMove = null;
            /**
             * 是否记录经过的路线，无寻路时关闭
             * @type {boolean}
             */
            this.passingPointFlag = false;
            //地图移动速度 
            this._speed = 0;
            //单次移动地图的最终x,y
            this._targetX = 0;
            this._targetY = 0;
            //当有路径时，到达最后一个目标节点时地图的坐标
            this._finalX = 0;
            this._finalY = 0;
            //单次移动的目标节点
            this._targetNode = null;
            //有路径时的目标节点
            this._pathTargetNode = null;
            //当前视口中心所在的节点
            this._currentNode = null;
            //上次所在节点
            this._lastNode = null;
            //上次所在节点
            this._lastTempNode = null;
            //是否有移动路径，IsoMap类使用
            this._hasPath = false;
            //是否已设置目标节点
            this._hasSetTarget = false;
            //上次移动是否已结束
            this._isMovingEnd = true;
            //是否已调度开始移动事件
            this._isDispatchStart = false;
            //节点尺寸
            this._isoSize = 20;
            //2倍节点尺寸
            this._isoSize2 = 0;
            //半个节点尺寸
            this._halfSize = 0;
            //地图宽高
            this._mapWidth = 0;
            this._mapHeight = 0;
            this._isoMap = null;
            //跟随时的节点间隔
            this._nodeInterval = 2;
            //是否为跟随者
            this._isFollowed = false;
            /**自动寻路的路径类型*/
            this.pathTypes = null;
            //地图数据
            this._mapNodes = null;
            //路径数据
            this._pathNodes = null;
            //寻路数据缓存
            this._pathTypeMap = null;
            //移动节点索引
            this._moveIndex = 0;
            //轨道移动节点索引
            this._trackIndex = 0;
            //经过的节点
            this._passingNodes = null;
            //经过的坐标点
            this._passingPoints = null;
            //回收数据
            this._recoverPoints = null;
            //x,y移动速度
            this._speedX = 0;
            this._speedY = 0;
            //x,y移动速度绝对值，用于缓存
            this._speedAbsX = 0;
            this._speedAbsY = 0;
            //测试用，帧时间间隔
            this._timeDelay = 0;
            //元素距离场景宽高上限值
            this._toplimitOffsetWidth = 0; //30;
            this._toplimitOffsetHeight = 0; //30;
            //元素距离场景宽高下限值
            this._floorOffsetWidth = 0; //100;
            this._floorOffsetHeight = 0; //150;
            //最大xy
            this._maxX = 0;
            this._maxY = 0;
            //目标点较远时，路径最终点
            this._finalPoint = null;
            //是否正在移动中
            this._isMoving = false;
            //标记是否为主角
            this._isRole = false;
            //以下为内存优化
            //getPointDistance()方法专用缓存Point
            this._distancePoint = null;
            //checkPathPart()方法专用缓存Point
            this._pathPartPoint = null;
            //getIsoPoint()方法专用缓存Point
            this._isoPoint = null;
            //getIsoNode()方法专用缓存Point
            this._isoNodePoint = null;
            //getIsoNode()专用缓存对象
            this._nodeLines = null;
            this._nodeColumns = null;
            //getNeerNode()专用缓存对象
            this._nodePoint = null;
            //getNeerNode()专用缓存对象
            this._neerPoint = null;
            //getNeerNode()专用缓存对象
            this._neerNode = null;
            //getNeerNode()专用缓存对象
            this._neerPoint3D = null;
            //getNeerNode()专用缓存对象
            this._targetPoint3D = null;
            //centerNode()专用缓存对象adda
            this._centerNode = null;
            //经过点的索引
            this._passingIndex = 0;
            this._passingNodeIndex = 0;
            //nodeChangedHandler() 函数回调值，若为 false 则无法移动
            this._nodeChangedFlag = true;
            this._pathNodes = [];
            this._pathTypeMap = new egret.HashMap();
            //内存优化，一开始就分配内存，避免频繁分配导出fp执行内存回收
            var length = SceneElementMover.PASSING_POINT_COUNT + 1;
            this._passingNodes = [];
            this._passingPoints = [];
            this._recoverPoints = [];
            for (var i = 0; i < length; i++) {
                this._recoverPoints[i] = new egret.PassingPoint();
            }
            this._isoNodePoint = new egret.Point();
            this._distancePoint = new egret.Point();
            this._pathPartPoint = new egret.Point();
            this._nodePoint = new egret.Point();
            this._neerPoint = new egret.Point();
            this._isoPoint = new egret.Point();
            this._targetPoint3D = new egret.Point3D();
            this._neerPoint3D = new egret.Point3D();
            this._nodeLines = [];
            this._nodeColumns = [];
            this._neerNode = new egret.IsoNode();
            this._neerNode.init();
            this._targetNode = new egret.IsoNode();
            this._targetNode.init();
            this._currentNode = new egret.IsoNode();
            this._currentNode.init();
            this._lastNode = new egret.IsoNode();
            this._lastNode.init();
            this._lastTempNode = new egret.IsoNode();
            this._lastTempNode.init();
            this._centerNode = new egret.IsoNode();
            this._centerNode.init();
        }
        var __egretProto__ = SceneElementMover.prototype;
        Object.defineProperty(__egretProto__, "finalPoint", {
            /**目标点较远时，路径最终点 */
            get: function () {
                return this._finalPoint;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "finalY", {
            /**最终目标点地图的坐标 y*/
            get: function () {
                if (this._finalPoint)
                    return this._finalPoint.x;
                return this._finalY;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "finalX", {
            /**最终目标点地图的坐标 x */
            get: function () {
                if (this._finalPoint)
                    return this._finalPoint.y;
                return this._finalX;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "isRole", {
            get: function () {
                return this._isRole;
            },
            /**
             * 标记是否为主角
             * @param value
             *
             */
            set: function (value) {
                this._isRole = value;
                this.pathPartValue = 4600;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "isMoving", {
            /**是否正在移动中*/
            get: function () {
                return this._isMoving;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "pathNodes", {
            /**当前路径节点数组*/
            get: function () {
                return this._pathNodes;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "passingPoints", {
            /**经过的坐标数据点，用于跟随*/
            get: function () {
                return this._passingPoints;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "passingNodes", {
            /**经过的路径*/
            get: function () {
                return this._passingNodes;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "depth", {
            /**获取元素深度*/
            get: function () {
                var node = this.currentNode;
                var mapNode = this._isoMap.getMapNode(node.row, node.column);
                if (mapNode)
                    return mapNode.depth;
                return _super.prototype.getDepth.call(this);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "isFollowed", {
            get: function () {
                return this._isFollowed;
            },
            /**
             * 是否为跟随者
             * @param value
             *
             */
            set: function (value) {
                this._isFollowed = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "nodeInterval", {
            get: function () {
                return this._nodeInterval;
            },
            /**
             * 跟随时的节点间隔或坐标点间隔
             * @param value:Number 默认值:2
             *
             */
            set: function (value) {
                this._nodeInterval = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "speed", {
            get: function () {
                return this._speed;
            },
            /**
             * 地图移动速度(移动一个单位)
             * @param value:Number 默认值:2px，也是最小值
             *
             */
            set: function (value) {
                if (this._speed == value)
                    return;
                this._speed = value;
                this._speed = Math.max(2, this._speed);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "lastNode", {
            /**
             * 上次所在节点
             * @returns {IsoNode}
             */
            get: function () {
                return this._lastNode;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "currentNode", {
            /**当前视口中心点所在的节点 */
            get: function () {
                if (this._currentNode.row == -1) {
                    this._currentNode.copyBy(this.centerNode);
                }
                //为null时取当前坐标点
                return this._currentNode;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "canMove", {
            /**地图是否可移动，到达边界时无法移动*/
            get: function () {
                if (this._x + "" == this._finalX + "" && this._y + "" == this._finalY + "") {
                    return false;
                }
                return true;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "isArrive", {
            /**是否已到达目标坐标点*/
            get: function () {
                return this._x + "" == this._finalX + "" && this._y + "" == this._finalY + "" && this._finalPoint == null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "centerNode", {
            /**
             * 元素的原点所在的节点 ，适用于只访问节点数据的场合，不适合用于改变节点数据场合
             * @return
             *
             */
            get: function () {
                this._centerNode.copyBy(this.getIsoNode(this._x, this._y));
                return this._centerNode;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "targetNode", {
            /**当前的目标节点*/
            get: function () {
                return this._targetNode;
            },
            enumerable: true,
            configurable: true
        });
        __egretProto__.destroy = function () {
            if (this._isDestroy)
                return;
            this.stopMove();
            _super.prototype.destroy.call(this);
        };
        /**清空经过的路径和坐标点*/
        __egretProto__.clearFollowPoints = function () {
            for (var i = 0; i < SceneElementMover.PASSING_POINT_COUNT; i++) {
                if (this._passingPoints[i]) {
                    this._recoverPoints[i] = this._passingPoints[i];
                    this._passingPoints[i] = null;
                }
            }
            this._passingIndex = 0;
            var length = SceneElementMover.PASSING_NODE_COUNT + 1;
            for (i = 0; i < length; i++) {
                this._passingNodes[i] = null;
            }
            this._passingNodeIndex = 0;
        };
        /**
         * 获取目标点的节点数据，没有地图节点数据时使用，有地图节点数据时使用 IsoMap.getIsoNode()，
         * 适用于只访问节点数据的场合，不适合用于改变节点数据场合
         * @param x:Number x坐标
         * @param y:Number y坐标
         */
        __egretProto__.getIsoNode = function (x, y) {
            var line = Math.round(y / this._halfSize);
            var column = Math.round(x / this._isoSize);
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
            return this.getNeerNode(this._isoNodePoint, this._nodeLines, this._nodeColumns);
        };
        /**
         * 跳至目标坐标位置，如果坐标不是节点的坐标，将自动计算并跳至最近的节点
         * @param x:Number x坐标
         * @param y:Number y坐标
         *
         */
        __egretProto__.gotoXY = function (x, y) {
            this.setTargetNode(this.getIsoNode(x, y));
            this._hasSetTarget = true;
            this.gotoGrid(this._targetNode.row, this._targetNode.column);
        };
        /**
         * 跳至目标行列位置
         * @param row:Number 行索引
         * @param column:Number 列索引
         *
         */
        __egretProto__.gotoGrid = function (row, column) {
            if (!this._hasSetTarget)
                this.setTargetNode(this.getIsoNodeByRow(row, column));
            this._hasSetTarget = false;
            var point = this.getIsoPoint(row, column);
            this.setXY(point.x, point.y);
            this.setCurrentNode(this.centerNode);
        };
        /**
         * 移动至目标位置，使用寻路
         * @param x:Number x坐标
         * @param y:Number y坐标
         *
         */
        __egretProto__.moveTo = function (x, y, isCheckPart) {
            if (isCheckPart === void 0) { isCheckPart = true; }
            this._isNoPath = false;
            this.setCurrentNode(this.centerNode);
            this.setTargetNode(this.getIsoNode(x, y));
            this._hasSetTarget = true;
            this.moveToGridPath(this._targetNode.row, this._targetNode.column, isCheckPart);
        };
        /**
         * 移动至目标位置，不寻路，移动到节点
         * @param x:Number x坐标
         * @param y:Number y坐标
         *
         */
        __egretProto__.moveTo2 = function (x, y) {
            this._isNoPath = false;
            this.setCurrentNode(this.centerNode);
            this.setTargetNode(this.getIsoNode(x, y));
            this._hasSetTarget = true;
            this.moveToGrid(this._targetNode.row, this._targetNode.column);
        };
        /**
         * 移动至目标位置，不寻路，忽略节点数据
         * @param x:Number x坐标
         * @param y:Number y坐标
         */
        __egretProto__.moveTo3 = function (x, y) {
            this._isNoPath = true;
            this.calcDistance(x, y);
            if (!this.checkDistance()) {
                this.addEngine(true);
                //播放动作
                var direction = egret.ActionMovieClipData.getInstance().calculateDirection(this._x, this._y, x, y);
                this.play(-1, egret.ActionType.WALK, direction);
            }
            this._isMovingEnd = !this.canMove;
            if (!this._isDispatchStart && !this._isMovingEnd) {
                this._isDispatchStart = true;
            }
        };
        /**停止移动*/
        __egretProto__.stopMove = function () {
            if (!this._isMoving)
                return;
            this._finalPoint = null;
            this.stopMoveInternal();
            if (this.onStopMove != null)
                this.onStopMove.apply(this.scene, [this]);
        };
        /**
         * 内部停止移动，有动作处理
         * @param changedAction:Boolean = true 是否改变动作
         */
        __egretProto__.stopMoveInternal = function (changedAction) {
            if (changedAction === void 0) { changedAction = true; }
            if (!this._isMoving)
                return;
            //路径分段时
            if (this.checkFinalPoint())
                return;
            this.addEngine(false);
            this.clearPathNodes();
            if (changedAction)
                this.play(-1, egret.ActionType.PREPARE);
        };
        /**检测分段终点*/
        __egretProto__.checkFinalPoint = function () {
            //路径分段时
            if (this._finalPoint) {
                this.moveTo(this._finalPoint.x, this._finalPoint.y);
                return true;
            }
            return false;
        };
        /**
         * 移动至目标行列
         * @param row:Number 行索引
         * @param column:Number 列索引
         */
        __egretProto__.moveToGrid = function (row, column) {
            if (!this._hasSetTarget)
                this.setTargetNode(this.getIsoNodeByRow(row, column));
            this._hasSetTarget = false;
            var point = this.getIsoPoint(row, column);
            var x = point.x;
            var y = point.y;
            this.calcDistance(x, y);
            if (!this.checkDistance()) {
                this.addEngine(true);
                //播放动作
                var direction = egret.ActionMovieClipData.getInstance().calculateDirection(this._x, this._y, x, y);
                this.play(-1, egret.ActionType.WALK, direction);
            }
            this._isMovingEnd = !this.canMove;
            if (!this._isDispatchStart && !this._isMovingEnd) {
                this._isDispatchStart = true;
            }
        };
        /**
         * 移动至目标节点
         * @param row:Number 行索引
         * @param column:Number 列索引
         */
        __egretProto__.moveToNode = function (node) {
            this.setTargetNode(node);
            this._hasSetTarget = false;
            var point = node.point2D;
            var x = point.x;
            var y = point.y;
            this.calcDistance(x, y);
            if (!this.checkDistance()) {
                this.addEngine(true);
                //播放动作
                var direction = egret.ActionMovieClipData.getInstance().calculateDirection(this._x, this._y, x, y);
                this.play(-1, egret.ActionType.WALK, direction);
            }
            this._isMovingEnd = !this.canMove;
            if (!this._isDispatchStart && !this._isMovingEnd) {
                this._isDispatchStart = true;
            }
        };
        /**
         * 按寻路路径行走至目标行列
         * @param row:Number 行索引
         * @param column:Number 列索引
         */
        __egretProto__.moveToGridPath = function (row, column, isCheckPart) {
            if (isCheckPart === void 0) { isCheckPart = false; }
            var tempRow = this._currentNode.row;
            var tempColumn = this._currentNode.column;
            if (row == tempRow && column == tempColumn) {
                this.stopMove();
                return;
            }
            if (!this._currentNode) {
                this.setCurrentNode(this.centerNode);
            }
            var length = this._mapNodes.length - 1;
            if (row >= length)
                row = length;
            length = this._mapNodes[row].length - 1;
            if (column >= length)
                column = length;
            var startNode = this._mapNodes[tempRow][tempColumn];
            var endNode = this._mapNodes[row][column];
            //非当前寻路路径类型，即不可通过
            if (this.pathTypes.indexOf(endNode.type) == -1) {
                var neerNode = egret.IsoUtil.getNeerNodeByType2(endNode, startNode, this._mapNodes, this.pathTypes);
            }
            if (neerNode)
                endNode = neerNode;
            //路径分段
            if (isCheckPart) {
                this.checkPathPart(endNode.row, endNode.column);
                return;
            }
            //TimeRecordManager.getInstance().resetRelativeTime("find");
            //TimeRecordManager.getInstance().recordTime("find");
            //IsoUtil.findPathByNode2(this._pathNodes,startNode,endNode,this._mapNodes,this.pathTypes,false);
            //this._pathNodes = IsoUtil.findPathByNode3(startNode,endNode,this._mapNodes,this.pathTypes);
            //TimeRecordManager.getInstance().recordTime("find");
            //有2个节点则走
            if (this._pathNodes.length < 2) {
                return;
            }
            //计算到达最后一个节点时地图的坐标，用于判断地图移动是否结束，节点移动可能未结束
            var point = endNode.point2D;
            var data = this.getPointDistance(point.x, point.y);
            this._finalX = data.x;
            this._finalY = data.y;
            if (this.hasEventListener(egret.SceneElementEvent.SCENE_ELEMENT_PATH_CHANGED))
                this.dispatchEvent(new egret.SceneElementEvent(egret.SceneElementEvent.SCENE_ELEMENT_PATH_CHANGED));
            this.moveByPath();
        };
        /**
         * 检测路径分段行走
         * @param row:int
         * @param column:int
         */
        __egretProto__.checkPathPart = function (row, column) {
            if (column === void 0) { column = 0; }
            var node = this.getIsoNodeByRow(row, column);
            this._pathPartPoint.x = this._x;
            this._pathPartPoint.y = this._y;
            //不用Point.distance()，优化内存
            if (egret.DimensionUtil.distance(node.point2D, this._pathPartPoint) >= this.pathPartValue) {
                this._finalPoint = node.point2D;
                var rate = Math.atan2(this._finalPoint.y - this._y, this._finalPoint.x - this._x);
                var tempX = Math.cos(rate) * this.pathPartValue;
                var tempY = Math.sin(rate) * this.pathPartValue;
                var tenX = tempX / 10;
                var tenY = tempY / 10;
                var x = tempX + this._x;
                var y = tempY + this._y;
                node = this.getIsoNode(x, y);
                var count = 0;
                while (!this._isoMap.canCross(node.row, node.column)) {
                    x += tenX;
                    y += tenY;
                    node = this._isoMap.getIsoNode(x, y); //getIsoNode(x,y);
                    count++;
                    if (count > 100) {
                        egret.LogManager.error(this, "查找分段路径递归达到最大值");
                        break;
                    }
                }
                row = node.row;
                column = node.column;
            }
            else {
                this._finalPoint = null;
            }
            this.moveToGridPath(row, column, false);
        };
        /**
         * 跟随元素所经过的点
         * @param points
         */
        __egretProto__.moveByPoints = function (points) {
            var index = points.length - this._nodeInterval * 6;
            if (index >= 0) {
                var point = points[index];
                if (point) {
                    this.setXY(point.x, point.y);
                    var direction = -1;
                    if (!isNaN(point.tx))
                        direction = egret.ActionMovieClipData.getInstance().calculateDirection(this._x, this._y, point.tx, point.ty);
                    this.play(-1, egret.ActionType.WALK, direction);
                }
            }
            else {
                this.stopMove();
            }
        };
        /**
         * 跟随元素所经过的路径节点
         * @param nodes
         */
        __egretProto__.moveByTrack = function (nodes) {
            var index = nodes.length - this._nodeInterval;
            if (index >= 0) {
                var node = nodes[index];
                this.moveToNode(node);
            }
        };
        /**
         * 按路径移动
         * @param nodes
         */
        __egretProto__.moveByPath = function () {
            this._moveIndex = 0;
            this._hasPath = true;
            this.moveToNextNode();
            //			this.dispatchEvent(new IsoMapEvent(IsoMapEvent.ISO_MAP_PATH_START,false,false));
        };
        /**移动至下一个节点*/
        __egretProto__.moveToNextNode = function () {
            if (!this._pathNodes || this._pathNodes.length == 0)
                return;
            var length = this._pathNodes.length;
            this._moveIndex++;
            this._hasPath = !(this._moveIndex >= length);
            if (!this._hasPath) {
                var index = this._moveIndex - 1;
                if (index >= 0 && !this._pathNodes[index]) {
                    this.stopMove();
                }
                this.clearPathNodes();
                return;
            }
            this._pathTargetNode = this._pathNodes[this._moveIndex];
            this.moveToNode(this._pathTargetNode);
        };
        /**清空路径数据*/
        __egretProto__.clearPathNodes = function () {
            if (this._pathNodes)
                this._pathNodes.length = 0;
        };
        /**设置当前节点*/
        __egretProto__.setCurrentNode = function (node) {
            this.setNode(node, SceneElementMover.CURRENT_NODE);
        };
        /**
         * 设置节点数据
         * @param node:IsoNode 节点
         * @param target:String 节点变量，
         */
        __egretProto__.setNode = function (node, target, dispatch) {
            if (dispatch === void 0) { dispatch = true; }
            if (this._isNoPath)
                return;
            var oldNode = this[target];
            var row = -1;
            var column = -1;
            if (oldNode) {
                row = oldNode.row;
                column = oldNode.column;
                this._lastTempNode.copyBy(oldNode);
            }
            (this[target]).copyBy(node);
            //是否更新了节点
            if (node && (row != node.row || column != node.column)) {
                if (target == SceneElementMover.CURRENT_NODE) {
                    this._lastNode.copyBy(this._lastTempNode);
                    this.setPassingNode(node);
                    this.checkNode();
                }
                else if (target == SceneElementMover.TARGET_NODE) {
                }
            }
        };
        /**
         * 设置目标节点
         * @param node:IsoNode
         */
        __egretProto__.setTargetNode = function (node, dispatch) {
            if (dispatch === void 0) { dispatch = true; }
            this.setNode(node, SceneElementMover.TARGET_NODE, dispatch);
        };
        /**
         * 计算3D空间中以一个节点为中心的5个节点与目标点的最近节点，优点在于独立性强，不依赖地图节点数据，
         * 缺点在于 此方法频繁使用时需要分配很多内存，IsoMap 覆盖优化此方法，
         * 适用于只访问节点数据的场合，不适合用于改变节点数据场合
         * @param target:Point 2D目标点
         * @param lines:Array 连续的3行
         * @param columns:Array 连续的3列
         */
        __egretProto__.getNeerNode = function (target, lines, columns) {
            var distance = Number.POSITIVE_INFINITY;
            var temp = 0;
            var lineValue = 0;
            var columnValue = 0;
            var length = lines.length;
            var subLength = columns.length;
            var line = 0;
            var column = 0;
            var tempX = NaN;
            var tempY = NaN;
            var tempZ = NaN;
            var x = NaN;
            var y = NaN;
            //计算3D坐标点
            //@see IsoUtil.getPoint3D()
            x = target.x / 2;
            y = target.y;
            this._targetPoint3D.x = y + x;
            //			_targetPoint3D.y = 0;
            this._targetPoint3D.z = y - x;
            for (var i = 0; i < length; i++) {
                line = lines[i];
                if (line < 0)
                    continue;
                for (var j = 0; j < subLength; j++) {
                    column = columns[j];
                    if (column < 0)
                        continue;
                    lineValue = line % 2;
                    columnValue = column % 2;
                    //奇数行的列一定为奇数，偶数行的列一定为偶数
                    if ((lineValue == 0 && columnValue == 0) || (lineValue == 1 && columnValue == 1)) {
                        this._nodePoint.x = column * this._isoSize;
                        this._nodePoint.y = line * this._halfSize;
                        //计算3D坐标点
                        //@see IsoUtil.getPoint3D()
                        x = this._nodePoint.x / 2;
                        y = this._nodePoint.y;
                        this._neerPoint3D.x = y + x;
                        //						_neerPoint3D.y = 0;
                        this._neerPoint3D.z = y - x;
                        temp = egret.DimensionUtil.distance3D(this._targetPoint3D, this._neerPoint3D);
                        if (temp < distance) {
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
        };
        /**
         * 获取节点数据
         * @param row:Number 行索引
         * @param column:Number 列索引
         * @return
         *
         */
        __egretProto__.getIsoNodeByRow = function (row, column) {
            if (this._isoMap) {
                return this._isoMap.getMapNode(row, column);
            }
            var node = new egret.IsoNode();
            node.row = row;
            node.column = column;
            node.point2D = this.getIsoPoint(row, column);
            return node;
        };
        /**
         * 计算移动距离
         * @param x:Number
         * @param y:Number
         *
         */
        __egretProto__.calcDistance = function (x, y) {
            var x2 = x - this._x;
            var y2 = y - this._y;
            var radians = Math.atan2(y2, x2);
            this._speedX = Math.cos(radians) * this._speed;
            this._speedY = Math.sin(radians) * this._speed;
            this._speedAbsX = Math.abs(this._speedX);
            this._speedAbsY = Math.abs(this._speedY);
            var data = this.getPointDistance(x, y);
            //地图最终坐标
            this._targetX = data.x;
            this._targetY = data.y;
            data = this._targetNode.point2D;
            this.addPassingPoint(this._x, this._y, data.x, data.y);
            //有路径时因按路径一个个节点地移动，需要计算到达最终节点时地图坐标点
            if (!this._hasPath) {
                this._finalX = this._targetX;
                this._finalY = this._targetY;
            }
        };
        /**
         * 获取目标位置的距离数据
         * @param x:Number
         * @param y:Number
         * @return
         *
         */
        __egretProto__.getPointDistance = function (x, y) {
            //地图最终坐标
            var minX = 0; //this.width + 10;
            if (this._floorOffsetWidth >= minX)
                minX = this._floorOffsetWidth;
            var minY = 0; //this.height + 10;
            if (this._floorOffsetHeight >= minY)
                minY = this._floorOffsetHeight;
            this._distancePoint.x = this.limitValue(x, minX, this._maxX);
            this._distancePoint.y = this.limitValue(y, minY, this._maxY);
            return this._distancePoint;
        };
        /**移动地图*/
        __egretProto__.moveMap = function () {
            if (this.checkDistance()) {
                this.stopMoveInternal(!this._isFollowed);
                return;
            }
            this.updateMap();
            this.addPassingPoint(this._x, this._y);
            //			if(!_isMovingEnd && this.hasEventListener(SceneElementEvent.SCENE_ELEMENT_MOVING))
            //				this.dispatchEvent(new SceneElementEvent(SceneElementEvent.SCENE_ELEMENT_MOVING));
            //内存优化，改为回调函数
            if (!this._isMovingEnd && this.movingHandler != null) {
                this.movingHandler.apply(this.scene);
            }
            //单次移动结束
            if (this._x + "" == this._targetX + "" && this._y + "" == this._targetY + "") {
                if (this._pathTargetNode)
                    this.setCurrentNode(this._pathTargetNode);
                else
                    this.setCurrentNode(this._targetNode);
                this.moveToNextNode();
                if (this.checkDistance())
                    this.stopMoveInternal(!this._isFollowed);
                //地图移动结束，到达边界或目标点
                if (this.isArrive && !this._isMovingEnd) {
                    this._isMovingEnd = true;
                    this._isDispatchStart = false;
                    //路径结束
                    if (!this._hasPath && this._isMovingEnd)
                        this.setCurrentNode(this._targetNode);
                    //				drawPath(null);
                    //				this.dispatchEvent(new IsoMapEvent(IsoMapEvent.ISO_MAP_ARRIVE_TARGET_NODE,false,false));
                    //					this.dispatchEvent(new SceneElementEvent(SceneElementEvent.SCENE_ELEMENT_MOVING_END,true));
                    //                    LogManager.debug(this,"movingEndHandler" + this.movingEndHandler);
                    //内存优化
                    if (this.movingEndHandler != null)
                        this.movingEndHandler.apply(this.scene, [this]);
                }
            }
            //			sendData(ModuleNumber.SCENE,SceneCommand.MOVING,{x:_x,y:_y});
        };
        /**更新地图坐标*/
        __egretProto__.updateMap = function () {
            var x = this._x;
            var y = this._y;
            var sx = this._speedX;
            var sy = this._speedY;
            var dx = this._targetX - x;
            var dy = this._targetY - y;
            if (Math.abs(dx) < this._speedAbsX) {
                sx = dx;
            }
            if (Math.abs(dy) < this._speedAbsY) {
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
            this.setXY(x, y);
        };
        /**
         * 设置元素坐标，并更新其节点位置
         * @param x:Number
         * @param y:Number
         */
        __egretProto__.setXY = function (x, y) {
            var width = SceneElementMover.MOVER_WIDTH / 2;
            var height = SceneElementMover.MOVER_HEIGHT;
            x = this.limitValue(x, width, this._maxX - width);
            y = this.limitValue(y, height, this._maxY);
            if (!this._isNoPath)
                this.setCurrentNode(this.getIsoNode(x, y));
            if (!this._nodeChangedFlag) {
                return;
            }
            var vo = this._data.vo;
            if (vo) {
                vo.x = x;
                vo.y = y;
            }
            this.x = x;
            this.y = y;
        };
        __egretProto__.updateXY = function () {
            _super.prototype.updateXY.call(this);
            var vo = this._data.vo;
            if (vo) {
                this.setXY(vo.x, vo.y);
            }
        };
        /**检测可移动距离是否为0*/
        __egretProto__.checkDistance = function () {
            //如果有路径时，根据路径判断
            if (this._hasPath)
                return false;
            if (this._x + "" != this._finalX + "" || this._y + "" != this._finalY + "")
                return false;
            return true;
        };
        /**
         * 添加或删除移动引擎
         * @param isAdded
         */
        __egretProto__.addEngine = function (isAdded) {
            this._nodeChangedFlag = true;
            if (isAdded) {
                if (!this._isMoving) {
                    //					this.stage.addEventListener(Event.ENTER_FRAME,mapContainerEnterFrame);
                    //					if(_isRole)
                    //						this.addEventListener(Event.ENTER_FRAME,mapContainerEnterFrame);
                    //					else
                    this._engineId = egret.EnterFrameManager.getInstance().addExecute(this.mapContainerEnterFrame, this);
                    this._isMoving = true;
                }
            }
            else {
                if (this._isMoving) {
                    //					this.stage.removeEventListener(Event.ENTER_FRAME,mapContainerEnterFrame);
                    //					if(_isRole)
                    //						this.removeEventListener(Event.ENTER_FRAME,mapContainerEnterFrame);
                    //					else
                    egret.EnterFrameManager.getInstance().removeExecute(this._engineId);
                    this._isMoving = false;
                }
            }
        };
        /**帧处理*/
        __egretProto__.mapContainerEnterFrame = function (e) {
            if (e === void 0) { e = null; }
            //			var time:Number = new Date().time;
            //			trace(time - _timeDelay);
            //			_timeDelay = time;
            this.moveMap();
        };
        /**
         * 设置地图数据
         * isoMap:IsoMap 参数可为 null
         */
        __egretProto__.setMapData = function (isoMap) {
            this._isoMap = isoMap;
            if (this._isoMap) {
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
        };
        /**
         * 获取等角投影矩形的中心点
         * @param row:Number 行索引
         * @param column:Number 列索引
         */
        __egretProto__.getIsoPoint = function (row, column) {
            var y = row * this._halfSize;
            var x = column * this._isoSize2;
            //奇数行，节点坐标向前一个单位
            if (row % 2 == 1)
                x += this._isoSize;
            this._isoPoint.x = x;
            this._isoPoint.y = y;
            return this._isoPoint;
        };
        /**
         * 限制最小值和最大值
         * @param value:Number
         * @param min:Number
         * @param max:Number
         */
        __egretProto__.limitValue = function (value, min, max) {
            if (value < min)
                value = min;
            if (value > max)
                value = max;
            return value;
        };
        /**检测节点类型*/
        __egretProto__.checkNode = function () {
            var node = this.currentNode;
            if (this._isoMap)
                var mapNode = this._isoMap.getMapNode(node.row, node.column);
            if (mapNode && mapNode.type == egret.PathType.TRANSPARENT) {
                this.alpha = 0.6;
            }
            else {
                this.alpha = 1;
            }
            if (this.nodeChangedHandler != null)
                this._nodeChangedFlag = this.nodeChangedHandler.apply(this.scene, [this]);
        };
        /**
         * 添加经过的点数据
         * @param x:Number
         * @param y:Number
         * @param tx:Number = NaN 目标点x坐标,NaN表示未指定目标点
         * @param ty:Number = NaN 目标点y坐标,NaN表示未指定目标点
         */
        __egretProto__.addPassingPoint = function (x, y, tx, ty) {
            if (tx === void 0) { tx = NaN; }
            if (ty === void 0) { ty = NaN; }
            if (!this.passingPointFlag)
                return;
            var point = this._recoverPoints[this._passingIndex];
            if (!point) {
                throw new Error();
            }
            this._recoverPoints[this._passingIndex] = null;
            point.x = x;
            point.y = y;
            //未到达目标点时指定，到达目标点后方向不变
            point.tx = tx;
            point.ty = ty;
            this._passingPoints[this._passingIndex] = point;
            this._passingIndex++;
            if (this._passingIndex > SceneElementMover.PASSING_POINT_COUNT) {
                this._passingIndex = SceneElementMover.PASSING_POINT_COUNT;
                this._recoverPoints[this._passingIndex] = this._passingPoints[0];
                //所有节点向前移动一个位置
                var length = SceneElementMover.PASSING_POINT_COUNT + 1;
                for (var i = 1; i < length; i++) {
                    this._passingPoints[i - 1] = this._passingPoints[i];
                }
                this._passingPoints[SceneElementMover.PASSING_POINT_COUNT] = null;
            }
        };
        /**
         * 设置经过的节点数据
         * @param node:IsoNode
         */
        __egretProto__.setPassingNode = function (node) {
            this._passingNodes[this._passingNodeIndex] = node;
            this._passingNodeIndex++;
            if (this._passingNodeIndex > SceneElementMover.PASSING_NODE_COUNT) {
                var length = SceneElementMover.PASSING_NODE_COUNT + 1;
                this._passingNodeIndex = SceneElementMover.PASSING_NODE_COUNT;
                for (var i = 1; i < length; i++) {
                    this._passingNodes[i - 1] = this._passingNodes[i];
                }
                this._passingNodes[SceneElementMover.PASSING_NODE_COUNT] = null;
            }
        };
        __egretProto__.removeFromScene = function () {
            this.stopMove();
            //先停止移动，再停止播放
            _super.prototype.removeFromScene.call(this);
        };
        /**
         * 移动元素的宽度
         * @type {number}
         */
        SceneElementMover.MOVER_WIDTH = 100;
        /**
         * 移动元素的高度
         * @type {number}
         */
        SceneElementMover.MOVER_HEIGHT = 180;
        SceneElementMover.CURRENT_NODE = "_currentNode";
        SceneElementMover.TARGET_NODE = "_targetNode";
        //经过坐标点最大数量
        SceneElementMover.PASSING_POINT_COUNT = 2;
        SceneElementMover.PASSING_NODE_COUNT = 2;
        return SceneElementMover;
    })(egret.SceneElementInteractive);
    egret.SceneElementMover = SceneElementMover;
    SceneElementMover.prototype.__class__ = "egret.SceneElementMover";
})(egret || (egret = {}));
//# sourceMappingURL=SceneElementMover.js.map