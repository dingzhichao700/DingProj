package module {
	import laya.events.Event;
	import laya.filters.BlurFilter;
	import laya.ui.View;
	import laya.utils.Browser;

	public class GameScene extends View {

		private var table:TableView;
		
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
			table = new TableView();
			addChild(table);
			table.init();

			Laya.stage.on(Event.RESIZE, this, onResize);
			Laya.stage.on(Event.KEY_DOWN, this, onDown);
			onResize();
		}

		private var blur:Number = 0;
		private function onDown():void {
			Laya.stage.on(Event.KEY_UP, this, onUp);
			
			Params.ins.timeScale = 0.02;
			 
			var filter:BlurFilter = new BlurFilter();
			table.imgBg.filters = [filter];
		}
		
		private function onUp():void {
			Laya.stage.off(Event.KEY_UP, this, onUp);
			Params.ins.timeScale = 1;
			table.imgBg.filters = [];
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
