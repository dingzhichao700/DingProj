var egret;
(function (egret) {
    var SoulRoadControl = (function () {
        function SoulRoadControl() {
            this._curIndex = 0;
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
        __egretProto__.closeSoulRoad = function () {
            if (this.soulRoad && this.soulRoad.isOpen) {
                this.soulRoad.close();
            }
        };
        Object.defineProperty(__egretProto__, "curIndex", {
            get: function () {
                return this._curIndex;
            },
            enumerable: true,
            configurable: true
        });
        /**增加斗罗关卡数*/
        __egretProto__.addIndex = function () {
            this._curIndex++;
            if (this._curIndex > 4) {
                this._curIndex = 0;
            }
        };
        return SoulRoadControl;
    })();
    egret.SoulRoadControl = SoulRoadControl;
    SoulRoadControl.prototype.__class__ = "egret.SoulRoadControl";
})(egret || (egret = {}));
//# sourceMappingURL=SoulRoadControl.js.map