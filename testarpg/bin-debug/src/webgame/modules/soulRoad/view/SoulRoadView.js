var egret;
(function (egret) {
    var SoulRoadView = (function (_super) {
        __extends(SoulRoadView, _super);
        function SoulRoadView() {
            _super.call(this);
            this.layerType = egret.BasePanel.LAYER_WINDOW_1;
            this.skinName = "ui.soulRoad.SoulRoadViewSkin";
        }
        var __egretProto__ = SoulRoadView.prototype;
        __egretProto__.onOpen = function () {
            _super.prototype.onOpen.call(this);
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_END, this.close, this);
            this.img_0.addEventListener(egret.TouchEvent.TOUCH_END, this.openFight, this);
            this.img_1.addEventListener(egret.TouchEvent.TOUCH_END, this.openFight, this);
            this.img_2.addEventListener(egret.TouchEvent.TOUCH_END, this.openFight, this);
            this.img_3.addEventListener(egret.TouchEvent.TOUCH_END, this.openFight, this);
            this.img_4.addEventListener(egret.TouchEvent.TOUCH_END, this.openFight, this);
            this.update();
        };
        __egretProto__.update = function () {
            var index = egret.SoulRoadControl.getInstance().curIndex;
            this.mask1.visible = index < 1;
            this.mask2.visible = index < 2;
            this.mask3.visible = index < 3;
            this.mask4.visible = index < 4;
        };
        __egretProto__.openFight = function (e) {
            if (egret.dataManager().sceneData.sceneType == egret.SceneType.BOSS_COPY) {
                egret.MainControl.getInstance().showWarn("您已在斗罗之路中");
                return;
            }
            switch (e.currentTarget) {
                case this.img_0:
                case this.img_1:
                case this.img_2:
                case this.img_3:
                case this.img_4:
                    egret.dataManager().sceneData.sceneType = egret.SceneType.BOSS_COPY;
                    //                    dataManager().sceneData.sceneType = SceneType.ARENA;
                    egret.globalUpdateWindows([egret.UpdateType.CHANGE_SOULROAD]);
                    break;
            }
            this.close();
        };
        return SoulRoadView;
    })(egret.BasePanel);
    egret.SoulRoadView = SoulRoadView;
    SoulRoadView.prototype.__class__ = "egret.SoulRoadView";
})(egret || (egret = {}));
//# sourceMappingURL=SoulRoadView.js.map