var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var GAME_PATH = (function () {
        function GAME_PATH() {
        }
        return GAME_PATH;
    }());
    GAME_PATH.TYPE_JPG = '.jpg';
    GAME_PATH.TYPE_PNG = '.png';
    GAME_PATH.TYPE_JSON = '.json';
    GAME_PATH.BASE_PATH = 'resource2/';
    GAME_PATH.ZIP = GAME_PATH.BASE_PATH + 'config.zip';
    GAME_PATH.MAP_PATH = GAME_PATH.BASE_PATH + 'map/';
    GAME_PATH.WALL_PATH = GAME_PATH.BASE_PATH + 'wall/';
    GAME_PATH.MOVIE_PLAYER_PATH = GAME_PATH.BASE_PATH + 'movie/player/';
    GAME_PATH.MOVIE_MONSTER_PATH = GAME_PATH.BASE_PATH + 'movie/monster/';
    GAME_PATH.MOVIE_BULLET_PATH = GAME_PATH.BASE_PATH + 'movie/bullet/';
    GAME_PATH.MOVIE_EFFECT_PATH = GAME_PATH.BASE_PATH + 'movie/effect/';
    game.GAME_PATH = GAME_PATH;
    __reflect(GAME_PATH.prototype, "game.GAME_PATH");
})(game || (game = {}));
//# sourceMappingURL=GAME_PATH.js.map