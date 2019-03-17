package module.ball {

	public class BallManager {

		private var ballPool:Vector.<BallItem>;

		private static var instance:BallManager;

		public static function getInstance():BallManager {
			instance ||= new BallManager();
			return instance;
		}

		public function BallManager() {
			ballPool = new Vector.<BallItem>;
		}

		public function getBall():BallItem {
			if (ballPool.length > 0) {
				return ballPool.pop();
			}
			return new BallItem();
		}

		public function returnBall(item:BallItem):void {
			ballPool.push(item);
		}

	}
}
