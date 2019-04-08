var egret;
(function (egret) {
    var SkillControl = (function () {
        function SkillControl() {
        }
        var __egretProto__ = SkillControl.prototype;
        SkillControl.getInstance = function () {
            if (!SkillControl._instance) {
                SkillControl._instance = new SkillControl();
            }
            return SkillControl._instance;
        };
        __egretProto__.openskillView = function () {
            if (!this.skillView) {
                this.skillView = new egret.SkillView();
            }
            this.skillView.open();
        };
        __egretProto__.openskillTip = function (id) {
            if (!this.skillTipView) {
                this.skillTipView = new egret.SkillTips();
            }
            this.skillTipView.setData(id);
            this.skillTipView.open();
        };
        return SkillControl;
    })();
    egret.SkillControl = SkillControl;
    SkillControl.prototype.__class__ = "egret.SkillControl";
})(egret || (egret = {}));
//# sourceMappingURL=SkillControl.js.map