/**
 *
 * @author 
 *
 */
module egret {
    export class WindowView extends BaseView {
        
        public imgMask: egret.gui.UIAsset;
        public btnClose: egret.gui.UIAsset;
        public btnBack: egret.gui.UIAsset;
        
        public constructor() {
            super();
            this.skinName = "ui.WindowViewSkin";
        }
    }
}
