var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var MovieLoadManager = (function () {
        function MovieLoadManager() {
            this.init();
        }
        MovieLoadManager.getInstance = function () {
            var self = this;
            if (!self._instance) {
                self._instance = new MovieLoadManager();
            }
            return self._instance;
        };
        MovieLoadManager.prototype.init = function () {
            var self = this;
            self._loadVoPoolArr = [];
            self._movieLoadMap = {};
            self._movieDataMap = {};
        };
        MovieLoadManager.prototype.getRes = function (url) {
            var self = this;
            if (self._movieDataMap.hasOwnProperty(url)) {
                return self._movieDataMap[url];
            }
            return null;
        };
        MovieLoadManager.prototype.load = function (url, loadCallBack, loadCallBackTarget) {
            var self = this;
            if (self._movieDataMap.hasOwnProperty(url)) {
                var arr = self._movieDataMap[url];
                loadCallBack.call(loadCallBackTarget, url, arr[0], arr[1]);
                return;
            }
            var loadvo;
            if (self._movieLoadMap.hasOwnProperty(url)) {
                loadvo = self._movieLoadMap[url];
                loadvo.addCallBack(loadCallBack, loadCallBackTarget);
                return;
            }
            if (self._loadVoPoolArr.length > 0) {
                loadvo = self._loadVoPoolArr.pop();
            }
            else {
                loadvo = new game.MovieLoadVo();
            }
            loadvo.load(url, loadCallBack, loadCallBackTarget);
            self._movieLoadMap[url] = loadvo;
        };
        MovieLoadManager.prototype.addData = function (url, jsonObj, bitmapData) {
            var self = this;
            self._movieDataMap[url] = [jsonObj, bitmapData];
        };
        MovieLoadManager.prototype.returnMovieLoadVo = function (vo) {
            this._loadVoPoolArr.push(vo);
        };
        return MovieLoadManager;
    }());
    game.MovieLoadManager = MovieLoadManager;
    __reflect(MovieLoadManager.prototype, "game.MovieLoadManager");
})(game || (game = {}));
//# sourceMappingURL=MovieLoadManager.js.map