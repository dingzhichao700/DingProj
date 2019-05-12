
module DLG {
/**
 * 带有文本的按钮 能控制是否选中状态
 * 同时如果点击了一下后，会变成另一个状态，
 * 在选中状态下再点击这个按钮 点击事件不触发 皮肤也不会发生改变
 */
	export class CTabItem extends CButton implements ITabItem{

		public constructor() {
			super();
		}

		protected onClick() {
            if (this.m_bEnable) {
                var value = !this._isSelect;
				if(value == true)
				{
					return;
				}
                this.setSelect(value);
				if (this.m_pListenerFunc) {
					this.m_pListenerFunc.call(this.m_pListenerObj, this.m_parame);
				}
                
            }
        }

		// public onDestroy(): void
        // {
        //     this.textColorArr = null;
		// 	this.strokeColorArr = null;
		// 	this._text = null;
        //     super.onDestroy();
        // }
	}
}