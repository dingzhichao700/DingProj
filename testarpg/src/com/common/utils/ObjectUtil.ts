
module egret {

	export class ObjectUtil{
		//基本数据类型
		private static BASE_TYPES:Array<any> = ["number","string","boolean"];
		private static BASE_TYPES2:Array<any> = [null,undefined];
		
		/**
		 * 构造函数
		 */
		public constructor(){
			throw new Error("ClassUtil just is a static class.");
		}
		//
		/**
		 * 删除动态对象动态键值 
		 * @param args 参数列表
		 * 
		 */		
		public static deleteObjectKey(...args):void{
			//Object对象在使用for..in..或for each..in..时不能用delete删除键，否则只能遍历一半数量的属性或值
			var array:Array<any> = [];
			var length:number = 0;
			
			var length1:number = args.length;
			for(var i1:number = 0;i1 < length1;i1++){
				var object:any = args[i1];
				if(!object) continue;
				//p在Dictionary中可能为引用对象，不一定为String
				for(var p in object)
					array.push(p);
				
				//不能将键赋值为null或undefined，否则此对象键的数量将增加一倍
				length = array.length;
				
				while(length > 0){
					delete object[array.pop()];
					length --;
				}
			}
		}
		//
		/**
		 * 对象是否为3个基元数据类型之一 
		 * @param target
		 * @return 
		 * 
		 */		
		public static isBaseType(target:any):boolean{
			var length:number = ObjectUtil.BASE_TYPES.length;
			for(var i:number = 0;i < length;i++){
				var v:any = ObjectUtil.BASE_TYPES[i];
				if(typeof(target) == v){
					return true;
				}
			}

			var length1:number = ObjectUtil.BASE_TYPES2.length;
			for(var i1:number = 0;i1 < length1;i1++){
				var v:any = ObjectUtil.BASE_TYPES2[i1];
				if(target == v){
					return true;
				}
			}
			
			return false;
		}
		//
		/**
		 * 获取动态对象是否含有动态键值，
		 * @param object:Object
		 * @return 只要参数存在一个或以上键值则返回true
		 * 
		 */		
		public  static hasKey(object:any):boolean{
			for(var v in object){
				return true;
			}
			
			return false;
		}
		/**
		 * 对象属性浅复制，复杂对象属性直接赋值，未创建新对象
		 * @param source:* 源对象
		 * @param target:* 目标对象
		 */
		public static copyProperties(source:any,target:any):void{
			if(!source || !target) return;

			for(var p in source){
				try{
					target[p] = source[p];
				}catch(e){
					//防止属性只读或只写时抛错
				}
			}
		}
		//
		public static clone(data:Object):Object{
			var result:Object = new Object();
			ObjectUtil.copyProperties(data,result);

			return result;
		}
	}
}