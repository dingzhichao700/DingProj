
module egret{
    export class EquipControl {

        private equipView: EquipView;
        private strengthView: EquipStrengthView;

        private static _instance: EquipControl;

        public static getInstance(): EquipControl {
            if(!EquipControl._instance) {
                EquipControl._instance = new EquipControl();
            }
            return EquipControl._instance;
        }
        
        public constructor() {
        }

        public openEquipView(): void {
            if(!this.equipView) {
                this.equipView = new EquipView();
            }
            this.equipView.open();
        }

        public openStrengthView(): void {
            if(!this.strengthView) {
                this.strengthView = new EquipStrengthView();
            }
            this.strengthView.open();
        }
        
    }
}
