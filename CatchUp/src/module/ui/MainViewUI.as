/**Created by the LayaAirIDE,do not modify.*/
package module.ui {
	import laya.ui.*;
	import laya.display.*; 
	import module.view.RoleView;

	public class MainViewUI extends View {
		public var txtSize:Label;
		public var boxStart:Box;
		public var head1:Image;
		public var head2:Image;
		public var head3:Image;
		public var imgRound:Image;
		public var btnStart:Image;
		public var boxGame:Box;
		public var arrow1:Image;
		public var arrow2:Image;
		public var boxPlayer:Box;
		public var imgBasket:Image;
		public var imgBang:Image;
		public var role1:RoleView;
		public var role2:RoleView;
		public var txtScore:Label;
		public var boxDrop:Box;
		public var txtGet:Label;
		public var boxEnd:Box;
		public var btnReStart:Image;
		public var txtTotal:Label;
		public var txtDesc:Label;

		public static var uiView:Object =/*[STATIC SAFE]*/{"type":"View","props":{"width":768,"height":1024},"child":[{"type":"Image","props":{"y":-115,"visible":false,"skin":"images/background.jpg","centerX":0}},{"type":"Label","props":{"y":17,"x":52,"width":241,"var":"txtSize","text":"1920x1080","strokeColor":"#191919","stroke":3,"height":112,"fontSize":30,"font":"SimHei","color":"#ffffff","align":"left"}},{"type":"Box","props":{"y":99,"width":800,"var":"boxStart","height":776,"centerX":0},"child":[{"type":"Image","props":{"skin":"images/title.png","centerX":0}},{"type":"Image","props":{"y":228,"x":225,"skin":"images/startTips.png"}},{"type":"Image","props":{"y":296,"x":102,"var":"head1","skin":"images/head_1.png"}},{"type":"Image","props":{"y":296,"var":"head2","skin":"images/head_2.png","centerX":0}},{"type":"Image","props":{"y":296,"x":532,"var":"head3","skin":"images/head_3.png"}},{"type":"Image","props":{"y":293,"x":102,"var":"imgRound","skin":"images/img_round.png"}},{"type":"Image","props":{"y":468,"x":145,"skin":"images/name_1.png"}},{"type":"Image","props":{"y":468,"skin":"images/name_2.png","centerX":0}},{"type":"Image","props":{"y":468,"x":580,"skin":"images/name_3.png"}},{"type":"Image","props":{"y":614,"var":"btnStart","skin":"images/btnStart.png","centerX":0}}]},{"type":"Box","props":{"y":0,"x":22,"width":723,"var":"boxGame","height":1024},"child":[{"type":"Image","props":{"y":420,"x":0,"var":"arrow1","skin":"images/arrowLeft.png"}},{"type":"Image","props":{"y":420,"x":609,"var":"arrow2","skin":"images/arrowRight.png"}},{"type":"Box","props":{"y":849,"x":223,"width":280,"var":"boxPlayer","height":175},"child":[{"type":"Image","props":{"y":61,"x":62,"width":150,"var":"imgBasket","skin":"images/basket.png","height":113}},{"type":"Image","props":{"y":-33,"x":16,"width":250,"visible":false,"var":"imgBang","skin":"images/bang.png","height":168}},{"type":"RoleView","props":{"var":"role1","runtime":"module.view.RoleView"}},{"type":"RoleView","props":{"y":0,"x":193,"var":"role2","runtime":"module.view.RoleView"}},{"type":"Label","props":{"y":51,"x":58,"width":157,"var":"txtScore","text":"+1000","stroke":0,"height":33,"fontSize":40,"font":"SimHei","color":"#fdfda2","bold":true,"align":"center"}}]},{"type":"Box","props":{"y":0,"x":0,"var":"boxDrop"}},{"type":"Label","props":{"y":17,"x":425,"width":278,"var":"txtGet","text":"投资收益：$123456","strokeColor":"#191919","stroke":3,"height":25,"fontSize":30,"font":"SimHei","color":"#ffffff","align":"right"}}]},{"type":"Box","props":{"y":212,"x":118,"width":513,"var":"boxEnd","height":638},"child":[{"type":"Image","props":{"y":43,"x":133,"skin":"images/gameOverTitle.png"}},{"type":"Image","props":{"y":138,"x":42,"skin":"images/gameOverBg.png"}},{"type":"Image","props":{"y":183,"x":88,"skin":"images/gameOverSubTitle.png"}},{"type":"Image","props":{"y":460,"x":214,"width":110,"var":"btnReStart","skin":"images/btnRestart.png","height":112}},{"type":"Label","props":{"y":186,"x":331,"width":99,"var":"txtTotal","text":"1000","strokeColor":"#d76308","stroke":5,"height":41,"fontSize":40,"font":"SimHei","color":"#ffe000","bold":true,"align":"left"}},{"type":"Label","props":{"y":245,"x":85,"wordWrap":true,"width":349,"var":"txtDesc","text":"XX帮你获得了$AAA创业基金，击败了全国1%的创业者，加油你即将成功下一个马云！","strokeColor":"#737373","stroke":4,"leading":8,"height":142,"fontSize":25,"font":"Microsoft YaHei","color":"#ffffff","bold":true,"align":"left"}}]}]};
		override protected function createChildren():void {
			View.regComponent("module.view.RoleView",RoleView);
			super.createChildren();
			createView(uiView);

		}

	}
}