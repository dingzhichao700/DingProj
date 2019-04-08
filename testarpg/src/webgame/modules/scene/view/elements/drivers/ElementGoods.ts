module egret{
    /**
     * 掉落物品
     */
    export  class ElementGoods extends SceneElement{
        //物品图标
        private _image:egret.gui.UIAsset;

        public constructor(){
            super();

            this._image = new egret.gui.UIAsset();
            this._image.x = -32;
            this._image.y = -32;
            this.addChild(this._image);

            this._namePad.y = this._image.y - 10;
        }

        public addToScene():void{
            super.addToScene();

            var lo:GoodsLo = <GoodsLo>this._data.lo;

//            this._image.url = PathData.getInstance().getResourceUrl(PathData.PATH_IMAGES_PROP,lo.iconId);
            this._image.source = "resource/item/" + lo.iconId + ".png";
        }
    }
}