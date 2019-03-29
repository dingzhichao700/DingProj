var egret;
(function (egret) {
    /**
     * 用户数据
     */
    var UserData = (function () {
        function UserData() {
            /**
             * 用户基本信息
             * @type {egret.UserInfoVo}
             */
            this.userInfoVo = new egret.UserInfoVo();
        }
        var __egretProto__ = UserData.prototype;
        return UserData;
    })();
    egret.UserData = UserData;
    UserData.prototype.__class__ = "egret.UserData";
})(egret || (egret = {}));
