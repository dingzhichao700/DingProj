var ui;
(function (ui) {
    var story;
    (function (story) {
        var StoryMissionViewSkin = (function (_super) {
            __extends(StoryMissionViewSkin, _super);
            function StoryMissionViewSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [960, 640]);
                this.elementsContent = [this.__3_i(), this.txtTitle_i(), this.btnGo_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = StoryMissionViewSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return StoryMissionViewSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.btnGo_i = function () {
                var t = new egret.gui.UIAsset();
                this.btnGo = t;
                this.__s(t, ["source", "x", "y"], ["btnOk_png", 242, 482]);
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["bgCopyWin_png", 32, 248]);
                return t;
            };
            __egretProto__.txtTitle_i = function () {
                var t = new egret.gui.Label();
                this.txtTitle = t;
                this.__s(t, ["fontFamily", "height", "size", "text", "textAlign", "width", "x", "y"], ["微软雅黑", 40, 24, "恭喜您战胜山贼首领", "center", 372, 131, 405]);
                return t;
            };
            StoryMissionViewSkin._skinParts = ["txtTitle", "btnGo"];
            return StoryMissionViewSkin;
        })(egret.gui.Skin);
        story.StoryMissionViewSkin = StoryMissionViewSkin;
        StoryMissionViewSkin.prototype.__class__ = "ui.story.StoryMissionViewSkin";
    })(story = ui.story || (ui.story = {}));
})(ui || (ui = {}));
//# sourceMappingURL=StoryMissionViewSkin.js.map