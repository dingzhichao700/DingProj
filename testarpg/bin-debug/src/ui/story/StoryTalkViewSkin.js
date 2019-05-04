var ui;
(function (ui) {
    var story;
    (function (story) {
        var StoryTalkViewSkin = (function (_super) {
            __extends(StoryTalkViewSkin, _super);
            function StoryTalkViewSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [960, 640]);
                this.elementsContent = [this.__3_i(), this.btnGo_i(), this.txtCon_i(), this.boxReward_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = StoryTalkViewSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return StoryTalkViewSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__4_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["icon_coin_png", 0, -2]);
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["fontFamily", "height", "size", "text", "textAlign", "textColor", "width", "x", "y"], ["微软雅黑", 28, 24, "经验：", "right", 0x12E249, 89, 106, 0]);
                return t;
            };
            __egretProto__.boxReward_i = function () {
                var t = new egret.gui.Group();
                this.boxReward = t;
                this.__s(t, ["x", "y"], [333, 433]);
                t.elementsContent = [this.__4_i(), this.txtCoin_i(), this.__5_i(), this.txtExp_i()];
                return t;
            };
            __egretProto__.btnGo_i = function () {
                var t = new egret.gui.UIAsset();
                this.btnGo = t;
                this.__s(t, ["source", "x", "y"], ["btnOk_png", 375, 467]);
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["height", "source", "width", "x", "y"], [381, "bgStory_png", 606, 19, 173]);
                return t;
            };
            __egretProto__.txtCoin_i = function () {
                var t = new egret.gui.Label();
                this.txtCoin = t;
                this.__s(t, ["fontFamily", "height", "size", "text", "width", "x", "y"], ["微软雅黑", 22, 20, "1200", 61, 33, 4]);
                return t;
            };
            __egretProto__.txtCon_i = function () {
                var t = new egret.gui.Label();
                this.txtCon = t;
                this.__s(t, ["fontFamily", "height", "size", "text", "width", "x", "y"], ["微软雅黑", 139, 24, "勇士，请前往黑风寨剿匪，拯救黎民百姓！", 260, 345, 290]);
                return t;
            };
            __egretProto__.txtExp_i = function () {
                var t = new egret.gui.Label();
                this.txtExp = t;
                this.__s(t, ["fontFamily", "height", "size", "text", "width", "x", "y"], ["微软雅黑", 22, 20, "1.5万", 105, 180, 4]);
                return t;
            };
            StoryTalkViewSkin._skinParts = ["btnGo", "txtCon", "txtCoin", "txtExp", "boxReward"];
            return StoryTalkViewSkin;
        })(egret.gui.Skin);
        story.StoryTalkViewSkin = StoryTalkViewSkin;
        StoryTalkViewSkin.prototype.__class__ = "ui.story.StoryTalkViewSkin";
    })(story = ui.story || (ui.story = {}));
})(ui || (ui = {}));
//# sourceMappingURL=StoryTalkViewSkin.js.map