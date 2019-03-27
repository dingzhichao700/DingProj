var egret;
(function (egret) {
    var UserInfoVo = (function (_super) {
        __extends(UserInfoVo, _super);
        function UserInfoVo() {
            _super.call(this);
            /**
             * 用户id
             * @type {number}
             */
            this.id = 1111111111;
            /**
            * 用户平台id
            * @type {number}
            */
            this.pid = 0;
            /**
             * 平台用户名(可能为空)
             */
            this.userName = "";
            /**
             * 用户平台头像url(可能为空)
             * @type {string}
             */
            this.pic = "";
            /**
             * 游戏昵称(默认为平台用户名)
             * @type {string}
             */
            this.nickname = "";
            this.sex = egret.SexType.MALE;
            /**
             * 服务器标识 1-N
             */
            this.serverId = 1;
            /**
             * 职业
             * @type {egret.VocationType}
             */
            this.vocation = egret.VocationType.WARRIOR;
            /**
             * 等级
             * @type {number}
             */
            this.level = 1;
            /**
             * 金币
             * @type {number}
             */
            this.gold = 11110;
            /**
             * 积分(充值rmb)
             * @type {number}
             */
            this.rmb = 0;
            /**
             * 当前等级经验
             * @type {number}
             */
            this.exp = 0;
            /**
             * 当前自然收益倍数
             * @type {number}
             */
            this.income = 1;
            this.incomeBuff = 0;
            this.incomeFriend = 0;
            this.incomeBuffEndTime = 0;
            this.uavPower = 0;
            this.kankeBeginTime = 0;
            this.kankeEndTime = 0;
            this.ranking = 0;
            this.className = "UserInfoVo";
        }
        var __egretProto__ = UserInfoVo.prototype;
        return UserInfoVo;
    })(egret.BaseVo);
    egret.UserInfoVo = UserInfoVo;
    UserInfoVo.prototype.__class__ = "egret.UserInfoVo";
})(egret || (egret = {}));
//# sourceMappingURL=UserInfoVo.js.map