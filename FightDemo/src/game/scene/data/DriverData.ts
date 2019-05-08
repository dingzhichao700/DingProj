module game {
	export interface IDriverData {
		x: number;
		y: number;
		id: number;
		name: number;
		driverType: number;
		movieName: string;
		skills: Array<number>
		// lastUseSkill: number;
	
		// speed: number;
		// hp: number;
		// totalHp: number;
		attr: AttrData;

		buffs: Array<Array<BuffData>>;
		/**buff产生的属性 加成 */
		buffsAttr:AttrData;
	
		clearBuff(): void
		clear(): void
	}
	export class DriverData implements IDriverData {
		public constructor() {
		}
		public x: number;
		public y: number;
		public id: number;
		public name: number;
		public driverType: number;
		public movieName: string;
		public skills: Array<number>
		// public lastUseSkill: number;
	
		// public hp: number;
		// public totalHp: number;
		// public speed: number;
		public attr: AttrData;
		public buffs: Array<Array<BuffData>>;
		public buffsAttr: AttrData;
	
		public clearBuff(): void {
			let self = this;
			if (self.buffs) {
				let i:number = 0;
				let len:number = self.buffs.length;
				for( i=0; i < len ; i++)
				{
					let buffs = self.buffs[i];
					while (buffs.length > 0) {
						BuffData.returnBuffData(buffs.shift());
					}
				}
				
			}
			if (self.buffsAttr) {
				self.buffsAttr.clear();
			}
		}
		public clear(): void {
			let self = this;
			self.x = undefined;
			self.y = undefined;
			self.id = undefined;
			self.name = undefined;
			self.movieName = undefined;
			if (self.skills && self.skills.length > 0) {
				self.skills.length = 0;
			}
			self.skills = undefined;
			// self.lastUseSkill = undefined;

		
			if (self.attr) {
				self.attr.clear();
				self.attr = undefined;
			}
			
			self.clearBuff();
			if (self.buffs)
			{
				self.buffs = undefined;
			}	
			if (self.buffsAttr)
			{
				self.buffsAttr.clear();
				self.buffsAttr = undefined;
			}	
			

		}
	
	}
}