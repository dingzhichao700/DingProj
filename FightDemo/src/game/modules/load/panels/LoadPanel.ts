module game {
	export class LoadPanel extends DLG.VPanel {
		protected main: LoadView;
		private _curTime: number;
		private _maxTime: number;
		private _loadCompeltedFun: Function;
		private _loadCompeltedObj: any;
		private _type: number;// 0 进游戏  1 切场景

		public canClose: boolean;

		public constructor(panelId: number, fromPanelid?: string) {
			super(panelId);
		}
		public onShow(...arg): void {
			super.onShow(...arg);
			let self = this;
			self.main = new LoadView();
			self.addChild(self.main);
			self.main.onLoadCallBack = self.initView;
			self.main.onLoadCallTarget = self;
		}
		protected initView(): void {
			super.initView();
			this.onResizeHandler();
			let stage: egret.Stage = DLG.DLGCore.stage;
			stage.addEventListener(egret.Event.RESIZE, this.onResizeHandler, this);
		}
		private onResizeHandler(): void {

			// var contentH: number = ApplicationManager.CONTENT_H;
			// var windowH: number = document.documentElement.clientHeight;

			// // var globalScale: number = ApplicationManager.globalScale;
			// // this.main.top_box.y = -(windowH - contentH * globalScale) / (2 * globalScale);
			// // this.main.bottom_box.y = -(windowH + contentH * globalScale) / (2 * globalScale);


			// var contentW: number = ApplicationManager.CONTENT_W;
			// var contentH: number = ApplicationManager.CONTENT_H;
			// var windowW: number = document.documentElement.clientWidth;
			// var windowH: number = document.documentElement.clientHeight;
			// var ratioContent: number = contentH / contentW;
			// var ratioWindow: number = windowH / windowW;

			// var scale: number;
			// if (ratioWindow >= ratioContent) {
			// 	scale = windowW / contentW;
			// } else {
			// 	scale = windowH / contentH;
			// }
			// // ApplicationManager.globalScale = scale;

			// // if (ApplicationManager.topStage) {
			// // 	ApplicationManager.topStage.scaleX = ApplicationManager.topStage.scaleY = scale;
			// // 	ApplicationManager.topStage.x = (windowW - contentW * scale) / 2;
			// // 	ApplicationManager.topStage.y = (windowH - contentH * scale) / 2;
			// // }
		}
		public startLoad(type: number, loadCompeltedFun: Function, loadCompeltedObj: any): void {
			let self = this;
			self._type = type;
			self.main.loginBg.source = self._type == 0 ? "loginBg_jpg" : "loginBg1_jpg";
			self.main.loginBg1.visible = type == 0;
			self.main.loginBg2.visible = type == 0;
			self._loadCompeltedFun = loadCompeltedFun;
			self._loadCompeltedObj = loadCompeltedObj;
			self._curTime = egret.getTimer();
			self._maxTime = 1500;
			let stage: egret.Stage = DLG.DLGCore.stage;
			stage.addEventListener(egret.Event.ENTER_FRAME, this.loop, this);
		}

		private loop(): void {
			let self = this;
			let passTime: number = egret.getTimer() - self._curTime
			self.main.bar.updateView(passTime, self._maxTime, false, 0);
			if (self._maxTime - passTime <= 0) {
				if (self._loadCompeltedFun) {
					self._loadCompeltedFun.call(self._loadCompeltedObj);
				}
				DLG.DLGCore.panel.close(PanelClassConfig.ID_LoadPanel);
			}

		}

		public onDestroy(): void {
			let stage: egret.Stage = DLG.DLGCore.stage;
			stage.removeEventListener(egret.Event.ENTER_FRAME, this.loop, this);
			stage.removeEventListener(egret.Event.RESIZE, this.onResizeHandler, this);
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