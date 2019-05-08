var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var DLG;
(function (DLG) {
    /**
     *
     * @author
     *
     */
    var CustomEvent = (function () {
        function CustomEvent() {
            this.isTapBegin = false;
            this.target = null;
            this.type = "";
            this.listener = null;
            this.thisObject = null;
            this.argObject = null;
            this.useCapture = false;
            this.isStopBubble = false;
        }
        CustomEvent.create = function (target, type, listener, thisObject, argObject, isStopBubble, useCapture) {
            var evt = new CustomEvent();
            evt.target = target;
            evt.type = type;
            evt.listener = listener;
            evt.thisObject = thisObject;
            evt.argObject = argObject;
            evt.isStopBubble = isStopBubble;
            evt.useCapture = useCapture;
            return evt;
        };
        CustomEvent.prototype.dispose = function () {
            this.target = null;
            this.listener = null;
            this.thisObject = null;
            this.argObject = null;
        };
        return CustomEvent;
    }());
    DLG.CustomEvent = CustomEvent;
    __reflect(CustomEvent.prototype, "DLG.CustomEvent");
    var EventManager = (function () {
        function EventManager() {
            // private static _instance: EventManager;
            this.m_pEventLists = {};
            this.m_pNotifies = {};
        }
        // public static getInstance() {
        //     if(!EventManager._instance) {
        //         EventManager._instance = new EventManager();
        //     }
        //     return EventManager._instance;
        // }
        EventManager.prototype.listener = function (event) {
            var object = event.currentTarget;
            if (this.m_pEventLists[object.hashCode] && this.m_pEventLists[object.hashCode][event.type]) {
                var ce = this.m_pEventLists[object.hashCode][event.type];
                // if(event.type === egret.TouchEvent.TOUCH_TAP){
                // Sound.play("BtnClick");
                // console.error("BtnClick  listener")
                // }
                ce.listener.call(ce.thisObject, event);
            }
        };
        EventManager.prototype.pushEventList = function (object, type, listener, thisObject, argObject, isStopBubble, useCapture) {
            if (!this.m_pEventLists[object.hashCode])
                this.m_pEventLists[object.hashCode] = {};
            this.m_pEventLists[object.hashCode][type] = CustomEvent.create(object, type, listener, thisObject, argObject, isStopBubble, useCapture);
        };
        EventManager.prototype.addNotify = function (object, type, listener, thisObject, useCapture, priority) {
            // if(!object.hasEventListener(type)){
            object.addEventListener(type, listener, thisObject, useCapture, priority);
            if (!this.m_pNotifies[object.hashCode])
                this.m_pNotifies[object.hashCode] = [];
            this.m_pNotifies[object.hashCode].push(CustomEvent.create(object, type, listener, thisObject, null, useCapture));
            // }
        };
        EventManager.prototype.addEventListener = function (object, type, thisObject, listener, useCapture, priority, argObject) {
            this.addNotify(object, type, this.listener, this, useCapture, priority);
            this.pushEventList(object, type, listener, thisObject, argObject, false, useCapture);
        };
        EventManager.prototype.doAnimScale = function (object, cevt) {
            var tw = egret.Tween.get(object);
            var scale = cevt.argObject ? cevt.argObject : 1;
            var bigScale = Number(scale) * 1.1;
            tw.to({ scaleX: bigScale, scaleY: bigScale }, 100).to({ scaleX: scale, scaleY: scale }, 100)
                .call(function (cevt) {
                cevt.isTapBegin = false;
            }, this, [cevt]);
        };
        EventManager.prototype.onScaleTouch = function (event) {
            var object = event.currentTarget;
            var eventList = this.m_pEventLists[object.hashCode];
            if (eventList && eventList[event.type]) {
                var cevt = eventList[event.type];
                if (cevt.isStopBubble) {
                    event.stopImmediatePropagation();
                }
                var tapBeginEvent = eventList[egret.TouchEvent.TOUCH_BEGIN];
                switch (event.type) {
                    case egret.TouchEvent.TOUCH_BEGIN:
                        var tw = egret.Tween.get(event.currentTarget);
                        cevt.isTapBegin = true;
                        tw.to(cevt.argObject, 100);
                        break;
                    case egret.TouchEvent.TOUCH_MOVE:
                        var scale = cevt.argObject ? cevt.argObject : 1;
                        if (!cevt || cevt.isTapBegin || !tapBeginEvent.isTapBegin || event.currentTarget.scaleX == scale)
                            return;
                        cevt.isTapBegin = true;
                        this.doAnimScale(event.currentTarget, cevt);
                        tapBeginEvent.isTapBegin = false;
                        break;
                    case egret.TouchEvent.TOUCH_END:
                    case egret.TouchEvent.TOUCH_RELEASE_OUTSIDE:
                        var scale = cevt.argObject ? cevt.argObject : 1;
                        if (!cevt || cevt.isTapBegin || !tapBeginEvent.isTapBegin || event.currentTarget.scaleX == scale)
                            return;
                        cevt.isTapBegin = true;
                        this.doAnimScale(event.currentTarget, cevt);
                        tapBeginEvent.isTapBegin = false;
                        if (cevt.listener && cevt.thisObject) {
                            cevt.listener.call(cevt.thisObject, event);
                        }
                        break;
                }
            }
        };
        EventManager.prototype.addItemRenderAnim = function (object, scale) {
            if (scale === void 0) { scale = 0.9; }
            this.addScaleListener(object, scale, null, null, 1, true);
        };
        EventManager.prototype.addScaleListener = function (object, scale, thisObject, listener, defaultScale, isMoveEvent, isStopBubble) {
            if (scale === void 0) { scale = 0.9; }
            this.addNotify(object, egret.TouchEvent.TOUCH_BEGIN, this.onScaleTouch, this);
            this.addNotify(object, egret.TouchEvent.TOUCH_END, this.onScaleTouch, this);
            if (isMoveEvent)
                this.addNotify(object, egret.TouchEvent.TOUCH_MOVE, this.onScaleTouch, this);
            this.addNotify(object, egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onScaleTouch, this);
            this.pushEventList(object, egret.TouchEvent.TOUCH_BEGIN, listener, thisObject, { scaleX: scale, scaleY: scale }, isStopBubble);
            this.pushEventList(object, egret.TouchEvent.TOUCH_END, listener, thisObject, defaultScale, isStopBubble);
            if (isMoveEvent)
                this.pushEventList(object, egret.TouchEvent.TOUCH_MOVE, listener, thisObject, defaultScale, isStopBubble);
            this.pushEventList(object, egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, listener, thisObject, defaultScale, isStopBubble);
        };
        EventManager.prototype.removeEventListener = function (object) {
            var hashCode = object.hashCode;
            var events = this.m_pNotifies[hashCode];
            var event;
            var dict = this.m_pEventLists[hashCode];
            if (events) {
                for (var i = 0; i < events.length; i++) {
                    event = events[i];
                    object.removeEventListener(event.type, event.listener, event.thisObject, event.useCapture);
                    event.dispose();
                    event = null;
                }
                for (var type in dict) {
                    event = dict[type];
                    event.dispose();
                    event = null;
                    delete dict[type];
                }
            }
            this.m_pNotifies[hashCode] = null;
            this.m_pEventLists[hashCode] = null;
            delete this.m_pNotifies[hashCode];
            delete this.m_pEventLists[hashCode];
        };
        EventManager.prototype.removeEventListeners = function (thisObject) {
            for (var code in this.m_pEventLists) {
                var events = this.m_pEventLists[code];
                if (events) {
                    for (var type in events) {
                        var ce = events[type];
                        if (ce.thisObject && ce.thisObject.hashCode == thisObject.hashCode) {
                            this.removeEventListener(ce.target);
                        }
                    }
                }
            }
        };
        EventManager.prototype.addTouchTapListener = function (object, thisObject, listener, useCapture, priority, argObject) {
            this.addEventListener(object, egret.TouchEvent.TOUCH_TAP, thisObject, listener, useCapture, priority);
        };
        EventManager.prototype.addTouchScaleListener = function (object, thisObject, listener, useCapture, priority, argObject) {
            this.addScaleListener(object, 0.9, thisObject);
            this.addEventListener(object, egret.TouchEvent.TOUCH_TAP, thisObject, listener, useCapture, priority);
        };
        return EventManager;
    }());
    DLG.EventManager = EventManager;
    __reflect(EventManager.prototype, "DLG.EventManager");
})(DLG || (DLG = {}));
//# sourceMappingURL=EventManager.js.map