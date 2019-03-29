var egret;
(function (egret) {
    var ElementEffect = (function (_super) {
        __extends(ElementEffect, _super);
        /**
         * 构造函数
         */
        function ElementEffect() {
            _super.call(this);
            /**
             * 播放次数，达到次数后自动删除或停止，默认为1次，0为不限制次数
             * @type {number}
             */
            this.playCount = 1;
            //宿主
            this._master = null;
            //x轴位置偏移量
            this._offsetX = 0;
            //y轴位置偏移量
            this._offsetY = 0;
            /**
             * 特效播放关键点处理 function(...args):void{}
             */
            this._hitHandler = null;
            this._hitHandlerTarget = null;
            //关键点帧索引参数
            this._frameIndexParam = 0;
            //关键点帧索引
            this._frameIndex = -1;
            //hitHandler参数
            this._params = null;
            this.touchChildren = false;
            this.touchEnabled = false;
            if (this._namePad.parent)
                this._namePad.parent.removeChild(this._namePad);
            this._avatar.isGhost = false;
            this.setIsCheckResource(false);
        }
        var __egretProto__ = ElementEffect.prototype;
        /**
         * 特效播放关键点处理
         *
         */
        __egretProto__.enterFrameHandler = function () {
            if (this._hitHandler) {
                if (this._frameIndex == -1)
                    this._frameIndex = this.getFrameIndex();
                if (this._avatar.frameIndex >= this._frameIndex) {
                    //this._avatar.removeEventListener(ActionMovieClipEvent.CLIP_ENTER_FRAME,this.enterFrameHandler,this);
                    this._hitHandler.apply(this._hitHandlerTarget, this._params);
                    this._hitHandler = null;
                    this._hitHandlerTarget = null;
                }
            }
        };
        //
        /**
         * 获取帧索引值
         * @return
         *
         */
        __egretProto__.getFrameIndex = function () {
            var index = 0;
            if ((this._frameIndexParam < 0 && this._frameIndexParam > -1) || (this._frameIndexParam > 0 && this._frameIndexParam < 1)) {
                index = this._avatar.totalFrames * this._frameIndexParam;
            }
            else if (this._frameIndexParam < 0) {
                index = this._avatar.totalFrames + this._frameIndexParam;
            }
            else if (this._frameIndexParam > 0) {
                index = this._frameIndexParam;
            }
            if (index < 0)
                index = 0;
            if (index >= this._avatar.totalFrames)
                index = this._avatar.totalFrames - 1;
            return index;
        };
        //
        /**
         *  特效播放关键点处理
         * @param fun 处理函数 function(...args):void{}
         * @param frameIndex:Number = -1 关键点帧索引，即在此帧调用函数，正数为正常索引值，负数为最后一帧开始往前的帧索引值，小数为总帧数的百分比所在的帧索引值
         * @param args 传递给fun的参数
         *
         */
        __egretProto__.setHitHandler = function (fun, target, frameIndex) {
            if (frameIndex === void 0) { frameIndex = -1; }
            var args = [];
            for (var _i = 3; _i < arguments.length; _i++) {
                args[_i - 3] = arguments[_i];
            }
            this._hitHandler = fun;
            this._hitHandlerTarget = target;
            this._params = args;
            this._frameIndexParam = frameIndex;
            this._frameIndex = -1;
        };
        __egretProto__.addToScene = function () {
            _super.prototype.addToScene.call(this);
            this.play(0, egret.ActionType.PREPARE, this._avatar.direction, this.playCount, this.playEnd, this);
            //this._avatar.addEventListener(ActionMovieClipEvent.CLIP_ENTER_FRAME,this.enterFrameHandler,this);
            this._avatar.setFrameHandler(this.enterFrameHandler, this);
        };
        //
        /**
         * 设置特效宿主，特效位置将与宿主同步
         * @param target:DisplayObject 宿主元素
         * @param offsetX:Number = 0 x轴位置偏移量
         * @param offsetY:Number = 0 y轴位置偏移量
         */
        __egretProto__.setMaster = function (target, offsetX, offsetY) {
            if (offsetX === void 0) { offsetX = 0; }
            if (offsetY === void 0) { offsetY = 0; }
            this._master = target;
            this._offsetX = offsetX;
            this._offsetY = offsetY;
            if (!egret.EnterFrameManager.getInstance().hasExecute(this._posId))
                this._posId = egret.EnterFrameManager.getInstance().addExecute(this.ajustPosition, this, 1);
        };
        //
        /**
         * 设置技能角度
         * @param rotation 角度值0-360
         *
         */
        __egretProto__.setEffProperties = function (rotation, scaleX, scaleY) {
            if (scaleX === void 0) { scaleX = 1; }
            if (scaleY === void 0) { scaleY = 1; }
            this._avatar.rotation = rotation;
            this._avatar.scaleX = scaleX;
            this._avatar.scaleY = scaleY;
        };
        /**
         * 调整技能坐标
         *
         */
        __egretProto__.ajustPosition = function () {
            if (!this._master)
                return;
            this.x = this._master.x + this._offsetX;
            this.y = this._master.y + this._offsetY;
        };
        /**
         * 播放完成处理
         *
         */
        __egretProto__.playEnd = function () {
            if (this.scene) {
                this.scene.removeElement(this);
            }
            this.removeFromScene();
        };
        //
        __egretProto__.removeFromScene = function () {
            _super.prototype.removeFromScene.call(this);
            this.setEffProperties(0);
            this.playCount = 1;
            this._avatar.direction = egret.ActionMovieClipDirectionType.UP;
            //this._avatar.removeEventListener(ActionMovieClipEvent.CLIP_ENTER_FRAME,this.enterFrameHandler,this);
            this._avatar.setFrameHandler(null);
            egret.EnterFrameManager.getInstance().removeExecute(this._posId);
        };
        //
        /**
         * 获取部件影片地址
         * @param partType:String ActionPartType 动作影片类型
         * @return
         */
        __egretProto__.getPartUrl = function (partType) {
            var path = egret.PathData.PATH_MOVIES_EFFECT;
            var movie = this._sceneAvatarVo[partType];
            var url = egret.dataManager().sceneElementData.getActionUrl(path, movie, this._avatar.actionType);
            return url;
        };
        return ElementEffect;
    })(egret.SceneElementInteractive);
    egret.ElementEffect = ElementEffect;
    ElementEffect.prototype.__class__ = "egret.ElementEffect";
})(egret || (egret = {}));
