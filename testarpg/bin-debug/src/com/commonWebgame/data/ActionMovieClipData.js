var egret;
(function (egret) {
    var ActionMovieClipData = (function () {
        /**
         * 构造函数
         */
        function ActionMovieClipData() {
            //水平对称方向解析表
            this._dirMap = null;
            //动作url对应vo表
            this._actionVoMap = null;
            this._dirMap = new egret.HashMap();
            //左下与右下对称，依此类推
            this._dirMap.put(egret.ActionMovieClipDirectionType.DOWN_LEFT, egret.ActionMovieClipDirectionType.DOWN_RIGHT);
            this._dirMap.put(egret.ActionMovieClipDirectionType.LEFT, egret.ActionMovieClipDirectionType.RIGHT);
            this._dirMap.put(egret.ActionMovieClipDirectionType.UP_LEFT, egret.ActionMovieClipDirectionType.UP_RIGHT);
            //反之
            this._dirMap.put(egret.ActionMovieClipDirectionType.DOWN_RIGHT, egret.ActionMovieClipDirectionType.DOWN_LEFT);
            this._dirMap.put(egret.ActionMovieClipDirectionType.RIGHT, egret.ActionMovieClipDirectionType.LEFT);
            this._dirMap.put(egret.ActionMovieClipDirectionType.UP_RIGHT, egret.ActionMovieClipDirectionType.UP_LEFT);
            this._actionVoMap = new egret.HashMap();
            this._actionDataMap = new egret.HashMap();
            this._sheetMap = new egret.HashMap();
            this._sheetUrlMap = new egret.HashMap();
        }
        var __egretProto__ = ActionMovieClipData.prototype;
        //
        ActionMovieClipData.getInstance = function () {
            return ActionMovieClipData._instance || (ActionMovieClipData._instance = new ActionMovieClipData());
        };
        //
        /**
         * 获取图片对应影片数据 json 文件
         * @param url
         * @returns {string}
         */
        __egretProto__.getJsonUrl = function (url) {
            url = url.replace(ActionMovieClipData.SHEET_PREFIX, "");
            return url;
        };
        //
        /**
         * 获取图片对应影片数据 json 文件，动作方向图片拆分
         * @param url
         * @returns {string}
         */
        __egretProto__.getJsonUrl2 = function (url) {
            url = url.replace(ActionMovieClipData.SHEET_PREFIX, "");
            var array = url.split("_");
            array.pop();
            url = array.join("_") + ".json";
            return url;
        };
        //
        /**
         * 根据影片配置地址获取图片配置地址
         * @param url
         * @returns {string}
         */
        __egretProto__.getSheetUrl = function (url) {
            var array = url.split("\/");
            var name = array[array.length - 1].split(".")[0];
            url = url.replace(name, ActionMovieClipData.SHEET_PREFIX + name);
            return url;
        };
        //
        /**
         * 根据影片配置地址获取图片配置地址，动作方向图片拆分
         * @param url
         * @returns {string}
         */
        __egretProto__.getSheetUrl2 = function (url, direction) {
            var array = url.split("\/");
            var name = array[array.length - 1].split(".")[0];
            url = url.replace(name, ActionMovieClipData.SHEET_PREFIX + name + "_" + direction);
            return url;
        };
        //
        /**
         * 保存影片数据
         * @param url:String 地址
         * @param data 影片数据
         *
         */
        __egretProto__.setActionData = function (url, data) {
            if (this._actionDataMap.containsKey(url)) {
                egret.LogManager.error(this, "重复添加影片数据: url = " + url);
            }
            else {
                this._actionDataMap.put(url, data);
            }
        };
        //
        /**
         * 获取影片数据
         * @param url:String 地址
         * @return
         *
         */
        __egretProto__.getActionData = function (url) {
            return this._actionDataMap.get(url);
        };
        //
        /**
         * 保存动作图片纹理集
         * @param url 图片地址
         * @param sheet 图片集
         */
        __egretProto__.setSheet = function (url, sheet) {
            this._sheetMap.put(url, sheet);
            this._sheetUrlMap.put(sheet.hashCode, url);
        };
        //
        /**
         * 获取动作图片
         * @param url 图片地址
         * @returns {any}
         */
        __egretProto__.getSheet = function (url) {
            return this._sheetMap.get(url);
        };
        //
        /**
         * 获取动作图片地址
         * @param sheet 动作图片
         * @returns {any}
         */
        __egretProto__.getUrlBySheet = function (sheet) {
            return this._sheetUrlMap.get(sheet.hashCode);
        };
        //
        /**
         * 保存影片数据
         * @param url:String 地址
         * @param vo:ActionMovieClipVo 数据
         *
         */
        __egretProto__.setActionMoveClipVo = function (url, vo) {
            if (this._actionVoMap.containsKey(url)) {
                egret.LogManager.error(this, "重复添加ActionMovieClipVo数据: url = " + url);
            }
            else {
                this._actionVoMap.put(url, vo);
            }
        };
        //
        /**
         * 获取影片数据
         * @param url:String 地址
         * @return
         *
         */
        __egretProto__.getActionMovieClipVo = function (url) {
            return this._actionVoMap.get(url);
        };
        //
        /**
         * 合成Vo，将不同类型的动作数据合成，对于相同 url 的影片数据，只需要加载一次，即可全局共用
         * @param source:ActionMovieClipVo 原始vo，为空时返avo参数的值
         * @param avo:ActionMovieClipVo 要合成到原始vo的新数据
         * @return
         *
         */
        __egretProto__.combinneActionMovieClipVo = function (source, avo) {
            if (!avo) {
                egret.LogManager.error(this, "合成到原始vo的新数据不能为空: avo = " + avo);
                return null;
            }
            if (!source) {
                return avo;
            }
            else {
                for (var p in avo.baseMovieClipVos) {
                    if (avo.baseMovieClipVos[p])
                        source.baseMovieClipVos[p] = avo.baseMovieClipVos[p];
                }
            }
            return source;
        };
        /**
         * 获取影片数据第一个有效动作的类型和方向数据
         * @param vo:ActionMovieClipVo 影片数据
         * @param actionType:int = -1 动作类型，-1时使用默认值:ActionMovieClipDirectionType.UP
         * @return 没有时返回null，否则返回{actionType:value,direction:value}
         *
         */
        __egretProto__.getValidateActionData = function (vo, actionType) {
            if (actionType === void 0) { actionType = -1; }
            if (!vo)
                return null;
            var direction = egret.ActionMovieClipDirectionType.UP;
            if (actionType == -1)
                actionType = egret.ActionType.PREPARE;
            while (!ActionMovieClipData.getInstance().hasDirectionType(vo, actionType, direction)) {
                direction++;
                if (actionType >= egret.ActionType.MAX && direction >= egret.ActionMovieClipDirectionType.MAX) {
                    return null;
                }
                if (direction > egret.ActionMovieClipDirectionType.MAX) {
                    direction = egret.ActionMovieClipDirectionType.UP;
                    actionType++;
                    if (actionType > egret.ActionType.MAX) {
                        actionType = egret.ActionType.PREPARE;
                    }
                }
            }
            return { actionType: actionType, direction: direction };
        };
        //
        /**
         * 获取影片Vo，指定方向没有数据时自动检测水平对称方向是否有数据
         * @param actionMovieClipVo:ActionMovieClipVo 动作Vo
         * @param actionType:int 动作类型
         * @param direction:int 动作方向
         * @param checked:Boolean = true 是否检测对称方向数据，为 true 时，如果当前方向无数据，而对称方向有数据则返回对称方向的数据
         * @return
         *
         */
        __egretProto__.getBaseMovieClipVo = function (actionMovieClipVo, actionType, direction, checked) {
            if (checked === void 0) { checked = true; }
            if (actionMovieClipVo)
                var actionVos = actionMovieClipVo.baseMovieClipVos[actionType];
            if (actionVos) {
                var vo = actionVos[direction];
                if (!vo && checked) {
                    //检测水平对称方向是否有数据
                    var index = this.getReverseDir(direction);
                    vo = actionVos[index];
                }
            }
            return vo;
        };
        //
        /**
         * 获取影片Vo，指定方向没有数据时自动检测水平对称方向是否有数据
         * @param actionMovieClipVo:ActionMovieClipVo 动作Vo
         * @param actionType:int 动作类型
         * @param direction:int 动作方向
         * @return
         *
         */
        __egretProto__.getBaseMovieClipVo2 = function (actionMovieClipVo, actionType, direction) {
            if (direction === void 0) { direction = 0; }
            var actionVos = actionMovieClipVo.baseMovieClipVos[actionType];
            if (actionVos) {
                var vo = actionVos[direction];
                if (!vo) {
                    //检测水平对称方向是否有数据
                    var index = this.getReverseDir(direction);
                    vo = actionVos[index];
                }
            }
            return vo;
        };
        //
        __egretProto__.hasActionType = function (actionMovieClipVo, actionType) {
            if (actionType === void 0) { actionType = 0; }
            var actionVos = actionMovieClipVo.baseMovieClipVos[actionType];
            return actionVos != null;
        };
        //
        /**
         * 影片是否存在动作类型和方向数据
         * @param actionType:int 动作类型
         * @param direction:int 动作方向
         * @param checked:Boolean = true 是否检测对称方向数据，为 true 时，如果当前方向无数据，而对称方向有数据仍然返回 true
         * @return
         */
        __egretProto__.hasDirectionType = function (actionMovieClipVo, actionType, direction, checked) {
            if (checked === void 0) { checked = true; }
            var vo = this.getBaseMovieClipVo(actionMovieClipVo, actionType, direction, checked);
            return vo != null;
        };
        //
        /**
         * 影片是否存在动作类型和方向数据和图片
         * @param actionType:int 动作类型
         * @param direction:int 动作方向
         * @return
         */
        __egretProto__.hasDirectionTypeTexture = function (actionMovieClipVo, actionType, direction) {
            var vo = this.getBaseMovieClipVo(actionMovieClipVo, actionType, direction, true);
            return vo && vo.hasFrameTexture;
        };
        //
        __egretProto__.setFrameRate = function (actionMovieClipVo, actionType, direction, frameRate) {
            if (frameRate === void 0) { frameRate = 0; }
            var vo = this.getBaseMovieClipVo(actionMovieClipVo, actionType, direction);
            if (vo) {
                vo.frameRate = Math.max(1, frameRate);
            }
            else {
                egret.LogManager.error(this, "setFrameRate()没有播放数据:actionType = " + actionType + ",direction = " + direction);
            }
        };
        //
        __egretProto__.setShadow = function (actionMovieClipVo, actionType, direction, width, height) {
            if (height === void 0) { height = 0; }
            var vo = this.getBaseMovieClipVo(actionMovieClipVo, actionType, direction);
            if (vo) {
                vo.shadowWidth = width;
                vo.shadowHeight = height;
            }
            else {
                egret.LogManager.error(this, "setShadow()没有播放数据:actionType = " + actionType + ",direction = " + direction);
            }
        };
        //
        __egretProto__.setCenterPoint = function (actionMovieClipVo, actionType, direction, x, y) {
            if (y === void 0) { y = 0; }
            var vo = this.getBaseMovieClipVo(actionMovieClipVo, actionType, direction);
            if (vo) {
                vo.centerPoint.x = x;
                vo.centerPoint.y = y;
            }
            else {
                egret.LogManager.error(this, "setCenterPoint()没有播放数据:actionType = " + actionType + ",direction = " + direction);
            }
        };
        //
        __egretProto__.setOriginalPoint = function (actionMovieClipVo, actionType, direction, offsetX, offsetY) {
            if (offsetY === void 0) { offsetY = 0; }
            var vo = this.getBaseMovieClipVo(actionMovieClipVo, actionType, direction);
            if (vo) {
                var length = vo.dataItems.length;
                for (var i = 0; i < length; i++) {
                    var item = vo.dataItems[i];
                    item.x += offsetX;
                    item.y += offsetY;
                }
            }
            else {
                egret.LogManager.error(this, "setCenterPoint()没有播放数据:actionType = " + actionType + ",direction = " + direction);
            }
        };
        //
        __egretProto__.setTopLineY = function (actionMovieClipVo, actionType, direction, y) {
            if (y === void 0) { y = 0; }
            var vo = this.getBaseMovieClipVo(actionMovieClipVo, actionType, direction);
            if (vo) {
                vo.topLineY = y;
            }
            else {
                egret.LogManager.error(this, "setTopLineY()没有播放数据:actionType = " + actionType + ",direction = " + direction);
            }
        };
        //
        /**
         * 计算方向数据
         * @param ox:Number 当前x坐标
         * @param oy:Number 当前y坐标
         * @param x:Number 目标x坐标
         * @param y:Number 目标y坐标
         * @return
         *
         */
        __egretProto__.calculateDirection = function (ox, oy, x, y, isTwo) {
            if (isTwo === void 0) { isTwo = false; }
            var dx = x - ox;
            var dy = y - oy;
            var value = Math.atan2(dy, dx);
            var next = 0;
            var pv = 0;
            var nv = 0;
            var length = ActionMovieClipData.RADIANS_MAP.length;
            for (var i = 0; i < length; i++) {
                if (value >= ActionMovieClipData.RADIANS_MAP[i]) {
                    next = i + 1;
                    if (isTwo)
                        next = i + 4;
                    //最多循环到第8个，不可能循环到第9个
                    if (value <= ActionMovieClipData.RADIANS_MAP[next]) {
                        //计算离上一值和下一个值的距离
                        pv = value - ActionMovieClipData.RADIANS_MAP[i];
                        nv = ActionMovieClipData.RADIANS_MAP[next] - value;
                        if (pv <= nv)
                            return ActionMovieClipData.DIRECTION_MAP[i];
                        else
                            return ActionMovieClipData.DIRECTION_MAP[next];
                    }
                    if (isTwo)
                        i += 3;
                }
            }
            egret.LogManager.error(this, "找不到方向数据");
            return egret.ActionMovieClipDirectionType.UP;
        };
        //
        /**
         * 获取水平对称方向
         * @param direction:int
         * @return
         * @see ActionMovieClipDirectionType
         */
        __egretProto__.getReverseDir = function (direction) {
            return this._dirMap.get(direction);
        };
        ActionMovieClipData._instance = null;
        //图片打包前缀
        ActionMovieClipData.SHEET_PREFIX = "sheet_";
        //弧度对应方向表
        ActionMovieClipData.RADIANS_MAP = [
            -Math.PI,
            -Math.PI * 3 / 4,
            -Math.PI / 2,
            -Math.PI / 4,
            0,
            Math.PI / 4,
            Math.PI / 2,
            Math.PI * 3 / 4,
            Math.PI
        ];
        ActionMovieClipData.DIRECTION_MAP = [
            egret.ActionMovieClipDirectionType.LEFT,
            egret.ActionMovieClipDirectionType.UP_LEFT,
            egret.ActionMovieClipDirectionType.UP,
            egret.ActionMovieClipDirectionType.UP_RIGHT,
            egret.ActionMovieClipDirectionType.RIGHT,
            egret.ActionMovieClipDirectionType.DOWN_RIGHT,
            egret.ActionMovieClipDirectionType.DOWN,
            egret.ActionMovieClipDirectionType.DOWN_LEFT,
            egret.ActionMovieClipDirectionType.LEFT
        ];
        return ActionMovieClipData;
    })();
    egret.ActionMovieClipData = ActionMovieClipData;
    ActionMovieClipData.prototype.__class__ = "egret.ActionMovieClipData";
})(egret || (egret = {}));
