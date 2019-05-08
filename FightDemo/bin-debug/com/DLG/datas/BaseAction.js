var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var DLG;
(function (DLG) {
    var BaseAction = (function () {
        function BaseAction() {
        }
        BaseAction.prototype.createSocket = function () {
            this.m_socket = DLG.DLGCore.socket;
        };
        BaseAction.prototype.createClock = function () {
            this.m_clock = DLG.DLGCore.clock;
        };
        BaseAction.prototype.createEvent = function () {
            this.m_event = DLG.DLGCore.event;
        };
        // protected createAnimate(): void
        // {
        // 	this.m_animate = DLG.DLGCore.animateTimer;
        // }
        BaseAction.prototype.createLan = function () {
            this.m_lan = DLG.DLGCore.lan;
        };
        BaseAction.prototype.createSound = function () {
            this.m_sound = DLG.DLGCore.sound;
        };
        BaseAction.prototype.createPanelMar = function () {
            this.m_panelMar = DLG.DLGCore.panel;
        };
        BaseAction.prototype.onExecute = function () {
            var param = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                param[_i] = arguments[_i];
            }
        };
        BaseAction.prototype.onDestroy = function () {
            var self = this;
            if (self.m_socket)
                self.m_socket = null;
            if (self.m_clock)
                self.m_clock = null;
            if (self.m_event)
                self.m_event = null;
            // if(self.m_animate) self.m_animate = null;
            if (self.m_lan)
                self.m_lan = null;
            if (self.m_sound)
                self.m_sound = null;
            if (self.m_panelMar)
                self.m_panelMar = null;
        };
        return BaseAction;
    }());
    DLG.BaseAction = BaseAction;
    __reflect(BaseAction.prototype, "DLG.BaseAction", ["DLG.IBaseAction"]);
})(DLG || (DLG = {}));
//# sourceMappingURL=BaseAction.js.map