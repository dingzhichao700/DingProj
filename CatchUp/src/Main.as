package {
	import laya.debug.DebugPanel;
	import laya.display.Stage;
	import laya.webgl.WebGL;
	
	import module.GameScene;

	public class Main {

		public function Main() {
			
			//激活资源版本控制
//			ResourceVersion.enable("version.json", Handler.create(this, beginLoad), ResourceVersion.FILENAME_VERSION);
			//加载引擎需要的资源
//			Laya.loader.load("res/atlas/comp.atlas", Handler.create(this, onLoaded));

			Laya.init(1920, 1080, WebGL);
			Laya.stage.scaleMode = Stage.SCALE_NOSCALE;

			Laya.stage.addChild(GameScene.getInstance());
		}

	}
}
