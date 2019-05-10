module game {
	export class LoginManager extends DLG.BaseAction {

		private static _instance: LoginManager
		/**是否加载完main资源 */
		public loadMainRes: boolean;
		public loadPanelShowOk:boolean;
		public isloginSuccess: boolean;
		/**是否加载完配置文件 */
		public cfgLoaded: boolean;
		/**协议id类 */
		// public cmdCode: CmdCode = new CmdCode();
		/**登录用户名 */
		public loginUserName: string;
		/**平台标识 */
		public agent: string = "debug";
		/**平台服务器的LINUX时间戳(为长整数, 单位为秒) */
		public time: string = "0";
		/**1成年,0未成年,-1未知 */
		public isadult: string = "0";
		/**全小写MD5验证码 */
		public sign: string = "0";
		/**登陆类型 */
		public logintype: string = "0";
		/**平台数据 */
		public agentPlusdata: string = "0";
		/**token */
		public token: string = "0";
		/**区服 */
		public qufu: string[] = new Array();
		/**区服数据 */
		private serverDataArr: Array<any>;
		/**选中区服id */
		public selectServerId: number = 1;

		public constructor() {
			super();
			//this.createSocket();
			this.createPanelMar();
		}

		public static getInstance(): LoginManager {
			if (!this._instance) {
				this._instance = new LoginManager();
			}
			return this._instance;
		}
		
		/**获取区服数据 */
		public getServerData(): Array<any> {
			if (!this.serverDataArr) {
				this.serverDataArr = [];
				let list: Array<ServerCfg> = ServerTable.getDataVec<ServerCfg>();
				let i: number = 0;
				let iLen: number = list.length;
				for (i = 0; i < iLen; i++) {
					let obj: any = {};
					obj = { serverId: list[i].id, isNew: false, serverIp: list[i].config };
					this.serverDataArr.push(obj)
				}
				DLG.SortTools.sortMap(this.serverDataArr, 'serverId', true);
				let obj2 = this.serverDataArr[this.serverDataArr.length - 1];
				obj2.isNew = true;
			}
			return this.serverDataArr;
		}

		/**注册接收协议 */
		public registProtocol(): void {
			this.m_socket.onDataCallback(CmdCode.ACK_LoginSuccess, '', this.loginSuccess, this);
			this.m_socket.onDataCallback(CmdCode.ACK_LoginFailed, '', this.loginFailed, this);
			this.m_socket.onDataCallback(CmdCode.ACK_Character, '', this.receiveCharacter, this);
			this.m_socket.onDataCallback(CmdCode.ACK_APersonOpt, "dinghao", this.dinghaoInfo, this);//顶号消息
		}

		/**本地登录消息发送 */
		public reqlogin(serverid: number, loginUserName: string, loginPassword: string): void {
			let sendData = new GLoginM();
			sendData.name = loginUserName;
			sendData.password = loginPassword;
			sendData.serverid = serverid;
			//发送本地登录消息
			this.m_socket.onSend(CmdCode.REQ_LOGIN, sendData);
		}

		/**发送网络登陆消息 */
		public reqloginForPlatform(): void {
			let sendData = new GLoginForPlatformM();
			sendData.serverId = this.selectServerId;
			sendData.username = this.loginUserName;
			//平台标识
			sendData.agent = this.agent;
			//平台服务器的LINUX时间戳(为长整数, 单位为秒)
			sendData.time = this.time;
			//1成年,0未成年,-1未知
			sendData.isadult = this.isadult;
			//全小写MD5验证码
			sendData.sign = this.sign;
			//登陆类型
			sendData.logintype = this.logintype;
			//平台数据
			sendData.agentPlusdata = this.agentPlusdata;
			//token
			sendData.token = this.token;
			this.m_socket.onSend(CmdCode.REQ_LoginForPlatform, sendData);
		}

		/**接收角色相关消息，判断是否有角色 */
		public receiveCharacter(obj: any): void {
			let playerId = Number(obj.playerId);
			if (playerId <= 0) {
				//没有账号 显示创角界面
				// LoginManager.getInstance().showCreateRoleView();
				this.m_panelMar.show(PanelClassConfig.ID_CreateRolePanel);
			} else {
				//发送选角消息
				let sendData = new GSelectCharacterM();
				sendData.playerId = playerId;
				this.m_socket.onSend(CmdCode.REQ_SelectCharacter, sendData);
			}		
		}

		protected loginMapId:number
		/**接收登录成功消息 */
		public loginSuccess(obj: any): void {
			//发送加载完成消息
			
			this.loginMapId = Number(obj.mapId);
			let sendData = new GLoadFinishM();
			sendData.type = 0;
			sendData.width = 480;
			sendData.height = 800;
			this.m_socket.onSend(CmdCode.REQ_GLoadFinish, sendData);
			
			this.isloginSuccess = true;
			this.checkComeInGame();
		}
		
		/**进入游戏 */
		public checkComeInGame(): void {
			if (this.cfgLoaded && this.loadMainRes /*&& this.isloginSuccess*/) {
				this.m_panelMar.show(PanelClassConfig.ID_MainUiPanel);
				/**进入游戏场景 */
				this.loginMapId = 100006;
				this.m_panelMar.closeAll();
				this.m_panelMar.show(PanelClassConfig.ID_WelcomePanel);
				new SceneWindow();
				SceneManager.getInstance().changeMap(this.loginMapId,false);
				let attr: AttrData = new AttrData();
				attr.setValue(Enum_Attr.hp, 100);
				attr.setValue(Enum_Attr.totalHp, 100);
				attr.setValue(Enum_Attr.attack, 1000);
				HeroManager.getInstance().addRole(0, 'player1', ENUM_JOB_TYPE.job_ZS, attr, [10001, 10002, 10003, 10004, 10005, 10006, 10007, 10008, 10009, 10010,10011]);
				HeroManager.getInstance().addRole(1, 'player1', ENUM_JOB_TYPE.JOB_GJS, attr, [11001, 11002, 11003, 11004, 11005, 11006, 11007, 11008, 11009, 11010,11011]);
				if (Math.random() > 0.5)
					HeroManager.getInstance().addRole(2, 'player1', ENUM_JOB_TYPE.JOB_CK, attr, [12001, 12002, 12003, 12004, 12005, 12006, 12007, 12008, 12009, 12010,12011,12012]);
				if (Math.random() > 0.5)
					HeroManager.getInstance().addRole(3, 'player1', ENUM_JOB_TYPE.JOB_FS, attr, [13001, 13002, 13003, 13004, 13005, 13006, 13007, 13008, 13009]);
				if (Math.random() > 0.5)
					HeroManager.getInstance().addRole(4, 'player1', ENUM_JOB_TYPE.JOB_WS, attr, [14001, 14002, 14003, 14004, 14005, 14006, 14007, 14008, 14009, 14010,14011,14012]);
			}
		}

		/**接收登录失败消息 */
		public loginFailed(type: string, arr: string[]): void {
		}

		/**接收顶号消息 */
		public dinghaoInfo(type: string, arr: string[]): void {
			//显示顶号面板
		}

	}
}