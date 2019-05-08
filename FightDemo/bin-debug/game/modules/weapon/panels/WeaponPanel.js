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
    var WeaponPanel = (function (_super) {
        __extends(WeaponPanel, _super);
        function WeaponPanel(panelId, fromPanelid) {
            return _super.call(this, panelId) || this;
        }
        WeaponPanel.prototype.onShow = function () {
            var arg = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                arg[_i] = arguments[_i];
            }
            _super.prototype.onShow.apply(this, arg);
            var self = this;
            self.main = new WeaponView();
            self.addChild(self.main);
            self.main.onLoadCallBack = self.initView;
            self.main.onLoadCallTarget = self;
        };
        WeaponPanel.prototype.initView = function () {
            _super.prototype.initView.call(this);
            var self = this;
            self.initDefaultPanel();
            if (!self._vmc) {
                self._vmc = new game.VMCView();
            }
            game.WeaponItem.onCallTarget = self;
            game.WeaponItem.onCallBack = self.onSelectClick;
            var tLayout = new eui.TileLayout();
            tLayout.horizontalGap = -7;
            tLayout.verticalGap = 0;
            tLayout.requestedColumnCount = 5;
            self.main.list.layout = tLayout;
            self.main.list.itemRenderer = game.WeaponItem;
            self.main.list.dataProvider = new eui.ArrayCollection(game.WeaponManager.getInstance().weaponArr);
            self.main.list.selectedIndex = 0;
            self._curIndex = 0;
            self._preIndex = 0;
            self._curInfo = game.WeaponManager.getInstance().weaponArr[0];
            self.updateView();
        };
        WeaponPanel.prototype.initDefaultPanel = function () {
            var self = this;
            self.main.close_btn.setScaleClick(true);
            self.main.close_btn.setOnClickListener(self, self.closePanelHandler);
            self.main.back_btn.setScaleClick(true);
            self.main.back_btn.setOnClickListener(self, self.closePanelHandler);
            self.main.tipLab.setLabel("暗器属性对所有角色生效，暗器技能装备才生效");
        };
        WeaponPanel.prototype.onSelectClick = function (info, index) {
            var self = this;
            if (!info) {
                self.main.list.selectedIndex = self._curIndex;
                return;
            }
            if (index == self._curIndex)
                return;
            self._preIndex = self._curIndex;
            self._curIndex = index;
            self._curInfo = info;
            self.updateView();
        };
        WeaponPanel.prototype.updateView = function () {
            var self = this;
            // self.main.weapon_img.source = "weapon_img" + self._curInfo.weaponId + "_png";
            self.main.weapon_img.visible = false;
            self.main.weapon_name.source = "weapon_title_" + self._curInfo.weaponId + "_png";
            self.main.weapon_activity.visible = self._curInfo.activity;
            self.main.attr_hp.text = "+" + self._curInfo.attrHp;
            self.main.attr_atk.text = "+" + self._curInfo.attrAtk;
            self.main.attr_def.text = "+" + self._curInfo.attrDef;
            var skillCfg = game.SkillTable.getCfgById(self._curInfo.skillId);
            self.main.skill_txt.text = skillCfg.desc;
            self._vmc.updatePose("fx_weapon_" + self._curInfo.weaponId, 90, true, true, "", null, null);
            self._vmc.play();
            this.main.vmc_box.addChild(self._vmc);
            // self._vmc.scaleX = obj["scaleX"];
            // self._vmc.scaleY = obj["scaleY"];
        };
        WeaponPanel.prototype.closePanelHandler = function (e) {
            DLG.DLGCore.panel.closeAll();
        };
        WeaponPanel.prototype.onDestroy = function () {
            _super.prototype.onDestroy.call(this);
            var self = this;
            if (self._vmc) {
                self._vmc.destroy();
                self._vmc = null;
            }
            if (self.main) {
                self.main.onLoadCallBack = undefined;
                self.main.onLoadCallTarget = undefined;
                self.main.onDestroy();
            }
            self.main = undefined;
        };
        return WeaponPanel;
    }(DLG.VPanel));
    game.WeaponPanel = WeaponPanel;
    __reflect(WeaponPanel.prototype, "game.WeaponPanel");
})(game || (game = {}));
//# sourceMappingURL=WeaponPanel.js.map