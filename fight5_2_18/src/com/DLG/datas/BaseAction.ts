module DLG {
	export class BaseAction implements IBaseAction{

		protected m_socket:Socket;
		protected m_clock:ClockManager;
		protected m_event:EventManager;
		// protected m_animate:AnimateTimer;
		protected m_lan:LanguageManager;
		protected m_sound:SoundManager;
		protected m_panelMar: PanelManager;
		
		public constructor() {
			
		}
		protected createSocket():void
		{
			this.m_socket = DLG.DLGCore.socket;
		}
		protected createClock(): void
		{
			this.m_clock = DLG.DLGCore.clock;
		}
		protected createEvent():void
		{
			this.m_event = DLG.DLGCore.event;
		}
		// protected createAnimate(): void
		// {
		// 	this.m_animate = DLG.DLGCore.animateTimer;
		// }
		protected createLan():void
		{
			this.m_lan = DLG.DLGCore.lan;
		}
		protected createSound(): void
		{
			this.m_sound = DLG.DLGCore.sound;
		}
		protected createPanelMar(): void
		{
			this.m_panelMar = DLG.DLGCore.panel;
		}
		public onExecute(...param)
		{

		}
		public onDestroy(): void
		{
			let self = this;
			if(self.m_socket) self.m_socket = null;
			if(self.m_clock) self.m_clock = null;
			if(self.m_event) self.m_event = null;
			// if(self.m_animate) self.m_animate = null;
			if(self.m_lan) self.m_lan = null;
			if(self.m_sound) self.m_sound = null;
			if(self.m_panelMar) self.m_panelMar = null;
		}
	}
}