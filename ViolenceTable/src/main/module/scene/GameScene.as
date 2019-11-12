package main.module.scene {
	import laya.html.dom.HTMLDivElement;
	import laya.media.SoundManager;

	public class GameScene extends BaseScene {

		private var txtSpeed:HTMLDivElement;
		
		public function GameScene() {
		}

		override public function init():void {
			super.init();

//			txtSpeed = new HTMLDivElement();
//			txtSpeed.style.font = "wryh";
//			txtSpeed.style.fontSize = 20;

//			SoundManager.playMusic("music/battle_1.mp3");
			SoundManager.setMusicVolume(0.5);
		}
		
		override protected function onFrame():void {
			super.onFrame();
//			txtSpeed.innerHTML = totalSpeed + "";
		}

	}
}
