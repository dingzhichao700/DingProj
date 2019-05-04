
module egret {

    export class SkillVo {
        
        public _id: number;

        public constructor() {
        }

        public set id(value: number) {
            this._id = value;
        }

        public get id(): number {
            return this._id;
        }

        public get name(): string {
            if(this.cfg){
                return this.cfg.name;
            }
            return "";
        }

        public get desc(): string {
            if(this.cfg) {
                return this.cfg.desc;
            }
            return "";
        }

        public get cfg(): SkillCfg {
            var cfg: SkillCfg = SkillManager.getInstance().getCfg(this._id);
            return cfg;
        }        

    }   
}
