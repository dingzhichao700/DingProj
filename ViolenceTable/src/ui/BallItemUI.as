/**Created by the LayaAirIDE,do not modify.*/
package ui {
	import laya.ui.*;import laya.display.*; 

	public class BallItemUI extends View {
		public var boxBottom:Box;
		public var boxPhantom:Box;
		public var boxBall:Box;

		public static var uiView:Object =/*[STATIC SAFE]*/{"type":"View","props":{"width":39,"mouseEnabled":true,"height":39},"child":[{"type":"Box","props":{"y":0,"x":0,"var":"boxBottom","mouseThrough":true,"mouseEnabled":true}},{"type":"Box","props":{"y":0,"x":0,"var":"boxPhantom","mouseThrough":true,"mouseEnabled":true}},{"type":"Box","props":{"y":0,"x":0,"var":"boxBall","mouseThrough":true,"mouseEnabled":true}}]};
		override protected function createChildren():void {
			super.createChildren();
			createView(uiView);

		}

	}
}