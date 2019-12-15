package main.base.action {
	import main.module.ball.BaseBall;

	public class BaseAction {
		
		private var _owner:BaseBall;
		
		public function BaseAction() {
		}
		
		public function action():Boolean {
			return false;
		}
		
		public function set owner(obj:BaseBall):void {
			_owner = obj;
		}
		
		public function get owner():BaseBall {
			return _owner;
		}
		
		public function recover():void {
		}
		
	}
}
