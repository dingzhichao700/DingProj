var egret;
(function (egret) {
    var BaseMovieClipDataItem = (function () {
        function BaseMovieClipDataItem() {
            /**
             * 图片x坐标
             */
            this.x = 0;
            /**
             * 图片y坐标
             */
            this.y = 0;
            /**
             * 图片数据
             */
            this.bitmapData = null;
            /**
             * 编码或解码 bitmapData 数据时的使用的数组对象
             */
            this.bytes = null;
        }
        var __egretProto__ = BaseMovieClipDataItem.prototype;
        /**
         * 销毁数据
         *
         */
        __egretProto__.destroy = function () {
            if (this.bitmapData)
                this.bitmapData.dispose();
            if (this.bytes)
                this.bytes.clear();
            this.bitmapData = null;
            this.bytes = null;
        };
        return BaseMovieClipDataItem;
    })();
    egret.BaseMovieClipDataItem = BaseMovieClipDataItem;
    BaseMovieClipDataItem.prototype.__class__ = "egret.BaseMovieClipDataItem";
})(egret || (egret = {}));
//# sourceMappingURL=BaseMovieClipDataItem.js.map