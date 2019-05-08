module DLG {
    export class CProgressBar extends eui.Range implements IComponent {
        protected _data: any;
		/**
         * 进度高亮显示对象。
         */
        public thumb: DLG.CComponent;
		/**
         * 跟踪进度高亮显示对象。
         */
        public followThumb: DLG.CComponent;
        /** 进度高亮显示对象 的遮罩 */
        public thumbMask: eui.Rect;
		/**
         * 进度条文本
         */
        public label: DLG.CLabel;

        private thumbInitX = 0;
        private thumbInitY = 0;

        public UUID: string;

        public constructor() {
            super();
        }
        protected createChildren(): void {
            super.createChildren();
            let thumb = this.thumb;
            this.thumbInitX = thumb.x;
            this.thumbInitY = thumb.y;
            let thumbIndex = this.getChildIndex(this.thumb);
            this.thumbMask = new eui.Rect();
            if (thumbIndex >= this.numChildren) {
                this.addChild(this.thumbMask);
            } else {
                this.addChildAt(this.thumbMask, thumbIndex + 1);
            }

            this.invalidateDisplayList();
        }
		/**
         * @private
         */
        private _direction: string = eui.Direction.LTR;

        /**
         * ProgressBar 填充在逐步完成过程中扩展的方向。使用 <code>Direction</code> 类定义的常量。
         *
         * @default Direction.LTR
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language zh_CN
         */
        public get direction(): string {
            return this._direction;
        }

        public set direction(value: string) {
            if (this._direction == value)
                return;
            // if(this.thumb) this.thumb.x = this.thumbInitX;
            // if(this.thumb) this.thumb.y = this.thumbInitY;
            this._direction = value;
            this.invalidateDisplayList();
        }
        protected updateDisplayList(w: number, h: number): void {
            super.updateDisplayList(w, h);
            egret.callLater(this.updateSkinDisplayList, this);
        }
        // $setValue(newValue:number):boolean {
        //     if (this.value === newValue)
        //         return false;
        //     let values = this.$Range;
        // 	this.value
        //     let result:boolean = super.$setValue(newValue);
        //     if (this._slideDuration > 0 && this.$stage) {
        //         // this.validateProperties();//最大值最小值发生改变时要立即应用，防止当前起始值不正确。
        //         let animation = this.animation;
        //         if (animation.isPlaying) {
        //             this.animationValue = this.slideToValue;
        //             this.invalidateDisplayList();
        //             animation.stop();
        //         }
        //         this.slideToValue = this.nearestValidValue(newValue, values[sys.RangeKeys.snapInterval]);
        //         if (this.slideToValue === this.animationValue)
        //             return result;
        //         let duration = this._slideDuration *
        //             (Math.abs(this.animationValue - this.slideToValue) / (values[sys.RangeKeys.maximum] - values[sys.RangeKeys.minimum]));
        //         animation.duration = duration === Infinity ? 0 : duration;
        //         animation.from = this.animationValue;
        //         animation.to = this.slideToValue;
        //         animation.play();
        //     }
        //     else {
        //         this.animationValue = this.value;
        //     }
        //     return result;
        // }
        protected updateSkinDisplayList(): void {
            let currentValue = this.value;
            let maxValue = this.maximum;
            let thumb = this.thumb;
            let thumbMask = this.thumbMask;
            let followThumb = this.followThumb;
            if (thumb && thumbMask) {
                let thumbWidth = thumb.width;
                let thumbHeight = thumb.height;

                let clipWidth = Math.round((currentValue / maxValue) * thumbWidth);
                if (clipWidth < 0 || clipWidth === Infinity)
                    clipWidth = 0;
                let clipHeight = Math.round((currentValue / maxValue) * thumbHeight);
                if (clipHeight < 0 || clipHeight === Infinity)
                    clipHeight = 0;

                // let rect = thumb.$scrollRect;
                // if (!rect) {
                //     rect = egret.$TempRectangle;
                // }
                // rect.setTo(0,0,thumbWidth,thumbHeight);
                // let thumbPosX = thumb.x - rect.x;
                // let thumbPosY = thumb.y - rect.y;
                switch (this._direction) {
                    case eui.Direction.LTR:
                        thumbMask.width = clipWidth;
                        thumbMask.height = thumbHeight;
                        thumbMask.x = this.thumbInitX;
                        thumbMask.y = this.thumbInitY;
                        if (followThumb) followThumb.x = clipWidth + this.thumbInitX;
                        break;
                    case eui.Direction.RTL:
                        thumbMask.width = clipWidth;
                        thumbMask.height = thumbHeight;
                        thumbMask.x = thumbWidth - clipWidth;
                        thumbMask.y = this.thumbInitY;
                        if (followThumb) followThumb.x = thumbMask.x - followThumb.width;
                        break;
                    case eui.Direction.TTB:
                        thumbMask.height = clipHeight;
                        thumbMask.width = thumbWidth;
                        thumbMask.x = this.thumbInitX;
                        thumbMask.y = this.thumbInitY;
                        if (followThumb) followThumb.y = clipHeight + this.thumbInitY;
                        break;
                    case eui.Direction.BTT:
                        thumbMask.height = clipHeight;
                        thumbMask.width = thumbWidth;
                        thumbMask.x = this.thumbInitX;
                        thumbMask.y = thumbHeight - clipHeight;
                        if (followThumb) followThumb.y = thumbMask.y - followThumb.height;
                        break;
                }
            }
            if (this.label) {
                this.label.text = this.valueToLabel(currentValue, maxValue);
            }
        }

        private _labelFunction: (value: number, maximum: number) => string = null;

        /**
         * 进度条文本格式化回调函数。示例：
         * <code>labelFunction(value:Number,maximum:Number):String;</code>
         */
        public get labelFunction(): (value: number, maximum: number) => string {
            return this._labelFunction;
        }

        public set labelFunction(value: (value: number, maximum: number) => string) {
            if (this._labelFunction == value)
                return;
            this._labelFunction = value;
            this.invalidateDisplayList();
        }
		/**
         * 将当前value转换成文本
         */
        protected valueToLabel(value: number, maximum: number): string {
            if (this.labelFunction != null) {
                return this._labelFunction(value, maximum);
            }
            return value + " / " + maximum;
        }
        protected renderDraw(): void {

        }

        public setSkinName(value: any): void {
            // this.skinName = value;
        }

        public setData(value: any): void {
            this._data = value;
        }
        public getData(value): any {
            return this._data;
        }
        public removeFromParent(): void {
            if (this.parent) {
                this.parent.removeChild(this);
            }
        }
        public onDestroy(): void {
            this._data = null;
            if (this.UUID != undefined) {
                FactoryUtils.onReturnComp(this);
                return
            }
            while (this.numChildren > 0) {
                this.removeChildAt(0);
            }
        }

    }
}