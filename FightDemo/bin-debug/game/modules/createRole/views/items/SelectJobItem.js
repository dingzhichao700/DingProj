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
    var SelectJobItem = (function (_super) {
        __extends(SelectJobItem, _super);
        function SelectJobItem() {
            var _this = _super.call(this) || this;
            var self = _this;
            self.skinName = "resource/skins/createRole/SelectJobItem.exml";
            DLG.DLGCore.event.addEventListener(_this, egret.TouchEvent.TOUCH_TAP, self, self.onBtnTouchHandler);
            return _this;
        }
        SelectJobItem.prototype.dataChanged = function () {
            var self = this;
            if (self._data == null) {
                return;
            }
            if (self.isInitView == false) {
                return;
            }
            if (self.data == 1) {
                self.jobIcon.source = "CreateRole_json.CreateRole_HeroIcon_1_png";
            }
            else {
                self.jobIcon.source = "CreateRole_json.CreateRole_HeroIcon_2_png";
            }
        };
        SelectJobItem.prototype.onBtnTouchHandler = function () {
            var rolePanel = DLG.DLGCore.panel.getPanelById(game.PanelClassConfig.ID_CreateRolePanel);
            rolePanel.onRefresh();
        };
        SelectJobItem.prototype.onDestroy = function () {
            _super.prototype.onDestroy.call(this);
        };
        return SelectJobItem;
    }(DLG.CItemRenderer));
    game.SelectJobItem = SelectJobItem;
    __reflect(SelectJobItem.prototype, "game.SelectJobItem");
})(game || (game = {}));
//# sourceMappingURL=SelectJobItem.js.map