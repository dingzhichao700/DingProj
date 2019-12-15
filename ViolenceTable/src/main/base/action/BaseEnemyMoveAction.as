package main.base.action {

	/**
	 * 基本小怪-移动action 
	 * @author dingzhichao
	 * 
	 */	
	public class BaseEnemyMoveAction extends BaseBallAction {
		
		public function BaseEnemyMoveAction() {
		}
		
		override public function action():Boolean {
			if(owner.y < 800){
				owner.y += 1;
			}
			return false;
		}
		
	}
}
