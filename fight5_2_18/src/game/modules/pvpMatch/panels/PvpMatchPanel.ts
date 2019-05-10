module game {
	export class PvpMatchPanel extends DLG.VPanel {
		protected main: PvpMatchView;

		public constructor(panelId: number, fromPanelid?: string) {
			super(panelId);
		}
		public onShow(...arg): void {
			super.onShow(...arg);
			let self = this;
			self.main = new PvpMatchView();
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

			self.updateView();

		}
		private initDefaultPanel(): void {
			let self = this;
			self.main.close_btn.setScaleClick(true);
			self.main.close_btn.setOnClickListener(self, self.closePanelHandler);
			self.main.back_btn.setScaleClick(true);
			self.main.back_btn.setOnClickListener(self, self.closePanelHandler);

			self.main.tipLab.setLabel("每日5点结算奖励");
		}
		private updateView(): void {
			let self = this;
			let info: PvpMsgInfo = PvpMatchManager.getInstance().pvpMsgInfo;
			self.main.initview(self.addHandler, self);
			self.main.headItem1.updateView(info.atkInfo);
			self.main.headItem2.updateView(info.defInfo);
			self.main.bar.updateView(info.curPro, info.maxPro);
			self.main.pvp_match_lab.text = "赛季场次：" + info.matchTimes;
			self.main.pvp_winTimes.text = "赛季胜场：" + info.winTimes;
			self.main.pvp_resTimes.text = "剩余次数：" + info.resTimes;
			self.main.addCom.updateView(info.resTimes, info.maxTimes);
		}

		private closePanelHandler(e: eui.UIEvent): void {
			DLG.DLGCore.panel.closeAll();
		}
		private addHandler(e: eui.UIEvent): void {
			let info: PvpMsgInfo = PvpMatchManager.getInstance().pvpMsgInfo;
			info.resTimes += 1;
			info.resTimes = Math.min(info.resTimes,info.maxTimes);
			this.main.addCom.updateView(info.resTimes, info.maxTimes);
		}
		private vipHandler(e: eui.UIEvent): void {
			MissonIManager.getInstance().enterMission(100020);
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