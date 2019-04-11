var ui;
(function (ui) {
    var skill;
    (function (skill) {
        var SkillItemSkin = (function (_super) {
            __extends(SkillItemSkin, _super);
            function SkillItemSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [114, 495]);
                this.elementsContent = [this.__3_i(), this.__4_i(), this.txtName_i(), this.txtDesc_i(), this.item_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = SkillItemSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return SkillItemSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__4_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["genius_bg_png", 8, -1]);
                return t;
            };
            __egretProto__.item_i = function () {
                var t = new egret.WuhunItem();
                this.item = t;
                this.__s(t, ["height", "skinName", "width", "x", "y"], [80, ui.wuhun.WuhunItemSkin, 80, 20, 15]);
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["height", "scale9Grid", "source", "width", "x", "y"], [113, egret.gui.getScale9Grid("3,3,24,24"), "bg_21_png", 495, 0, 0]);
                return t;
            };
            __egretProto__.txtDesc_i = function () {
                var t = new egret.gui.Label();
                this.txtDesc = t;
                this.__s(t, ["fontFamily", "height", "size", "text", "textColor", "width", "x", "y"], ["等线", 57, 22, "技能描述", 0x080809, 291, 125, 53]);
                return t;
            };
            __egretProto__.txtName_i = function () {
                var t = new egret.gui.Label();
                this.txtName = t;
                this.__s(t, ["bold", "fontFamily", "text", "textColor", "x", "y"], [true, "等线", "七伤拳 Lv.3", 0x3F3F3F, 121, 16]);
                return t;
            };
            SkillItemSkin._skinParts = ["txtName", "txtDesc", "item"];
            return SkillItemSkin;
        })(egret.gui.Skin);
        skill.SkillItemSkin = SkillItemSkin;
        SkillItemSkin.prototype.__class__ = "ui.skill.SkillItemSkin";
    })(skill = ui.skill || (ui.skill = {}));
})(ui || (ui = {}));
//# sourceMappingURL=SkillItemSkin.js.map