module DLG {
	export class FactoryUtils {
		private static classMap:Object = new Object();
		public static getClass(_class:any):any
		{
			let _name = _class.prototype.__class__;
			let ac = this.classMap[_name];
			if(!ac)
			{
				ac = new _class;
				this.classMap[_name] = ac;
			}
			return ac;
		}
		public static removeClass(_class:any):void
		{
			let _name = _class.prototype.__class__;
			let ac:IBaseAction = <IBaseAction>this.classMap[_name];
			if(ac)
			{
				delete this.classMap[_name];
				ac.onDestroy();
			}
		}

		private static _uiPoolVec:Object = {};
		private static _poolUUIDVec:Object = {};
		public static onCreateComp(cls:any):any
		{
			let obj ;
			if(DEBUG)
			{
				// if(cls.prototype.__types__[0] !== 'DLG.IComponent')
				// {
				// 	throw new Error("此类只能创建出IComponent接口的对象")
				// }
			}
			
			let uuid
			let key = cls.prototype.__class__;
			if(this._uiPoolVec.hasOwnProperty(key))
			{
				let arr = this._uiPoolVec[key];
				if(arr.length > 0)
				{
					obj = arr.shift();
					return obj;
				}
			}
			
			if(this._poolUUIDVec.hasOwnProperty(key))
			{
				uuid = this._poolUUIDVec[key];
				uuid ++;
			}else
			{
				uuid = 1
			}
			this._poolUUIDVec[key] = uuid;
			obj = new cls();
			obj.UUID = key + "_" +uuid;
			return obj;
		}
		public static onReturnComp(obj:any):void
		{
			if(DEBUG)
			{
			// 	if((obj instanceof DLG.IComponent) == false)
			// 	{
			// 		throw new Error("此类只能创建出IComponent接口的对象")
			// 	}
			
				if(obj.UUID == undefined)
				{
					throw new Error('obj.UUID  Error')
				}
			}
			if (obj.UUID == undefined)
			{
				return;
			}	
			let key = obj.UUID.split('_');
			if(this._uiPoolVec.hasOwnProperty(key[0]) == false)
			{
				this._uiPoolVec[key[0]] = [];
			}
			let arr = this._uiPoolVec[key[0]];
			
			arr.push(obj);
			key.length = 0;
			key = null;
			
		}
		
	}

	
}