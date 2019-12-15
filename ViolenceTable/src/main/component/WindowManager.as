package main.component {
	import avmplus.getQualifiedClassName;
	
	import laya.display.Sprite;
	
	import main.module.scene.LayerManager;
	import main.utils.Dispatcher;
	import main.utils.EventEnum;

	/**
	 * 窗口管理
	 * @author dingzhichao
	 *
	 */
	public class WindowManager {

		private var windowList:Array;

		private static var _ins:WindowManager;

		public static function get ins():WindowManager {
			_ins ||= new WindowManager();
			return _ins;
		}

		public function WindowManager() {
			windowList ||= [];
		}

		public function openWindow(win:BaseBox):void {
			if (windowList.indexOf(win) >= 0) {
				console.log("警告，尝试打开已打开的窗口：" + win);
				return;
			}
			var parent:Sprite = LayerManager.ins.getLayer(win.layer);
			parent.addChild(win);
			win.isOpen = true;
			Dispatcher.dispatch(EventEnum.WINDOW_OPEN);
		}

		public function closeWindow(win:BaseBox):void {
			if (windowList.indexOf(win) >= 0) {
				console.log("警告，尝试关闭未打开的窗口：" + win);
				return;
			}
			var parent:Sprite = LayerManager.ins.getLayer(win.layer);
			parent.removeChild(win);
			win.isOpen = false;
			Dispatcher.dispatch(EventEnum.WINDOW_CLOSE);
		}

	}
}
