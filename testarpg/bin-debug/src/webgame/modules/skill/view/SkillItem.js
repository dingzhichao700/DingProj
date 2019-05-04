var egret;
(function (egret) {
    var SkillItem = (function (_super) {
        __extends(SkillItem, _super);
        function SkillItem() {
            _super.call(this);
            this.skinName = "ui.skill.SkillItemSkin";
        }
        var __egretProto__ = SkillItem.prototype;
        Object.defineProperty(__egretProto__, "data", {
            set: function (vo) {
                this._vo = vo;
                if (this.isCreate) {
                    this.update();
                }
            },
            enumerable: true,
            configurable: true
        });
        __egretProto__.onCreate = function () {
            _super.prototype.onCreate.call(this);
            this.btnUp.addEventListener(egret.TouchEvent.TOUCH_END, this.onUp, this);
            this.update();
        };
        __egretProto__.update = function () {
            this.item.skillId = this._vo.id;
            var level = egret.SkillManager.getInstance().getSkillLevel(this._vo.id);
            this.txtName.text = this._vo.name + " Lv." + level;
            this.txtDesc.text = this._vo.desc;
            this.txtDesc.lineSpacing = 10;
            var cost = egret.SkillManager.getInstance().getLevelCost(level);
            this.txtCost.text = cost + "";
            this.txtCost.textColor = egret.MainControl.getInstance().coin >= cost ? 0x00000 : 0xff0000;
        };
        __egretProto__.onTouchHandler = function (e) {
            if (this._vo.id != 0) {
                egret.SkillControl.getInstance().openskillTip(this._vo.id);
            }
        };
        __egretProto__.onUp = function () {
            var level = egret.SkillManager.getInstance().getSkillLevel(this._vo.id);
            var cost = egret.SkillManager.getInstance().getLevelCost(level);
            if (egret.MainControl.getInstance().coin >= cost) {
                egret.SkillManager.getInstance().upSkill(this._vo.id);
                egret.SkillControl.getInstance().updateskillView();
                egret.MainControl.getInstance().reduceCoin(cost);
                egret.MainControl.getInstance().updateMainView();
            }
            else {
                egret.MainControl.getInstance().showWarn("金币不足");
            }
        };
        return SkillItem;
    })(egret.BaseView);
    egret.SkillItem = SkillItem;
    SkillItem.prototype.__class__ = "egret.SkillItem";
})(egret || (egret = {}));
//# sourceMappingURL=SkillItem.js.map