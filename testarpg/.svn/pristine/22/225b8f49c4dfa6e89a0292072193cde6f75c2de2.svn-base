
module egret {

	export class LocalData{
		//单例
		private static _instance:LocalData = null;
		//数据表
		private _hashMap:HashMap = null;
		//lo表
		private _loMap:HashMap = null;
		//数据是否已解析完成
		private _parseCompleted:boolean = false;
		/**
		 * 构造函数
		 */
		public constructor(){
			this._loMap = new HashMap();
			this._hashMap = new HashMap();
			
			//映射文件名和lo
			this._loMap.put(LocalDataFileName.MONSTER,MonsterLo);
		}
		//
		/**
		 * 基础数据是否已解析完成 
		 * @return 
		 * 
		 */
		public get parseCompleted():boolean{
			return this._parseCompleted;
		}

		/**
		 * 单例 
		 * @return 
		 * 
		 */		
		public static getInstance():LocalData{
			return LocalData._instance || (LocalData._instance = new LocalData());
		}
		//
		/**
		 * 设置基础数据 
		 * @param data:Object
		 * 
		 */		
		public parseData():void{
			var loopId:number = EnterFrameManager.getInstance().addExecute(nextFile,this,1);

			var map:HashMap = null;
			var vector:any = null;
			var fileNames:Array<any> = [];
			var length:number = 0;
			var lo:any = null;
			var cls:any = null;

			for(var fileName in this._loMap.content){
				fileNames.push(fileName);
			}

			var index:number = -1;

			//读取下一个文件数据
			function nextFile():void{
				index ++;
				if(index >= fileNames.length){
					this._parseCompleted = true;
					return;
				}

				map = new HashMap();
				fileName = fileNames[index];
				this._hashMap.put(fileName,map);

				cls = this._loMap.get(fileName);

				if(cls){
					vector = this.getDataVector(getRes(fileName),cls);
					RES.destroyRes(fileName);

					length = vector.length;

					for(var i:number = 0; i < length; i++){
						lo = vector[i];

						if("id" in lo){
							if(map.containsKey(lo.id)){
								LogManager.error(this,"基础数据有误，id字段重复,fileName = " + fileName + ",id = " + lo.id);
							}else{
								map.put(lo.id,lo);
							}
						}else{
							LogManager.error(this,"基础数据有误，找不到id字段 fileName = " + fileName);
						}
					}
				}else{
					LogManager.error(this,"文件名 fileName = " + fileName + " 未注册Lo类");
				}

				EnterFrameManager.getInstance().removeExecute(loopId);
				loopId = EnterFrameManager.getInstance().addExecute(nextFile,this,1);
			}
		}
		//
		/**
		 * 获取数据数组 
		 * @param fileName:String 文件名，不包括后缀
		 * @param parseClass:Class 将数据项目解析为此类实例
		 * @return 有数据返回Vector数组，否则返回null，注意：对于同一文件，数据只能获取一次，获取后删除
		 * 
		 */		
		private getDataVector(data:Array<any>,parseClass:any):any{
			if(data){
				var vector:Array<any> = [];
				
				var length:number = data.length;
				var item:any = null;
				
				for(var i:number = 0; i < length; i++){
					item = new parseClass();
					vector.push(item);

					for(var key in data[i]){
						item[key] = data[i][key];
					}
				}
				if(vector.length == 0){
					LogManager.error(this,"本地数据文件没有数据项" + parseClass);
				}

				return vector;
			}else{
				LogManager.error(this,"找不到本地数据文件" + parseClass);
			}

			return null;
		}
		//
		/**
		 * 获取lo数据 
		 * @param fileName:String 文件名
		 * @param id:int 数据id
		 * @return 
		 * 
		 */		
		private getLoById(fileName:string,id:number = 0):any{
			var map:HashMap = this.getHashMap(fileName);
			
			if(!map || !map.containsKey(id)){
				LogManager.error(this,"找不到基础数据: fileName = " + fileName + ",id = " + id);
				
				var cls:any = this._loMap.get(fileName);

				if(cls)
					return new cls();
			}
			
			return map.get(id);
		}
		//
		/**
		 * 获取文件名对应的数据表 
		 * @param fileName:String 文件名，不包括后缀
		 * @return 
		 * @see LocalDataFileName
		 */		
		public getHashMap(fileName:string):HashMap{
			var map:HashMap = this._hashMap.get(fileName);
			if(!map){
				LogManager.error(this,"找不到基础数据表: fileName = " + fileName);
				map = new HashMap();
			}
			return map;
		}
		//
		/**
		 * 获取 MonsterLo 数据
		 * @param id:int 数据id
		 * @return
		 *
		 */
		public getMonsterLo(id:number):MonsterLo{
			return this.getLoById(LocalDataFileName.MONSTER,id);
		}
		//
		/**
		 * 获取 RoleBornPointLo 数据
		 * @param id:int 数据id
		 * @return
		 *
		 */
		public getRoleBornPointLo(id:number):RoleBornPointLo{
			return this.getLoById(LocalDataFileName.ROLE_BORN_POINT,id);
		}
		//
		/**
		 * 获取SceneLo数据
		 * @param id:int 数据id
		 * @return
		 *
		 */
		public getSceneLo(id:number):SceneLo{
			return this.getLoById(LocalDataFileName.SCENE,id);
		}
	}
}