package main.base {
	import main.base.action.BaseAction;
	import main.module.ball.BaseBall;

	/**
	 * AI基类
	 * @author dingzhichao
	 *
	 */
	public class BaseAIManager {

		private var _owner:BaseBall;

		private var _actions:Vector.<BaseAction>;

		public function BaseAIManager() {
		}

		/**AI持有者*/
		public function set owner($owner:BaseBall):void {
			_owner = $owner;
			afterSetOwner();
		}

		/**设置AI持有者后触发*/
		protected function afterSetOwner():void {
			
		}
		
		public function get owner():BaseBall {
			return _owner;
		}

		/**设置生效*/
		public function setActive(boo:Boolean):void {
			if (boo) {
				Laya.timer.loop(5, this, loop, null, true);
			} else {
				Laya.timer.clear(this, loop);
			}
		}

		protected function loop():void {
		}

		protected function addAction(action:BaseAction):void {
			if (!owner) {
				console.log("错误！ai拥有者为空：" + this);
			}
			if (!_actions) {
				_actions = new Vector.<BaseAction>;
			}
			if (_actions.indexOf(action) < 0) {
				action.owner = owner;
				_actions.push(action);
			}
		}

		protected function removeAction(action:BaseAction):void {
			if (_actions.indexOf(action) >= 0) {
				_actions.splice(_actions.indexOf(action), 1) as BaseAction;
				action.recover();
			}
		}

		public function recover():void {
		}

	}
}
