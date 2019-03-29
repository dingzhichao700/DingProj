var egret;
(function (egret) {
    /**
     * 同步方式获取缓存的已经加载成功的资源。<br/>
     * @method RES.getRes
     * @param key {string} 对应配置文件里的name属性或sbuKeys属性的一项。
     * @returns {any}
     */
    function getRes(key) {
        return RES.getRes(key);
    }
    egret.getRes = getRes;
})(egret || (egret = {}));
