var egret;
(function (egret) {
    var SkillView = (function (_super) {
        __extends(SkillView, _super);
        function SkillView() {
            _super.call(this);
            this.layerType = egret.BasePanel.LAYER_WINDOW_1;
            this.skinName = "ui.skill.SkillViewSkin";
        }
        var __egretProto__ = SkillView.prototype;
        __egretProto__.onOpen = function () {
            _super.prototype.onOpen.call(this);
            this.window.btnClose.addEventListener(egret.TouchEvent.TOUCH_END, this.close, this);
            this.window.btnBack.addEventListener(egret.TouchEvent.TOUCH_END, this.close, this);
            this.update();
        };
        __egretProto__.update = function () {
            this.itemCon.removeAllElements();
            var skillList = [1, 2, 3, 4, 5];
            for (var i = 0; i < skillList.length; i++) {
                var vo = new egret.SkillVo();
                vo.id = i + 1;
                var item = new egret.SkillItem();
                item.y = i * 115;
                item.data = vo;
                this.itemCon.addElement(item);
            }
        };
        return SkillView;
    })(egret.BasePanel);
    egret.SkillView = SkillView;
    SkillView.prototype.__class__ = "egret.SkillView";
})(egret || (egret = {}));
//# sourceMappingURL=SkillView.js.map