class PvpMsgInfo {
	public atkInfo:FightInfo;
	public defInfo:FightInfo;
	public curPro:number;
	public maxPro:number;
	public matchTimes:number;
	public winTimes:number;
	public resTimes:number;
	public maxTimes:number;

	public constructor(init:boolean=false) {
		if(init){
			this.atkInfo = new FightInfo();
			this.atkInfo.lv = 100;
			this.atkInfo.name = "poopy";
			this.atkInfo.pvpLv = 1;
			this.atkInfo.pvpTitle = "铜斗魂";
			this.atkInfo.sex = 1;

			this.defInfo = new FightInfo();
			this.defInfo.lv = 150;
			this.defInfo.name = "愤怒的如花";
			this.defInfo.pvpLv = 2;
			this.defInfo.pvpTitle = "银斗魂";
			this.defInfo.sex = 2; 

			this.curPro = 240;
			this.maxPro = 800;

			this.matchTimes = 3;
			this.winTimes = 2;
			this.resTimes = 7;
			this.maxTimes = 10;
		}
	}
}