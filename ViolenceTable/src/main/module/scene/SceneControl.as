package main.module.scene {
	import laya.events.Event;
	import laya.media.SoundManager;
	
	import main.Params;

	public class SceneControl {

		private var curScene:BaseScene;
		private static var _ins:SceneControl;

		public static function get ins():SceneControl {
			_ins ||= new SceneControl();
			return _ins;
		}

		public function SceneControl() {
		}
		
		public function init():void {
			curScene = new GameScene();
			curScene.init();
			Laya.stage.addChild(curScene);
			Laya.stage.on(Event.KEY_DOWN, this, onDown);
			Laya.timer.once(1, this, function():void{
				this.centerX = 0;
				this.centerY = 0;
			});
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
