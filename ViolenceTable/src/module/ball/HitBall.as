package module.ball {
	import laya.events.Event;
	import laya.media.SoundManager;
	import laya.utils.Handler;
	import laya.utils.HitArea;
	import laya.utils.Tween;

	public class HitBall extends BallItem {

		public function HitBall() {
			boxBottom.alpha = 0.5;
			_speedCost = 0.993; 
		}

		override protected function speedSetHandler():void {
			var hitarea:HitArea = new HitArea();
			hitarea.hit = boxBottom.graphics;
			this.hitArea = hitarea;

			if (speed == 0) {
				showHitAble();
			} else {
				this.boxBottom.graphics.clear();
			}
		}

		public function showHitAble():void {
			this.boxBottom.scale(0.1, 0.1);
			this.boxBottom.graphics.clear();
			this.boxBottom.graphics.drawCircle(0, 0, this.radius + 20, "#ffff00");
			Tween.to(this.boxBottom, {scaleX: 1, scaleY: 1}, 1000, null, Handler.create(this, showComp));
		}

		private function showComp():void {
			this.on(Event.MOUSE_DOWN, this, onDown);
		}
		
		private function onDown():void {
			Tween.to(this.boxBottom, {scaleX: 0.1, scaleY: 0.1}, 1000); //光圈缩小回去
			this.off(Event.MOUSE_DOWN, this, onDown);
			SoundManager.playSound("sound/hit_hold.mp3", 1/*, new Handler(this, onComplete)*/);

			stage.on(Event.MOUSE_UP, this, onUp);
			stage.on(Event.MOUSE_OUT, this, onUp);
		}

		private function onUp(e:Event):void {
			stage.off(Event.MOUSE_OUT, this, onUp);
			stage.off(Event.MOUSE_UP, this, onUp);
			SoundManager.playSound("sound/hit_ball.mp3", 1);
			
			var rotationAdd:Number = Math.atan2(mouseY, mouseX) * 180 / Math.PI;
			this.addSpeed(rotationAdd + 180, 20);
		}

	}
}
