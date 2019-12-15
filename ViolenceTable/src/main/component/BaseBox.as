package main.component {
	import laya.ui.View;

	public class BaseBox extends View {

		private var _layer:String;
		private var _isOpen:Boolean;

		public function BaseBox() {
		}

		public function set isOpen(value:Boolean):void {
			_isOpen = value;
		}
		
		public function get isOpen():Boolean {
			return _isOpen;
		}
		
		public function set layer(str:String):void {
			_layer = str;
		}

		public function get layer():String {
			return _layer;
		}
		
		public function open():void {
			WindowManager.ins.openWindow(this);
		}

		protected function onOpen():void {

		}

		public function close():void {
			WindowManager.ins.closeWindow(this);
		}

		protected function onClose():void {

		}


	}
}
