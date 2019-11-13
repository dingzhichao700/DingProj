/**Created by the LayaAirIDE,do not modify.*/
package main.ui {
	import laya.ui.*;import laya.display.*; 
	import laya.html.dom.HTMLDivElement;

	public class TableViewUI extends View {
		public var imgBg:Image;
		public var boxScene:Box;
		public var boxCon:Box;
		public var boxTable:Box;
		public var txtSpeed:HTMLDivElement;

		public static var uiView:Object =/*[STATIC SAFE]*/{"type":"View","props":{"width":768,"height":1080},"child":[{"type":"Image","props":{"var":"imgBg","skin":"unpack/img_bg.jpg","height":1080,"centerY":0,"centerX":0}},{"type":"Box","props":{"width":572,"var":"boxScene","height":980,"centerY":0,"centerX":0},"child":[{"type":"Box","props":{"y":0,"x":0,"width":500,"var":"boxCon","height":904},"child":[{"type":"Box","props":{"var":"boxTable"}}]}]},{"type":"HTMLDivElement","props":{"y":11,"x":106,"width":472,"var":"txtSpeed","innerHTML":"测试文本啊哈哈","height":39}}]};
		override protected function createChildren():void {
			View.regComponent("HTMLDivElement",HTMLDivElement);
			super.createChildren();
			createView(uiView);

		}

	}
}