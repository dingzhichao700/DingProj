function debug(message?: any, ...optionalParams: any[]) {
    if ( DEBUG ) {
        if (optionalParams) {
			// if (NativeHelper.isNative()) {
			//     egret.log("nav-sdk-DLG:" + message, ...optionalParams);
			// } else {
				console.log(message, ...optionalParams);
				// egret.log(message, ...optionalParams);
			// }
		} else {
			console.log(message);
			// egret.log(message);
		}
    }
}

function sayError(message?: any, ...optionalParams: any[]) {
	if (DEBUG)
	{
		if (optionalParams)
			console.error(message, ...optionalParams);
		else 
			console.log(message);
	}
}
module DLG {
	export class DLGCore {
		public static stage: egret.Stage;
		/**语言包 */
		public static lan:LanguageManager;
		/**声音 */
		public static sound:SoundManager;
		/**动画播放控制器 */
		// public static animateTimer:AnimateTimer;

		public static event:EventManager;

		// public static httpClient:DLG.HttpClient;
		public static clock:ClockManager
		public static socket:Socket;

		public static panel: PanelManager;
		
		public static loader: LoadManager;


		public static init(stage: egret.Stage):void
		{
			let self = this;
			self.stage = stage;
			self.event = new EventManager();
			// self.httpClient = new HttpClient('');
			self.sound = new SoundManager();
			self.sound.initSoundList();
			// self.animate = new AnimateTimer();
			self.lan = new LanguageManager();
			self.socket = new Socket;
			self.panel = new PanelManager();
			self.clock = new ClockManager();
			self.loader = new LoadManager();
			
		}
	}
}