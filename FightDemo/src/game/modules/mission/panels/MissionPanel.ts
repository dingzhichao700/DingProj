module game {
	export class MissionPanel extends DLG.VPanel {
		protected main: MissionView;

		public constructor(panelId: number, fromPanelid?: string) {
			super(panelId);
		}
		public onShow(...arg): void {
			super.onShow(...arg);
			let self = this;
			self.main = new MissionView();
			self.addChild(self.main);
			self.main.onLoadCallBack = self.initView;
			self.main.onLoadCallTarget = self;
		}
		protected initView(): void {
			super.initView();
			let self = this;
			self.initDefaultPanel();



			self.main.vip_btn.setLabel("");
			self.main.vip_btn.setScaleClick(true);
			self.main.vip_btn.setOnClickListener(self, self.vipHandler);


			var tLayout: eui.TileLayout = new eui.TileLayout();
			tLayout.verticalGap = -5;
			tLayout.requestedColumnCount = 1;
			self.main.list.layout = tLayout;

			self.main.list.itemRenderer = MissionItem;

			self.updateView();
		}
		private initDefaultPanel():void{
			let self = this;
			self.main.close_btn.setScaleClick(true);
			self.main.close_btn.setOnClickListener(self, self.closePanelHandler);
			self.main.back_btn.setScaleClick(true);
			self.main.back_btn.setOnClickListener(self, self.closePanelHandler);

			self.main.tipLab.setLabel("目前挑战1000年及以上的魂兽，伤害前三名发放宗门宝箱");
		}

		private updateView(): void {
			let self = this;
			self.main.initview(self.addHandler, self);
			self.main.addCom.updateView(MissonIManager.getInstance().curTimes, MissonIManager.getInstance().maxTimes);
			self.main.list.dataProvider = new eui.ArrayCollection(MissonIManager.getInstance().mission);
		}
		private vipHandler(e: eui.UIEvent): void {

		}
		private addHandler(e: eui.UIEvent): void {
			MissonIManager.getInstance().curTimes = Math.min(MissonIManager.getInstance().curTimes+1,MissonIManager.getInstance().maxTimes);
			let self = this;
			self.main.addCom.updateView(MissonIManager.getInstance().curTimes, MissonIManager.getInstance().maxTimes);
		}
		private closePanelHandler(e: eui.UIEvent): void {
			DLG.DLGCore.panel.closeAll();
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