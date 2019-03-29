var egret;
(function (egret) {
    var IsoMapEvent = (function (_super) {
        __extends(IsoMapEvent, _super);
        /**
         * 构造函数
         */
        function IsoMapEvent(type, bubbles, cancelable) {
            if (bubbles === void 0) { bubbles = false; }
            if (cancelable === void 0) { cancelable = false; }
            _super.call(this, type, bubbles, cancelable);
        }
        var __egretProto__ = IsoMapEvent.prototype;
        /**
         * 持续按下地图事件
         */
        IsoMapEvent.ISO_MAP_MOVING_START = "isoMapMovingStart";
        //		/**
        //		 * 等角投影地图每移动一个单位时调度的事件 
        //		 */		
        //		public static const ISO_MAP_MOVING:String = "isoMapMoving";
        //		/**
        //		 * 等角投影地图移动结束，此时可能未达到目标点，目标节点可能在边界，但地图已无法移动 
        //		 */		
        //		public static const ISO_MAP_MOVING_END:String = "isoMapMovingEnd";
        //		/**
        //		 * 等角投影地图路径到达目标节点 
        //		 */		
        //		public static const ISO_MAP_ARRIVE_TARGET_NODE:String = "isoMapArriveTargetNode";
        //		/**
        //		 * 等角投影地图路径节点开始移动，此时地图可能未开始移动，路径节点可能还在边界未达到视口中心点 
        //		 */		
        //		public static const ISO_MAP_PATH_START:String = "isoMapPathStart";
        //		/**
        //		 * 等角投影地图当前节点改变 ，当前节点改变时，目标节点可能未指向下一个节点，因先改变当前节点，然后才检测是否有下一个节点 
        //		 */		
        //		public static const ISO_MAP_CURRENT_NODE_CHANGED:String = "isoMapCurrentNodeChanged";
        //		/**
        //		 * 等角投影地图目标节点改变，
        //		 */		
        //		public static const ISO_MAP_TARGET_NODE_CHANGED:String = "isoMapTargetNodeChanged";
        /**
         * 等角投影地图渲染区域矩形位置改变
         */
        IsoMapEvent.ISO_MAP_RENDER_CHANGED = "isoMapRenderChanged";
        /**
         * 等角投影地图宽高等基础属性改变
         * @see IsoMap.setProperties()
         */
        IsoMapEvent.ISO_MAP_PROPERTY_CHANGED = "isoMapPropertyChanged";
        /**
         * 点击等角投影地图方块
         */
        IsoMapEvent.ISO_MAP_TILE_CLICK = "isoMapTileClick";
        return IsoMapEvent;
    })(egret.Event);
    egret.IsoMapEvent = IsoMapEvent;
    IsoMapEvent.prototype.__class__ = "egret.IsoMapEvent";
})(egret || (egret = {}));
