module DLG {
/**
 * 开关按钮
 * 同时如果点击了一下后，会变成另一个状态，
 * 例如单选 多选 用此类
 * 如果 isRadio ， changeDataTouchListener 都为true，那等同于CTabItem
 */
    export class CToggle extends CButton {

        public isRadio:boolean = false;
        /**是否数据改变的时候才会去触发回调 */
        public changeDataTouchListener:boolean = false;

        public constructor() {
            // console.log('CheckBox');
            super();
        }

        // protected createChildren(): void {

        //     super.createChildren();
        //     if(this.select_img) this.select_img.visible = false;
        // }
       
        protected onClick() {
            if (this.m_bEnable) {
                var value = !this.select_mc.visible;
                var needCHange:boolean = true;
                if(this.isRadio)
                {
                    if(this.select_mc.visible == value)
                    {
                        needCHange = false;
                    }
                }
                if(needCHange)
                {
                    this.setSelect(value);
                }
                if(this.changeDataTouchListener == false || needCHange == true)
                {
                    if (this.m_pListenerFunc) {
                        this.m_pListenerFunc.call(this.m_pListenerObj, this.m_parame);
                    }
                }
            }
        }



        // public setSelect(isSelect: boolean) {
        //     this.commitProperties();
        //     var value:boolean = this._isSelect;
        //     if(value != isSelect)
        //     {
        //         this.select_img.visible = isSelect;
        //         this._isSelect = value;
        //     }
        // }
        // protected renderDraw():void
		// {
        //     super.renderDraw();
        // }

        // public onDestroy(): void
        // {
        //     super.onDestroy();
        // }
    }
}