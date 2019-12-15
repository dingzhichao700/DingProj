package main.utils {

	public class Dispatcher {

		private static var eventDic:Object;

		public function Dispatcher() {
		}

		public static function on(eventName:String, func:Function):void {
			eventDic ||= new Object();
			if (!eventDic[eventName]) {
				var arr:Array = [];
				arr.push(func);
				eventDic[eventName] = arr;
			} else {
				eventDic[eventName].push(func);
			}
		}

		public static function dispatch(eventName:String, ... params):void {
			if (eventDic && eventDic[eventName]) {
				var arr:Array = eventDic[eventName];
				for (var i:int = 0; i < arr.length; i++) {
					arr[i].apply(null, params);
				}
			}
		}

		public static function off(eventName:String, func:Function):void {
			if (eventDic && eventDic[eventName]) {
				var arr:Array = eventDic[eventName];
				for (var i:int = 0; i < arr.length; i++) {
					if (arr[i] == func) {
						arr.splice(i, 1);
					}
				}
			}
		}

	}
}
