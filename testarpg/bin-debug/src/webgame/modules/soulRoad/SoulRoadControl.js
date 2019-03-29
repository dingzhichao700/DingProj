var egret;
(function (egret) {
    var SoulRoadControl = (function () {
        function SoulRoadControl() {
        }
        var __egretProto__ = SoulRoadControl.prototype;
        SoulRoadControl.getInstance = function () {
            if (!SoulRoadControl._instance) {
                SoulRoadControl._instance = new SoulRoadControl();
            }
            return SoulRoadControl._instance;
        };
        __egretProto__.openSoulRoad = function () {
            if (!this.soulRoad) {
                this.soulRoad = new egret.SoulRoadView();
            }
            this.soulRoad.open();
        };
        return SoulRoadControl;
    })();
    egret.SoulRoadControl = SoulRoadControl;
    SoulRoadControl.prototype.__class__ = "egret.SoulRoadControl";
})(egret || (egret = {}));
