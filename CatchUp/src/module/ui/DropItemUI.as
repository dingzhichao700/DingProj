/**Created by the LayaAirIDE,do not modify.*/
package module.ui {
	import laya.ui.*;
	import laya.display.*; 

	public class DropItemUI extends View {
		public var imgItem:Image;

		public static var uiView:Object =/*[STATIC SAFE]*/{"type":"View","props":{"width":100,"height":100},"child":[{"type":"Image","props":{"y":-65,"x":-61,"var":"imgItem","skin":"images/item_1.png"}}]};
		override protected function createChildren():void {
			super.createChildren();
			createView(uiView);

		}

	}
}