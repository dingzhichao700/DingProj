module DLG {
	export class CImage extends eui.Image implements IComponent {
		public UUID:string;
		public constructor(source?: string | egret.Texture) {
			super(source);
		
		}
		
		public set source(value: string) {
			// if (DEBUG)
            // {
            //     if (value !== null && value !== undefined )
            //     {
            //         if (value.indexOf('_png') == -1 )
            //         {
            //             throw new Error('CImage 图片格式有错');
            //         }
            //         if ((<string>value).indexOf('Texture') != -1 && (<string>value).indexOf('_json') == -1)
            //         {
            //             throw new Error("图集URL有错一：" + value);
            //         }
            //         let arr = (<string>value).split("_json.");
            //         if (arr[1].indexOf(arr[0]) == -1)
            //         {
            //             throw new Error("图集URL有错二：" + value);
            //         }
            //     }
            // }
			egret.superSetter(CImage, this, "source", value);
		}

        public setSkinName(value: any): void
        {
            // this.skinName = value;
        }
       
        public setData(value:any):void
        {
            // let self = this;
            // self._data = value;
			throw new Error('请使用source')
        }
        public getData(value):any
        {
            // let self = this;
            // return self._data;
			throw new Error('请使用source')
        }

        public removeFromParent(): void {
            let self = this;
            if (self.parent) {
                self.parent.removeChild(this);
            }
        }
        public onDestroy(): void
        {
			let self = this;
            if (self.texture && self.texture.bitmapData)
            {
                self.texture = undefined;
            }    
            if(self.UUID != undefined)
            {
                FactoryUtils.onReturnComp(this);
                self.UUID = undefined;
                self.source = undefined;
                return
            }
            Utils.onDestroy(this);
        }
	}
}