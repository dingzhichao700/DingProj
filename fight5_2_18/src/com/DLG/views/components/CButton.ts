
module DLG {
/**
 * 带有文本的按钮 能控制是否选中状态
 */
	export class CButton extends CBmpButton implements ISelect {
		protected select_mc:any;
		protected label_txt:CLabel;

		protected _isSelect:boolean;

		protected textColorArr:Array<number>;
		protected strokeColorArr:Array<number>;
		protected stroke:number;
		protected _text:string;

		public constructor() {
			super();
		}
		protected createChildren(): void {
			super.createChildren();
			if(this.label_txt)
			{
				this._text = this.label_txt.text;
			}
		}
		protected onClick() {
            if (this.m_bEnable) {
                var value = this._isSelect?this._isSelect:false;
				value = !value;
                this.setSelect(value);
				if (this.m_pListenerFunc) {
					this.m_pListenerFunc.call(this.m_pListenerObj, this.m_parame);
				}
                
            }
        }
		public setLabel(value:string):void{
			this._text = value;
			egret.callLater(this.renderDraw,this);
		}
		public setLabelColor(value:string):void
		{
			this.textColorArr = Utils.strToNumberArray( value.split(",") );
			egret.callLater(this.renderDraw,this);
		}
		public setStrokeColor(value:string):void
		{
			this.strokeColorArr = Utils.strToNumberArray( value.split(",") );
			egret.callLater(this.renderDraw,this);
		}
		public setStroke(value:number):void
		{
			this.stroke = value;
			egret.callLater(this.renderDraw,this);
		}

		public setSelect(value:boolean):void
		{
			this._isSelect = value;
			egret.callLater(this.renderDraw,this);
		}
		public isSelect():boolean
		{
			return this._isSelect;
		}
		protected renderDraw():void
		{
			if(this._isSelect == undefined)
			{
				this._isSelect = false;
			}
			let _isSelect:boolean = this._isSelect;
			if(_isSelect)
			{
				if(this.up_mc) this.up_mc.filters = null;
				
				if(this.select_mc)
				{
					if(this.m_gray && this.select_mc.filters == null)
					{
						this.select_mc.filters = [DLGConfig.grayColorFlilter];
					}else{
						this.select_mc.filters = null;
					}
				}	
			}else{
				if(this.up_mc)
				{
					if(this.m_gray && this.up_mc.filters == null)
					{
						this.up_mc.filters = [DLGConfig.grayColorFlilter];
					}else{
						this.up_mc.filters = null;
					}
				}	
				if(this.select_mc && this.select_mc.filters != null) this.select_mc.filters = null;
			}
			if(this.up_mc && this.up_mc.visible == _isSelect) this.up_mc.visible = !_isSelect;
			if(this.select_mc && this.select_mc.visible == !_isSelect) this.select_mc.visible = _isSelect;
			if(this.label_txt)
			{
				var label:eui.Label = this.label_txt;
				if(this.textColorArr)
				{
					label.textColor = _isSelect ? this.textColorArr[1]:this.textColorArr[0];
				}
				if(this.strokeColorArr)
				{
					label.strokeColor = _isSelect ? this.strokeColorArr[1]:this.strokeColorArr[0];
				}
				if(this.stroke)
				{
					label.stroke = this.stroke;
				}
				label.text = this._text;
			}
		}
		public onDestroy(): void
        {
			if(this.select_mc) this.select_mc.filters = null;
			this.textColorArr = null;
			this.strokeColorArr = null;
			this._text = null;
			super.onDestroy();
        }
	}
}