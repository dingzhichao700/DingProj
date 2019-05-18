/**Created by the LayaAirIDE,do not modify.*/
package ui {
	import laya.ui.*;import laya.display.*; 
	import laya.html.dom.HTMLDivElement;

	public class TableViewUI extends View {
		public var imgBg:Image;
		public var boxBg:Box;
		public var imgTable:Image;
		public var boxCon:Box;
		public var boxTable:Box;
		public var txtSpeed:HTMLDivElement;

		public static var uiView:Object =/*[STATIC SAFE]*/{"type":"View","props":{"width":768,"height":1080},"child":[{"type":"Image","props":{"var":"imgBg","skin":"unpack/img_bg.jpg","centerY":0,"centerX":0}},{"type":"Image","props":{"y":170,"skin":"comp/img_tray.png","left":0}},{"type":"Box","props":{"width":500,"height":1000,"centerY":0,"centerX":0},"child":[{"type":"Box","props":{"y":117,"x":56,"width":454,"var":"boxBg","centerX":0},"child":[{"type":"Image","props":{"var":"imgTable","skin":"unpack/img_table.png"}}]},{"type":"Box","props":{"y":60,"x":29,"width":506,"var":"boxCon","height":904},"child":[{"type":"Box","props":{"var":"boxTable"}}]},{"type":"HTMLDivElement","props":{"width":571,"var":"txtSpeed","innerHTML":"测试文本啊哈哈","height":23}}]}]};
		override protected function createChildren():void {
			View.regComponent("HTMLDivElement",HTMLDivElement);
			super.createChildren();
			createView(uiView);

		}

	}
}