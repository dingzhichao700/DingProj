module DLG {
    export interface IBaseAction
    {
		onDestroy(): void;
		onExecute():void;
	}
    export interface IComponent extends eui.UIComponent
    {
        setSkinName(value:any):void;
        parent: egret.DisplayObjectContainer;
        removeFromParent():void;
        setData(value:any):void;
        getData(value):any;
        onDestroy(): void;
    }
    export interface IButton  extends IComponent
    {
        setScaleClick(value: boolean): void;
        setEnable(value:boolean);
        setOnClickListener(thisObject: any, listener: Function , parame:any);
        setGray(value:boolean):void;
        setDisabled(value:boolean):void;
        setLabel(value:string):void;

    }
    export interface ISelect extends IButton
    {
        setSelect(isSelect: boolean):void;
        isSelect();
        
    }
    export interface IPanel extends IComponent
    {
        onShow(...arg): void
        onRefresh(): void 
        // getShowBeforeREs():Array<string>;
        getPanelId(): number;
        setMask(value:boolean):void;
        getMask():boolean;
    }
    export interface ITabPanel extends IPanel
    {
        onOpenIndex(value:number , parame?:any):void;
    }

    export interface ITabItem extends ISelect
    {
        setLabel(value:string):void;
        setLabelColor(value:string):void;
        setStrokeColor(value:string):void;
        setStroke(value:number):void;

    }
    
}
