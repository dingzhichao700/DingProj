module DLG {
	export class ClockData {

        public static ID = 1;
		public id: number;
		public doTimes:number;
		public time:number;
		public callBack:Function;
		public callBackObj:any;
		public callBackParame: any;
		public isApply:boolean

		public nextTime:number;
		public endTime:number;

		public fillFrame:boolean

        public clear(): void
        {
            let self = this;
            self.id = undefined;
            self.doTimes = undefined;
            self.time = undefined;
            self.callBack = undefined;
            self.callBackObj = undefined;
            self.callBackParame = undefined;

            self.nextTime = undefined;
            self.endTime = undefined;
            
			self.fillFrame = undefined;
			self.isApply = undefined;

        }
	}
	export class ClockManager extends egret.EventDispatcher{
		private _currentTime: number;
		/**真实时间 */
		private _realTime: number;
		private _nowDate:Date;
		private _startTime:number;
		private clockVec:Array<ClockData>;
		private clockFillFrameVec: Array<ClockData>
		private clockDataPoolVec: Array<ClockData>;
		public constructor() {
			super();
			let self = this;
			let date = new Date()
			self.setCurrentTime(date.getTime());
			date = null;
			self.clockVec = [];
			self.clockFillFrameVec = [];
			self.clockDataPoolVec = [];
			DLGCore.event.addEventListener(DLGCore.stage, egret.Event.ENTER_FRAME, self, self.timeHandler, false);
		}
		private timeHandler(event:egret.Event):void
		{
			let self = this;
			if (!self._currentTime)
			{
				return;
			}	
			let gt: number = egret.getTimer();
			let ct: number = self._currentTime + gt - self._startTime;
			self._realTime = ct;
			let i:number = 0;
			let arr:Array<ClockData> = self.clockVec
			let len:number = arr.length;
			let vo: ClockData;
			for(i = 0 ;i < len ;i ++)
			{
				vo = arr[i];
				if (!vo)
				{
					break;
				}	
				if (vo.nextTime > ct)
				{
					continue;
				}	
				if(vo.endTime == -1)
				{
					let oldt = vo.nextTime;
					vo.nextTime = ct + vo.time;
					if (vo.isApply)
					{
						vo.callBack.apply(vo.callBackObj,vo.callBackParame);
					} else
					{
						vo.callBack.call(vo.callBackObj,vo.callBackParame);
					}	
					
				}else if(ct >= vo.endTime && vo.doTimes > 0)
				{
					// let times = Math.floor(ct - vo.doTimes);
					// vo.doTimes -= times;
					vo.nextTime = ct + vo.time;
					vo.doTimes--;
					if (vo.isApply)
					{
						vo.callBack.apply(vo.callBackObj,vo.callBackParame);
					} else
					{
						vo.callBack.call(vo.callBackObj,vo.callBackParame);
					}	
					if(vo.doTimes<=0)
					{
						// debug("删除时间对象",vo.id)
						arr.splice(i, 1);
						vo.clear();
						self.clockDataPoolVec.push(vo);
						break;
					}
					
				}
			}
			///需要补帧数处理的方法
				arr = self.clockFillFrameVec
				len = arr.length;
			for(i = 0 ;i < len ;i ++)
			{
				vo = arr[i];
				if (!vo)
				{
					break;
				}
				if(ct >= vo.nextTime  && ct <= vo.endTime)
				{
					if(vo.doTimes > 0)
					{
						let times = Math.floor(ct - vo.doTimes);
						vo.doTimes -= times;
						vo.nextTime = ct + vo.time;
						while(times > 0)
						{
							if (vo.isApply) {
								vo.callBack.apply(vo.callBackObj, vo.callBackParame);
							} else {
								vo.callBack.call(vo.callBackObj,vo.callBackParame);
							}
							times --;
						}
						
						if(vo.doTimes <=0)
						{
							arr.splice(i, 1);
							vo.clear();
							self.clockDataPoolVec.push(vo);
							break;
						}
					}
				}else if(ct >= vo.nextTime  && vo.endTime == -1)
				{
					if( vo.endTime == -1)
					{
						let times = Math.floor(ct - vo.doTimes);
						vo.nextTime = ct + vo.time;
						while(times > 0)
						{
							if (vo.isApply) {
								vo.callBack.apply(vo.callBackObj, vo.callBackParame);
							} else {
								vo.callBack.call(vo.callBackObj,vo.callBackParame);
							}
							times --;
						}
					}
				}
			}
		}
		public addTime(time:number , doTimes:number , m_callBack:Function , m_callBackObj:any , m_callBackParame:any , isApply?:boolean , fillFrame?:boolean):number
		{
			let self = this;
			if (!self._currentTime) {
				throw new Error("clock里的currentTime还没有设置");
			}
			let vo: ClockData
			if (self.clockDataPoolVec.length > 0)
			{
				vo = self.clockDataPoolVec.shift();
			} else {
				vo = new ClockData();
			}
			//= new ClockData();
			vo.id = ClockData.ID;
			// debug("生成时间对象",vo.id)
			if (vo.id == 0)
			{
				throw new Error("clockdata_idID值出错");
			}	
			ClockData.ID++
			if (ClockData.ID >= Number.MAX_VALUE)
			{
				ClockData.ID = Number.MIN_VALUE;
			}
			vo.time = time;
			vo.doTimes = doTimes;
			vo.callBack = m_callBack;
			vo.callBackObj = m_callBackObj;
			vo.callBackParame = m_callBackParame;
			vo.isApply = isApply;
			vo.nextTime = self.getTime() + vo.time;
			if(vo.doTimes != 0)
			{
				vo.endTime = self.getTime() + (vo.time * vo.doTimes);
			}else{
				vo.endTime = -1;
			}
			vo.fillFrame = fillFrame ? fillFrame:false;
			if(vo.fillFrame == false)
			{
				self.clockVec.push(vo);
			}else
			{
				self.clockFillFrameVec.push(vo);
			}
			return vo.id;
		}
		public removeTime(id:number , fillFrame?:boolean): void
		{
			
			let self = this;
			if (!self._currentTime) {
				throw new Error("clock里的currentTime还没有设置");
			}
			if (fillFrame == false || fillFrame == undefined)
			{
				let arr = self.clockVec
				let i:number = 0;
				let len: number = arr.length;
				for( i=0; i < len ; i++)
				{
					let vo: ClockData;
					vo = <ClockData>arr[i];
					if (vo.id == id)
					{
						// debug("----删除时间对象",vo.id)
						arr.splice(i,1);
						vo.clear();
						self.clockDataPoolVec.push(vo);
						return ;
					}	
				}
			} 
			if (fillFrame == true || fillFrame == undefined)
			{
				let arr = self.clockFillFrameVec;
				let i:number = 0;
				let len: number = arr.length;
				
				for( i=0; i < len ; i++)
				{
					let vo: ClockData;
					vo = arr[i];
					if (vo.id == id)
					{
						arr.splice(i,1);
						vo.clear();
						self.clockDataPoolVec.push(vo);
						return ;
					}	
				}
			}	

		}
		/**设置时间毫秒数 */ 
		public setCurrentTime(value:number)
		{
			let self = this;
			self._currentTime = value;
			self._startTime = egret.getTimer();
			self._realTime = self._currentTime;
		}
		public getTime():number
		{
			return this._realTime ;
		}
	}
}