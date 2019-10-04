package module.ball {
	import laya.events.Event;
	import laya.maths.Point;
	import laya.media.SoundManager;
	import laya.renders.Render;
	import laya.renders.RenderSprite;
	import laya.ui.Box;
	import laya.ui.Image;
	import laya.utils.Handler;
	import laya.utils.HitArea;
	import laya.utils.Tween;
	import laya.webgl.WebGLContext;
	import laya.webgl.resource.RenderTarget2D;
	import laya.webgl.utils.RenderState2D;

	public class HitBall extends BallItem {

		private var phantom:Box;
		private var renderTarget:RenderTarget2D;
		private var wing_left:Image;
		private var wing_right:Image;

		public function HitBall() {
			boxBottom.alpha = 0.9;
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
			this.boxBottom.alpha = 1;
			this.boxBottom.scale(0.1, 0.1);
			this.boxBottom.graphics.clear();
			this.boxBottom.graphics.drawCircle(0, 0, this.radius + 15, "#ffff00");
			Tween.to(this.boxBottom, {scaleX: 1.5, scaleY: 1.5, alpha: 0}, 1000, null, Handler.create(this, showComp));
		}

		private function showComp():void {
			this.boxBottom.scale(1, 1);
			this.on(Event.MOUSE_DOWN, this, onDown);
		}

		private var donwPos:Point;
		private var downImgPos:Point;

		private function onDown():void {
			this.off(Event.MOUSE_DOWN, this, onDown);
			donwPos = new Point(mouseX, mouseY);
			downImgPos = new Point(boxBall.x, boxBall.y);

			Tween.to(this.boxBottom, {scaleX: 0.1, scaleY: 0.1}, 1000); //光圈缩小回去
			SoundManager.playSound("sound/hit_hold.mp3", 1 /*, new Handler(this, onComplete)*/);

			stage.on(Event.MOUSE_MOVE, this, onMove);
			stage.on(Event.MOUSE_UP, this, onUp);
			stage.on(Event.MOUSE_OUT, this, onUp);

			//画拖动残影
			var stLayer:Image = ballImage as Image;
			renderTarget = RenderTarget2D.create(Math.floor(this.radius * 2), Math.floor(this.radius * 2), WebGLContext.RGBA, WebGLContext.UNSIGNED_BYTE, 0, false);
			renderTarget.start();
			renderTarget.clear(0, 0, 0, 0);
			Render.context.clear();
			renderTarget.sourceWidth = renderTarget.width;
			renderTarget.sourceHeight = renderTarget.height;

			RenderSprite.renders[stLayer._renderType]._fun(stLayer, Render.context, 0, RenderState2D.height - Math.floor(stLayer.height));
			RenderSprite.renders[stLayer._renderType]._fun(stLayer, Render.context, 0, RenderState2D.height - Math.floor(stLayer.height));
			Render.context.flush();
			renderTarget.end();
			renderTarget.sourceWidth = renderTarget.width;
			renderTarget.sourceHeight = renderTarget.height;

			phantom ||= new Box();
			phantom.graphics.clear();
			phantom.graphics.drawTexture(renderTarget, 0, 0, renderTarget.width, renderTarget.height);
			phantom.alpha = 0.7;
			phantom.x = boxBall.x - radius;
			phantom.y = boxBall.y - radius;
			boxPhantom.addChild(phantom);
		}

		private var pull_dis:int = 100;

		private function onMove(e:Event):void {
			var posX:int = (mouseX - donwPos.x);
			var posY:int = (mouseY - donwPos.y);
			var targetDis:int = Math.sqrt(posX * posX + posY * posY);
			var rotation:int = Math.atan2(posY, posX);
			if (targetDis <= pull_dis) {
				phantom.x = downImgPos.x + (mouseX - donwPos.x) - radius;
				phantom.y = downImgPos.y + (mouseY - donwPos.y) - radius;
			} else {
				var targetX:int = Math.cos(rotation) * pull_dis;
				var targetY:int = Math.sin(rotation) * pull_dis;
				phantom.x = downImgPos.x + targetX - radius;
				phantom.y = downImgPos.y + targetY - radius;
			}

			/**弹簧带单侧张角角度，0-60度，和拖动距离与pull_dis的比值相关*/
			var pullAngle:int = targetDis / pull_dis * 60;
			pullAngle = Math.min(pullAngle, 60);

			//处理弹簧带
			/*左边*/
			var leftAngle:Number = rotation + pullAngle / 180 * Math.PI;
			wing_left ||= new Image();
			wing_left.skin = "comp/pull_bar.png";
			wing_left.pivotY = 8;
			wing_left.x = phantom.x + radius + Math.cos(leftAngle) * radius;
			wing_left.y = phantom.y + radius + Math.sin(leftAngle) * radius;
			wing_left.rotation = leftAngle * 180 / Math.PI + 90;
			boxPhantom.addChild(wing_left);
			/*右边*/
			var rightAngle:Number = rotation - pullAngle / 180 * Math.PI;
			wing_right ||= new Image();
			wing_right.skin = "comp/pull_bar.png";
			wing_right.x = phantom.x + radius + Math.cos(rightAngle) * radius;
			wing_right.y = phantom.y + radius + Math.sin(rightAngle) * radius;
			wing_right.rotation = rightAngle * 180 / Math.PI - 90;
			boxPhantom.addChild(wing_right);
		}

		private function onUp(e:Event):void {
			if (phantom) {
				if (phantom.parent) {
					phantom.removeSelf();
				}
				phantom = null;
			}
			if (renderTarget) {
				renderTarget.destroy(true);
				renderTarget = null;
			}
			stage.off(Event.MOUSE_MOVE, this, onMove);
			stage.off(Event.MOUSE_OUT, this, onUp);
			stage.off(Event.MOUSE_UP, this, onUp);
			SoundManager.playSound("sound/hit_ball.mp3", 1);

//			var rotationAdd:Number = Math.atan2(mouseY, mouseX) * 180 / Math.PI;
//			this.addSpeed(rotationAdd + 180, 20);
			speed = 0; //test
		}

	}
}
