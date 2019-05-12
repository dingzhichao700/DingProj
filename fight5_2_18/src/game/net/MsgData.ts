module game {
    export class MsgData {
        public msgid: number;
        public ret: number;
        public serial: number;
        public data: any;
    }
    export class GLoginM {
        //服务器ID
        public serverid: number;
        //角色名字
        public name: string;
        //密码
        public password: string;
    }
    export class GLoginForPlatformM {
        //服务器Id
        public serverId: number;

        //玩家用户名
        public username: string;

        //平台标识
        public agent: string;

        //平台服务器的LINUX时间戳(为长整数, 单位为秒)
        public time: string;

        //1成年,0未成年,-1未知
        public isadult: string;

        //全小写MD5验证码
        public sign: string;

        //登陆类型
        public logintype: string;

        //平台数据
        public agentPlusdata: string;

        //token
        public token: string;
    }
    export class GSelectCharacterM {
        //角色Id
        public playerId: number;
    }
    export class GCreateCharacterM {
        //角色名字
        public name: string;
        //角色性别  1-男  2-女
        public sex: number;
        //是否自动生成
        public auto: number;
        //角色头像
        public icon: string;
    }
    export class GLoadFinishM {
        //类别
        public type: number;
        //屏幕宽度
        public width: number;
        //屏幕高度
        public height: number;
    }
}