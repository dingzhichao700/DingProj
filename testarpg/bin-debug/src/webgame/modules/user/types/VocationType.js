var egret;
(function (egret) {
    /**
     * 职业枚举
     */
    var VocationType = (function () {
        function VocationType() {
        }
        var __egretProto__ = VocationType.prototype;
        /**
         * 无职业
         */
        VocationType.NONE = 0;
        /**
         * 战士  1
         */
        VocationType.WARRIOR = 1;
        /**
         * 法师  2
         */
        VocationType.MAGE = 2;
        /**
         * 射手  3
         */
        VocationType.BOWMAN = 3;
        VocationType.TYPES = [VocationType.WARRIOR, VocationType.MAGE, VocationType.BOWMAN];
        return VocationType;
    })();
    egret.VocationType = VocationType;
    VocationType.prototype.__class__ = "egret.VocationType";
})(egret || (egret = {}));
//# sourceMappingURL=VocationType.js.map