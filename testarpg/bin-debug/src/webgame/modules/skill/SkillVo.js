var egret;
(function (egret) {
    var SkillVo = (function () {
        function SkillVo() {
        }
        var __egretProto__ = SkillVo.prototype;
        Object.defineProperty(__egretProto__, "id", {
            get: function () {
                return this._id;
            },
            set: function (value) {
                this._id = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "name", {
            get: function () {
                if (this.cfg) {
                    return this.cfg.name;
                }
                return "";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "desc", {
            get: function () {
                if (this.cfg) {
                    return this.cfg.desc;
                }
                return "";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "cfg", {
            get: function () {
                var cfg = egret.SkillManager.getInstance().getCfg(this._id);
                return cfg;
            },
            enumerable: true,
            configurable: true
        });
        return SkillVo;
    })();
    egret.SkillVo = SkillVo;
    SkillVo.prototype.__class__ = "egret.SkillVo";
})(egret || (egret = {}));
//# sourceMappingURL=SkillVo.js.map