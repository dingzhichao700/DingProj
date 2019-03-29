var egret;
(function (egret) {
    var Point3D = (function () {
        function Point3D(x, y, z) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (z === void 0) { z = 0; }
            this.x = x;
            this.y = y;
            this.z = z;
        }
        var __egretProto__ = Point3D.prototype;
        //
        __egretProto__.toString = function () {
            return "[Point3D(x = " + this.x + ", y = " + this.y + ", z = " + this.z + ")]";
        };
        return Point3D;
    })();
    egret.Point3D = Point3D;
    Point3D.prototype.__class__ = "egret.Point3D";
})(egret || (egret = {}));
