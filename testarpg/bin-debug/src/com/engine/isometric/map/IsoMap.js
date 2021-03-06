var egret;
(function (egret) {
    var IsoMap = (function (_super) {
        __extends(IsoMap, _super);
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
        function IsoMap(mapWidth, mapHeight, isoSize, renderWidth, renderHeight, renderOffsetWidth, renderOffsetHeight) {
            if (mapWidth === void 0) { mapWidth = 1000; }
            if (mapHeight === void 0) { mapHeight = 1000; }
            if (isoSize === void 0) { isoSize = 20; }
            if (renderWidth === void 0) { renderWidth = 200; }
            if (renderHeight === void 0) { renderHeight = 160; }
            if (renderOffsetWidth === void 0) { renderOffsetWidth = 0; }
            if (renderOffsetHeight === void 0) { renderOffsetHeight = 0; }
            _super.call(this, mapWidth, mapHeight, isoSize, renderWidth, renderHeight, renderOffsetWidth, renderOffsetHeight);
            /**
             * 自动寻路可通过的路径类型
             */
            this.pathTypes = null;
            /**
             * 是否支持鼠标持续按下时寻路
             */
            this.isMulitiClick = true;
            //地图数据
            this._mapNodes = null;
            //路径数据
            this._pathNodes = null;
            //绘制的路径节点数据
            this._viewNodes = null;
            //节点颜色表
            this._colorHashMap = null;
            this._mapNodes = [];
            this._pathNodes = [];
            this._viewNodes = [];
            this.pathTypes = [];
            this._clickPoint = new egret.Point();
        }
        var __egretProto__ = IsoMap.prototype;
        Object.defineProperty(__egretProto__, "pathNodes", {
            /**
             * 当前寻路路径
             * @return
             *
             */
            get: function () {
                return this._pathNodes;
            },
            //
            set: function (value) {
                this._pathNodes = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "mapNodes", {
            /**
             * 地图节点数据
             * @return
             *
             */
            get: function () {
                return this._mapNodes;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 设置地图数据
         * @param array:Array 地图节点类型2维数组
         *
         */
        __egretProto__.setMapNodes = function (array) {
            if (!array || !array[0]) {
                //				LogManager.error(this,"地图数据为空或空数组");
                return;
            }
            //目前节点数据对象缓存起来
            //			while(_mapNodes.length > array.length)
            //				_mapNodes.pop();
            var rows = array.length;
            var columns = array[0].length;
            var node = null;
            var nodes = null;
            var point = null;
            while (this._mapNodes.length < rows) {
                this._mapNodes.push(new Array());
            }
            for (var i = 0; i < rows; i++) {
                nodes = this._mapNodes[i];
                while (nodes.length < columns) {
                    nodes.push(new egret.MapNode());
                }
                for (var j = 0; j < columns; j++) {
                    node = nodes[j];
                    if (!node.point2D) {
                        point = this.getIsoPoint(i, j);
                        node.row = i;
                        node.column = j;
                        node.point2D = point;
                        node.point3D = egret.IsoUtil.getPoint3D(node.point2D);
                        node.depth = egret.IsoUtil.getDepth(node.point3D);
                    }
                    node.type = array[i][j];
                    node.size = this._isoSize;
                    this.setTile(node);
                }
            }
            this.initMap();
        };
        /**
         * 设置地图数据，直接设置地图节点数据为指定类型
         * @param width 地图宽度
         * @param height 地图高度
         * @param type 路径节点类型
         */
        __egretProto__.setMapNodes2 = function (width, height, type) {
            var size = this._isoSize;
            var half = size / 2;
            var size2 = size * 2;
            var rows = Math.ceil(height / half);
            var columns = Math.ceil(width / size2);
            if (width % (size2) == 0)
                columns++;
            if (height % half == 0)
                rows++;
            var node = null;
            var nodes = null;
            var point = null;
            while (this._mapNodes.length < rows) {
                this._mapNodes.push(new Array());
            }
            for (var i = 0; i < rows; i++) {
                nodes = this._mapNodes[i];
                while (nodes.length < columns) {
                    nodes.push(new egret.MapNode());
                }
                for (var j = 0; j < columns; j++) {
                    node = nodes[j];
                    if (!node.point2D) {
                        point = this.getIsoPoint(i, j);
                        node.row = i;
                        node.column = j;
                        node.point2D = point;
                        node.point3D = egret.IsoUtil.getPoint3D(node.point2D);
                        node.depth = egret.IsoUtil.getDepth(node.point3D);
                    }
                    node.type = type;
                    node.size = this._isoSize;
                    this.setTile(node);
                }
            }
            this.initMap();
        };
        //
        /**
         * 设置地图节点类型
         * @param rows 行
         * @param columns 列
         * @param type 路径节点类型
         */
        __egretProto__.setMapNodeType = function (rows, columns, type) {
            if (this._mapNodes && this._mapNodes[rows]) {
                var node = this._mapNodes[rows][columns];
                node.type = type;
                this.setTile(node);
            }
        };
        //
        /**
         * 设置节点类型颜色 ，若显示网格，则根据颜色值标记节点
         * @param type:Number 节点类型 PathType
         * @param color:uint 颜色值
         *
         */
        __egretProto__.setTileTypeColor = function (type, color) {
            if (color === void 0) { color = 0; }
            if (!this._colorHashMap)
                this._colorHashMap = new egret.HashMap();
            this._colorHashMap.put(type, color);
        };
        //
        /**
         * 获取地图数据节点
         * @param row:Number 行
         * @param column:Number 列
         * @return 可能为 null
         *
         */
        __egretProto__.getMapNode = function (row, column) {
            //性能优化
            if ((row > -1 && row < this._mapNodes.length) && (column > -1 && column < this._mapNodes[row].length))
                //			if(_mapNodes.length > 0)
                return this._mapNodes[row][column];
            return null;
        };
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
        __egretProto__.getNeerNode = function (target, lines, columns) {
            if (this._mapNodes.length == 0)
                return _super.prototype.getNeerNode.call(this, target, lines, columns);
            var distance = Number.POSITIVE_INFINITY;
            var tempDistance = 0;
            var lineValue = 0;
            var columnValue = 0;
            var length = lines.length;
            var subLength = columns.length;
            var line = 0;
            var column = 0;
            var tempNode = null;
            var tempX = NaN;
            var tempY = NaN;
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
                        tempDistance = egret.DimensionUtil.distance3D(this._targetPoint3D, this._neerPoint3D);
                        if (tempDistance < distance) {
                            distance = tempDistance;
                            tempX = this._nodePoint.x;
                            tempY = this._nodePoint.y;
                        }
                    }
                }
            }
            var tempLine = Math.round(tempY / this._halfSize);
            //Math.floor
            var tempColumn = (tempX / this._isoSize2) | 0;
            return this._mapNodes[tempLine][tempColumn];
        };
        //
        /**
         * 指定行列是否能通过
         * @param row:Number 行
         * @param column:Number 列
         * @return
         *
         */
        __egretProto__.canCross = function (row, column) {
            var node = this.getMapNode(row, column);
            return this.pathTypes.indexOf(node.type) != -1;
        };
        //
        /**
         * 初始化地图，如当前点数据等
         *
         */
        __egretProto__.initMap = function () {
            _super.prototype.initMap.call(this);
        };
        //
        __egretProto__.destroy = function () {
            if (this._isDestroy)
                return;
            _super.prototype.destroy.call(this);
        };
        //
        //测试用
        __egretProto__.setTile = function (node) {
            if (this._colorHashMap)
                this.setTileColor(node.row, node.column, this._colorHashMap.get(node.type));
        };
        //
        __egretProto__.addListeners = function () {
            _super.prototype.addListeners.call(this);
            this._mapTileContainer.addEventListener(egret.TouchEvent.TOUCH_TAP, this.mapTileContainerClick, this);
        };
        //
        /**
         * 鼠标单击
         * @param e
         *
         */
        __egretProto__.mapTileContainerClick = function (e) {
            if (e === void 0) { e = null; }
            this._clickPoint.x = e.stageX;
            this._clickPoint.y = e.stageY;
            this.checkStartMove();
            this.dispatchEvent(new egret.IsoMapEvent(egret.IsoMapEvent.ISO_MAP_TILE_CLICK, false, false));
        };
        //
        /**
         * 检测开始移动事件
         * @param checkNode:Boolean = false 是否略过障碍物
         *
         */
        __egretProto__.checkStartMove = function (checkNode) {
            if (checkNode === void 0) { checkNode = false; }
            if (this._isMapMoved)
                return;
            this._mapTileContainer.globalToLocal(this._clickPoint.x, this._clickPoint.y, this._clickPoint);
            var x = this._clickPoint.x; //this._mapTileContainer.mouseX;
            var y = this._clickPoint.y; //this._mapTileContainer.mouseY;
            if (checkNode && this._mapNodes.length > 0) {
                var node = this.getIsoNode(x, y);
                node = this.getMapNode(node.row, node.column);
                //障碍物时不处理
                if (!node || this.pathTypes.indexOf(node.type) == -1)
                    return;
            }
            this._currentMapX = x;
            this._currentMapY = y;
            this.dispatchEvent(new egret.IsoMapEvent(egret.IsoMapEvent.ISO_MAP_MOVING_START, false, false));
        };
        //
        /**
         * 帧处理
         * @param e
         *
         */
        __egretProto__.mapContainerEnterFrame = function (e) {
            _super.prototype.mapContainerEnterFrame.call(this, e);
            if (this.isMulitiClick && !this._isMapMoved) {
                var time = egret.TimeRecordManager.getInstance().getRelativeTime("checkStartMove");
                //				trace("time:" + time);
                if (time > 300) {
                    egret.TimeRecordManager.getInstance().resetRelativeTime("checkStartMove");
                    this.checkStartMove(true);
                }
            }
        };
        //
        /**
         * 绘制当前路径
         *
         */
        __egretProto__.drawCurrentPath = function () {
            if (!this._isShowPath) {
                this._pathShape.graphics.clear();
                return;
            }
            var rect = null;
            if (this._pathPolicy == egret.PathPolicyType.VIEW) {
                rect = this.viewRect;
            }
            else if (this._pathPolicy == egret.PathPolicyType.RENDER) {
                rect = this.renderRect;
            }
            var nodes = this.getViewNodes(0, this._pathNodes, rect); //_moveIndex
            this.drawPath(nodes);
        };
        //
        /**
         * 获取绘制的路径点
         * @param startIndex:Number 开始节点索引
         * @param nodes:Vector.<MapNode> 路径节点数组
         * @param rect:Rectangle 矩形区域，为null时获取开始节点到结束节点之间的所有路径节点
         * @return
         *
         */
        __egretProto__.getViewNodes = function (startIndex, nodes, rect) {
            this._viewNodes.length = 0;
            var length = nodes.length;
            var node = null;
            for (var i = startIndex; i < length; i++) {
                node = nodes[i];
                this._viewNodes.push(node);
                if (rect && !rect.containsPoint(node.point2D))
                    break;
            }
            return this._viewNodes;
        };
        return IsoMap;
    })(egret.IsoMapDriver);
    egret.IsoMap = IsoMap;
    IsoMap.prototype.__class__ = "egret.IsoMap";
})(egret || (egret = {}));
//# sourceMappingURL=IsoMap.js.map