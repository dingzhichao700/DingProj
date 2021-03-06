var egret;
(function (egret) {
    var PathData = (function () {
        /**
         * 构造函数
         */
        function PathData() {
            /**
             * 网站路径
             */
            this.rootPath = "";
        }
        var __egretProto__ = PathData.prototype;
        //
        PathData.getInstance = function () {
            return PathData._instance || (PathData._instance = new PathData());
        };
        //
        /**
         * 获取资源地址
         * @param pathType:string 资源路径文件夹(语言版本下的子路径，后面要带"/")
         * @param fileName:string = null 资源名称，为空时返回路径地址
         * @return
         *
         */
        __egretProto__.getResourceUrl = function (pathType, fileName) {
            if (fileName === void 0) { fileName = null; }
            var url = this.rootPath + PathData.PATH_RESOURCE + pathType;
            if (fileName)
                url += fileName; /* +
                "?version=" + WebData.getInstance().configLo.version;*/
            return url;
        };
        //
        /**
         * 组装路径串 ，如参数为"images","head"返回 "images/head/"，如果参数已存在"/"，则不添加"/"
         * @param args
         * @return
         *
         */
        __egretProto__.getPathComponent = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var path = "";
            var length = args.length;
            for (var i = 0; i < length; i++) {
                var v = args[i];
                path += v;
                if (v.indexOf("/") == -1)
                    path += "/";
            }
            return path;
        };
        PathData._instance = null;
        /**
         * 资源路径
         */
        PathData.PATH_RESOURCE = "resource/";
        /**
         * 模块资源路径
         */
        PathData.PATH_RESOURCE_MODULE = "modules/";
        /**
         * 动作影片根路径
         */
        PathData.PATH_MOVIES = "movies/";
        /**
         * 通用资源路径
         */
        PathData.PATH_RESOURCE_COMMON = PathData.PATH_RESOURCE_MODULE + "common/";
        /**
         * 图片根路径
         */
        PathData.PATH_IMAGES = "images/";
        /**
         * 声音根路径
         */
        PathData.PATH_SOUND = "sound/";
        /**
        * 通用图片路径
        */
        PathData.PATH_IMAGES_COMMON = PathData.PATH_IMAGES + "common/";
        /**
         * 玩家头像图片根路径
         */
        PathData.PATH_IMAGES_ROLD_HEAD = PathData.PATH_IMAGES + "roleHead/";
        /**
         * 宠物图片根路径
         */
        PathData.PATH_IMAGES_PET = PathData.PATH_IMAGES + "pet/";
        /**
         * 道具图片根路径
         */
        PathData.PATH_IMAGES_PROP = PathData.PATH_IMAGES + "prop/";
        /**
         * 场景相关图片根路径
         */
        PathData.PATH_IMAGES_SCENE = PathData.PATH_IMAGES + "scene/";
        /**
         * 图片根路径
         */
        PathData.PATH_RESOURCE_IMAGES = "images/";
        /**
         * 预加载语言包路径
         */
        PathData.PATH_XML_PRE_LANGUAGE = "preLanguage/";
        /**
         * 宠物动作影片路径
         */
        PathData.PATH_MOVIES_PET = PathData.PATH_MOVIES + "pet/";
        /**
         * 怪物动作影片路径
         */
        PathData.PATH_MOVIES_MONSTER = PathData.PATH_MOVIES + "monster/";
        /**
         * 特效动作影片路径
         */
        PathData.PATH_MOVIES_EFFECT = PathData.PATH_MOVIES + "effect/";
        /**
         * 技能动作影片路径
         */
        PathData.PATH_MOVIES_SKILL = PathData.PATH_MOVIES + "skill/";
        /**
         * 玩家动作影片路径
         */
        PathData.PATH_MOVIES_PLAYER = PathData.PATH_MOVIES + "player/";
        /**
         * 武器动作影片路径
         */
        PathData.PATH_MOVIES_WEAPON = PathData.PATH_MOVIES + "weapon/";
        /**
         * 翅膀动作影片路径
         */
        PathData.PATH_MOVIES_WING = PathData.PATH_MOVIES + "wing/";
        /**
         * 坐骑动作影片路径
         */
        PathData.PATH_MOVIES_MOUNTS = PathData.PATH_MOVIES + "mounts/";
        /**
         * 资源标记数据路径
         */
        PathData.PATH_XML_RESOURCE_MARK = "resourceMark/";
        /**
         * 通用动作影片路径
         */
        PathData.PATH_MOVIES_COMMON = PathData.PATH_MOVIES + "common/";
        /**
         * 地图数据路径
         */
        PathData.PATH_MAP_DATA = "mapData/";
        /**
         * 地图路径
         */
        PathData.PATH_MAP = "map/";
        return PathData;
    })();
    egret.PathData = PathData;
    PathData.prototype.__class__ = "egret.PathData";
})(egret || (egret = {}));
//# sourceMappingURL=PathData.js.map