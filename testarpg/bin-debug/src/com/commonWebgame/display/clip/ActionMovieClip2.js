var egret;
(function (egret) {
    var ActionMovieClip2 = (function (_super) {
        __extends(ActionMovieClip2, _super);
        /**
         * 构造函数
         */
        function ActionMovieClip2() {
            _super.call(this);
            /**
             * 对称方向是否翻转Y轴
             * @type {boolean}
             */
            this.flipY = false;
            //当前动作方向
            this._direction = egret.ActionMovieClipDirectionType.UP;
            //当前动作类型
            this._actionType = egret.ActionType.PREPARE;
            //影片数据
            this._actionMovieClipVo = null;
            this.touchChildren = false;
        }
        var __egretProto__ = ActionMovieClip2.prototype;
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
        Object.defineProperty(__egretProto__, "actionMovieClipVo", {
            get: function () {
                return this._actionMovieClipVo;
            },
            /**
             * 影片数据
             * @param value:ActionMovieClipVo
             *
             */
            set: function (value) {
                this._actionMovieClipVo = value;
                this.setBaseMovieClipVo(this._actionType, this._direction);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "direction", {
            get: function () {
                return this._direction;
            },
            /**
             * 影片动作方向
             * @param value:int
             * @see ActionMovieClipDirectionType
             */
            set: function (value) {
                if (this._direction == value)
                    return;
                this._direction = value;
                this.setBaseMovieClipVo(-1, this._direction);
            },
            enumerable: true,
            configurable: true
        });
        //
        /**
         * 获取指定动作类型和方向的数据
         * @param actionType:int 动作类型
         * @param direction:int 方向
         * @return
         * @see ActionMovieClipData.getBaseMovieClipVo()
         */
        __egretProto__.getBaseMovieClipVo = function (actionType, direction) {
            if (direction === void 0) { direction = 0; }
            return egret.ActionMovieClipData.getInstance().getBaseMovieClipVo(this._actionMovieClipVo, actionType, direction);
        };
        //
        /**
         * 影片是否存在动作类型数据
         * @param actionType:int 动作类型
         * @return
         * @see ActionMovieClipData.hasActionType()
         */
        __egretProto__.hasActionType = function (actionType) {
            if (actionType === void 0) { actionType = 0; }
            return egret.ActionMovieClipData.getInstance().hasActionType(this._actionMovieClipVo, actionType);
        };
        //
        /**
         * 影片是否存在动作类型和方向数据
         * @param actionType:int 动作类型
         * @param direction:int 动作方向
         * @param checked:Boolean = true 是否检测对称方向数据，为 true 时，如果当前方向无数据，而对称方向有数据仍然返回 true
         * @return
         * @see ActionMovieClipData.hasDirectionType()
         */
        __egretProto__.hasDirectionType = function (actionType, direction, checked) {
            if (checked === void 0) { checked = true; }
            return egret.ActionMovieClipData.getInstance().hasDirectionType(this._actionMovieClipVo, actionType, direction, checked);
        };
        //
        __egretProto__.destroy = function () {
            if (this._isDestroy)
                return;
            _super.prototype.destroy.call(this);
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
            if (direction != -1)
                this._direction = direction;
            var index = this._direction;
            if (this._actionMovieClipVo) {
                var actionVos = this._actionMovieClipVo.baseMovieClipVos[this._actionType];
                if (actionVos)
                    var vo = actionVos[this._direction];
                if (vo) {
                    this.scaleX = 1;
                    if (this.flipY) {
                        this.scaleY = 1;
                    }
                }
                else if (actionVos) {
                    //反方向数据
                    index = egret.ActionMovieClipData.getInstance().getReverseDir(this._direction);
                    vo = actionVos[index];
                    if (vo) {
                        this.scaleX = -1;
                        if (this.flipY) {
                            this.scaleY = -1;
                        }
                    }
                }
            }
            this.baseMovieClipVo = vo;
        };
        //
        /**
         * 设置动作影片数据
         * @param vo:ActionMovieClipVo 影片数据
         * @param actionType:int = -1 动作类型 ActionType
         * @param direction:int = -1 动作方向 ActionMovieClipDirectionType
         *
         */
        __egretProto__.setActionMovieClipVo = function (vo, actionType, direction) {
            if (actionType === void 0) { actionType = -1; }
            if (direction === void 0) { direction = -1; }
            this._actionMovieClipVo = vo;
            this.setBaseMovieClipVo(actionType, direction);
        };
        __egretProto__.clear = function () {
            _super.prototype.clear.call(this);
            this._actionMovieClipVo = null;
        };
        return ActionMovieClip2;
    })(egret.BaseMovieClip2);
    egret.ActionMovieClip2 = ActionMovieClip2;
    ActionMovieClip2.prototype.__class__ = "egret.ActionMovieClip2";
})(egret || (egret = {}));
//# sourceMappingURL=ActionMovieClip2.js.map