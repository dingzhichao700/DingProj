var egret;
(function (egret) {
    var LocalData = (function () {
        /**
         * 构造函数
         */
        function LocalData() {
            //数据表
            this._hashMap = null;
            //lo表
            this._loMap = null;
            //数据是否已解析完成
            this._parseCompleted = false;
            this._loMap = new egret.HashMap();
            this._hashMap = new egret.HashMap();
            //映射文件名和lo
            this._loMap.put(egret.LocalDataFileName.MONSTER, egret.MonsterLo);
        }
        var __egretProto__ = LocalData.prototype;
        Object.defineProperty(__egretProto__, "parseCompleted", {
            //
            /**
             * 基础数据是否已解析完成
             * @return
             *
             */
            get: function () {
                return this._parseCompleted;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 单例
         * @return
         *
         */
        LocalData.getInstance = function () {
            return LocalData._instance || (LocalData._instance = new LocalData());
        };
        //
        /**
         * 设置基础数据
         * @param data:Object
         *
         */
        __egretProto__.parseData = function () {
            var loopId = egret.EnterFrameManager.getInstance().addExecute(nextFile, this, 1);
            var map = null;
            var vector = null;
            var fileNames = [];
            var length = 0;
            var lo = null;
            var cls = null;
            for (var fileName in this._loMap.content) {
                fileNames.push(fileName);
            }
            var index = -1;
            //读取下一个文件数据
            function nextFile() {
                index++;
                if (index >= fileNames.length) {
                    this._parseCompleted = true;
                    return;
                }
                map = new egret.HashMap();
                fileName = fileNames[index];
                this._hashMap.put(fileName, map);
                cls = this._loMap.get(fileName);
                if (cls) {
                    vector = this.getDataVector(egret.getRes(fileName), cls);
                    RES.destroyRes(fileName);
                    length = vector.length;
                    for (var i = 0; i < length; i++) {
                        lo = vector[i];
                        if ("id" in lo) {
                            if (map.containsKey(lo.id)) {
                                egret.LogManager.error(this, "基础数据有误，id字段重复,fileName = " + fileName + ",id = " + lo.id);
                            }
                            else {
                                map.put(lo.id, lo);
                            }
                        }
                        else {
                            egret.LogManager.error(this, "基础数据有误，找不到id字段 fileName = " + fileName);
                        }
                    }
                }
                else {
                    egret.LogManager.error(this, "文件名 fileName = " + fileName + " 未注册Lo类");
                }
                egret.EnterFrameManager.getInstance().removeExecute(loopId);
                loopId = egret.EnterFrameManager.getInstance().addExecute(nextFile, this, 1);
            }
        };
        //
        /**
         * 获取数据数组
         * @param fileName:String 文件名，不包括后缀
         * @param parseClass:Class 将数据项目解析为此类实例
         * @return 有数据返回Vector数组，否则返回null，注意：对于同一文件，数据只能获取一次，获取后删除
         *
         */
        __egretProto__.getDataVector = function (data, parseClass) {
            if (data) {
                var vector = [];
                var length = data.length;
                var item = null;
                for (var i = 0; i < length; i++) {
                    item = new parseClass();
                    vector.push(item);
                    for (var key in data[i]) {
                        item[key] = data[i][key];
                    }
                }
                if (vector.length == 0) {
                    egret.LogManager.error(this, "本地数据文件没有数据项" + parseClass);
                }
                return vector;
            }
            else {
                egret.LogManager.error(this, "找不到本地数据文件" + parseClass);
            }
            return null;
        };
        //
        /**
         * 获取lo数据
         * @param fileName:String 文件名
         * @param id:int 数据id
         * @return
         *
         */
        __egretProto__.getLoById = function (fileName, id) {
            if (id === void 0) { id = 0; }
            var map = this.getHashMap(fileName);
            if (!map || !map.containsKey(id)) {
                egret.LogManager.error(this, "找不到基础数据: fileName = " + fileName + ",id = " + id);
                var cls = this._loMap.get(fileName);
                if (cls)
                    return new cls();
            }
            return map.get(id);
        };
        //
        /**
         * 获取文件名对应的数据表
         * @param fileName:String 文件名，不包括后缀
         * @return
         * @see LocalDataFileName
         */
        __egretProto__.getHashMap = function (fileName) {
            var map = this._hashMap.get(fileName);
            if (!map) {
                egret.LogManager.error(this, "找不到基础数据表: fileName = " + fileName);
                map = new egret.HashMap();
            }
            return map;
        };
        //
        /**
         * 获取 MonsterLo 数据
         * @param id:int 数据id
         * @return
         *
         */
        __egretProto__.getMonsterLo = function (id) {
            return this.getLoById(egret.LocalDataFileName.MONSTER, id);
        };
        //
        /**
         * 获取 RoleBornPointLo 数据
         * @param id:int 数据id
         * @return
         *
         */
        __egretProto__.getRoleBornPointLo = function (id) {
            return this.getLoById(egret.LocalDataFileName.ROLE_BORN_POINT, id);
        };
        //
        /**
         * 获取SceneLo数据
         * @param id:int 数据id
         * @return
         *
         */
        __egretProto__.getSceneLo = function (id) {
            return this.getLoById(egret.LocalDataFileName.SCENE, id);
        };
        //单例
        LocalData._instance = null;
        return LocalData;
    })();
    egret.LocalData = LocalData;
    LocalData.prototype.__class__ = "egret.LocalData";
})(egret || (egret = {}));
