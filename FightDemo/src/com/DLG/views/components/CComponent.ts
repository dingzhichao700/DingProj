module DLG {
    
    export class CComponent extends eui.Component implements IComponent{

        public UUID:string;
        public static CLASSNAME:String = 'DLG.CComponent';
        // protected lan: DLG.Language;
        protected _data:any;

        public constructor() {
            super();
            // self.lan = DLG.AppCore.lan;
        }


        public get skinName(): any {
            let self = this;
            return self.$Component[eui.sys.ComponentKeys.skinName];
        }
        public setSkinName(value: any): void
        {
            this.skinName = value;
        }
        public set skinName(value:any)
        {
            let self = this;
            let values = self.$Component;

            values[eui.sys.ComponentKeys.skinNameExplicitlySet] = true;
            if (values[eui.sys.ComponentKeys.skinName] == value)
                return;
            if (value) {
                values[eui.sys.ComponentKeys.skinName] = value;
            } else if (self.$stage) {
                let theme = self.$stage.getImplementation("eui.Theme");
                if (theme) {
                    let skinName = theme.getSkinName(self);
                    if (skinName) {
                        //egret.log("theme.setSkinFunc " + skinName);
                        values[eui.sys.ComponentKeys.skinName] = skinName;
                    }
                }
            }
            self.$parseSkinName();
        }
        // $parseSkinName():void {
        //     let skinName = this.skinName;
        //     let skin:any;
        //     if (skinName) {
        //         if (skinName.prototype) {
        //             skin = new skinName();
        //         }
        //         else if (typeof(skinName) == "string") {
        //             let clazz:any;
        //             let text:string = skinName.trim();
        //             if (text.charAt(0) == "<") {
        //                 clazz = EXML.parse(text);
        //             }
        //             else {
        //                 clazz = egret.getDefinitionByName(skinName);
        //                 if (!clazz && text.toLowerCase().indexOf(".exml") != -1) {
        //                     EXML.load(skinName, this.onExmlLoaded, this, true);
        //                     return;
        //                 }
        //             }
        //             if (clazz) {
        //                 skin = new clazz();
        //             }
        //         }
        //         else {
        //             skin = skinName;
        //         }
        //     }
        //     this.setSkin(skin);
        // }
        // private onExmlLoaded(clazz:any, url:string):void {
        //     if (this.skinName != url) {
        //         return;
        //     }
        //     let skin = new clazz();
        //     this.setSkin(skin)
        // }

        public setData(value:any):void
        {
            let self = this;
            self._data = value;
        }
        public getData(value):any
        {
            let self = this;
            return self._data;
        }

        public removeFromParent(): void {
            let self = this;
            if (self.parent) {
                self.parent.removeChild(self);
            }
        }
        public onDestroy(): void
        {
            let self = this;
            self._data = null;
            if(self.UUID != undefined)
            {
                FactoryUtils.onReturnComp(this);
                return
            }
            
            Utils.onDestroy(self);
            
            self.setSkin(null);
            self.$Component[eui.sys.ComponentKeys.skinName] = null;
        }
        
    }
    export class CGroup extends eui.Group  implements IComponent
    {
        public UUID:string;
        protected _data:any;

        public constructor() {
            super();

        }
        public setSkinName(value: any): void
        {
            // this.skinName = value;
        }
        public setData(value:any):void
        {
            let self = this;
            self._data = value;
        }
        public getData(value):any
        {
            let self = this;
            return self._data;
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
            self._data = null;
            if(self.alpha != 1) self.alpha = 1;
            if(self.x != 0) self.x = 0;
			if(self.y != 0) self.y = 0;
			if(self.anchorOffsetX != 0) self.anchorOffsetX = 0;
			if(self.anchorOffsetY != 0) self.anchorOffsetY = 0;
			if(self.scaleX != 1) self.scaleX = 1;
			if(self.scaleY != 1) self.scaleY = 1;
			if(self.layout) self.layout = undefined;
            if(self.UUID != undefined)
            {
                FactoryUtils.onReturnComp(this);
                return
            }
            Utils.onDestroy(this);
        }
    }
    export class CRect extends eui.Rect implements IComponent
    {
        public UUID: string;
        public constructor(width?: number, height?: number, fillColor?: number) {
            super(width,height,fillColor);
            let self = this;
            self.touchEnabled = false;

        }
        public setSkinName(value: any): void
        {
            this.skinName = value;
        }
        public setData(value:any):void
        {
            let self = this;
        }
        public getData(value):any
        {
            let self = this;
            return null;
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

            if(self.UUID != undefined)
            {
                FactoryUtils.onReturnComp(this);
                return
            }
        }
    }   
    export class CTextInput extends eui.TextInput implements IComponent
    {
        public UUID: string;
        public constructor() {
            super();
            let self = this;
            self.touchEnabled = false;

        }
        public setSkinName(value: any): void
        {
            this.skinName = value;
        }
        public setData(value:any):void
        {
            let self = this;
        }
        public getData(value):any
        {
            let self = this;
            return null;
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

            if(self.UUID != undefined)
            {
                FactoryUtils.onReturnComp(this);
                return
            }
        }
    }    
    export class CLabel extends eui.Label  implements IComponent
    {
        public UUID:string;
        protected _data:any;

        public constructor() {
            super();
            let self = this;
            self.touchEnabled = false;

        }
        public setSkinName(value: any): void
        {
            // this.skinName = value;
        }

        public setData(value:any):void
        {
            let self = this;
            self._data = value;
        }
        public getData(value):any
        {
            let self = this;
            return self._data;
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
            self._data = null;
            if(self.UUID != undefined)
            {
                FactoryUtils.onReturnComp(this);
                return
            }
        }
    }
    
    /***
     * trackHighlight  轨道高亮显示对象。
     * thumb  滑块显示对象。
     * track  轨道显示对象。
     */
    export class CHSlider extends eui.HSlider  implements IComponent
    {

        public UUID:string;
        protected _data:any;
        
        public constructor() {
            super();
            let self = this;
            self.liveDragging = true;
        }
        public setSkinName(value: any): void
        {
            // this.skinName = value;
        }
        public get skinName(): any {
            let self = this;
            return self.$Component[eui.sys.ComponentKeys.skinName];
        }
        public setData(value:any):void
        {

        }
        public getData(value):any
        {

        }

        public removeFromParent(): void {
            let self = this;
            if (self.parent) {
                self.parent.removeChild(this);
            }
        }

        protected onTrackTouchBegin(event:egret.TouchEvent){
            super.onTrackTouchBegin(event);
            let self = this;
            self.thumb.once(egret.TouchEvent.TOUCH_MOVE, self.onThumbTouchBegin, this);
        }

        public onDestroy(): void
        {
            let self = this;
            self._data = null;
            
            if(self.UUID != undefined)
            {
                FactoryUtils.onReturnComp(this);
                return
            }
            // self.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this["onTouchBegin"], this);
            self.$SliderBase = null;
            Utils.onDestroy(this);
            
            self.setSkin(null);
            self.$Component[eui.sys.ComponentKeys.skinName] = null;
        }
    }
    
    
    export class CList extends eui.List implements IComponent{
        public UUID:string;
        protected _data:any;
        public setSkinName(value: any): void
        {
            // this.skinName = value;
        }
        public setData(value:any):void
        {
            throw new Error('请使用dataProvider方法')
        }
        public getData(value):any
        {
            throw new Error('请使用dataProvider方法')
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
            self._data = null;
            
            if(self.UUID != undefined)
            {
                FactoryUtils.onReturnComp(this);
                return
            }
            let dataProvider = <eui.ArrayCollection>self.dataProvider;
            if(dataProvider){
                dataProvider.removeAll();
                self.itemRenderer = null;
                self.dataProvider = null;
            }
            Utils.onDestroy(this);
            
        }
    }
    export class CItemRenderer extends CComponent implements eui.IItemRenderer{
        private _selected: boolean = false;
        public itemIndex: number = -1;
        protected isInitView: boolean = false;
        
        private touchCaptured: boolean = false;
        protected select_mc: any
        protected up_mc:any
        
        public constructor() {
            super();
            let self = this;
            self.addEventListener(egret.TouchEvent.TOUCH_BEGIN, self.onTouchBegin, this);
            self.addEventListener(eui.UIEvent.CREATION_COMPLETE, self.createCompleteEvent, this);
        }
        public get data(): any {
            let self = this;
            return self._data;
        }

        public set data(value: any) {
            let self = this;
            self.setData(value);
        }
        public setData(value: any) {
            let self = this;
            self._data = value;
            eui.PropertyEvent.dispatchPropertyEvent(self, eui.PropertyEvent.PROPERTY_CHANGE, "data");
            egret.callLater(self.dataChanged,self);
        }
        protected dataChanged(): void {
            let self = this;
            if (self.isInitView == false)
            {
                return;
            }    
        }
        public get selected(): boolean {
            let self = this;
            return self._selected;
        }

        public set selected(value: boolean) {
            let self = this;
            if (self._selected == value)
                return;
            self._selected = value;
            self.invalidateState();
        }
        protected onTouchCancle(event: egret.TouchEvent): void {
            let self = this;
            self.touchCaptured = false;
            let stage = event.$currentTarget;
            stage.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, self.onTouchCancle, this);
            stage.removeEventListener(egret.TouchEvent.TOUCH_END, self.onStageTouchEnd, this);
            self.invalidateState();
        }
        protected onTouchBegin(event: egret.TouchEvent): void {
            let self = this;
            self.$stage.addEventListener(egret.TouchEvent.TOUCH_CANCEL, self.onTouchCancle, this);
            self.$stage.addEventListener(egret.TouchEvent.TOUCH_END, self.onStageTouchEnd, this);
            self.touchCaptured = true;
            self.invalidateState();
            event.updateAfterEvent();
        }

        private onStageTouchEnd(event: egret.Event): void {
            let self = this;
            let stage = event.$currentTarget;
            stage.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, self.onTouchCancle, this);
            stage.removeEventListener(egret.TouchEvent.TOUCH_END, self.onStageTouchEnd, this);
            self.touchCaptured = false;
            self.invalidateState();
        }
        public invalidateState():void{
            super.invalidateState();
            let self = this;
            if (self.select_mc) self.select_mc.visible = self.selected;
            if (self.up_mc) self.up_mc.visible = !self.selected;
        }
        protected getCurrentState(): string {
            let state = "up";
            let self = this;
            if (!self.enabled) {
                state = "disabled";
            }
            if (self.touchCaptured) {
                state = "down";
            }
            if (self._selected) {
                let selectedState = state + "AndSelected";
                let skin = self.skin;
                if (skin && skin.hasState(selectedState)) {
                    return selectedState;
                }
                return state == "disabled" ? "disabled" : "down";
            }
            return state;
        }
        
        private createCompleteEvent(event: eui.UIEvent): void
        {
            let self = this;
            self.removeEventListener(eui.UIEvent.CREATION_COMPLETE, self.createCompleteEvent, this);
            self.isInitView = true;
            egret.callLater(self.dataChanged, this);
            self.invalidateState();
        }
        $onAddToStage(stage: egret.Stage, nestLevel: number):void
        {
            super.$onAddToStage(stage, nestLevel);
            let self = this;
            self.addEventListener(eui.UIEvent.CREATION_COMPLETE, self.createCompleteEvent, this);
        }
        $onRemoveFromStage():void{
            super.$onRemoveFromStage();
            let self = this;
            self.removeEventListener(eui.UIEvent.CREATION_COMPLETE, self.createCompleteEvent, this);
        }
        public onDestroy(): void
        {
            let self = this;
            // self.stage.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, self.onTouchCancle, this);
            // self.stage.removeEventListener(egret.TouchEvent.TOUCH_END, self.onStageTouchEnd, this);
            self.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, self.onTouchBegin, this);
            super.onDestroy();
            
            
        }
        
    }
}
