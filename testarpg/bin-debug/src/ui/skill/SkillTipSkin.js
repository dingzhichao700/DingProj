var ui;
(function (ui) {
    var skill;
    (function (skill) {
        var SkillTipSkin = (function (_super) {
            __extends(SkillTipSkin, _super);
            function SkillTipSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [960, 640]);
                this.elementsContent = [this.imgMask_i(), this.imgBg_i(), this.txtName_i(), this.__3_i(), this.txtDesc_i(), this.item_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = SkillTipSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return SkillTipSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.imgBg_i = function () {
                var t = new egret.gui.UIAsset();
                this.imgBg = t;
                this.__s(t, ["height", "scale9Grid", "source", "width", "x", "y"], [246, egret.gui.getScale9Grid("30,20,14,29"), "bg_tips_png", 400, 112, 220]);
                return t;
            };
            __egretProto__.imgMask_i = function () {
                var t = new egret.gui.UIAsset();
                this.imgMask = t;
                this.__s(t, ["height", "scale9Grid", "source", "width", "x", "y"], [960, egret.gui.getScale9Grid("4,4,24,24"), "bg_19_png", 640, 0, 0]);
                return t;
            };
            __egretProto__.item_i = function () {
                var t = new egret.WuhunItem();
                this.item = t;
                this.__s(t, ["height", "skinName", "width", "x", "y"], [80, ui.wuhun.WuhunItemSkin, 80, 139, 234]);
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["scale9Grid", "source", "width", "x", "y"], [egret.gui.getScale9Grid("57,0,100,5"), "img_line1_png", 350, 134, 327]);
                return t;
            };
            __egretProto__.txtDesc_i = function () {
                var t = new egret.gui.Label();
                this.txtDesc = t;
                this.__s(t, ["height", "size", "text", "textAlign", "width", "x", "y"], [83, 24, "技能描述", "left", 340, 143, 354]);
                return t;
            };
            __egretProto__.txtName_i = function () {
                var t = new egret.gui.Label();
                this.txtName = t;
                this.__s(t, ["size", "text", "textAlign", "width", "x", "y"], [24, "技能名", "left", 205, 227, 262]);
                return t;
            };
            SkillTipSkin._skinParts = ["imgMask", "imgBg", "txtName", "txtDesc", "item"];
            return SkillTipSkin;
        })(egret.gui.Skin);
        skill.SkillTipSkin = SkillTipSkin;
        SkillTipSkin.prototype.__class__ = "ui.skill.SkillTipSkin";
    })(skill = ui.skill || (ui.skill = {}));
})(ui || (ui = {}));
//# sourceMappingURL=SkillTipSkin.js.map