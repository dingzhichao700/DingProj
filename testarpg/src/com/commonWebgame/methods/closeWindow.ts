
module egret {

	/**
	 * close <br/>
	 * @author Dempsey <br/>
	 * 2013-8-9
	 */
	/**
	 * 将显示对象从舞台上移除，若存在remove()将自动调用此方法 
	 * @param target:* 值为实例时，只对当前实例做处理，值为类时将对此类的所有实例进行处理
	 * @see #open()
	 */
	export function closeWindow(target:any):void{
		if(!target) return;

//        ApplicationManagerUI.getInstance().close(target);
        ApplicationManager.getInstance().close(target);
	}
}