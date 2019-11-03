package module.ball {
	import base.ai.EnemyBallAiManager;
	import base.ai.action.BaseEnemyMoveAction;

	public class BallManager {

		private var ballPool:Vector.<BaseBall>;

		private static var instance:BallManager;

		public static function getInstance():BallManager {
			instance ||= new BallManager();
			return instance;
		}

		public function BallManager() {
			ballPool = new Vector.<BaseBall>;
		}

		public function getBall(type:int):BaseBall {
			if (ballPool.length > 0) {
				for (var i:int = 0; i < ballPool.length; i++) {
					if ((ballPool[i] as BaseBall).type == type) {
						return ballPool.slice(i, 1) as BaseBall;
					}
				}
			}
			switch (type) {
				case 0:
					return new HitBall();
					break;
				case 1:
					var enemy:BaseBall = new BaseBall();
					var ai:EnemyBallAiManager = new EnemyBallAiManager();
					ai.owner = enemy;
					enemy.setAi(ai);
					enemy.setAiActive(true);
					break;
			}
			return null;
		}

		public function returnBall(item:BaseBall):void {
			ballPool.push(item);
		}

	}
}
