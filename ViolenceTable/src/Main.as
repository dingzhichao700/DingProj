package {
	import laya.events.Event;
	import laya.utils.Handler;
	import laya.webgl.WebGL;

	import module.GameScene;

	public class Main {

		private var loadCount:int;
		private const loadList:Array = ["comp", "ball"];

		public function Main() {
			//去除矢量锯齿
			Laya.Config.isAntialias = true;
			//初始化引擎
			Laya.init(1920, 1080, WebGL);
//			Laya.stage.frameRate = "slow";

			//激活资源版本控制
//            ResourceVersion.enable("version.json", Handler.create(this, beginLoad), ResourceVersion.FILENAME_VERSION);

			loadCount = 0;
			for (var i:int = 0; i < loadList.length; i++) {
				var url:String = loadList[i];
				Laya.loader.load("res/" + url + ".atlas", Handler.create(this, onLoaded));
			}
		}

		private function onLoaded(e:Event):void {
			loadCount++;
			if (loadCount == loadList.length) {
				Laya.stage.addChild(GameScene.getInstance());
				GameScene.getInstance().init();
			}
		}

	}
}
