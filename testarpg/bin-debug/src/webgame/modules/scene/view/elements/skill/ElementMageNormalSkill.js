var egret;
(function (egret) {
    /**
     * 法师和射手普通攻击技能，打出去后
     */
    var ElementMageNormalSkill = (function (_super) {
        __extends(ElementMageNormalSkill, _super);
        function ElementMageNormalSkill() {
            _super.call(this);
            //缓动缓存
            this._tweenChangeParam = {};
            this._tweenToParam = {};
        }
        var __egretProto__ = ElementMageNormalSkill.prototype;
        //
        __egretProto__.addToScene = function () {
            _super.prototype.addToScene.call(this);
            this.play(0, egret.ActionType.PREPARE, this._avatar.direction, this.playCount, this.playEnd, this);
        };
        //
        __egretProto__.removeFromScene = function () {
            _super.prototype.removeFromScene.call(this);
            this.playCount = 0;
        };
        //
        /**
         * 攻击目标
         * @param x 技能初始x
         * @param y 技能初始y
         * @param data 攻击目标数据
         * @param offsetX 攻击目标点偏移x
         * @param offsetY 攻击目标点偏移y
         * @param offsetRotation 攻击目标点偏移角度，因动作图片本身可能已有角度，用此参数纠正
         * @param radius 技能移动半径
         * @param time 移动时间
         */
        __egretProto__.attackTo = function (x, y, data, offsetX, offsetY, offsetRotation, radius, time) {
            if (time === void 0) { time = 600; }
            if (!data) {
                this.moveComplete();
                return;
            }
            this._attackTarget = data;
            this._offsetAttackX = offsetX;
            this._offsetAttackY = offsetY;
            this.x = x;
            this.y = y;
            var tx = this._attackTarget.vo.x + this._offsetAttackX;
            var ty = this._attackTarget.vo.y + this._offsetAttackY;
            var radian = Math.atan2(ty - y, tx - x);
            tx = Math.cos(radian) * radius + x;
            ty = Math.sin(radian) * radius + y;
            radian = radian / Math.PI * 180;
            this.rotation = radian + offsetRotation;
            this._isEnd = false;
            this._tweenChangeParam.onChange = this.onChange;
            this._tweenChangeParam.onChangeObj = this;
            this._tweenToParam.x = tx;
            this._tweenToParam.y = ty;
            egret.Tween.get(this, this._tweenChangeParam).to(this._tweenToParam, time).call(this.moveComplete, this);
        };
        //
        /**
         * 技能移动时
         */
        __egretProto__.onChange = function () {
            if (this._isEnd) {
                this.moveComplete();
                return;
            }
            var x = this._attackTarget.vo.x + this._offsetAttackX;
            var y = this._attackTarget.vo.y + this._offsetAttackY;
            var distance = egret.DimensionUtil.distance2(this._x, this._y, x, y);
            if (Math.abs(distance) < 10) {
                this._isEnd = true;
            }
        };
        //
        /**
         * 技能移动结束
         */
        __egretProto__.moveComplete = function () {
            egret.Tween.removeTweens(this);
            this.playEnd();
        };
        //
        /**
         * 获取部件影片地址
         * @param partType:String ActionPartType 动作影片类型
         * @return
         */
        __egretProto__.getPartUrl = function (partType) {
            var path = egret.PathData.PATH_MOVIES_SKILL;
            var movie = this._sceneAvatarVo[partType];
            var url = egret.dataManager().sceneElementData.getActionUrl(path, movie, this._avatar.actionType);
            return url;
        };
        return ElementMageNormalSkill;
    })(egret.ElementEffect);
    egret.ElementMageNormalSkill = ElementMageNormalSkill;
    ElementMageNormalSkill.prototype.__class__ = "egret.ElementMageNormalSkill";
})(egret || (egret = {}));
