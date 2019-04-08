var egret;
(function (egret) {
    var ElementMonster = (function (_super) {
        __extends(ElementMonster, _super);
        /**
         * 构造函数
         */
        function ElementMonster() {
            _super.call(this);
            this.setIsCheckResource(false);
        }
        var __egretProto__ = ElementMonster.prototype;
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
        };
        return ElementMonster;
    })(egret.SceneElementDriver);
    egret.ElementMonster = ElementMonster;
    ElementMonster.prototype.__class__ = "egret.ElementMonster";
})(egret || (egret = {}));
//# sourceMappingURL=ElementMonster.js.map