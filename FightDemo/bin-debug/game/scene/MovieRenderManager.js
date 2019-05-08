var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var MovieRenderManager = (function () {
        // protected _timer: egret.Timer;
        function MovieRenderManager() {
            this.count = 0;
            this.init();
        }
        MovieRenderManager.getInstance = function () {
            var self = this;
            if (!self._instance) {
                self._instance = new MovieRenderManager();
            }
            return self._instance;
        };
        MovieRenderManager.prototype.init = function () {
            var self = this;
            DLG.DLGCore.clock.addTime(150, 0, self.renderHandler, self, null);
        };
        MovieRenderManager.prototype.renderHandler = function () {
            var self = this;
            var sceneMar = game.SceneManager.getInstance();
            var monsterArr = sceneMar.getAllMonster();
            var i = 0;
            var len = monsterArr.length;
            self.count++;
            for (i = 0; i < len; i++) {
                var monster = sceneMar.getDriverById(monsterArr[i], game.ENUM_DriverType.monster);
                if (monster == null)
                    continue;
                var monsterdata = monster.getData();
                if (monsterArr.length > 30 && monster.y < 300) {
                    if (self.count == 2) {
                        monster.nextFrame();
                    }
                }
                else {
                    monster.nextFrame();
                }
            }
            var roleArr = sceneMar.getAllRoles();
            i = 0;
            len = roleArr.length;
            for (i = 0; i < len; i++) {
                var role = sceneMar.getDriverById(roleArr[i], game.ENUM_DriverType.role);
                if (role == null)
                    break;
                role.nextFrame();
            }
            var bulletArr = sceneMar.getAllBullet();
            i = 0;
            len = bulletArr.length;
            for (i = 0; i < len; i++) {
                var bullet = sceneMar.getDriverById(roleArr[i], game.ENUM_DriverType.bullet);
                if (bullet == null)
                    break;
                if (self.count == 2) {
                    bullet.nextFrame();
                }
            }
            if (self.count == 2) {
                self.count = 0;
            }
        };
        return MovieRenderManager;
    }());
    game.MovieRenderManager = MovieRenderManager;
    __reflect(MovieRenderManager.prototype, "game.MovieRenderManager");
})(game || (game = {}));
//# sourceMappingURL=MovieRenderManager.js.map