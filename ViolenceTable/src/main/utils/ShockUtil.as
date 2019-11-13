package main.utils {
	import laya.display.Sprite;
	import laya.utils.Browser;
	import laya.utils.Handler;
	
	public class ShockUtil {
		
		private static var infoDic:Object = {};
		
		public function ShockUtil() {
		}
		
		/**
		 * 震动
		 * @param view 显示对象
		 * @param time 时间（毫秒）
		 * @param range 震动范围（像素）
		 * @param speed 速度（大于0）
		 * @param dir 方向（0横纵同时，1只横向，2只纵向）
		 * @param handler 回调
		 *
		 */
		public static function play(view:Sprite, time:int, range:int, speed:int = 0, dir:int = 0, handler:Handler = null):void {
			if (infoDic[view]) {
				stop(view);
			}
			var beginX:int = view.x;
			var beginY:int = view.y;
			infoDic[view] = [beginX, beginY, time, Browser.now(), range, speed, dir, handler];
			Laya.timer.loop(1, view, doShock, [view]); //每1毫秒执行一次
		}
		
		private static function doShock(view:Sprite):void {
			var arr:Array = infoDic[view];
			var maxTime:int = arr[2];
			var passTime:int = Browser.now() - arr[3];
			if (passTime >= maxTime) {
				stop(view);
				return;
			}
			var beginX:int = arr[0];
			var beginY:int = arr[1];
			var range:int = arr[4];
			var speed:int = arr[5];
			var dir:int = arr[6];
			if (dir == 0 || dir == 1) {
				var addX:Number = Math.sin(passTime * speed / 100) * range;
				view.x = beginX + addX;
			}
			if (dir == 0 || dir == 2) {
				var addY:Number = Math.cos(passTime * speed / 100) * range;
				view.y = beginY + addY;
			}
		}
		
		public static function stop(view:Sprite):void {
			if (infoDic[view]) {
				Laya.timer.clearAll(view);
				var arr:Array = infoDic[view];
				var beginX:int = arr[0];
				var beginY:int = arr[1];
				view.x = beginX;
				view.y = beginY;
				var handler:Handler = arr[7];
				if (handler) {
					handler.run();
				}
				delete infoDic[view];
			}
		}
		
	}
}
