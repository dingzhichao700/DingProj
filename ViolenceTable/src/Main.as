package {
	import laya.utils.Handler;
	import laya.webgl.WebGL;
	
	import module.GameScene;

	public class Main {

		public function Main() {
			//去除矢量锯齿
			Laya.Config.isAntialias = true;
			//初始化引擎
			Laya.init(1920, 1080, WebGL);
//			Laya.stage.frameRate = "slow";

			//激活资源版本控制
//            ResourceVersion.enable("version.json", Handler.create(this, beginLoad), ResourceVersion.FILENAME_VERSION);
			Laya.loader.load("res/ball.atlas", Handler.create(this, onLoaded));
		}

		private function onLoaded():void {
			Laya.stage.addChild(GameScene.getInstance());
			GameScene.getInstance().init();
		}

	}
}
