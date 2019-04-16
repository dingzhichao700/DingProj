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
            this.btnStrength.addEventListener(egret.TouchEvent.TOUCH_END, this.openStrength, this);
            this.btnGo.addEventListener(egret.TouchEvent.TOUCH_END, this.goStory, this);
            egret.ApplicationManager.getInstance().stage.addEventListener(egret.Event.RESIZE, this.resizeHandler, this);
            this.boxMission.alpha = 0;
            this.onResize();
            this.update();
            this.showStory(true);
        };
        __egretProto__.update = function () {
            if (this.isCreate) {
                this.txtExp.text = egret.MainControl.getInstance().totalExp.toFixed(2) + "%";
                this.txtCoin.text = egret.MainControl.getInstance().coin + "";
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
                this.txtTarget.text = egret.StoryControl.getInstance().getCurTitle();
                if (egret.StoryControl.getInstance().index == 5) {
                    this.btnSoulRoad.source = "resource/main/soulRoad.png";
                }
                else {
                    this.btnSoulRoad.source = "resource/main/soulRoad_gray.png";
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
            if (egret.StoryControl.getInstance().index == 5) {
                egret.SoulRoadControl.getInstance().openSoulRoad();
            }
            else {
                egret.MainControl.getInstance().showWarn("请完成主线任务，开启斗罗之路");
            }
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
        __egretProto__.openStrength = function () {
            egret.EquipControl.getInstance().openStrengthView();
        };
        __egretProto__.goStory = function () {
            egret.StoryControl.getInstance().goNextStory();
        };
        /**显示当前关卡名*/
        __egretProto__.showMission = function () {
            this.boxNum.removeAllElements();
            var mission = egret.StoryControl.getInstance().curMission;
            var str = mission.toString();
            for (var i = 0; i < str.length; i++) {
                var num = Number(str[i]);
                var imgNum = new egret.gui.UIAsset();
                imgNum.source = "resource/main/copy_" + num + ".png";
                imgNum.x = 30 * i;
                this.boxNum.addElement(imgNum);
            }
            egret.TimerManager.getInstance().addExecute(function () {
                egret.Tween.get(this.boxMission).to({ alpha: 1 }, 1000);
            }, this, 1000, [], 1); //显示
            egret.TimerManager.getInstance().addExecute(function () {
                egret.Tween.get(this.boxMission).to({ alpha: 0 }, 1000);
            }, this, 5000, [], 1); //隐藏
        };
        __egretProto__.showStory = function (value) {
            this.boxStory.visible = value;
            egret.Tween.removeTweens(this.imgArrow);
            if (value) {
                this.imgArrow.x = 0;
                this.showArrow();
            }
        };
        __egretProto__.showArrow = function () {
            egret.Tween.get(this.imgArrow).to({ x: (this.imgArrow.x == 0 ? 20 : 0) }, 800).call(this.showArrow, this);
        };
        return MainView;
    })(egret.BasePanel);
    egret.MainView = MainView;
    MainView.prototype.__class__ = "egret.MainView";
})(egret || (egret = {}));
//# sourceMappingURL=MainView.js.map