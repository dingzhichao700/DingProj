var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var PvpMsgInfo = (function () {
    function PvpMsgInfo(init) {
        if (init === void 0) { init = false; }
        if (init) {
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
    return PvpMsgInfo;
}());
__reflect(PvpMsgInfo.prototype, "PvpMsgInfo");
//# sourceMappingURL=PvpMsgInfo.js.map