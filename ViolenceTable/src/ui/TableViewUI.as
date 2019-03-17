/**Created by the LayaAirIDE,do not modify.*/
package ui {
	import laya.ui.*;import laya.display.*; 

	public class TableViewUI extends View {
		public var boxCon:Box;

		public static var uiView:Object =/*[STATIC SAFE]*/{"type":"View","props":{"width":768,"height":1080},"child":[{"type":"Image","props":{"y":-100,"x":0,"skin":"unpack/img_bg.jpg"}},{"type":"Image","props":{"y":34,"x":96,"skin":"unpack/img_table.png"}},{"type":"Box","props":{"y":76,"x":129,"width":508,"var":"boxCon","height":907}}]};
		override protected function createChildren():void {
			super.createChildren();
			createView(uiView);

		}

	}
}