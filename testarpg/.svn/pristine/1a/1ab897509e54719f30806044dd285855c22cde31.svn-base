var egret;
(function (egret) {
    var ActionMovieClipVo = (function () {
        function ActionMovieClipVo() {
            /**
             * 动作影片 数据集 BaseMovieClipVo 2维数组，第1维为动作类型，第2维为方向
             */
            this.baseMovieClipVos = [];
            /**
             * 默认动作类型
             */
            this.defaultActionType = egret.ActionType.PREPARE;
            /**
             * 默认动作方向
             */
            this.defautlDirectionType = egret.ActionMovieClipDirectionType.DOWN;
            //未合成时的动作类型
            this._actionType = -1;
        }
        var __egretProto__ = ActionMovieClipVo.prototype;
        Object.defineProperty(__egretProto__, "actionType", {
            /**
             * 未合成时的动作类型  ActionType
             * @return
             *
             */
            get: function () {
                if (this._actionType == -1) {
                    for (var i = 1; i < this.baseMovieClipVos.length; i++) {
                        if (this.baseMovieClipVos[i]) {
                            this._actionType = i;
                            break;
                        }
                    }
                }
                return this._actionType;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 是否含有指定动作类型
         * @param actionType:int ActionType
         * @return
         *
         */
        __egretProto__.hasActionType = function (actionType) {
            if (actionType === void 0) { actionType = 0; }
            return this.baseMovieClipVos[actionType];
        };
        /**
         * 销毁数据
         *
         */
        __egretProto__.destroy = function () {
            var length = this.baseMovieClipVos.length;
            for (var i = 0; i < length; i++) {
                var array = this.baseMovieClipVos[i];
                var length1 = array.length;
                for (var i1 = 0; i1 < length1; i1++) {
                    var vo = array[i1];
                    vo.destroy();
                }
            }
            this.baseMovieClipVos = null;
        };
        return ActionMovieClipVo;
    })();
    egret.ActionMovieClipVo = ActionMovieClipVo;
    ActionMovieClipVo.prototype.__class__ = "egret.ActionMovieClipVo";
})(egret || (egret = {}));
//# sourceMappingURL=ActionMovieClipVo.js.map