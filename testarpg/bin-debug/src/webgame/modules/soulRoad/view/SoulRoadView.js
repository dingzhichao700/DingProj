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
            this.img_1.addEventListener(egret.TouchEvent.TOUCH_END, this.openFight, this);
            this.img_2.addEventListener(egret.TouchEvent.TOUCH_END, this.openFight, this);
            this.img_3.addEventListener(egret.TouchEvent.TOUCH_END, this.openFight, this);
            this.img_4.addEventListener(egret.TouchEvent.TOUCH_END, this.openFight, this);
            this.img_5.addEventListener(egret.TouchEvent.TOUCH_END, this.openFight, this);
        };
        __egretProto__.openFight = function (e) {
            switch (e.currentTarget) {
                case this.img_1:
                case this.img_2:
                case this.img_3:
                case this.img_4:
                case this.img_5:
                    //                    dataManager().sceneData.sceneType = SceneType.BOSS_COPY; 
                    egret.dataManager().sceneData.sceneType = egret.SceneType.ARENA;
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