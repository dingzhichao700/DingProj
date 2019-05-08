var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var DLG;
(function (DLG) {
    /**
     *
     * @author
     *
     */
    var LanguageManager = (function () {
        function LanguageManager() {
            this.m_pLanguage = {};
        }
        LanguageManager.prototype.getLanguage = function (id) {
            var modle = (id + "").substring(0, 3);
            var key = (id + "").substring(3, 6);
            var obj = this.m_pLanguage[modle];
            var str;
            if (obj) {
                str = obj[key];
            }
            if (!str)
                return '##Not Exist##';
            str = str.replace(/c@(.+)@/g, "color=\"$1\"");
            str = str.replace(/s@(.+)@/g, "size=\"$1\"");
            str = str.replace(/f@(.+)@/g, "fontFamily=\"$1\"");
            str = str.replace(/</g, "<font ");
            str = str.replace(/\//g, "</font");
            return str;
        };
        //格式化语言包
        LanguageManager.prototype.getLanguageFormat = function (id) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var str = this.getLanguage(id);
            if (str == '##Not Exist##')
                return str;
            str = str.replace(/%%/g, "%");
            for (var i in args) {
                var arg = args[i];
                if (LanguageManager.SD_REG.test(str)) {
                    str = str.replace(RegExp.$1, arg);
                }
            }
            return str;
        };
        // public loadConfig(url:string, callback: Function, obj: any) {
        //     this.m_iLoadCount = 0;
        //     this.m_pLoadedCallback = callback;
        //     this.m_pCallInstance = obj;
        //     DLG.Utils.getZipResByUrl(url, function (files) {
        //         if (files) {
        //             for (var i in files) {
        //                 var data = JSON.parse(files[i].asText());
        //                 for (var j = 0; j < data.length; j++) {
        //                     var id = data[j][0] + '';
        //                     var modle = id.substring(0,3);
        //                     var key = id.substring(3,6);
        //                     this.m_pLanguage[modle][key] = data[j][2];
        //                 }
        //             }
        //             this.onLoaded();
        //         }
        //     }, this, RES.ResourceItem.TYPE_BIN);
        // }
        LanguageManager.prototype.initData = function (data) {
            // var data = JSON.parse(str);
            for (var j = 2; j < data.length; j++) {
                var id = data[j][0] + '';
                var modle = id.substring(0, 3);
                var key = id.substring(3, 6);
                if (this.m_pLanguage.hasOwnProperty(modle) == false) {
                    this.m_pLanguage[modle] = {};
                }
                this.m_pLanguage[modle][key] = data[j][1];
            }
        };
        LanguageManager.prototype.onLoaded = function () {
            this.m_iLoadCount += 1;
            if (this.m_iLoadCount == 2) {
                this.m_pLoadedCallback.call(this.m_pCallInstance);
                this.m_pLoadedCallback = null;
                this.m_pCallInstance = null;
            }
        };
        return LanguageManager;
    }());
    LanguageManager.REPLACE_REG = /{[a-zA-Z0-9]+}/;
    LanguageManager.SD_REG = new RegExp("(%s|%d)");
    DLG.LanguageManager = LanguageManager;
    __reflect(LanguageManager.prototype, "DLG.LanguageManager");
})(DLG || (DLG = {}));
//# sourceMappingURL=LanguageManager.js.map