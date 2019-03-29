var egret;
(function (egret) {
    /**
     * 基础技能，只需要播放即可
     */
    var ElementSkill = (function (_super) {
        __extends(ElementSkill, _super);
        /**
         * 构造函数
         */
        function ElementSkill() {
            _super.call(this);
        }
        var __egretProto__ = ElementSkill.prototype;
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
        return ElementSkill;
    })(egret.ElementEffect);
    egret.ElementSkill = ElementSkill;
    ElementSkill.prototype.__class__ = "egret.ElementSkill";
})(egret || (egret = {}));
