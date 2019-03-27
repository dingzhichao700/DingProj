module egret{
    /**
     * ͼƬ����
     */
    export class NumericBitmap extends  DisplayObjectContainer{
        //ͼƬ��·��
        private _rootPath:string;
        //ͼƬ
        private _images:Array<Image>;
        //ͼƬ����
        private _imagesCache:Array<Image>;
        //
        public constructor(){
            super();

            this._images = [];
            this._imagesCache = [];
        }
        //
        /**
         * ����ͼƬ��·��
         * @param path
         */
        public setRootPath(path:string):void{
            this._rootPath = path;
        }
        //
        /**
         * �����ı�ͼƬ�����ô˷����� setValue()����ǰ�����ȵ���clear()����һ��
         * @param textId �ı�ͼƬ���ƣ���������׺
         * @param width ͼƬ���
         * @param height ͼƬ�߶�
         * @param flag �ı�ͼƬ�Ƿ���ʾ����ǰ��
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
         * ��������ͼƬ�����ô˷����� setText()����ǰ�����ȵ��� clear()����һ��
         * @param value ��ֵ
         * @param width ����ͼƬ���
         * @param height ����ͼƬ�߶�
         * @param prefix ����ͼƬǰ׺����Ҫ��ʾ����1��ͼƬ����Ϊ21.png����ǰ׺Ϊ2���ɲ�����
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
         * ���ͼƬ
         * @param id ͼƬ���ƣ���������׺
         * @param width ����ͼƬ���
         * @param height ����ͼƬ�߶�
         * @param prefix ����ͼƬǰ׺����Ҫ��ʾ����1��ͼƬ����Ϊ21.png����ǰ׺Ϊ2���ɲ�����
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
         * ������֣�����ͼƬ
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
         * ��ȡͼƬ
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
         * ���²���
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