module game {
	export class WeaponManager extends DLG.BaseAction {
		private static _instance: WeaponManager

		private _weaponArr: Array<WeaponInfo>;

		public constructor() {
			super();
			let self = this;
			self.createSocket();
			self.createPanelMar();
		}

		public static getInstance(): WeaponManager {
			let self = this;
			if (!self._instance) {
				self._instance = new WeaponManager();
				self._instance.initBagDatas();
			}
			return self._instance;
		}
		private initBagDatas(): void {
			this._weaponArr = [];

			let info: WeaponInfo = new WeaponInfo();
			info.name = "袖箭";
			info.weaponId = 1;
			info.isNew = true;
			info.activity = true;
			info.attrHp = 1000;
			info.attrAtk = 300;
			info.attrDef = 280;
			info.skillId = 12008;
			this._weaponArr.push(info);

			info = new WeaponInfo();
			info.name = "龙须针";
			info.weaponId = 2;
			info.activity = false;
			info.attrHp = 2800;
			info.attrAtk = 440;
			info.attrDef = 400;
			info.skillId = 14003;
			this._weaponArr.push(info);

			info = new WeaponInfo();
			info.name = "诸葛神弩";
			info.weaponId = 3;
			info.activity = false;
			info.attrHp = 3501;
			info.attrAtk = 530;
			info.attrDef = 490;
			info.skillId = 14009;
			this._weaponArr.push(info);

			info = new WeaponInfo();
			info.name = "暴雨梨花针";
			info.weaponId = 4;
			info.activity = true;
			info.attrHp = 3591;
			info.attrAtk = 730;
			info.attrDef = 890;
			info.skillId = 14010;
			this._weaponArr.push(info);

			this._weaponArr.push(null);
		}

		public get weaponArr(): Array<WeaponInfo> {
			return this._weaponArr;
		}

	}
}