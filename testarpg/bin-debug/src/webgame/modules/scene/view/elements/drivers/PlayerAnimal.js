var egret;
(function (egret) {
    /**
     * 召唤兽
     */
    var PlayerAnimal = (function (_super) {
        __extends(PlayerAnimal, _super);
        //
        function PlayerAnimal() {
            _super.call(this);
        }
        var __egretProto__ = PlayerAnimal.prototype;
        //
        /**
         * 设置场景元素数据
         * @param value:SceneElementDataItem
         *
         */
        __egretProto__.setData = function (value) {
            _super.prototype.setData.call(this, value);
            egret.SceneElementData.getInstance().setSceneAvatarVo(this._sceneAvatarVo, value.lo);
        };
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
            if (this._isDestroy)
                return;
            if (!this._sceneAvatarVo.body)
                return;
            if (callBack && !thisObj) {
                throw new Error("未指定回调函数对象");
            }
            this._partTypes = egret.ActionPartType.TYPES_BODY_ONLY;
            //先播放，以设置动作类型和方向
            this._avatar.play(frameIndex, actionType, direction, loopCount, callBack, thisObj, startFun, startObj);
            this._avatar.setPartTypes(this._partTypes, this.getPartUrl, this, this.loadActionComplete, this);
            this._namePad.y = this._avatar.topLineY;
            this.clearAttack();
        };
        //
        /**
         * 获取优先攻击对象，各职业重写
         * @returns {null}
         */
        __egretProto__.getPriorityTarget = function () {
            return null;
        };
        //
        /**
         * 获取部件影片地址
         * @param partType:String ActionPartType 动作影片类型
         * @return
         */
        __egretProto__.getPartUrl = function (partType) {
            var path = egret.PathData.PATH_MOVIES_MONSTER;
            var movie = this._sceneAvatarVo[partType];
            var url = egret.dataManager().sceneElementData.getActionUrl(path, movie, this._avatar.actionType);
            return url;
        };
        //
        /**
         * 释放默认技能
         */
        __egretProto__.playSkill = function () {
            if (this._avatar.frameIndex == 1) {
                this.damage();
            }
            else if (this._avatar.frameIndex == this._avatar.frameIndexMax) {
                this.chaseArmies(this.armies);
            }
        };
        return PlayerAnimal;
    })(egret.ElementPlayer);
    egret.PlayerAnimal = PlayerAnimal;
    PlayerAnimal.prototype.__class__ = "egret.PlayerAnimal";
})(egret || (egret = {}));
//# sourceMappingURL=PlayerAnimal.js.map