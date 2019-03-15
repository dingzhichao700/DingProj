package module.view {
	import module.Params;
	import module.ui.RoleViewUI;

	public class RoleView extends RoleViewUI {

		private var _head:int;
		private var _pos:int;
		private var _sex:int;
		private var animeIndex:int

		public function RoleView() {
		}

		/**
		 *
		 * @param head 头像序号
		 * @param pos 位置1左2右
		 *
		 */
		public function setData(head:int, pos:int):void {
			_head = head;
			_pos = pos;
			_sex = _head == 1 ? 2 : 1; //1号头像是女的，其他都男的
			imgHead.skin = "images/head_" + _head + ".png";
			imgBody.skin = "images/" + (_sex == 1 ? "boy" : "girl") + "_0.png";
			imgBody.scaleX = _pos == 1 ? 1 : -1;
			showTalk();
		}

		/**0静止，1跑动*/
		public function setState(value:int):void {
			if(value == 0){
				Laya.timer.clear(this, onAnime);
				imgBody.skin = "images/" + (_sex == 1 ? "boy" : "girl") + "_0.png";
			} else {
				animeIndex = 0;
				Laya.timer.loop(50, this, onAnime);
			}
		}
		
		private function onAnime():void {
			animeIndex = animeIndex == 0 ? 1: 0;
			imgBody.skin = "images/" + (_sex == 1 ? "boy" : "girl") + "_" + animeIndex + ".png";
		}

		public function showTalk(str:String = ""):void {
			if (str == "") {
				imgTalk.visible = false;
			} else {
				imgTalk.visible = true;
				txtTalk.text = str;
			}
		}

		public function get head():int {
			return _head;
		}
		
		public function get roleName():String {
			var name:Array = Params.getInstance().data.names;
			return name[_head];
		}

	}
}
