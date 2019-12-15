package main.module.scene {
	import laya.display.Sprite;

	public class GameUI extends Sprite {
		
		public function GameUI() {
		}
		
		public function init():void {
			LayerManager.ins.initUILayers();
		}
		
		
	}
}
