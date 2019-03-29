var egret;
(function (egret) {
    var ActionMovieClipManager = (function () {
        /**
         * 构造函数
         */
        function ActionMovieClipManager() {
            //加载中的url
            this._loadUrlMap = null;
            //回调列表
            this._callBackMap = null;
            this._callBackTargetMap = null;
            //加载中的url
            this._loadUrlMap2 = null;
            //回调列表
            this._callBackMap2 = null;
            this._callBackTargetMap2 = null;
            this._directionMap2 = null;
            //加载数量
            this._loadCount = 0;
            this._loadUrlMap = new egret.HashMap();
            this._callBackMap = new egret.HashMap();
            this._callBackTargetMap = new egret.HashMap();
            this._loadUrlMap2 = new egret.HashMap();
            this._callBackMap2 = new egret.HashMap();
            this._callBackTargetMap2 = new egret.HashMap();
            this._directionMap2 = new egret.HashMap();
            this._actionMovieClipData = egret.ActionMovieClipData.getInstance();
        }
        var __egretProto__ = ActionMovieClipManager.prototype;
        ActionMovieClipManager.getInstance = function () {
            return ActionMovieClipManager._instance || (ActionMovieClipManager._instance = new ActionMovieClipManager());
        };
        //
        /**
         * 加载动作影片数据，一个动作一张图片
         * @param url:String 影片地址
         * @param callBack:Function = null 加载完成回调 function(){}
         *
         */
        __egretProto__.loadActionMovieClipVo = function (url, callBack, callBackTarget) {
            if (callBack === void 0) { callBack = null; }
            if (callBackTarget === void 0) { callBackTarget = null; }
            var array = this._callBackMap.get(url);
            if (!array) {
                array = new egret.HashMap();
                this._callBackMap.put(url, array);
            }
            if (!array.containsKey(callBackTarget.hashCode)) {
                this._callBackTargetMap.put(callBackTarget.hashCode, callBackTarget);
                array.put(callBackTarget.hashCode, callBack);
            }
            if (this._loadUrlMap.containsKey(url))
                return;
            if (this._actionMovieClipData.getActionMovieClipVo(url))
                return;
            this._loadUrlMap.put(url, true);
            this._loadCount++;
            //因手机性能较低，将加载分布至各个帧加载，减少同时加载的数量，提高性能
            egret.EnterFrameManager.getInstance().addExecute(RES.getResByUrl, null, this._loadCount % 10 + 2, [url, this.loadActionComplete, this], 1);
            //RES.getResByUrl(url,this.loadActionComplete,this);
        };
        //
        /**
         * 加载动作资源完成，一个动作一张图片
         * @param loadDataItem
         *
         */
        __egretProto__.loadActionComplete = function (data, url) {
            if (data instanceof egret.SpriteSheet && url) {
                if (data) {
                    var jsonUrl = this._actionMovieClipData.getJsonUrl(url);
                    var jsonData = this._actionMovieClipData.getActionData(jsonUrl);
                    var vo = egret.ActionMovieClipUtil.getActionMovieClipVo(jsonData, data);
                    if (vo) {
                        this._actionMovieClipData.setActionMoveClipVo(jsonUrl, vo);
                    }
                    else {
                        egret.LogManager.error(this, "无效的ActionMovieClipVo数据:" + url);
                    }
                }
                else {
                    egret.LogManager.error(this, "加载到无效的动作数据: url = " + url);
                }
                this._loadUrlMap.remove(jsonUrl);
                var array = this._callBackMap.remove(jsonUrl);
                if (array) {
                    for (var i in array.content) {
                        var fun = array.get(i);
                        if (fun != null) {
                            var target = this._callBackTargetMap.get(i);
                            fun.apply(target, [jsonUrl]);
                        }
                    }
                }
            }
            else if (data instanceof Object) {
                this._actionMovieClipData.setActionData(url, data);
                url = this._actionMovieClipData.getSheetUrl(url);
                //因手机性能较低，将加载分布至各个帧加载，减少同时加载的数量，提高性能
                egret.EnterFrameManager.getInstance().addExecute(RES.getResByUrl, null, 2, [url, this.loadActionComplete, this, RES.ResourceItem.TYPE_SHEET], 1);
            }
            else {
                egret.LogManager.error(this, "加载到无效的动作数据: url = " + url);
            }
        };
        //
        /**
         * 加载动作影片数据，动作方向图片拆分
         * @param url:String 影片地址
         * @param callBack:Function = null 加载完成回调 function(){}
         *
         */
        __egretProto__.loadActionMovieClipVo2 = function (url, callBack, callBackTarget, actionType, direction) {
            if (actionType === void 0) { actionType = -1; }
            if (direction === void 0) { direction = -1; }
            if (actionType == -1) {
                actionType = callBackTarget.actionType;
            }
            if (direction == -1) {
                direction = callBackTarget.direction;
            }
            var array = this._callBackMap2.get(url);
            if (!array) {
                array = new egret.HashMap();
                this._callBackMap2.put(url, array);
            }
            if (callBack && !array.containsKey(callBackTarget.hashCode)) {
                this._callBackTargetMap2.put(callBackTarget.hashCode, callBackTarget);
                array.put(callBackTarget.hashCode, callBack);
            }
            var list = this._directionMap2.get(url);
            if (!list) {
                list = [];
                this._directionMap2.put(url, list);
            }
            if (list.indexOf(direction) == -1)
                list.push(direction);
            if (this._loadUrlMap2.containsKey(url))
                return;
            var vo = this._actionMovieClipData.getActionMovieClipVo(url);
            if (vo && !this._actionMovieClipData.hasDirectionTypeTexture(vo, actionType, direction)) {
                this.loadActionComplete2(vo, url);
                return;
            }
            this._loadUrlMap2.put(url, true);
            this._loadCount++;
            //因手机性能较低，将加载分布至各个帧加载，减少同时加载的数量，提高性能
            egret.EnterFrameManager.getInstance().addExecute(RES.getResByUrl, null, this._loadCount % 10 + 2, [url, this.loadActionComplete2, this], 1);
            //RES.getResByUrl(url,this.loadActionComplete,this);
        };
        //
        /**
         * 加载动作资源完成，动作方向图片拆分
         * @param loadDataItem
         *
         */
        __egretProto__.loadActionComplete2 = function (data, url) {
            if (data instanceof egret.SpriteSheet) {
                if (url) {
                    this._actionMovieClipData.setSheet(url, data);
                }
                else {
                    url = this._actionMovieClipData.getUrlBySheet(data);
                }
                var jsonUrl = this._actionMovieClipData.getJsonUrl2(url);
                var vo = this._actionMovieClipData.getActionMovieClipVo(jsonUrl);
                if (vo) {
                    vo = egret.ActionMovieClipUtil.getActionMovieClipVo2(vo, data);
                }
                else {
                    var jsonData = this._actionMovieClipData.getActionData(jsonUrl);
                    vo = egret.ActionMovieClipUtil.getActionMovieClipVo(jsonData, data);
                    if (vo) {
                        this._actionMovieClipData.setActionMoveClipVo(jsonUrl, vo);
                    }
                    else {
                        egret.LogManager.error(this, "无效的ActionMovieClipVo数据:" + url);
                    }
                }
                this._loadUrlMap2.remove(jsonUrl);
                var array = this._callBackMap2.remove(jsonUrl);
                if (array) {
                    for (var i in array.content) {
                        var fun = array.get(i);
                        if (fun != null) {
                            var target = this._callBackTargetMap2.get(i);
                            fun.apply(target, [jsonUrl]);
                        }
                    }
                }
            }
            else if (data instanceof Object) {
                if (!(data instanceof egret.ActionMovieClipVo)) {
                    if (url) {
                        this._actionMovieClipData.setActionData(url, data);
                    }
                    else {
                        egret.LogManager.error(this, "url 为空 data = " + data);
                    }
                }
                var list = this._directionMap2.get(url);
                i = 0;
                while (list.length > 0) {
                    var direction = list.pop();
                    if (direction > egret.ActionMovieClipDirectionType.DOWN) {
                        direction = this._actionMovieClipData.getReverseDir(direction);
                    }
                    var sheetUrl = this._actionMovieClipData.getSheetUrl2(url, direction);
                    var sheet = this._actionMovieClipData.getSheet(sheetUrl);
                    if (sheet) {
                        this.loadActionComplete2(sheet, sheetUrl);
                    }
                    else {
                        //因手机性能较低，将加载分布至各个帧加载，减少同时加载的数量，提高性能
                        egret.EnterFrameManager.getInstance().addExecute(RES.getResByUrl, null, (2 + Number(i)), [sheetUrl, this.loadActionComplete2, this, RES.ResourceItem.TYPE_SHEET], 1);
                        //RES.getResByUrl(url,this.loadActionComplete,this,RES.ResourceItem.TYPE_SHEET);
                        i++;
                    }
                }
            }
            else {
                egret.LogManager.error(this, "加载到无效的动作数据: url = " + url);
            }
        };
        ActionMovieClipManager._instance = null;
        return ActionMovieClipManager;
    })();
    egret.ActionMovieClipManager = ActionMovieClipManager;
    ActionMovieClipManager.prototype.__class__ = "egret.ActionMovieClipManager";
})(egret || (egret = {}));
