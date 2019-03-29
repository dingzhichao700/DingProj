var egret;
(function (egret) {
    /**
     * openWindow <br/>
     * @author Dempsey <br/>
     * 2013-8-9
     */
    /**
     * 打开显示对象类，并显示在舞台上，并返回显示对象实例 ，如果是Window对象将自动调用initWindow()或recall()方法
     * @param targetClass:Class 显示对象类名称
     * @param isUI:boolean = false 是否为UI层对象，true时打开后放到UI层
     * @param layerType:int = -1 显示对象打开时所处的层级，若targetClass对象存在layerType属性，使用默认值时将自动使用些属性 @see ApplicationLayerType
     * @param align:int = -1  设置 显示对象在舞台上的对齐类型 ，默认值时不设置对齐，若targetClass对象存在align属性，使用默认值时将自动使用些属性，@see AlignType
     * @param name:String = null 显示对象名称，若isNew == true时，将设置显示对象的名称为此值，否则将搜索名称为此值的显示对象实例
     * @param isNew:Boolean = false 是否创建新的实例，为true时，将强制创建一个新的实例，否则会先搜索已存在的实例
     * @return
     * @see #close()
     */
    function openWindow(targetClass, isUI, layerType, align, name, isNew) {
        if (isUI === void 0) { isUI = true; }
        if (layerType === void 0) { layerType = -1; }
        if (align === void 0) { align = -1; }
        if (name === void 0) { name = null; }
        if (isNew === void 0) { isNew = false; }
        return egret.ApplicationManager.getInstance().open(targetClass, layerType, align, name, isNew);
    }
    egret.openWindow = openWindow;
})(egret || (egret = {}));
