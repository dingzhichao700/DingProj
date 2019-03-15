package module {
	import laya.debug.DebugPanel;
	import laya.display.Sprite;
	import laya.events.Event;
	import laya.ui.Image;
	import laya.ui.View;
	import laya.utils.Browser;
	import laya.utils.Handler;
	
	import module.view.MainView;

	public class GameScene extends View {

		private var imgBg:Image;
		private var con:Sprite;
		private var view:MainView;

		public static const GAME_WIDTH:int = 768;
		public static const GAME_HEIGHT:int = 1024;

		private static var instance:GameScene;

		public static function getInstance():GameScene {
			instance ||= new GameScene();
			return instance;
		}

		public function GameScene() {
			imgBg = new Image;
			this.addChildAt(imgBg, 0);
			Laya.loader.load("images/background.jpg", Handler.create(this, onLoadBg));

			con = new Sprite();
			this.addChild(con);

			view = new MainView();
			view.init();
			con.addChild(view);

			Laya.stage.on(Event.RESIZE, this, onResize);
			DebugPanel.init();
		}

		private function onLoadBg():void {
			imgBg.skin = "images/background.jpg";
			onResize();
		}

		private function onResize():void {
//			console.log("size:", windowW, windowH);
			
			Laya.timer.once(2,this, function():void {
				Laya.stage.setScreenSize(Browser.width, Browser.height);
				Laya.stage.size(Browser.width, Browser.height);
				return;
			});
			
			var scale:Number = (windowRatio >= bgRatio ? (windowH / imgBg.height) : (windowW / imgBg.width))
			imgBg.scale(scale, scale);
			imgBg.y = windowH - imgBg.height * scale;
			imgBg.x = (windowW - imgBg.width * scale) / 2;

			var conScale:Number = windowH < GAME_HEIGHT ? (windowH / GAME_HEIGHT) : (windowW < GAME_WIDTH ? (windowW / GAME_WIDTH) : 1);
			con.scale(conScale, conScale)
			con.x = (windowW - GAME_WIDTH * conScale) / 2;
			con.y = (windowH - GAME_HEIGHT * conScale) / 2;
			
			view.txtSize.text = Browser.width + "x" + Browser.height;
		}

		private function get windowRatio():Number {
			return windowH / windowW;
		}

		private function get bgRatio():Number {
			return imgBg.height / imgBg.width;
		}
		
		private function get windowH():int {
			return Browser.height;
		}
		
		private function get windowW():int {
			return Browser.width;
		}

	}
}
