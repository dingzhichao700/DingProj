var egret;
(function (egret) {
    var MainView = (function (_super) {
        __extends(MainView, _super);
        function MainView() {
            _super.call(this);
            this.layerType = egret.BasePanel.LAYER_UI;
            this.skinName = "ui.main.MainViewSkin";
        }
        var __egretProto__ = MainView.prototype;
        __egretProto__.onOpen = function () {
            _super.prototype.onOpen.call(this);
            this.btnSoulRoad.addEventListener(egret.TouchEvent.TOUCH_END, this.openSoulRoad, this);
            this.btnWuhun.addEventListener(egret.TouchEvent.TOUCH_END, this.openWuhun, this);
            this.btnBag.addEventListener(egret.TouchEvent.TOUCH_END, this.openBag, this);
            this.btnEquip.addEventListener(egret.TouchEvent.TOUCH_END, this.openEquip, this);
            this.btnSkill.addEventListener(egret.TouchEvent.TOUCH_END, this.openSkill, this);
            egret.ApplicationManager.getInstance().stage.addEventListener(egret.Event.RESIZE, this.resizeHandler, this);
            this.onResize();
            this.update();
        };
        __egretProto__.update = function () {
            if (this.isCreate) {
                this.txtExp.text = egret.MainControl.getInstance().totalExp.toFixed(2) + "%";
                if (!this.clip1) {
                    this.clip1 = new egret.AnimeClip();
                    this.clip1.loadUrl("expLight", true);
                    this.boxCon.addElement(this.clip1);
                }
                if (!this.clip2) {
                    this.clip2 = new egret.AnimeClip();
                    this.clip2.loadUrl("expBubble", true);
                    this.clip2.x = 20;
                    this.clip2.y = 50;
                    this.boxCon.addElement(this.clip2);
                }
            }
        };
        __egretProto__.resizeHandler = function (e) {
            this.onResize();
        };
        __egretProto__.onResize = function () {
            var contentH = egret.ApplicationManager.CONTENT_H;
            var windowH = document.documentElement.clientHeight;
            var globalScale = egret.ApplicationManager.getInstance().globalScale;
            this.boxTop.y = -(windowH - contentH * globalScale) / (2 * globalScale);
            this.boxBottom.y = (windowH + contentH * globalScale) / (2 * globalScale);
        };
        __egretProto__.openSoulRoad = function () {
            egret.SoulRoadControl.getInstance().openSoulRoad();
        };
        __egretProto__.openWuhun = function () {
            egret.WuhunControl.getInstance().openwuhunView();
        };
        __egretProto__.openBag = function () {
            egret.BagControl.getInstance().openBagView();
        };
        __egretProto__.openEquip = function () {
            egret.EquipControl.getInstance().openEquipView();
        };
        __egretProto__.openSkill = function () {
            egret.SkillControl.getInstance().openskillView();
        };
        return MainView;
    })(egret.BasePanel);
    egret.MainView = MainView;
    MainView.prototype.__class__ = "egret.MainView";
})(egret || (egret = {}));
//# sourceMappingURL=MainView.js.map