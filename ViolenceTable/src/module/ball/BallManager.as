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

		public function getBall(type:int):BallItem {
			if (ballPool.length > 0) {
				for (var i:int = 0; i < ballPool.length; i++) {
					if ((ballPool[i] as BallItem).type == type) {
						return ballPool.slice(i, 1) as BallItem;
					}
				}
			}
			switch (type) {
				case 0:
					return new HitBall();
					break;
				case 1:
					return new BallItem();
					break;
			}
			return null;
		}

		public function returnBall(item:BallItem):void {
			ballPool.push(item);
		}

	}
}
