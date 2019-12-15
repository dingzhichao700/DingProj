package {
	import laya.events.Event;
	import laya.media.SoundManager;
	
	import main.Params;
	import main.module.scene.BaseScene;
	import main.module.scene.GameScene;
	import main.module.scene.GameUI;

	public class GameControl {
		
		/**游戏ui容器*/
		private var _ui:GameUI;
		/**游戏场景容器*/
		private var _curScene:BaseScene;
		
		private static var _ins:GameControl;
		
		public static function get ins():GameControl {
			_ins ||= new GameControl();
			return _ins;
		}
		
		public function GameControl() {
		}

		public function start():void {
			Laya.stage.removeChildren();
			//初始化场景与ui
			_curScene = new GameScene();
			_curScene.init();
			Laya.stage.addChild(_curScene);
			_ui = new GameUI();
			_ui.init();
			Laya.stage.addChild(_ui);
			Laya.stage.on(Event.KEY_DOWN, this, onDown);
		}
		
		public function get ui():GameUI {
			return _ui;
		}
		
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
