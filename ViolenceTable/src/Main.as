package {
	
	import laya.display.Sprite;
	import laya.display.Stage;
	import laya.events.Event;
	import laya.utils.Handler;
	import laya.webgl.WebGL;
	
	import main.module.scene.SceneControl;

	public class Main {

		private var loadCount:int;
		private const loadList:Array = ["comp", "ball"];

		public function Main() {
			//去除锯齿
			Laya.Config.isAntialias = true;
			//初始化引擎
			Laya.init(768, 1024, WebGL);
			Laya.stage.scaleMode = Stage.SCALE_FIXED_AUTO;
//			DebugPanel.init();
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
				console.log("预加载图集完成，耗时：");
				SceneControl.ins.init();
//				GameScene.getInstance().init();
//				Laya.stage.addChild(GameScene.getInstance());
			}
		}

	}
}
