package module {
	import laya.maths.Point;
	
	import module.ball.BallItem;
	import module.ball.BallManager;
	import module.ball.BlockItem;
	
	import ui.TableViewUI;

	public class TableView extends TableViewUI {

		private var ballList:Array;
		private var blockList:Array;
		private const WALL_POS:Array = [[0, 0, 490, 22], [481, 20, 26, 880], [0, 880, 490, 22], [0, 0, 26, 880]];
//		private const WALL_POS2:Array = [[0, 0, 0, 0, 490, 0, 490, 22], [481, 20, 0, 0, 26, 0, 26, 880], [0, 880, 0, 0, 490, 0, 490, 22], [0, 0, 0, 0, 26, 0, 26, 880]];
		private const WALL_POS2:Array = [[0, 0, 0, 0, 450, 0, 450, 450], [481, 20, 0, 0, 26, 0, 26, 880], [0, 880, 0, 0, 490, 0, 490, 22], [0, 0, 0, 0, 26, 0, 26, 880]];
//		private const WALL_POS2:Array = [[0, 0, 0, 0, 450, 0, 450, 450]];

		public function TableView() {
		}

		public function init():void {
			initTable();
			initBall();

			Laya.timer.frameLoop(1, this, onFrame);
		}

		private function initTable():void {
			blockList = [];
			/*for (var i:int = 0; i < WALL_POS.length; i++) {
				var item:BlockItem = new BlockItem();
				item.setRect(WALL_POS[i][2], WALL_POS[i][3]);
				item.x = WALL_POS[i][0];
				item.y = WALL_POS[i][1];
				boxTable.addChild(item);
				blockList.push(item);
			}*/
			for (var j:int = 0; j < WALL_POS2.length; j++) {
				var item:BlockItem = new BlockItem();
				item.data = (WALL_POS2[j] as Array).slice(2);
				item.x = WALL_POS2[j][0];
				item.y = WALL_POS2[j][1];
				boxTable.addChild(item);
				blockList.push(item);
			}
		}

		private function initBall():void {
			ballList = new Array();
//			for(var i:int = 0 ; i < 1;i++){
//				addBall(100, 100);
//			}
			addBall(100, 300, 0, 0);
		}

		/**
		 * 添加一个球到容器中
		 * @param x
		 * @param y
		 * @param type 球类型
		 * @param camp 阵营，0为玩家球，1为被打球
		 */
		private function addBall(x:int, y:int, type:int = 1, camp:int = 1):void {
			var item:BallItem = BallManager.getInstance().getBall();
			item.x = x;
			item.y = y;
			item.type = type;
			item.camp = camp;
			ballList.push(item);
			boxCon.addChild(item);
		}

		private function onFrame():void {
			for (var i:int = 0; i < ballList.length; i++) {
				var item:BallItem = ballList[i] as BallItem;

				/**是否撞了障碍*/
				var hitBlock:Boolean = false;
				for (var j:int = 0; j < blockList.length; j++) {
					var block:BlockItem = blockList[j] as BlockItem;

					/*找出与小球碰撞的边中，与小球最近的那条边，只用小球与它的夹角来计算碰撞*/
					/**是否撞了某条边*/
					var findLine:Boolean = false;
					/**到小球碰撞边垂线最短的那条垂线的数据*/
					var shortestApeakData:Array;
					if (hitTestBlock(item, block)) { //区域碰撞
						for (var k:int = 0; k < block.lines.length; k++) { //检查每条线垂线
							var apeak:Array = getApeakData(item.x, item.y, block, block.lines[k] as Array);
							
							/*垂线长度小于球的半径的，才可能会碰撞*/
							if (apeak[0] < item.radius) {
								/*球运动方向与球到碰撞边的垂线形成的夹角，该夹角小于90度才会碰撞*/
								var clipAngle:int = Math.abs(item.ballRotation - apeak[1]) % 360;
								if (clipAngle > 180) {
									clipAngle = Math.abs(360 - clipAngle);
								}
								if (clipAngle < 90) { //该夹角小于90度，即正在撞向该条边
									if (!findLine) {
										shortestApeakData = apeak;
										findLine = true;
									}
									if (apeak[0] <= shortestApeakData[0]) { //找到垂线最短的
										shortestApeakData = apeak;
									}
								}
							}
						}
						if (findLine) {
							/*碰撞*/
							var rotationAdd:Number = shortestApeakData[1] - item.ballRotation;
							item.ballRotation = item.ballRotation - 180 + rotationAdd * 2;

							/**角度转化为-180-180范围内*/
							while (item.ballRotation < -180) {
								item.ballRotation += 360;
							}
							while (item.ballRotation > 180) {
								item.ballRotation -= 360;
							}
							hitBlock = true;
						}
					}
				}

				/**是否撞了其他球*/
				var hitBall:Boolean = false;
				if (!hitBlock && !hitBall) {
					var xDis:int = Math.cos(item.ballRotation / 180 * Math.PI) * item.speed;
					var yDis:int = Math.sin(item.ballRotation / 180 * Math.PI) * item.speed;
					item.x += xDis;
					item.y += yDis;
				}
			}
		}

		/**
		 * 获取垂线数据
		 * @param x
		 * @param y
		 * @param block 线数组，包含2个端点Point
		 * @param line block内部的某条线，包含2个端点Point
		 * @return [垂线长度，角度]
		 */
		private function getApeakData(x:int, y:int, block:BlockItem, line:Array):Array {
			var point1:Point = line[0];
			var point2:Point = line[1];
			var disX:int = point2.x - point1.x;
			var disY:int = point2.y - point1.y;

			if (disY == 0) { //角度为0或180的碰撞线，tan函数都是0，分辨不出角度的，特判下
				return [Math.abs(y - block.y - point1.y), y > (block.y + point1.y) ? -90 : 90];
			}

			if (disX == 0) { //角度为90或270的碰撞线，tan函数都是无限大，分辨不出角度的，特判下
				return [Math.abs(x - block.x - point1.x), x > (block.x + point1.x) ? 180 : 0];
			}

			var angle1:int = Math.atan(disY / disX) * 180 / Math.PI;
			var param1:int = (block.y + point2.y) - (block.x + point2.x) * Math.tan(angle1 / 180 * Math.PI);

			var angle2:int = angle1 - 90;
			var param2:int = y - x * Math.tan(angle2 / 180 * Math.PI);

			var peakX:int = (param2 - param1) / (Math.tan(angle1 / 180 * Math.PI) - Math.tan(angle2 / 180 * Math.PI));
			var peakY:int = Math.tan(angle1 / 180 * Math.PI)*peakX + param1;
			/**垂线长度*/
			var peakDis:int = Math.sqrt((peakX - x) * (peakX - x) + (peakY - y) * (peakY - y));
			var peakRotation:int = Math.atan2(peakY - y, peakX-x) * 180 / Math.PI;
			return [peakDis, peakRotation];
		}

		/**碰撞检测-只检测障碍边界范围*/
		private function hitTestBlock(item:BallItem, block:BlockItem):Boolean {
			var radius:int = item.radius;
			var finalX:int = item.x;
			var finalY:int = item.y;
			if ((block.x + block.pLeft - radius) < finalX && finalX < (block.x + block.pRight + radius)) {
				if ((block.y + block.pUp - radius) < finalY && finalY < (block.y + block.pDown + radius)) {
					return true;
				}
			}
			return false;
		}

	}
}
