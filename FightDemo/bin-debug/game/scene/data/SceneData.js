var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var SceneData = (function () {
        function SceneData() {
            this.monsterLen = 0;
            var self = this;
            self.monsterDic = {};
            self.roleDic = {};
            self.bulletDic = {};
            self.monsterIdList = [];
            self.roleIdList = [];
            self.bulletIdList = [];
        }
        return SceneData;
    }());
    /**角色站脚位置 */
    SceneData.roleStandPoint = [320, 210, 430, 100, 540];
    SceneData.boundary = 680;
    SceneData.borntBossWeight = [
        "", "", "6000|4000", "4000|3000|3000", "3000|3000|2000|2000", "3000|2000|2000|1500|1500"
    ];
    game.SceneData = SceneData;
    __reflect(SceneData.prototype, "game.SceneData");
})(game || (game = {}));
//# sourceMappingURL=SceneData.js.map