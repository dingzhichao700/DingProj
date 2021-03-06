package view {

	import laya.debug.DebugPanel;
	import laya.display.Sprite;
	import laya.events.Event;
	import laya.maths.Point;
	import laya.renders.Render;
	import laya.renders.RenderSprite;
	import laya.ui.Box;
	import laya.utils.Handler;
	import laya.utils.Tween;
	import laya.webgl.WebGLContext;
	import laya.webgl.resource.RenderTarget2D;
	import laya.webgl.utils.RenderState2D;

	import ui.TestPageUI;

	public class TestView extends TestPageUI {

		private var startPos:Point;
		private var mousePos:Point;

		private var listPhantom:Array;

		public function TestView() {
			DebugPanel.init();
			boxCon.on(Event.MOUSE_DOWN, this, onStart);
			Laya.timer.loop(50, this, drawPhantom);
		}

		private function onStart():void {
			startPos = new Point(boxCon.x, boxCon.y);
			mousePos = new Point(mouseX, mouseY);
			stage.on(Event.MOUSE_MOVE, this, onMove);
			stage.on(Event.MOUSE_UP, this, onStop);
			stage.on(Event.MOUSE_OUT, this, onStop);
		}

		private function onMove():void {
			boxCon.pos(startPos.x + (mouseX - mousePos.x), startPos.y + (mouseY - mousePos.y));
		}

		private function onStop():void {
			stage.off(Event.MOUSE_MOVE, this, onMove);
		}

		private var renderTarget:RenderTarget2D;

		private function drawPhantom():void {
			var stLayer:Sprite = boxCon as Sprite;
			renderTarget = RenderTarget2D.create(Math.floor(stLayer.width), Math.floor(stLayer.height), WebGLContext.RGBA, WebGLContext.UNSIGNED_BYTE, 0, false);
			renderTarget.start();
			renderTarget.clear(0, 0, 0, 0);
			Render.context.clear();

			RenderSprite.renders[stLayer._renderType]._fun(stLayer, Render.context, 0, RenderState2D.height - Math.floor(stLayer.height));
			RenderSprite.renders[stLayer._renderType]._fun(stLayer, Render.context, 0, RenderState2D.height - Math.floor(stLayer.height));
			Render.context.flush();
			renderTarget.end();
			renderTarget.sourceWidth = renderTarget.width;
			renderTarget.sourceHeight = renderTarget.height;

			var boxItem:Box = new Box();
			boxItem.graphics.clear();
			boxItem.graphics.drawTexture(renderTarget, 0, 0, renderTarget.width, renderTarget.height);
			boxItem.x = boxCon.x;
			boxItem.y = boxCon.y;
			Laya.timer.once(300, this, onTweenOutPhantom, [boxItem, renderTarget], false);
			boxProto.addChild(boxItem);
		}

		private function onTweenOutPhantom(box:Box, render:RenderTarget2D):void {
			Tween.to(box, {alpha: 0}, 500, null, Handler.create(this, onClearRender, [box, render]));
		}

		private function onClearRender(box:Box, render:RenderTarget2D):void {
			if (box.parent) {
				box.removeSelf();
				box = null;
			}
			if (render) {
				render.destroy(true);
				render = null;
			}
		}

	}
}
