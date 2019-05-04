
module egret {

	export class SceneManager{
    	
		/**当前场景对象*/
		public scene:SceneDriver = null;

        //场景数据
        private _sceneData: SceneData = null;
        
		private static _instance:SceneManager = null;

        public static getInstance(): SceneManager {
            return SceneManager._instance || (SceneManager._instance = new SceneManager());
        }

		public constructor(){
			this._sceneData = dataManager().sceneData;
		}

		/**
		 * 请求成功后进入场景
		 * @param id:Number 场景id
		 */
		public enterScene(type:number,id:number = -1):void{
			if(this._sceneData.sceneType == type && this._sceneData.sceneId == id){
				throw new Error("重复进入当前场景, type = " + type + ", id = " + id);
			}
			
            this.exitScene(true);
			
			this._sceneData.sceneType = type;
            this._sceneData.sceneId = id;
            this._sceneData.cityId = id;
			
            if(!this.scene) {
                this.scene = <SceneDriver><any> (openWindow(SceneWindow,false));
                this.scene.scaleX = this.scene.scaleY = 1.2;
                this.scene.x = -400;
                this.scene.y = -200;
			}
			this.scene.loadData(id);
		}

		/**
		 * 退出场景 
		 * @param isClear:Boolean = true 是否清理场景数据
		 */		
		public exitScene(isClear:boolean = true):void{
			this.clearScene(isClear);
			closeWindow(this.scene);
			this.scene = null;
			
			switch(this._sceneData.sceneType){
				//城市
				case SceneType.NORMAL_COPY:
					//this.close(TopWindow);
					//this.close(PlayerHeadWindow);
					break;
				//世界地图
				//case SceneType.WORLD_MAP:
				//	this.close(NavigateWindow);
				//	this.close(GlobalMapWindow);
				//
				//	this.dataManager().worldMapData.isInWorld = false;
				//	break;
			}
		}

		/**
		 * 清空场景 
		 * @param isClear:Boolean = true 是否清理场景数据
		 */		
		public clearScene(isClear:boolean = true):void{
			if(this.scene)
				this.scene.clearScene();
			
			switch(this._sceneData.sceneType){
				//城市
				case SceneType.NORMAL_COPY:
					break;
				//世界地图
				//case SceneType.WORLD_MAP:
				//	break;
			}
		}

		/**
		 * 移动场景元素 
		 * @param id:String 场景元素id
		 * @param x:int 目标x
		 * @param y:int 目标y
		 */		
		public moveElement(id:number,x:number,y:number = 0):void{
			if(!this.scene) 
    			return;
			this.scene.moveElement(id+"", x, y);
		}

		/**
		 * 主角跳转至场景x,y处 
		 * @param x
		 * @param y
		 */
		public gotoXY(x:number,y:number = 0):void{
			if(!this.scene) 
    			return;
			this.scene.gotoXY(x,y);
		}
		
	}
}