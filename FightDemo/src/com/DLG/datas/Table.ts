module DLG {
	export class Table{
		private data_dic: Object;
		private data_vec: Array<any>;

		public setData(dataArr:Array<any> , ...parme: string[]):void
		{
			let self = this;
			self.data_dic = {};
			self.data_dic['id'] = {};
			self.data_vec = [];
			let other = [];
			let i:number = 0;
			let len:number;
			//0|p1|p2   obj
			//1|p1|p2	vec
			// if(parme && parme.length > 0)
			// {
			// 	for (let key in parme) {
			// 		if (parme.hasOwnProperty(key)) {
			// 			let element = parme[key];
			// 			let sp = element.split('|');
			// 			let str ;
			// 			len = sp.length;
			// 			for(i = 0 ;i < sp.length ;i ++)
			// 			{
			// 				str += i == 0 ? sp[i] : '_' + sp[i];
			// 			}
			// 			self.data_dic[str ] = sp[0] == '0' ? {}:[];
			// 		}
			// 	}
			// }
			let j:number;
			let jLen:number = other.length;
			len = dataArr.length;
			let nameArr = dataArr[1];//属性名称
			for(i = 2 ;i < len;i ++ )
			{
				let newObj :any = {};
				let data = dataArr[i]
				let k:number = 0;
				let kLen:number = nameArr.length;
				for(k = 0 ;k < kLen;k ++ )
				{
					newObj[nameArr[k]] = data[k];
				}
				self.data_dic['id'][newObj.id] = newObj;
				for(j = 0 ;j < jLen;j ++ )
				{
					let str = other[j];
					let sp = str.split('|');
					let valueStr ;
					let s;
					for(s = 0 ;s < sp.length ;s ++)
					{
						valueStr += newObj[sp[s]] + '';
					}
					if(valueStr[0] == 0)
					{
						self.data_dic[str][valueStr] = newObj;
					}else
					{
						if(self.data_dic[str][valueStr] == undefined)
						{
							self.data_dic[str][valueStr] = [];
						}
						self.data_dic[str][valueStr].push(newObj);
					}
					
				}
				self.data_vec.push(newObj);
			}
		}
		public getObjById(id:number):any
		{
			let self = this;
			let obj:Object = self.data_dic['id'];
			if(obj.hasOwnProperty(id + ''))
			{
				return obj[id+''];
			}else
			{
				return null;
			}
		}
		public getDatavec(): any
		{
			return this.data_vec;
		}
		public getData(): any
		{
			let self = this;
			return self.data_dic['id'];
		}
		public getVecByAny(...parme:any[] ):Array<any>
		{
			let data:Array<any> = null;

			return data;
		}
		public getObjByAny(...parme:any[] ):any
		{
			let data:any = null;

			return data;
		}
	}

}