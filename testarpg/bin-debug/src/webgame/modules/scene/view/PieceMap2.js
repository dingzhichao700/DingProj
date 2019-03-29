var egret;
(function (egret) {
    var PieceMap2 = (function (_super) {
        __extends(PieceMap2, _super);
        /**
         * 构造函数
         */
        function PieceMap2() {
            _super.call(this);
            /**
             * 图片扩展名
             */
            this.extension = egret.ExtensionType.JPG;
            /**
             * 图片根目录
             */
            this.rootPath = "";
            //小地图名称，用于预显示
            this.MINI_MAP_NAME = "miniMap";
            //图片子目录，即图片所在的文件夹
            this._subPath = null;
            //地图宽高
            this._mapWidth = 0;
            this._mapHeight = 0;
            //碎片宽高
            this._pieceWidth = 0;
            this._pieceHeight = 0;
            //渲染矩形
            this._renderRect = null;
            //视口矩形
            this._viewRect = null;
            //排序时临时视口矩形中心点
            this._viewRectPoint = null;
            //碎片矩形
            this._pieceRect = null;
            //碎片行列总数
            this._totalRows = 0;
            this._totalColumns = 0;
            //渲染区域的开始行列和结束行列
            this._startRow = 0;
            this._startColumn = 0;
            this._endRow = 0;
            this._endColumn = 0;
            //已加载的图片碎片
            this._pieces = null;
            //已显示的图片碎片
            this._piecesAdded = null;
            //碎片url
            this._pieceUrls = null;
            //队列加载器
            this._queueLoader = null;
            //图片行列数据
            this._rcHashMap = null;
            //模糊地图加载器
            this._miniImage = null;
            //模糊地图
            //public _miniBitmap:Bitmap = null;
            //public _miniBmd:Texture = null;
            //已加载到的图片数量
            this._pieceCount = 0;
            //碎片总数
            this._pieceCountTotal = 0;
            //模糊地图复制时使用参数
            this._miniPoint = null;
            //模糊地图与实际地图比率
            this._miniScaleX = 1;
            this._miniScaleY = 1;
            //模糊地图矩形数据
            this._miniRect = null;
            this.touchEnabled = false;
            this.touchChildren = false;
            this._miniImage = new egret.Image(null, 0, 0, false, this, this.loadMiniComplete);
            //this._miniBitmap = new Bitmap();
            //this.addChild(this._miniBitmap);
            this._container = new egret.DisplayObjectContainer();
            this.addChild(this._container);
            this._renderRect = new egret.Rectangle();
            this._pieceRect = new egret.Rectangle();
            this._miniRect = new egret.Rectangle();
            this._viewRectPoint = new egret.Point();
            this._pieces = [];
            this._piecesAdded = [];
            this._pieceUrls = [];
            this._mapIds = [];
            this._rcHashMap = new egret.HashMap();
            this._mapCache = new egret.HashMap();
            this._miniPoint = new egret.Point();
            this._queueLoader = new egret.QueueLoader(1, this, this.loadComplete, this.loadError, this.loadProgress, this.loadAbort);
        }
        var __egretProto__ = PieceMap2.prototype;
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
        Object.defineProperty(__egretProto__, "renderRect", {
            get: function () {
                return this._renderRect;
            },
            /**
             * 渲染区域矩形
             * @param value:Rectangle
             *
             */
            set: function (value) {
                if (!value) {
                    this._renderRect.setEmpty();
                    this.updateRender();
                }
                else if (this._renderRect.x != value.x || this._renderRect.y != value.y || this._renderRect.width != value.width || this._renderRect.height != value.height) {
                    this._renderRect.x = value.x;
                    this._renderRect.y = value.y;
                    this._renderRect.width = value.width;
                    this._renderRect.height = value.height;
                    //this._miniBitmap.x = this._renderRect.x;
                    //this._miniBitmap.y = this._renderRect.y;
                    this.updateRender();
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 设置地图数据
         * @param mapWidth:int = 0 地图宽
         * @param mapHeight:int = 0 地图高
         * @param pieceWidth:int = 0 碎片宽
         * @param pieceHeight:int = 0 碎片高
         *
         */
        __egretProto__.setProperty = function (mapWidth, mapHeight, pieceWidth, pieceHeight) {
            if (mapWidth === void 0) { mapWidth = 0; }
            if (mapHeight === void 0) { mapHeight = 0; }
            if (pieceWidth === void 0) { pieceWidth = 0; }
            if (pieceHeight === void 0) { pieceHeight = 0; }
            var attrs = ["_mapWidth", "_mapHeight", "_pieceWidth", "_pieceHeight"];
            for (var p in arguments) {
                if (arguments[p] > 0)
                    this[attrs[p]] = arguments[p];
            }
            for (p in attrs) {
                if (this[attrs[p]] <= 0) {
                    egret.LogManager.error(this, "参数应大于0:" + attrs[p] + " = " + this[attrs[p]]);
                    return;
                }
            }
            this._totalRows = Math.ceil(this._mapHeight / this._pieceHeight);
            this._totalColumns = Math.ceil(this._mapWidth / this._pieceWidth);
            this._pieceCountTotal = this._totalRows * this._totalColumns;
            var config = {};
            config.resources = [];
            for (var i = 0; i < this._totalRows; i++) {
                if (this._pieces[i])
                    this._pieces[i].length = 0;
                else
                    this._pieces[i] = [];
                if (this._pieceUrls[i])
                    this._pieceUrls[i].length = 0;
                else
                    this._pieceUrls[i] = [];
                for (var j = 0; j < this._totalColumns; j++) {
                    this._pieceUrls[i][j] = this.rootPath + this._subPath + "/" + i + "_" + j + this.extension;
                    config.resources.push({
                        name: this._pieceUrls[i][j],
                        type: RES.ResourceItem.TYPE_IMAGE,
                        url: this._pieceUrls[i][j]
                    });
                }
            }
            //因egret2.0无法销毁未配置的资源，手动配置加载数据，用于销毁
            RES.parseConfig(config);
        };
        /**
         * 初始化数据
         * @param data:SceneEditLo 场景编辑数据
         *
         */
        __egretProto__.initData = function (data) {
            this._pieceCount = 0;
            this._subPath = data.id + "";
            this.setProperty(data.width, data.height, data.pieceWidth, data.pieceHeight);
            this._miniImage.width = data.width;
            this._miniImage.height = data.height;
            this._miniImage.url = this.rootPath + this._subPath + "/" + data.id + this.extension;
            this.addChildAt(this._miniImage, 0);
        };
        //
        /**
         * 渲染地图
         * @param viewRect:Rectangle 可视矩形
         * @param renderRect:Rectangle 渲染矩形
         *
         */
        __egretProto__.renderMap = function (viewRect, renderRect) {
            this._viewRect = viewRect;
            this.renderRect = renderRect;
        };
        //
        /**
         * 清空地图
         *
         */
        __egretProto__.clearMap = function () {
            this._queueLoader.clear();
            this._rcHashMap.clear();
            this._piecesAdded.length = 0;
            var target = null;
            var length = this._pieces.length;
            var subLength = 0;
            for (var i = 0; i < length; i++) {
                subLength = this._pieces[i].length;
                for (var j = 0; j < subLength; j++) {
                    target = this._pieces[i][j];
                    if (target) {
                        if (target.parent)
                            target.parent.removeChild(target);
                    }
                    this._pieces[i][j] = null;
                }
            }
            while (this._container.numChildren > 0) {
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
            if (this._mapCache.size() > 3) {
                this.removeCache(this._mapIds.shift());
            }
            if (this._miniImage.content) {
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
        };
        //
        __egretProto__.destroy = function () {
            if (this._isDestroy)
                return;
            _super.prototype.destroy.call(this);
        };
        //
        /**
         * 更新渲染区域
         *
         */
        __egretProto__.updateRender = function () {
            var x = this._renderRect.x;
            var y = this._renderRect.y;
            //新区域
            var endY = y + this._renderRect.height;
            var endX = x + this._renderRect.width;
            //Math.floor
            this._startRow = (y / this._pieceHeight) | 0;
            this._startColumn = (x / this._pieceWidth) | 0;
            this._endRow = Math.ceil(endY / this._pieceHeight);
            this._endColumn = Math.ceil(endX / this._pieceWidth);
            //添加在区域中的碎片
            this.addPieces(this._startRow, this._endRow, this._startColumn, this._endColumn);
            var target = null;
            //移除不在区域中的碎片
            var length = this._piecesAdded.length;
            for (var i = 0; i < length; i++) {
                target = this._piecesAdded[i];
                this._pieceRect.x = target.x;
                this._pieceRect.y = target.y;
                this._pieceRect.width = target.width;
                this._pieceRect.height = target.height;
                if (!this._renderRect.intersects(this._pieceRect)) {
                    if (target.parent)
                        target.parent.removeChild(target);
                    this._piecesAdded.splice(i, 1);
                    length = this._piecesAdded.length;
                    i--;
                }
            }
            this.drawBlurryArea();
        };
        //
        /**
         * 添加碎片
         * @param startRow:int 开始行
         * @param endRow:int 结束行
         * @param startColumn:int 开始列
         * @param endColumn:int 结束列
         *
         */
        __egretProto__.addPieces = function (startRow, endRow, startColumn, endColumn) {
            if (endColumn === void 0) { endColumn = 0; }
            //Math方法效率较低
            //			startRow = Math.max(0,startRow);
            //			startColumn = Math.max(0,startColumn);
            //			endRow = Math.min(_totalRows,endRow);
            //			endColumn = Math.min(_totalColumns,endColumn);
            //提高效率
            if (startRow < 0)
                startRow = 0;
            if (startColumn < 0)
                startColumn = 0;
            if (endRow > this._totalRows)
                endRow = this._totalRows;
            if (endColumn > this._totalColumns)
                endColumn = this._totalColumns;
            var array = [];
            var target = null;
            var url = null;
            for (var i = startRow; i < endRow; i++) {
                for (var j = startColumn; j < endColumn; j++) {
                    target = this._pieces[i][j];
                    if (!target) {
                        target = this.getCache(this._subPath, this._pieceUrls[i][j]);
                    }
                    if (target) {
                        this._pieces[i][j] = target;
                        if (target.parent != this._container) {
                            this._container.addChild(target);
                            this._piecesAdded.push(target);
                        }
                    }
                    else {
                        //加载未加载的图片
                        url = this._pieceUrls[i][j];
                        if (!this._rcHashMap.containsKey(url)) {
                            this._rcHashMap.put(url, [i, j]);
                            array.push({ url: url, i: i, j: j });
                        }
                    }
                }
            }
            var length = array.length;
            if (length > 0) {
                if (this._viewRect) {
                    this._viewRectPoint.x = this._viewRect.x + this._viewRect.width / 2;
                    this._viewRectPoint.y = this._viewRect.y + this._viewRect.height / 2;
                    array.sort.apply(this, [this.sortPiece]);
                }
                var urls = [];
                for (i = 0; i < length; i++) {
                    urls.push(array[i].url);
                }
                this._queueLoader.addUrls(urls);
            }
        };
        //
        /**
         * 方块排序
         * @param a
         * @param b
         * @return
         *
         */
        __egretProto__.sortPiece = function (a, b) {
            //离视口中心点近的方块优先加载
            var pa = new egret.Point((a.j + 0.5) * this._pieceWidth, (a.i + 0.5) * this._pieceHeight);
            var pb = new egret.Point((b.j + 0.5) * this._pieceWidth, (b.i + 0.5) * this._pieceHeight);
            var da = egret.Point.distance(pa, this._viewRectPoint);
            var db = egret.Point.distance(pb, this._viewRectPoint);
            if (da <= db) {
                return -1;
            }
            else {
                return 1;
            }
            return 0;
        };
        Object.defineProperty(__egretProto__, "isLoadAll", {
            //
            /**
             * 是否已加载完全部碎片
             * @return
             *
             */
            get: function () {
                return this._pieceCount >= this._pieceCountTotal;
            },
            enumerable: true,
            configurable: true
        });
        //
        /**
         * 绘制模糊地图
         *
         */
        __egretProto__.drawBlurryArea = function () {
            if (this.isLoadAll) {
                //已全部加载图片时，不用渲染模糊地图 
                //if(this._miniBmd){
                //	this._miniBitmap.texture = null;
                //	this._miniBmd.dispose();
                //	this._miniBmd = null;
                //}
                if (this._miniImage && this._miniImage.parent) {
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
        };
        //
        /**
         * 加载图片完成
         * @param url:String 图片地址
         * @param index:int 加载的顺序
         * @param content:DisplayObject 图片
         *
         */
        __egretProto__.loadComplete = function (url, index, content) {
            var array = this._rcHashMap.get(url);
            if (!array)
                return;
            var row = array[0];
            var column = array[1];
            //content.cacheAsBitmap = true;
            //content.opaqueBackground = 0x0;
            this._pieces[row][column] = content;
            content.x = column * this._pieceWidth;
            content.y = row * this._pieceHeight;
            this._container.addChild(content);
            this._piecesAdded.push(content);
            this._pieceCount++;
            this.addCache(this._subPath, url, content);
            //LogManager.debug(this,"加载地图碎片成功:row = " + row + ",column = " + column);
        };
        //
        /**
         * 加载错误
         * @param e
         *
         */
        __egretProto__.loadError = function (e) {
            //LogManager.error(this,e.text);
        };
        //
        /**
         * 加载过程
         * @param e
         *
         */
        __egretProto__.loadProgress = function (e) {
        };
        //
        /**
         * 中止加载
         * @param url
         * @param index
         *
         */
        __egretProto__.loadAbort = function (url, index) {
            if (index === void 0) { index = 0; }
            this._rcHashMap.remove(url);
            //			trace("中止加载:" + url);
        };
        __egretProto__.loadMiniComplete = function (image) {
            //if(this._miniImage.content){
            //	var bmd:BitmapData = (<Bitmap><any> (this._miniImage.content)).bitmapData;
            //	this._miniScaleX = bmd.width / _mapWidth;
            //	this._miniScaleY = bmd.height / _mapHeight;
            //}
            //
            //this.drawBlurryArea();
        };
        //
        /**
         * 增加场景图片缓存
         * @param id 场景 id
         * @param url 图片url
         * @param bitmap 图片
         */
        __egretProto__.addCache = function (id, url, bitmap) {
            var sub = this._mapCache.get(id);
            if (!sub) {
                sub = new egret.HashMap();
                this._mapCache.put(id, sub);
                this._mapIds.push(id);
            }
            sub.put(url, bitmap);
        };
        //
        /**
         * 获取缓存图片
         * @param id 场景 id
         * @param url 图片url
         * @returns {any}
         */
        __egretProto__.getCache = function (id, url) {
            var sub = this._mapCache.get(id);
            if (sub) {
                return sub.get(url);
            }
            return null;
        };
        //
        /**
         * 删除缓存图片
         * @param id 场景 id
         */
        __egretProto__.removeCache = function (id) {
            var sub = this._mapCache.remove(id);
            if (sub) {
                var index = this._mapIds.indexOf(id);
                if (index > -1) {
                    this._mapIds.splice(index, 1);
                }
                for (var key in sub.content) {
                    RES.destroyRes(sub.get(key));
                }
            }
        };
        return PieceMap2;
    })(egret.CoreContainer);
    egret.PieceMap2 = PieceMap2;
    PieceMap2.prototype.__class__ = "egret.PieceMap2";
})(egret || (egret = {}));
