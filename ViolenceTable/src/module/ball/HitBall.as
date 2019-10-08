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
		private var wing_center:Image;

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
			phantom.alpha = 0;
			phantom.graphics.clear();
			phantom.graphics.drawTexture(renderTarget, 0, 0, renderTarget.width, renderTarget.height);
			phantom.x = boxBall.x - radius;
			phantom.y = boxBall.y - radius;
		}

		/**拖动最大距离*/
		private var pull_max_dis:int = 200;
		/**拖动最大单侧张角弧度*/
		private var pull_max_angel:int = 30;

		private function onMove(e:Event):void {
			var posX:int = (mouseX - donwPos.x);
			var posY:int = (mouseY - donwPos.y);
			/**拖动的实际距离*/
			var pullDis:int = Math.sqrt(posX * posX + posY * posY);
			/**拖动的弧度*/
			var pullRadian:int = Math.atan2(posY, posX);
			/**衰減后，幻影实际移出的距离*/
			var phantomDis:int = pullDis * 2 / 3;
			if (phantomDis < pull_max_dis) { //小于极限值
				phantom.alpha = phantomDis * 5 / pull_max_dis;
				phantom.x = downImgPos.x + phantomDis * Math.cos(pullRadian) - radius;
				phantom.y = downImgPos.y + phantomDis * Math.sin(pullRadian) - radius;
			} else {
				phantom.alpha = 1;
				var targetX:int = Math.cos(pullRadian) * pull_max_dis;
				var targetY:int = Math.sin(pullRadian) * pull_max_dis;
				phantom.x = downImgPos.x + targetX - radius;
				phantom.y = downImgPos.y + targetY - radius;
			}
			var ballAlpha:Number;
			if (pullDis < radius * 2) { //一倍直径以内完全不透明
				ballAlpha = 1;
			} else {
				ballAlpha = Math.max(-0.7 / radius * pullDis + 2.4, 0.3);
			}
			boxBall.alpha = ballAlpha;
			updateWing();
		}

		private function updateWing():void {
			var disX:int = phantom.x - ballImage.x;
			var disY:int = phantom.y - ballImage.y;
			var phantomDis:int = Math.sqrt(disX * disX + disY * disY);
			var phantomRadian:int = Math.atan2(disY, disX);
			/**弹簧带单侧张角角度，0-60度，和拖动距离与pull_dis的比值相关*/
			var wingRotation:int = phantomDis / pull_max_dis * pull_max_angel;
			wingRotation = Math.min(wingRotation, pull_max_angel);

			//处理弹簧带
			/*左边*/
			var leftAngle:Number = phantomRadian + wingRotation / 180 * Math.PI;
			wing_left ||= new Image();
			wing_left.skin = "comp/pull_bar.png";
			wing_left.pivotY = wing_left.height;
			wing_left.x = phantom.x + radius + Math.cos(leftAngle) * (radius - 2);
			wing_left.y = phantom.y + radius + Math.sin(leftAngle) * (radius - 2);
			wing_left.rotation = leftAngle * 180 / Math.PI + 90;
			boxPhantom.addChild(wing_left);
			/*右边*/
			var rightAngle:Number = phantomRadian - wingRotation / 180 * Math.PI;
			wing_right ||= new Image();
			wing_right.skin = "comp/pull_bar.png";
			wing_right.x = phantom.x + radius + Math.cos(rightAngle) * (radius - 2);
			wing_right.y = phantom.y + radius + Math.sin(rightAngle) * (radius - 2);
			wing_right.rotation = rightAngle * 180 / Math.PI - 90;
			boxPhantom.addChild(wing_right);
			/*中间*/
			var pullRotation:int = phantomRadian * 180 / Math.PI;
			wing_center ||= new Image();
			wing_center.graphics.clear();
			wing_center.graphics.drawPie(phantom.x + radius, phantom.y + radius, radius + wing_left.height - 2, pullRotation - wingRotation, pullRotation + wingRotation, "#d1aa26");
			boxPhantom.addChild(wing_center);

			boxPhantom.addChild(phantom);

			wing_center.alpha = wing_left.alpha = wing_right.alpha = (phantomDis - pull_max_dis / 5) / pull_max_dis;
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
