var egret;
(function (egret) {
    var AlignItem = (function () {
        /**
         * 构造函数
         */
        function AlignItem() {
            /**
             * 对齐方式 AlignType
             */
            this.align = 0;
            /**
             * 与上边框的距离
             * @param value:Number 默认值:0px
             *
             */
            this.top = 0;
            /**
             * 与下边框的距离
             * @param value:Number 默认值:0px
             *
             */
            this.bottom = 0;
            /**
             * 与左边框的距离
             * @param value:Number 默认值:0px
             *
             */
            this.left = 0;
            /**
             * 与右边框的距离
             * @param value:Number 默认值:0px
             *
             */
            this.right = 0;
        }
        var __egretProto__ = AlignItem.prototype;
        return AlignItem;
    })();
    egret.AlignItem = AlignItem;
    AlignItem.prototype.__class__ = "egret.AlignItem";
})(egret || (egret = {}));
