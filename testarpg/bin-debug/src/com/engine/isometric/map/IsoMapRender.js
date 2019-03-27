var egret;
(function (egret) {
    var IsoMapRender = (function (_super) {
        __extends(IsoMapRender, _super);
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
        function IsoMapRender(mapWidth, mapHeight, isoSize, viewWidth, viewHeight, renderOffsetWidth, renderOffsetHeight) {
            if (mapWidth === void 0) { mapWidth = 1000; }
            if (mapHeight === void 0) { mapHeight = 1000; }
            if (isoSize === void 0) { isoSize = 20; }
            if (viewWidth === void 0) { viewWidth = 200; }
            if (viewHeight === void 0) { viewHeight = 160; }
            if (renderOffsetWidth === void 0) { renderOffsetWidth = 0; }
            if (renderOffsetHeight === void 0) { renderOffsetHeight = 0; }
            _super.call(this);
            /**
             * 场景层级鼠标交互配置
             */
            this.layerConfigs = null;
            //外部渲染容器要放在_mapContainer的最上层
            this._mapContainer = null;
            //视口
            this._viewShape = null;
            //渲染矩形
            this._renderShape = null;
            //场景容器
            this._sceneContainer = null;
            //交互和节点容器
            this._mapTileContainer = null;
            //路径
            this._pathShape = null;
            //地图宽高
            this._mapWidth = 0;
            this._mapHeight = 0;
            //渲染区域和视口宽度偏移量
            this._renderOffsetWidth = 0;
            this._renderOffsetHeight = 0;
            //视口宽高
            this._viewWidth = 0;
            this._viewHeight = 0;
            //渲染矩形，大于或等于视口矩形
            this._renderRect = null;
            //视口矩形
            this._viewRect = null;
            //节点尺寸
            this._isoSize = 20;
            //2倍节点尺寸
            this._isoSize2 = 0;
            //半个节点尺寸
            this._halfSize = 0;
            //路径线宽
            this._pathThickness = 0;
            //路径颜色
            this._pathColor = 0xff9900;
            //渲染点击区域alpha
            this._renderRectAlpha = 0;
            //视口中心点全局坐标点
            this._cPoint = null;
            this._cPoint2 = null;
            //视口原点全局坐标点
            this._oPoint = null;
            this._oPoint2 = null;
            //节点集
            this._mapTiles = null;
            //更新数据标记
            this._updateData = null;
            //上一个标记颜色的节点
            this._lastTileMap = null;
            //		protected var _stage:Stage = null;
            //是否显示节点
            this._isShowTile = false;
            //是否显示视口矩形
            this._isShowView = false;
            //是否显示路径
            this._isShowPath = false;
            //是否显示渲染矩形
            this._isShowRender = false;
            //是否绘制交互区域，地图加载完成后设置为 false 以提高效率
            this._isDrawInteractive = true;
            //路径显示策略
            this._pathPolicy = egret.PathPolicyType.VIEW;
            //层级列表
            this._layerHashMap = null;
            //渲染区域最大xy
            this._renderMX = 0;
            this._renderMY = 0;
            //内存优化，参数
            this._renderParams = null;
            this._stage = null;
            this.touchEnabled = false;
            this._updateData = new Object();
            this._renderRect = new egret.Rectangle();
            this._viewRect = new egret.Rectangle();
            this._layerHashMap = new egret.HashMap();
            this._oPoint = new egret.Point();
            this._oPoint2 = new egret.Point();
            this._cPoint = new egret.Point();
            this._cPoint2 = new egret.Point();
            this._mapContainer = new egret.DisplayObjectContainer();
            this._mapContainer.touchEnabled = false;
            this.addChild(this._mapContainer);
            this._sceneContainer = new egret.DisplayObjectContainer();
            this._sceneContainer.touchEnabled = false;
            this._mapContainer.addChild(this._sceneContainer);
            this._mapTileContainer = new egret.Sprite();
            this._mapTileContainer.touchEnabled = true;
            this._mapTileContainer.touchChildren = false;
            this._sceneContainer.addChild(this._mapTileContainer);
            this._renderParams = ["renderRect"];
            this.showPath(true);
            this.setProperties(mapWidth, mapHeight, isoSize, viewWidth, viewHeight, renderOffsetWidth, renderOffsetHeight);
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.thisAddedToStage, this);
        }
        var __egretProto__ = IsoMapRender.prototype;
        Object.defineProperty(__egretProto__, "isDrawInteractive", {
            get: function () {
                return this._isDrawInteractive;
            },
            /**
             * 是否绘制交互区域，地图加载完成后设置为 false 以提高效率
             * @param value:Boolean
             *
             */
            set: function (value) {
                if (this._isDrawInteractive == value)
                    return;
                this._isDrawInteractive = value;
                this.drawMapRect();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "mapTileContainer", {
            /**
             * 节点容器，也是IsoMap的交互容器，用于定位移动目标
             * @return
             *
             */
            get: function () {
                return this._mapTileContainer;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "renderRectAlpha", {
            get: function () {
                return this._renderRectAlpha;
            },
            /**
             * 设置渲染区域矩形的alpha
             * @param value:Number
             * @see #showRenderRect()
             */
            set: function (value) {
                if (this._renderRectAlpha == value)
                    return;
                this._renderRectAlpha = value;
                this.drawMapRect();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "pathPolicy", {
            get: function () {
                return this._pathPolicy;
            },
            /**
             * 设置路径显示策略
             * @param value:String
             * @see PathPolicyType
             */
            set: function (value) {
                if (this._pathPolicy == value)
                    return;
                this._pathPolicy = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "pathColor", {
            get: function () {
                return this._pathColor;
            },
            /**
             * 设置路径颜色，设置后下次绘制路径时生效
             * @param value:uint 默认值:0xff9900
             *
             */
            set: function (value) {
                if (this._pathColor == value)
                    return;
                this._pathColor = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "pathThickness", {
            get: function () {
                return this._pathThickness;
            },
            /**
             * 设置路径线宽，设置后下次绘制路径时生效
             * @param value:Number 默认值:0px
             *
             */
            set: function (value) {
                if (this._pathThickness == value)
                    return;
                this._pathThickness = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "isoSize", {
            /**
             * 节点尺寸(px)
             * @return
             *
             */
            get: function () {
                return this._isoSize;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "renderOffsetHeight", {
            /**
             * 渲染区域矩形高度
             * @return
             *
             */
            get: function () {
                return this._renderOffsetHeight;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "renderOffsetWidth", {
            /**
             * 渲染区域矩形宽度
             * @return
             *
             */
            get: function () {
                return this._renderOffsetWidth;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "mapHeight", {
            /**
             * 地图高度
             * @return
             *
             */
            get: function () {
                return this._mapHeight;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "mapWidth", {
            /**
             * 地图宽度
             * @return
             *
             */
            get: function () {
                return this._mapWidth;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "x", {
            set: function (value) {
                this._setX(value);
                //更新全局原点和中心点
                this.localToGlobal(0, 0, this._oPoint);
                this.localToGlobal(this._viewWidth / 2, this._viewHeight / 2, this._cPoint);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "y", {
            set: function (value) {
                this._setY(value);
                //更新全局原点和中心点
                this.localToGlobal(0, 0, this._oPoint);
                this.localToGlobal(this._viewWidth / 2, this._viewHeight / 2, this._cPoint);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "viewHeight", {
            //
            /**
             * 视口高度
             * @return
             *
             */
            get: function () {
                return this._viewHeight;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "viewWidth", {
            /**
             * 视口宽度
             * @return
             *
             */
            get: function () {
                return this._viewWidth;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "totalRows", {
            /**
             * 节点总行数
             * @return
             * @see IsoUtil.drawTiles();
             */
            get: function () {
                var rows = Math.ceil(this._mapHeight / this._isoSize);
                if (this._mapHeight % this._isoSize == 0)
                    rows++;
                return rows * 2;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "totalColumns", {
            /**
             * 节点总列数
             * @return
             * @see IsoUtil.drawTiles();
             */
            get: function () {
                var columns = Math.ceil(this._mapWidth / this._isoSize2);
                if (this._mapWidth % (this._isoSize2) == 0)
                    columns++;
                return columns;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "viewRect", {
            /**
             * 视口矩形
             * @return
             *
             */
            get: function () {
                var mPoint = this.originalPoint;
                this._viewRect.x = mPoint.x;
                this._viewRect.y = mPoint.y;
                return this._viewRect;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "renderRect", {
            /**
             * 渲染区域矩形，地图移动时根据需要更新位置 ，视口始终处于此矩形中
             * @return
             *
             */
            get: function () {
                if (this.getUpdateData(this._renderParams)) {
                    var mPoint = this.originalPoint;
                    var x = mPoint.x - this._renderOffsetWidth;
                    var maxX = this._renderMX;
                    if (maxX < 0)
                        maxX = 0;
                    x = this.limitValue(x, 0, this._renderMX);
                    var y = mPoint.y - this._renderOffsetHeight;
                    var maxY = this._renderMY;
                    if (maxY < 0)
                        maxY = 0;
                    y = this.limitValue(y, 0, maxY);
                    this._renderRect.x = x;
                    this._renderRect.y = y;
                    this.setUpdateData("renderRect", false);
                }
                return this._renderRect;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "originalPoint", {
            //
            /**
             * 当前地图视口原点的坐标，此对象为缓存对象，属性只能引用，不能改变否则会导致混乱
             * @return
             *
             */
            get: function () {
                this._mapContainer.globalToLocal(this._oPoint.x, this._oPoint.y, this._oPoint2);
                return this._oPoint2;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "centerPoint", {
            //
            /**
             * 当前地图视口的中心点的坐标，此对象为缓存对象，属性只能引用，不能改变否则会导致混乱
             * @return
             *
             */
            get: function () {
                this._mapContainer.globalToLocal(this._cPoint.x, this._cPoint.y, this._cPoint2);
                return this._cPoint2;
            },
            enumerable: true,
            configurable: true
        });
        //
        __egretProto__.destroy = function () {
            if (this._isDestroy)
                return;
            //2维数组
            if (this._mapTiles)
                for (var i = 0; i < this._mapTiles.length; i++) {
                    egret.DisplayObjectUtil.destroyTargets.apply(null, this._mapTiles[i]);
                }
            _super.prototype.destroy.call(this);
        };
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
        __egretProto__.setProperties = function (mapWidth, mapHeight, isoSize, viewWidth, viewHeight, renderOffsetWidth, renderOffsetHeight) {
            if (mapWidth === void 0) { mapWidth = 0; }
            if (mapHeight === void 0) { mapHeight = 0; }
            if (isoSize === void 0) { isoSize = 0; }
            if (viewWidth === void 0) { viewWidth = 0; }
            if (viewHeight === void 0) { viewHeight = 0; }
            if (renderOffsetWidth === void 0) { renderOffsetWidth = 0; }
            if (renderOffsetHeight === void 0) { renderOffsetHeight = 0; }
            var attrs = ["_mapWidth", "_mapHeight", "_isoSize", "_viewWidth", "_viewHeight", "_renderOffsetWidth", "_renderOffsetHeight"];
            var flags = [];
            for (var p in arguments) {
                if (arguments[p] > 0) {
                    this[attrs[p]] = arguments[p];
                    flags[p] = true;
                }
            }
            //渲染区域大于或等于视口区域
            this._renderOffsetWidth = Math.max(0, this._renderOffsetWidth);
            this._renderOffsetHeight = Math.max(0, this._renderOffsetHeight);
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
            this.localToGlobal(this._viewWidth / 2, this._viewHeight / 2, this._cPoint);
            this._halfSize = this._isoSize / 2;
            this._isoSize2 = this._isoSize * 2;
            if (this.hasEventListener(egret.IsoMapEvent.ISO_MAP_PROPERTY_CHANGED))
                this.dispatchEvent(new egret.IsoMapEvent(egret.IsoMapEvent.ISO_MAP_PROPERTY_CHANGED, false, false));
        };
        //
        /**
         * 显示隐藏视口框 ，用于观察调试
         * @param visible:Boolean = true
         *
         */
        __egretProto__.showViewport = function (visible) {
            if (visible === void 0) { visible = true; }
            this._isShowView = visible;
            if (visible) {
                if (!this._viewShape) {
                    this._viewShape = new egret.Shape();
                    this.addChild(this._viewShape);
                }
                this._viewShape.visible = true;
                if (this.numChildren > 0)
                    this.setChildIndex(this._viewShape, this.numChildren - 1);
                this.drawView();
            }
            else if (this._viewShape) {
                this._viewShape.visible = false;
            }
        };
        //
        /**
         * 显示隐藏渲染区域矩形，用于观察调试
         * @param visible:Boolean = true
         *
         */
        __egretProto__.showRenderRect = function (visible) {
            if (visible === void 0) { visible = true; }
            this._isShowRender = visible;
            if (visible) {
                if (!this._renderShape) {
                    this._renderShape = new egret.Shape();
                    this._mapContainer.addChild(this._renderShape);
                }
                this._renderShape.visible = true;
                this.setMapLayer();
                this.drawRenderRect();
            }
            else if (this._renderShape) {
                this._renderShape.visible = false;
            }
        };
        //
        /**
         * 显示隐藏节点，用于观察调试
         * @param visible:Boolean = true
         *
         */
        __egretProto__.showMapTile = function (visible) {
            if (visible === void 0) { visible = true; }
            this._isShowTile = visible;
            //销毁之前的节点
            if (this._mapTileContainer.numChildren > 0)
                egret.DisplayObjectUtil.destroyChildren(this._mapTileContainer);
            if (visible) {
                this._mapTileContainer.graphics.clear();
                this._mapTiles = egret.IsoUtil.drawTiles(this._mapTileContainer, this._mapWidth, this._mapHeight, this._isoSize, 0x666666);
            }
            else {
                this.drawMapRect();
            }
        };
        //
        /**
         * 显示隐藏路径
         * @param visible:Boolean = true
         *
         */
        __egretProto__.showPath = function (visible) {
            if (visible === void 0) { visible = true; }
            this._isShowPath = visible;
            if (this._isShowPath) {
                if (!this._pathShape) {
                    this._pathShape = new egret.Shape();
                    this._mapContainer.addChild(this._pathShape);
                }
                this.setMapLayer();
                this._pathShape.visible = true;
            }
            else if (this._pathShape) {
                this._pathShape.graphics.clear();
                this._pathShape.visible = false;
            }
        };
        //
        /**
         * 绘制或清除路径
         * @param nodes:Vector.<IsoNode> 为null时清除路径
         *
         */
        __egretProto__.drawPath = function (nodes) {
            this._pathShape.graphics.clear();
            if (!this._isShowPath)
                return;
            var length = 0;
            var node = null;
            var nextNode = null;
            var point = null;
            if (nodes)
                length = nodes.length - 1;
            else
                return;
            this._pathShape.graphics.lineStyle(this._pathThickness, this._pathColor, 1, true, "none");
            for (var i = 0; i < length; i++) {
                node = nodes[i];
                nextNode = nodes[i + 1];
                if (!node || !nextNode)
                    break;
                point = this.getIsoPoint(node.row, node.column);
                this._pathShape.graphics.moveTo(point.x, point.y);
                point = this.getIsoPoint(nextNode.row, nextNode.column);
                this._pathShape.graphics.lineTo(point.x, point.y);
            }
        };
        //
        /**
         * 获取等角投影矩形的中心点
         * @param row:Number 行索引
         * @param column:Number 列索引
         * @return
         *
         */
        __egretProto__.getIsoPoint = function (row, column) {
            var y = row * this._halfSize;
            var x = column * this._isoSize2;
            //奇数行，节点坐标向前一个单位
            if (row % 2 == 1)
                x += this._isoSize;
            return new egret.Point(x, y);
        };
        //
        /**
         * 设置节点颜色
         * @param row:Number 行索引
         * @param column:Number 列索引
         * @param color:uint 颜色
         * @param info:String = null 显示的信息
         *
         */
        __egretProto__.setTileColor = function (row, column, color, info) {
            if (info === void 0) { info = null; }
            //行列可能超出范围，仅内部使用不作判断限制
            if (this._mapTiles && this._mapTiles[row])
                var tile = this._mapTiles[row][column];
            if (!tile)
                return;
            tile.color = color;
            if (info) {
                var infoText = (tile.getChildByName("infoText"));
                if (!infoText) {
                    infoText = new egret.TextField();
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
            }
            else {
                infoText = (tile.getChildByName("infoText"));
                if (infoText && infoText.parent)
                    infoText.parent.removeChild(infoText);
            }
        };
        //
        /**
         * 设置方块标记
         * @param row:Number
         * @param column:Number
         *
         */
        __egretProto__.showTileText = function (row, column) {
            if (this._mapTiles && this._mapTiles[row])
                var tile = this._mapTiles[row][column];
            if (!tile)
                return;
            var textField = (tile.getChildByName("textField"));
            if (!textField) {
                textField = new egret.TextField();
                //textField.defaultTextFormat = new TextFormat(null,10,0xffffff);
                tile.addChild(textField);
            }
            //textField.autoSize = "left";
            textField.text = row + "-" + column;
            textField.x = (-textField.width) / 2;
            textField.y = (-textField.height) / 2;
        };
        //
        /**
         * 检测方块是否在矩形中，不在则从显示列表移除
         * @param rect:Rectangle
         *
         */
        __egretProto__.checkTiles = function (rect) {
            if (!this._isShowTile)
                return;
            var row = this._mapTiles.length;
            var column = this._mapTiles[0].length;
            for (var i = 0; i < row; i++) {
                for (var j = 0; j < column; j++) {
                    var tile = this._mapTiles[i][j];
                    if (rect.containsPoint(tile.point)) {
                        if (tile.parent != this._mapTileContainer) {
                            this._mapTileContainer.addChild(tile);
                        }
                    }
                    else if (tile.parent) {
                        tile.parent.removeChild(tile);
                    }
                }
            }
        };
        //
        /**
         * 绘制视口矩形
         *
         */
        __egretProto__.drawView = function () {
            if (!this._isShowView)
                return;
            egret.DisplayObjectUtil.drawRectBorder(this._viewShape, this._viewWidth, this._viewHeight, 0x00ff00, 1, 2);
            this._viewShape.graphics.moveTo(0, 0);
            this._viewShape.graphics.lineTo(this._viewWidth, this._viewHeight);
            this._viewShape.graphics.moveTo(0, this._viewHeight);
            this._viewShape.graphics.lineTo(this._viewWidth, 0);
        };
        /**
         * 设置更新属性类型数据
         * @param property:String 需要更新的属性
         * @param updated:Boolean 标记是否需要更新
         *
         */
        __egretProto__.setUpdateData = function (property, updated) {
            if (updated === void 0) { updated = true; }
            this._updateData[property] = updated;
        };
        //
        /**
         * 获取更新数据，多个属性时用||运算，只要有一个属性为true则返回true
         * @param args 需要更新的属性列表
         * @return
         *
         */
        __egretProto__.getUpdateData = function (attrs) {
            var result = false;
            if (this._updateData) {
                var length = attrs.length;
                for (var i = 0; i < length; i++) {
                    var v = attrs[i];
                    result = result || this._updateData[v];
                    if (result)
                        break;
                }
            }
            return result;
        };
        //
        /**
         * 添加至舞台
         * @param e
         *
         */
        __egretProto__.thisAddedToStage = function (e) {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.thisAddedToStage, this);
            this._stage = this.stage;
            //更新全局原点和中心点
            this.localToGlobal(0, 0, this._oPoint);
            this.localToGlobal(this._viewWidth / 2, this._viewHeight / 2, this._cPoint);
            this.addListeners();
        };
        //
        /**
         * 添加内部事件
         *
         */
        __egretProto__.addListeners = function () {
        };
        /**
         * 初始化地图
         *
         */
        __egretProto__.initMap = function () {
        };
        //
        /**
         * 选中节点
         * @param row:Number 行索引
         * @param column:Number 列索引
         *
         */
        __egretProto__.selectedTile = function (row, column) {
            //行列可能超出范围，仅内部使用不作判断限制
            if (this._mapTiles)
                var tile = this._mapTiles[row][column];
            if (!tile)
                return;
            tile.color = 0xffff00;
            if (this._lastTileMap && this._lastTileMap != tile)
                this._lastTileMap.color = 0x666666;
            this._lastTileMap = tile;
        };
        //
        /**
         * 绘制渲染区域矩形
         *
         */
        __egretProto__.drawRenderRect = function () {
            if (!this._isShowRender)
                return;
            var rect = this.renderRect;
            this._renderShape.graphics.clear();
            this._renderShape.graphics.beginFill(0xff0000, 0.3);
            this._renderShape.graphics.lineStyle(3, 0xff0000, 1);
            this._renderShape.graphics.drawRect(rect.x, rect.y, rect.width, rect.height);
            this._renderShape.graphics.endFill();
        };
        //
        /**
         * 绘制地图交互区域矩形
         *
         */
        __egretProto__.drawMapRect = function () {
            this._mapTileContainer.graphics.clear();
            //与节点的显示互斥
            if (this._isShowTile)
                return;
            if (!this._isDrawInteractive)
                return;
            var rect = this.renderRect;
            this._mapTileContainer.graphics.beginFill(0x666666, this._renderRectAlpha);
            this._mapTileContainer.graphics.drawRect(rect.x, rect.y, rect.width, rect.height);
            this._mapTileContainer.graphics.endFill();
        };
        //
        /**
         * 限制最小值和最大值
         * @param value:Number
         * @param min:Number
         * @param max:Number
         * @return
         *
         */
        __egretProto__.limitValue = function (value, min, max) {
            if (value < min)
                value = min;
            if (value > max)
                value = max;
            return value;
        };
        //
        /**
         * 设置各层位置
         *
         */
        __egretProto__.setMapLayer = function () {
            var array = [this._sceneContainer, this._renderShape, this._pathShape];
            var target = null;
            for (var i = 0; i < array.length; i++) {
                target = array[i];
                while (!target || target.parent != this._mapContainer) {
                    array.splice(i, 1);
                    target = array[i];
                    if (array.length == 0)
                        break;
                }
                if (target && target.parent == this._mapContainer) {
                    this._mapContainer.setChildIndex(target, i);
                }
            }
        };
        ////////////////////以下为场景层容器，预留功能
        /**
         * 获取场景中的层级容器，容器层级会自动调整到层级所在位置
         * @param layerType:Number 层级
         * @see SceneLayerType
         * @return
         *
         */
        __egretProto__.getLayerContainer = function (layerType) {
            if (!this.layerConfigs) {
                egret.LogManager.error(this, "层级配置属性layerConfigs未设置.");
                return null;
            }
            var container = null;
            container = this._layerHashMap.get(layerType);
            if (!container) {
                var layerConfig = this.layerConfigs[layerType];
                container = new egret.DisplayObjectContainer();
                container.name = "sceneContainerLayer" + layerType;
                container.touchEnabled = layerConfig.touchEnabled;
                container.touchChildren = layerConfig.touchChildren;
                this._sceneContainer.addChild(container);
                this._layerHashMap.put(layerType, container);
                var keys = this._layerHashMap.keys();
                keys.sort(egret.ArrayUtil.numeric);
                var length = keys.length;
                for (var i = 0; i < length; i++) {
                    this._sceneContainer.setChildIndex(this._layerHashMap.get(keys[i]), i);
                }
            }
            return container;
        };
        //
        /**
         * 设置显示对象在场景上的层级并添加到显示列表中，
         * @param target:DisplayObject 显示对象
         * @param layerType:Number 层级 @see SceneLayerType
         * @param x:Number = int.MAX_VALUE 不为int.MAX_VALUE时设置
         * @param y:Number = int.MAX_VALUE 不为int.MAX_VALUE时设置
         * @see #hide()
         */
        __egretProto__.show = function (target, layerType, x, y) {
            if (x === void 0) { x = NaN; }
            if (y === void 0) { y = NaN; }
            var container = this.getLayerContainer(layerType);
            if (container && target.parent != container)
                container.addChild(target);
            if (!isNaN(x))
                target.x = x;
            if (!isNaN(y))
                target.y = y;
        };
        //
        /**
         * 从场景上移除显示对象
         * @param target:DisplayObject 已呈现在地图上的显示对象
         * @see #show()
         */
        __egretProto__.hide = function (target) {
            if (!target)
                return;
            if (target.parent)
                target.parent.removeChild(target);
        };
        return IsoMapRender;
    })(egret.CoreContainer);
    egret.IsoMapRender = IsoMapRender;
    IsoMapRender.prototype.__class__ = "egret.IsoMapRender";
})(egret || (egret = {}));
//# sourceMappingURL=IsoMapRender.js.map