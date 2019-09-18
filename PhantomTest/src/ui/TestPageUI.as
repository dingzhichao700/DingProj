/**Created by the LayaAirIDE,do not modify.*/
package ui {
	import laya.ui.*;
	import laya.display.*; 

	public class TestPageUI extends View {
		public var boxProto:Box;
		public var boxCon:Box;
		public var btnEnter:Button;
		public var clip:Clip;
		public var btnClose:Button;
		public var boxCopy:Box;

		public static var uiView:Object =/*[STATIC SAFE]*/{"type":"View","props":{"width":640,"height":1180},"child":[{"type":"Box","props":{"var":"boxProto"},"child":[{"type":"Box","props":{"y":103,"x":47,"var":"boxCon"},"child":[{"type":"Button","props":{"y":43,"x":32,"width":150,"var":"btnEnter","skin":"comp/button.png","sizeGrid":"4,4,4,4","label":"点我赋值","height":37}},{"type":"Clip","props":{"y":52,"var":"clip","skin":"comp/clip_num.png","clipX":10}},{"type":"Button","props":{"x":162,"var":"btnClose","skin":"comp/btn_close.png","name":"close"}}]}]},{"type":"Box","props":{"y":0,"var":"boxCopy","centerX":0}}]};
		override protected function createChildren():void {
			super.createChildren();
			createView(uiView);

		}

	}
}