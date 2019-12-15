package main.module.scene {
	import laya.display.Sprite;

	/**
	 * UI层级管理，只管理UI的层级
	 * @author dingzhichao
	 *
	 */
	public class LayerManager {

		/**警告层*/
		public static const LAYER_WARNING:String = "layer_warning";
		/**tips层*/
		public static const LAYER_TIP:String = "layer_tip";
		/**小窗口层*/
		public static const LAYER_WINDOW_SMALL:String = "layer_window_small";
		/**大窗口层*/
		public static const LAYER_WINDOW_BIG:String = "layer_window_big";

		/**警告层*/
		private var layer_warning:Sprite;
		/**tips层*/
		private var layer_tip:Sprite;
		/**小窗口层*/
		private var layer_window_small:Sprite;
		/**大窗口层*/
		private var layer_window_big:Sprite;

		private static var _ins:LayerManager;

		public static function get ins():LayerManager {
			_ins ||= new LayerManager();
			return _ins;
		}

		public function LayerManager() {
		}

		public function initUILayers():void {
			var ui:GameUI = GameControl.ins.ui;
			ui.removeChildren();

			layer_window_big = new Sprite();
			ui.addChild(layer_window_big);
			layer_window_small = new Sprite();
			ui.addChild(layer_window_small);
			layer_tip = new Sprite();
			ui.addChild(layer_tip);
			layer_warning = new Sprite();
			ui.addChild(layer_warning);
		}

		/**获取UI层级*/
		public function getLayer(str:String):Sprite {
			var target:Sprite;
			switch (str) {
				case LAYER_WARNING:
					target = layer_warning;
					break;
				case LAYER_TIP:
					target = layer_tip;
					break;
				case LAYER_WINDOW_SMALL:
					target = layer_window_small;
					break;
				case LAYER_WINDOW_BIG:
					target = layer_window_big;
					break;
			}
			if (target) {
				return target;
			}
			return null;
		}

	}
}
