var ui;
(function (ui) {
    var skill;
    (function (skill) {
        var SkillViewSkin = (function (_super) {
            __extends(SkillViewSkin, _super);
            function SkillViewSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [960, 640]);
                this.elementsContent = [this.window_i(), this.__3_i(), this.__4_i(), this.__5_i(), this.itemCon_i(), this.imgSucc_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = SkillViewSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return SkillViewSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__4_i = function () {
                var t = new egret.BaseView();
                this.__s(t, ["height", "skinName", "width", "x", "y"], [80, ui.main.HeadListSkin, 479, 78, 83]);
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["bgSkill_jpg", 60, 171]);
                return t;
            };
            __egretProto__.imgSucc_i = function () {
                var t = new egret.gui.UIAsset();
                this.imgSucc = t;
                this.__s(t, ["source", "x", "y"], ["img_success_png", 216, 360]);
                return t;
            };
            __egretProto__.itemCon_i = function () {
                var t = new egret.gui.Group();
                this.itemCon = t;
                this.__s(t, ["height", "width", "x", "y"], [574, 494, 65, 176]);
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["title_skill_png", 283, 31]);
                return t;
            };
            __egretProto__.window_i = function () {
                var t = new egret.BaseView();
                this.window = t;
                this.__s(t, ["height", "skinName", "width"], [200, ui.WindowViewSkin, 200]);
                return t;
            };
            SkillViewSkin._skinParts = ["window", "itemCon", "imgSucc"];
            return SkillViewSkin;
        })(egret.gui.Skin);
        skill.SkillViewSkin = SkillViewSkin;
        SkillViewSkin.prototype.__class__ = "ui.skill.SkillViewSkin";
    })(skill = ui.skill || (ui.skill = {}));
})(ui || (ui = {}));
//# sourceMappingURL=SkillViewSkin.js.map