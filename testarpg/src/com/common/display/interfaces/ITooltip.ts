
module egret {

	export interface ITooltip{
		/**
		 * 设置工具提示，若设置 tooltip = this 或 tooltip = 实例本身 时，显示的工具提示使用tooltip属性返回的结果，
		 * 重写 get tooltip() 方法即可动态生成工具提示，如: 随等级变化的tooltip
		 * @param tooltip:* 提示数据，字符串(支持html文本)或显示对象，为null时移除工具提示
		 * 
		 */
		tooltip:any;
	}
}