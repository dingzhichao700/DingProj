package module {
	import laya.events.Event;
	import laya.media.SoundManager;
	import laya.ui.View;

	public class GameScene extends View {

		private var table:TableView;
		
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

			Laya.stage.on(Event.KEY_DOWN, this, onDown);
			Laya.timer.once(1, this, function():void{
				this.centerX = 0;
				this.centerY = 0;
			});
		}

		private var blur:Number = 0;
		private function onDown():void { 
			Laya.stage.on(Event.KEY_UP, this, onUp);
			SoundManager.setMusicVolume(0.05);
			
			Params.ins.timeScale = 0.02;
		}
		
		private function onUp():void {
			Laya.stage.off(Event.KEY_UP, this, onUp);
			SoundManager.setMusicVolume(0.5);
			Params.ins.timeScale = 1;
		}
		
	}
}
