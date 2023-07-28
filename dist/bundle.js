(()=>{"use strict";const t=document.getElementById("tooltip");let n,e;function i(n,e,i){r(),function(n,e){var i,o;if(t.innerHTML="","fixed"===e){const n=document.createElement("button");n.textContent="✕",n.classList.add("close-button"),t.appendChild(n),n.addEventListener("pointerup",r)}const s=n.data.item,a=n.parent?{lang:n.parent.data.item.lang,term:n.parent.data.item.term,langDistance:n.parent.data.langDistance}:null,l=document.createElement("p");l.classList.add("lang"),l.style.color=Ot(n.data.langDistance),l.textContent=`${s.lang}`,t.appendChild(l);const u=document.createElement("p");if(u.innerHTML=`<span class="term">${s.term}</span>`+(s.romanization?` <span class="romanization">(${s.romanization})</span>`:""),t.appendChild(u),s.imputed){const n=document.createElement("div");n.classList.add("pos-line"),n.innerHTML='<span class="imputed">(imputed)</span>',t.appendChild(n)}else if(s.pos&&s.gloss&&s.pos.length===s.gloss.length){const n=document.createElement("div"),e=null!==(i=s.pos)&&void 0!==i?i:[],r=null!==(o=s.gloss)&&void 0!==o?o:[];for(let t=0;t<e.length;t++){const i=e[t],o=r[t],s=document.createElement("div");s.classList.add("pos-line"),s.innerHTML=`<span class="pos">${i}</span>: <span class="gloss">${o}</span>`,n.appendChild(s)}t.appendChild(n)}if(s.etyMode&&a){const n=document.createElement("div");n.classList.add("ety-line");const e=function(t){switch(t){case"derived":case"undefined derivation":case"inherited":case"borrowed":case"back-formation":return"from";case"compound":case"univerbation":case"transfix":case"surface analysis":case"suffix":case"prefix":case"infix":case"confix":case"circumfix":case"blend":case"affix":return"with";case"vṛddhi":case"vṛddhi-ya":return"derivative of";case"root":return"reflex of";case"mention":return"in";default:return"of"}}(s.etyMode),i=Ot(a.langDistance);n.innerHTML=`<span class="ety-mode">${s.etyMode}</span> <span class="ety-prep">${e}</span> <span class="parent-lang" style="color: ${i};">${a.lang}</span> <span class="parent-term">${a.term}</span>`,t.appendChild(n)}if(s.url){const n=document.createElement("div");n.classList.add("wiktionary-link-container");const e=document.createElement("a");e.textContent="Wiktionary",e.href=s.url,e.target="_blank",e.classList.add("wiktionary-link"),n.appendChild(e),t.appendChild(n)}}(n,i),function(n,e){"hover"===e?function(n){t.style.position="absolute";const e=t.getBoundingClientRect(),i=n.getBoundingClientRect();i.top>=e.height?t.style.top=i.top+window.scrollY-e.height+"px":t.style.top=i.bottom+window.scrollY+"px",i.left+e.width<=window.innerWidth?t.style.left=i.left+window.scrollX+"px":t.style.left=i.right+window.scrollX-e.width+"px"}(n):(t.style.position="fixed",t.style.top="50%",t.style.left="50%",t.style.transform="translate(-50%, -50%)")}(e,i),t.style.zIndex="9000",t.style.opacity="1"}function r(){t.style.opacity="0",t.style.zIndex="-9000",t.innerHTML="",t.style.top="0px",t.style.left="0px"}function o(t,n){return t.parent===n.parent?1:2}function s(t,n){var e;return Math.min(t,null!==(e=n.x)&&void 0!==e?e:0)}function a(t,n){var e;return Math.max(t,null!==(e=n.y)&&void 0!==e?e:0)}t.addEventListener("pointerenter",(t=>{"mouse"===t.pointerType&&window.clearTimeout(n)})),t.addEventListener("pointerleave",(t=>{"mouse"===t.pointerType&&(window.clearTimeout(e),n=window.setTimeout(r,100))}));var l="http://www.w3.org/1999/xhtml";const u={svg:"http://www.w3.org/2000/svg",xhtml:l,xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/"};function c(t){var n=t+="",e=n.indexOf(":");return e>=0&&"xmlns"!==(n=t.slice(0,e))&&(t=t.slice(e+1)),u.hasOwnProperty(n)?{space:u[n],local:t}:t}function h(t){return function(){var n=this.ownerDocument,e=this.namespaceURI;return e===l&&n.documentElement.namespaceURI===l?n.createElement(t):n.createElementNS(e,t)}}function d(t){return function(){return this.ownerDocument.createElementNS(t.space,t.local)}}function f(t){var n=c(t);return(n.local?d:h)(n)}function p(){}function m(t){return null==t?p:function(){return this.querySelector(t)}}function g(){return[]}function v(t){return function(n){return n.matches(t)}}var y=Array.prototype.find;function _(){return this.firstElementChild}var w=Array.prototype.filter;function x(){return Array.from(this.children)}function $(t){return new Array(t.length)}function L(t,n){this.ownerDocument=t.ownerDocument,this.namespaceURI=t.namespaceURI,this._next=null,this._parent=t,this.__data__=n}function E(t,n,e,i,r,o){for(var s,a=0,l=n.length,u=o.length;a<u;++a)(s=n[a])?(s.__data__=o[a],i[a]=s):e[a]=new L(t,o[a]);for(;a<l;++a)(s=n[a])&&(r[a]=s)}function b(t,n,e,i,r,o,s){var a,l,u,c=new Map,h=n.length,d=o.length,f=new Array(h);for(a=0;a<h;++a)(l=n[a])&&(f[a]=u=s.call(l,l.__data__,a,n)+"",c.has(u)?r[a]=l:c.set(u,l));for(a=0;a<d;++a)u=s.call(t,o[a],a,o)+"",(l=c.get(u))?(i[a]=l,l.__data__=o[a],c.delete(u)):e[a]=new L(t,o[a]);for(a=0;a<h;++a)(l=n[a])&&c.get(f[a])===l&&(r[a]=l)}function A(t){return t.__data__}function T(t){return"object"==typeof t&&"length"in t?t:Array.from(t)}function C(t,n){return t<n?-1:t>n?1:t>=n?0:NaN}function M(t){return function(){this.removeAttribute(t)}}function S(t){return function(){this.removeAttributeNS(t.space,t.local)}}function k(t,n){return function(){this.setAttribute(t,n)}}function B(t,n){return function(){this.setAttributeNS(t.space,t.local,n)}}function N(t,n){return function(){var e=n.apply(this,arguments);null==e?this.removeAttribute(t):this.setAttribute(t,e)}}function I(t,n){return function(){var e=n.apply(this,arguments);null==e?this.removeAttributeNS(t.space,t.local):this.setAttributeNS(t.space,t.local,e)}}function D(t){return t.ownerDocument&&t.ownerDocument.defaultView||t.document&&t||t.defaultView}function H(t){return function(){this.style.removeProperty(t)}}function z(t,n,e){return function(){this.style.setProperty(t,n,e)}}function P(t,n,e){return function(){var i=n.apply(this,arguments);null==i?this.style.removeProperty(t):this.style.setProperty(t,i,e)}}function R(t){return function(){delete this[t]}}function j(t,n){return function(){this[t]=n}}function q(t,n){return function(){var e=n.apply(this,arguments);null==e?delete this[t]:this[t]=e}}function U(t){return t.trim().split(/^|\s+/)}function O(t){return t.classList||new V(t)}function V(t){this._node=t,this._names=U(t.getAttribute("class")||"")}function W(t,n){for(var e=O(t),i=-1,r=n.length;++i<r;)e.add(n[i])}function X(t,n){for(var e=O(t),i=-1,r=n.length;++i<r;)e.remove(n[i])}function F(t){return function(){W(this,t)}}function Y(t){return function(){X(this,t)}}function Z(t,n){return function(){(n.apply(this,arguments)?W:X)(this,t)}}function Q(){this.textContent=""}function G(t){return function(){this.textContent=t}}function J(t){return function(){var n=t.apply(this,arguments);this.textContent=null==n?"":n}}function K(){this.innerHTML=""}function tt(t){return function(){this.innerHTML=t}}function nt(t){return function(){var n=t.apply(this,arguments);this.innerHTML=null==n?"":n}}function et(){this.nextSibling&&this.parentNode.appendChild(this)}function it(){this.previousSibling&&this.parentNode.insertBefore(this,this.parentNode.firstChild)}function rt(){return null}function ot(){var t=this.parentNode;t&&t.removeChild(this)}function st(){var t=this.cloneNode(!1),n=this.parentNode;return n?n.insertBefore(t,this.nextSibling):t}function at(){var t=this.cloneNode(!0),n=this.parentNode;return n?n.insertBefore(t,this.nextSibling):t}function lt(t){return function(){var n=this.__on;if(n){for(var e,i=0,r=-1,o=n.length;i<o;++i)e=n[i],t.type&&e.type!==t.type||e.name!==t.name?n[++r]=e:this.removeEventListener(e.type,e.listener,e.options);++r?n.length=r:delete this.__on}}}function ut(t,n,e){return function(){var i,r=this.__on,o=function(t){return function(n){t.call(this,n,this.__data__)}}(n);if(r)for(var s=0,a=r.length;s<a;++s)if((i=r[s]).type===t.type&&i.name===t.name)return this.removeEventListener(i.type,i.listener,i.options),this.addEventListener(i.type,i.listener=o,i.options=e),void(i.value=n);this.addEventListener(t.type,o,e),i={type:t.type,name:t.name,value:n,listener:o,options:e},r?r.push(i):this.__on=[i]}}function ct(t,n,e){var i=D(t),r=i.CustomEvent;"function"==typeof r?r=new r(n,e):(r=i.document.createEvent("Event"),e?(r.initEvent(n,e.bubbles,e.cancelable),r.detail=e.detail):r.initEvent(n,!1,!1)),t.dispatchEvent(r)}function ht(t,n){return function(){return ct(this,t,n)}}function dt(t,n){return function(){return ct(this,t,n.apply(this,arguments))}}L.prototype={constructor:L,appendChild:function(t){return this._parent.insertBefore(t,this._next)},insertBefore:function(t,n){return this._parent.insertBefore(t,n)},querySelector:function(t){return this._parent.querySelector(t)},querySelectorAll:function(t){return this._parent.querySelectorAll(t)}},V.prototype={add:function(t){this._names.indexOf(t)<0&&(this._names.push(t),this._node.setAttribute("class",this._names.join(" ")))},remove:function(t){var n=this._names.indexOf(t);n>=0&&(this._names.splice(n,1),this._node.setAttribute("class",this._names.join(" ")))},contains:function(t){return this._names.indexOf(t)>=0}};var ft=[null];function pt(t,n){this._groups=t,this._parents=n}function mt(t){return function(t){return"string"==typeof t?new pt([[document.querySelector(t)]],[document.documentElement]):new pt([[t]],ft)}(f(t).call(document.documentElement))}pt.prototype=function(){return new pt([[document.documentElement]],ft)}.prototype={constructor:pt,select:function(t){"function"!=typeof t&&(t=m(t));for(var n=this._groups,e=n.length,i=new Array(e),r=0;r<e;++r)for(var o,s,a=n[r],l=a.length,u=i[r]=new Array(l),c=0;c<l;++c)(o=a[c])&&(s=t.call(o,o.__data__,c,a))&&("__data__"in o&&(s.__data__=o.__data__),u[c]=s);return new pt(i,this._parents)},selectAll:function(t){t="function"==typeof t?function(t){return function(){return null==(n=t.apply(this,arguments))?[]:Array.isArray(n)?n:Array.from(n);var n}}(t):function(t){return null==t?g:function(){return this.querySelectorAll(t)}}(t);for(var n=this._groups,e=n.length,i=[],r=[],o=0;o<e;++o)for(var s,a=n[o],l=a.length,u=0;u<l;++u)(s=a[u])&&(i.push(t.call(s,s.__data__,u,a)),r.push(s));return new pt(i,r)},selectChild:function(t){return this.select(null==t?_:function(t){return function(){return y.call(this.children,t)}}("function"==typeof t?t:v(t)))},selectChildren:function(t){return this.selectAll(null==t?x:function(t){return function(){return w.call(this.children,t)}}("function"==typeof t?t:v(t)))},filter:function(t){"function"!=typeof t&&(t=function(t){return function(){return this.matches(t)}}(t));for(var n=this._groups,e=n.length,i=new Array(e),r=0;r<e;++r)for(var o,s=n[r],a=s.length,l=i[r]=[],u=0;u<a;++u)(o=s[u])&&t.call(o,o.__data__,u,s)&&l.push(o);return new pt(i,this._parents)},data:function(t,n){if(!arguments.length)return Array.from(this,A);var e,i=n?b:E,r=this._parents,o=this._groups;"function"!=typeof t&&(e=t,t=function(){return e});for(var s=o.length,a=new Array(s),l=new Array(s),u=new Array(s),c=0;c<s;++c){var h=r[c],d=o[c],f=d.length,p=T(t.call(h,h&&h.__data__,c,r)),m=p.length,g=l[c]=new Array(m),v=a[c]=new Array(m);i(h,d,g,v,u[c]=new Array(f),p,n);for(var y,_,w=0,x=0;w<m;++w)if(y=g[w]){for(w>=x&&(x=w+1);!(_=v[x])&&++x<m;);y._next=_||null}}return(a=new pt(a,r))._enter=l,a._exit=u,a},enter:function(){return new pt(this._enter||this._groups.map($),this._parents)},exit:function(){return new pt(this._exit||this._groups.map($),this._parents)},join:function(t,n,e){var i=this.enter(),r=this,o=this.exit();return"function"==typeof t?(i=t(i))&&(i=i.selection()):i=i.append(t+""),null!=n&&(r=n(r))&&(r=r.selection()),null==e?o.remove():e(o),i&&r?i.merge(r).order():r},merge:function(t){for(var n=t.selection?t.selection():t,e=this._groups,i=n._groups,r=e.length,o=i.length,s=Math.min(r,o),a=new Array(r),l=0;l<s;++l)for(var u,c=e[l],h=i[l],d=c.length,f=a[l]=new Array(d),p=0;p<d;++p)(u=c[p]||h[p])&&(f[p]=u);for(;l<r;++l)a[l]=e[l];return new pt(a,this._parents)},selection:function(){return this},order:function(){for(var t=this._groups,n=-1,e=t.length;++n<e;)for(var i,r=t[n],o=r.length-1,s=r[o];--o>=0;)(i=r[o])&&(s&&4^i.compareDocumentPosition(s)&&s.parentNode.insertBefore(i,s),s=i);return this},sort:function(t){function n(n,e){return n&&e?t(n.__data__,e.__data__):!n-!e}t||(t=C);for(var e=this._groups,i=e.length,r=new Array(i),o=0;o<i;++o){for(var s,a=e[o],l=a.length,u=r[o]=new Array(l),c=0;c<l;++c)(s=a[c])&&(u[c]=s);u.sort(n)}return new pt(r,this._parents).order()},call:function(){var t=arguments[0];return arguments[0]=this,t.apply(null,arguments),this},nodes:function(){return Array.from(this)},node:function(){for(var t=this._groups,n=0,e=t.length;n<e;++n)for(var i=t[n],r=0,o=i.length;r<o;++r){var s=i[r];if(s)return s}return null},size:function(){let t=0;for(const n of this)++t;return t},empty:function(){return!this.node()},each:function(t){for(var n=this._groups,e=0,i=n.length;e<i;++e)for(var r,o=n[e],s=0,a=o.length;s<a;++s)(r=o[s])&&t.call(r,r.__data__,s,o);return this},attr:function(t,n){var e=c(t);if(arguments.length<2){var i=this.node();return e.local?i.getAttributeNS(e.space,e.local):i.getAttribute(e)}return this.each((null==n?e.local?S:M:"function"==typeof n?e.local?I:N:e.local?B:k)(e,n))},style:function(t,n,e){return arguments.length>1?this.each((null==n?H:"function"==typeof n?P:z)(t,n,null==e?"":e)):function(t,n){return t.style.getPropertyValue(n)||D(t).getComputedStyle(t,null).getPropertyValue(n)}(this.node(),t)},property:function(t,n){return arguments.length>1?this.each((null==n?R:"function"==typeof n?q:j)(t,n)):this.node()[t]},classed:function(t,n){var e=U(t+"");if(arguments.length<2){for(var i=O(this.node()),r=-1,o=e.length;++r<o;)if(!i.contains(e[r]))return!1;return!0}return this.each(("function"==typeof n?Z:n?F:Y)(e,n))},text:function(t){return arguments.length?this.each(null==t?Q:("function"==typeof t?J:G)(t)):this.node().textContent},html:function(t){return arguments.length?this.each(null==t?K:("function"==typeof t?nt:tt)(t)):this.node().innerHTML},raise:function(){return this.each(et)},lower:function(){return this.each(it)},append:function(t){var n="function"==typeof t?t:f(t);return this.select((function(){return this.appendChild(n.apply(this,arguments))}))},insert:function(t,n){var e="function"==typeof t?t:f(t),i=null==n?rt:"function"==typeof n?n:m(n);return this.select((function(){return this.insertBefore(e.apply(this,arguments),i.apply(this,arguments)||null)}))},remove:function(){return this.each(ot)},clone:function(t){return this.select(t?at:st)},datum:function(t){return arguments.length?this.property("__data__",t):this.node().__data__},on:function(t,n,e){var i,r,o=function(t){return t.trim().split(/^|\s+/).map((function(t){var n="",e=t.indexOf(".");return e>=0&&(n=t.slice(e+1),t=t.slice(0,e)),{type:t,name:n}}))}(t+""),s=o.length;if(!(arguments.length<2)){for(a=n?ut:lt,i=0;i<s;++i)this.each(a(o[i],n,e));return this}var a=this.node().__on;if(a)for(var l,u=0,c=a.length;u<c;++u)for(i=0,l=a[u];i<s;++i)if((r=o[i]).type===l.type&&r.name===l.name)return l.value},dispatch:function(t,n){return this.each(("function"==typeof n?dt:ht)(t,n))},[Symbol.iterator]:function*(){for(var t=this._groups,n=0,e=t.length;n<e;++n)for(var i,r=t[n],o=0,s=r.length;o<s;++o)(i=r[o])&&(yield i)}};var gt=Array.prototype.slice;function vt(t){return function(){return t}}const yt=Math.PI,_t=2*yt,wt=1e-6,xt=_t-wt;function $t(t){this._+=t[0];for(let n=1,e=t.length;n<e;++n)this._+=arguments[n]+t[n]}class Lt{constructor(t){this._x0=this._y0=this._x1=this._y1=null,this._="",this._append=null==t?$t:function(t){let n=Math.floor(t);if(!(n>=0))throw new Error(`invalid digits: ${t}`);if(n>15)return $t;const e=10**n;return function(t){this._+=t[0];for(let n=1,i=t.length;n<i;++n)this._+=Math.round(arguments[n]*e)/e+t[n]}}(t)}moveTo(t,n){this._append`M${this._x0=this._x1=+t},${this._y0=this._y1=+n}`}closePath(){null!==this._x1&&(this._x1=this._x0,this._y1=this._y0,this._append`Z`)}lineTo(t,n){this._append`L${this._x1=+t},${this._y1=+n}`}quadraticCurveTo(t,n,e,i){this._append`Q${+t},${+n},${this._x1=+e},${this._y1=+i}`}bezierCurveTo(t,n,e,i,r,o){this._append`C${+t},${+n},${+e},${+i},${this._x1=+r},${this._y1=+o}`}arcTo(t,n,e,i,r){if(t=+t,n=+n,e=+e,i=+i,(r=+r)<0)throw new Error(`negative radius: ${r}`);let o=this._x1,s=this._y1,a=e-t,l=i-n,u=o-t,c=s-n,h=u*u+c*c;if(null===this._x1)this._append`M${this._x1=t},${this._y1=n}`;else if(h>wt)if(Math.abs(c*a-l*u)>wt&&r){let d=e-o,f=i-s,p=a*a+l*l,m=d*d+f*f,g=Math.sqrt(p),v=Math.sqrt(h),y=r*Math.tan((yt-Math.acos((p+h-m)/(2*g*v)))/2),_=y/v,w=y/g;Math.abs(_-1)>wt&&this._append`L${t+_*u},${n+_*c}`,this._append`A${r},${r},0,0,${+(c*d>u*f)},${this._x1=t+w*a},${this._y1=n+w*l}`}else this._append`L${this._x1=t},${this._y1=n}`}arc(t,n,e,i,r,o){if(t=+t,n=+n,o=!!o,(e=+e)<0)throw new Error(`negative radius: ${e}`);let s=e*Math.cos(i),a=e*Math.sin(i),l=t+s,u=n+a,c=1^o,h=o?i-r:r-i;null===this._x1?this._append`M${l},${u}`:(Math.abs(this._x1-l)>wt||Math.abs(this._y1-u)>wt)&&this._append`L${l},${u}`,e&&(h<0&&(h=h%_t+_t),h>xt?this._append`A${e},${e},0,1,${c},${t-s},${n-a}A${e},${e},0,1,${c},${this._x1=l},${this._y1=u}`:h>wt&&this._append`A${e},${e},0,${+(h>=yt)},${c},${this._x1=t+e*Math.cos(r)},${this._y1=n+e*Math.sin(r)}`)}rect(t,n,e,i){this._append`M${this._x0=this._x1=+t},${this._y0=this._y1=+n}h${e=+e}v${+i}h${-e}Z`}toString(){return this._}}function Et(t){return t[0]}function bt(t){return t[1]}function At(t){return t.source}function Tt(t){return t.target}function Ct(t,n){this._context=t,this._t=n}function Mt(t){return new Ct(t,0)}function St(t){var n=0,e=t.children,i=e&&e.length;if(i)for(;--i>=0;)n+=e[i].value;else n=1;t.value=n}function kt(t,n){t instanceof Map?(t=[void 0,t],void 0===n&&(n=Nt)):void 0===n&&(n=Bt);for(var e,i,r,o,s,a=new Ht(t),l=[a];e=l.pop();)if((r=n(e.data))&&(s=(r=Array.from(r)).length))for(e.children=r,o=s-1;o>=0;--o)l.push(i=r[o]=new Ht(r[o])),i.parent=e,i.depth=e.depth+1;return a.eachBefore(Dt)}function Bt(t){return t.children}function Nt(t){return Array.isArray(t)?t[1]:null}function It(t){void 0!==t.data.value&&(t.value=t.data.value),t.data=t.data.data}function Dt(t){var n=0;do{t.height=n}while((t=t.parent)&&t.height<++n)}function Ht(t){this.data=t,this.depth=this.height=0,this.parent=null}Lt.prototype,Ct.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x=this._y=NaN,this._point=0},lineEnd:function(){0<this._t&&this._t<1&&2===this._point&&this._context.lineTo(this._x,this._y),(this._line||0!==this._line&&1===this._point)&&this._context.closePath(),this._line>=0&&(this._t=1-this._t,this._line=1-this._line)},point:function(t,n){switch(t=+t,n=+n,this._point){case 0:this._point=1,this._line?this._context.lineTo(t,n):this._context.moveTo(t,n);break;case 1:this._point=2;default:if(this._t<=0)this._context.lineTo(this._x,n),this._context.lineTo(t,n);else{var e=this._x*(1-this._t)+t*this._t;this._context.lineTo(e,this._y),this._context.lineTo(e,n)}}this._x=t,this._y=n}},Ht.prototype=kt.prototype={constructor:Ht,count:function(){return this.eachAfter(St)},each:function(t,n){let e=-1;for(const i of this)t.call(n,i,++e,this);return this},eachAfter:function(t,n){for(var e,i,r,o=this,s=[o],a=[],l=-1;o=s.pop();)if(a.push(o),e=o.children)for(i=0,r=e.length;i<r;++i)s.push(e[i]);for(;o=a.pop();)t.call(n,o,++l,this);return this},eachBefore:function(t,n){for(var e,i,r=this,o=[r],s=-1;r=o.pop();)if(t.call(n,r,++s,this),e=r.children)for(i=e.length-1;i>=0;--i)o.push(e[i]);return this},find:function(t,n){let e=-1;for(const i of this)if(t.call(n,i,++e,this))return i},sum:function(t){return this.eachAfter((function(n){for(var e=+t(n.data)||0,i=n.children,r=i&&i.length;--r>=0;)e+=i[r].value;n.value=e}))},sort:function(t){return this.eachBefore((function(n){n.children&&n.children.sort(t)}))},path:function(t){for(var n=this,e=function(t,n){if(t===n)return t;var e=t.ancestors(),i=n.ancestors(),r=null;for(t=e.pop(),n=i.pop();t===n;)r=t,t=e.pop(),n=i.pop();return r}(n,t),i=[n];n!==e;)n=n.parent,i.push(n);for(var r=i.length;t!==e;)i.splice(r,0,t),t=t.parent;return i},ancestors:function(){for(var t=this,n=[t];t=t.parent;)n.push(t);return n},descendants:function(){return Array.from(this)},leaves:function(){var t=[];return this.eachBefore((function(n){n.children||t.push(n)})),t},links:function(){var t=this,n=[];return t.each((function(e){e!==t&&n.push({source:e.parent,target:e})})),n},copy:function(){return kt(this).eachBefore(It)},[Symbol.iterator]:function*(){var t,n,e,i,r=this,o=[r];do{for(t=o.reverse(),o=[];r=t.pop();)if(yield r,n=r.children)for(e=0,i=n.length;e<i;++e)o.push(n[e])}while(o.length)}};var zt=function(t,n,e,i){return new(e||(e=Promise))((function(r,o){function s(t){try{l(i.next(t))}catch(t){o(t)}}function a(t){try{l(i.throw(t))}catch(t){o(t)}}function l(t){var n;t.done?r(t.value):(n=t.value,n instanceof e?n:new e((function(t){t(n)}))).then(s,a)}l((i=i.apply(t,n||[])).next())}))};const Pt=document.getElementById("ety");let Rt=null;function jt(){return zt(this,void 0,void 0,(function*(){try{const t=yield fetch(`${nn}headProgenitorTree/${mn}/filter/${tn}`);Rt=yield t.json(),console.log(Rt),function(){if(Pt.innerHTML="",null===Rt)return;const{svgElement:t,nodeSelection:l,nodeBackgroundSelection:u}=function(t){var l;const u=kt(t,(t=>t.children)),c=u.find((t=>t.data.item.id===mn)),h=null!==(l=null==c?void 0:c.ancestors())&&void 0!==l?l:[];u.count().sort(((t,n)=>{var e,i;return+h.includes(t)-+h.includes(n)||t.height-n.height||(null!==(e=t.value)&&void 0!==e?e:0)-(null!==(i=n.value)&&void 0!==i?i:0)||2*+(t.data.item.term<n.data.item.term)-1}));const d=parseFloat(window.getComputedStyle(Pt).fontSize),f=10*d,p=d,m=Math.floor(.25*d),g=function(){let t=o,n=1,e=1,i=!1;function r(r){var o,l;let u,c=0;const h=r;h.eachAfter((function(n){const e=n.children;e?(n.x=function(t){return t.reduce(s,0)}(e),n.y=function(t){return 1+t.reduce(a,0)}(e)):(n.x=u?c-=t(n,u):0,n.y=0,u=n)}));const d=function(t){let n;for(;n=t.children;)t=n[0];return t}(h),f=function(t){let n;for(;n=t.children;)t=n[n.length-1];return t}(h),p=(null!==(o=d.x)&&void 0!==o?o:0)-t(d,f)/2,m=(null!==(l=f.x)&&void 0!==l?l:0)+t(f,d)/2;return h.eachAfter(i?function(t){var i,r,o,s;t.x=((null!==(i=t.x)&&void 0!==i?i:0)-(null!==(r=h.x)&&void 0!==r?r:0))*n,t.y=((null!==(o=h.y)&&void 0!==o?o:0)-(null!==(s=t.y)&&void 0!==s?s:0))*e}:function(t){var i,r;t.x=((null!==(i=t.x)&&void 0!==i?i:0)-p)/(m-p)*n,t.y=(1-(h.y?null!==(r=t.y)&&void 0!==r?r:0/h.y:1))*e})}return r.separation=function(n){return arguments.length?(t=n,r):t},r.size=function(t){return arguments.length?(i=!1,n=t&&void 0!==t[0]?+t[0]:n,e=t&&void 0!==t[1]?+t[1]:e,r):i?[n,e]:null},r.nodeSize=function(t){return arguments.length?(i=!0,n=t&&void 0!==t[0]?+t[0]:n,e=t&&void 0!==t[1]?+t[1]:e,r):i?[n,e]:null},r}().nodeSize([p,f]).separation(((t,n)=>(t.parent,n.parent,m)))(u);let v=1/0,y=-v;g.each((t=>{t.x>y&&(y=t.x),t.x<v&&(v=t.x)}));const _=(u.height+1)*f,w=y-v+4*p,x=[-f/2,v-2*p,_,w],$=mt("svg").attr("version","1.1").attr("xmlns","http://www.w3.org/2000/svg").attr("xmlns:xlink","http://www.w3.org/1999/xlink").attr("xmlns:xhtml","http://www.w3.org/1999/xhtml").attr("viewBox",x).attr("width",_).attr("height",w).attr("style",`min-width: ${_}px; max-width: ${_}px; height: auto; height: intrinsic;`).attr("shape-rendering","crispEdges").attr("vector-effect","non-scaling-stroke").attr("text-anchor","middle").attr("text-rendering","optimizeLegibility").on("touchstart",(()=>{}));$.append("g").attr("fill","none").attr("stroke","#555").attr("stroke-opacity",1).attr("stroke-linecap","butt").attr("stroke-linejoin","miter").attr("stroke-width",1).selectAll("path").data(g.links()).join("path").attr("d",function(t){let n=At,e=Tt,i=Et,r=bt,o=null,s=null,a=function(t){let n=3;return t.digits=function(e){if(!arguments.length)return n;if(null==e)n=null;else{const t=Math.floor(e);if(!(t>=0))throw new RangeError(`invalid digits: ${e}`);n=t}return t},()=>new Lt(n)}(l);function l(){let l;const u=gt.call(arguments),c=n.apply(this,u),h=e.apply(this,u);if(null==o&&(s=t(l=a())),s.lineStart(),u[0]=c,s.point(+i.apply(this,u),+r.apply(this,u)),u[0]=h,s.point(+i.apply(this,u),+r.apply(this,u)),s.lineEnd(),l)return s=null,l+""||null}return l.source=function(t){return arguments.length?(n=t,l):n},l.target=function(t){return arguments.length?(e=t,l):e},l.x=function(t){return arguments.length?(i="function"==typeof t?t:vt(+t),l):i},l.y=function(t){return arguments.length?(r="function"==typeof t?t:vt(+t),l):r},l.context=function(n){return arguments.length?(null==n?o=s=null:s=t(o=n),l):o},l}(Mt).x((t=>t.y)).y((t=>t.x)));const L=g.descendants().map((function(t){return{node:t,bbox:new DOMRect(0,0,0,0)}})),E=$.append("g").selectAll("rect").data(L).join("rect").attr("fill","white"),b=$.append("g").selectAll("g").data(L).join("g").attr("font-weight",(t=>t.node.data.item.id==mn?"bold":null)).attr("transform",(t=>`translate(${t.node.y},${t.node.x})`));return b.append("text").attr("class","lang").attr("y","-1em").attr("fill",(t=>Ot(t.node.data.langDistance))).text((t=>t.node.data.item.lang)),b.append("text").attr("class","term").attr("y","0.25em").text((t=>t.node.data.item.term)),b.append("text").attr("class","romanization").attr("y","1.5em").text((t=>t.node.data.item.romanization?`(${t.node.data.item.romanization})`:"")),function(t){t.on("pointerup",(function(t,n){"mouse"!==t.pointerType&&i(n.node,this,"fixed")})),t.on("pointerenter",(function(t,r){"mouse"===t.pointerType&&(window.clearTimeout(n),e=window.setTimeout((()=>{i(r.node,this,"hover")}),100))})),t.on("pointerleave",(t=>{"mouse"===t.pointerType&&(window.clearTimeout(e),n=window.setTimeout(r,100))}))}(b),{svgElement:$.node(),nodeSelection:b,nodeBackgroundSelection:E}}(Rt);null!==t&&(t.setAttribute("id","tree"),t.style.opacity="0",Pt.appendChild(t),function(t,n){t.each((function(t){t.bbox=this.getBBox()}));n.attr("width",(t=>t.bbox.width+6)).attr("height",(t=>t.bbox.height+6)).attr("transform",(function(t){return`translate(${t.node.y-3},${t.node.x-3})`})).attr("x",(t=>t.bbox.x)).attr("y",(t=>t.bbox.y))}(l,u),window.scrollTo(document.body.scrollWidth,0),t.style.opacity="1")}()}catch(t){console.error(t)}}))}const qt=["#2F2E7A","#0B3577","#143867","#0D3D4D","#06412C","#004300","#224000","#493500","#672001","#740A16","#740549","#730138"],Ut="#696969";function Ot(t){return null===t?Ut:t<0?qt[0]:t>qt.length?qt[qt.length-1]:qt[t]}var Vt=function(t,n,e,i){return new(e||(e=Promise))((function(r,o){function s(t){try{l(i.next(t))}catch(t){o(t)}}function a(t){try{l(i.throw(t))}catch(t){o(t)}}function l(t){var n;t.done?r(t.value):(n=t.value,n instanceof e?n:new e((function(t){t(n)}))).then(s,a)}l((i=i.apply(t,n||[])).next())}))};const Wt="ontouchstart"in window,Xt=window.matchMedia("(pointer: fine)").matches,Ft=Wt&&!Xt,Yt=document.getElementById("lang-input"),Zt=document.getElementById("lang-suggestions");let Qt,Gt=[],Jt=-1,Kt=!1,tn=-1;const nn=function(){switch(window.location.hostname){case"www.wety.org":case"wety.org":return"https://api.wety.org/";default:return"http://192.168.0.88:3000/"}}();let en=null,rn=null;function on(t){tn=t.id,window.localStorage.setItem("lastLangName",t.name),window.localStorage.setItem("lastLangId",t.id.toString())}function sn(){return Vt(this,void 0,void 0,(function*(){const t=encodeURIComponent(Yt.value.trim().toLowerCase());if(t)try{const n=yield fetch(`${nn}langs/${t}`),e=yield n.json();console.log(e),Gt=e.matches,function(){if(Zt.innerHTML="",Jt=-1,0!==Gt.length){for(let t=0;t<Gt.length;t++){const n=Gt[t],e=document.createElement("li");e.classList.add("suggestion-item"),e.textContent=n.name,e.addEventListener("pointerup",(()=>{Yt.value=n.name,on(n),Zt.classList.add("hidden"),ln.focus()})),e.addEventListener("pointerover",(function(){an("hover",t)})),Zt.appendChild(e)}Zt.classList.remove("hidden")}else Zt.classList.add("hidden")}()}catch(t){console.error(t)}else Zt.innerHTML=""}))}function an(t,n=-1){const e=Zt.getElementsByTagName("li"),i=e[Jt];null==i||i.classList.remove("highlighted"),Jt=n;const r=e[Jt];if(null==r||r.classList.add("highlighted"),"hover"===t||-1===Jt)return;const o=r.getBoundingClientRect(),s=Zt.getBoundingClientRect();o.bottom>s.bottom?Zt.scrollTop+=o.bottom-s.bottom:o.top<s.top&&(Zt.scrollTop-=s.top-o.top)}window.addEventListener("DOMContentLoaded",(function(){return Vt(this,void 0,void 0,(function*(){if(en=this.localStorage.getItem("lastLangName"),rn=parseInt(this.localStorage.getItem("lastLangId")||""),null!==en&&null!==rn){Yt.value=en;try{console.log(`Checking that stored last lang with name ${en} and id ${rn} is still valid...`);const t=encodeURIComponent(en),n=yield fetch(`${nn}langs/${t}`),e=yield n.json();console.log(e);const i=e.matches[0];if(i.name===en&&i.id===rn)return console.log("Check succeeded, using stored last lang."),on(i),void ln.focus();throw new Error("invalid stored last lang")}catch(t){return Yt.value="",Yt.focus(),console.log("Check failed, clearing stored last lang. Probably the data was updated since your last visit."),en=null,rn=null,this.localStorage.removeItem("lastLangName"),void this.localStorage.removeItem("lastLangId")}}Yt.focus()}))})),Yt.addEventListener("input",(()=>{tn=-1,window.clearTimeout(Qt),Qt=window.setTimeout(sn,500)})),Yt.addEventListener("keydown",(t=>{if(0===Gt.length)return;let n=-1;if("ArrowDown"===t.key)t.preventDefault(),n=Jt<Gt.length-1?Jt+1:0;else if("ArrowUp"===t.key)t.preventDefault(),n=Jt>0?Jt-1:Gt.length-1;else if("Enter"===t.key&&Jt>-1){t.preventDefault();const n=Gt[Jt];Yt.value=n.name,on(n),Zt.classList.add("hidden"),ln.focus()}an("key",n)})),Yt.addEventListener("blur",(()=>{(Ft||Kt)&&-1===tn||Zt.classList.add("hidden")})),Zt.addEventListener("mouseover",(()=>{Kt=!0})),Zt.addEventListener("mouseout",(()=>{Kt=!1}));const ln=document.getElementById("term-input"),un=document.getElementById("term-suggestions");let cn,hn,dn=[],fn=-1,pn=!1,mn=-1;function gn(t,n){var e,i;const r=document.createElement("li");r.classList.add("suggestion-item"),r.addEventListener("pointerup",(()=>{ln.value=t.term,mn=t.id,un.classList.add("hidden"),-1!==tn&&(window.clearTimeout(hn),hn=window.setTimeout(jt,0))})),r.addEventListener("pointerover",(function(){yn("hover",n)}));const o=document.createElement("div");o.classList.add("term-line"),o.innerHTML=t.term,r.appendChild(o);const s=null!==(e=t.pos)&&void 0!==e?e:[],a=null!==(i=t.gloss)&&void 0!==i?i:[];for(let t=0;t<s.length;t++){const n=s[t],e=a[t],i=document.createElement("div");i.classList.add("pos-line"),i.innerHTML=`<span class="pos">${n}</span>: <span class="gloss">${e}</span>`,r.appendChild(i)}return r}function vn(){return Vt(this,void 0,void 0,(function*(){if(-1===tn)return void(un.innerHTML="");const t=encodeURIComponent(ln.value.trim().toLowerCase());if(t)try{const n=yield fetch(`${nn}items/${tn}/${t}`),e=yield n.json();console.log(e),dn=e.matches,function(){if(un.innerHTML="",fn=-1,0!==dn.length){for(let t=0;t<dn.length;t++){const n=gn(dn[t].item,t);un.appendChild(n)}un.classList.remove("hidden")}else un.classList.add("hidden")}()}catch(t){console.error(t)}else un.innerHTML=""}))}function yn(t,n=-1){const e=un.getElementsByTagName("li"),i=e[fn];null==i||i.classList.remove("highlighted"),fn=n;const r=e[fn];if(null==r||r.classList.add("highlighted"),"hover"===t||-1===fn)return;const o=r.getBoundingClientRect(),s=un.getBoundingClientRect();o.bottom>s.bottom?un.scrollTop+=o.bottom-s.bottom:o.top<s.top&&(un.scrollTop-=s.top-o.top)}ln.addEventListener("input",(()=>{mn=-1,window.clearTimeout(cn),cn=window.setTimeout(vn,500)})),ln.addEventListener("keydown",(t=>{if(0===dn.length)return;let n=-1;if("ArrowDown"===t.key)t.preventDefault(),n=fn<dn.length-1?fn+1:0;else if("ArrowUp"===t.key)t.preventDefault(),n=fn>0?fn-1:dn.length-1;else if("Enter"===t.key&&fn>-1){t.preventDefault();const n=dn[fn];ln.value=n.item.term,mn=n.item.id,un.classList.add("hidden"),-1!==tn&&(window.clearTimeout(hn),hn=window.setTimeout(jt,0))}yn("key",n)})),ln.addEventListener("blur",(()=>{(Ft||pn)&&-1===mn||un.classList.add("hidden")})),un.addEventListener("mouseover",(()=>{pn=!0})),un.addEventListener("mouseout",(()=>{pn=!1}))})();