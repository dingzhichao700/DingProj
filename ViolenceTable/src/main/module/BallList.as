package main.module {

	public class BallList {

		private static var _ins:BallList;

		public static function get ins():BallList {
			_ins ||= new BallList();
			return _ins;
		}

		public function BallList() {
		}
	}
}
