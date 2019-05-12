module game {
	export class PvpMatchManager extends DLG.BaseAction {
		private static _instance: PvpMatchManager

		private _pvpMsgInfo:PvpMsgInfo;
		
		public constructor() {
			super();
			let self = this;
			self.createSocket();
			self.createPanelMar();
		}
		
		public static getInstance(): PvpMatchManager {
			let self = this;
			if (!self._instance) {
				self._instance = new PvpMatchManager();
				self._instance.initDatas();
			}
			return self._instance;
		}
		private initDatas():void{
			this._pvpMsgInfo = new PvpMsgInfo(true);
			this._pvpMsgInfo.atkInfo
		}

		public get pvpMsgInfo():PvpMsgInfo{
			return this._pvpMsgInfo;
		}

	}
}