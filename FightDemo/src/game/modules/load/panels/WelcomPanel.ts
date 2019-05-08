module game {
	export class WelcomPanel extends DLG.VPanel {
		protected main: WelcomView;
		private _curTime:number;
		private _maxTime:number;
		private _loadCompeltedFun:Function;
		private _loadCompeltedObj:any;

		public constructor(panelId: number, fromPanelid?: string) {
			super(panelId);
		}
		public onShow(...arg): void {
			super.onShow(...arg);
			let self = this;
			self.main = new WelcomView();
			self.addChild(self.main);
			self.main.onLoadCallBack = self.initView;
			self.main.onLoadCallTarget = self;
		}
		protected initView(): void {
			super.initView();
			// this.main.welcom_img.source
			this.main.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
		}
		private clickHandler():void{
			DLG.DLGCore.panel.close(PanelClassConfig.ID_WelcomePanel);
			DLG.DLGCore.panel.show(PanelClassConfig.ID_GuidePanel);
		}
		public onDestroy(): void {
			this.main.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);

			super.onDestroy();
			let self = this;
			self._loadCompeltedFun = null;
			self._loadCompeltedObj = null;
			if (self.main) {
				self.main.onLoadCallBack = undefined;
				self.main.onLoadCallTarget = undefined;
				self.main.onDestroy();
			}
			self.main = undefined;
		}
	}
}