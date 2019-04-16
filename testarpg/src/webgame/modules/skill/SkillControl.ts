
module egret{
    export class SkillControl {

        private skillView: SkillView;
        private skillTipView: SkillTips;

        private static _instance: SkillControl;

        public static getInstance(): SkillControl {
            if(!SkillControl._instance) {
                SkillControl._instance = new SkillControl();
            }
            return SkillControl._instance;
        }
        
        public constructor() {
        }

        public openskillView(): void {
            if(!this.skillView) {
                this.skillView = new SkillView();
            }
            this.skillView.open();
        }

        public updateskillView(): void {
            if(this.skillView && this.skillView.isOpen) {
                this.skillView.update();
            }
        } 
        
        public playSucc(): void {
            if(this.skillView && this.skillView.isOpen) {
                this.skillView.playSucc();
            }
        }

        public openskillTip(id:number): void {
            if(!this.skillTipView) {
                this.skillTipView = new SkillTips();
            }
            this.skillTipView.setData(id);
            this.skillTipView.open();
        }
        
    }
}
