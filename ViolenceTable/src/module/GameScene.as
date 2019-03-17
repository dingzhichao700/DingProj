package module {
	import laya.events.Event;
	import laya.ui.View;
	import laya.utils.Browser;

	public class GameScene extends View {

		public static const GAME_WIDTH:int = 768;
		public static const GAME_HEIGHT:int = 1080;

		private static var instance:GameScene;

		public static function getInstance():GameScene {
			instance ||= new GameScene();
			return instance;
		}

		public function GameScene() {
		}

		public function init():void {
			var table:TableView = new TableView();
			addChild(table);
			table.initBalls();

			Laya.stage.on(Event.RESIZE, this, onResize);
			onResize();
		}

		private function onResize():void {
//			console.log("size:", Browser.width, Browser.height);
			Laya.timer.once(1, this, function():void {
				Laya.stage.setScreenSize(Browser.width, Browser.height);
//				Laya.stage.size(Browser.width, Browser.height);
			});

			var scale:Number = Browser.height / GAME_HEIGHT;
			this.scaleX = this.scaleY = scale;
			this.x = Browser.width / 2 - GAME_WIDTH * scale / 2;
			this.y = Browser.height / 2 - GAME_HEIGHT * scale / 2;
		}

	}
}
