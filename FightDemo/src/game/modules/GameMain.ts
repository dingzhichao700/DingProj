module game {
	export enum PanelLayer {
		LOADING = 6,
		GUIDE = 5,
		Dialog = 4,
		TOP = 3,
		CENTER = 2,
		BOTTOM = 1,
		MAIN_UI = 0,
	}
	export class GameMain extends egret.Sprite {
		private tipsLayer: DLG.CGroup;
		private panelLayer: DLG.CGroup;
		public constructor() {
			super();
			let self = this;
			self.tipsLayer = new DLG.CGroup;
			self.panelLayer = new DLG.CGroup;
		
			self.panelLayer.addChild(new DLG.CGroup);
			self.panelLayer.addChild(new DLG.CGroup);
			self.panelLayer.addChild(new DLG.CGroup);
			self.panelLayer.addChild(new DLG.CGroup);
			self.panelLayer.addChild(new DLG.CGroup);
			self.panelLayer.addChild(new DLG.CGroup);
			self.panelLayer.addChild(new DLG.CGroup);

			self.addChild(self.panelLayer);
			self.addChild(self.tipsLayer);
			this.initData();
		}
		private initData(): void {
			var cfg: DLG.Table = new DLG.Table();
			cfg.setData(PanelClassConfig.getCfg());
			DLG.DLGCore.panel.init(this.panelLayer, cfg, game);
		}
	}
}