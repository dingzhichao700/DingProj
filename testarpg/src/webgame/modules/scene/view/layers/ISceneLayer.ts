
module egret {

	export interface ISceneLayer{
		addElement(target:DisplayObject,layerType:number,x:number,y:number):DisplayObject;
		removeElement(target:DisplayObject,isRecover:boolean):DisplayObject;
	}
}