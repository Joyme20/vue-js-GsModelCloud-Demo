(function(e){function t(t){for(var n,a,u=t[0],p=t[1],l=t[2],f=0,d=[];f<u.length;f++)a=u[f],Object.prototype.hasOwnProperty.call(o,a)&&o[a]&&d.push(o[a][0]),o[a]=0;for(n in p)Object.prototype.hasOwnProperty.call(p,n)&&(e[n]=p[n]);c&&c(t);while(d.length)d.shift()();return i.push.apply(i,l||[]),r()}function r(){for(var e,t=0;t<i.length;t++){for(var r=i[t],n=!0,u=1;u<r.length;u++){var p=r[u];0!==o[p]&&(n=!1)}n&&(i.splice(t--,1),e=a(a.s=r[0]))}return e}var n={},o={app:0},i=[];function a(t){if(n[t])return n[t].exports;var r=n[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,a),r.l=!0,r.exports}a.m=e,a.c=n,a.d=function(e,t,r){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(a.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)a.d(r,n,function(t){return e[t]}.bind(null,n));return r},a.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="";var u=window["webpackJsonp"]=window["webpackJsonp"]||[],p=u.push.bind(u);u.push=t,u=u.slice();for(var l=0;l<u.length;l++)t(u[l]);var c=p;i.push([0,"chunk-vendors"]),r()})({0:function(e,t,r){e.exports=r("56d7")},"034f":function(e,t,r){"use strict";r("4b77")},"4b77":function(e,t,r){},"56d7":function(e,t,r){"use strict";r.r(t);r("9ed5"),r("b99b"),r("918e"),r("b248");var n=r("430a"),o=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{attrs:{id:"app"}},[r("div",{attrs:{id:"viewerWrapper"}},[r("viewerWrapper",{attrs:{elementId:"viewer"}}),r("viewerWrapper",{attrs:{elementId:"viewer2"}})],1)])},i=[],a=r("0e66"),u=r.n(a);r("ccde");n["default"].use(u.a.ViewerWrapper);var p={name:"App",components:{},methods:{},mounted:function(){var e={elementId:"viewer",modelService:"http://8.134.85.254:9032/api",fileService:"http://8.134.85.254:9040/api"},t={elementId:"viewer2",modelService:"http://8.134.85.254:9032/api",fileService:"http://8.134.85.254:9040/api"};u.a.Loader({url:"https://static.graphicstone.com/bimAir"}).then((function(){var r=new u.a.Viewer(e),n=new u.a.Viewer(t);r.loadModels(["6253e9d6b0545a0a6e49bf85"],!0).then((function(){r.fitWorld()})),n.loadModels(["6253e9d6b0545a0a6e49bf85"],!0).then((function(){n.fitWorld()}))}))}},l=p,c=(r("034f"),r("cba8")),f=Object(c["a"])(l,o,i,!1,null,null,null),d=f.exports;n["default"].config.productionTip=!1,new n["default"]({render:function(e){return e(d)}}).$mount("#app")}});