var egret;
(function (egret) {
    var Image = (function (_super) {
        __extends(Image, _super);
        /**
         * 构造函数  图片组件，默认不响应鼠标事件
         * @param url:String = null 加载的图片地址，为null时清空已加载的图片
         * @param width:Number = 0  图片宽度，未设置时加载到图片后设为图片的宽度，若要显示加载样式应设置此属性，使加载样式居中
         * @param height:Number = 0  图片高度，未设置时加载到图片后设为图片的高度，若要显示加载样式应设置此属性，使加载样式居中
         * @param isShowLoading:Boolean = true 是否显示加载样式
         * @param loadComplete:Function = null 加载完成回调函数 function(image:Image){}，在设置url属性前或构造函数中设置此属性有效
         * @param loadProgress:Function = null 加载过程回调函数 function(image:Image){}，在设置url属性前或构造函数中设置此属性有效
         * @param loadError:Function = null 加载出现错误时回调函数 function(image:Image){}，在设置url属性前或构造函数中设置此属性有效
         *
         */
        function Image(url, width, height, isShowLoading, thisObj, loadComplete, loadProgress, loadError) {
            if (url === void 0) { url = null; }
            if (width === void 0) { width = 0; }
            if (height === void 0) { height = 0; }
            if (isShowLoading === void 0) { isShowLoading = true; }
            if (thisObj === void 0) { thisObj = null; }
            if (loadComplete === void 0) { loadComplete = null; }
            if (loadProgress === void 0) { loadProgress = null; }
            if (loadError === void 0) { loadError = null; }
            _super.call(this);
            /**
             * 内容宽高是否自动调整为组件宽高  默认为 true
             */
            this.autoFixed = true;
            /**
             * 加载完成回调函数 function(image:Image){}，在设置url属性前或构造函数中设置此属性有效
             */
            this.loadComplete = null;
            /**
             * 加载过程回调函数 function(image:Image){}，在设置url属性前或构造函数中设置此属性有效
             */
            this.loadProgress = null;
            /**
             * 加载出现错误时回调函数 function(image:Image){}，在设置url属性前或构造函数中设置此属性有效
             */
            this.loadError = null;
            //是否显示加载样式
            this._isShowLoading = true;
            //图片地址
            this._url = null;
            //宽度
            this._width = 0;
            //高度
            this._height = 0;
            //加载到的内容
            this._content = null;
            //加载样式
            this._loadingStyle = null;
            //是否已加载完成，加载开始时才设为false
            this._isCompleted = true;
            this.touchEnabled = false;
            this.touchChildren = false;
            this._thisObj = thisObj;
            this._width = width;
            this._height = height;
            this._isShowLoading = isShowLoading;
            this.loadComplete = loadComplete;
            this.loadProgress = loadProgress;
            this.loadError = loadError;
            this.url = url;
            //this.drawRectBorder(this,this._width,height);
        }
        var __egretProto__ = Image.prototype;
        /**
         * 获取已存在的图片资源数据
         * @param url
         * @return
         *
         */
        Image.getTexture = function (url) {
            return Image._contentMap.get(url);
        };
        //
        /**
         * 销毁已存在的图片资源数据
         * @param args 图片url数组
         *
         */
        Image.destroyResource = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var bmd = null;
            var length = args.length;
            for (var i = 0; i < length; i++) {
                var url = args[i];
                bmd = Image._contentMap.remove(url);
                if (bmd)
                    bmd.dispose();
            }
        };
        Object.defineProperty(__egretProto__, "isShowLoading", {
            get: function () {
                return this._isShowLoading;
            },
            /**
             * 是否显示加载样式
             * @param value:Boolean 默认值:true
             *
             */
            set: function (value) {
                if (this._isShowLoading == value)
                    return;
                this._isShowLoading = value;
                if (this._isCompleted)
                    this.showLoadingStyle(false);
                else
                    this.showLoadingStyle(this._isShowLoading);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "content", {
            get: function () {
                return this._content;
            },
            /**
             * 设置图片内容 ，将覆盖之前加载或显示的内容
             * @param content:DisplayObject
             *
             */
            set: function (content) {
                this.showLoadingStyle(false);
                if (content != this._content && this._content && this._content.parent)
                    this._content.parent.removeChild(this._content);
                this._content = content;
                if (this._content) {
                    if (this._content.parent != this)
                        this.addChild(this._content);
                    this._content.x = 0;
                    this._content.y = 0;
                    //未设置宽高时，使用图片宽高
                    if (this._width == 0 || this._height == 0) {
                        this._width = this._content.width;
                        this._height = this._content.height;
                    }
                    else if (this.autoFixed) {
                        this._content.width = this._width;
                        this._content.height = this._height;
                    }
                }
                else {
                    this._url = null;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "url", {
            get: function () {
                return this._url;
            },
            /**
             * 加载的图片地址，为null时清空已加载的图片
             * @param value:String
             *
             */
            set: function (value) {
                if (this._url == value)
                    return;
                this.content = null;
                this._url = value;
                if (this._url) {
                    var bmd = Image._contentMap.get(this.url);
                    if (bmd) {
                        this.createBitmap(bmd);
                    }
                    else {
                        RES.getResByUrl(this._url, this.loadActionComplete, this);
                        this.showLoadingStyle(this._isShowLoading);
                    }
                }
                else {
                    this.showLoadingStyle(false);
                    this._isCompleted = true;
                }
            },
            enumerable: true,
            configurable: true
        });
        //
        __egretProto__.createBitmap = function (texture) {
            var bitmap = (this._content);
            if (bitmap)
                bitmap.texture = texture;
            else
                bitmap = new egret.Bitmap(texture);
            this.content = bitmap;
        };
        /**
         * 加载动作资源完成
         * @param loadDataItem
         *
         */
        __egretProto__.loadActionComplete = function (data, url) {
            if (data)
                Image._contentMap.put(url, data);
            if (url == this._url) {
                this._isCompleted = true;
                this.createBitmap(data);
                if (this.loadComplete != null)
                    this.loadComplete.apply(this._thisObj, [this]);
            }
        };
        /**
         * 设置宽高
         * @param width 宽
         * @param height 高
         */
        __egretProto__.setWH = function (width, height) {
            if (this._width == width && this._height == height)
                return;
            this._width = width;
            if (this._content && this.autoFixed)
                this._content.width = width;
            this._height = height;
            if (this._content && this.autoFixed)
                this._content.height = height;
            //this.drawRectBorder(this,this._width,this.height);
            this.updateLayout();
        };
        Object.defineProperty(__egretProto__, "height", {
            get: function () {
                return this._height;
            },
            /**
             * 图片宽度，未设置时加载到图片后设为图片的宽度，若要显示加载样式应设置此属性，使加载样式居中
             * @param value:Number
             *
             */
            set: function (value) {
                if (this._height == value)
                    return;
                this._height = value;
                if (this._content && this.autoFixed)
                    this._content.height = value;
                //this.drawRectBorder(this,this._width,this.height);
                this.updateLayout();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "width", {
            get: function () {
                return this._width;
            },
            /**
             * 图片高度，未设置时加载到图片后设为图片的高度，若要显示加载样式应设置此属性，使加载样式居中
             * @param value:Number
             *
             */
            set: function (value) {
                if (this._width == value)
                    return;
                this._width = value;
                if (this._content && this.autoFixed)
                    this._content.width = value;
                //this.drawRectBorder(this,this._width,this.height);
                this.updateLayout();
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 设置加载样式，若要显示不同于默认的加载样式 则调用此方法设置
         * @param style:DisplayObject 样式将被设置为不响应鼠标事件
         *
         */
        __egretProto__.setLoadingStyle = function (style) {
            if (this._loadingStyle == style)
                return;
            this.showLoadingStyle(false);
            this._loadingStyle = style;
            this._loadingStyle.touchEnabled = false;
            if ("touchChildren" in this._loadingStyle)
                this._loadingStyle.touchChildren = false;
            this.showLoadingStyle(this._isShowLoading);
        };
        //
        __egretProto__.destroy = function () {
            if (this._isDestroy)
                return;
            this.loadComplete = null;
            this.loadProgress = null;
            this.loadError = null;
            _super.prototype.destroy.call(this);
        };
        //
        /**
         * 显示或隐藏加载样式
         * @param isShow:Boolean
         *
         */
        __egretProto__.showLoadingStyle = function (isShow) {
            if (isShow) {
                if (!this._loadingStyle) {
                    if (Image.defaultLoadingStyle) {
                        this._loadingStyle = new Image.defaultLoadingStyle();
                        if ("touchChildren" in this._loadingStyle)
                            this._loadingStyle.touchChildren = false;
                    }
                    else {
                        //无默认样式时，使用文本
                        this._loadingStyle = new egret.TextField();
                        if (this._width > 0) {
                            this._loadingStyle.width = this._width;
                            this._loadingStyle.height = this._height;
                        }
                        else {
                            this._loadingStyle.width = 50;
                            this._loadingStyle.height = 50;
                        }
                        this._loadingStyle.size = 20;
                        this._loadingStyle.textAlign = egret.HorizontalAlign.CENTER;
                        this._loadingStyle.verticalAlign = egret.VerticalAlign.MIDDLE;
                        this._loadingStyle.text = "Loading..";
                    }
                    this._loadingStyle.touchEnabled = false;
                }
                if (this._loadingStyle) {
                    if (this._loadingStyle.parent != this)
                        this.addChild(this._loadingStyle);
                    if (this._loadingStyle instanceof egret.MovieClip)
                        this._loadingStyle.gotoAndPlay(2);
                    this.updateLayout();
                }
            }
            else if (this._loadingStyle) {
                if (this._loadingStyle.parent)
                    this._loadingStyle.parent.removeChild(this._loadingStyle);
                if (this._loadingStyle instanceof egret.MovieClip)
                    this._loadingStyle.gotoAndStop(1);
            }
        };
        //
        /**
         * 更新布局
         *
         */
        __egretProto__.updateLayout = function () {
            if (this._loadingStyle && this._loadingStyle.parent) {
                this._loadingStyle.x = (this._width - this._loadingStyle.width) / 2;
                this._loadingStyle.y = (this._height - this._loadingStyle.height) / 2;
            }
        };
        /**
         * 默认样式类 ，若实例的 isShowLoading = true 则加载过程显示此样式
         */
        Image.defaultLoadingStyle = null;
        //加载到的图片表
        Image._contentMap = new egret.HashMap();
        return Image;
    })(egret.CoreContainer);
    egret.Image = Image;
    Image.prototype.__class__ = "egret.Image";
})(egret || (egret = {}));
//# sourceMappingURL=Image.js.map