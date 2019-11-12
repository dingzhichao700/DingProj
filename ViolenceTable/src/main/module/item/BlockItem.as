package main.module.item {
	import laya.events.Event;
	import laya.maths.Point;
	import laya.ui.View;

	public class BlockItem extends View {

		private var _data:Array;
		private var _lines:Array;
		private var _pUp:int;
		private var _pDown:int;
		private var _pLeft:int;
		private var _pRight:int;

		public function BlockItem() {
			this.alpha = 0.5;
		}

		public function get data():Array {
			return _data;
		}
		
		public function set data(arr:Array):void {
			_data = arr;
			_data.push(0);
			_data.push(0); //最后要回到(0,0)点

			_pUp = 0;
			_pDown = 0;
			_pLeft = 0;
			_pRight = 0;
			_lines = [];

			for (var i:int = 0; i < _data.length - 2; i += 2) {
				var point1:Point = new Point(_data[i], _data[i + 1]);
				var point2:Point = new Point(_data[i + 2], _data[i + 3]);
				_lines.push([point1, point2]);

				if (point2.x < _pLeft) {
					_pLeft = point2.x;
				} else if (point2.x > _pRight) {
					_pRight = point2.x;
				}

				if (point2.y < _pUp) {
					_pUp = point2.y;
				} else if (point2.y > _pDown) {
					_pDown = point2.y;
				}
			}
			this.width = _pRight - _pLeft;
			this.height = _pDown - _pUp;
//			drawBlock();
			this.on(Event.MOUSE_DOWN,this, onDrag);
			this.mouseEnabled = true;
		}

		private function onDrag():void {
			this.off(Event.MOUSE_DOWN,this, onDrag);
			Laya.stage.on(Event.MOUSE_UP,this, endDrag);
			this.startDrag();
		}
		
		private function endDrag():void {
			this.stopDrag();
			Laya.stage.off(Event.MOUSE_UP,this, endDrag);
			this.on(Event.MOUSE_DOWN,this, onDrag);
		}
			
		public function setRect(width:int, height:int):void {
			data = [0, 0, width, 0, width, height, 0, height];
		}

		public function get lines():Array {
			return _lines;
		}

		public function get pUp():int {
			return _pUp;
		}

		public function get pDown():int {
			return _pDown;
		}

		public function get pLeft():int {
			return _pLeft;
		}

		public function get pRight():int {
			return _pRight;
		}

		private function drawBlock():void {
			this.graphics.clear();
			this.graphics.drawPoly(0, 0, _data.slice(2), "#FF0000");
		}

	}
}
