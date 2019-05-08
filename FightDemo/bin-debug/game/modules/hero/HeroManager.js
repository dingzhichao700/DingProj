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
    var HeroManager = (function (_super) {
        __extends(HeroManager, _super);
        function HeroManager() {
            var _this = _super.call(this) || this;
            _this._quickPutOnBullet = 0;
            var self = _this;
            self.createSocket();
            return _this;
        }
        HeroManager.getInstance = function () {
            var self = this;
            if (!self._instance) {
                self._instance = new HeroManager();
            }
            return self._instance;
        };
        HeroManager.prototype.registProtocol = function () {
            var self = this;
            self.m_socket.onDataCallback(game.CmdCode.ACK_MyInfo, '', self.initHeroInfo, self);
        };
        HeroManager.prototype.addRole = function (index, movieName, job, attr, skills) {
            var self = this;
            var pointArr = game.SceneData.roleStandPoint;
            var sceneMar = game.SceneManager.getInstance();
            var driverdata = sceneMar.createDriverData(game.ENUM_DriverType.role);
            driverdata.x = pointArr[index];
            driverdata.y = 780;
            driverdata.index = index;
            driverdata.attr.clear();
            driverdata.attr = attr;
            // driverdata.speed = Math.floor(Math.random() * 2) + 1;
            driverdata.movieName = movieName;
            driverdata.job = job;
            driverdata.bulletCountMax = 100;
            driverdata.putOnBulletCDTime = 6000;
            if (job == game.ENUM_JOB_TYPE.job_ZS) {
                driverdata.canThreeRatio = 4000;
                driverdata.doubleRatio = 5000;
                driverdata.bigWeaponRatio = 1000;
                driverdata.bigWeaponHurtRatio = 5000;
                driverdata.luckHurtExRationMin = 1000;
                driverdata.luckHurtExRationkMax = 5000;
            }
            else if (job == game.ENUM_JOB_TYPE.JOB_GJS) {
                driverdata.canThreeRatio = 4000;
                driverdata.canFiveRatio = 4000;
                driverdata.farHurtExRatio = 800;
            }
            else if (job == game.ENUM_JOB_TYPE.JOB_CK) {
                driverdata.canThreeRatio = 4000;
                driverdata.anshaRatio = 5000;
                driverdata.anshaHurtExRatio = 10000;
                driverdata.anshaLiAttackExValueRatio = 100;
            }
            else if (job == game.ENUM_JOB_TYPE.JOB_FS) {
                driverdata.doubleRatio = 5000;
                driverdata.shortHurtExRatio = 1000;
                // driverdata.forceSwoonRatio = 5000;
                // driverdata.swoonHurtExRatio = 800;
                driverdata.molotovRatio = 5000;
            }
            else if (job == game.ENUM_JOB_TYPE.JOB_WS) {
                driverdata.doubleRatio = 5000;
                driverdata.canFiveRatio = 4000;
                driverdata.luckHurtExRationMin = 1000;
                driverdata.luckHurtExRationkMax = 5000;
                driverdata.baoFaHurtRatio = 5000;
                driverdata.hpHurtExValueRatio = 5000;
                driverdata.flamerRatio = 5000;
            }
            // driverdata.hp = hp;
            // driverdata.totalHp = driverdata.hp;
            // if (Math.random() > 0.5)
            // {
            // 	driverdata.skills = [1001];
            // } else {
            // 	driverdata.skills = [1002];
            // }
            driverdata.skills = skills;
            sceneMar.addDriver(driverdata);
        };
        HeroManager.prototype.removeRoleByDirver = function (driver) {
            var self = this;
            var sceneMar = game.SceneManager.getInstance();
            sceneMar.removeDriver(driver);
        };
        /**怪物移动速度减少多少  万分比 */
        HeroManager.prototype.setMonsterSpeedCut = function (value) {
            game.FightManager.getInstance().monsterSpeedCut = value / 10000;
        };
        /**快速装弹 概率   队伍技能*/
        HeroManager.prototype.setQuickPutOnBullet = function (value) {
            this._quickPutOnBullet = value / 10000;
        };
        HeroManager.prototype.getQuickPutOnBullet = function () {
            return this._quickPutOnBullet;
        };
        /**怪物攻击无效几率提升   value传万分比 */
        HeroManager.prototype.setMonsterNotHit = function (value) {
            game.FightManager.getInstance().monsterNotHit = value / 10000;
        };
        /**初始化人物信息 */
        HeroManager.prototype.initHeroInfo = function (type, arr) {
        };
        return HeroManager;
    }(DLG.BaseAction));
    game.HeroManager = HeroManager;
    __reflect(HeroManager.prototype, "game.HeroManager");
})(game || (game = {}));
//# sourceMappingURL=HeroManager.js.map