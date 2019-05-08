var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var game;
(function (game) {
    var MissonIManager = (function (_super) {
        __extends(MissonIManager, _super);
        function MissonIManager() {
            var _this = _super.call(this) || this;
            _this.curTimes = 7;
            _this.maxTimes = 10;
            var self = _this;
            self.createSocket();
            self.createPanelMar();
            return _this;
        }
        MissonIManager.getInstance = function () {
            var self = this;
            if (!self._instance) {
                self._instance = new MissonIManager();
                self._instance.initBagDatas();
            }
            return self._instance;
        };
        MissonIManager.prototype.initBagDatas = function () {
            var i = 0;
            this._mission = [];
            var vo;
            for (i = 0; i < 5; i++) {
                vo = new MissionVo();
                vo.missionId = 100001 + i;
                vo.open = i == 0;
                vo.pass = false;
                this._mission.push(vo);
            }
        };
        Object.defineProperty(MissonIManager.prototype, "mission", {
            get: function () {
                return this._mission;
            },
            enumerable: true,
            configurable: true
        });
        MissonIManager.prototype.enterMission = function (id) {
            DLG.DLGCore.panel.closeAll();
            game.SceneManager.getInstance().changeMap(id, true);
        };
        MissonIManager.prototype.updateMissionStatus = function (id) {
            var i = 0;
            var len = this._mission.length;
            for (i = 0; i < len; i++) {
                var vo = this._mission[i];
                if (vo.missionId == id) {
                    vo.open = true;
                    vo.pass = true;
                    vo = this._mission[i + 1];
                    if (vo) {
                        vo.open = true;
                    }
                    return;
                }
            }
        };
        MissonIManager.prototype.getNextMission = function (id) {
            var i = 0;
            var len = this._mission.length;
            for (i = 0; i < len; i++) {
                var vo = this._mission[i];
                if (vo.missionId == id) {
                    vo.open = true;
                    vo.pass = true;
                    var next = this._mission[i + 1];
                    if (next) {
                        return next.missionId;
                    }
                    return this._mission[0].missionId;
                }
            }
            return this._mission[0].missionId;
        };
        return MissonIManager;
    }(DLG.BaseAction));
    game.MissonIManager = MissonIManager;
    __reflect(MissonIManager.prototype, "game.MissonIManager");
})(game || (game = {}));
//# sourceMappingURL=MissonIManager.js.map