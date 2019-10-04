package module.ball {

	import laya.filters.GlowFilter;
	import laya.ui.Image;

	import module.item.HpBarView;

	import ui.BallItemUI;

	public class BallItem extends BallItemUI {

		private var _type:int;
		private var _camp:int;
		private var _speed:Number = 0;
		private var _radius:int;
		private var _ballRotation:Number;
		private var hpBar:HpBarView;

		protected var ballImage:Image;
		protected var _speedCost:Number = 0.99;

		public function BallItem() {
			ballRotation = 0;
			this.boxBall.cacheAsBitmap = true;
		}

		public function showHpBar():void {
			hpBar ||= new HpBarView();
			addChild(hpBar);
		}

		public function get ballRotation():Number {
			return _ballRotation;
		}

		public function set ballRotation(value:Number):void {
			_ballRotation = value;
		}

		public function set type(value:int):void {
			_type = value;
			ballImage ||= new Image();
			boxBall.addChild(ballImage);

//			var filter:GlowFilter = new GlowFilter("#333333",5,5,5);
//			ballImage.filters = [filter];
			switch (_type) {
				case 0:
					_radius = 39;
					break;
				case 1:
					_radius = 39;
					break;
				case 2:
					_radius = 39;
					break;
			}
			ballImage.skin = "ball/ball_" + _type + ".png";
			_radius = ballImage.width / 2;
			ballImage.x = -radius;
			ballImage.y = -radius;
			speedSetHandler();
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
			if (value < 0.1) {
				value = 0;
			}
			_speed = Math.min(radius, value); //速度最大不得超过半径
			_speed = value;
			speedSetHandler();
		}

		/**速度被设置后调度*/
		protected function speedSetHandler():void {
		}

		public function get speedCost():Number {
			return _speedCost;
		}

		public function set speedCost(value:Number):void {
			_speedCost = value;
		}

		public function addSpeed(rotation:Number, addSpeed:Number):void {
			var speedTotalX:Number = addSpeed * Math.cos(rotation / 180 * Math.PI) + speed * Math.cos(ballRotation / 180 * Math.PI);
			var speedTotalY:Number = addSpeed * Math.sin(rotation / 180 * Math.PI) + speed * Math.sin(ballRotation / 180 * Math.PI);
			speed = Math.sqrt(speedTotalX * speedTotalX + speedTotalY * speedTotalY);
			ballRotation = Math.atan2(speedTotalY, speedTotalX) * 180 / Math.PI;
		}

	}
}
