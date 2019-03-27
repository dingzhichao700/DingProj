var egret;
(function (egret) {
    var Avatar = (function (_super) {
        __extends(Avatar, _super);
        /**
         * 构造函数
         */
        function Avatar() {
            _super.call(this);
            /**
             * 无动作数据时，是否显示幽灵(无动作替代图片)
             */
            this.isGhost = true;
            /**
             * 动作方向图片是否拆分
             * @type {boolean}
             */
            this.directionSplit = true;
            /**
             * 是否自动检测加载资源，单个方向的模型设置为 false
             * @type {boolean}
             */
            this.isCheckResource = true;
            /**
             * 是否自动加载多部件的图片，使用false时，加载完成主体后，再依次加载武器和翅膀，可提高性能，true时则同时全部加载
             * @type {boolean}
             */
            this.autoLoadMultiParts = false;
            /**
             * 对称方向是否翻转Y轴
             * @type {boolean}
             */
            this.flipY = false;
            this._actionMap = null;
            //当前动作方向
            this._direction = egret.ActionMovieClipDirectionType.UP;
            //当前动作类型
            this._actionType = egret.ActionType.PREPARE;
            //阴影
            this._shadow = null;
            //是否正在播放
            this._isPlayed = false;
            //播放循环次数
            this._loopCount = 0;
            //循环计数
            this._loop = 0;
            //当前帧索引
            this._frameIndex = 0;
            //最大帧索引
            this._frameIndexMax = 0;
            //最大帧索引
            this._frameIndexMaxManual = 0;
            //上一帧
            this._lastFrameIndex = 0;
            //是否已播放至最后一帧
            this._isEnd = false;
            //是否为开始播放
            this._isStart = false;
            //延迟
            this._delay = 100;
            //帧频
            this._frameRate = 0;
            //阴影宽高
            this._shadowWidth = 0;
            this._shadowHeight = 0;
            //幽灵(无动作替代图片) 
            this._ghostTarget = null;
            //总帧数
            this._totalFrames = 1;
            this._actionMovieClipData = null;
            //加载图片回调
            this._callbackMap = null;
            this._callbackTargetMap = null;
            //部件表
            this._actionPartMap = null;
            //是否已有影片数据
            this._hasActionVo = false;
            //头顶线  y 坐标
            this._topLineY = 0;
            //手动设置的总帧数，用于多个动作帧数不一致时的帧显示处理
            this._totalFramesManual = 0;
            //部件缓存
            this._partsCache = null;
            //当前部件数组 @see ActionPartType
            this._partTypes = null;
            //是否已清理影片数据
            this._isClear = false;
            //播放回调
            this._playCallBack = null;
            this._actionMap = new egret.HashMap();
            this._callbackMap = new egret.HashMap();
            this._callbackTargetMap = new egret.HashMap();
            this._actionPartMap = new egret.HashMap();
            this._partsCache = [];
            this._actionMovieClipData = egret.ActionMovieClipData.getInstance();
            this._partItem = new egret.ScriptItem();
            //this._shadow = new Shape();
            //this._shadow.cacheAsBitmap = true;
            //this.addChild(this._shadow);
            this.touchChildren = false;
            this.touchEnabled = false;
            //this.graphics.lineStyle(1,0xff,1);
            //this.graphics.moveTo(-100,0);
            //this.graphics.lineTo(100,0);
            //this.graphics.moveTo(0,-100);
            //this.graphics.lineTo(0,100);
        }
        var __egretProto__ = Avatar.prototype;
        Object.defineProperty(__egretProto__, "totalFramesManual", {
            get: function () {
                return this._totalFramesManual;
            },
            /**
             * 手动设置的总帧数，用于多个动作帧数不一致时的帧显示处理，使其从头开始循环取帧 ，默认值 0 表示无效值
             * @param value
             *
             */
            set: function (value) {
                if (this._totalFramesManual == value)
                    return;
                this._totalFramesManual = value;
                this._frameIndexMaxManual = this._totalFramesManual - 1;
                for (var i in this._actionMap.content) {
                    var amc = this._actionMap.content[i];
                    amc.totalFramesManual = this._totalFramesManual;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "topLineY", {
            /**
             * 头顶线  y 坐标，目前只取主体动作的头顶线值，未加载完成时取此对象高度的负值
             * @return
             *
             */
            get: function () {
                var amc = this._actionMap.get(egret.ActionPartType.BODY);
                if (amc && amc.baseMovieClipVo)
                    this._topLineY = amc.baseMovieClipVo.topLineY;
                else
                    this._topLineY = -this.height;
                return this._topLineY;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "direction", {
            get: function () {
                return this._direction;
            },
            /**
             * 影片动作方向，>= 0有效
             * @param value:int
             * @see ActionMovieClipDirectionType
             */
            set: function (value) {
                if (this._direction == value)
                    return;
                if (value == -1)
                    return;
                this._direction = value;
                this.setBaseMovieClipVo(-1, this._direction);
                this.setLayer();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "actionType", {
            get: function () {
                return this._actionType;
            },
            /**
             * 动作类型
             * @param value:int
             * @see ActionMovieClipType
             */
            set: function (value) {
                if (this._actionType == value)
                    return;
                this._actionType = value;
                this.setBaseMovieClipVo(this._actionType);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "totalFrames", {
            /**
             * 总帧数
             * @return
             *
             */
            get: function () {
                return this._totalFrames;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "delay", {
            /**
             * 影片每帧之间的延迟(ms)
             * @return
             *
             */
            get: function () {
                return this._delay;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "frameRate", {
            get: function () {
                return this._frameRate;
            },
            /**
             * 影片帧频
             * @param value:int
             *
             */
            set: function (value) {
                if (this._frameRate == value)
                    return;
                this._frameRate = value;
                if (this._frameRate < 1)
                    this._frameRate = 1;
                this._delay = Math.floor(1000 / this._frameRate);
                if (this._isPlayed) {
                    this.stopMovie();
                    this.playMovie(this._frameIndex, this._loopCount);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "isPlayed", {
            /**
             * 是否正在播放中
             * @return
             *
             */
            get: function () {
                return this._isPlayed;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "frameIndex", {
            //
            get: function () {
                return this._frameIndex;
            },
            /**
             * 当前帧索引，从0开始，小于总帧数
             * @param value:int
             *
             */
            set: function (value) {
                if (this._frameIndex == value)
                    return;
                this._frameIndex = value;
                if (this._frameIndex > this._frameIndexMax)
                    this._frameIndex = this._frameIndexMax;
                if (this._frameIndex < 0)
                    this._frameIndex = 0;
                this.updateFrame();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "frameIndexMax", {
            /**
             * 最大帧索引
             * @returns {number}
             */
            get: function () {
                return this._frameIndexMax;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 按指定动作类型和方向播放影片
         * @param frameIndex:int = -1 开始播放的帧索引，-1时不设置开始播放的帧索引，从当前帧开始播放或从第0帧开始播放
         * @param actionType:int = -1 动作类型，-1时不设置
         * @param direction:int = -1 动作方向，-1时不设置
         * @param loopCount:int = 0  播放循环次数，播放至最后一帧时即算循环了一次，0表示无限循环
         * @param callBack:Function = null 设置播放次数时，播放完成后回调，仅执行一次
         * @param thisObj:any = null 播放完成后回调函数所属对象
         * @param startFun:Function = null 循环播放中开始播放时回调函数，每次循环执行一次
         * @param startObj:any = null startFun回调函数所属对象
         */
        __egretProto__.play = function (frameIndex, actionType, direction, loopCount, callBack, thisObj, startFun, startObj) {
            if (frameIndex === void 0) { frameIndex = -1; }
            if (actionType === void 0) { actionType = -1; }
            if (direction === void 0) { direction = -1; }
            if (loopCount === void 0) { loopCount = 0; }
            if (callBack === void 0) { callBack = null; }
            if (thisObj === void 0) { thisObj = null; }
            if (startFun === void 0) { startFun = null; }
            if (startObj === void 0) { startObj = null; }
            this._playCallBack = callBack;
            this._playCallBackTarget = thisObj;
            if (!this._startPlayItem)
                this._startPlayItem = new egret.ScriptItem();
            this._startPlayItem.execute = startFun;
            this._startPlayItem.target = startObj;
            this.setBaseMovieClipVo(actionType, direction);
            this.playMovie(frameIndex, loopCount);
        };
        //
        /**
         * 停止影片在指定动作类型和方向
         * @param frameIndex:int = -1 开始播放的帧索引，-1时不设置开始播放的帧索引，从当前帧开始播放或从第0帧开始播放
         * @param actionType:int = -1 动作类型，-1时不设置
         * @param direction:int = -1 动作方向，-1时不设置
         *
         */
        __egretProto__.stop = function (frameIndex, actionType, direction) {
            if (frameIndex === void 0) { frameIndex = -1; }
            if (actionType === void 0) { actionType = -1; }
            if (direction === void 0) { direction = -1; }
            if (!this._isPlayed)
                return;
            this.stopMovie();
            this.setBaseMovieClipVo(actionType, direction);
            if (frameIndex != -1)
                this.frameIndex = frameIndex;
        };
        //
        /**
         * 设置每帧回调函数，用于替代事件机制，优化内存
         * @param fun 回调函数，可设置为 null 删除回调函数
         * @param obj 回调函数所属对象
         * @param params 传递给回调函数的参数列表
         */
        __egretProto__.setFrameHandler = function (fun, obj, params) {
            if (obj === void 0) { obj = null; }
            if (params === void 0) { params = null; }
            if (fun) {
                if (!this._frameItem)
                    this._frameItem = new egret.ScriptItem();
            }
            else {
                obj = null;
                params = null;
            }
            if (this._frameItem) {
                this._frameItem.execute = fun;
                this._frameItem.target = obj;
                this._frameItem.params = params;
            }
        };
        //
        /**
         * 设置部件数组，用于切换不同部件数量的影片
         * @param array:Array 部件数组
         * @param getPartUrl:Function 获取部件 url 的函数 function(partType:String):String{} partType 为 ActionPartType
         * @param callBack:Function = null 每加载完成一个部件时回调函数 function():void{}
         */
        __egretProto__.setPartTypes = function (array, getPartUrl, getPartUrlTarget, callBack, callBackTarget) {
            if (getPartUrlTarget === void 0) { getPartUrlTarget = null; }
            if (callBack === void 0) { callBack = null; }
            if (callBackTarget === void 0) { callBackTarget = null; }
            this._partItem.execute = getPartUrl;
            this._partItem.target = getPartUrlTarget;
            if (this._partTypes != array) {
                this._partTypes = array;
                for (var key in this._actionMap.content) {
                    var amc = this._actionMap.content[key];
                    if (amc.parent)
                        amc.parent.removeChild(amc);
                    this._partsCache.push(amc);
                }
                this._actionMap.clear();
                var length = array.length;
                for (var i = 0; i < length; i++) {
                    var v = array[i];
                    amc = this._partsCache.pop();
                    if (!amc) {
                        amc = new egret.ActionMovieClip2();
                    }
                    amc.totalFramesManual = this._totalFramesManual;
                    //已在外部调用清空
                    //					amc.clear();
                    this.addChild(amc);
                    this._actionMap.put(v, amc);
                }
                this.setLayer();
            }
            var url = null;
            var isGhost = true;
            var length2 = this._partTypes.length;
            for (var i2 = 0; i2 < length2; i2++) {
                var partType = this._partTypes[i2];
                url = getPartUrl.apply(getPartUrlTarget, [partType]);
                var vo = egret.ActionMovieClipData.getInstance().getActionMovieClipVo(url);
                var has = vo != null;
                if (this.directionSplit) {
                    has = has && egret.ActionMovieClipData.getInstance().hasDirectionTypeTexture(vo, this._actionType, this._direction);
                }
                if (has) {
                    this.setActionPart(partType, vo);
                    isGhost = false;
                }
                else {
                    this.setActionUrl(partType, url, callBack, callBackTarget);
                    if (!this.autoLoadMultiParts && this.isCheckResource) {
                        break;
                    }
                }
            }
            this.showGhost(isGhost);
            if (this.isCheckResource && !egret.TimerManager.getInstance().hasExecute(this._partTimerId)) {
                this._partTimerId = egret.TimerManager.getInstance().addExecute(this.checkPartResource, this, 500);
            }
        };
        //
        /**
         * 检测当前动作资源是否已全部加载，未加载则开始加载
         */
        __egretProto__.checkPartResource = function (actionType) {
            if (actionType === void 0) { actionType = -1; }
            if (actionType == -1)
                actionType = this._actionType;
            var url = null;
            var hasAll = true;
            if (this.directionSplit) {
                var length = this._partTypes.length;
                out: for (var i = 0; i < length; i++) {
                    var partType = this._partTypes[i];
                    url = this._partItem.execute.apply(this._partItem.target, [partType]);
                    var vo = this._actionMovieClipData.getActionMovieClipVo(url);
                    var hasFrameTexture = vo != null;
                    for (var direction = egret.ActionMovieClipDirectionType.UP; direction <= egret.ActionMovieClipDirectionType.DOWN; direction++) {
                        if (actionType == this._actionType && direction == this._direction)
                            continue;
                        hasFrameTexture = hasFrameTexture && this._actionMovieClipData.hasDirectionTypeTexture(vo, actionType, direction);
                        if (!hasFrameTexture) {
                            hasAll = false;
                            egret.ActionMovieClipManager.getInstance().loadActionMovieClipVo2(url, null, this, actionType, direction);
                            break out;
                        }
                    }
                }
            }
            if (hasAll) {
                if (actionType < egret.ActionType.ATTACK) {
                    actionType++;
                    this.checkPartResource(actionType);
                }
                else {
                    egret.TimerManager.getInstance().removeExecute(this._partTimerId);
                }
            }
        };
        //
        /**
         * 设置动作部件数据
         * @param actionPartType:String 动作部件
         * @param vo:ActionMovieClipVo 动作数据
         * @param isCombine:Boolean = false 是否强制合成数据，新加载的数据使用 true,以更新最新数据，
         * 同一部件不同类型的动作数据将被合成，目前取消合成，因合成并未产生更好的效率，并且若要合成，合成后应把
         * 合成前的数据 url 指向同一数据对象
         */
        __egretProto__.setActionPart = function (actionPartType, vo, isCombine) {
            if (isCombine === void 0) { isCombine = false; }
            var amc = this._actionMap.get(actionPartType);
            if (!amc) {
                amc = new egret.ActionMovieClip2();
                amc.totalFramesManual = this._totalFramesManual;
                this.addChild(amc);
                this._actionMap.put(actionPartType, amc);
                this.setLayer();
            }
            else if (isCombine) {
            }
            amc.setActionMovieClipVo(vo, this._actionType, this._direction);
            amc.setFrameIndex(this._frameIndex);
            if (vo) {
                this._hasActionVo = true;
                var frameRate = 0;
                var totalFrames = 0;
                var tempFR = 0;
                var tempTF = 0;
                tempFR = amc.frameRate;
                tempTF = amc.totalFrames;
                if (tempFR > 0)
                    frameRate = tempFR;
                if (tempTF > 0)
                    totalFrames = tempTF;
                if (frameRate > 0)
                    this.frameRate = frameRate;
                if (totalFrames > 0) {
                    this._totalFrames = totalFrames;
                    this._frameIndexMax = this._totalFrames - 1;
                    if (this._frameIndex > this._frameIndexMax)
                        this._frameIndex = 0;
                }
                this.showGhost(false);
            }
            else {
                this._hasActionVo = this.checkActionVo();
                if (!this._hasActionVo) {
                    this._totalFrames = amc.totalFrames;
                    this._frameIndexMax = this._totalFrames - 1;
                    this._delay = 0;
                    this.showGhost(true);
                }
            }
            if (this._frameIndex > this._frameIndexMax) {
                this._frameIndex = this._frameIndexMax;
            }
            if (!this._isPlayed) {
                this.play(this._frameIndex, this._actionType, this._direction, this._loopCount, this._playCallBack, this._playCallBackTarget);
            }
            this.updateShadow();
        };
        //
        /**
         * 检测是否有动作数据
         * @return
         *
         */
        __egretProto__.checkActionVo = function () {
            for (var i in this._actionMap.content) {
                var amc = this._actionMap.content[i];
                if (amc.actionMovieClipVo) {
                    return true;
                    break;
                }
            }
            return false;
        };
        //
        /**
         * 设置动作资源地址
         * @param actionPartType:String 动作部件类型 ActionPartType
         * @param url:String 资源地址
         * @param callBack:Function = null 加载完成后回调 function():void{}
         *
         */
        __egretProto__.setActionUrl = function (actionPartType, url, callBack, callBackTarget) {
            if (callBack === void 0) { callBack = null; }
            if (callBackTarget === void 0) { callBackTarget = null; }
            this._isClear = false;
            if (callBack != null) {
                this._callbackMap.put(url, callBack);
                this._callbackTargetMap.put(url, callBackTarget);
            }
            this._actionPartMap.put(url, actionPartType);
            var vo = this._actionMovieClipData.getActionMovieClipVo(url);
            if (this.directionSplit) {
                if (vo && this._actionMovieClipData.hasDirectionTypeTexture(vo, this._actionType, this._direction)) {
                    this.loadComplete(url);
                }
                else {
                    egret.ActionMovieClipManager.getInstance().loadActionMovieClipVo2(url, this.loadComplete, this);
                }
            }
            else {
                if (vo) {
                    this.loadComplete(url);
                }
                else {
                    egret.ActionMovieClipManager.getInstance().loadActionMovieClipVo(url, this.loadComplete, this);
                }
            }
        };
        //
        /**
         * 加载动作数据完成
         * @param url:String 动作 url
         *
         */
        __egretProto__.loadComplete = function (url) {
            var actionPartType = this._actionPartMap.remove(url);
            if (this._isClear)
                return;
            //            LogManager.debug(this,url);
            var vo = this._actionMovieClipData.getActionMovieClipVo(url);
            if (vo && vo.actionType == this._actionType || !this._hasActionVo)
                this.setActionPart(actionPartType, vo);
            if (!this._isPlayed)
                this.play(this._frameIndex, this._actionType, this._direction, this._loopCount, this._playCallBack, this._playCallBackTarget);
            var callBack = this._callbackMap.remove(url);
            var target = this._callbackTargetMap.remove(url);
            if (callBack != null)
                callBack.apply(target);
        };
        //
        /**
         * 清空动作数据，影片仍然存在，但没有数据
         *
         */
        __egretProto__.clear = function (isStop) {
            if (isStop === void 0) { isStop = true; }
            this._isClear = true;
            this._callbackMap.clear();
            this._callbackTargetMap.clear();
            if (isStop)
                this.stopMovie();
            for (var i in this._actionMap.content) {
                var amc = this._actionMap.content[i];
                amc.clear();
            }
        };
        //
        /**
         * 获取动作部件影片
         * @param actionPartType:String 部件类型 ActionPartType
         * @return
         *
         */
        __egretProto__.getActionPart = function (actionPartType) {
            return this._actionMap.get(actionPartType);
        };
        //
        /**
         * 获取动作部件数据
         * @param actionPartType:String 部件类型 ActionPartType
         * @return
         *
         */
        __egretProto__.getActionVo = function (actionPartType) {
            var amc = this._actionMap.get(actionPartType);
            if (amc)
                return amc.actionMovieClipVo;
            return null;
        };
        //
        /**
         * 播放当前数据影片
         * @param frameIndex:int = -1 开始播放的帧索引，-1时不设置开始播放的帧索引，从当前帧开始播放或从第0帧开始播放
         * @param loopCount:int = 0 播放循环次数，播放至最后一帧时即算循环了一次，0表示无限循环
         *
         */
        __egretProto__.playMovie = function (frameIndex, loopCount) {
            if (frameIndex === void 0) { frameIndex = -1; }
            if (loopCount === void 0) { loopCount = 0; }
            this._loopCount = loopCount;
            this._loop = 0;
            this._isEnd = false;
            if (!this._isPlayed) {
                this._isStart = true;
                if (frameIndex == -1) {
                    frameIndex = this._frameIndex;
                    if (frameIndex > this._frameIndexMax)
                        frameIndex = 0;
                }
                this._frameIndex = -1;
                this.frameIndex = frameIndex;
                //特殊处理，因设置frameIndex属性有改变此值
                this._isStart = true;
                if (this._hasActionVo) {
                    if (!egret.TimerManager.getInstance().hasExecute(this._playId)) {
                        this._playId = egret.TimerManager.getInstance().addExecute(this.frameExecute, this, this._delay);
                    }
                    this._isPlayed = true;
                }
            }
            else {
                if (frameIndex != -1) {
                    if (this._frameIndex != frameIndex)
                        this._frameIndex = frameIndex;
                    if (this._frameIndex > this._frameIndexMax)
                        this._frameIndex = 0;
                    this.updateFrame();
                }
            }
        };
        //
        /**
         * 停止当前数据影片
         *
         */
        __egretProto__.stopMovie = function () {
            egret.TimerManager.getInstance().removeExecute(this._playId);
            this._isPlayed = false;
        };
        //
        /**
         * 更新阴影
         *
         */
        __egretProto__.updateShadow = function () {
            return;
            //只有主体支持阴影
            var width = 0;
            var height = 0;
            var amc = this._actionMap.get(egret.ActionPartType.BODY);
            if (amc)
                var baseVo = amc.getBaseMovieClipVo(this._actionType, this._direction);
            if (baseVo && baseVo.shadowWidth > 0 && baseVo.shadowHeight > 0) {
                width = baseVo.shadowWidth;
                height = baseVo.shadowHeight;
            }
            //宽或高为0时清除阴影
            if (width == 0 || height == 0) {
                if (this._shadow && this._shadow.parent)
                    this._shadow.parent.removeChild(this._shadow);
                this._shadowWidth = 0;
                this._shadowHeight = 0;
                return;
            }
            //阴影不变
            if (width == this._shadowWidth && height == this._shadowHeight) {
                return;
            }
            if (!this._shadow) {
                this._shadow = new egret.Shape();
            }
            if (!this._shadow.parent)
                this.addChildAt(this._shadow, 0);
            this._shadowWidth = width;
            this._shadowHeight = height;
            //var radioMat:Matrix = new Matrix();
            //radioMat.createGradientBox(-this._shadowWidth,-this._shadowHeight);
            var radius = this._shadowWidth > this._shadowHeight ? this._shadowWidth : this._shadowHeight;
            this._shadow.graphics.lineStyle(1, 0xffff, 1);
            this._shadow.graphics.beginGradientFill(egret.GradientType.RADIAL, [0x0, 0x0], [1, 0], [0, 255]);
            this._shadow.graphics.drawEllipse(0, 0, this._shadowWidth, this._shadowHeight);
            //this._shadow.graphics.drawCircle(0,0,radius);
            this._shadow.graphics.endFill();
            if (!this._shadow.filters)
                this._shadow.filters = [new egret.BlurFilter(12, 8)];
            this._shadow.x = -this._shadow.width / 2;
            this._shadow.y = -this._shadow.height / 2;
        };
        //
        /**
         * @private
         * 执行帧更新
         */
        __egretProto__.frameExecute = function () {
            if (this._frameItem && this._frameItem.execute) {
                this._frameItem.apply();
            }
            this._lastFrameIndex = this._frameIndex;
            //一轮播放结束
            if (this._isEnd) {
                this._isEnd = false;
                this._loop++;
                this._frameIndex = -1;
                if (this._loopCount > 0 && this._loop >= this._loopCount) {
                    this._frameIndex = this._lastFrameIndex;
                    this.stopMovie();
                    this.updateFrame();
                    if (this._playCallBack != null) {
                        this._playCallBack.apply(this._playCallBackTarget);
                        this._playCallBack = null;
                    }
                    return;
                }
            }
            if (this._frameIndex == 0) {
                if (this._startPlayItem && this._startPlayItem.execute) {
                    this._startPlayItem.apply();
                }
            }
            this._frameIndex++;
            this.updateFrame();
            this._isStart = false;
            var index = this._frameIndexMax;
            if (this._frameIndexMaxManual > 0)
                index = this._frameIndexMaxManual;
            if (this._frameIndex >= index) {
                this._isEnd = true;
            }
        };
        //
        __egretProto__.destroy = function () {
            if (this._isDestroy)
                return;
            this.stopMovie();
            _super.prototype.destroy.call(this);
        };
        //
        /**
         * 更新帧渲染
         * @param dispatch:Boolean = true 是否调度事件
         *
         */
        __egretProto__.updateFrame = function (dispatch) {
            //事件机制已用回调函数替代
            //if(dispatch){
            //	if(!this._isStart && this.hasEventListener(ActionMovieClipEvent.CLIP_EXIT_FRAME)){
            //		this.dispatchEvent(new ActionMovieClipEvent(ActionMovieClipEvent.CLIP_EXIT_FRAME,false,false,this._lastFrameIndex));
            //	}
            //	if(this.hasEventListener(ActionMovieClipEvent.CLIP_ENTER_FRAME))
            //		this.dispatchEvent(new ActionMovieClipEvent(ActionMovieClipEvent.CLIP_ENTER_FRAME,false,false,this._frameIndex));
            //}
            if (dispatch === void 0) { dispatch = true; }
            for (var i in this._actionMap.content) {
                var amc = this._actionMap.content[i];
                amc.setFrameIndex(this._frameIndex);
            }
        };
        //
        /**
         * 显示或隐藏幽灵(无动作替代图片)
         * @param visible:Boolean
         *
         */
        __egretProto__.showGhost = function (visible) {
            if (!this.isGhost) {
                if (this._ghostTarget) {
                    if (this._ghostTarget.parent)
                        this._ghostTarget.parent.removeChild(this._ghostTarget);
                    if (this._ghostTarget.texture)
                        this._ghostTarget.texture.dispose();
                    this._ghostTarget = null;
                }
                return;
            }
            if (!this._ghostTarget) {
                this._ghostTarget = new egret.Bitmap();
                //性能优化
                this._ghostTarget.cacheAsBitmap = true;
                this.addChild(this._ghostTarget);
                var width = 50;
                var height = 50;
                if (Avatar.ghostStyle) {
                    width = Avatar.ghostStyle.width;
                    height = Avatar.ghostStyle.height;
                }
                //if(!Avatar.ghostBmd){
                //	Avatar.ghostBmd = new BitmapData(width,height,true,0x00000000);
                //	if(Avatar.ghostStyle){
                //		Avatar.ghostBmd.draw(Avatar.ghostStyle);
                //	}else{
                //		Avatar.ghostBmd.noise(Math.random() * 100);
                //	}
                //}
                this._ghostTarget.texture = Avatar.ghostBmd;
                this._ghostTarget.y = -this._ghostTarget.height;
                this._ghostTarget.x = -this._ghostTarget.width / 2;
            }
            if (this._ghostTarget.visible != visible)
                this._ghostTarget.visible = visible;
        };
        //
        /**
         * 设置当前播放数据
         * @param actionType:int = -1 动作类型，-1时不设置
         * @param direction:int = -1 动作方向，-1时不设置
         *
         */
        __egretProto__.setBaseMovieClipVo = function (actionType, direction) {
            if (actionType === void 0) { actionType = -1; }
            if (direction === void 0) { direction = -1; }
            if (actionType == -1 && direction == -1)
                return;
            if (actionType != -1)
                this._actionType = actionType;
            if (direction != -1) {
                this._direction = direction;
                this.setLayer();
            }
            var frameRate = 0;
            var totalFrames = 0;
            var tempFR = 0;
            var tempTF = 0;
            for (var i in this._actionMap.content) {
                var amc = this._actionMap.content[i];
                amc.flipY = this.flipY;
                amc.setBaseMovieClipVo(actionType, direction);
                amc.setFrameIndex(this._frameIndex);
                tempFR = amc.frameRate;
                tempTF = amc.totalFrames;
                if (tempFR > 0)
                    frameRate = tempFR;
                if (tempTF > 0)
                    totalFrames = tempTF;
            }
            if (amc) {
                //帧频和总帧数无效时不设置，避免出现加载新动作时，出现播放同一帧多次的情况
                if (frameRate > 0)
                    this.frameRate = frameRate;
                if (totalFrames > 0) {
                    this._totalFrames = totalFrames;
                    this._frameIndexMax = this._totalFrames - 1;
                    if (this._frameIndex > this._frameIndexMax)
                        this._frameIndex = 0;
                }
                this.updateShadow();
            }
        };
        //
        /**
         * 调整部件层级
         *
         */
        __egretProto__.setLayer = function () {
            if (!this._partTypes || this._partTypes.length < 2)
                return;
            var layers = null;
            if (this._direction == egret.ActionMovieClipDirectionType.UP) {
                layers = egret.ActionPartType.DIRECTION_UP;
            }
            else if (this._direction == egret.ActionMovieClipDirectionType.UP_RIGHT || this._direction == this._actionMovieClipData.getReverseDir(egret.ActionMovieClipDirectionType.UP_RIGHT)) {
                layers = egret.ActionPartType.DIRECTION_UP_RIGHT;
            }
            else if (this._direction == egret.ActionMovieClipDirectionType.RIGHT || this._direction == this._actionMovieClipData.getReverseDir(egret.ActionMovieClipDirectionType.RIGHT)) {
                layers = egret.ActionPartType.DIRECTION_RIGHT;
            }
            else if (this._direction == egret.ActionMovieClipDirectionType.DOWN_RIGHT || this._direction == this._actionMovieClipData.getReverseDir(egret.ActionMovieClipDirectionType.DOWN_RIGHT)) {
                layers = egret.ActionPartType.DIRECTION_DOWN_RIGHT;
            }
            else if (this._direction == egret.ActionMovieClipDirectionType.DOWN) {
                layers = egret.ActionPartType.DIRECTION_DOWN;
            }
            if (!layers) {
                egret.LogManager.debug(this, this._direction);
            }
            var length = layers.length;
            var index = this.numChildren - 1;
            var amc = null;
            for (var i = 0; i < length; i++) {
                amc = this._actionMap.get(layers[i]);
                if (amc) {
                    if (this.getChildIndex(amc) != index)
                        this.setChildIndex(amc, index);
                    index--;
                }
            }
        };
        /**
         * 幽灵(无动作替代图片)默认样式
         */
        Avatar.ghostStyle = null;
        /**
         * 幽灵共用位置数据，内存优化
         */
        Avatar.ghostBmd = null;
        //阴影共享
        Avatar.SHADOW_SHAPE = null;
        return Avatar;
    })(egret.CoreContainer);
    egret.Avatar = Avatar;
    Avatar.prototype.__class__ = "egret.Avatar";
})(egret || (egret = {}));
//# sourceMappingURL=Avatar.js.map