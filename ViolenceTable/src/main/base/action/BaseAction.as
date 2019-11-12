package main.base.action {
	import main.module.ball.BaseBall;

	public class BaseAction {
		
		private var _player:BaseBall;
		
		public function BaseAction() {
		}
		
		public function action():Boolean {
			return false;
		}
		
		public function setPlayer(obj:BaseBall):void {
			_player = obj;
		}
		
		public function get player():BaseBall {
			return _player;
		}
		
		public function recover():void {
		}
		
	}
}
