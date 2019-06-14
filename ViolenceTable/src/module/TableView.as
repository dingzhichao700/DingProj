package module {
	import laya.events.Event;
	import laya.maths.Point;
	import laya.media.SoundManager;
	
	import module.ball.BallItem;
	import module.ball.BallManager;
	import module.ball.BlockItem;
	
	import ui.TableViewUI;
	
	import utils.ShockUtil;

	public class TableView extends TableViewUI {

		private var ballList:Array;
		private var blockList:Array;
		private const WALL_POS:Array = [[0, 0, 490, 22], [481, 20, 26, 880], [0, 880, 490, 22], [0, 0, 26, 880]];
		private const WALL_POS2:Array = [[0, 0, 0, 0, 490, 0, 490, 22], [481, 20, 0, 0, 26, 0, 26, 880], [0, 880, 0, 0, 490, 0, 490, 22], [0, 0, 0, 0, 26, 0, 26, 880]];

//		private const WALL_POS2:Array = [[0, 0, 0, 0, 450, 0, 450, 450], [481, 20, 0, 0, 26, 0, 26, 880], [0, 880, 0, 0, 490, 0, 490, 22], [0, 0, 0, 0, 26, 0, 26, 880]];
//		private const WALL_POS2:Array = [[0, 0, 0, 0, 450, 0, 450, 450]];

		public function TableView() {
		}

		public function init():void {
			initTable();
			initBall();

			txtSpeed.style.font = "wryh";
			txtSpeed.style.fontSize = 20;

			SoundManager.playMusic("music/battle_1.mp3");
			SoundManager.setMusicVolume(0.5);
			Laya.timer.frameLoop(1, this, onFrame);
			Laya.stage.on(Event.RESIZE, this, onResize);
			onResize();
		}

		private function onResize():void {
//			console.log("size:", Browser.width, Browser.height);
			this.width = Laya.stage.width;
			this.height = Laya.stage.height;

			imgBg.width = this.width;
			imgBg.height = this.height;
		}

		private function initTable():void {
			blockList = [];
			for (var i:int = 0; i < WALL_POS.length; i++) {
				var item:BlockItem = new BlockItem();
				item.setRect(WALL_POS[i][2], WALL_POS[i][3]);
				item.x = WALL_POS[i][0];
				item.y = WALL_POS[i][1];
				boxTable.addChild(item);
				blockList.push(item);
			}
		/*for (var j:int = 0; j < WALL_POS2.length; j++) {
			var item:BlockItem = new BlockItem();
			item.data = (WALL_POS2[j] as Array).slice(2);
			item.x = WALL_POS2[j][0];
			item.y = WALL_POS2[j][1];
			boxTable.addChild(item);
			blockList.push(item);
		}*/
		}

		private function initBall():void {
			ballList = new Array();
			for (var i:int = 0; i < 10; i++) {
				var ball:BallItem = addBall(200 + 100 * Math.floor(i / 5), 300 + 100 * (i % 5), 1, 1);
				ball.ballRotation = 0;
			}

			var ball0:BallItem = addBall(200, 100, 0, 0);
//			ball0.addSpeed(90, 15);

//			var ball1:BallItem = addBall(300, 300, 0, 0);
//			ball1.ballRotation = 180;
//			ball1.speed = 1;
//
//			var ball2:BallItem = addBall(260, 400, 0, 0);
//			ball2.ballRotation = -135;
//			ball2.speed = 1;
		}

		/**
		 * 添加一个球到容器中
		 * @param x
		 * @param y
		 * @param type 球类型
		 * @param camp 阵营，0为玩家球，1为被敌方球
		 */
		private function addBall(x:int, y:int, type:int = 1, camp:int = 1):BallItem {
			var item:BallItem = BallManager.getInstance().getBall(type);
			item.x = x;
			item.y = y;
			item.type = type;
			item.camp = camp;
			ballList.push(item);
			boxCon.addChild(item);
			return item;
		}

		private function onFrame():void {
			var totalSpeed:Number = 0;
			for (var i:int = 0; i < ballList.length; i++) {
				var ball:BallItem = ballList[i] as BallItem;

				/**是否撞了障碍*/
				var hitBlock:Boolean = false;
				for (var j:int = 0; j < blockList.length; j++) {
					var block:BlockItem = blockList[j] as BlockItem;

					/*找出与小球碰撞的边中，与小球最近的那条边，只用小球与它的夹角来计算碰撞*/
					/**是否撞了某条边*/
					var findLine:Boolean = false;
					/**到小球碰撞边垂线最短的那条垂线的数据*/
					var shortestApeakData:Array;
					if (hitTestBlock(ball, block)) { //区域碰撞
						for (var k:int = 0; k < block.lines.length; k++) { //检查每条线垂线
							var apeak:Array = getApeakData(ball.x, ball.y, block, block.lines[k] as Array);

							/*垂线长度小于球的半径的，才可能会碰撞*/
							if (apeak[0] < ball.radius) {
								/*球运动方向与球到碰撞边的垂线形成的夹角，该夹角小于90度才会碰撞*/
								var clipAngle:int = Math.abs(ball.ballRotation - apeak[1]) % 360;
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
							ShockUtil.play(boxScene, 200, 5, 100);
							
							SoundManager.playSound("sound/hit_wall_1.mp3", 1);
							/*碰撞*/
							var rotationAdd:Number = shortestApeakData[1] - ball.ballRotation;
							ball.ballRotation = ball.ballRotation - 180 + rotationAdd * 2;

							/**角度转化为-180-180范围内*/
							while (ball.ballRotation < -180) {
								ball.ballRotation += 360;
							}
							while (ball.ballRotation > 180) {
								ball.ballRotation -= 360;
							}
							hitBlock = true;
						}
					}
				}

				/**是否撞了其他球*/
				var hitBall:Boolean = false;
				for (j = 0; j < ballList.length; j++) {
					var ball2:BallItem = ballList[j] as BallItem;
					if (ball2 != ball) {
						if (hitTestBall(ball, ball2)) {
							/**碰撞切线角度*/
							var hitAngle:int = parseInt(Math.atan2(ball2.y - ball.y, ball2.x - ball.x) * 180 / Math.PI + "");

							/*与碰撞切线的夹角*/
							var angleHit1:int = (ball.ballRotation - hitAngle) % 360;
							var angleHit2:int = (ball2.ballRotation - hitAngle) % 360;

							/*碰撞方向上，撞前的速度*/
							var speedHit1:int = ball.speed * Math.cos(angleHit1 / 180 * Math.PI);
							var speedHit2:int = ball2.speed * Math.cos(angleHit2 / 180 * Math.PI);

							/**碰撞方向上，球2对球1的相对速度小于0才会相撞，否则不会*/
							if (speedHit2 < speedHit1) {
								hitBall = true;
								
								ShockUtil.play(boxScene, 200, 1, 100);
								
								/*播碰撞音*/
								var soundUrl:String = "sound/hit_iron.mp3";
								SoundManager.playSound(soundUrl, 1);
								var volume:Number = Math.abs(speedHit1 - speedHit2) / 100;
//								SoundManager.setSoundVolume(Math.max(Math.min(volume, 0.6), 0.1), soundUrl);
								SoundManager.setSoundVolume(1, soundUrl);

								/*碰撞方向上，撞后的角度*/
								var angleHitSpit1:int = hitAngle + 180;
								var angleHitSpit2:int = hitAngle;

								/*碰撞方向上，撞后的速度*/
								var speedHitSpit1:int = (Math.abs(speedHit1) + Math.abs(speedHit2)) / 2;
								var speedHitSpit2:int = (Math.abs(speedHit1) + Math.abs(speedHit2)) / 2;

								/*碰撞切线方向上，撞后的角度，根据夹角angleHit1、angleHit2来判断*/
								while (angleHit1 < 0) {
									angleHit1 += 360;
								}
								while (angleHit1 > 360) {
									angleHit1 -= 360;
								}
								var angleSide1:int = hitAngle + ((0 < angleHit1 && angleHit1 < 180) ? 90 : -90);
								while (angleHit2 < 0) {
									angleHit2 += 360;
								}
								while (angleHit2 > 360) {
									angleHit2 -= 360;
								}
								var angleSide2:int = hitAngle + ((0 < angleHit2 && angleHit2 < 180) ? 90 : -90);

								/*碰撞切线方向上，撞后的速度*/
								var speedSide1:int = ball.speed * Math.abs(angleHit1 % 180 == 0 ? Math.round(Math.sin(angleHit1 / 180 * Math.PI)) : Math.sin(angleHit1 / 180 * Math.PI));
								var speedSide2:int = ball2.speed * Math.abs(angleHit1 % 180 == 0 ? Math.round(Math.sin(angleHit2 / 180 * Math.PI)) : Math.sin(angleHit2 / 180 * Math.PI));

								var result:Array = [];
								result = getSpeedCombine([[speedHitSpit1, angleHitSpit1], [speedSide1, angleSide1]]);
								ball.speed = result[0];
								ball.ballRotation = result[1];

								result = getSpeedCombine([[speedHitSpit2, angleHitSpit2], [speedSide2, angleSide2]]);
								ball2.speed = result[0];
								ball2.ballRotation = result[1];
							}
						}
					}
				}

				//球移动坐标
				if (!hitBlock && !hitBall && ball.speed != 0) {
					//速度损耗，要考虑子弹时间 对 速度损耗的填补，即(1 - ball.speedCost) * (1 - timeScale)
					ball.speed = ball.speed * (ball.speedCost + (1 - ball.speedCost) * (1 - timeScale));

					//位移
					var xDis:int = Math.cos(ball.ballRotation / 180 * Math.PI) * ball.speed * timeScale;
					var yDis:int = Math.sin(ball.ballRotation / 180 * Math.PI) * ball.speed * timeScale;
					ball.x += xDis;
					ball.y += yDis;
				}

				totalSpeed += ball.speed;
			}
			txtSpeed.innerHTML = totalSpeed + "";
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
			var peakY:int = Math.tan(angle1 / 180 * Math.PI) * peakX + param1;
			/**垂线长度*/
			var peakDis:int = Math.sqrt((peakX - x) * (peakX - x) + (peakY - y) * (peakY - y));
			var peakRotation:int = Math.atan2(peakY - y, peakX - x) * 180 / Math.PI;
			return [peakDis, peakRotation];
		}

		/**
		 * 求和速度
		 * @param speedList 分速度列表[[速度1，角度1],[速度2，角度2]...]
		 * @return [合速度，角度]
		 *
		 */
		private function getSpeedCombine(speedList:Array):Array {
			var speedX:int = 0;
			var speedY:int = 0;
			for (var i:int = 0; i < speedList.length; i++) {
				speedX += speedList[i][0] * Math.cos(speedList[i][1] / 180 * Math.PI);
				speedY += speedList[i][0] * Math.sin(speedList[i][1] / 180 * Math.PI);
			}
			var speedCombine:int = Math.sqrt(speedX * speedX + speedY * speedY);
			var angleCombine:int = Math.atan2(speedY, speedX) * 180 / Math.PI;
			return [speedCombine, angleCombine];
		}

		/**碰撞检测(球对障碍)-只检测障碍边界范围*/
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

		/**碰撞检测(球对球)-根据球心距离和半径和来检测*/
		private function hitTestBall(item:BallItem, item2:BallItem):Boolean {
			var disX:int = item2.x - item.x;
			var disY:int = item2.y - item.y;
			var dis:int = Math.sqrt(disX * disX + disY * disY);
			return dis < (item.radius + item2.radius);
		}

		private function get timeScale():Number {
			return Params.ins.timeScale;
		}

	}
}
