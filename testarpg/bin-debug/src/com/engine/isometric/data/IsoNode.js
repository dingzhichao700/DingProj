var egret;
(function (egret) {
    var IsoNode = (function () {
        function IsoNode() {
            /**
             * 行索引，默认 -1 为无效行
             */
            this.row = -1;
            /**
             * 列索引，默认 -1 为无效列
             */
            this.column = -1;
            /**
             * 等角尺寸(px)
             */
            this.size = 0;
            /**
             * 2D坐标点
             */
            this.point2D = null;
            /**
             * 3D深度
             */
            this.depth = 0;
            /**
             * 3D坐标点
             */
            this.point3D = null;
            /**
             * 路径中的上一个节点
             */
            this.preNode = null;
            /**
             * 路径中的下一个节点
             */
            this.nextNode = null;
            /**
             * 寻路总代价值 f = g + h
             */
            this.f = 0;
            /**
             * 寻路起点至当前节点的代价值
             */
            this.g = 0;
            /**
             * 寻路当前节点到终点的代价值
             */
            this.h = 0;
            /**
             * 节点行走的难度系数，值越大表示越难行走，如山坡节点比平地节点更难行走，此值应大于0，默认值:1
             */
            this.factor = 1;
            /**
             * 寻路算法专用标记，表示是否已查询过此节点
             */
            this.flag = false;
        }
        var __egretProto__ = IsoNode.prototype;
        __egretProto__.toString = function () {
            return "[IsoNode(row = " + this.row + ",column = " + this.column + ",depth = " + this.depth + ")]";
        };
        //
        /**
         * 复制参数属性值，注意 point2D,point3D,nextNode,preNode 必须不为 null 时才能复制对应属性值
         * @param node
         *
         */
        __egretProto__.copyBy = function (node) {
            this.row = node.row;
            this.column = node.column;
            this.size = node.size;
            this.depth = node.depth;
            this.f = node.f;
            this.g = node.g;
            this.h = node.h;
            this.factor = node.factor;
            if (this.nextNode && node.nextNode)
                this.nextNode.copyBy(node.nextNode);
            if (this.preNode && node.preNode)
                this.preNode.copyBy(node.preNode);
            if (this.point2D && node.point2D) {
                this.point2D.x = node.point2D.x;
                this.point2D.y = node.point2D.y;
            }
            if (this.point3D && node.point3D) {
                this.point3D.x = node.point3D.x;
                this.point3D.y = node.point3D.y;
                this.point3D.z = node.point3D.z;
            }
        };
        //
        /**
         * 初始化节点数据中的复杂数据字段
         *
         */
        __egretProto__.init = function () {
            this.preNode = new IsoNode();
            this.nextNode = new IsoNode();
            this.point2D = new egret.Point();
            this.point3D = new egret.Point3D();
        };
        return IsoNode;
    })();
    egret.IsoNode = IsoNode;
    IsoNode.prototype.__class__ = "egret.IsoNode";
})(egret || (egret = {}));
//# sourceMappingURL=IsoNode.js.map