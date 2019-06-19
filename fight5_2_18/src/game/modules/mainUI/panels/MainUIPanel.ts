module game {
	export class MainUIPanel extends DLG.VPanel {
		protected main: MainUIView;
		public mainUiArr: Array<any>;
		public constructor(panelId: number, fromPanelid?: string) {
			super(panelId);
		}
		public onShow(...arg): void {
			super.onShow(...arg);
			let self = this;
			self.main = new MainUIView();
			self.addChild(self.main);
			self.main.onLoadCallBack = self.initView;
			self.main.onLoadCallTarget = self;
		}

		protected initView(): void {
			super.initView();
			let self = this;
			self.mainUiArr = [
				{ "tabId": PanelClassConfig.ID_MissionPanel, "img": "menubar_json.menubar_fight_png" },
				{ "tabId": PanelClassConfig.ID_WuHunPanel, "img": "menubar_json.menubar_wuHun_png_png" },
				{ "tabId": PanelClassConfig.ID_HideWeaponPanel, "img": "menubar_json.menubar_weapon_png" },
				{ "tabId": PanelClassConfig.ID_PvpMatchPanel, "img": "menubar_json.menubar_pvp_png" },
				{ "tabId": PanelClassConfig.ID_BagPanel, "img": "menubar_json.menubar_bag_png" }
			];


			var tLayout: eui.TileLayout = new eui.TileLayout();
			tLayout.horizontalGap = -3;
			tLayout.verticalGap = 0;
			tLayout.requestedRowCount = 1;
			tLayout.requestedColumnCount = 5;
			self.main.mainList.layout = tLayout;
			self.main.mainList.itemRenderer = MainUiItem;
			self.main.mainList.dataProvider = new eui.ArrayCollection(self.mainUiArr);

			this.onResizeHandler();
			this.stage.addEventListener(egret.Event.RESIZE, this.onResizeHandler, this);

			this.main.btnSkill1.addEventListener(egret.TouchEvent.TOUCH_END, self.onSkill, self);
			this.main.btnSkill2.addEventListener(egret.TouchEvent.TOUCH_END, self.onSkill, self);
		}

		private onResizeHandler(): void {
			var contentH: number = ApplicationManager.CONTENT_H;
            var windowH: number = document.documentElement.clientHeight;
            
            var globalScale: number = ApplicationManager.globalScale;
            this.main.top_box.y = -(windowH - contentH * globalScale) / (2 * globalScale);
            this.main.bottom_box.y = (windowH + contentH * globalScale) / (2 * globalScale) - 107;
		}

		public updateMonsterNum(cur:number, total:number): void {
			this.main.imgPro.width = cur/total * 294;
			this.main.txtNum.text = cur + "/" + total;
		}

		public onSkill(): void {
			FightManager.getInstance().doSwordRain();
		}

		public onRefresh(): void {
			if (MainUIManager.getInstance().sceneId <= 0)
				return;
			let missionCfg: SceneCfg = SceneTable.getCfgById<SceneCfg>(MainUIManager.getInstance().sceneId);
			if (!missionCfg)
				return;
			this.main.title_txt.text = missionCfg.name;
			this.main.des_txt.text = missionCfg.des;
		}

		public onDestroy(): void {
			this.stage.removeEventListener(egret.Event.RESIZE, this.onResizeHandler, this);
			super.onDestroy();
			let self = this;
			if (self.main) {
				self.main.onLoadCallBack = undefined;
				self.main.onLoadCallTarget = undefined;
				self.main.onDestroy();
			}
			self.main = undefined;
		}

	}
}