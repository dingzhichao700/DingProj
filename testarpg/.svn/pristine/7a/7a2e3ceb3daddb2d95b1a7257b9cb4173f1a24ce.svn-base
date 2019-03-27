
module egret {

	export class StringUtil{
		/**
		 * 构造函数
		 */
		public constructor(){
			throw new Error("StringUtil just is a static class.");
		}
		//
		/**
		 * 将字符串用指定符号括起来 
		 * @param str:String
		 * @param sign:String
		 * @return 字符串
		 * @example 示例
		 * <p>
		 * <listing>
		 * var result:String=StringUtil.getSignString("说明","()");
		 * trace(result);//(说明)
		 * </listing>
		 * </p>
		 * 
		 */		
		public static getSignString(str:string,sign:string):string{
			return sign.charAt(0)+str+sign.charAt(1);
		}
		//
		/**
		 * 用参数字段替换文本中的对应标记值 
		 * @param content:String 文本值
		 * @param param:Object 参数，必须为动态对象
		 * @param colorParam:Object = null 颜色动态对象
		 * @param size:int = 12 替换的文本大小
		 * @return 替换后的文本
		 * 
		 * <p>
		 * <listing>
		 * var content:String = "达到$level$级即可领取$count$个金币";
		 * var param:Object = {level:10,count:6};
		 * var colorParam:Objbect = {level:"#ff0000",count:"#ff"};
		 * trace(StringUtil.replace(content,param));
		 * </listing>
		 * </p>
		 * 
		 */		
		public static replace(content:string,param:any,colorParam:any = null,size:number = 12):string{
			var reg:RegExp = null;
			var temp:string = null;
			
			for(var p in param){
				reg = new RegExp("\\$" + p + "\\$","gi");
				temp = param[p];
				//if(colorParam)
				//	temp = HtmlUtil.getHtml(temp,size,colorParam[p]);
				
				content = content.replace(reg,temp);
			}
			
			return content;
		}
		/**
		 * 去掉文本左右空白 
		 * @param input
		 * @return 
		 * 
		 */		
		public static trim(input:string):string{
			return StringUtil.ltrim(StringUtil.rtrim(input));
		}
		/**
		 * 去掉文本左边空白部分 
		 * @param input
		 * @return 
		 * 
		 */		
		public static ltrim(input:string):string{
			var size:number = input.length;
			for(var i:number = 0; i < size; i++){
				if(input.charCodeAt(i) > 32){
					return input.substring(i);
				}
			}
			return "";
		}
		/**
		 * 去掉文本右边空白部分 
		 * @param input
		 * @return 
		 * 
		 */		
		public static rtrim(input:string):string{
			var size:number = input.length - 1;
			for(var i:number = size; i >= 0; i--){
				if(input.charCodeAt(i) > 32){
					return input.substring(0, i + 1);
				}
			}
			return "";
		}
		//
		///**
		// * 解析 Unicode 字符串为实际字符串
		// * @param content:String Unicode 字符串
		// * @return
		// *
		// */
		//public static parseUnicode(content:string):string{
		//	var bytes:ByteArray = new ByteArray();
		//	bytes.endian = Endian.LITTLE_ENDIAN;
		//
		//	var length:number = content.length;
		//	for(var i:number = 0; i < length; i++){
		//		bytes.writeShort(content.charCodeAt(i));
		//	}
		//
		//	var result:string = "";
		//	var charset:string = "unicode";
		//
		//	bytes.position = 0;
		//	length = bytes.length / 2;
		//
		//	for(i = 0; i < length; i++){
		//		result += bytes.readMultiByte(2,charset);
		//	}
		//
		//	//内存优化
		//	bytes.clear();
		//
		//	return result;
		//}
	}
}