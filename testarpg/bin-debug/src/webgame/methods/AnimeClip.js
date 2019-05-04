var egret;
(function (egret) {
    var AnimeClip = (function (_super) {
        __extends(AnimeClip, _super);
        function AnimeClip() {
            _super.call(this);
        }
        var __egretProto__ = AnimeClip.prototype;
        __egretProto__.loadUrl = function (url, loop) {
            if (loop === void 0) { loop = false; }
            var config = RES.getRes(url + "_json");
            var texture = RES.getRes(url + "_png");
            var clipFactory = new egret.MovieClipDataFactory(config, texture);
            this.anime = new egret.MovieClip(clipFactory.generateMovieClipData(url));
            this.addChild(this.anime);
            if (loop == true) {
                this.anime.addEventListener(egret.Event.COMPLETE, this.onLoop, this);
            }
            this.anime.gotoAndPlay(1);
        };
        __egretProto__.onLoop = function (e) {
            this.anime.gotoAndPlay(1);
        };
        return AnimeClip;
    })(egret.gui.UIComponent);
    egret.AnimeClip = AnimeClip;
    AnimeClip.prototype.__class__ = "egret.AnimeClip";
})(egret || (egret = {}));
//# sourceMappingURL=AnimeClip.js.map