var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DLG;
(function (DLG) {
    var CComponent = (function (_super) {
        __extends(CComponent, _super);
        function CComponent() {
            return _super.call(this) || this;
            // self.lan = DLG.AppCore.lan;
        }
        Object.defineProperty(CComponent.prototype, "skinName", {
            get: function () {
                var self = this;
                return self.$Component[1 /* skinName */];
            },
            set: function (value) {
                var self = this;
                var values = self.$Component;
                values[5 /* skinNameExplicitlySet */] = true;
                if (values[1 /* skinName */] == value)
                    return;
                if (value) {
                    values[1 /* skinName */] = value;
                }
                else if (self.$stage) {
                    var theme = self.$stage.getImplementation("eui.Theme");
                    if (theme) {
                        var skinName = theme.getSkinName(self);
                        if (skinName) {
                            //egret.log("theme.setSkinFunc " + skinName);
                            values[1 /* skinName */] = skinName;
                        }
                    }
                }
                self.$parseSkinName();
            },
            enumerable: true,
            configurable: true
        });
        CComponent.prototype.setSkinName = function (value) {
            this.skinName = value;
        };
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
        CComponent.prototype.setData = function (value) {
            var self = this;
            self._data = value;
        };
        CComponent.prototype.getData = function (value) {
            var self = this;
            return self._data;
        };
        CComponent.prototype.removeFromParent = function () {
            var self = this;
            if (self.parent) {
                self.parent.removeChild(self);
            }
        };
        CComponent.prototype.onDestroy = function () {
            var self = this;
            self._data = null;
            if (self.UUID != undefined) {
                DLG.FactoryUtils.onReturnComp(this);
                return;
            }
            DLG.Utils.onDestroy(self);
            self.setSkin(null);
            self.$Component[1 /* skinName */] = null;
        };
        return CComponent;
    }(eui.Component));
    CComponent.CLASSNAME = 'DLG.CComponent';
    DLG.CComponent = CComponent;
    __reflect(CComponent.prototype, "DLG.CComponent", ["DLG.IComponent", "eui.UIComponent", "egret.DisplayObject"]);
    var CGroup = (function (_super) {
        __extends(CGroup, _super);
        function CGroup() {
            return _super.call(this) || this;
        }
        CGroup.prototype.setSkinName = function (value) {
            // this.skinName = value;
        };
        CGroup.prototype.setData = function (value) {
            var self = this;
            self._data = value;
        };
        CGroup.prototype.getData = function (value) {
            var self = this;
            return self._data;
        };
        CGroup.prototype.removeFromParent = function () {
            var self = this;
            if (self.parent) {
                self.parent.removeChild(this);
            }
        };
        CGroup.prototype.onDestroy = function () {
            var self = this;
            self._data = null;
            if (self.alpha != 1)
                self.alpha = 1;
            if (self.x != 0)
                self.x = 0;
            if (self.y != 0)
                self.y = 0;
            if (self.anchorOffsetX != 0)
                self.anchorOffsetX = 0;
            if (self.anchorOffsetY != 0)
                self.anchorOffsetY = 0;
            if (self.scaleX != 1)
                self.scaleX = 1;
            if (self.scaleY != 1)
                self.scaleY = 1;
            if (self.layout)
                self.layout = undefined;
            if (self.UUID != undefined) {
                DLG.FactoryUtils.onReturnComp(this);
                return;
            }
            DLG.Utils.onDestroy(this);
        };
        return CGroup;
    }(eui.Group));
    DLG.CGroup = CGroup;
    __reflect(CGroup.prototype, "DLG.CGroup", ["DLG.IComponent", "eui.UIComponent", "egret.DisplayObject"]);
    var CRect = (function (_super) {
        __extends(CRect, _super);
        function CRect(width, height, fillColor) {
            var _this = _super.call(this, width, height, fillColor) || this;
            var self = _this;
            self.touchEnabled = false;
            return _this;
        }
        CRect.prototype.setSkinName = function (value) {
            this.skinName = value;
        };
        CRect.prototype.setData = function (value) {
            var self = this;
        };
        CRect.prototype.getData = function (value) {
            var self = this;
            return null;
        };
        CRect.prototype.removeFromParent = function () {
            var self = this;
            if (self.parent) {
                self.parent.removeChild(this);
            }
        };
        CRect.prototype.onDestroy = function () {
            var self = this;
            if (self.UUID != undefined) {
                DLG.FactoryUtils.onReturnComp(this);
                return;
            }
        };
        return CRect;
    }(eui.Rect));
    DLG.CRect = CRect;
    __reflect(CRect.prototype, "DLG.CRect", ["DLG.IComponent", "eui.UIComponent", "egret.DisplayObject"]);
    var CTextInput = (function (_super) {
        __extends(CTextInput, _super);
        function CTextInput() {
            var _this = _super.call(this) || this;
            var self = _this;
            self.touchEnabled = false;
            return _this;
        }
        CTextInput.prototype.setSkinName = function (value) {
            this.skinName = value;
        };
        CTextInput.prototype.setData = function (value) {
            var self = this;
        };
        CTextInput.prototype.getData = function (value) {
            var self = this;
            return null;
        };
        CTextInput.prototype.removeFromParent = function () {
            var self = this;
            if (self.parent) {
                self.parent.removeChild(this);
            }
        };
        CTextInput.prototype.onDestroy = function () {
            var self = this;
            if (self.UUID != undefined) {
                DLG.FactoryUtils.onReturnComp(this);
                return;
            }
        };
        return CTextInput;
    }(eui.TextInput));
    DLG.CTextInput = CTextInput;
    __reflect(CTextInput.prototype, "DLG.CTextInput", ["DLG.IComponent", "eui.UIComponent", "egret.DisplayObject"]);
    var CLabel = (function (_super) {
        __extends(CLabel, _super);
        function CLabel() {
            var _this = _super.call(this) || this;
            var self = _this;
            self.touchEnabled = false;
            return _this;
        }
        CLabel.prototype.setSkinName = function (value) {
            // this.skinName = value;
        };
        CLabel.prototype.setData = function (value) {
            var self = this;
            self._data = value;
        };
        CLabel.prototype.getData = function (value) {
            var self = this;
            return self._data;
        };
        CLabel.prototype.removeFromParent = function () {
            var self = this;
            if (self.parent) {
                self.parent.removeChild(this);
            }
        };
        CLabel.prototype.onDestroy = function () {
            var self = this;
            self._data = null;
            if (self.UUID != undefined) {
                DLG.FactoryUtils.onReturnComp(this);
                return;
            }
        };
        return CLabel;
    }(eui.Label));
    DLG.CLabel = CLabel;
    __reflect(CLabel.prototype, "DLG.CLabel", ["DLG.IComponent", "eui.UIComponent", "egret.DisplayObject"]);
    /***
     * trackHighlight  轨道高亮显示对象。
     * thumb  滑块显示对象。
     * track  轨道显示对象。
     */
    var CHSlider = (function (_super) {
        __extends(CHSlider, _super);
        function CHSlider() {
            var _this = _super.call(this) || this;
            var self = _this;
            self.liveDragging = true;
            return _this;
        }
        CHSlider.prototype.setSkinName = function (value) {
            // this.skinName = value;
        };
        Object.defineProperty(CHSlider.prototype, "skinName", {
            get: function () {
                var self = this;
                return self.$Component[1 /* skinName */];
            },
            enumerable: true,
            configurable: true
        });
        CHSlider.prototype.setData = function (value) {
        };
        CHSlider.prototype.getData = function (value) {
        };
        CHSlider.prototype.removeFromParent = function () {
            var self = this;
            if (self.parent) {
                self.parent.removeChild(this);
            }
        };
        CHSlider.prototype.onTrackTouchBegin = function (event) {
            _super.prototype.onTrackTouchBegin.call(this, event);
            var self = this;
            self.thumb.once(egret.TouchEvent.TOUCH_MOVE, self.onThumbTouchBegin, this);
        };
        CHSlider.prototype.onDestroy = function () {
            var self = this;
            self._data = null;
            if (self.UUID != undefined) {
                DLG.FactoryUtils.onReturnComp(this);
                return;
            }
            // self.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this["onTouchBegin"], this);
            self.$SliderBase = null;
            DLG.Utils.onDestroy(this);
            self.setSkin(null);
            self.$Component[1 /* skinName */] = null;
        };
        return CHSlider;
    }(eui.HSlider));
    DLG.CHSlider = CHSlider;
    __reflect(CHSlider.prototype, "DLG.CHSlider", ["DLG.IComponent", "eui.UIComponent", "egret.DisplayObject"]);
    var CList = (function (_super) {
        __extends(CList, _super);
        function CList() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        CList.prototype.setSkinName = function (value) {
            // this.skinName = value;
        };
        CList.prototype.setData = function (value) {
            throw new Error('请使用dataProvider方法');
        };
        CList.prototype.getData = function (value) {
            throw new Error('请使用dataProvider方法');
        };
        CList.prototype.removeFromParent = function () {
            var self = this;
            if (self.parent) {
                self.parent.removeChild(this);
            }
        };
        CList.prototype.onDestroy = function () {
            var self = this;
            self._data = null;
            if (self.UUID != undefined) {
                DLG.FactoryUtils.onReturnComp(this);
                return;
            }
            var dataProvider = self.dataProvider;
            if (dataProvider) {
                dataProvider.removeAll();
                self.itemRenderer = null;
                self.dataProvider = null;
            }
            DLG.Utils.onDestroy(this);
        };
        return CList;
    }(eui.List));
    DLG.CList = CList;
    __reflect(CList.prototype, "DLG.CList", ["DLG.IComponent", "eui.UIComponent", "egret.DisplayObject"]);
    var CItemRenderer = (function (_super) {
        __extends(CItemRenderer, _super);
        function CItemRenderer() {
            var _this = _super.call(this) || this;
            _this._selected = false;
            _this.itemIndex = -1;
            _this.isInitView = false;
            _this.touchCaptured = false;
            var self = _this;
            self.addEventListener(egret.TouchEvent.TOUCH_BEGIN, self.onTouchBegin, _this);
            self.addEventListener(eui.UIEvent.CREATION_COMPLETE, self.createCompleteEvent, _this);
            return _this;
        }
        Object.defineProperty(CItemRenderer.prototype, "data", {
            get: function () {
                var self = this;
                return self._data;
            },
            set: function (value) {
                var self = this;
                self.setData(value);
            },
            enumerable: true,
            configurable: true
        });
        CItemRenderer.prototype.setData = function (value) {
            var self = this;
            self._data = value;
            eui.PropertyEvent.dispatchPropertyEvent(self, eui.PropertyEvent.PROPERTY_CHANGE, "data");
            egret.callLater(self.dataChanged, self);
        };
        CItemRenderer.prototype.dataChanged = function () {
            var self = this;
            if (self.isInitView == false) {
                return;
            }
        };
        Object.defineProperty(CItemRenderer.prototype, "selected", {
            get: function () {
                var self = this;
                return self._selected;
            },
            set: function (value) {
                var self = this;
                if (self._selected == value)
                    return;
                self._selected = value;
                self.invalidateState();
            },
            enumerable: true,
            configurable: true
        });
        CItemRenderer.prototype.onTouchCancle = function (event) {
            var self = this;
            self.touchCaptured = false;
            var stage = event.$currentTarget;
            stage.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, self.onTouchCancle, this);
            stage.removeEventListener(egret.TouchEvent.TOUCH_END, self.onStageTouchEnd, this);
            self.invalidateState();
        };
        CItemRenderer.prototype.onTouchBegin = function (event) {
            var self = this;
            self.$stage.addEventListener(egret.TouchEvent.TOUCH_CANCEL, self.onTouchCancle, this);
            self.$stage.addEventListener(egret.TouchEvent.TOUCH_END, self.onStageTouchEnd, this);
            self.touchCaptured = true;
            self.invalidateState();
            event.updateAfterEvent();
        };
        CItemRenderer.prototype.onStageTouchEnd = function (event) {
            var self = this;
            var stage = event.$currentTarget;
            stage.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, self.onTouchCancle, this);
            stage.removeEventListener(egret.TouchEvent.TOUCH_END, self.onStageTouchEnd, this);
            self.touchCaptured = false;
            self.invalidateState();
        };
        CItemRenderer.prototype.invalidateState = function () {
            _super.prototype.invalidateState.call(this);
            var self = this;
            if (self.select_mc)
                self.select_mc.visible = self.selected;
            if (self.up_mc)
                self.up_mc.visible = !self.selected;
        };
        CItemRenderer.prototype.getCurrentState = function () {
            var state = "up";
            var self = this;
            if (!self.enabled) {
                state = "disabled";
            }
            if (self.touchCaptured) {
                state = "down";
            }
            if (self._selected) {
                var selectedState = state + "AndSelected";
                var skin = self.skin;
                if (skin && skin.hasState(selectedState)) {
                    return selectedState;
                }
                return state == "disabled" ? "disabled" : "down";
            }
            return state;
        };
        CItemRenderer.prototype.createCompleteEvent = function (event) {
            var self = this;
            self.removeEventListener(eui.UIEvent.CREATION_COMPLETE, self.createCompleteEvent, this);
            self.isInitView = true;
            egret.callLater(self.dataChanged, this);
            self.invalidateState();
        };
        CItemRenderer.prototype.$onAddToStage = function (stage, nestLevel) {
            _super.prototype.$onAddToStage.call(this, stage, nestLevel);
            var self = this;
            self.addEventListener(eui.UIEvent.CREATION_COMPLETE, self.createCompleteEvent, this);
        };
        CItemRenderer.prototype.$onRemoveFromStage = function () {
            _super.prototype.$onRemoveFromStage.call(this);
            var self = this;
            self.removeEventListener(eui.UIEvent.CREATION_COMPLETE, self.createCompleteEvent, this);
        };
        CItemRenderer.prototype.onDestroy = function () {
            var self = this;
            // self.stage.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, self.onTouchCancle, this);
            // self.stage.removeEventListener(egret.TouchEvent.TOUCH_END, self.onStageTouchEnd, this);
            self.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, self.onTouchBegin, this);
            _super.prototype.onDestroy.call(this);
        };
        return CItemRenderer;
    }(CComponent));
    DLG.CItemRenderer = CItemRenderer;
    __reflect(CItemRenderer.prototype, "DLG.CItemRenderer", ["eui.IItemRenderer"]);
})(DLG || (DLG = {}));
//# sourceMappingURL=CComponent.js.map