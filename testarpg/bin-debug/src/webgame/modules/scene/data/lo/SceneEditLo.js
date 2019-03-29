var egret;
(function (egret) {
    var SceneEditLo = (function () {
        function SceneEditLo() {
            /**
             * 主键
             */
            this.id = 0;
            /**
             * 切片宽度
             */
            this.pieceWidth = 0;
            /**
             * 切片高度
             */
            this.pieceHeight = 0;
            /**
             * 路径方格像素大小(高度值，宽度为此值2倍)
             */
            this.gridSize = 0;
            /**
             * 地图总宽度
             */
            this.width = 0;
            /**
             * 地图总高度
             */
            this.height = 0;
            /**
             * 总列数
             */
            this.columns = 0;
            /**
             * 总行数
             */
            this.rows = 0;
            /**
             * 节点数组，2维数组，1行为1个数组
             */
            this.nodeTypes = null;
            /**
             * 地图中的元素数据集合，以SceneElementType为key，元素数据(SceneElementLo)数组为值的集合
             */
            this.elements = null;
        }
        var __egretProto__ = SceneEditLo.prototype;
        return SceneEditLo;
    })();
    egret.SceneEditLo = SceneEditLo;
    SceneEditLo.prototype.__class__ = "egret.SceneEditLo";
})(egret || (egret = {}));
