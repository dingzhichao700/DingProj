var egret;
(function (egret) {
    var ExtensionType = (function () {
        function ExtensionType() {
        }
        var __egretProto__ = ExtensionType.prototype;
        /**
         * .json 扩展名后缀
         */
        ExtensionType.JSON = ".json";
        /**
         * .xml 扩展名后缀
         */
        ExtensionType.XML = ".xml";
        /**
         * .txt 扩展名后缀
         */
        ExtensionType.TXT = ".txt";
        /**
         * .jpg 扩展名后缀
         */
        ExtensionType.JPG = ".jpg";
        /**
         * .png 扩展名后缀
         */
        ExtensionType.PNG = ".png";
        /**
         * .swf 扩展名后缀
         */
        ExtensionType.SWF = ".swf";
        /**
         * .edf 扩展名后缀
         */
        ExtensionType.EDF = ".edf";
        /**
         * .modf 扩展名后缀
         */
        ExtensionType.MVDF = ".mvdf";
        return ExtensionType;
    })();
    egret.ExtensionType = ExtensionType;
    ExtensionType.prototype.__class__ = "egret.ExtensionType";
})(egret || (egret = {}));
