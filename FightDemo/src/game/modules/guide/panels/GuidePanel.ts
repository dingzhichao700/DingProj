module game {
	export class GuidePanel extends DLG.VPanel {
		protected main: GuideView;
		private _plus:number=1;
		public constructor(panelId: number, fromPanelid?: string) {
			super(panelId);
		}
		public onShow(...arg): void {
			super.onShow(...arg);
			let self = this;
			self.main = new GuideView();
			self.addChild(self.main);
			self.main.onLoadCallBack = self.initView;
			self.main.onLoadCallTarget = self;
		}
		protected initView(): void {
			super.initView();
			let self = this;
			self.main.icon_img.addEventListener(egret.TouchEvent.TOUCH_TAP, self.clickItemHandler, self);
			self._plus = 1;
			// self.main.icon_img.source = 
			// self.main.arrow_img.source = 
			self.addTween();

			this.onResizeHandler();
			let stage: egret.Stage = DLG.DLGCore.stage;
			stage.addEventListener(egret.Event.RESIZE, this.onResizeHandler, this);
		}
		private onResizeHandler(): void {
			var contentH: number = ApplicationManager.CONTENT_H;
            var windowH: number = document.documentElement.clientHeight;
            
            var globalScale: number = ApplicationManager.globalScale;
            this.main.content_box.y = (windowH + contentH * globalScale) / (2 * globalScale) - 147;
		}
		private clickItemHandler():void{
			DLG.DLGCore.panel.show(PanelClassConfig.ID_MissionPanel);
			DLG.DLGCore.panel.close(PanelClassConfig.ID_GuidePanel);
		}
		private addTween():void{
			let self = this;
			let py = self.main.arrow_img.y;
			self._plus *=-1;
			let targetY:number = py + self._plus*40;
			egret.Tween.get(self.main.arrow_img).to({y: targetY }, 500).call(self.addTween,self);
		}
		public onDestroy(): void {
			let stage: egret.Stage = DLG.DLGCore.stage;
			stage.removeEventListener(egret.Event.RESIZE, this.onResizeHandler, this);
			egret.Tween.removeTweens(this.main.arrow_img);
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