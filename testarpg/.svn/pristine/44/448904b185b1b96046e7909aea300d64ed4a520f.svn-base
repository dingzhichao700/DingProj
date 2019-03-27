module egret{
    /**
     * 血量进度条
     */
    export class HPProgressBar extends DisplayObjectContainer{
        //进度背景
        private _bg:Image;
        //进度条
        private _bar:Image;
        //百分比
        private _percent:number = 0;
        //进度条总宽高
        private _barWidth:number = 0;
        private _barHeight:number = 0;

        public constructor(){
            super();

            this._bg = new egret.Image(null,0,0,false);
            this.addChild(this._bg);
            this._bar = new egret.Image(null,0,0,false);
            this.addChild(this._bar);
        }
        //
        public get width():number{
            return this._barWidth;
        }
        //
        public get height():number{
            return this._barHeight;
        }
        //
        public get percent():number {
            return this._percent;
        }

        /**
         * 进度百分比
         * @param value
         */
        public set percent(value:number) {
            if(this._percent == value) return;

            if(value > 1)
                value = 1;
            if(value < 0)
                value = 0;

            this._percent = value;
            this.updateDisplayList();
        }
        //
        /**
         * 设置进度条样式
         * @param bgUrl 进度背景地址
         * @param barUrl 进度条地址
         */
        public setStyle(bgUrl:string,barUrl:string):void{
            this._bg.url = bgUrl;
            this._bar.url = barUrl;

            this.setProperties(this._barWidth,this._barHeight);
        }
        //
        /**
         * 设置进度条总宽高
         * @param width 进度条宽
         * @param height 进度条高
         */
        public setProperties(width:number,height:number):void{
            this._barWidth = width;
            this._barHeight = height;

            this._bg.width = width;

            this.updateDisplayList();
        }
        //
        /**
         * 更新进度显示
         */
        private updateDisplayList():void{
            this._bar.width = this._percent * this._barWidth;
        }
    }
}
