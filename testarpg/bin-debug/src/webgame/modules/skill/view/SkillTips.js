var egret;
(function (egret) {
    var SkillTips = (function (_super) {
        __extends(SkillTips, _super);
        function SkillTips() {
            _super.call(this);
            this._id = 0;
            this.layerType = egret.BasePanel.LAYER_TIP;
            this.skinName = "ui.skill.SkillTipSkin";
        }
        var __egretProto__ = SkillTips.prototype;
        __egretProto__.onOpen = function () {
            _super.prototype.onOpen.call(this);
            this.imgMask.addEventListener(egret.TouchEvent.TOUCH_END, this.close, this);
            this.update();
        };
        __egretProto__.setData = function (id) {
            this._id = id;
            this.update();
        };
        __egretProto__.update = function () {
            if (this.isCreate) {
                if (this._id == 0) {
                    return;
                }
                var cfg = egret.SkillManager.getInstance().getCfg(this._id);
                this.item.touchEnabled = false;
                this.item.skillId = this._id;
                this.txtName.text = cfg.name;
                this.txtDesc.text = cfg.desc;
            }
        };
        return SkillTips;
    })(egret.BasePanel);
    egret.SkillTips = SkillTips;
    SkillTips.prototype.__class__ = "egret.SkillTips";
})(egret || (egret = {}));
//# sourceMappingURL=SkillTips.js.map