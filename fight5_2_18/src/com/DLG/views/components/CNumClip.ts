module DLG {

	export class CNumClip extends CGroup{

		private _num:number = -1;
		private _soureUrl:string ;
		private _numbmp:Array<CImage>;
		// public UUID:string;
		public constructor() {
			super();
			let self = this;
			self.touchEnabled = false;
			self.touchChildren = false;

			let hLayout:eui.HorizontalLayout = new eui.HorizontalLayout();
			// hLayout.gap = 10;
			// hLayout.paddingTop = 30;
			// hLayout.horizontalAlign = egret.HorizontalAlign.CENTER;
			self.layout = hLayout;   /// 水平布局
			self._numbmp = [];
		}
		protected createChildren(): void {
            super.createChildren();
			let self = this;
			let bmp: CImage;
			bmp = <CImage>self.getChildAt(0);
			let url:string = <string>bmp.source;
			self._soureUrl = url.slice(0,url.length - 1);
			egret.callLater(self.renderDraw,self);
        }
		/**
		 * @param value egret.HorizontalAlign
		 */
		public setAlign(value:string):void
		{
			let self = this;
			let hLayout:eui.HorizontalLayout = <eui.HorizontalLayout>self.layout;
			// if(value == NumClipAlign.LEFT)
			// {
				hLayout.horizontalAlign = value;
			// }else if(value == NumClipAlign.RIGHT)
			// {
			// 	hLayout.horizontalAlign = egret.HorizontalAlign.RIGHT;
			// }
		}
		/**设置间隔 */
		public setGap(value:number):void
		{
			let self = this;
			let hLayout:eui.HorizontalLayout = <eui.HorizontalLayout>self.layout;
			hLayout.gap = value;
		}
		/**设置数字值 */
		public setValue(value:number):void
		{
			let self = this;
			self._num =value;
			egret.callLater(self.renderDraw,self);
		}
		protected renderDraw():void
		{
			let self = this;
			if(self._soureUrl)
			{
				let numStr:string = self._num + "";
				let len:number = numStr.length;
				let bmp:CImage;
				let hasNumChildren: number = self.numChildren;
				let i:number
				for( i = 0 ;i < len ;i++)
				{
					if(i < hasNumChildren)
					{
						bmp = <CImage>self.getChildAt(i);
					}else
					{
						if(self._numbmp.length > 0)
						{
							bmp = self._numbmp.shift();
						}else{
							bmp = new CImage();
						}
						self.addChild(bmp);
					}
					bmp.source = self._soureUrl + numStr.slice(i,i+1) + '_png';
				}
				while(self.numChildren > len)
				{
					bmp = <CImage>self.getChildAt(i);
					self._numbmp.push(bmp);
					
				}
			}
		}
		public onDestroy(): void
		{
			let self = this;
			self._soureUrl = null;
			self.layout = null;
			let bmp:CImage;
			while(self._numbmp.length >0)
			{
				bmp = self._numbmp.shift();
				bmp.onDestroy();
				bmp.removeFromParent();
			}
			self._numbmp = null;
			self.layout = null
			super.onDestroy();
		}

	}
}