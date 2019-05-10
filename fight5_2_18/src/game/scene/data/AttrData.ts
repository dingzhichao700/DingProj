module game {
	
	export class AttrData {

		protected attr_dic: Object = new Object()
		public setValue(key: number, value: number): void {
			this.attr_dic[key + ''] = value;
		}
		public getValue(key: number): number {
			let self = this;
			if (self.attr_dic.hasOwnProperty(key + '')) {
				return self.attr_dic[key + ''];
			}
			return 0;
		}
		public clear(): void {
			let self = this;
			self.attr_dic = null;
		}
		public clone(attr: AttrData): void {
			let self = this;
			attr.setValue(Enum_Attr.hp,self.getValue(Enum_Attr.hp));
			attr.setValue(Enum_Attr.totalHp,self.getValue(Enum_Attr.totalHp));
			attr.setValue(Enum_Attr.speed,self.getValue(Enum_Attr.speed));
			attr.setValue(Enum_Attr.def,self.getValue(Enum_Attr.def));
			attr.setValue(Enum_Attr.magicdefense,self.getValue(Enum_Attr.magicdefense));
			attr.setValue(Enum_Attr.attack,self.getValue(Enum_Attr.attack));
			attr.setValue(Enum_Attr.crit,self.getValue(Enum_Attr.crit));
			attr.setValue(Enum_Attr.critDamage,self.getValue(Enum_Attr.critDamage));
			attr.setValue(Enum_Attr.tenacity,self.getValue(Enum_Attr.tenacity));
			attr.setValue(Enum_Attr.physics_puncture,self.getValue(Enum_Attr.physics_puncture));
			attr.setValue(Enum_Attr.magic_puncture,self.getValue(Enum_Attr.magic_puncture));
			attr.setValue(Enum_Attr.physics_HurtImmune,self.getValue(Enum_Attr.physics_HurtImmune));
			attr.setValue(Enum_Attr.magic_HurtImmune,self.getValue(Enum_Attr.magic_HurtImmune));
			attr.setValue(Enum_Attr.hit,self.getValue(Enum_Attr.hit));
			attr.setValue(Enum_Attr.resistcrit,self.getValue(Enum_Attr.resistcrit));
			attr.setValue(Enum_Attr.resistdamage,self.getValue(Enum_Attr.resistdamage));
		}
	}
}