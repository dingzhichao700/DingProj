package main.module.scene {
	import laya.events.Event;
	import laya.media.SoundManager;
	
	import main.Params;

	public class SceneControl {

		private var _ui:GameUI;
		private var _curScene:BaseScene;
		private static var _ins:SceneControl;

		public static function get ins():SceneControl {
			_ins ||= new SceneControl();
			return _ins;
		}

		public function SceneControl() {
		}
		
		public function init():void {
			Laya.stage.removeChildren();
			_curScene = new GameScene();
			_curScene.init();
			Laya.stage.addChild(_curScene);
			_ui = new GameUI();
			_ui.init();
			Laya.stage.addChild(_ui);
			Laya.stage.on(Event.KEY_DOWN, this, onDown);
		}
		
		public function get curScene():BaseScene {
			return _curScene;
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
