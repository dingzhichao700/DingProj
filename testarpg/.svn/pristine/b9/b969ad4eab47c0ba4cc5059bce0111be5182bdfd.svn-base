
module egret {
	/**
	 * globalUpdate <br/>
	 * @author Dempsey <br/>
	 * 2013-8-10
	 */
	/**
	 * 全局更新，调用已注册相关全局更新类型的IWindow的globalUpdate()方法，对象不在舞台时忽略
	 * @param updateTypes:Array 全局更新类型
	 * @param args 传递给globalUpdate()方法的参数列表
	 * @see IWindow.globalUpdate
	 * @see IWindow.addUpdateType
	 */
	export function globalUpdateWindows(updateTypes:Array<any>,...args):void{
		args.unshift(updateTypes);
		ApplicationManager.getInstance().globalUpdate.apply(ApplicationManager.getInstance(),args);
	}
}