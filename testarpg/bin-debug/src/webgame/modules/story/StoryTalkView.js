var egret;
(function (egret) {
    var StoryTalkView = (function (_super) {
        __extends(StoryTalkView, _super);
        function StoryTalkView() {
            _super.call(this);
            this.layerType = egret.BasePanel.LAYER_WINDOW_1;
            this.skinName = "ui.story.StoryTalkViewSkin";
        }
        var __egretProto__ = StoryTalkView.prototype;
        __egretProto__.onOpen = function () {
            _super.prototype.onOpen.call(this);
            this.txtCon.lineSpacing = 15;
            this.btnGo.addEventListener(egret.TouchEvent.TOUCH_END, this.okHandler, this);
            this.update();
        };
        __egretProto__.update = function () {
            var state = egret.StoryControl.getInstance().index;
            switch (state) {
                case 0:
                    this.txtCon.text = "城外山贼横行，还请壮士肃清山贼";
                    this.txtCoin.text = "500";
                    break;
                case 2:
                    this.txtCon.text = "多谢壮士，这小小心意，还请壮士收下";
                    this.txtCoin.text = "500";
                    break;
                case 4:
                    this.txtCon.text = "壮士，请前往斗罗之路试炼本领";
                    this.txtCoin.text = "1500";
                    break;
                case 6:
                    this.txtCon.text = "壮士武艺高强，请收下这小小心意";
                    this.txtCoin.text = "1500";
                    break;
            }
        };
        __egretProto__.okHandler = function () {
            var state = egret.StoryControl.getInstance().index;
            switch (state) {
                case 2:
                    egret.MainControl.getInstance().addCoin(500);
                    egret.MainControl.getInstance().addExp(0.02);
                    break;
                case 6:
                    egret.MainControl.getInstance().addCoin(1500);
                    egret.MainControl.getInstance().addExp(0.02);
                    break;
            }
            egret.StoryControl.getInstance().addIndex();
            this.close();
        };
        return StoryTalkView;
    })(egret.BasePanel);
    egret.StoryTalkView = StoryTalkView;
    StoryTalkView.prototype.__class__ = "egret.StoryTalkView";
})(egret || (egret = {}));
//# sourceMappingURL=StoryTalkView.js.map