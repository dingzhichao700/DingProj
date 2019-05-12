module DLG {
	/**
	 *大背景图
	 */
    export class CBigImage extends eui.Image implements IComponent {
        public UUID: string;
        private resArr: Array<string>;
        public constructor(source?: string | egret.Texture) {
            super(source);
            this.resArr = [];

        }

        public set source(value: string | egret.Texture) {
            if (DEBUG) {
                // if (egret.is(value, 'string') == false)
                // {
                //     throw new Error('CImage 控件只能设置string');
                // }
                if ((<string>value).indexOf('_json') != -1) {
                    throw new Error("大背景图URL有错：" + value);
                }
            }
            if (this.resArr.indexOf(<any>value) == -1)
            {
                this.resArr.push(<any>value);
            }
            egret.superSetter(CBigImage, this, "source", value);

        }

        public setSkinName(value: any): void {
            // this.skinName = value;
        }
        public setData(value: any): void {
            // let self = this;
            // self._data = value;
            throw new Error('请使用source')
        }
        public getData(value): any {
            // let self = this;
            // return self._data;
            throw new Error('请使用source')
        }

        public removeFromParent(): void {
            let self = this;
            if (self.parent) {
                self.parent.removeChild(this);
            }
            self.onDestroy();
        }
        public onDestroy(): void {
            let self = this;
            if (self.resArr)
            {
                let i:number = 0;
                let len:number = self.resArr.length;
                for( i=0; i < len ; i++)
                {
                    RES.destroyRes((<string>self.resArr[i]));
                }
                self.resArr.length = 0;
                self.resArr = undefined;
            }    
            
            if (self.UUID != undefined) {
                FactoryUtils.onReturnComp(this);
                return
            }
            Utils.onDestroy(this);
        }
    }
}