var egret;
(function (egret) {
    var QueueLoader = (function () {
        /**
         * 构造函数
         * @param loadCount:int = 2 可同时加载的数量，超出时在队列中等待
         * @param loadComplete:Function = null 加载一个资源完成时回调函数  function(url:String,index:int,content:DisplayObject):void{} url:资源地址,index:加载顺序,content:加载到的资源
         * @param loadError:Function = null 加载错误时回调函数 function(url:String,index:int):void{} url:资源地址,index:加载顺序
         * @param loadProgress:Function = null 加载过程时回调函数 function(e:ProgressEvent):void{}
         * @param loadAbort:Function = null 加载过程时中止加载回调函数 function(url:String,index:int):void{} url:资源地址,index:加载顺序
         */
        function QueueLoader(loadCount, target, loadComplete, loadError, loadProgress, loadAbort) {
            if (loadCount === void 0) { loadCount = 2; }
            if (target === void 0) { target = null; }
            if (loadComplete === void 0) { loadComplete = null; }
            if (loadError === void 0) { loadError = null; }
            if (loadProgress === void 0) { loadProgress = null; }
            if (loadAbort === void 0) { loadAbort = null; }
            /**
             * 可同时加载的数量，超出时在队列中等待
             */
            this.loadCount = 6;
            /**
             * 加载一个资源完成时回调函数  function(url:String,index:int,content:DisplayObject):void{} url:资源地址,index:加载顺序,content:加载到的资源
             */
            this.loadComplete = null;
            /**
             * 加载错误时回调函数 function(e:IOErrorEvent):void{}
             */
            this.loadError = null;
            /**
             * 加载过程时回调函数 function(e:ProgressEvent):void{}
             */
            this.loadProgress = null;
            /**
             * 加载未完成时中止加载回调函数 function(url:String,index:int):void{} url:资源地址,index:加载顺序
             */
            this.loadAbort = null;
            //加载的资源url
            this._urls = null;
            //当前加载次序
            this._loadIndex = 0;
            //资源数组
            this._contents = null;
            //当前正在加载的资源数量
            this._currentCount = 0;
            //是否加载中
            this._isLoading = false;
            //全部加载完成或未开始加载
            this._isCompleted = false;
            //加载次序表
            this._indexHashMap = null;
            //地址表
            this._urlHashMap = null;
            this.loadCount = Math.max(1, loadCount);
            this.loadComplete = loadComplete;
            this.loadError = loadError;
            this.loadProgress = loadProgress;
            this.loadAbort = loadAbort;
            this._callbackObj = target;
            this._urls = [];
            this._contents = [];
            this._indexHashMap = new egret.HashMap();
            this._urlHashMap = new egret.HashMap();
        }
        var __egretProto__ = QueueLoader.prototype;
        Object.defineProperty(__egretProto__, "isLoading", {
            /**
             * 是否加载中
             * @return
             *
             */
            get: function () {
                return this._isLoading;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "isCompleted", {
            /**
             * 是否已加载结束
             * @return
             *
             */
            get: function () {
                return this._isCompleted;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "loadIndex", {
            //
            /**
             * 当前加载次序
             * @return
             *
             */
            get: function () {
                return this._loadIndex;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "urls", {
            //
            get: function () {
                return this._urls;
            },
            /**
             * 加载的资源数组
             * @param value:Array
             *
             */
            set: function (value) {
                if (!value) {
                    egret.LogManager.error(this, "参数不能为空: urls = " + value);
                    return;
                }
                this._urls = value;
                this.initLoading();
            },
            enumerable: true,
            configurable: true
        });
        //
        /**
         * 添加加载的资源，支持加载中添加
         * @param urls:Array:Array
         *
         */
        __egretProto__.addUrls = function (urls, isPriority) {
            if (isPriority === void 0) { isPriority = true; }
            if (this._isLoading) {
                //加载中，直接添加至队列中
                if (isPriority) {
                    this._urls = urls.concat(this._urls);
                    urls = [this._loadIndex + 1, 0].concat(urls);
                    this._urls.splice.apply(this._urls, urls);
                }
                else {
                    this._urls = this._urls.concat(urls);
                }
                if (!this._isLoading)
                    this.urls = urls;
            }
            else {
                this.urls = urls.concat();
            }
        };
        //
        /**
         * 停止所有正在加载的资源进程
         *
         */
        __egretProto__.stopAll = function () {
            this._loadIndex = Number.POSITIVE_INFINITY;
            this._indexHashMap.clear();
            this._urlHashMap.clear();
            if (this._isLoading)
                this._isCompleted = true;
            this._isLoading = false;
        };
        //
        /**
         * 停止加载并清空数据
         *
         */
        __egretProto__.clear = function () {
            this.stopAll();
            this._urls.length = 0;
            this._contents.length = 0;
        };
        //
        /**
         * 销毁对象
         *
         */
        __egretProto__.destroy = function () {
            this.stopAll();
            this.loadComplete = null;
            this.loadError = null;
            this.loadProgress = null;
            this.loadAbort = null;
        };
        //
        /**
         * 初始化加载
         *
         */
        __egretProto__.initLoading = function () {
            if (!this._urls || this._urls.length == 0)
                return;
            //			stopAll();
            this._loadIndex = 0;
            this._currentCount = 0;
            this.loading();
        };
        /**
         * 执行加载
         *
         */
        __egretProto__.loading = function () {
            //加载结束
            if (this._loadIndex >= this._urls.length) {
                this._isLoading = false;
                this._isCompleted = true;
                return;
            }
            //同时加载数量限制
            if (this._currentCount < this.loadCount) {
                this._isLoading = true;
                this._isCompleted = false;
                var url = this._urls[this._loadIndex];
                //暂无错误处理
                RES.getResByUrl(url, this.completeHandler, this);
                this._indexHashMap.put(url, this._loadIndex);
                this._currentCount++;
                this._loadIndex++;
                this.loading();
            }
        };
        //加载完成
        __egretProto__.completeHandler = function (data, url) {
            var index = this._indexHashMap.get(url);
            this._contents[index] = new egret.Bitmap(data);
            if (this.loadComplete)
                this.loadComplete.apply(this._callbackObj, [url, index, this._contents[index]]);
            this._currentCount--;
            //因手机性能问题，延迟加载
            egret.EnterFrameManager.getInstance().addExecute(this.loading, this, 20, null, 1);
        };
        return QueueLoader;
    })();
    egret.QueueLoader = QueueLoader;
    QueueLoader.prototype.__class__ = "egret.QueueLoader";
})(egret || (egret = {}));
//# sourceMappingURL=QueueLoader.js.map