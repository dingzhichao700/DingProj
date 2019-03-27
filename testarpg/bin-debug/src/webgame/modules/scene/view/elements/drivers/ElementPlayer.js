var egret;
(function (egret) {
    var ElementPlayer = (function (_super) {
        __extends(ElementPlayer, _super);
        /**
         * 构造函数
         */
        function ElementPlayer() {
            _super.call(this);
            this.speed = 8;
        }
        var __egretProto__ = ElementPlayer.prototype;
        //
        /**
         * 更新动作影片显示
         * @param value:SceneElementDataItem
         *
         */
        __egretProto__.updateAvatar = function (value) {
            this.setData(value);
            this._avatar.clear();
            if (this.stage && this._partTypes) {
                this._avatar.setPartTypes(this._partTypes, this.getPartUrl, this, this.loadActionComplete, this);
            }
        };
        //
        /**
         * 设置场景元素数据
         * @param value:SceneElementDataItem
         *
         */
        __egretProto__.setData = function (value) {
            _super.prototype.setData.call(this, value);
            var playerVo = value.vo;
            //SceneElementData.getInstance().setSceneAvatarVoPlayer(this._sceneAvatarVo,
            //		playerVo.vocation,playerVo.sex,playerVo.mountsState,playerVo.bodyLevel,
            //		playerVo.weaponLevel,playerVo.wingLevel,playerVo.mountsLevel);
            egret.SceneElementData.getInstance().setSceneAvatarVoPlayer2(this._sceneAvatarVo, playerVo.vocation, playerVo.sex, playerVo.bodyLevel, playerVo.weaponLevel, playerVo.wingLevel);
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
            if (this._isLocked)
                return;
            if (this._isDestroy)
                return;
            if (!this._sceneAvatarVo.body)
                return;
            if ((this._data.vo).mountsState == egret.MountedType.NONE) {
                //this._partTypes = ActionPartType.TYPES_BODY_ONLY;
                this._partTypes = egret.ActionPartType.TYPES_NORMAL;
            }
            else {
                this._partTypes = egret.ActionPartType.TYPES;
                //飞行状态，待机与行走一样
                if ((this._data.vo).mountsState == egret.MountedType.FLYED) {
                    actionType = egret.ActionType.PREPARE;
                }
            }
            //先播放，以设置动作类型和方向
            this._avatar.play(frameIndex, actionType, direction, loopCount, callBack, thisObj, startFun, startObj);
            this._avatar.setPartTypes(this._partTypes, this.getPartUrl, this, this.loadActionComplete, this);
            this.clearAttack();
            this._namePad.y = this._avatar.topLineY;
        };
        //
        /**
         * 获取部件影片地址
         * @param partType:String ActionPartType 动作影片类型
         * @return
         */
        __egretProto__.getPartUrl = function (partType) {
            var path = null;
            if (partType == egret.ActionPartType.BODY) {
                path = egret.PathData.PATH_MOVIES_PLAYER;
            }
            else {
                if (partType == egret.ActionPartType.WEAPON) {
                    path = egret.PathData.PATH_MOVIES_WEAPON;
                }
                else if (partType == egret.ActionPartType.WING) {
                    path = egret.PathData.PATH_MOVIES_WING;
                }
                else if (partType == egret.ActionPartType.MOUNTS) {
                    path = egret.PathData.PATH_MOVIES_MOUNTS;
                }
            }
            var movie = this._sceneAvatarVo[partType];
            //若动作影片改变时，只需要改变
            //_data.lo.movieName的值即可
            var url = egret.dataManager().sceneElementData.getActionUrl(path, movie, this._avatar.actionType);
            return url;
        };
        //
        /**
         * 获取优先攻击对象，各职业重写
         * @returns {null}
         */
        __egretProto__.getPriorityTarget = function () {
            var playerVo = this.data.vo;
            for (var i in this.armies) {
                var vo = this.armies[i].vo;
                if (vo.hp > 0 && vo instanceof egret.ScenePlayerVo) {
                    if (vo.vocation == playerVo.vocation) {
                        return this.armies[i];
                    }
                }
            }
            return null;
        };
        //
        /**
         * 检测自动攻击
         */
        __egretProto__.checkAutoAttack = function () {
        };
        //
        /**
         * 检测自动攻击2，玩家在攻击结束时检测，不使用定时器方法checkAutoAttack()
         */
        __egretProto__.checkAutoAttack2 = function () {
            if (this._isLocked)
                return;
            if (this._attackTarget && this._attackTarget.vo.hp <= 0) {
                this.chaseArmies(this.armies);
            }
            else {
                this.attack();
            }
        };
        //
        /**
         * 玩家攻击方法
         */
        __egretProto__.attack = function () {
            if (this._isLocked)
                return;
            if (this.isSkillStatus)
                return;
            if (!this._attackTarget)
                return;
            if (this._attackTarget.vo.hp <= 0) {
                this.chaseArmies(this.armies);
                return;
            }
            this.stopMove();
            var direction = egret.ActionMovieClipData.getInstance().calculateDirection(this.x, this.y, this._attackTarget.vo.x, this._attackTarget.vo.y);
            if (this._avatar.actionType == egret.ActionType.ATTACK) {
                this.direction = direction;
            }
            else {
                this.play(0, egret.ActionType.ATTACK, direction);
                this._avatar.setFrameHandler(this.playSkill, this);
            }
        };
        return ElementPlayer;
    })(egret.SceneElementDriver);
    egret.ElementPlayer = ElementPlayer;
    ElementPlayer.prototype.__class__ = "egret.ElementPlayer";
})(egret || (egret = {}));
//# sourceMappingURL=ElementPlayer.js.map