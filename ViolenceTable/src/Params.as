package {

	public class Params {

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
