module egret{
    export class UserInfoVo extends BaseVo{
        /**
         * 用户id
         * @type {number}
         */
        public id:number = 1111111111;
        /**
        * 用户平台id
        * @type {number}
        */
        public pid:number = 0;
        /**
         * 平台用户名(可能为空)
         */
        public userName:string = "";
        /**
         * 用户平台头像url(可能为空)
         * @type {string}
         */
        public pic:string = "";
        /**
         * 游戏昵称(默认为平台用户名)
         * @type {string}
         */
        public nickname:string = "";
        public sex:number = SexType.MALE;
        /**
         * 服务器标识 1-N
         */
        public serverId:number = 1;
        /**
         * 职业
         * @type {egret.VocationType}
         */
        public vocation:number = VocationType.WARRIOR;
        /**
         * 等级
         * @type {number}
         */
        public level:number = 1;
        /**
         * 金币
         * @type {number}
         */
        public gold:number = 11110;
        /**
         * 积分(充值rmb)
         * @type {number}
         */
        public rmb:number = 0;
        /**
         * 当前等级经验
         * @type {number}
         */
        public exp:number = 0;
        /**
         * 当前自然收益倍数
         * @type {number}
         */
        public income:number = 1;
        public incomeBuff:number = 0;
        public incomeFriend:number = 0;

        public incomeBuffEndTime:number = 0;

        public uavPower:number = 0;
        public kankeBeginTime:number = 0;
        public kankeEndTime:number = 0;

        public giftTake:string;
        public guideData:string;// = "101,102,103,104";
        public ranking:number = 0;

        public constructor(){
            super();

            this.className = "UserInfoVo";
        }
    }
}