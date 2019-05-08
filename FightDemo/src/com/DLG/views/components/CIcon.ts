module DLG {
	export class CIcon extends CComponent {

		private _url: string;
		private _bmp: egret.Bitmap;
		private _w: number;
		private _h: number;
		
		public constructor(w?:number,h?:number) {
			super();
			let self = this;
			self._w = w;
			self._h = h;
		}
		public onLoad(_url:string): void
		{
			let self = this;
			if (self._url != _url)
			{
				self._url = _url;
				if (!self._bmp)
				{
					self._bmp = new egret.Bitmap();
					self.addChild(self._bmp);
				}	
				if (self._w)
				{
					self._bmp.width = self._w;
				}	
				if (self._h)
				{
					self._bmp.height = self._h;
				}	
				DLG.DLGCore.loader.load(_url, self.showBmp, self);
			}	
			
		}
		public set width(value: number)
		{
			let self = this;
			self._w = value;
			if (self._bmp)
			{
				self._bmp.width = value;
			}	
		}
		public set height(value: number)
		{
			let self = this;
			self._h = value;
			if (self._bmp)
			{
				self._bmp.height = value;
			}	
		}
		protected showBmp(url: string, bitmapData: egret.BitmapData): void
		{
			let self = this;
			if (url == self._url) {
				self._bmp.bitmapData = bitmapData;
				if (!self._w) self.width = bitmapData.width;
				if (!self._h) self.height = bitmapData.height;
			}
		}
		public setSkinName(value: any): void
        {
            // this.skinName = value;
        }
       
        public setData(value:any):void
        {
            let self = this;
            self._data = value;
        }
        public getData(value):any
        {
            let self = this;
            return self._data;
        }

        public removeFromParent(): void {
            let self = this;
            if (self.parent) {
                self.parent.removeChild(self);
            }
        }
		public onDestroy(): void {
			let self = this;
			self._url = undefined;
			self._w = undefined;
			self._h = undefined;
			if (self._bmp)
			{
				self.removeChild(self._bmp);
				if ( self._bmp.bitmapData)
				{
					self._bmp.bitmapData = undefined;
				}
			}
			
			if(self.UUID != undefined)
			{
                FactoryUtils.onReturnComp(self);
                self.UUID = undefined;
                return
            }
			Utils.onDestroy(self);
		}


		
	}
}