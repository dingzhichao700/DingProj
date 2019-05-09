enum ArraySort {
    UPPER = 1,  //升序
    LOWER = 2,  //降序
};
module DLG {
	export class Utils {

        private static stringFormatArr(str: string, args: Array<any>): string {
            var new_str = str;
            for (var i in args) {
                var arg = args[i];
                if (new RegExp("(%s|%d)").test(new_str)) {
                    new_str = new_str.replace(RegExp.$1, arg);
                }
            }
            return new_str;
        }

        /**
         * 格式化字符串
         */
        public static stringFormat(str: string, ...args: any[]): string {
            //过滤掉所有
            str = str.replace(/%%/g, "%");
            return Utils.stringFormatArr(str, args);
        }

		/**随机数 */
		public static random(min, max) {
            var rand = Math.floor(Math.random() * (max - min + 1)) + min;
            return rand;
        }

        public static transformResUrl(value:string):string
        {
            if(DEBUG)
            {
                if(value.lastIndexOf("_png") == -1 )
                {
                    throw new Error("ui名字设置有错");
                }
            }
            return value;
        }
		/**获取对象的所有属性的长度 */
		public static objectLenght(elem: Object): number {
            var keys: any[] = Object.keys(elem);
            return keys.length;
        }

        /**把str的数据转成number */
        public static strToNumberArray(value:Array<string>):Array<number>
        {
            var numArr:Array<number> = [];
            var i:number = 0;
            var len:number = value.length;
            for(i = 0 ;i < len ; i ++)
            {
                numArr.push(parseInt( value[i] ));
            }
            return numArr;
        }

		 /**
         * 解析语言包的富文本
         */
        public static parseLanRich(str) {
            var patt1 = new RegExp("(.*)<color=(.*?)>(.*?)<\/color>(.*)");
            var dstText = "";
            var result = null;
            do {
                result = patt1.exec(str);
                if (result) {
                    var color = RegExp.$2;
                    if (color.indexOf("#") == -1) {
                        color = "#" + color.substr(0, 6);
                    } else {
                        color = color.substr(0, 7);
                    }
                    var newStr = RegExp.$1 + "<font color='" + color + "'>" + RegExp.$3 + "</font>" + RegExp.$4;
                    str = newStr;
                }
            } while (result != null);

            return str;
        }

        /**
         * 解析语言包的富文本
         */
        public static parseClickRich(str) {
            var patt1 = new RegExp("(.*)<clk=(.*?)>(.*?)<\/clk>(.*)");
            var dstText = "";
            var result = null;
            do {
                result = patt1.exec(str);
                if (result) {
                    var event = RegExp.$2;
                    var newStr = RegExp.$1 + "<u><a href='event:" + event + "'>" + RegExp.$3 + "</a></u>" + RegExp.$4;
                    str = newStr;
                }
            } while (result != null);

            return str;
        }

        /**计算两点间的距离 */
        public static distance(x1:number,y1:number,x2:number,y2:number):number{
            var x:number = x1 - x2;
            var y:number = y1 - y2;
            return Math.sqrt(x * x + y * y);
        }

        public static onDestroy(obj):void
        {
            while(obj.numChildren > 0)
            {
                var child = obj.removeChildAt(0);
                    
                if(egret.is(child,'DLG.IComponent'))
                {
                    (<CComponent>child).onDestroy();
                }else if(egret.is(child,'eui.Group'))
                {
                    while((<eui.Group>child).numChildren > 0)
                    {
                        var groupChild = (<eui.Group>child).removeChildAt(0);
                        if(egret.is(groupChild,'IComponent'))
                        {
                            (<CComponent>groupChild).onDestroy();
                        }else if(egret.is(groupChild,'eui.Rect'))
                        {
                            
                        }else
                        {
                            sayError('删除了不是CComponent的对象');
                        }
                    }
                }else if(egret.is(groupChild,'eui.Rect'))
                {
                    
                }else
                {
                    
                    sayError('删除了不是CComponent的对象');
                }
            }
        }
        
        public static probabilityIndex(probability:string,split:string = '|',ratio:number = 10000): number
        {
            if (probability == '0' || probability == undefined)
            {
                return -1;
            }    
            let probabilitys: string[] = probability.split(split);
            let r = Math.random();
            let p = r * ratio;
            let start_p: number;
            let end_p:number
            let index = -1;
            let i:number;
            
            start_p = 0
            let len: number = probabilitys.length;
            for( i=0; i < len ; i++)
            {
                if (probabilitys[i] == undefined)
                {
                    end_p = 0
                } else
                {
                    end_p = parseInt(probabilitys[i]);
                }    
                if (end_p == 0)
                {
                    continue;
                }    
                if (p >= start_p && p <= end_p)
                {
                    index = i;
                    break;
                }
                start_p += end_p;
            }
              
            
            probabilitys.length = 0;
            probabilitys = null;
            return index;
        }

	}
}