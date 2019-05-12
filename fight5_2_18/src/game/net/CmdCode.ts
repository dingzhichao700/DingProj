module game {
	export class CmdCode {
		/***********           发送的消息              *******/
		public static REQ_LOGIN: number = 1201;//本地登录
		public static REQ_LoginForPlatform: number = 1205;//网络登录
		public static REQ_SelectCharacter: number = 1202;//选择角色
		public static REQ_CreateCharacter: number = 1203;//创建角色
		public static REQ_GLoadFinish: number = 1204;//登录完成





		/***********           返回的消息              *******/
		public static ACK_Character: number = 1101;//玩家角色信息列表
		public static ACK_LoginSuccess: number = 1102;//登录成功消息协议
		public static ACK_LoginFailed: number = 1106;//登录失败消息协议
		public static ACK_MyInfo: number = 2100;//玩家自己信息
		public static ACK_APersonOpt: number = 2170;

		public constructor() {
		}
	}
}