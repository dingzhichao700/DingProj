
module egret {

	export class PathData{
		private static _instance:PathData = null;
		/**
		 * 网站路径
		 */ 
        public rootPath: string = "";
		/**
		 * 资源路径 
		 */		
		public static PATH_RESOURCE:string = "resource/";
		/**
		 * 模块资源路径 
		 */		
		public static PATH_RESOURCE_MODULE:string = "modules/";
		/**
		 * 动作影片根路径
		 */
		public static PATH_MOVIES:string = "movies/";
		/**
		 * 通用资源路径 
		 */		
		public static PATH_RESOURCE_COMMON:string = PathData.PATH_RESOURCE_MODULE + "common/";
		/**
		 * 图片根路径  
		 */		
		public static PATH_IMAGES:string = "images/";
		/**
		 * 声音根路径
		 */
		public static PATH_SOUND:string = "sound/";
        /**
        * 通用图片路径  
        */		
        public static PATH_IMAGES_COMMON:string = PathData.PATH_IMAGES + "common/";
		/**
		 * 玩家头像图片根路径
		 */
		public static PATH_IMAGES_ROLD_HEAD:string = PathData.PATH_IMAGES + "roleHead/";
		/**
		 * 宠物图片根路径
		 */
		public static PATH_IMAGES_PET:string = PathData.PATH_IMAGES + "pet/";
		/**
		 * 道具图片根路径
		 */
		public static PATH_IMAGES_PROP:string = PathData.PATH_IMAGES + "prop/";
		/**
		 * 场景相关图片根路径
		 */
		public static PATH_IMAGES_SCENE:string = PathData.PATH_IMAGES + "scene/";
		/**
		 * 图片根路径
		 */
		public static PATH_RESOURCE_IMAGES:string = "images/";
		/**
		 * 预加载语言包路径
		 */
		public static PATH_XML_PRE_LANGUAGE:string = "preLanguage/";
		/**
		 * 宠物动作影片路径
		 */
		public static PATH_MOVIES_PET:string = PathData.PATH_MOVIES + "pet/";
		/**
		 * 怪物动作影片路径
		 */
		public static PATH_MOVIES_MONSTER:string = PathData.PATH_MOVIES + "monster/";
		/**
		 * 特效动作影片路径
		 */
		public static PATH_MOVIES_EFFECT:string = PathData.PATH_MOVIES + "effect/";
		/**
		 * 技能动作影片路径
		 */
		public static PATH_MOVIES_SKILL:string = PathData.PATH_MOVIES + "skill/";
		/**
		 * 玩家动作影片路径
		 */
		public static  PATH_MOVIES_PLAYER:string = PathData.PATH_MOVIES + "player/";
		/**
		 * 武器动作影片路径
		 */
		public static  PATH_MOVIES_WEAPON:string = PathData.PATH_MOVIES + "weapon/";
		/**
		 * 翅膀动作影片路径
		 */
		public static  PATH_MOVIES_WING:string = PathData.PATH_MOVIES + "wing/";
		/**
		 * 坐骑动作影片路径
		 */
		public static  PATH_MOVIES_MOUNTS:string = PathData.PATH_MOVIES + "mounts/";
		/**
		 * 资源标记数据路径 
		 */		
		public static PATH_XML_RESOURCE_MARK:string = "resourceMark/";
		/**
		 * 通用动作影片路径 
		 */		
		public static PATH_MOVIES_COMMON:string = PathData.PATH_MOVIES + "common/";
		/**
		 * 地图数据路径 
		 */		
		public static PATH_MAP_DATA:string = "mapData/";
		/**
		 * 地图路径 
		 */		
		public static PATH_MAP:string = "map/";

		
		/**
		 * 构造函数
		 */
		public constructor(){
			
		}
		//
		public static getInstance():PathData{
			return PathData._instance || (PathData._instance = new PathData());
		}
		//
		/**
		 * 获取资源地址 
		 * @param pathType:string 资源路径文件夹(语言版本下的子路径，后面要带"/")
		 * @param fileName:string = null 资源名称，为空时返回路径地址
		 * @return 
		 * 
		 */		
		public getResourceUrl(pathType:string,fileName:string = null):string{
			var url:string = this.rootPath + PathData.PATH_RESOURCE + pathType;
			
			if(fileName)
				url += fileName;/* +
					"?version=" + WebData.getInstance().configLo.version;*/
			
			return url;
		}
		//
		/**
		 * 组装路径串 ，如参数为"images","head"返回 "images/head/"，如果参数已存在"/"，则不添加"/"
		 * @param args
		 * @return 
		 * 
		 */		
		public getPathComponent(...args):string{
			var path:string = "";
			var length:number = args.length;
			for(var i:number = 0;i < length;i++){
				var v:string = args[i];
				path += v;
				if(v.indexOf("/") == -1)
					path += "/";
			}
			
			return path;
		}
	}
}