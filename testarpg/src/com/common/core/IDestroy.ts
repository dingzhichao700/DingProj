
module egret {

	export interface IDestroy{
		/**
		 * 销毁对象，删除所有侦听器，释放内存资源
		 */	
		destroy():void;
	}
}