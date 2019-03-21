/**Created by the LayaAirIDE,do not modify.*/
package ui {
	import laya.ui.*;import laya.display.*; 

	public class TableViewUI extends View {
		public var boxCon:Box;
		public var boxTable:Box;

		public static var uiView:Object =/*[STATIC SAFE]*/{"type":"View","props":{"width":768,"height":1080},"child":[{"type":"Image","props":{"y":-100,"x":0,"skin":"unpack/img_bg.jpg"}},{"type":"Image","props":{"y":34,"x":96,"skin":"unpack/img_table.png"}},{"type":"Box","props":{"y":76,"x":129,"width":506,"var":"boxCon","height":904},"child":[{"type":"Box","props":{"var":"boxTable"},"child":[{"type":"Image","props":{"y":0,"x":56,"width":401,"skin":"comp/blank.png","height":22}},{"type":"Image","props":{"y":47,"x":0,"width":26,"skin":"comp/blank.png","height":361}},{"type":"Image","props":{"y":493,"x":0,"width":26,"skin":"comp/blank.png","height":361}},{"type":"Image","props":{"y":493,"x":481,"width":26,"skin":"comp/blank.png","height":361}},{"type":"Image","props":{"y":53,"x":481,"width":26,"skin":"comp/blank.png","height":361}},{"type":"Image","props":{"y":880,"x":56,"width":401,"skin":"comp/blank.png","height":22}}]}]}]};
		override protected function createChildren():void {
			super.createChildren();
			createView(uiView);

		}

	}
}