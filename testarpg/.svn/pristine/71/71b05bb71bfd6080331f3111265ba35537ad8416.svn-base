module egret{
    /**
     * 伤害数据
     */
    export class DamageDataItem{
        /**
         * 伤害值
         */
        public value:number;
        /**
         * 是否暴击
         */
        public isCritical:boolean;
        /**
         * 是否闪避
         */
        private _isDodge:boolean;

        public get isDodge():boolean {
            return this._isDodge;
        }
        /**
         * 是否闪避
         */
        public set isDodge(value:boolean) {
            this._isDodge = value;

            if(value)
                this.value = 0;
        }

        /**
         * 清空数据
         */
        public clear():void{
            this.value = 0;
            this.isCritical = false;
            this._isDodge = false;
        }
    }
}