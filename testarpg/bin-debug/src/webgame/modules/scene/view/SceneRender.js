var egret;
(function (egret) {
    var SceneRender = (function (_super) {
        __extends(SceneRender, _super);
        /**
         * 构造函数
         */
        function SceneRender() {
            _super.call(this, egret.ApplicationLayerType.BOTTOM);
            //渲染区域和视口的水平偏移量和垂直偏移量
            this.RENDER_OFFSET_WIDTH = 100;
            this.RENDER_OFFSET_HEIGHT = 100;
            //生物层排序时间间隔
            this.DELAY_SORT = 8;
            //路径类型，用于观察测试
            this.PATH_TYPES = [{ label: "不可通过", data: { type: egret.PathType.OBSTACLE, color: 0xff0000 } }, { label: "可行走", data: { type: egret.PathType.WALKABLE, color: 0x0 } }, { label: "透明", data: { type: egret.PathType.TRANSPARENT, color: 0xff } }];
            //视口宽高
            this._viewWidth = 600;
            this._viewHeight = 400;
            //等角地图
            this._isoMap = null;
            //碎片地图
            this._pieceMap = null;
            //场景元素数据id对应的元素表
            this._elementsIdMap = null;
            //场景元素数据，标记是否已渲染此元素
            this._elementsMap = null;
            //生物层元素表
            this._biologyMap = null;
            //生物层元素表索引，用于缓存机制
            this._biologyIndex = 0;
            //是否已清除地图
            this._isClear = false;
            //主角
            this._role = null;
            //主角在场景上的偏移量，超过时地图移动
            this._roleOffsetX = 0;
            this._roleOffsetY = 0;
            //场景编辑数据
            this._sceneEditLo = null;
            //排序字段
            this._sortFields = null;
            //排序表，用于优化排序场景元素
            this._indexMap = null;
            this._elementsIdMap = new egret.HashMap();
            this._elementsMap = new egret.HashMap();
            this._indexMap = new egret.HashMap();
            this._biologyMap = [];
            this._sortFields = ["depth", "id"];
        }
        var __egretProto__ = SceneRender.prototype;
        Object.defineProperty(__egretProto__, "isoMap", {
            //
            /**
             * 等角地图，用于地图相关操作，如移动等
             * @return
             *
             */
            get: function () {
                return this._isoMap;
            },
            enumerable: true,
            configurable: true
        });
        //
        /**
         * 获取生物层所有元素
         * @returns {Array<any>}
         */
        __egretProto__.getBiologyMap = function () {
            return this._biologyMap;
        };
        /**
         * 初始化数据
         * @param data:SceneEditLo 地图编辑数据
         *
         */
        __egretProto__.initData = function (data) {
            this._sceneEditLo = data;
            this.clearScene();
            this.setRoleViewProperties();
            this._isoMap.setProperties(data.width, data.height, data.gridSize, this._viewWidth, this._viewHeight);
            this._isoMap.setMapNodes(data.nodeTypes);
            //			this._isoMap.setMapNodes2(data.width,data.height,PathType.WALKABLE);
            this._pieceMap.initData(data);
            this._isClear = false;
        };
        //
        /**
         * 设置主角场景元素，应在初始化数据后设置
         * @param role:ElementPlayer 主角场景元素
         *
         */
        __egretProto__.setRole = function (role) {
            this._role = role;
            this._role.addEventListener(egret.SceneElementEvent.SCENE_ELEMENT_PATH_CHANGED, this.sceneElementPathChanged, this);
        };
        //
        /**
         * 坐标是否在渲染区域中
         * @param x:int x坐标
         * @param y:int y坐标
         * @return
         *
         */
        __egretProto__.isInRenderRect = function (x, y) {
            if (y === void 0) { y = 0; }
            var rect = this._isoMap.renderRect;
            return rect.contains(x, y);
        };
        //
        /**
         * 添加场景元素
         * @param target:DisplayObject 场景元素
         * @param layerType:int 层级 SceneLayerType  @see SceneLayerType
         * @param x:Number = int.MAX_VALUE x坐标，不为 int.MAX_VALUE 时设置
         * @param y:Number = int.MAX_VALUE y坐标，不为 int.MAX_VALUE 时设置
         * @return
         *
         */
        __egretProto__.addElement = function (target, layerType, x, y) {
            if (x === void 0) { x = NaN; }
            if (y === void 0) { y = NaN; }
            if (this._elementsMap.containsKey(target.hashCode))
                return null;
            this._isoMap.show(target, layerType, x, y);
            var id = null;
            if (target instanceof egret.SceneElement) {
                id = target.id;
                if (target instanceof egret.SceneElementMover) {
                    var mover = target;
                    mover.setMapData(this._isoMap);
                    //mover.speed = this.getElementSpeed();
                    if (!isNaN(x) && !isNaN(y))
                        mover.setXY(x, y);
                }
                target.addToScene();
            }
            else {
                id = target.name;
            }
            if (id == null) {
                throw new Error("场景元素 id 不能为空");
            }
            this._elementsMap.put(target.hashCode, true);
            this._elementsIdMap.put(id, target);
            if (layerType == egret.SceneLayerType.BIOLOGY) {
                this._biologyMap[this._biologyIndex] = target;
                this._biologyIndex++;
                this._indexMap.put(target.hashCode, target.parent.getChildIndex(target));
            }
            return target;
        };
        //
        /**
         * 获取场景元素速度
         * @return
         *
         */
        __egretProto__.getElementSpeed = function () {
            egret.LogManager.error(this, "子类应重写此方法");
            return 0;
        };
        //
        /**
         * 移除场景元素
         * @param target:DisplayObject 场景元素
         * @param isRecover:Boolean = true 是否自动回收，特殊元素不回收，直接移除，如鼠标点击影片
         * @return
         *
         */
        __egretProto__.removeElement = function (target, isRecover) {
            if (isRecover === void 0) { isRecover = true; }
            if (!target)
                return target;
            var onStage = target.stage != null;
            this._isoMap.hide(target);
            var id = null;
            if (target instanceof egret.SceneElement) {
                id = target.id;
                target.removeFromScene();
            }
            else {
                id = target.name;
            }
            this._elementsMap.remove(target.hashCode);
            this._elementsIdMap.remove(id);
            this.removeBiology(target);
            if (isRecover && onStage && target instanceof egret.SceneElement)
                this.recoverElement(target);
            return target;
        };
        //
        /**
         * 从数组中移除生物层元素
         * @param target
         *
         */
        __egretProto__.removeBiology = function (target) {
            if (!target)
                return;
            var length = this._biologyIndex;
            var index = 0;
            for (var i = 0; i < length; i++) {
                if (target == this._biologyMap[i]) {
                    index = length - 1;
                    //缓存机制，将最后一个与当前项目交换
                    if (i < index) {
                        this._biologyMap[i] = this._biologyMap[index];
                    }
                    this._biologyMap[index] = null;
                    this._biologyIndex--;
                    break;
                }
            }
            if (this._biologyIndex < 0) {
                throw new Error("removeBiology");
            }
            this._indexMap.remove(target.hashCode);
        };
        //
        /**
         * 回收场景元素
         * @param element:SceneElement 场景元素
         *
         */
        __egretProto__.recoverElement = function (element) {
            //子类重写
        };
        //
        /**
         * 根据id移除场景元素
         * @param id:String 场景元素id
         * @return
         *
         */
        __egretProto__.removeElementById = function (id) {
            var target = this._elementsIdMap.remove(id);
            this._elementsMap.remove(target.hashCode);
            this.removeBiology(target);
            if (!target)
                return null;
            return this.removeElement(target);
        };
        //
        /**
         * 获取当前显示的场景元素
         * @param id:String 场景元素id
         * @return
         *
         */
        __egretProto__.getElement = function (id) {
            return this._elementsIdMap.get(id);
        };
        //
        /**
         * 根据数据项目渲染场景元素
         * @param item:SceneElementDataItem 场景元素数据项目
         *
         */
        __egretProto__.renderElement = function (item) {
        };
        //
        /**
         * 静态场景元素渲染
         * @param rect:Rectangle 渲染区域
         *
         */
        __egretProto__.renderFixedElements = function (rect) {
            //子类重写
        };
        //
        /**
         * 渲染动态场景元素
         * @param rect:Rectangle 渲染区域
         */
        __egretProto__.renderDynamicElements = function (rect) {
        };
        //
        /**
         * 静态(坐标不变)场景元素数据表
         * @return
         *
         */
        __egretProto__.getFixedElementMap = function () {
            //子类重写
            return null;
        };
        //
        /**
         * 渲染场景元素
         * @param type:int 场景类型 SceneElementType
         * @param id:String vo或lo中的id
         * @param x:Number = NaN x坐标，不为NaN时设置
         * @param y:Number = NaN y坐标，不为NaN时设置
         * @param lo:SceneElementLo = null 场景元素 lo
         * @param vo:SceneElementVo = null 场景元素 vo
         * @return
         *
         */
        __egretProto__.renderElementInternal = function (type, data, layerType) {
            //子类重写
            return null;
        };
        //
        /**
         * 清空场景
         *
         */
        __egretProto__.clearScene = function () {
            this._isClear = true;
            this._pieceMap.clearMap();
            var values = this._elementsIdMap.values();
            var length = values.length;
            for (var i = 0; i < length; i++) {
                var target = values[i];
                this.removeElement(target);
            }
        };
        //
        __egretProto__.initWindow = function () {
            _super.prototype.initWindow.call(this);
            this._pieceMap = new egret.PieceMap2();
            this._pieceMap.rootPath = egret.dataManager().pathData.getResourceUrl(egret.PathData.PATH_MAP);
            //this._pieceMap.version = "?version=" + WebData.getInstance().configLo.version;
            this._isoMap = new egret.IsoMap(0, 0, 0, 0, 0, this.RENDER_OFFSET_WIDTH, this.RENDER_OFFSET_HEIGHT);
            this._isoMap.pathPolicy = egret.PathPolicyType.ALL;
            //this._isoMap.showMapTile(true);
            this._isoMap.showPath(false);
            //									_isoMap.showRenderRect(true);
            //									_isoMap.showViewport(true);
            //禁用交互绘制提高性能
            this._isoMap.isDrawInteractive = false;
            this.addChild(this._isoMap);
            var length = this.PATH_TYPES.length;
            for (var i = 0; i < length; i++) {
                var object = this.PATH_TYPES[i];
                this._isoMap.setTileTypeColor(object.data.type, object.data.color);
            }
            this._isoMap.pathTypes = [egret.PathType.WALKABLE, egret.PathType.TRANSPARENT];
            this._isoMap.speed = 6;
            //层级配置及组装
            this._isoMap.layerConfigs = egret.SceneLayerType.LAYER_MOUSE_CONFIGS;
            this._isoMap.show(this._pieceMap, egret.SceneLayerType.NEARBY_VIEW);
            this._isoMap.show(this._isoMap.mapTileContainer, egret.SceneLayerType.NEARBY_VIEW);
            this.recall();
        };
        //
        __egretProto__.addEvents = function () {
            _super.prototype.addEvents.call(this);
            //this._isoMap.addEventListener(IsoMapEvent.ISO_MAP_RENDER_CHANGED,this.renderChangedHandler,this);
            this._isoMap.setRenderChangeHandler(this.renderChangedHandler, this);
            this._isoMap.addEventListener(egret.IsoMapEvent.ISO_MAP_PROPERTY_CHANGED, this.mapChanged, this);
            egret.ApplicationManager.getInstance().stage.addEventListener(egret.Event.RESIZE, this.stageResize, this);
            if (!egret.EnterFrameManager.getInstance().hasExecute(this._sortId))
                this._sortId = egret.EnterFrameManager.getInstance().addExecute(this.sortBiology, this, this.DELAY_SORT);
        };
        __egretProto__.remove = function () {
            _super.prototype.remove.call(this);
            //this._isoMap.removeEventListener(IsoMapEvent.ISO_MAP_RENDER_CHANGED,this.renderChangedHandler,this);
            this._isoMap.setRenderChangeHandler(null);
            if (this._role)
                this._role.removeEventListener(egret.SceneElementEvent.SCENE_ELEMENT_PATH_CHANGED, this.sceneElementPathChanged, this);
            egret.ApplicationManager.getInstance().stage.removeEventListener(egret.Event.RESIZE, this.stageResize, this);
            egret.EnterFrameManager.getInstance().removeExecute(this._sortId);
            this.clearScene();
        };
        //
        __egretProto__.destroy = function () {
            if (this._isDestroy)
                return;
            this.clearScene();
            this._isoMap.destroy();
            this._pieceMap.destroy();
            _super.prototype.destroy.call(this);
        };
        //
        /**
         * 地图数据改变
         * @param e
         *
         */
        __egretProto__.mapChanged = function (e) {
            var length = this._biologyMap.length;
            for (var i = 0; i < length; i++) {
                var target = this._biologyMap[i];
                if (target instanceof egret.SceneElementMover) {
                    target.setMapData(this._isoMap);
                }
            }
        };
        //
        /**
         * 渲染区域更新事件
         * @param e
         *
         */
        __egretProto__.renderChangedHandler = function (isoMap) {
            //已清除地图时不进行渲染
            if (this._isClear)
                return;
            this.updateRenderRect();
        };
        //
        /**
         * 主角线路改变
         * @param event
         *
         */
        __egretProto__.sceneElementPathChanged = function (event) {
            if (this._role) {
                this._isoMap.pathNodes = this._role.pathNodes.concat();
                this._isoMap.drawCurrentPath();
            }
        };
        //
        /**
         * 渲染区域更新
         *
         */
        __egretProto__.updateRenderRect = function () {
            var rect = this._isoMap.renderRect;
            this._pieceMap.renderMap(this._isoMap.viewRect, rect);
            this.renderFixedElements(rect);
            this.renderDynamicElements(rect);
        };
        //
        /**
         * 生物层元素排序
         * @param isForcible:Boolean = false 是否忽略时间间隔强制排序
         *
         */
        __egretProto__.sortBiology = function (isForcible) {
            if (isForcible === void 0) { isForcible = false; }
            if (this._biologyIndex > 1)
                this._biologyMap.sort(this.sortElement);
            var container = this._isoMap.getLayerContainer(egret.SceneLayerType.BIOLOGY);
            var length = this._biologyIndex;
            var se = null;
            for (var i = 0; i < length; i++) {
                se = this._biologyMap[i];
                if (se && this._indexMap.get(se.hashCode) != i) {
                    this._indexMap.put(se.hashCode, i);
                    container.setChildIndex(se, i);
                }
            }
        };
        //
        /**
         * 深度排序
         * @param a
         * @param b
         * @returns {number}
         */
        __egretProto__.sortElement = function (a, b) {
            if (!a || !b)
                return 0;
            var ad = a.getDepth();
            var bd = b.getDepth();
            if (ad > bd) {
                return 1;
            }
            else if (ad < bd) {
                return -1;
            }
            else {
                return 0;
            }
        };
        /**舞台尺寸改变  */
        __egretProto__.stageResize = function (e) {
            //			this.setRoleViewProperties();
            if (e === void 0) { e = null; }
            //			if(this._sceneEditLo){
            //				if(this._role)
            //					this._isoMap.setCurrentMapXY(this._role.x,this._role.y);
            //				this._isoMap.setProperties(this._sceneEditLo.width,this._sceneEditLo.height,this._sceneEditLo.gridSize,this._viewWidth,this._viewHeight);
            //			}
        };
        /**更新视口数据 */
        __egretProto__.setRoleViewProperties = function () {
            this._viewWidth = egret.ApplicationManager.getInstance().stage.stageWidth;
            this._viewHeight = egret.ApplicationManager.getInstance().stage.stageHeight;
            this._roleOffsetX = this._viewWidth / 2;
            this._roleOffsetY = this._viewHeight / 2;
        };
        return SceneRender;
    })(egret.Window);
    egret.SceneRender = SceneRender;
    SceneRender.prototype.__class__ = "egret.SceneRender";
})(egret || (egret = {}));
//# sourceMappingURL=SceneRender.js.map