
module egret {


	/**
	 * update <br/>
	 * @author Dempsey <br/>
	 * 2013-8-10
	 */
	//
	/**
	 * 局部更新，调用目标对象的update()方法 ,对象不在舞台时忽略
	 * @param targets:Array 类对象数组或实例对象数组
	 * @param args 传递给update()方法的参数列表
	 * 
	 */
	export function updateWindows(targets:Array<any>,...args):void{
		args.unshift(targets);
		ApplicationManager.getInstance().update.apply(ApplicationManager.getInstance(),args);
	}
}