var egret;
(function (egret) {
    var StoryMissionView = (function (_super) {
        __extends(StoryMissionView, _super);
        function StoryMissionView() {
            _super.call(this);
            this.layerType = egret.BasePanel.LAYER_WINDOW_2;
            this.skinName = "ui.story.StoryMissionViewSkin";
        }
        var __egretProto__ = StoryMissionView.prototype;
        __egretProto__.onOpen = function () {
            _super.prototype.onOpen.call(this);
            this.btnGo.addEventListener(egret.TouchEvent.TOUCH_END, this.onGo, this);
            var str = "";
            switch (egret.StoryControl.getInstance().index) {
                case 2:
                    str = "恭喜您战胜山贼首领";
                    break;
                case 6:
                    str = "恭喜您通过斗罗之路";
                    break;
            }
            this.txtTitle.text = str;
        };
        __egretProto__.onGo = function () {
            egret.SceneManager.getInstance().enterScene(egret.SceneType.CITY, 1003);
            egret.globalUpdateWindows([egret.UpdateType.ENTER_CITY]);
            this.close();
        };
        return StoryMissionView;
    })(egret.BasePanel);
    egret.StoryMissionView = StoryMissionView;
    StoryMissionView.prototype.__class__ = "egret.StoryMissionView";
})(egret || (egret = {}));
//# sourceMappingURL=StoryMissionView.js.map