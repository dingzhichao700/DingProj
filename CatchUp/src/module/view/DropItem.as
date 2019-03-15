package module.view {
	import module.ui.DropItemUI;

	public class DropItem extends DropItemUI {

		private var _type:int

		public function DropItem() {
		}


		public function get type():int {
			return _type;
		}

		public function set type(value:int):void {
			if (_type != value) {
				_type = value;
				imgItem.skin = "images/item_" + _type + ".png";
			}
		}

	}
}
