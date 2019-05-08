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
    var RoleDriver = (function (_super) {
        __extends(RoleDriver, _super);
        function RoleDriver() {
            var _this = _super.call(this) || this;
            var self = _this;
            self._direction = game.ENUM_DriverDirection.up;
            return _this;
        }
        RoleDriver.prototype.init = function () {
            var self = this;
            self._bodySkin.setDirection(self._direction);
            self._bodySkin.setMovieName(game.GAME_PATH.MOVIE_PLAYER_PATH, self._data.movieName);
            self._bodySkin.setAction(game.ENUM_DriverAction.stand);
            self._bodySkin.loadMovie();
            self.update();
            self.stand();
        };
        RoleDriver.prototype.attack = function (skillId, px, py, monsterNotHit) {
            var self = this;
            _super.prototype.attack.call(this, skillId, px, py);
            var data = self._data;
            if (data.driverType == game.ENUM_DriverType.role) {
                data.attackPx = px;
                data.attackPy = py;
            }
            var useSkillAction = DLG.FactoryUtils.getClass(game.UseSkillAction);
            useSkillAction.useSkill(self, skillId);
        };
        RoleDriver.prototype.onPlayFrameCallBack = function (frame, _totalFrame) {
            var self = this;
            if (self._actionState == game.ENUM_DriverAction.attack) {
                if (frame == _totalFrame) {
                    self.stand();
                }
            }
            if (frame == _totalFrame) {
                var data = self._data;
                var skills = data.skills;
                var i = 0;
                var len = skills.length;
                var useSkillAction = DLG.FactoryUtils.getClass(game.UseSkillAction);
                if (data.job == game.ENUM_JOB_TYPE.JOB_GJS) {
                    if (skills.indexOf(game.SkillType.JOB_GJS_11009) != -1) {
                        if (useSkillAction.checkSkillIsCD(data.id, game.SkillType.JOB_GJS_11009) == false) {
                            useSkillAction.setSkillCdTime(data.id, game.SkillType.JOB_GJS_11009);
                            data.infiniteArrowTimes = 10;
                        }
                    }
                }
            }
        };
        RoleDriver.prototype.nextFrame = function () {
            var self = this;
            self._bodySkin.nextFrame();
        };
        return RoleDriver;
    }(game.MonsterDriver));
    game.RoleDriver = RoleDriver;
    __reflect(RoleDriver.prototype, "game.RoleDriver");
})(game || (game = {}));
//# sourceMappingURL=RoleDriver.js.map