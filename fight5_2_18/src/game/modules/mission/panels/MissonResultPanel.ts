module game {
	export class MissonResultPanel extends DLG.VPanel {
		protected main: MissionResultView;

		public constructor(panelId: number, fromPanelid?: string) {
			super(panelId);
		}
		public onShow(...arg): void {
			super.onShow(...arg);
			let self = this;
			self.main = new MissionResultView();
			self.addChild(self.main);
			self.main.onLoadCallBack = self.initView;
			self.main.onLoadCallTarget = self;
		}
		protected initView(): void {
			super.initView();
			let self = this;
			self.initDefaultPanel();

			self.main.close_btn.setLabel("");
			self.main.close_btn.setScaleClick(true);
			self.main.close_btn.setOnClickListener(self, self.closePanelHandler);

			var tLayout: eui.TileLayout = new eui.TileLayout();
			tLayout.horizontalGap = 35;
			tLayout.verticalGap = 25;
			tLayout.requestedColumnCount = 3;
			self.main.list.layout = tLayout;

			self.main.list.itemRenderer = BagItem;
			self.main.list.dataProvider = new eui.ArrayCollection(BagIManager.getInstance().results);

			DLG.DLGCore.panel.close(PanelClassConfig.ID_WelcomePanel);
			DLG.DLGCore.panel.close(PanelClassConfig.ID_GuidePanel);
		}

		private initDefaultPanel():void{
		}
		
		private closePanelHandler(e: eui.UIEvent): void {
			DLG.DLGCore.panel.closeAll();

			var nextId:number = MissonIManager.getInstance().getNextMission( MainUIManager.getInstance().sceneId );
			SceneManager.getInstance().changeMap(nextId,true);
		}

		public onDestroy(): void {
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