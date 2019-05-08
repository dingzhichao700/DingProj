var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var DLG;
(function (DLG) {
    // export class ProtoBuilder{
    //     public static protocol:Object
    // }
    /**
     * @author
     */
    var Socket = (function () {
        // private m_pCheckTimer: egret.Timer;
        function Socket() {
            this.m_bIsConnected = false;
            this.analysisSymbolArr = ['$', '%', '^', '&'];
        }
        Socket.prototype.onConnectByUrl = function (url, callback, onCloseFunc, object) {
            var self = this;
            self.m_pIp = url;
            // self.m_iPort = port;
            self.m_pRequestDataCalls = {};
            self.m_pRequestViewCalls = {};
            self.m_pSocket = new egret.WebSocket();
            // self.m_pSocket.type = egret.WebSocket.TYPE_BINARY;
            self.m_pSocket.addEventListener(egret.ProgressEvent.SOCKET_DATA, self.onReceive, self);
            self.m_pSocket.addEventListener(egret.Event.CONNECT, self.onConnected, self);
            self.m_pSocket.addEventListener(egret.Event.CLOSE, self.onClose, self);
            self.m_pSocket.addEventListener(egret.IOErrorEvent.IO_ERROR, self.onError, self);
            self.m_pConnectedObj = object;
            self.m_pConnectedCallback = callback;
            self.m_pConnectedClose = onCloseFunc;
            self.m_pSocket.connectByUrl(self.m_pIp);
            // self.m_pSocket.connect(self.m_pIp, self.m_iPort);
        };
        Socket.prototype.onConnect = function (ip, port, callback, onCloseFunc, object) {
            var self = this;
            self.m_pIp = ip;
            self.m_iPort = port;
            self.m_pRequestDataCalls = {};
            self.m_pRequestViewCalls = {};
            self.m_pSocket = new egret.WebSocket();
            // self.m_pSocket.type = egret.WebSocket.TYPE_BINARY;
            self.m_pSocket.addEventListener(egret.ProgressEvent.SOCKET_DATA, self.onReceive, self);
            self.m_pSocket.addEventListener(egret.Event.CONNECT, self.onConnected, self);
            self.m_pSocket.addEventListener(egret.Event.CLOSE, self.onClose, self);
            self.m_pSocket.addEventListener(egret.IOErrorEvent.IO_ERROR, self.onError, self);
            self.m_pConnectedObj = object;
            self.m_pConnectedCallback = callback;
            self.m_pConnectedClose = onCloseFunc;
            self.m_pSocket.connect(self.m_pIp, self.m_iPort);
        };
        Socket.prototype.onClose = function () {
            var self = this;
            debug('csocket onClose');
            self.m_bIsConnected = false;
            self.stopHeartbeat();
            self.onClear();
            if (self.m_pConnectedClose) {
                self.m_pConnectedClose.call(self.m_pConnectedObj);
            }
        };
        Socket.prototype.onReceive = function () {
            var self = this;
            var msg = self.m_pSocket.readUTF();
            var protoId;
            var len = Number(msg.substr(0, 5)) - 5 - 10000; //s.length;
            var s_out = null;
            //如果长度太多就要压缩了
            if (len <= 200000 && len > 2) {
                var intid = null;
                protoId = Number(msg.substr(5, 4));
                if (protoId < 1000 || protoId > 9000) {
                    return;
                }
                s_out = msg.substr(9, len - 4);
            }
            // if(ProtoBuilder.protocol.hasOwnProperty(protoId + ''))
            // {
            //     debug('没有配置该协议:' + protoId);
            //     return;
            // }
            debug("接收服务器的数据----->" + protoId, s_out);
            var i = 0;
            // let len:number;
            var proArr;
            var opt;
            var type;
            if (s_out.indexOf(">") == -1) {
                opt = '';
                proArr = self.m_pRequestDataCalls[protoId + '_' + opt];
                if (proArr) {
                    proArr[0].call(proArr[1], JSON.parse(s_out));
                }
                proArr = self.m_pRequestViewCalls[protoId + '_' + opt];
                if (proArr) {
                    len = proArr.length;
                    for (i = 0; i < len; i++) {
                        var arr = proArr[i];
                        var callLater = arr[2];
                        if (callLater) {
                            egret.callLater(arr[0], arr[1]);
                        }
                        else {
                            arr[0].call(arr[1]);
                        }
                    }
                }
            }
            else {
                var dataArr = s_out.split('>');
                opt = dataArr[0];
                type = dataArr[1];
                var data2 = dataArr[2].split("#");
                self.analysisData(data2, self.analysisSymbolArr[0]);
                proArr = self.m_pRequestDataCalls[protoId + '_' + opt];
                if (proArr) {
                    proArr[0].call(proArr[1], type, data2);
                }
                proArr = self.m_pRequestViewCalls[protoId + '_' + opt];
                if (proArr) {
                    len = proArr.length;
                    for (i = 0; i < len; i++) {
                        var arr = proArr[i];
                        var callLater = arr[2];
                        if (callLater) {
                            egret.callLater(arr[0], arr[1]);
                        }
                        else {
                            arr[0].call(arr[1]);
                        }
                    }
                }
            }
            msg = null;
            s_out = null;
        };
        Socket.prototype.analysisData = function (data, split) {
            var self = this;
            var i = 0;
            var len = data.length;
            var index = self.analysisSymbolArr.indexOf(split);
            var s;
            if (split != '&') {
                var s_1 = self.analysisSymbolArr[index + 1];
            }
            for (i = 0; i < len; i++) {
                if (data[i].indexOf(split) != -1) {
                    data[i] = data[i].split(split);
                    if (s) {
                        var has = data[i].indexOf(s) == -1 ? false : true;
                        if (has) {
                            self.analysisData(data[i], s);
                        }
                    }
                }
            }
        };
        Socket.prototype.onConnected = function () {
            var self = this;
            debug("csocket onConnected ok");
            self.m_bIsConnected = true;
            self.startHeartbeat();
            if (self.m_pConnectedCallback) {
                self.m_pConnectedCallback.call(self.m_pConnectedObj);
            }
        };
        Socket.prototype.onClear = function () {
            var self = this;
            if (!self.m_pSocket)
                return;
            self.m_pSocket.removeEventListener(egret.ProgressEvent.SOCKET_DATA, self.onReceive, self);
            self.m_pSocket.removeEventListener(egret.Event.CONNECT, self.onConnected, self);
            self.m_pSocket.removeEventListener(egret.Event.CLOSE, self.onClose, self);
            self.m_pSocket.removeEventListener(egret.IOErrorEvent.IO_ERROR, self.onError, self);
            self.m_pSocket = null;
            // self.m_pResLogin = null;
            // Socket._instance = null;
        };
        Socket.prototype.onError = function () {
            var self = this;
            if (Socket.tryErrNum < 1 && self.m_bIsConnected) {
                sayError("csocket onError");
                var strIP = self.m_pIp;
                var iPort = self.m_iPort;
                if (iPort == undefined) {
                    self.m_pSocket.connectByUrl(self.m_pIp);
                }
                else {
                    self.m_pSocket.connect(self.m_pIp, self.m_iPort);
                }
                Socket.tryErrNum += 1;
            }
            else {
                self.onClose();
            }
        };
        Socket.prototype.onSend = function (protocol, sendData, self_param) {
            var self = this;
            if (self.m_bIsConnected == false) {
                return;
            }
            var str = JSON.stringify(sendData);
            str = str.slice(1, str.length - 1);
            str = protocol.toString() + str;
            var len = 1000 + str.length + 4;
            str = len.toString() + str + '`~`~';
            //如果
            self.m_pSocket.writeUTF(str);
            debug("发送数据：   " + protocol, str.toString());
            self.m_pSocket.flush();
            str = null;
        };
        //是否已经连接成功
        Socket.prototype.isConnected = function () {
            var self = this;
            return self.m_bIsConnected;
        };
        Socket.prototype.setHeartbeatPack = function (func, obj) {
            var self = this;
            self.m_pHeartbeatTimerCallback = func;
            self.m_pHeartbeatTimerObj = obj;
        };
        Socket.prototype.onDataCallback = function (protocol, opt, callback, target) {
            var self = this;
            if (!self.m_pRequestDataCalls[protocol + '_' + opt]) {
                self.m_pRequestDataCalls[protocol + '_' + opt] = [];
            }
            else {
                throw new Error('重复注册协议');
            }
            var proArr = self.m_pRequestDataCalls[protocol + '_' + opt];
            // let arr:Array<any> = [callback,target];
            proArr.push(callback, target);
        };
        Socket.prototype.onViewCallback = function (protocol, opt, callback, target, view, callLater) {
            if (callLater === void 0) { callLater = true; }
            var self = this;
            if (!self.m_pRequestViewCalls[protocol + '_' + opt]) {
                self.m_pRequestViewCalls[protocol + '_' + opt] = [];
            }
            var proArr = self.m_pRequestViewCalls[protocol + '_' + opt];
            var arr = [callback, target, callLater, view.name];
            proArr.push(arr);
        };
        Socket.prototype.onRemoveCallBackByView = function (view) {
        };
        Socket.prototype.onRemoveCallBack = function (protocol, opt, isView) {
            if (isView === void 0) { isView = true; }
            var self = this;
            var i = 0;
            var len;
            var proArr;
            if (isView == false) {
                proArr = self.m_pRequestDataCalls[protocol + '_' + opt];
                self.m_pRequestDataCalls[protocol + '_' + opt] = null;
            }
            else {
                proArr = self.m_pRequestViewCalls[protocol + '_' + opt];
            }
            if (proArr) {
                len = proArr.length;
                for (i = 0; i < len; i++) {
                    var arr = proArr[i];
                    arr[0] = null;
                    proArr[i] = null;
                }
                proArr = [];
            }
        };
        //开始发送心跳包
        Socket.prototype.startHeartbeat = function () {
            var self = this;
            debug('startHeartbeat');
            if (self.m_pHeartbeatTimer == null) {
                self.m_pHeartbeatTimer = new egret.Timer(1000 * Socket.TIMER, 0);
                self.m_pHeartbeatTimer.addEventListener(egret.TimerEvent.TIMER, self.checkTimer, self);
                self.m_pHeartbeatTimer.start();
            }
        };
        Socket.prototype.checkTimer = function () {
            var self = this;
            if (self.m_pHeartbeatTimerCallback)
                self.m_pHeartbeatTimerCallback.call(self.m_pHeartbeatTimerObj);
        };
        Socket.prototype.stopHeartbeat = function () {
            var self = this;
            if (self.m_pHeartbeatTimer) {
                self.m_pHeartbeatTimer.removeEventListener(egret.TimerEvent.TIMER, self.checkTimer, self);
                self.m_pHeartbeatTimer.stop();
                self.m_pHeartbeatTimer = null;
            }
            // self.m_pCheckTimer.stop();
            self.m_pRequestDataCalls = {};
            self.m_pRequestViewCalls = {};
        };
        return Socket;
    }());
    Socket.TIMER = 30;
    Socket.tryErrNum = 0;
    DLG.Socket = Socket;
    __reflect(Socket.prototype, "DLG.Socket");
})(DLG || (DLG = {}));
//# sourceMappingURL=Socket.js.map