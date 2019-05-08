var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var game;
(function (game) {
    var MissionItem = (function (_super) {
        __extends(MissionItem, _super);
        function MissionItem() {
            var _this = _super.call(this) || this;
            _this._plus = 1;
            var self = _this;
            self.skinName = "resource/skins/mission/MissionItemSkin.exml";
            DLG.DLGCore.event.addEventListener(_this, egret.TouchEvent.TOUCH_TAP, self, self.onBtnTouchHandler);
            return _this;
        }
        MissionItem.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            var self = this;
            if (self.data == null) {
                return;
            }
            if (self.isInitView == false) {
                return;
            }
            self.arrow_img.visible = self.itemIndex == 0 && !game.MissonIManager.getInstance().clickFirstMission;
            if (self.arrow_img.visible) {
                self.addTween();
            }
            else {
                egret.Tween.removeTweens(this.arrow_img);
            }
            self.vo = self.data;
            if (self.vo) {
                self._missionCfg = game.SceneTable.getCfgById(self.vo.missionId);
                self.mask_img.visible = !self.vo.open;
                self.label_txt1.text = self._missionCfg.name;
                self.label_txt2.text = self._missionCfg.age;
                self.bg_img.source = self.vo.pass ? "mission_bg2_png" : "mission_bg1_png";
            }
            else {
                self.mask_img.visible = false;
                self.label_txt1.text = "";
                self.label_txt2.text = "";
                self.bg_img.source = "mission_bg1_png";
            }
        };
        MissionItem.prototype.addTween = function () {
            var self = this;
            var px = self.arrow_img.x;
            self._plus *= -1;
            var targetX = px + self._plus * 30;
            egret.Tween.get(self.arrow_img).to({ x: targetX }, 500).call(self.addTween, self);
        };
        MissionItem.prototype.onBtnTouchHandler = function () {
            if (this.vo && this.vo.open) {
                if (this.itemIndex == 0) {
                    game.MissonIManager.getInstance().clickFirstMission = true;
                }
                game.MissonIManager.getInstance().enterMission(this.vo.missionId);
            }
        };
        MissionItem.prototype.onDestroy = function () {
            egret.Tween.removeTweens(this.arrow_img);
            _super.prototype.onDestroy.call(this);
        };
        return MissionItem;
    }(DLG.CItemRenderer));
    game.MissionItem = MissionItem;
    __reflect(MissionItem.prototype, "game.MissionItem");
})(game || (game = {}));
//# sourceMappingURL=MissionItem.js.map