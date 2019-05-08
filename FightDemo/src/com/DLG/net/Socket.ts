module DLG {
    // export class ProtoBuilder{
    //     public static protocol:Object
    // }

    /**
	 * @author 
	 */
    export class Socket {
        private static TIMER: number = 30;
        public static tryErrNum: number = 0;
        // private static _instance: Socket;

        // public static getInstance() {
        //     if (!Socket._instance) {
        //         Socket._instance = new Socket();
        //     }
        //     return Socket._instance;
        // }

        private m_pIp: string;
        private m_iPort: number;
        private m_pSocket: egret.WebSocket;
        private m_bIsConnected: Boolean = false;

        private m_pRequestDataCalls: any;
        private m_pRequestViewCalls: any;
        /**连接成功处理方法 */
        private m_pConnectedObj: any;
        private m_pConnectedCallback: Function;
        private m_pConnectedClose:Function;
        /**心跳处理方法  */
        private m_pHeartbeatTimerObj: any;
        private m_pHeartbeatTimerCallback: Function;
        private m_pHeartbeatTimer: egret.Timer;
        // private m_pCheckTimer: egret.Timer;


        public constructor() {
            
        }
        
        public onConnectByUrl(url: string,callback: Function,onCloseFunc:Function, object: any) {
            let self = this;
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
            self.m_pSocket.connectByUrl(self.m_pIp)
            // self.m_pSocket.connect(self.m_pIp, self.m_iPort);
        }
        public onConnect(ip: string, port: number , callback: Function,onCloseFunc:Function, object: any) {
            let self = this;
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
        }
        public onClose() {
            let self = this;
            debug('csocket onClose');
            self.m_bIsConnected = false;
            self.stopHeartbeat();
            self.onClear();
            if(self.m_pConnectedClose)
            {
                self.m_pConnectedClose.call(self.m_pConnectedObj);
            }
        }

        private onReceive() {

            
            let self = this;
            let msg = self.m_pSocket.readUTF();
            let protoId: number
            let len: number = Number(msg.substr(0, 5)) - 5 - 10000;              //s.length;
            let s_out:string = null;
            //如果长度太多就要压缩了
            if(len <= 200000 && len > 2) {
                let intid:String = null;
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
            debug("接收服务器的数据----->" + protoId , s_out);
            
            let i:number = 0;
            // let len:number;
            let proArr;
            let opt 
            let type ;
            if(s_out.indexOf(">") == -1 )
            {
                opt = '';
                proArr = self.m_pRequestDataCalls[protoId+'_'+opt];
                if(proArr)
                {
                    proArr[0].call(proArr[1],JSON.parse(s_out));
                }

                proArr = self.m_pRequestViewCalls[protoId+'_'+opt];
                if(proArr)
                {
                    len = proArr.length;
                    for(i = 0;i < len;i ++)
                    {
                        let arr = proArr[i];
                        let callLater:boolean = arr[2];
                        if(callLater)
                        {
                            egret.callLater(arr[0],arr[1]);
                        }else
                        {
                            arr[0].call(arr[1]);
                        }
                    }
                }
            }
            else
            {
                let dataArr = s_out.split('>');
                opt = dataArr[0];
                type = dataArr[1];
                let data2: Array<any> = dataArr[2].split("#");
                self.analysisData(data2,self.analysisSymbolArr[0]);
                proArr = self.m_pRequestDataCalls[protoId+'_'+opt];
                if(proArr)
                {
                    proArr[0].call(proArr[1],type,data2);
                }

                proArr = self.m_pRequestViewCalls[protoId+'_'+opt];
                if(proArr)
                {
                    len = proArr.length;
                    for(i = 0;i < len;i ++)
                    {
                        let arr = proArr[i];
                        let callLater:boolean = arr[2];
                        if(callLater)
                        {
                            egret.callLater(arr[0],arr[1]);
                        }else
                        {
                            arr[0].call(arr[1]);
                        }
                    }
                }
            }
           
            

            
            msg = null;
            s_out = null;
            
        }
        private analysisSymbolArr: Array<string> = [ '$', '%', '^', '&'];
        private analysisData(data,split): void
        {
            let self = this;
            let i:number = 0;
            let len: number = data.length;
            let index = self.analysisSymbolArr.indexOf(split);
            let s;
            if (split != '&') {
                let s = self.analysisSymbolArr[index + 1];
            }
            for (i = 0; i < len; i++) {
                if (data[i].indexOf(split) != -1)
                {
                    data[i] = data[i].split(split);
                    if (s)
                    {
                        let has: boolean = data[i].indexOf(s) == -1 ? false : true;
                        if (has)
                        {
                            self.analysisData(data[i], s);
                        } 
                    }    
                    
                }
            }
        }

        private onConnected() {
            let self = this;
            debug("csocket onConnected ok");
            self.m_bIsConnected = true;
            self.startHeartbeat();
            if(self.m_pConnectedCallback)
            {
                self.m_pConnectedCallback.call(self.m_pConnectedObj);
            }
        }

        private onClear(): void {
            let self = this;
            if (!self.m_pSocket) return;
            self.m_pSocket.removeEventListener(egret.ProgressEvent.SOCKET_DATA, self.onReceive, self);
            self.m_pSocket.removeEventListener(egret.Event.CONNECT, self.onConnected, self);
            self.m_pSocket.removeEventListener(egret.Event.CLOSE, self.onClose, self);
            self.m_pSocket.removeEventListener(egret.IOErrorEvent.IO_ERROR, self.onError, self);
            self.m_pSocket = null;
            // self.m_pResLogin = null;
            // Socket._instance = null;
        }

        

        private onError() {
            let self = this;
            if (Socket.tryErrNum < 1 && self.m_bIsConnected ) {
                sayError("csocket onError");
                let strIP = self.m_pIp;
                let iPort = self.m_iPort;
                if(iPort == undefined)
                {
                    self.m_pSocket.connectByUrl(self.m_pIp);
                }else{
                    self.m_pSocket.connect(self.m_pIp, self.m_iPort);
                }
                
                Socket.tryErrNum += 1;
            } else {
                self.onClose();
                // if(self.m_pConnectedClose)
                // {
                //     self.m_pConnectedClose.call(self.m_pConnectedObj);
                // }
            }
        }

        public onSend(protocol: number, sendData: any, self_param?: any) {
            let self = this;
            if(self.m_bIsConnected == false)
            {
                return;
            }
            let str = JSON.stringify(sendData);
            str = str.slice(1, str.length - 1);
            str = protocol.toString() + str;
            let len: number = 1000 + str.length + 4;
            str = len.toString() + str + '`~`~';
            //如果
            self.m_pSocket.writeUTF(str);
            debug("发送数据：   " + protocol, str.toString());
            self.m_pSocket.flush();
            str = null;

            
        }

        //是否已经连接成功
        public isConnected() {
            let self = this;
            return self.m_bIsConnected;
        }
        public setHeartbeatPack(func , obj):void
        {
            let self = this;
            self.m_pHeartbeatTimerCallback = func;
            self.m_pHeartbeatTimerObj = obj;
        }


        public onDataCallback(protocol: any,opt:string, callback: Function, target: any) {
            let self = this;
            if (!self.m_pRequestDataCalls[protocol + '_' +opt]) {
                self.m_pRequestDataCalls[protocol + '_' +opt] = [];
            } else
            {
                throw new Error('重复注册协议');
            }    
            let proArr = self.m_pRequestDataCalls[protocol + '_' +opt];
            // let arr:Array<any> = [callback,target];
            proArr.push(callback,target);
            
        }
        public onViewCallback(protocol: any, opt:string,callback: Function, target: any, view: VPanel, callLater: boolean = true) {
            let self = this;
            if (!self.m_pRequestViewCalls[protocol+ '_' + opt]) {
                self.m_pRequestViewCalls[protocol+ '_' + opt] = [];
            }
            let proArr = self.m_pRequestViewCalls[protocol+ '_' + opt];
            let arr:Array<any> = [callback,target,callLater,view.name];
            proArr.push(arr); 
        }
        public onRemoveCallBackByView(view:any )
        {

        }
        public onRemoveCallBack(protocol:any ,opt:string, isView:boolean = true )
        {
            let self = this;
            let i:number = 0;
            let len:number;
            let proArr;
            if(isView == false)
            {
                proArr = self.m_pRequestDataCalls[protocol + '_' + opt];
                self.m_pRequestDataCalls[protocol+ '_' + opt] = null;
            }else
            {
                 proArr = self.m_pRequestViewCalls[protocol+ '_' + opt];
            }
            if(proArr)
            {
                len = proArr.length;
                for(i = 0;i < len;i++)
                {
                    let arr = proArr[i];
                    
                    arr[0] = null;
                    proArr[i] = null;
                }
                proArr = [];
            }
        }

       
        //开始发送心跳包
        private startHeartbeat() {
            let self = this;
            debug('startHeartbeat');
            if(self.m_pHeartbeatTimer == null)
            {
                self.m_pHeartbeatTimer = new egret.Timer(1000 * Socket.TIMER, 0);
                self.m_pHeartbeatTimer.addEventListener(egret.TimerEvent.TIMER, self.checkTimer, self);
                self.m_pHeartbeatTimer.start();
            }

        }

        private checkTimer() {
            let self = this;
            if(self.m_pHeartbeatTimerCallback)
                self.m_pHeartbeatTimerCallback.call(self.m_pHeartbeatTimerObj);
        }

        private stopHeartbeat() {
            let self = this;
            if(self.m_pHeartbeatTimer)
            {
                self.m_pHeartbeatTimer.removeEventListener(egret.TimerEvent.TIMER, self.checkTimer, self);
                self.m_pHeartbeatTimer.stop();
                self.m_pHeartbeatTimer = null;
            }
            // self.m_pCheckTimer.stop();
            self.m_pRequestDataCalls = {};
            self.m_pRequestViewCalls = {};
        }
    
    }
}
