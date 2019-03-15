package module {
	import laya.utils.Browser;

	public class Params {
		
		private var _data:Object;
		
		private static var instance:Params;
		
		public static function getInstance():Params {
			instance ||= new Params();
			return instance;
		}
		
		public function Params() {
			_data = Browser.window["params"];
		}
		
		public function get data():Object {
			return _data;
		}
		
	}
}
