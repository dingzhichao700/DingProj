
module egret {

	export class HtmlUtil{
		//标签数组
		private static _tags:Array<any> = [
			"b",
			"i",
			"u"
		];
		
		private static TAG_A:string = "a";
		private static TAG_B:string = "b";
		private static TAG_I:string = "i";
		private static TAG_U:string = "u";
		private static TAG_HREF:string = "href";
		private static TAG_TARGET:string = "target";
		private static TAG_FONT:string = "font";
		private static TAG_SIZE:string = "size";
		private static TAG_COLOR:string = "color";
		
		/**
		 * 构造函数
		 */
		public constructor(){
		}
		//
		/**
		 * 获取html文本 
		 * @param text:String 原始文本
		 * @param size:int = 12  字体大小
		 * @param color:String = null 文本颜色，为空不设置
		 * @param underline:Boolean = false 是否下划线
		 * @param bold:Boolean = false 是否加粗
		 * @param anchor:String = null 链接地址或事件(http:www.xxx.com | event:xxx)
		 * @param italic:Boolean = false 是否斜体
		 * @return 
		 * 
		 */		
		public static getHtml(text:string,size:number = 12,color:string = null,underline:boolean = false,
									   bold:boolean = false,anchor:string = null,target:string = null,italic:boolean = false):string{
			var values:Array<any> = [bold,italic,underline];
			for(var i:number = 0; i < values.length; i++){
				if(values[i])
					text = HtmlUtil.getTag(HtmlUtil._tags[i]) + text + HtmlUtil.getTag(HtmlUtil._tags[i],false);
			}
			
			if(anchor)
				text = HtmlUtil.setAnchor(text,anchor,target);
			
			return HtmlUtil.setFont(text,size,color);
		}
		//
		/**
		 * 文本添加或清除html链接标签 
		 * @param text:String 原始文本
		 * @param anchor:String 链接地址或事件(event:xxx)，清除标签时设置为 null
		 * @param target:String = "_blank" 打开窗口类型，清除标签时设置为 null
		 * @param added:Boolean = true 添加还是清除标签
		 * @return 
		 * 
		 */		
		public static setAnchor(text:string,anchor:string,target:string = "_blank",added:boolean = true):string{
			if(added)
				return HtmlUtil.getTag(HtmlUtil.TAG_A,true,[HtmlUtil.TAG_HREF,HtmlUtil.TAG_TARGET],[anchor,target]) + text + HtmlUtil.getTag(HtmlUtil.TAG_A,false);
			
			return HtmlUtil.clearTag(text,HtmlUtil.TAG_A);
		}
		//
		/**
		 * 文本添加或清除html粗体标签  
		 * @param text:String 原始文本
		 * @param added:Boolean = true 添加还是清除标签
		 * @return 
		 * 
		 */
		public static setBold(text:string,added:boolean = true):string{
			if(added)
				return HtmlUtil.getTag(HtmlUtil.TAG_B) + text + HtmlUtil.getTag(HtmlUtil.TAG_B,false);
			
			return HtmlUtil.clearTag(text,HtmlUtil.TAG_B);
		}
		//
		/**
		 * 文本添加或清除html斜体标签  
		 * @param text:String 原始文本
		 * @param added:Boolean = true 添加还是清除标签
		 * @return 
		 * 
		 */		
		public static setItalic(text:string,added:boolean = true):string{
			if(added)
				return HtmlUtil.getTag(HtmlUtil.TAG_I) + text + HtmlUtil.getTag(HtmlUtil.TAG_I,false);
			
			return HtmlUtil.clearTag(text,HtmlUtil.TAG_I);
		}
		//
		/**
		 * 文本添加或清除html下划线标签  
		 * @param text:String 原始文本
		 * @param added:Boolean = true 添加还是清除标签
		 * @return 
		 * 
		 */		
		public static setUnderline(text:string,added:boolean = true):string{
			if(added)
				return HtmlUtil.getTag(HtmlUtil.TAG_U) + text + HtmlUtil.getTag(HtmlUtil.TAG_U,false);
			
			return HtmlUtil.clearTag(text,HtmlUtil.TAG_U);
		}
		//
		/**
		 * 文本添加或清除html字体标签  
		 * @param text:String 原始文本
		 * @param size:int = 12 字体大小
		 * @parem color:String = null 颜色
		 * @param added:Boolean = true 添加还是清除标签
		 * @return 
		 * 
		 */		
		public static setFont(text:string,size:number = 12,color:string = null,added:boolean = true):string{
			if(added){
				if(color)
					return HtmlUtil.getTag(HtmlUtil.TAG_FONT,true,[HtmlUtil.TAG_SIZE,HtmlUtil.TAG_COLOR],[size,color]) + text + HtmlUtil.getTag(HtmlUtil.TAG_FONT,false);
				else
					return HtmlUtil.getTag(HtmlUtil.TAG_FONT,true,[HtmlUtil.TAG_SIZE],[size]) + text + HtmlUtil.getTag(HtmlUtil.TAG_FONT,false);
			}
			
			return HtmlUtil.clearTag(text,HtmlUtil.TAG_FONT);
		}
		//
		/**
		 * 清除文本中的所有指定html标签 
		 * @param text:String html文本
		 * @param name:String 标签名，如:"a":表示链接标签
		 * @return 
		 * 
		 */		
		public static clearTag(text:string,name:string):string{
			var sReg:RegExp = new RegExp("<" + name + "[^<]*" + ">","gis");
			var eReg:RegExp = new RegExp("</" + name + ">","gi");
			
			text = text.replace(sReg,"");
			text = text.replace(eReg,"");
			
			return text;
		}
		//
		/**
		 * 获取标签html对 
		 * @param name:String 标签名，如:"a"表示链接标签
		 * @param startOrEnd:Boolean = true 开始还结束标签
		 * @param attributeNames:Array = null 属性名称数组，如["href"]
		 * @param attributeValues:Array = null 属性值数组，如["event:xxx"]或["http://www.xxx.com"]
		 * @return 以上示例将返回:&lt;a href='event:xxx'&gt;或&lt;a href='http://www.xxx.com'&gt;
		 * 
		 */		
		public static getTag(name:string,startOrEnd:boolean = true,attributeNames:Array<any> = null,attributeValues:Array<any> = null):string{
			//<a href='event:e'>或</a>
			var slash:string = "";
			var attribute:string = "";
			if(startOrEnd){
				if(attributeNames && attributeValues)
				for(var i:number = 0; i < attributeNames.length; i++){
					attribute += " " + attributeNames[i] + "='" + attributeValues[i] + "'";
				}
			}else{
				slash = "/";
			}
			
			return "<" + slash + name + attribute + ">";
		}
	}
}