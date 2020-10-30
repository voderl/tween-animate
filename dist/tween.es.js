var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};if(Date.now&&Date.prototype.getTime||(Date.now=function(){return(new Date).getTime()}),!t.performance||!t.performance.now){var e=Date.now();t.performance||(t.performance={}),t.performance.now=function(){return Date.now()-e}}for(var n=Date.now(),r=["ms","moz","webkit","o"],i=0;i<r.length&&!t.requestAnimationFrame;++i){var o=r[i];t.requestAnimationFrame=t["".concat(o,"RequestAnimationFrame")],t.cancelAnimationFrame=t["".concat(o,"CancelAnimationFrame")]||t["".concat(o,"CancelRequestAnimationFrame")]}function s(t){return JSON.stringify(t,(t,e)=>"function"==typeof e?e.toString():e,"\t")}t.requestAnimationFrame||(t.requestAnimationFrame=function(t){if("function"!=typeof t)throw new TypeError("".concat(t,"is not a function"));var e=Date.now(),r=16+n-e;return r<0&&(r=0),n=e,setTimeout((function(){n=Date.now(),t(performance.now())}),r)}),t.cancelAnimationFrame||(t.cancelAnimationFrame=function(t){return clearTimeout(t)});class a extends Error{constructor(t,e){super(`"from" and "to" have different format:\n"from":  ${s(t)},\n"to"  : ${s(e)}.\n`),this.name="Parse Error"}}function c(t){return Array.isArray(t)?"[]":"object"==typeof t?"{}":`throw new Error(\`"from" type error: ${s(t)}\`)`}function u(t,e,n){const r="function"==typeof e?e(t):e,{isAssign:i=!0}=n||{};let o;if(t!==r)if("object"==typeof r&&"object"==typeof t)o=(i?"":`var a=${c(t)};`)+function t(e,n,r,i){let o="";for(const s in n){const u=e[s],f="function"==typeof n[s]?n[s](u):n[s];if(u!==f)if("object"==typeof f&&"object"==typeof u){const e=`${r}_${s}`;o+=`var ${e}=${r}["${s}"]${i?"":"="+c(u)};${t(u,f,e,i)}`}else{if("number"!=typeof f||"number"!=typeof u)throw new a(u,f);o+=`${r}["${s}"]=${u}+b*${f-u};`}}return o}(t,r,"a",i);else{if("number"!=typeof r||"number"!=typeof t)throw new a(t,r);o=`a=${t}+b*${r-t};`}const s=new Function("a","b",o+"return a;");return function(e){return s(t,e)}}const f={Linear:{None:function(t){return t}},Quadratic:{In:function(t){return t*t},Out:function(t){return t*(2-t)},InOut:function(t){return(t*=2)<1?.5*t*t:-.5*(--t*(t-2)-1)}},Cubic:{In:function(t){return t*t*t},Out:function(t){return--t*t*t+1},InOut:function(t){return(t*=2)<1?.5*t*t*t:.5*((t-=2)*t*t+2)}},Quartic:{In:function(t){return t*t*t*t},Out:function(t){return 1- --t*t*t*t},InOut:function(t){return(t*=2)<1?.5*t*t*t*t:-.5*((t-=2)*t*t*t-2)}},Quintic:{In:function(t){return t*t*t*t*t},Out:function(t){return--t*t*t*t*t+1},InOut:function(t){return(t*=2)<1?.5*t*t*t*t*t:.5*((t-=2)*t*t*t*t+2)}},Sinusoidal:{In:function(t){return 1-Math.cos(t*Math.PI/2)},Out:function(t){return Math.sin(t*Math.PI/2)},InOut:function(t){return.5*(1-Math.cos(Math.PI*t))}},Exponential:{In:function(t){return 0===t?0:Math.pow(1024,t-1)},Out:function(t){return 1===t?1:1-Math.pow(2,-10*t)},InOut:function(t){return 0===t?0:1===t?1:(t*=2)<1?.5*Math.pow(1024,t-1):.5*(2-Math.pow(2,-10*(t-1)))}},Circular:{In:function(t){return 1-Math.sqrt(1-t*t)},Out:function(t){return Math.sqrt(1- --t*t)},InOut:function(t){return(t*=2)<1?-.5*(Math.sqrt(1-t*t)-1):.5*(Math.sqrt(1-(t-=2)*t)+1)}},Elastic:{In:function(t){return 0===t?0:1===t?1:-Math.pow(2,10*(t-1))*Math.sin(5*(t-1.1)*Math.PI)},Out:function(t){return 0===t?0:1===t?1:Math.pow(2,-10*t)*Math.sin(5*(t-.1)*Math.PI)+1},InOut:function(t){return 0===t?0:1===t?1:(t*=2)<1?-.5*Math.pow(2,10*(t-1))*Math.sin(5*(t-1.1)*Math.PI):.5*Math.pow(2,-10*(t-1))*Math.sin(5*(t-1.1)*Math.PI)+1}},Back:{In:function(t){const e=1.70158;return t*t*((e+1)*t-e)},Out:function(t){const e=1.70158;return--t*t*((e+1)*t+e)+1},InOut:function(t){const e=2.5949095;return(t*=2)<1?t*t*((e+1)*t-e)*.5:.5*((t-=2)*t*((e+1)*t+e)+2)}},Bounce:{In:function(t){return 1-f.Bounce.Out(1-t)},Out:function(t){return t<1/2.75?7.5625*t*t:t<2/2.75?7.5625*(t-=1.5/2.75)*t+.75:t<2.5/2.75?7.5625*(t-=2.25/2.75)*t+.9375:7.5625*(t-=2.625/2.75)*t+.984375},InOut:function(t){return t<.5?.5*f.Bounce.In(2*t):.5*f.Bounce.Out(2*t-1)+.5}}};var h=function(t,e,n){return t(n={path:e,exports:{},require:function(t,e){return function(){throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs")}(null==e&&n.path)}},n.exports),n.exports}((function(t){var e=Object.prototype.hasOwnProperty,n="~";function r(){}function i(t,e,n){this.fn=t,this.context=e,this.once=n||!1}function o(t,e,r,o,s){if("function"!=typeof r)throw new TypeError("The listener must be a function");var a=new i(r,o||t,s),c=n?n+e:e;return t._events[c]?t._events[c].fn?t._events[c]=[t._events[c],a]:t._events[c].push(a):(t._events[c]=a,t._eventsCount++),t}function s(t,e){0==--t._eventsCount?t._events=new r:delete t._events[e]}function a(){this._events=new r,this._eventsCount=0}Object.create&&(r.prototype=Object.create(null),(new r).__proto__||(n=!1)),a.prototype.eventNames=function(){var t,r,i=[];if(0===this._eventsCount)return i;for(r in t=this._events)e.call(t,r)&&i.push(n?r.slice(1):r);return Object.getOwnPropertySymbols?i.concat(Object.getOwnPropertySymbols(t)):i},a.prototype.listeners=function(t){var e=n?n+t:t,r=this._events[e];if(!r)return[];if(r.fn)return[r.fn];for(var i=0,o=r.length,s=new Array(o);i<o;i++)s[i]=r[i].fn;return s},a.prototype.listenerCount=function(t){var e=n?n+t:t,r=this._events[e];return r?r.fn?1:r.length:0},a.prototype.emit=function(t,e,r,i,o,s){var a=n?n+t:t;if(!this._events[a])return!1;var c,u,f=this._events[a],h=arguments.length;if(f.fn){switch(f.once&&this.removeListener(t,f.fn,void 0,!0),h){case 1:return f.fn.call(f.context),!0;case 2:return f.fn.call(f.context,e),!0;case 3:return f.fn.call(f.context,e,r),!0;case 4:return f.fn.call(f.context,e,r,i),!0;case 5:return f.fn.call(f.context,e,r,i,o),!0;case 6:return f.fn.call(f.context,e,r,i,o,s),!0}for(u=1,c=new Array(h-1);u<h;u++)c[u-1]=arguments[u];f.fn.apply(f.context,c)}else{var l,p=f.length;for(u=0;u<p;u++)switch(f[u].once&&this.removeListener(t,f[u].fn,void 0,!0),h){case 1:f[u].fn.call(f[u].context);break;case 2:f[u].fn.call(f[u].context,e);break;case 3:f[u].fn.call(f[u].context,e,r);break;case 4:f[u].fn.call(f[u].context,e,r,i);break;default:if(!c)for(l=1,c=new Array(h-1);l<h;l++)c[l-1]=arguments[l];f[u].fn.apply(f[u].context,c)}}return!0},a.prototype.on=function(t,e,n){return o(this,t,e,n,!1)},a.prototype.once=function(t,e,n){return o(this,t,e,n,!0)},a.prototype.removeListener=function(t,e,r,i){var o=n?n+t:t;if(!this._events[o])return this;if(!e)return s(this,o),this;var a=this._events[o];if(a.fn)a.fn!==e||i&&!a.once||r&&a.context!==r||s(this,o);else{for(var c=0,u=[],f=a.length;c<f;c++)(a[c].fn!==e||i&&!a[c].once||r&&a[c].context!==r)&&u.push(a[c]);u.length?this._events[o]=1===u.length?u[0]:u:s(this,o)}return this},a.prototype.removeAllListeners=function(t){var e;return t?(e=n?n+t:t,this._events[e]&&s(this,e)):(this._events=new r,this._eventsCount=0),this},a.prototype.off=a.prototype.removeListener,a.prototype.addListener=a.prototype.on,a.prefixed=n,a.EventEmitter=a,t.exports=a}));const l={filter(t,e){let n=!1,r=0,i=0;const o=t.length;for(let s=0;s<o-i;s++)e(t[s],i+s)?n&&(n=!n,t.splice(r,s-r),i+=s-r,s=r):n||(r=s,n=!n);return n&&t.splice(r,t.length-r),t},clone(t,e){const n=Array.isArray(t)?[]:{};for(const r in t){const i=t[r];let o=e(r,i);n[r]=void 0===o?"object"==typeof i?this.clone(i,e):i:o}return n},isDef:t=>null!=t,cached(t){const e=Object.create(null);return function(n){return e[n]||(e[n]=t(n))}}},p={$register(t,e){this[t]=e},$apply(t,e,...n){if("function"!=typeof this[t])throw new Error(`transform "${t}" don't exist`);{const r=(t,n)=>e.on(t,n);this[t](r,...n)}}};p.$register("loop",(t,e)=>{t("start",t=>{t.loopCount=e}),t("end",t=>{t.loopCount--,t.loopCount>0&&(t.isCompleted=!1)})}),p.$register("reverse",t=>{t("start",t=>{t.isReversed=!t.isReversed})}),p.$register("yoyo",t=>{t("start",t=>{t.isYoyoed=!1}),t("end",t=>{t.isReversed=!t.isReversed,t.isYoyoed||(t.isCompleted=!1),t.isYoyoed=!0})});class m extends h{constructor(t,e,n,r){super(),this.isPlaying=!1,this.fullTime=n,this.animateConfig=r.config,this.parsed=u(t,e,r.config),this.animateConfig.list.push(this)}_trigger(){this.start()}start(t=!1){this.time=0,this.play(),this.isReversed=t,this.isPlaying=!0,this.isCompleted=!1,this.emit("start",this),this.begin()}complete(){this.isPlaying=!1,this.emit("complete",this)}begin(){this.emit("begin",this)}end(){this.isCompleted=!0,this.emit("end",this),this.isCompleted?this.complete():(this.time=0,this.begin())}play(){this.isPlaying=!0}stop(){this.isPlaying=!1}update(t){const{isReversed:e,fullTime:n,animateConfig:r,parsed:i}=this;this.time+=t;const o=this.time/n;o<1?this.emit("update",i(r.easing(e?1-o:o)),this):(this.emit("update",i(e?0:1),this),this.end())}transform(t,...e){const n=new y(this);return p.$apply(t,n,...e),this._trigger=()=>n._trigger(),n}destroy(){this.emit("destroy"),this.removeAllListeners(),this._trigger=null,this.parsed=null}}class y extends h{constructor(t){super(),this.animateInstance=t,t.on("complete",t=>{this.end(),this.isCompleted||(t.isComplete=!1)}),t.on("update",t=>{this.emit("update",t,this)}),t.on("destroy",t=>{this.emit("destroy"),this.destroy()})}_trigger(){this.start()}transform(t,...e){const n=new y(this);return p.$apply(t,n,...e),this._trigger=()=>n._trigger(),n}start(t=!1){this.play(),this.isReversed=t,this.isPlaying=!0,this.isCompleted=!1,this.emit("start",this),this.begin()}complete(){this.stop(),this.emit("complete",this)}begin(){this.emit("begin",this),this.animateInstance.start(this.isReversed)}end(){this.isCompleted=!0,this.emit("end",this),this.isCompleted?this.complete():this.begin()}play(){this.animateInstance.play(),this.isPlaying=!0}stop(){this.animateInstance.stop(),this.isPlaying=!1}destroy(){this.removeAllListeners(),this.animateInstance=null}}const d=[],g=[],{filter:v}=l;function w(t,e=d){0!==g.length&&(g.forEach(t=>t()),g.splice(0,g.length)),0!==e.length&&v(e,e=>e.isCompleted?(e.destroy(),!1):(e.isPlaying&&e.update(t),!0))}const _={easing:f.Linear.None,list:d,isAssign:!0};function b(t,e){const{_events:n,_eventsCount:r}=t;e._events=l.clone(n,(n,r)=>{if("context"===n)return r===t?e:r}),e._eventsCount=r}class I extends h{constructor(t,e){super(),this.to=t,this.config={..._,...e}}apply(t,e){const n=new m(t,this.to,e,this);return b(this,n),g.push(()=>{n._trigger()}),n}clone(){const t=new I(this.to,this.config);return b(this,t),t}transform(t,...e){const n=new O(this);return p.$apply(t,n,...e),n}}class O extends h{constructor(t){super(),this.animate=t}apply(t,e){const n=this.animate.apply(t,e),r=new y(n);return b(this,r),n._trigger=()=>{r._trigger()},r}clone(){return new O(this.animate)}transform(t,...e){const n=new O(this);return p.$apply(t,n,...e),n}}const x=function(t,e){return new I(t,e)};x.config=function(t){Object.assign(_,t)};const C=function(t){const e=window.requestAnimationFrame,n=window.performance;let r=!1,i=0;function o(n){r&&(t(n-i),i=n,e(o))}return{play(){r=!0,i=n.now(),e(o)},stop(){r=!1}}}((function(t){w(t)}));C.play(),x.play=C.play,x.stop=C.stop;const $={Animate:x,update:w,Transform:p,Easing:f};export default $;export{x as Animate,f as Easing,p as Transform,w as update};
