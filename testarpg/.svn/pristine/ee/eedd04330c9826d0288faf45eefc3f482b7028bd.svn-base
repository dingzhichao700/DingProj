module egret{
    /**
     * 飘血动画管理
     */
    export class HPTweenManager{
        private static _instance:HPTweenManager;
        //文本缓存
        private _textFields:Array<TextField>;
        //缓动参数缓存
        private _params:Array<any>;
        private _objects:Array<any>;
        private _cacheData:any;
        //文本数量计数
        private _count:number = 0;

        public constructor(){
            this._textFields = [];
            this._params = [];
            this._objects = [];
            this._cacheData = {};
        }
        //
        public static getInstance():egret.HPTweenManager {
            return this._instance || (this._instance = new egret.HPTweenManager());
        }
        //
        /**
         * 飘血动画
         * @param container 文本容器
         * @param x 文本x
         * @param y 文本y
         * @param radian 飘出弧度
         * @param radius 飘出半径
         * @param text 伤害文本值
         * @param color 文本颜色
         * @param size 文本大小
         */
        public tween(container:DisplayObjectContainer,x:number,y:number,radian:number,radius:number,
                              text:string,color:number = 0xffff00,size:number = 20):void{

            this._count ++;

            var frameIndex:number = this._count % 10 + 1;

            var params:Array<any> = this._params.pop();
            if(!params){
                params = [];
            }
            params.length = 0;

            for(var i in arguments){
                params[i] = arguments[i];
            }
            params[params.length] = this._count;
            this._cacheData[this._count] = params;

            //按帧分开播放，提高性能
            EnterFrameManager.getInstance().addExecute(this.tweenExecute,this,frameIndex,params,1);
        }
        //
        /**
         * 飘血动画
         * @param container 文本容器
         * @param x 文本x
         * @param y 文本y
         * @param radian 飘出弧度
         * @param radius 飘出半径
         * @param text 伤害文本值
         * @param color 文本颜色
         * @param size 文本大小
         * @param cacheId 回收数组参数id
         */
        private tweenExecute(container:DisplayObjectContainer,x:number,y:number,radian:number,radius:number,
                             text:string,color:number = 0xffff00,size:number = 20,cacheId:number = 0):void{

            this._count ++;

            var textField:TextField = this.getTextField(x,y,text,color,size);
            container.addChild(textField);

            var tx:number  = Math.cos(radian) * radius + (x - textField.width / 2);
            var ty:number  = Math.sin(radian) * radius + y;

            var params:Array<any> = this._params.pop();
            if(!params){
                params = [];
            }
            params.length = 0;
            params[0] = textField;
            params[1] = cacheId;
            params[2] = this._count;
            this._cacheData[this._count] = params;

            var toParam:any = this._objects.pop();
            if(!toParam){
                toParam = {};
            }

            toParam.x = tx;
            toParam.y = ty;

            params[3] = toParam;

            Tween.get(textField).to(toParam,1000,egret.Ease.circInOut).call(this.randomDirComplete,this,params);
        }
        //
        /**
         * 飘血动画结束，回收文本对象
         * @param textField 文本对象
         * @param cacheId 回收数组参数id
         * @param cacheId2  回收数组参数id
         * @param toParam 回收缓存数据对象
         */
        private randomDirComplete(textField:TextField,cacheId:number,cacheId2:number,toParam:any):void{
            if(textField.parent)
                textField.parent.removeChild(textField);

            this._textFields.push(textField);
            this._objects.push(toParam);

            if(cacheId > 0){
                this._params.push(this._cacheData[cacheId]);

                delete  this._cacheData[cacheId];
            }
            if(cacheId2 > 0){
                this._params.push(this._cacheData[cacheId2]);

                delete  this._cacheData[cacheId2];
            }
        }
        //
        /**
         * 直线动画，向上或向下运动
         * @param container 文本容器
         * @param x 文本x
         * @param y 文本y
         * @param radius 飘出半径
         * @param text 文本值
         * @param color 文本颜色
         * @param size 文本大小
         */
        public tweenLine(container:DisplayObjectContainer,x:number,y:number,radius:number,
                       text:string,color:number = 0xffff00,size:number = 20):void{

            this._count ++;

            var textField:TextField = this.getTextField(x,y,text,color,size);
            container.addChild(textField);

            var tx:number  = x - textField.width / 2;;
            var ty:number  = radius + y;

            var params:Array<any> = this._params.pop();
            if(!params){
                params = [];
            }
            params.length = 0;
            params[0] = textField;
            params[1] = this._count;
            params[2] = 0;
            this._cacheData[this._count] = params;

            var toParam:any = this._objects.pop();
            if(!toParam){
                toParam = {};
            }

            toParam.x = tx;
            toParam.y = ty;

            params[3] = toParam;

            Tween.get(textField).to(toParam,1000).call(this.randomDirComplete,this,params);
        }
        //
        /**
         * 获取文本对象
         * @param x 文本x
         * @param y 文本y
         * @param text 文本值
         * @param color 文本颜色
         * @param size 文本大小
         * @returns {TextField}
         */
        private getTextField(x:number,y:number,
                             text:string,color:number = 0xffff00,size:number = 20):TextField{

            var textField:TextField = this._textFields.pop();
            if(!textField)
                textField = new TextField();
            textField.text = text;
            textField.height = size;
            textField.width = 200;
            textField.textAlign = HorizontalAlign.CENTER;
            textField.textColor = color;
            textField.x = x - textField.width / 2;
            textField.y = y;

            return textField;
        }
    }
}