var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var GAME_CORE = (function () {
        function GAME_CORE() {
        }
        return GAME_CORE;
    }());
    GAME_CORE.APP_WIDTH = 640;
    GAME_CORE.APP_HEIGHT = 960;
    GAME_CORE.SHOW_MAP_MOVIE = true;
    game.GAME_CORE = GAME_CORE;
    __reflect(GAME_CORE.prototype, "game.GAME_CORE");
})(game || (game = {}));
//# sourceMappingURL=GAME_CORE.js.map