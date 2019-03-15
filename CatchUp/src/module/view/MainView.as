package module.view {
	import laya.display.Text;
	import laya.events.Event;
	import laya.utils.Browser;
	import laya.utils.Handler;
	import laya.utils.Tween;
	
	import module.GameScene;
	import module.Params;
	import module.ui.MainViewUI;

	public class MainView extends MainViewUI {

		private var itemPool:Array;
		private var itemList:Array;

		private var headType:int;
		private var totalScore:int;
		private var moveState:int;
		/**双倍buff数量*/
		private var doubleBuff:int;

		public function MainView() {
		}

		public function init():void {
			boxGame.visible = false;
			boxEnd.visible = false;
			boxStart.visible = true;

			imgRound.pos(head1.x, head1.y - 2);
			headType = 1;

			head1.on(Event.CLICK, this, onHead);
			head2.on(Event.CLICK, this, onHead);
			head3.on(Event.CLICK, this, onHead);

			btnStart.on(Event.CLICK, this, onStart);
		}

		private function onHead(e:Event):void {
			imgRound.pos(e.currentTarget.x, e.currentTarget.y - 2);
			switch (e.currentTarget) {
				case head1:
					headType = 1;
					break;
				case head2:
					headType = 2;
					break;
				case head3:
					headType = 3;
					break;
			}
		}

		/**开局初始化*/
		private function onStart():void {
			boxStart.visible = false;
			boxEnd.visible = false;
			imgBang.visible = false;
			boxGame.visible = true;
			itemPool = [];
			itemList = [];
			arrow1.alpha = arrow2.alpha = 1;
			boxPlayer.x = 220;
			role1.setData(headType, 1);
			role2.setData(4, 2);
			txtScore.text = "";
			totalScore = moveState = 0;
			doubleBuff = 0;
			boxDrop.removeChildren();

			Tween.to(arrow1, {alpha: 0}, 1000);
			Tween.to(arrow2, {alpha: 0}, 1000);
			updateScore();

			Laya.stage.on(Event.CLICK, this, onMove);

			Laya.timer.loop(500, this, onTimer);
			Laya.timer.loop(10, this, onFrame);
		}

		private function onMove(e:Event):void {
			moveBasket(e.stageX < Browser.width / 2 ? 1 : 2);
		}

		private function onFrame():void {
			for (var i:int = 0; i < itemList.length; i++) {
				var item:DropItem = itemList[i] as DropItem;
				item.y += 10;

				//出界
				if (item.y > GameScene.GAME_HEIGHT) {
					itemList.splice(i, 1);
					i--;
					itemPool.push(item);
					boxDrop.removeChild(item);
				}

				//碰撞
				if ((boxPlayer.x + imgBasket.x) <= item.x && item.x <= (boxPlayer.x + imgBasket.x + imgBasket.width)) {
					if ((boxPlayer.y + imgBasket.y) <= item.y && item.y <= (boxPlayer.y + imgBasket.y + imgBasket.height)) {
						playScore(item);
						if (item.type != 0) {
							itemList.splice(i, 1);
							i--;
							itemPool.push(item);
							boxDrop.removeChild(item);
						}
					}
				}
			}
			var speed:int = 0;
			switch (moveState) {
				case 0:
					break;
				case 1:
					speed = -7;
					break;
				case 2:
					speed = 7;
					break;
			}
			if (Math.abs(speed) > 0) {
				var targetX:int = boxPlayer.x + speed;
				if (targetX < 100) {
					boxPlayer.x = 100;
					moveBasket(0);
				} else if (targetX > (GameScene.GAME_WIDTH - boxPlayer.width - 100)) {
					boxPlayer.x = GameScene.GAME_WIDTH - boxPlayer.width - 100;
					moveBasket(0);
				} else {
					boxPlayer.x = targetX;
				}
			}
		}

		private function onTimer():void {
			var item:DropItem = itemPool.length > 0 ? itemPool.pop() : new DropItem();
			item.type = Math.random() > 0.9 ? 0 : (Math.ceil((Math.random() * 7)));
			item.x = 200 + Math.random() * (GameScene.GAME_WIDTH - 400);
			item.y = 0;
			itemList.push(item);
			boxDrop.addChild(item);
		}

		/**移动，0不动，1左2右*/
		private function moveBasket(value:int):void {
			moveState = value;
			role1.setState(moveState);
			role2.setState(moveState);
		}

		private function playScore(item:DropItem):void {
			if (item.type == 0) {
				item.imgItem.visible = false;
				imgBang.visible = true;
				endGame();
			} else {
				var str:String = "";
				var addScore:int = 0;
				var color:String = "#fdfda2";
				switch (item.type) {
					case 1:
						str = "10";
						addScore = 10;
						break;
					case 2:
						str = "50";
						addScore = 50;
						break;
					case 3:
						str = "100";
						addScore = 100;
						break;
					case 4:
						str = "1000";
						addScore = 1000;
						break;
					case 5:
						str = "500";
						addScore = 500;
						break;
					case 6:
						str = "秒拍双倍";
						color = "#ff0000";
						doubleBuff++;
						break;
					case 7:
						str = "秒拍双倍";
						color = "#ff0000";
						doubleBuff++;
						break;
				}

				if (addScore > 0 && doubleBuff > 0) {
					addScore = addScore * 2;
					doubleBuff--;
					str = str + "x2";
				}
				totalScore += addScore;
				updateScore();
				txtScore.visible = true;
				txtScore.text = str;
				txtScore.color = color;
				txtScore.y = 51;
				Tween.clearTween(txtScore);
				Tween.to(txtScore, {y: 0}, 500, null, Handler.create(this, function():void {
					txtScore.visible = false;
				}));
			}
		}

		private function updateScore():void {
			var label:Text = Params.getInstance().data.getLabel;
			txtGet.text = label + totalScore;
		}

		private function endGame():void {
			Laya.stage.off(Event.CLICK, this, onMove);
			Laya.timer.clear(this, onTimer);
			Laya.timer.clear(this, onFrame);

			Laya.timer.once(500, this, showDialog1)
			Laya.timer.once(1000, this, showDialog2)
			Laya.timer.once(2500, this, showEnd)
		}

		private function showDialog1():void {
			var lose:Array = Params.getInstance().data.lose1;
			role2.showTalk(role1.roleName + lose[Math.floor(Math.random() * lose.length)]);
		}

		private function showDialog2():void {
			var lose:Array = Params.getInstance().data.lose2;
			role1.showTalk(lose[Math.floor(Math.random() * lose.length)]);
		}

		private function showEnd():void {
			boxStart.visible = false;
			boxGame.visible = false;

			boxEnd.visible = true;
			btnReStart.on(Event.CLICK, this, init);
			txtTotal.text = totalScore + "";
			var desc:Array = Params.getInstance().data.desc;
			txtDesc.text = role1.roleName + desc[0] + totalScore + desc[1] + Math.min(Math.floor(totalScore / 700), 99) + desc[2];
		}

	}
}
