package module.ball {
	import laya.utils.Tween;

	import ui.BallItemUI;

	public class BallItem extends BallItemUI {

		private var _type:int;
		private var _camp:int;
		private var _speed:Number = 0;
		private var _radius:int;
		private var _ballRotation:Number;

		public function BallItem() {
			ballRotation = 0;
		}

		public function get ballRotation():Number {
			return _ballRotation;
		}

		public function set ballRotation(value:Number):void {
			_ballRotation = value;
		}

		public function set type(value:int):void {
			_type = value;
			boxBottom.graphics.clear();
			boxBall.graphics.clear();
			switch (_type) {
				case 0:
					_radius = 20;
					boxBall.graphics.drawCircle(0, 0, _radius, "#ffffff");
					break;
				case 1:
					_radius = 20;
					boxBall.graphics.drawCircle(0, 0, _radius, "#e06444");
					break;
			}
		}

		public function get type():int {
			return _type;
		}

		/**球碰撞半径*/
		public function get radius():int {
			return _radius;
		}

		public function set camp(value:int):void {
			_camp = value;
		}

		public function get camp():int {
			return _camp;
		}

		public function get speed():Number {
			return _speed;
		}

		public function set speed(value:Number):void {
			_speed = value;
		}

		public function showHitAble():void {
			boxBottom.graphics.clear();
			boxBottom.scale(0.1, 0.1);
			boxBottom.graphics.drawCircle(0, 0, 40, "#ffff00");
			Tween.to(boxBottom, {scaleX: 1, scaleY: 1}, 1200);
		}

	}
}
