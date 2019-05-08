var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var DLG;
(function (DLG) {
    var DLGConfig = (function () {
        function DLGConfig() {
        }
        return DLGConfig;
    }());
    DLGConfig.grayMatrix = [
        0.3, 0.6, 0, 0, 0,
        0.3, 0.6, 0, 0, 0,
        0.3, 0.6, 0, 0, 0,
        0, 0, 0, 1, 0
    ];
    //灰色特效
    DLGConfig.grayColorFlilter = new egret.ColorMatrixFilter(DLGConfig.grayMatrix);
    DLGConfig.lightmat = [1, 0, 0, 0, 150,
        0, 1, 0, 0, 150,
        0, 0, 1, 0, 150,
        0, 0, 0, 1, 0];
    //白色变亮特效
    DLGConfig.lightColorFlilter = new egret.ColorMatrixFilter(DLGConfig.lightmat);
    DLG.DLGConfig = DLGConfig;
    __reflect(DLGConfig.prototype, "DLG.DLGConfig");
})(DLG || (DLG = {}));
//# sourceMappingURL=DLGConfig.js.map