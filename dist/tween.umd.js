!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t="undefined"!=typeof globalThis?globalThis:t||self).Tween=e()}(this,(function(){"use strict";var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};if(Date.now&&Date.prototype.getTime||(Date.now=function(){return(new Date).getTime()}),!t.performance||!t.performance.now){var e=Date.now();t.performance||(t.performance={}),t.performance.now=function(){return Date.now()-e}}for(var n=Date.now(),i=["ms","moz","webkit","o"],r=0;r<i.length&&!t.requestAnimationFrame;++r){var o=i[r];t.requestAnimationFrame=t["".concat(o,"RequestAnimationFrame")],t.cancelAnimationFrame=t["".concat(o,"CancelAnimationFrame")]||t["".concat(o,"CancelRequestAnimationFrame")]}function s(t){const e=window.requestAnimationFrame,n=window.performance;let i=!1,r=0;function o(n){i&&(t(n-r),r=n,e(o))}return{play(){i=!0,r=n.now(),e(o)},stop(){i=!1}}}function u(t){return JSON.stringify(t,(t,e)=>"function"==typeof e?e.toString():e,"\t")}t.requestAnimationFrame||(t.requestAnimationFrame=function(t){if("function"!=typeof t)throw new TypeError("".concat(t,"is not a function"));var e=Date.now(),i=16+n-e;return i<0&&(i=0),n=e,setTimeout((function(){n=Date.now(),t(performance.now())}),i)}),t.cancelAnimationFrame||(t.cancelAnimationFrame=function(t){return clearTimeout(t)});class a extends Error{constructor(t,e){super(`"from" and "to" have different format:\n"from":  ${u(t)},\n"to"  : ${u(e)}.\n`),this.name="Parse Error"}}function c(t){return Array.isArray(t)?"[]":"object"==typeof t?"{}":`throw new Error(\`"from" type error: ${u(t)}\`)`}function f(t,e,n){const i="function"==typeof e?e(t):e,{isAssign:r=!0}=n||{};let o;if(t!==i)if("object"==typeof i&&"object"==typeof t)o=(r?"":`var a=${c(t)};`)+function t(e,n,i,r){let o="";for(const s in n){const u=e[s],f="function"==typeof n[s]?n[s](u):n[s];if(u!==f)if("object"==typeof f&&"object"==typeof u){const e=`${i}_${s}`;o+=`var ${e}=${i}["${s}"]${r?"":"="+c(u)};${t(u,f,e,r)}`}else{if("number"!=typeof f||"number"!=typeof u)throw new a(u,f);o+=`${i}["${s}"]=${u}+b*${f-u};`}}return o}(t,i,"a",r);else{if("number"!=typeof i||"number"!=typeof t)throw new a(t,i);o=`a=${t}+b*${i-t};`}const s=new Function("a","b",o+"return a;");return function(e){return s(t,e)}}const h={Linear:{None:function(t){return t}},Quadratic:{In:function(t){return t*t},Out:function(t){return t*(2-t)},InOut:function(t){return(t*=2)<1?.5*t*t:-.5*(--t*(t-2)-1)}},Cubic:{In:function(t){return t*t*t},Out:function(t){return--t*t*t+1},InOut:function(t){return(t*=2)<1?.5*t*t*t:.5*((t-=2)*t*t+2)}},Quartic:{In:function(t){return t*t*t*t},Out:function(t){return 1- --t*t*t*t},InOut:function(t){return(t*=2)<1?.5*t*t*t*t:-.5*((t-=2)*t*t*t-2)}},Quintic:{In:function(t){return t*t*t*t*t},Out:function(t){return--t*t*t*t*t+1},InOut:function(t){return(t*=2)<1?.5*t*t*t*t*t:.5*((t-=2)*t*t*t*t+2)}},Sinusoidal:{In:function(t){return 1-Math.cos(t*Math.PI/2)},Out:function(t){return Math.sin(t*Math.PI/2)},InOut:function(t){return.5*(1-Math.cos(Math.PI*t))}},Exponential:{In:function(t){return 0===t?0:Math.pow(1024,t-1)},Out:function(t){return 1===t?1:1-Math.pow(2,-10*t)},InOut:function(t){return 0===t?0:1===t?1:(t*=2)<1?.5*Math.pow(1024,t-1):.5*(2-Math.pow(2,-10*(t-1)))}},Circular:{In:function(t){return 1-Math.sqrt(1-t*t)},Out:function(t){return Math.sqrt(1- --t*t)},InOut:function(t){return(t*=2)<1?-.5*(Math.sqrt(1-t*t)-1):.5*(Math.sqrt(1-(t-=2)*t)+1)}},Elastic:{In:function(t){return 0===t?0:1===t?1:-Math.pow(2,10*(t-1))*Math.sin(5*(t-1.1)*Math.PI)},Out:function(t){return 0===t?0:1===t?1:Math.pow(2,-10*t)*Math.sin(5*(t-.1)*Math.PI)+1},InOut:function(t){return 0===t?0:1===t?1:(t*=2)<1?-.5*Math.pow(2,10*(t-1))*Math.sin(5*(t-1.1)*Math.PI):.5*Math.pow(2,-10*(t-1))*Math.sin(5*(t-1.1)*Math.PI)+1}},Back:{In:function(t){const e=1.70158;return t*t*((e+1)*t-e)},Out:function(t){const e=1.70158;return--t*t*((e+1)*t+e)+1},InOut:function(t){const e=2.5949095;return(t*=2)<1?t*t*((e+1)*t-e)*.5:.5*((t-=2)*t*((e+1)*t+e)+2)}},Bounce:{In:function(t){return 1-h.Bounce.Out(1-t)},Out:function(t){return t<1/2.75?7.5625*t*t:t<2/2.75?7.5625*(t-=1.5/2.75)*t+.75:t<2.5/2.75?7.5625*(t-=2.25/2.75)*t+.9375:7.5625*(t-=2.625/2.75)*t+.984375},InOut:function(t){return t<.5?.5*h.Bounce.In(2*t):.5*h.Bounce.Out(2*t-1)+.5}}};var l=function(t,e,n){return t(n={path:e,exports:{},require:function(t,e){return function(){throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs")}(null==e&&n.path)}},n.exports),n.exports}((function(t){var e=Object.prototype.hasOwnProperty,n="~";function i(){}function r(t,e,n){this.fn=t,this.context=e,this.once=n||!1}function o(t,e,i,o,s){if("function"!=typeof i)throw new TypeError("The listener must be a function");var u=new r(i,o||t,s),a=n?n+e:e;return t._events[a]?t._events[a].fn?t._events[a]=[t._events[a],u]:t._events[a].push(u):(t._events[a]=u,t._eventsCount++),t}function s(t,e){0==--t._eventsCount?t._events=new i:delete t._events[e]}function u(){this._events=new i,this._eventsCount=0}Object.create&&(i.prototype=Object.create(null),(new i).__proto__||(n=!1)),u.prototype.eventNames=function(){var t,i,r=[];if(0===this._eventsCount)return r;for(i in t=this._events)e.call(t,i)&&r.push(n?i.slice(1):i);return Object.getOwnPropertySymbols?r.concat(Object.getOwnPropertySymbols(t)):r},u.prototype.listeners=function(t){var e=n?n+t:t,i=this._events[e];if(!i)return[];if(i.fn)return[i.fn];for(var r=0,o=i.length,s=new Array(o);r<o;r++)s[r]=i[r].fn;return s},u.prototype.listenerCount=function(t){var e=n?n+t:t,i=this._events[e];return i?i.fn?1:i.length:0},u.prototype.emit=function(t,e,i,r,o,s){var u=n?n+t:t;if(!this._events[u])return!1;var a,c,f=this._events[u],h=arguments.length;if(f.fn){switch(f.once&&this.removeListener(t,f.fn,void 0,!0),h){case 1:return f.fn.call(f.context),!0;case 2:return f.fn.call(f.context,e),!0;case 3:return f.fn.call(f.context,e,i),!0;case 4:return f.fn.call(f.context,e,i,r),!0;case 5:return f.fn.call(f.context,e,i,r,o),!0;case 6:return f.fn.call(f.context,e,i,r,o,s),!0}for(c=1,a=new Array(h-1);c<h;c++)a[c-1]=arguments[c];f.fn.apply(f.context,a)}else{var l,p=f.length;for(c=0;c<p;c++)switch(f[c].once&&this.removeListener(t,f[c].fn,void 0,!0),h){case 1:f[c].fn.call(f[c].context);break;case 2:f[c].fn.call(f[c].context,e);break;case 3:f[c].fn.call(f[c].context,e,i);break;case 4:f[c].fn.call(f[c].context,e,i,r);break;default:if(!a)for(l=1,a=new Array(h-1);l<h;l++)a[l-1]=arguments[l];f[c].fn.apply(f[c].context,a)}}return!0},u.prototype.on=function(t,e,n){return o(this,t,e,n,!1)},u.prototype.once=function(t,e,n){return o(this,t,e,n,!0)},u.prototype.removeListener=function(t,e,i,r){var o=n?n+t:t;if(!this._events[o])return this;if(!e)return s(this,o),this;var u=this._events[o];if(u.fn)u.fn!==e||r&&!u.once||i&&u.context!==i||s(this,o);else{for(var a=0,c=[],f=u.length;a<f;a++)(u[a].fn!==e||r&&!u[a].once||i&&u[a].context!==i)&&c.push(u[a]);c.length?this._events[o]=1===c.length?c[0]:c:s(this,o)}return this},u.prototype.removeAllListeners=function(t){var e;return t?(e=n?n+t:t,this._events[e]&&s(this,e)):(this._events=new i,this._eventsCount=0),this},u.prototype.off=u.prototype.removeListener,u.prototype.addListener=u.prototype.on,u.prefixed=n,u.EventEmitter=u,t.exports=u}));const p={filter(t,e){let n=!1,i=0,r=0;const o=t.length;for(let s=0;s<o-r;s++)e(t[s],r+s)?n&&(n=!n,t.splice(i,s-i),r+=s-i,s=i):n||(i=s,n=!n);return n&&t.splice(i,t.length-i),t},clone(t,e){const n=Array.isArray(t)?[]:{};for(const i in t){const r=t[i];let o=e(i,r);n[i]=void 0===o?"object"==typeof r?this.clone(r,e):r:o}return n},isDef:t=>null!=t,cached(t){const e=Object.create(null);return function(n){return e[n]||(e[n]=t(n))}}},m={$register(t,e){this[t]=e},$apply(t,e,...n){if("function"!=typeof this[t])throw new Error(`transform "${t}" don't exist`);{const i=(t,n)=>e.on(t,n);this[t](i,...n)}}};m.$register("loop",(t,e)=>{t("start",t=>{t.loopCount=e}),t("end",t=>{t.loopCount--,t.loopCount>0&&(t.isCompleted=!1)})}),m.$register("reverse",t=>{t("start",t=>{t.isReversed=!t.isReversed})}),m.$register("yoyo",t=>{t("start",t=>{t.isYoyoed=!1}),t("end",t=>{t.isReversed=!t.isReversed,t.isYoyoed||(t.isCompleted=!1),t.isYoyoed=!0})});class y extends l{constructor(t,e,n,i){super(),this.isPlaying=!1,this.fullTime=n,this.animateConfig=i.config,this.parsed=f(t,e,i.config),this.animateConfig.list.push(this)}_trigger(){this.start()}start(t=!1){this.time=0,this.play(),this.isReversed=t,this.isPlaying=!0,this.isCompleted=!1,this.emit("start",this),this.begin()}complete(){this.isPlaying=!1,this.emit("complete",this)}begin(){this.emit("begin",this)}end(){this.isCompleted=!0,this.emit("end",this),this.isCompleted?this.complete():(this.time=0,this.begin())}play(){this.isPlaying=!0}stop(){this.isPlaying=!1}update(t){const{isReversed:e,fullTime:n,animateConfig:i,parsed:r}=this;this.time+=t;const o=this.time/n;o<1?this.emit("update",r(i.easing(e?1-o:o)),this):(this.emit("update",r(e?0:1),this),this.end())}transform(t,...e){const n=new d(this);return m.$apply(t,n,...e),this._trigger=()=>n._trigger(),n}destroy(){this.emit("destroy"),this.removeAllListeners(),this._trigger=null,this.parsed=null}}class d extends l{constructor(t){super(),this.animateInstance=t,t.on("complete",t=>{this.end(),this.isCompleted||(t.isComplete=!1)}),t.on("update",t=>{this.emit("update",t,this)}),t.on("destroy",t=>{this.emit("destroy"),this.destroy()})}_trigger(){this.start()}transform(t,...e){const n=new d(this);return m.$apply(t,n,...e),this._trigger=()=>n._trigger(),n}start(t=!1){this.play(),this.isReversed=t,this.isPlaying=!0,this.isCompleted=!1,this.emit("start",this),this.begin()}complete(){this.stop(),this.emit("complete",this)}begin(){this.emit("begin",this),this.animateInstance.start(this.isReversed)}end(){this.isCompleted=!0,this.emit("end",this),this.isCompleted?this.complete():this.begin()}play(){this.animateInstance.play(),this.isPlaying=!0}stop(){this.animateInstance.stop(),this.isPlaying=!1}destroy(){this.removeAllListeners(),this.animateInstance=null}}const g=[],v=[],{filter:w}=p;function b(t,e=g){0!==v.length&&(v.forEach(t=>t()),v.splice(0,v.length)),0!==e.length&&w(e,e=>e.isCompleted?(e.destroy(),!1):(e.isPlaying&&e.update(t),!0))}const _={easing:h.Linear.None,list:g,isAssign:!0};function I(t,e){const{_events:n,_eventsCount:i}=t;e._events=p.clone(n,(n,i)=>{if("context"===n)return i===t?e:i}),e._eventsCount=i}class O extends l{constructor(t,e){super(),this.to=t,this.config={..._,...e}}apply(t,e){const n=new y(t,this.to,e,this);return I(this,n),v.push(()=>{n._trigger()}),n}clone(){const t=new O(this.to,this.config);return I(this,t),t}transform(t,...e){const n=new x(this);return m.$apply(t,n,...e),n}}class x extends l{constructor(t){super(),this.animate=t}apply(t,e){const n=new d(this.animate.apply(t,e));return I(this,n),n}clone(){return new x(this.animate)}transform(t,...e){const n=new x(this);return m.$apply(t,n,...e),n}}function C(t,e){return new O(t,e)}return C.config=function(t){Object.assign(_,t)},s((function(t){b(t)})).play(),{Animate:C,AnimationFrame:s,update:b,Transform:m,Easing:h}}));
//# sourceMappingURL=tween.umd.js.map
