'use strict';var _typeof='function'==typeof Symbol&&'symbol'==typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&'function'==typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?'symbol':typeof a};(function(a,b){'object'===('undefined'==typeof exports?'undefined':_typeof(exports))&&'object'===('undefined'==typeof module?'undefined':_typeof(module))?module.exports=b():'function'==typeof define&&define.amd?define(b):'object'===('undefined'==typeof exports?'undefined':_typeof(exports))?exports.nes=b():a.nes=b()})('undefined'==typeof window?global:window,function(){var a=function(){},b=function(a){try{return JSON.stringify(a)}catch(a){throw new e(a,d.USER)}},c=function(a){return function(b){setTimeout(function(){return a(b)},0)}},d={TIMEOUT:'timeout',DISCONNECT:'disconnect',SERVER:'server',PROTOCOL:'protocol',WS:'ws',USER:'user'},e=function(a,b){'string'==typeof a&&(a=new Error(a)),a.type=b,a.isNes=!0;try{throw a}catch(a){return a}},f={1000:'Normal closure',1001:'Going away',1002:'Protocol error',1003:'Unsupported data',1004:'Reserved',1005:'No status received',1006:'Abnormal closure',1007:'Invalid frame payload data',1008:'Policy violation',1009:'Message too big',1010:'Mandatory extension',1011:'Internal server error',1015:'TLS handshake'},g=function(b,c){c=c||{},this._url=b,this._settings=c,this._heartbeatTimeout=!1,this._ws=null,this._reconnection=null,this._reconnectionTimer=null,this._ids=0,this._requests={},this._subscriptions={},this._heartbeat=null,this._packets=[],this._disconnectListeners=null,this._disconnectRequested=!1,this.onError=function(a){return console.error(a)},this.onConnect=a,this.onDisconnect=a,this.onHeartbeatTimeout=a,this.onUpdate=a,this.id=null};return g.WebSocket='undefined'==typeof WebSocket?null:WebSocket,g.prototype.connect=function(a){var b=this;return(a=a||{},this._reconnection)?Promise.reject(new e('Cannot connect while client attempts to reconnect',d.USER)):this._ws?Promise.reject(new e('Already connected',d.USER)):(this._reconnection=!1===a.reconnect?null:{wait:0,delay:a.delay||1e3,maxDelay:a.maxDelay||5e3,retries:a.retries||Infinity,settings:{auth:a.auth,timeout:a.timeout}},new Promise(function(c,d){b._connect(a,!0,function(a){return a?d(a):c()})}))},g.prototype._connect=function(a,b,h){var i=this,j=new g.WebSocket(this._url,this._settings.ws);this._ws=j,clearTimeout(this._reconnectionTimer),this._reconnectionTimer=null;var k=function(a){j.onopen&&l(new e('Connection terminated while waiting to connect',d.WS));var b=i._disconnectRequested;i._cleanup();var c={code:a.code,explanation:f[a.code]||'Unknown',reason:a.reason,wasClean:a.wasClean,willReconnect:i._willReconnect(),wasRequested:b};i.onDisconnect(c.willReconnect,c),i._reconnect()},l=function(a){if(h){var b=h;return h=null,b(a)}return i.onError(a)},m=a.timeout?setTimeout(function timeoutHandler(){if(i._cleanup(),l(new e('Connection timed out',d.TIMEOUT)),b)return i._reconnect()},a.timeout):null;j.onopen=function(){clearTimeout(m),j.onopen=null,i._hello(a.auth).then(function(){i.onConnect(),l()}).catch(function(a){a.path&&delete i._subscriptions[a.path],i._disconnect(function(){return c(l)(a)},!0)})},j.onerror=function(a){if(clearTimeout(m),i._willReconnect())return k(a);i._cleanup();var b=new e('Socket error',d.WS);return l(b)},j.onclose=k,j.onmessage=function(a){return i._onMessage(a)}},g.prototype.overrideReconnectionAuth=function(a){return!!this._reconnection&&(this._reconnection.settings.auth=a,!0)},g.prototype.reauthenticate=function(a){this.overrideReconnectionAuth(a);return this._send({type:'reauth',auth:a},!0)},g.prototype.disconnect=function(){var a=this;return new Promise(function(b){return a._disconnect(b,!1)})},g.prototype._disconnect=function(a,b){this._reconnection=null,clearTimeout(this._reconnectionTimer),this._reconnectionTimer=null;var c=this._disconnectRequested||!b;return this._disconnectListeners?(this._disconnectRequested=c,void this._disconnectListeners.push(a)):this._ws&&(this._ws.readyState===g.WebSocket.OPEN||this._ws.readyState===g.WebSocket.CONNECTING)?void(this._disconnectRequested=c,this._disconnectListeners=[a],this._ws.close()):a()},g.prototype._cleanup=function(){if(this._ws){var k=this._ws;this._ws=null,k.readyState!==g.WebSocket.CLOSED&&k.readyState!==g.WebSocket.CLOSING&&k.close(),k.onopen=null,k.onclose=null,k.onerror=a,k.onmessage=null}this._packets=[],this.id=null,clearTimeout(this._heartbeat),this._heartbeat=null;var b=new e('Request failed - server disconnected',d.DISCONNECT),c=this._requests;this._requests={};for(var f=Object.keys(c),h=0;h<f.length;++h){var i=f[h],j=c[i];clearTimeout(j.timeout),j.reject(b)}if(this._disconnectListeners){var l=this._disconnectListeners;this._disconnectListeners=null,this._disconnectRequested=!1,l.forEach(function(a){return a()})}},g.prototype._reconnect=function(){var b=this,c=this._reconnection;if(c){if(1>c.retries)return this._disconnect(a,!0);--c.retries,c.wait+=c.delay;var d=Math.min(c.wait,c.maxDelay);this._reconnectionTimer=setTimeout(function(){b._connect(c.settings,!1,function(a){if(a)return b.onError(a),b._reconnect()})},d)}},g.prototype.request=function(a){'string'==typeof a&&(a={method:'GET',path:a});var b={type:'request',method:a.method||'GET',path:a.path,headers:a.headers,payload:a.payload};return this._send(b,!0)},g.prototype.message=function(a){return this._send({type:'message',message:a},!0)},g.prototype._isReady=function(){return this._ws&&this._ws.readyState===g.WebSocket.OPEN},g.prototype._send=function(a,c){if(!this._isReady())return Promise.reject(new e('Failed to send message - server disconnected',d.DISCONNECT));a.id=++this._ids;try{var f=b(a)}catch(a){return Promise.reject(a)}if(!c)try{return this._ws.send(f),Promise.resolve()}catch(a){return Promise.reject(new e(a,d.WS))}var g={resolve:null,reject:null,timeout:null},h=new Promise(function(a,b){g.resolve=a,g.reject=b});this._settings.timeout&&(g.timeout=setTimeout(function(){return g.timeout=null,g.reject(new e('Request timed out',d.TIMEOUT))},this._settings.timeout)),this._requests[a.id]=g;try{this._ws.send(f)}catch(b){return clearTimeout(this._requests[a.id].timeout),delete this._requests[a.id],Promise.reject(new e(b,d.WS))}return h},g.prototype._hello=function(a){var b={type:'hello',version:'2'};a&&(b.auth=a);var c=this.subscriptions();return c.length&&(b.subs=c),this._send(b,!0)},g.prototype.subscriptions=function(){return Object.keys(this._subscriptions)},g.prototype.subscribe=function(a,b){var c=this;if(!a||'/'!==a[0])return Promise.reject(new e('Invalid path',d.USER));var f=this._subscriptions[a];if(f)return-1===f.indexOf(b)&&f.push(b),Promise.resolve();if(this._subscriptions[a]=[b],!this._isReady())return Promise.resolve();var g=this._send({type:'sub',path:a},!0);return g.catch(function(){delete c._subscriptions[a]}),g},g.prototype.unsubscribe=function(b,c){if(!b||'/'!==b[0])return Promise.reject(new e('Invalid path',d.USER));var f=this._subscriptions[b];if(!f)return Promise.resolve();var g=!1;if(!c)delete this._subscriptions[b],g=!0;else{var i=f.indexOf(c);if(-1===i)return Promise.resolve();f.splice(i,1),f.length||(delete this._subscriptions[b],g=!0)}if(!g||!this._isReady())return Promise.resolve();var h=this._send({type:'unsub',path:b},!0);return h.catch(a),h},g.prototype._onMessage=function(b){this._beat();var c=b.data,f=c[0];if('{'!==f){if(this._packets.push(c.slice(1)),'!'!==f)return;c=this._packets.join(''),this._packets=[]}this._packets.length&&(this._packets=[],this.onError(new e('Received an incomplete message',d.PROTOCOL)));try{var g=JSON.parse(c)}catch(a){return this.onError(new e(a,d.PROTOCOL))}var h=null;if(g.statusCode&&400<=g.statusCode&&(h=new e(g.payload.message||g.payload.error||'Error',d.SERVER),h.statusCode=g.statusCode,h.data=g.payload,h.headers=g.headers,h.path=g.path),'ping'===g.type)return this._send({type:'ping'},!1).catch(a);if('update'===g.type)return this.onUpdate(g.message);if('pub'===g.type||'revoke'===g.type){var l=this._subscriptions[g.path];if('revoke'===g.type&&delete this._subscriptions[g.path],l&&void 0!==g.message){var m={};'revoke'===g.type&&(m.revoked=!0);for(var n=0;n<l.length;++n)l[n](g.message,m)}return}var j=this._requests[g.id];if(!j)return this.onError(new e('Received response for unknown request',d.PROTOCOL));clearTimeout(j.timeout),delete this._requests[g.id];var k=function(a,b){return a?j.reject(a):j.resolve(b)};return'request'===g.type?k(h,{payload:g.payload,statusCode:g.statusCode,headers:g.headers}):'message'===g.type?k(h,{payload:g.message}):'hello'===g.type?(this.id=g.socket,g.heartbeat&&(this._heartbeatTimeout=g.heartbeat.interval+g.heartbeat.timeout,this._beat()),k(h)):'reauth'===g.type?k(h,!0):'sub'===g.type||'unsub'===g.type?k(h):(k(new e('Received invalid response',d.PROTOCOL)),this.onError(new e('Received unknown response type: '+g.type,d.PROTOCOL)))},g.prototype._beat=function(){var a=this;this._heartbeatTimeout&&(clearTimeout(this._heartbeat),this._heartbeat=setTimeout(function(){a.onError(new e('Disconnecting due to heartbeat timeout',d.TIMEOUT)),a.onHeartbeatTimeout(a._willReconnect()),a._ws.close()},this._heartbeatTimeout))},g.prototype._willReconnect=function(){return!!(this._reconnection&&1<=this._reconnection.retries)},{Client:g}});