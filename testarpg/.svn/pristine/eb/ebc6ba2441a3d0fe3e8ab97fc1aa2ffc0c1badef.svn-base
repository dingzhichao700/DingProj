module egret{
    /**
     * 图片数字
     */
    export class NumericBitmap extends  DisplayObjectContainer{
        //图片根路径
        private _rootPath:string;
        //图片
        private _images:Array<Image>;
        //图片缓存
        private _imagesCache:Array<Image>;
        //
        public constructor(){
            super();

            this._images = [];
            this._imagesCache = [];
        }
        //
        /**
         * 设置图片根路径
         * @param path
         */
        public setRootPath(path:string):void{
            this._rootPath = path;
        }
        //
        /**
         * 设置文本图片，调用此方法或 setValue()方法前必须先调用clear()方法一次
         * @param textId 文本图片名称，不包括后缀
         * @param width 图片宽度
         * @param height 图片高度
         * @param flag 文本图片是否显示数字前面
         */
        public setText(textId:string,width:number,height:number,flag:boolean = true):void{
            if(textId){
                var image:Image = this.getImage();
                image.setWH(width,height);

                image.url = dataManager().pathData.getResourceUrl(this._rootPath,textId + ".png");

                if(flag){
                    this._images.unshift(image);
                }else{
                    this._images.push(image);
                }

                this.addChild(image);
            }

            this.updateLayout();
        }
        //
        /**
         * 设置数字图片，调用此方法或 setText()方法前必须先调用 clear()方法一次
         * @param value 数值
         * @param width 数字图片宽度
         * @param height 数字图片高度
         * @param prefix 数字图片前缀，如要显示数字1，图片名称为21.png，则前缀为2，可不设置
         */
        public setValue(value:number,width:number,height:number,prefix:string = ""):void{
            var temp:string = value + "";
            var length:number = temp.length;

            for(var i = 0; i < length; i++){
                this.setImage(temp.charAt(i),width,height,prefix);
            }

            this.updateLayout();
        }
        //
        /**
         * 添加图片
         * @param id 图片名称，不包括后缀
         * @param width 数字图片宽度
         * @param height 数字图片高度
         * @param prefix 数字图片前缀，如要显示数字1，图片名称为21.png，则前缀为2，可不设置
         */
        private setImage(id:string,width:number,height:number,prefix:string):void{
            var image:Image = this.getImage();
            image.setWH(width,height);
            image.url = dataManager().pathData.getResourceUrl(this._rootPath,prefix + id + ".png");
            this._images.push(image);
            this.addChild(image);
        }
        //
        /**
         * 清空数字，回收图片
         */
        public clear():void{
            var length:number = this._images.length;

            while(length > 0){
                this._imagesCache.push(this._images.pop());
                length --;
            }
        }
        //
        /**
         * 获取图片
         * @returns {Image}
         */
        private getImage():Image{
            var image:Image = this._imagesCache.pop();
            if(!image){
                image = new egret.Image();
                image.isShowLoading = false;
            }
            return image;
        }
        //
        /**
         * 更新布局
         */
        private updateLayout():void{
            var x:number = 0;
            var maxHeight:number = 0;

            for(var i in this._images){
                var width:number = this._images[i].width;
                var height:number = this._images[i].height;

                if(maxHeight < height){
                    maxHeight = height;
                }

                this._images[i].x = x;
                x += width;
            }

            for(var i in this._images){
                var height:number = this._images[i].height;

                this._images[i].y = (maxHeight - height) / 2;
            }
        }
    }
}