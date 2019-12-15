package main.module.login {
	import main.module.scene.LayerManager;
	
	import ui.LoginViewUI;

	public class LoginView extends LoginViewUI {
		
		public function LoginView() {
			layer = LayerManager.LAYER_WINDOW_BIG;
		}
		
	}
}
