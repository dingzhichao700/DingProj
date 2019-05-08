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
    var BulletDriver = (function (_super) {
        __extends(BulletDriver, _super);
        function BulletDriver() {
            var _this = _super.call(this) || this;
            var self = _this;
            // self._data = new DriverData();
            self.touchEnabled = false;
            self._direction = game.ENUM_DriverDirection.up;
            self._bodySkin = new game.MovieSkin(true);
            self.addChild(self._bodySkin);
            return _this;
        }
        BulletDriver.prototype.init = function () {
            var self = this;
            self._bodySkin.setDirection(self._direction);
            self._bodySkin.setMovieName(game.GAME_PATH.MOVIE_BULLET_PATH, self._data.movieName);
            self.update();
            self._bodySkin.setAction(0);
            self._bodySkin.loadMovie();
            if (true) {
                if (game.SceneManager.showRang) {
                    self._testSprite = new egret.Sprite();
                    self.addChild(self._testSprite);
                    self._testSprite.graphics.beginFill(0x000000);
                    self._testSprite.graphics.lineStyle(1, 0x0);
                    self._testSprite.graphics.drawCircle(0, 0, 5);
                    self._testSprite.graphics.endFill();
                }
            }
        };
        BulletDriver.prototype.update = function () {
            var self = this;
            var data = self._data;
            if (!data) {
                return;
            }
            if (self.x != data.x)
                self.x = data.x;
            if (self.y != data.y)
                self.y = data.y;
            if (self.rotation != data.rotation)
                self.rotation = data.rotation;
        };
        BulletDriver.prototype.nextFrame = function () {
            var self = this;
            self._bodySkin.nextFrame();
        };
        BulletDriver.prototype.move = function () {
            var self = this;
            var data = self._data;
            var speed = data.attr.getValue(game.Enum_Attr.speed);
            if (self._direction == game.ENUM_DriverDirection.up) {
                if (data.rotation) {
                    var px = Math.sin(data.rotation * Math.PI / 180) * speed;
                    var py = Math.cos(data.rotation * Math.PI / 180) * speed;
                    data.x += px;
                    data.y -= py;
                    self.y = data.y;
                    self.x = data.x;
                }
                else {
                    data.y -= speed;
                    self.y = data.y;
                }
            }
            if (data.rotateMove) {
                self.rotation += 30;
            }
        };
        BulletDriver.prototype.setData = function (value) {
            var self = this;
            if (!self._data) {
                self._data = value;
                self.init();
            }
            else {
                self._data = value;
                self.update();
            }
        };
        BulletDriver.prototype.getData = function () {
            return this._data;
        };
        BulletDriver.prototype.stand = function () {
        };
        BulletDriver.prototype.attack = function () {
        };
        BulletDriver.prototype.isAttack = function () {
            return false;
        };
        BulletDriver.prototype.run = function () {
        };
        BulletDriver.prototype.clear = function () {
            var self = this;
            self.rotation = 0;
            // self._bodySkin.destroy();
        };
        return BulletDriver;
    }(egret.Sprite));
    game.BulletDriver = BulletDriver;
    __reflect(BulletDriver.prototype, "game.BulletDriver", ["game.IDriver"]);
})(game || (game = {}));
//# sourceMappingURL=BulletDriver.js.map