package main {

	public class Params {

		public static const GAME_WIDTH:int = 1024;
		public static const GAME_HEIGHT:int = 576;
		/**时间倍率*/
		public var timeScale:Number = 1;

		private static var _ins:Params;

		public static function get ins():Params {
			_ins ||= new Params();
			return _ins;
		}

		public function Params() {

		}

	}
}
