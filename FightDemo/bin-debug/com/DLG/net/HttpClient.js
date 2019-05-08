var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @author
 *
 */
var DLG;
(function (DLG) {
    var HttpClient = (function () {
        function HttpClient(serverUrl) {
            if (serverUrl === void 0) { serverUrl = null; }
            if (serverUrl) {
                this.serverUrl = serverUrl;
            }
        }
        HttpClient.prototype.paramsBuilder = function (data) {
            var params = [];
            if (typeof (data) == 'object') {
                var key;
                for (key in data) {
                    params.push(key + '=' + data[key]);
                }
                return params.join('&');
            }
            else if (typeof (data) == 'string') {
                return data;
            }
            return '';
        };
        HttpClient.prototype.send = function (method, callback, target, data) {
            this.returnFunc = callback;
            this.target = target;
            this.request = new egret.HttpRequest();
            var req = this.request;
            var params = this.paramsBuilder(data);
            if (method == egret.HttpMethod.POST) {
                req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            }
            else {
                this.serverUrl += '?' + params;
                params = '';
            }
            debug("serverUrl:" + this.serverUrl);
            req.responseType = egret.HttpResponseType.TEXT;
            req.open(this.serverUrl, method);
            req.send(data);
            req.addEventListener(egret.Event.COMPLETE, this.onGetComplete, this);
            req.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onGetIOError, this);
            req.addEventListener(egret.ProgressEvent.PROGRESS, this.onGetProgress, this);
        };
        HttpClient.prototype.onGetComplete = function (event) {
            var request = event.currentTarget;
            var data = this.responseType == 'JSON' ? JSON.parse(request.response) : request.response;
            if (this.returnFunc != null) {
                this.returnFunc.call(this.target, data);
            }
            this.destory();
        };
        HttpClient.prototype.onGetIOError = function (event) {
            sayError("get error : " + event);
            this.destory();
        };
        HttpClient.prototype.onGetProgress = function (event) {
            debug("get progress : " + Math.floor(100 * event.bytesLoaded / event.bytesTotal) + "%");
        };
        HttpClient.prototype.destory = function () {
            var req = this.request;
            req.removeEventListener(egret.Event.COMPLETE, this.onGetComplete, this);
            req.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onGetIOError, this);
            req.removeEventListener(egret.ProgressEvent.PROGRESS, this.onGetProgress, this);
            this.returnFunc = null;
            this.request = null;
        };
        return HttpClient;
    }());
    DLG.HttpClient = HttpClient;
    __reflect(HttpClient.prototype, "DLG.HttpClient");
})(DLG || (DLG = {}));
//# sourceMappingURL=HttpClient.js.map