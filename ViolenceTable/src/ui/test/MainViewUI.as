/**Created by the LayaAirIDE,do not modify.*/
package ui.test {
	import laya.ui.*;
	import laya.display.*; 

	public class MainViewUI extends View {
		public var boxCon:Box;

		public static var uiView:Object =/*[STATIC SAFE]*/{"type":"View","props":{"width":768,"height":1080},"child":[{"type":"Image","props":{"skin":"img_table.png","centerY":0,"centerX":0}},{"type":"Box","props":{"y":46,"x":98,"width":576,"var":"boxCon","height":990}}]};
		override protected function createChildren():void {
			super.createChildren();
			createView(uiView);

		}

	}
}