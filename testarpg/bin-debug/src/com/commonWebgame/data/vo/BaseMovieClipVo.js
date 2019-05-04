var egret;
(function (egret) {
    var BaseMovieClipVo = (function () {
        function BaseMovieClipVo() {
            /**
             * 帧数据 BaseMovieClipDataItem 数组，按帧索引排列
             */
            this.dataItems = [];
            /**
             * 帧频
             */
            this.frameRate = 0;
            /**
             * 头顶线 y坐标
             */
            this.topLineY = 0;
            /**
             * 中心点坐标
             */
            this.centerPoint = new egret.Point();
            /**
             * 阴影宽度，为0时无阴影
             */
            this.shadowWidth = 0;
            /**
             * 阴影高度，为0时无阴影
             */
            this.shadowHeight = 0;
        }
        var __egretProto__ = BaseMovieClipVo.prototype;
        /**
         * 销毁
         *
         */
        __egretProto__.destroy = function () {
            var length = this.dataItems.length;
            for (var i = 0; i < length; i++) {
                var item = this.dataItems[i];
                item.destroy();
            }
            this.dataItems = null;
            this.centerPoint = null;
        };
        return BaseMovieClipVo;
    })();
    egret.BaseMovieClipVo = BaseMovieClipVo;
    BaseMovieClipVo.prototype.__class__ = "egret.BaseMovieClipVo";
})(egret || (egret = {}));
//# sourceMappingURL=BaseMovieClipVo.js.map