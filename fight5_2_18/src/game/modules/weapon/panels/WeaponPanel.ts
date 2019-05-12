module game {
	export class WeaponPanel extends DLG.VPanel {
		protected main: WeaponView;
		private _curInfo: WeaponInfo;
		private _curIndex: number;
		private _preIndex: number;
		// private _vmc: VMCView;

		public constructor(panelId: number, fromPanelid?: string) {
			super(panelId);
		}
		public onShow(...arg): void {
			super.onShow(...arg);
			let self = this;
			self.main = new WeaponView();
			self.addChild(self.main);
			self.main.onLoadCallBack = self.initView;
			self.main.onLoadCallTarget = self;
		}
		protected initView(): void {
			super.initView();
			let self = this;
			self.initDefaultPanel();

			// if (!self._vmc) {
			// 	self._vmc = new VMCView();
			// }

			WeaponItem.onCallTarget = self;
			WeaponItem.onCallBack = self.onSelectClick;

			var tLayout: eui.TileLayout = new eui.TileLayout();
			tLayout.horizontalGap = -7;
			tLayout.verticalGap = 0;
			tLayout.requestedColumnCount = 5;
			self.main.list.layout = tLayout;

			self.main.list.itemRenderer = WeaponItem;


			self.main.list.dataProvider = new eui.ArrayCollection(WeaponManager.getInstance().weaponArr);
			self.main.list.selectedIndex = 0;
			self._curIndex = 0;
			self._preIndex = 0;

			self._curInfo = WeaponManager.getInstance().weaponArr[0];
			self.updateView();

		}
		private initDefaultPanel(): void {
			let self = this;
			self.main.close_btn.setScaleClick(true);
			self.main.close_btn.setOnClickListener(self, self.closePanelHandler);
			self.main.back_btn.setScaleClick(true);
			self.main.back_btn.setOnClickListener(self, self.closePanelHandler);

			self.main.tipLab.setLabel("暗器属性对所有角色生效，暗器技能装备才生效");
		}
		protected onSelectClick(info: WeaponInfo, index: number): void {
			let self = this;
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
		}
		private updateView(): void {
			let self = this;
			// self.main.weapon_img.source = "weapon_img" + self._curInfo.weaponId + "_png";
			self.main.weapon_img.visible = false;
			self.main.weapon_name.source = "weapon_title_" + self._curInfo.weaponId + "_png";
			self.main.weapon_activity.visible = self._curInfo.activity;

			self.main.attr_hp.text = "+" + self._curInfo.attrHp;
			self.main.attr_atk.text = "+" + self._curInfo.attrAtk;
			self.main.attr_def.text = "+" + self._curInfo.attrDef;

			let skillCfg: SkillCfg = SkillTable.getCfgById<SkillCfg>(self._curInfo.skillId);
			self.main.skill_txt.text = skillCfg.desc;


			this.main.imgWeapon.source = "00" + self._curInfo.weaponId + "_png";
			// self._vmc.updatePose("fx_weapon_"+ self._curInfo.weaponId, 90, true, true, "",null,null);
			// self._vmc.play();
			// this.main.vmc_box.addChild(self._vmc);
			// self._vmc.scaleX = obj["scaleX"];
			// self._vmc.scaleY = obj["scaleY"];
		}

		private closePanelHandler(e: eui.UIEvent): void {
			DLG.DLGCore.panel.closeAll();
		}

		public onDestroy(): void {
			super.onDestroy();
			let self = this;
			// if(self._vmc){
			// 	self._vmc.destroy();
			// 	self._vmc = null;
			// }
			if (self.main) {
				self.main.onLoadCallBack = undefined;
				self.main.onLoadCallTarget = undefined;
				self.main.onDestroy();
			}
			self.main = undefined;
		}
	}
}