module game {
	export class WuHunManager extends DLG.BaseAction {
		private static _instance: WuHunManager

		private _roleInfo:Array<RoleVo>;
		private _wuhunItemArr:Array<WuhunItemInfo>;
		

		public constructor() {
			super();
			let self = this;
			self.createSocket();
			self.createPanelMar();
		}
		public static getInstance(): WuHunManager {
			let self = this;
			if (!self._instance) {
				self._instance = new WuHunManager();
				self._instance.initBagDatas();
			}
			return self._instance;
		}
		private initBagDatas():void{
			let i:number=0
			this._roleInfo = [];
			for(i=0;i<5;i++){
				let info:RoleVo = new RoleVo();
				info.lv = i*4+5;
				info.name = "poopy"+i;
				info.modelId = i%5 + 1;
				info.activity = i%2==0;
				info.wuHunLv = i%2 + 1;
				info.itemId1 = 10001;
				info.itemId2 = 10002;
				info.itemId3 = 10003;
				info.itemId4 = 10004;
				info.itemId5 = 10005;;
				info.itemId6 = 10006;
				info.open1 = i%2==0;
				info.open2 = i%3==0;
				info.open3 = i%2==0;
				info.open4 = i%3==0;
				info.open5 = i%2==0;
				info.open6 = i%1==0;
				info.score = 100;
				info.attrHp = 1424+i*10;
				info.attrAtk = 859+i*10;
				info.attrDef = 702+i*10;
				info.skillId = 12011 + i;
				this._roleInfo.push(info);
			}
		}

		public get roleInfo() :Array<RoleVo>{
			return this._roleInfo;
		}

	}
}