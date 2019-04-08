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
            this.update();
        };
        __egretProto__.update = function () {
            this.imgSkill.source = "resource/skill/" + this._vo.id + ".png";
            this.txtName.text = this._vo.name;
            this.txtDesc.text = this._vo.desc;
        };
        return SkillItem;
    })(egret.BaseView);
    egret.SkillItem = SkillItem;
    SkillItem.prototype.__class__ = "egret.SkillItem";
})(egret || (egret = {}));
