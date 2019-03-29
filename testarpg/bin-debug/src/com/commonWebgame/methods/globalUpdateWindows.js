var egret;
(function (egret) {
    /**
     * globalUpdate <br/>
     * @author Dempsey <br/>
     * 2013-8-10
     */
    /**
     * 全局更新，调用已注册相关全局更新类型的IWindow的globalUpdate()方法，对象不在舞台时忽略
     * @param updateTypes:Array 全局更新类型
     * @param args 传递给globalUpdate()方法的参数列表
     * @see IWindow.globalUpdate
     * @see IWindow.addUpdateType
     */
    function globalUpdateWindows(updateTypes) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        args.unshift(updateTypes);
        egret.ApplicationManager.getInstance().globalUpdate.apply(egret.ApplicationManager.getInstance(), args);
    }
    egret.globalUpdateWindows = globalUpdateWindows;
})(egret || (egret = {}));
