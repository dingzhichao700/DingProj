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
    var EffectMovie = (function (_super) {
        __extends(EffectMovie, _super);
        function EffectMovie() {
            return _super.call(this, true) || this;
        }
        EffectMovie.prototype.getTotalPlayTimes = function () {
            return this._totalPlayTimes;
        };
        /**以次数播放 */
        EffectMovie.prototype.play = function (totalPlayTimes) {
            var self = this;
            if (self._totalPlayTimes == totalPlayTimes) {
                return;
            }
            self._currentTimes = 0;
            self._totalPlayTimes = totalPlayTimes;
            self._playEndTime = undefined;
            if (self._timeId) {
                DLG.DLGCore.clock.removeTime(self._timeId, false);
                self._timeId = undefined;
            }
            self.loadMovie();
            self._timeId = DLG.DLGCore.clock.addTime(EffectMovie.EffectNextFrameTimes, 0, self.nextFrame, self, null);
        };
        /**以时间播放 */
        EffectMovie.prototype.playByTime = function (time) {
            var self = this;
            self._totalPlayTimes = 0;
            self._currentTimes = undefined;
            self._playEndTime = DLG.DLGCore.clock.getTime() + time;
            if (self._timeId) {
                DLG.DLGCore.clock.removeTime(self._timeId, false);
                self._timeId = undefined;
            }
            self._timeId = DLG.DLGCore.clock.addTime(EffectMovie.EffectNextFrameTimes, 0, self.nextFrame, self, null);
        };
        EffectMovie.prototype.nextFrame = function () {
            var self = this;
            _super.prototype.nextFrame.call(this);
            if (self._playEndTime) {
                if (DLG.DLGCore.clock.getTime() - self._playEndTime > 0) {
                    self.removeEffect();
                    self.destroy();
                    if (self.onPlayEndCallBack) {
                        self.onPlayEndCallBack.call(self.onPlayEndTaget);
                    }
                }
                return;
            }
            if (self._loadEnd) {
                if (self._playFrame == self._totalFrame - 1) {
                    if (self._totalPlayTimes > 0) {
                        self._currentTimes++;
                        if (self._currentTimes == self._totalPlayTimes) {
                            self.removeEffect();
                            self.destroy();
                            if (self.onPlayEndCallBack) {
                                self.onPlayEndCallBack.call(self.onPlayEndTaget);
                            }
                        }
                    }
                }
            }
        };
        EffectMovie.prototype.removeEffect = function () {
            var self = this;
            if (self.parent) {
                self.parent.removeChild(self);
            }
            EffectMovie.returnEffectMovie(self);
        };
        EffectMovie.prototype.reset = function () {
            var self = this;
            self.clear();
            self._playFrame = -1;
            self.goToAndStop(0);
        };
        EffectMovie.prototype.clear = function () {
            var self = this;
            if (self._timeId) {
                DLG.DLGCore.clock.removeTime(self._timeId, false);
                self._timeId = undefined;
            }
            self._totalPlayTimes = undefined;
            self._currentTimes = undefined;
            self._playEndTime = undefined;
            self.onPlayEndCallBack = undefined;
            self.onPlayEndTaget = undefined;
            self.x = 0;
            self.y = 0;
        };
        EffectMovie.prototype.destroy = function () {
            this.clear();
            _super.prototype.destroy.call(this);
        };
        EffectMovie.createEffectMovie = function (movieName) {
            var effect;
            if (EffectMovie._effectPool.length > 0) {
                effect = EffectMovie._effectPool.shift();
            }
            else {
                effect = new EffectMovie();
            }
            effect.setAction(0);
            effect.setDirection(game.ENUM_DriverDirection.up);
            effect.setMovieName(game.GAME_PATH.MOVIE_EFFECT_PATH, movieName);
            return effect;
        };
        EffectMovie.returnEffectMovie = function (effect) {
            effect.destroy();
            EffectMovie._effectPool.push(effect);
        };
        return EffectMovie;
    }(game.MovieSkin));
    /**换帧的时间 */
    EffectMovie.EffectNextFrameTimes = 150;
    EffectMovie._effectPool = [];
    game.EffectMovie = EffectMovie;
    __reflect(EffectMovie.prototype, "game.EffectMovie");
})(game || (game = {}));
//# sourceMappingURL=EffectMovie.js.map