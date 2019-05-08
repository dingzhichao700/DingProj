module DLG {
	/**
	 *
	 * @author 
	 *
	 */
    export class LanguageManager {

        private m_pLanguage:Object
        private m_iLoadCount: number;
        private m_pLoadedCallback: Function;
        private m_pCallInstance: any;
        
        private static REPLACE_REG: RegExp = /{[a-zA-Z0-9]+}/;
        private static SD_REG: RegExp = new RegExp("(%s|%d)");


        public constructor() {
           this.m_pLanguage = {};
        }

        public getLanguage( id: string|number): string {
            var modle = (id + "").substring(0,3);
            var key = (id + "").substring(3,6);
            var obj:Object = this.m_pLanguage[modle];
            var str:string
            if(obj)
            {
                str = obj[key];
            }
            if (!str) return '##Not Exist##';
            str = str.replace(/c@(.+)@/g, "color=\"$1\"");
            str = str.replace(/s@(.+)@/g, "size=\"$1\"")
            str = str.replace(/f@(.+)@/g, "fontFamily=\"$1\"")
            str = str.replace(/</g, "<font ")
            str = str.replace(/\//g, "</font")
            return str;
        }
        //格式化语言包
        public getLanguageFormat(id: string|number, ...args: any[]) {

            var str: string = this.getLanguage(id);
            if (str == '##Not Exist##') return str;
            str = str.replace(/%%/g, "%");
            for (var i in args) {
                var arg = args[i];
                if (LanguageManager.SD_REG.test(str)) {
                    str = str.replace(RegExp.$1, arg);
                }
            }
            return str;
        }

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
        public initData(data:Array<any>)
        {
            // var data = JSON.parse(str);
            for (var j = 2; j < data.length; j++) {
                var id = data[j][0] + '';
                var modle = id.substring(0,3);
                var key = id.substring(3,6);
                if(this.m_pLanguage.hasOwnProperty(modle) == false)
                {
                    this.m_pLanguage[modle] = {};
                }
                this.m_pLanguage[modle][key] = data[j][1];
            }
        }

        private onLoaded() {
            this.m_iLoadCount += 1;
            if (this.m_iLoadCount == 2) {
                this.m_pLoadedCallback.call(this.m_pCallInstance);
                this.                       m_pLoadedCallback = null;
                this.m_pCallInstance = null;
            }
        }
        
    }

}
