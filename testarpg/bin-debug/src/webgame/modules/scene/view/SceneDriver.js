var egret;
(function (egret) {
    var SceneDriver = (function (_super) {
        __extends(SceneDriver, _super);
        /**
         * 构造函数
         */
        function SceneDriver() {
            _super.call(this);
            //导航数据
            this._navigatorItems = null;
            //当前导航对象
            this._currentNaviItem = null;
            //向上层导航对象
            this._upperNaviItem = null;
            //当前导航对象索引
            this._navigateIndex = -1;
            //最后一次导航坐标点
            this._lastNaviPoint = null;
            //到达场景元素周围的半径
            this._elementRadius = 1;
            //场景数据 id
            this._mapId = 0;
            this._lastNaviPoint = new egret.Point();
            this._navigatorItems = [];
        }
        var __egretProto__ = SceneDriver.prototype;
        //
        /**
         * 加载场景地图数据
         *
         */
        __egretProto__.loadData = function (id) {
            this._mapId = id;
            var lo = egret.IsoMapData.getInstance().getData(id);
            if (lo) {
                this.initData(lo);
            }
            else {
                var path = egret.PathData.PATH_MAP_DATA;
                var fileName = id + egret.ExtensionType.JSON;
                var url = egret.dataManager().pathData.getResourceUrl(path, fileName);
                //ResoureManager.getInstance().loadUrl(url,id + "",UrlType.MAP_DATA,this.loadCompleteData,this.getText(LanguageId.ID_SCENE,"loadDataLabel"));
                egret.ResoureManager.getInstance().loadMapData(url, id, this.loadCompleteData, this);
            }
        };
        //
        /**
         * 主角跳转至场景x,y处
         * @param x
         * @param y
         *
         */
        __egretProto__.gotoXY = function (x, y) {
            if (y === void 0) { y = 0; }
            this._isoMap.gotoXY(x, y);
            //(<Role><any> (this._role)).showPlayer(this,x,y);
            egret.RoleManager.getInstance().showPlayer(this, x, y);
        };
        //
        /**
         * 加载场景地图数据完成
         * @param loadDataItem
         *
         */
        __egretProto__.loadCompleteData = function () {
            this.loadData(this._mapId);
        };
        //
        __egretProto__.initData = function (data) {
            _super.prototype.initData.call(this, data);
            //Role.getInstance().hidePlayer();
            //this.setRole(Role.getInstance());
            egret.RoleManager.getInstance().hidePlayer();
            this.setRole(egret.RoleManager.getInstance().role);
            egret.TimerManager.getInstance().addExecute(this.changeScene, this, 1000, null, 1);
        };
        //
        /**
         * 设置主角场景元素，应在初始化数据后设置
         * @param role:ElementPlayer 主角场景元素
         *
         */
        __egretProto__.setRole = function (role) {
            _super.prototype.setRole.call(this, role);
            this._role.scene = this;
            this._role.movingHandler = this.roleMoving;
            //this._role.nodeChangedHandler = this.nodeChanged;
            this._role.onStopMove = this.onStopMove;
        };
        /**
         * 调用 stopMove() 时回调函数
         * @param target
         *
         */
        __egretProto__.onStopMove = function (target) {
        };
        /**
         * 节点改变时
         * @param target 节点改变的目标对象
         * return 是否允许移动
         */
        __egretProto__.nodeChanged = function (target) {
            return true;
        };
        //
        /**
         * 移动场景元素
         * @param id:String 元素id(lo或vo的id)
         * @param x:int
         * @param y:int
         *
         */
        __egretProto__.moveElement = function (id, x, y) {
            if (y === void 0) { y = 0; }
            var mover = this._elementsIdMap.get(id);
            if (mover) {
                mover.speed = this.getElementSpeed();
                mover.moveTo(x, y);
            }
        };
        //
        /**
         * 导航至当前场景中的元素，元素可以是非固定场景元素
         * @param id:Number 元素lo或vo中的id
         *
         */
        __egretProto__.navigateToElement = function (id) {
            if (!this._currentNaviItem) {
                this._currentNaviItem = new egret.SceneNavigatorDataItem();
            }
            this._currentNaviItem.elementId = id;
            var point = this.getElementPoint(id + "");
            this.navigateTo(point.x, point.y);
        };
        //
        /**
         * 导航至当前场景中的坐标
         * @param x:Number
         * @param y:Number
         *
         */
        __egretProto__.navigateTo = function (x, y) {
            if (this.checkArriveNaviPoint())
                return;
            if (!this._currentNaviItem) {
                this._currentNaviItem = new egret.SceneNavigatorDataItem();
                this._currentNaviItem.x = x;
                this._currentNaviItem.y = y;
            }
            this._lastNaviPoint.x = x;
            this._lastNaviPoint.y = y;
            //this._role.moveTo2(x,y);
            egret.RoleManager.getInstance().moveTo3(x, y);
            this._isoMap.setCurrentMapXY(x, y);
        };
        //
        /**
         * 跨场景导航
         * @param sceneId:Number = -1 场景id，指定此参数时，elementId参数无效，可指定x,y
         * @param elementId:Number = -1 目标场景元素id，为场景固定元素id，指定此参数场景id使用-1才有效，已指定此参数时后面的参数无效
         * @param x:Number = -1 目标场景x
         * @param y:Number = -1 目标场景y
         *
         */
        __egretProto__.navigate = function (sceneId, elementId, x, y) {
            if (sceneId === void 0) { sceneId = -1; }
            if (elementId === void 0) { elementId = -1; }
            if (x === void 0) { x = -1; }
            if (y === void 0) { y = -1; }
        };
        //
        __egretProto__.navigateToItem = function (naviItem) {
            this.navigate(naviItem.sceneId, naviItem.elementId, naviItem.x, naviItem.y);
        };
        //
        /**
         * 主角移动
         *
         */
        __egretProto__.roleMoving = function () {
            this._isoMap.setMapXY(this._roleOffsetX - this._role.x, this._roleOffsetY - this._role.y);
        };
        //
        /**
         * 清空场景
         *
         */
        __egretProto__.clearScene = function () {
            _super.prototype.clearScene.call(this);
            this._currentNaviItem = null;
            //if(this._role)
            //	(<Role><any> (this._role)).changeScene(this);
            egret.RoleManager.getInstance().changeScene(this);
        };
        //
        /**
         * 根据导航数据进行导航
         * @param items:Array 导航数据数组
         *
         */
        __egretProto__.navigateByItems = function (items) {
            if (!items) {
                egret.LogManager.error(this, "导航数据项目数组为空");
                return;
            }
            this._navigatorItems = items;
            this._navigateIndex = -1;
            this.navigateToNextItem();
        };
        //
        /**
         * 进行下一个导航点
         *
         */
        __egretProto__.navigateToNextItem = function () {
            this._navigateIndex++;
            if (this._navigateIndex >= this._navigatorItems.length) {
                this._currentNaviItem = null;
                this._lastNaviPoint.x = 0;
                this._lastNaviPoint.y = 0;
                if (this._navigatorItems.length > 0) {
                    //this._role.stopMove();
                    egret.RoleManager.getInstance().stopMove();
                }
                return;
            }
            this._currentNaviItem = this._navigatorItems[this._navigateIndex];
            if (this._currentNaviItem.elementId != -1) {
                this.navigateToElement(this._currentNaviItem.elementId);
            }
            else if (this._currentNaviItem.x != -1 && this._currentNaviItem.y != -1) {
                this.navigateTo(this._currentNaviItem.x, this._currentNaviItem.y);
            }
            else {
                egret.LogManager.error(this, "导航数据有误");
            }
        };
        //
        __egretProto__.addEvents = function () {
            _super.prototype.addEvents.call(this);
            var container = this._isoMap.getLayerContainer(egret.SceneLayerType.BIOLOGY);
            container.addEventListener(egret.TouchEvent.TOUCH_TAP, this.biologyContainerClick, this);
            //按下即走，点击不处理
            this._isoMap.addEventListener(egret.IsoMapEvent.ISO_MAP_MOVING_START, this.isoMapTileMovingStart, this);
        };
        //
        __egretProto__.remove = function () {
            _super.prototype.remove.call(this);
            var container = this._isoMap.getLayerContainer(egret.SceneLayerType.BIOLOGY);
            container.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.biologyContainerClick, this);
            this._isoMap.removeEventListener(egret.IsoMapEvent.ISO_MAP_MOVING_START, this.isoMapTileMovingStart, this);
            if (this._role) {
                this._role.movingHandler = null;
                this._role.nodeChangedHandler = null;
                this._role.onStopMove = null;
            }
        };
        //
        /**
         * 更新动态场景元素坐标为数据中的坐标，若未渲染则渲染此元素，若坐标已不在渲染区域，则移除此元素
         * @param item:SceneElementDataItem 场景元素数据
         *
         */
        __egretProto__.updateElement = function (item) {
            var rect = this._isoMap.renderRect;
            var vo = item.vo;
            if (rect.contains(vo.x, vo.y)) {
                var element = this.getElement(vo.idString);
                if (element) {
                    element.updateXY();
                }
                else {
                    this.renderElement(item);
                }
            }
            else {
            }
        };
        //
        /**
         * 添加场景元素
         * @param target:DisplayObject 场景元素
         * @param layerType:int 层级 SceneLayerType  @see SceneLayerType
         * @param x:Number = NaN x坐标，不为NaN时设置
         * @param y:Number = NaN y坐标，不为NaN时设置
         * @return
         *
         */
        __egretProto__.addElement = function (target, layerType, x, y) {
            if (x === void 0) { x = NaN; }
            if (y === void 0) { y = NaN; }
            var mover = (_super.prototype.addElement.call(this, target, layerType, x, y));
            if (mover instanceof egret.SceneElement) {
                mover.scene = this;
            }
            if (mover instanceof egret.SceneElementMover) {
                mover.movingEndHandler = this.elementMovingEnd;
            }
            return mover;
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
            var mover = (_super.prototype.removeElement.call(this, target, isRecover));
            if (mover instanceof egret.SceneElement) {
                mover.scene = null;
            }
            if (mover instanceof egret.SceneElementMover) {
                mover.movingEndHandler = null;
                mover.nodeChangedHandler = null;
            }
            return mover;
        };
        //
        /**
         * 点击场景元素
         * @param target:SceneElement 场景元素
         *
         */
        __egretProto__.clickElement = function (target) {
        };
        //
        /**
         * 场景元素移动结束
         * @param target:SceneElement 场景元素
         *
         */
        __egretProto__.elementMovingEnd = function (target) {
        };
        //
        /**
         * 获取场景元素坐标点
         * @return
         *
         */
        __egretProto__.getElementPoint = function (id) {
            return null;
        };
        //
        /**
         * 生物层点击
         * @param e
         *
         */
        __egretProto__.biologyContainerClick = function (e) {
            var target = (e.target);
            if (target)
                this.clickElement(target);
        };
        //
        /**
         * 持续按下鼠标
         * @param event
         *
         */
        __egretProto__.isoMapTileMovingStart = function (event) {
            return;
            this.startMove();
        };
        //
        /**
         * 检测是否已到达导航点
         * @return
         *
         */
        __egretProto__.checkArriveNaviPoint = function (elementId) {
            if (elementId === void 0) { elementId = 0; }
            if (elementId != 0) {
                this._currentNaviItem = new egret.SceneNavigatorDataItem();
                this._currentNaviItem.elementId = elementId;
            }
            if (this._currentNaviItem) {
                if (this._currentNaviItem.elementId != 0) {
                    var point = this.getElementPoint(this._currentNaviItem.elementId + "");
                }
                else if (this._currentNaviItem && this._currentNaviItem.x != -1 && this._currentNaviItem.y != -1) {
                    point = new egret.Point(this._currentNaviItem.x, this._currentNaviItem.y);
                }
            }
            //LogManager.debug(this,"checkArriveNaviPoint , item = " + this._currentNaviItem);
            if (this._role && point) {
                var distance = egret.Point.distance(point, new egret.Point(this._role.x, this._role.y));
                //LogManager.debug(this,"checkArriveNaviPoint , distance = " + distance);
                if (distance < this._elementRadius) {
                    //					if(this.hasEventListener(SceneEvent.SCENE_ARRIVE_NAVI_POINT)){
                    var data = this._currentNaviItem;
                    this._currentNaviItem = null;
                    //this.dispatchEvent(new SceneEvent(SceneEvent.SCENE_ARRIVE_NAVI_POINT,false,false,data));
                    //内存优化
                    if (this.arriveNaviPointHandler)
                        this.arriveNaviPointHandler(data);
                    return true;
                }
            }
            return false;
        };
        //
        /**
         * 玩家主动开始移动
         *
         */
        __egretProto__.startMove = function () {
            this._currentNaviItem = null;
            this._lastNaviPoint.x = 0;
            this._lastNaviPoint.y = 0;
            this._navigatorItems.length = 0;
            this._upperNaviItem = null;
            if (this._role) {
                //this._role.moveTo2(this._isoMap.currentMapX,this._isoMap.currentMapY);
                egret.RoleManager.getInstance().moveTo3(this._isoMap.currentMapX, this._isoMap.currentMapY);
            }
        };
        //
        /**
         * 主角线路改变
         * @param event
         *
         */
        __egretProto__.sceneElementPathChanged = function (event) {
            _super.prototype.sceneElementPathChanged.call(this, event);
        };
        //
        /**
         * 场景改变时处理
         *
         */
        __egretProto__.changeScene = function () {
        };
        /**
         * 检测鼠标点击影片加载完成时
         *
         */
        __egretProto__.checkMousePoint = function () {
        };
        //
        /**
         * 移除一个玩家
         * @param id
         *
         */
        __egretProto__.removePlayer = function (id) {
        };
        return SceneDriver;
    })(egret.SceneRender);
    egret.SceneDriver = SceneDriver;
    SceneDriver.prototype.__class__ = "egret.SceneDriver";
})(egret || (egret = {}));
