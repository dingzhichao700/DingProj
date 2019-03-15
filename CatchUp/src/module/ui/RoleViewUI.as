/**Created by the LayaAirIDE,do not modify.*/
package module.ui {
	import laya.ui.*;
	import laya.display.*; 

	public class RoleViewUI extends View {
		public var imgHead:Image;
		public var imgBody:Image;
		public var imgTalk:Image;
		public var txtTalk:Label;

		public static var uiView:Object =/*[STATIC SAFE]*/{"type":"View","props":{"width":100,"height":180},"child":[{"type":"Image","props":{"y":25,"x":19,"width":53,"var":"imgHead","skin":"images/head_1.png","height":52}},{"type":"Image","props":{"y":0,"x":45,"var":"imgBody","skin":"images/girl_0.png","pivotX":45}},{"type":"Image","props":{"y":-98,"x":-66,"var":"imgTalk","skin":"images/imgDialog.png"},"child":[{"type":"Label","props":{"y":15,"x":12,"wordWrap":true,"width":137,"var":"txtTalk","text":"冰冰我们中奖了，下次跑快点","leading":3,"height":55,"fontSize":18,"font":"Microsoft YaHei","color":"#ffffff"}}]}]};
		override protected function createChildren():void {
			super.createChildren();
			createView(uiView);

		}

	}
}