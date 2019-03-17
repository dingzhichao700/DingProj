package module {
	import module.ball.BallItem;
	import module.ball.BallManager;
	
	import ui.TableViewUI;

	public class TableView extends TableViewUI {
		
		private var ballList:Array;
		
		public function TableView() {
		}
		
		public function initBalls():void {
			ballList = new Array();
			for(var i:int = 0 ; i < 10;i++){
				var item:BallItem = BallManager.getInstance().getBall();
				boxCon.addChild(item);
			}
		}

	}
}
