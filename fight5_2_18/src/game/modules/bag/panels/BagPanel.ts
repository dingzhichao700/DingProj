module game {
	export class BagPanel extends DLG.VPanel {
		protected main: BagView;

		public constructor(panelId: number, fromPanelid?: string) {
			super(panelId);
		}
		public onShow(...arg): void {
			super.onShow(...arg);
			let self = this;
			self.main = new BagView();
			self.addChild(self.main);
			self.main.onLoadCallBack = self.initView;
			self.main.onLoadCallTarget = self;
		}
		protected initView(): void {
			super.initView();
			let self = this;
			self.initDefaultPanel();
			self.main.num_txt.text = BagIManager.getInstance().goods.length +"/100";

			self.main.rong_btn.setLabel("熔炼");
			self.main.rong_btn.setScaleClick(true);
			self.main.rong_btn.setOnClickListener(self, self.rongHandler);

			var tLayout: eui.TileLayout = new eui.TileLayout();
			tLayout.horizontalGap = 30;
			tLayout.verticalGap = 25;
			tLayout.requestedColumnCount = 5;
			self.main.list.layout = tLayout;

			self.main.list.itemRenderer = BagItem;
			self.main.list.dataProvider = new eui.ArrayCollection(BagIManager.getInstance().goods);
		}
		private initDefaultPanel():void{
			let self = this;
			self.main.close_btn.setScaleClick(true);
			self.main.close_btn.setOnClickListener(self, self.closePanelHandler);
			self.main.back_btn.setScaleClick(true);
			self.main.back_btn.setOnClickListener(self, self.closePanelHandler);
		}

		private rongHandler(e: eui.UIEvent): void {

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