var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var CfgData = (function () {
        function CfgData() {
        }
        CfgData.getDataByUrl = function (url) {
            var self = this;
            if (self.josnData.hasOwnProperty(url)) {
                return self.josnData[url];
            }
            return null;
        };
        CfgData.setDataByUrl = function (url, data) {
            var self = this;
            data = data.replace(/\r/g, '');
            data = data.replace(/\n/g, '');
            data = data.replace(/\[,(.+)]/g, '');
            // data = data.replace(/\,,/g, ',0,');
            // data = data.replace(/\,,/g, ',"-",');
            if (data.slice(data.length - 1, data.length) == ',') {
                data = data.slice(0, data.length - 1) + ']';
            }
            var s;
            debug("开始解析配置" + url);
            do {
                s = data.slice(0, 1);
                if (s != '[' && s != '{') {
                    data = data.slice(1);
                }
            } while (s != '[' && s != '{');
            var jData = JSON.parse(data);
            self.josnData[url] = jData;
        };
        return CfgData;
    }());
    CfgData.global_json = 'cfg_Global_json';
    CfgData.lan_json = 'cfg_Lan_json';
    CfgData.monster_json = 'cfg_Monster_json';
    CfgData.bullet_json = 'cfg_Bullet_json';
    CfgData.skill_json = 'cfg_skill_json';
    CfgData.scene_json = 'cfg_Scene_json';
    CfgData.goods_json = 'cfg_goods_json';
    CfgData.server_json = 'cfg_Server_json';
    CfgData.buff_json = 'cfg_buff_json';
    CfgData.effect_json = 'cfg_effect_json';
    CfgData.randomName_json = 'cfg_random_name_json';
    CfgData.josnData = {};
    game.CfgData = CfgData;
    __reflect(CfgData.prototype, "game.CfgData");
})(game || (game = {}));
//# sourceMappingURL=CfgData.js.map