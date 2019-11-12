package main.module.ball {
	import main.base.EnemyBallAiManager;

	public class BallManager {

		private var ballPool:Vector.<BaseBall>;

		private static var _ins:BallManager;

		public static function get ins():BallManager {
			_ins ||= new BallManager();
			return _ins;
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
			var target:BaseBall;
			switch (type) {
				case 0:
					target = new HitBall();
					break;
				case 1:
					var enemy:BaseBall = new BaseBall();
					var ai:EnemyBallAiManager = new EnemyBallAiManager();
					ai.owner = enemy;
					enemy.setAi(ai);
					enemy.setAiActive(true);
					target = enemy;
					break;
			}
			target.type = type;
			return target;
		}

		public function returnBall(item:BaseBall):void {
			ballPool.push(item);
		}

	}
}
