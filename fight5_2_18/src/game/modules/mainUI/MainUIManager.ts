module game {
	export class MainUIManager extends DLG.BaseAction {
		private static _instance: MainUIManager

		private _selectTabId: number = 0;

		public _sceneId:number;

		public constructor() {
			super();
			let self = this;
			self.createSocket();
			self.createPanelMar();
		}
		public static getInstance(): MainUIManager {
			let self = this;
			if (!self._instance) {
				self._instance = new MainUIManager();
			}
			return self._instance;
		}

		public set selectTabId(value: number) {
			let self = this;
			self._selectTabId = value;
			self.m_panelMar.show(self._selectTabId);
		}

		public set sceneId(id:number){
			this._sceneId = id;

			this.mainUI.onRefresh();
		}

		/**更新怪物数量*/
		public updateMonsterNum(cur:number, total:number){
			this.mainUI.updateMonsterNum(cur, total);
		}

		public get mainUI():MainUIPanel {
			let mainUI: DLG.IPanel = DLG.DLGCore.panel.getPanelById(PanelClassConfig.ID_MainUiPanel);
			return mainUI as MainUIPanel;
		}

		public get sceneId():number{
			return this._sceneId;
		}

	}
}