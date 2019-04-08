var egret;
(function (egret) {
    var DimensionUtil = (function () {
        function DimensionUtil() {
        }
        var __egretProto__ = DimensionUtil.prototype;
        //
        /**
         * 计算3D空间两点的距离
         * @param point1:Point3D
         * @param point2:Point3D
         * @return
         *
         */
        DimensionUtil.distance3D = function (point1, point2) {
            var x = point1.x - point2.x;
            var y = point1.y - point2.y;
            var z = point1.z - point2.z;
            //不用Math.pow()函数，提高效率
            return Math.sqrt(x * x + y * y + z * z);
        };
        //
        /**
         * 计算2D空间中两点的距离
         * @param point1:Point
         * @param point2:Point
         * @return
         *
         */
        DimensionUtil.distance = function (point1, point2) {
            var x = point1.x - point2.x;
            var y = point1.y - point2.y;
            //不用Math.pow()函数，提高效率
            return Math.sqrt(x * x + y * y);
        };
        //
        /**
         * 计算2D空间中两点的距离
         * @return
         *
         */
        DimensionUtil.distance2 = function (x1, y1, x2, y2) {
            var x = x1 - x2;
            var y = y1 - y2;
            //不用Math.pow()函数，提高效率
            return Math.sqrt(x * x + y * y);
        };
        return DimensionUtil;
    })();
    egret.DimensionUtil = DimensionUtil;
    DimensionUtil.prototype.__class__ = "egret.DimensionUtil";
})(egret || (egret = {}));
//# sourceMappingURL=DimensionUtil.js.map