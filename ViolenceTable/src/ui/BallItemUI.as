/**Created by the LayaAirIDE,do not modify.*/
package ui {
	import laya.ui.*;
	import laya.display.*; 

	public class BallItemUI extends View {
		public var boxBall:Box;

		public static var uiView:Object =/*[STATIC SAFE]*/{"type":"View","props":{"width":39,"height":39},"child":[{"type":"Image","props":{"y":1,"x":0,"skin":"img_light.png"}},{"type":"Box","props":{"var":"boxBall"}},{"type":"Image","props":{"y":0,"x":0,"skin":"img_shadow.png"}}]};
		override protected function createChildren():void {
			super.createChildren();
			createView(uiView);

		}

	}
}