module egret{
    export class IDGenerator{
        /**
         * 最大值，为int的最大值
         * @type {number}
         */
        public static MAX_VALUE:number = 2147483647;
        /**
         * 最小值，为int的最小值
         * @type {number}
         */
        public static MIN_VALUE:number =- 2147483648;

        private _id:number = 0;

        public constructor(startId:number = 0){
            this._id = startId;
        }

        /**
         * 从0开始生成一个整型 ID值，介于最小值和最大值之间，ID值不断递增或增减，达到限制值后返回另一极端的限制值
         * @param isIncrease 是否递增
         * @returns {number}
         */
        public getID(isIncrease:boolean = true):number {
            var id:number = this._id;

            if(isIncrease){
                if(this._id >= IDGenerator.MAX_VALUE){
                    this._id = IDGenerator.MIN_VALUE;
                }else{
                    this._id ++;
                }
            }else{
                if(this._id <= IDGenerator.MIN_VALUE){
                    this._id = IDGenerator.MAX_VALUE;
                }else{
                    this._id --;
                }
            }

            return id;
        }
    }
}