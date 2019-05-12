module game {
	export class MissonIManager extends DLG.BaseAction {
		private static _instance: MissonIManager
		public curTimes:number = 7;
		public maxTimes:number = 10;
		private _mission:Array<MissionVo>;
		
		public clickFirstMission:boolean;

		public constructor() {
			super();
			let self = this;
			self.createSocket();
			self.createPanelMar();
		}
		public static getInstance(): MissonIManager {
			let self = this;
			if (!self._instance) {
				self._instance = new MissonIManager();
				self._instance.initBagDatas();
			}
			return self._instance;
		}
		private initBagDatas():void{
			let i:number=0
			this._mission = [];
			let vo:MissionVo;
			for(i=0;i<5;i++){
				vo = new MissionVo();
				vo.missionId = 100001 + i;
				vo.open = i ==0;
				vo.pass = false;
				this._mission.push(vo);
			}
		}

		public get mission() :Array<MissionVo>{
			return this._mission;
		}
		public enterMission(id:number):void{
			DLG.DLGCore.panel.closeAll();
			SceneManager.getInstance().changeMap(id,true);
		}

		public updateMissionStatus(id:number):void{
			let i:number=0
			let len:number = this._mission.length;
			for(i=0;i<len;i++){
				let vo:MissionVo = this._mission[i];
				if(vo.missionId == id){
					vo.open = true;
					vo.pass = true;

					vo = this._mission[i+1];
					if(vo){
						vo.open = true;
					}
					return;
				}
			}
		}

		public getNextMission(id:number):number{
			let i:number=0
			let len:number = this._mission.length;
			for(i=0;i<len;i++){
				let vo:MissionVo = this._mission[i];
				if(vo.missionId == id){
					vo.open = true;
					vo.pass = true;

					let next:MissionVo = this._mission[i+1];
					if(next){
						return next.missionId;
					}
					return this._mission[0].missionId;
				}
			}
			return this._mission[0].missionId;
		}

		

	}
}