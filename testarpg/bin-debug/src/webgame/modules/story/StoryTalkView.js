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
            this.txtCon.lineSpacing = 10;
            this.btnGo.addEventListener(egret.TouchEvent.TOUCH_END, this.okHandler, this);
            this.update();
        };
        __egretProto__.update = function () {
            var state = egret.StoryControl.getInstance().index;
            switch (state) {
                case 0:
                    this.txtCon.text = "城外烽火连天，我们栖息的山林刚被山贼占领，现在无家可归，还请壮士肃清山贼";
                    this.txtCoin.text = "500";
                    break;
                case 2:
                    this.txtCon.text = "多谢壮士帮助我们收复家园，这是祖上传下的宝物，可用来开启斗罗之路，请壮士一定要收下";
                    this.txtCoin.text = "500";
                    break;
                case 4:
                    this.txtCon.text = "壮士，这就是斗罗之路了，伴随着机遇和风险，壮士一路保重";
                    this.txtCoin.text = "2000";
                    break;
                case 6:
                    this.txtCon.text = "天呐，壮士果然高人啊，看样子实力大有提升，斗罗之路的宝物可助壮士稳固实力，请前往";
                    this.txtCoin.text = "2000";
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
                    egret.MainControl.getInstance().addCoin(2000);
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