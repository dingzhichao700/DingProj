/**Created by the LayaAirIDE,do not modify.*/
package main.ui {
	import laya.ui.*;import laya.display.*; 

	public class HpBarViewUI extends View {
		public var imgHp:Image;

		public static var uiView:Object =/*[STATIC SAFE]*/{"type":"View","props":{"width":52,"height":7},"child":[{"type":"Image","props":{"y":2,"x":2,"var":"imgHp","skin":"comp/progress_1_1.png"}},{"type":"Image","props":{"skin":"comp/progress_1_bg.png"}}]};
		override protected function createChildren():void {
			super.createChildren();
			createView(uiView);

		}

	}
}