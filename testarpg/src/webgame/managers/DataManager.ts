module egret{
    /**
     * 数据层
     */
    export class DataManager{
        private static _instance:DataManager;

        public pathData:PathData = PathData.getInstance();
        public sceneElementData:SceneElementData = SceneElementData.getInstance();

        //因此类在基础数据未加载完成时有使用，所有数据类，不能在构造函数中使用基础数据，请使用init()方法初始化数据层
        public userData:UserData = new UserData();

        //场景
        public sceneData:SceneData = new SceneData();
        //战斗
        public fightData:FightData = new FightData();
        //多角色数据
        public roleSceneData:RoleSceneData = new RoleSceneData();

        public constructor(){

        }
        //
        public static getInstance():DataManager{
            return DataManager._instance || (DataManager._instance = new egret.DataManager());
        }
        //
        /**
         * 初始化数据
         */
        public init(){
            
        }
    }
}