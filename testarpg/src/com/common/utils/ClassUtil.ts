
module egret {

	export class ClassUtil{
		/**
		 * 构造函数
		 */
		public constructor(){
			throw new Error("ClassUtil just is a static class.");
		}
		//
		/**
		 * 获取类名字符串，无包路径 
		 * @param object:* 类或实例
		 * @return 
		 * 
		 */		
		public static getClassName(object:any):string{
			//如果是类(函数)，则直接取name属性
            if(typeof (object) == "function")
                return object["name"];

			return object.constructor["name"];
		}
	}
}