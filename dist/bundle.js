(()=>{"use strict";var t="http://www.w3.org/1999/xhtml";const n={svg:"http://www.w3.org/2000/svg",xhtml:t,xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/"};function e(t){var e=t+="",i=e.indexOf(":");return i>=0&&"xmlns"!==(e=t.slice(0,i))&&(t=t.slice(i+1)),n.hasOwnProperty(e)?{space:n[e],local:t}:t}function i(n){return function(){var e=this.ownerDocument,i=this.namespaceURI;return i===t&&e.documentElement.namespaceURI===t?e.createElement(n):e.createElementNS(i,n)}}function r(t){return function(){return this.ownerDocument.createElementNS(t.space,t.local)}}function o(t){var n=e(t);return(n.local?r:i)(n)}function s(){}function a(t){return null==t?s:function(){return this.querySelector(t)}}function l(){return[]}function u(t){return function(n){return n.matches(t)}}var c=Array.prototype.find;function h(){return this.firstElementChild}var f=Array.prototype.filter;function d(){return Array.from(this.children)}function p(t){return new Array(t.length)}function m(t,n){this.ownerDocument=t.ownerDocument,this.namespaceURI=t.namespaceURI,this._next=null,this._parent=t,this.__data__=n}function _(t,n,e,i,r,o){for(var s,a=0,l=n.length,u=o.length;a<u;++a)(s=n[a])?(s.__data__=o[a],i[a]=s):e[a]=new m(t,o[a]);for(;a<l;++a)(s=n[a])&&(r[a]=s)}function y(t,n,e,i,r,o,s){var a,l,u,c=new Map,h=n.length,f=o.length,d=new Array(h);for(a=0;a<h;++a)(l=n[a])&&(d[a]=u=s.call(l,l.__data__,a,n)+"",c.has(u)?r[a]=l:c.set(u,l));for(a=0;a<f;++a)u=s.call(t,o[a],a,o)+"",(l=c.get(u))?(i[a]=l,l.__data__=o[a],c.delete(u)):e[a]=new m(t,o[a]);for(a=0;a<h;++a)(l=n[a])&&c.get(d[a])===l&&(r[a]=l)}function v(t){return t.__data__}function g(t){return"object"==typeof t&&"length"in t?t:Array.from(t)}function w(t,n){return t<n?-1:t>n?1:t>=n?0:NaN}function x(t){return function(){this.removeAttribute(t)}}function $(t){return function(){this.removeAttributeNS(t.space,t.local)}}function L(t,n){return function(){this.setAttribute(t,n)}}function A(t,n){return function(){this.setAttributeNS(t.space,t.local,n)}}function E(t,n){return function(){var e=n.apply(this,arguments);null==e?this.removeAttribute(t):this.setAttribute(t,e)}}function b(t,n){return function(){var e=n.apply(this,arguments);null==e?this.removeAttributeNS(t.space,t.local):this.setAttributeNS(t.space,t.local,e)}}function T(t){return t.ownerDocument&&t.ownerDocument.defaultView||t.document&&t||t.defaultView}function M(t){return function(){this.style.removeProperty(t)}}function C(t,n,e){return function(){this.style.setProperty(t,n,e)}}function k(t,n,e){return function(){var i=n.apply(this,arguments);null==i?this.style.removeProperty(t):this.style.setProperty(t,i,e)}}function B(t){return function(){delete this[t]}}function S(t,n){return function(){this[t]=n}}function N(t,n){return function(){var e=n.apply(this,arguments);null==e?delete this[t]:this[t]=e}}function z(t){return t.trim().split(/^|\s+/)}function D(t){return t.classList||new H(t)}function H(t){this._node=t,this._names=z(t.getAttribute("class")||"")}function P(t,n){for(var e=D(t),i=-1,r=n.length;++i<r;)e.add(n[i])}function I(t,n){for(var e=D(t),i=-1,r=n.length;++i<r;)e.remove(n[i])}function R(t){return function(){P(this,t)}}function j(t){return function(){I(this,t)}}function q(t,n){return function(){(n.apply(this,arguments)?P:I)(this,t)}}function U(){this.textContent=""}function O(t){return function(){this.textContent=t}}function V(t){return function(){var n=t.apply(this,arguments);this.textContent=null==n?"":n}}function W(){this.innerHTML=""}function X(t){return function(){this.innerHTML=t}}function Y(t){return function(){var n=t.apply(this,arguments);this.innerHTML=null==n?"":n}}function Z(){this.nextSibling&&this.parentNode.appendChild(this)}function F(){this.previousSibling&&this.parentNode.insertBefore(this,this.parentNode.firstChild)}function Q(){return null}function G(){var t=this.parentNode;t&&t.removeChild(this)}function J(){var t=this.cloneNode(!1),n=this.parentNode;return n?n.insertBefore(t,this.nextSibling):t}function K(){var t=this.cloneNode(!0),n=this.parentNode;return n?n.insertBefore(t,this.nextSibling):t}function tt(t){return function(){var n=this.__on;if(n){for(var e,i=0,r=-1,o=n.length;i<o;++i)e=n[i],t.type&&e.type!==t.type||e.name!==t.name?n[++r]=e:this.removeEventListener(e.type,e.listener,e.options);++r?n.length=r:delete this.__on}}}function nt(t,n,e){return function(){var i,r=this.__on,o=function(t){return function(n){t.call(this,n,this.__data__)}}(n);if(r)for(var s=0,a=r.length;s<a;++s)if((i=r[s]).type===t.type&&i.name===t.name)return this.removeEventListener(i.type,i.listener,i.options),this.addEventListener(i.type,i.listener=o,i.options=e),void(i.value=n);this.addEventListener(t.type,o,e),i={type:t.type,name:t.name,value:n,listener:o,options:e},r?r.push(i):this.__on=[i]}}function et(t,n,e){var i=T(t),r=i.CustomEvent;"function"==typeof r?r=new r(n,e):(r=i.document.createEvent("Event"),e?(r.initEvent(n,e.bubbles,e.cancelable),r.detail=e.detail):r.initEvent(n,!1,!1)),t.dispatchEvent(r)}function it(t,n){return function(){return et(this,t,n)}}function rt(t,n){return function(){return et(this,t,n.apply(this,arguments))}}m.prototype={constructor:m,appendChild:function(t){return this._parent.insertBefore(t,this._next)},insertBefore:function(t,n){return this._parent.insertBefore(t,n)},querySelector:function(t){return this._parent.querySelector(t)},querySelectorAll:function(t){return this._parent.querySelectorAll(t)}},H.prototype={add:function(t){this._names.indexOf(t)<0&&(this._names.push(t),this._node.setAttribute("class",this._names.join(" ")))},remove:function(t){var n=this._names.indexOf(t);n>=0&&(this._names.splice(n,1),this._node.setAttribute("class",this._names.join(" ")))},contains:function(t){return this._names.indexOf(t)>=0}};var ot=[null];function st(t,n){this._groups=t,this._parents=n}function at(t){return function(t){return"string"==typeof t?new st([[document.querySelector(t)]],[document.documentElement]):new st([[t]],ot)}(o(t).call(document.documentElement))}function lt(t,n){this._context=t,this._t=n}function ut(t){return new lt(t,0)}st.prototype=function(){return new st([[document.documentElement]],ot)}.prototype={constructor:st,select:function(t){"function"!=typeof t&&(t=a(t));for(var n=this._groups,e=n.length,i=new Array(e),r=0;r<e;++r)for(var o,s,l=n[r],u=l.length,c=i[r]=new Array(u),h=0;h<u;++h)(o=l[h])&&(s=t.call(o,o.__data__,h,l))&&("__data__"in o&&(s.__data__=o.__data__),c[h]=s);return new st(i,this._parents)},selectAll:function(t){t="function"==typeof t?function(t){return function(){return null==(n=t.apply(this,arguments))?[]:Array.isArray(n)?n:Array.from(n);var n}}(t):function(t){return null==t?l:function(){return this.querySelectorAll(t)}}(t);for(var n=this._groups,e=n.length,i=[],r=[],o=0;o<e;++o)for(var s,a=n[o],u=a.length,c=0;c<u;++c)(s=a[c])&&(i.push(t.call(s,s.__data__,c,a)),r.push(s));return new st(i,r)},selectChild:function(t){return this.select(null==t?h:function(t){return function(){return c.call(this.children,t)}}("function"==typeof t?t:u(t)))},selectChildren:function(t){return this.selectAll(null==t?d:function(t){return function(){return f.call(this.children,t)}}("function"==typeof t?t:u(t)))},filter:function(t){"function"!=typeof t&&(t=function(t){return function(){return this.matches(t)}}(t));for(var n=this._groups,e=n.length,i=new Array(e),r=0;r<e;++r)for(var o,s=n[r],a=s.length,l=i[r]=[],u=0;u<a;++u)(o=s[u])&&t.call(o,o.__data__,u,s)&&l.push(o);return new st(i,this._parents)},data:function(t,n){if(!arguments.length)return Array.from(this,v);var e,i=n?y:_,r=this._parents,o=this._groups;"function"!=typeof t&&(e=t,t=function(){return e});for(var s=o.length,a=new Array(s),l=new Array(s),u=new Array(s),c=0;c<s;++c){var h=r[c],f=o[c],d=f.length,p=g(t.call(h,h&&h.__data__,c,r)),m=p.length,w=l[c]=new Array(m),x=a[c]=new Array(m);i(h,f,w,x,u[c]=new Array(d),p,n);for(var $,L,A=0,E=0;A<m;++A)if($=w[A]){for(A>=E&&(E=A+1);!(L=x[E])&&++E<m;);$._next=L||null}}return(a=new st(a,r))._enter=l,a._exit=u,a},enter:function(){return new st(this._enter||this._groups.map(p),this._parents)},exit:function(){return new st(this._exit||this._groups.map(p),this._parents)},join:function(t,n,e){var i=this.enter(),r=this,o=this.exit();return"function"==typeof t?(i=t(i))&&(i=i.selection()):i=i.append(t+""),null!=n&&(r=n(r))&&(r=r.selection()),null==e?o.remove():e(o),i&&r?i.merge(r).order():r},merge:function(t){for(var n=t.selection?t.selection():t,e=this._groups,i=n._groups,r=e.length,o=i.length,s=Math.min(r,o),a=new Array(r),l=0;l<s;++l)for(var u,c=e[l],h=i[l],f=c.length,d=a[l]=new Array(f),p=0;p<f;++p)(u=c[p]||h[p])&&(d[p]=u);for(;l<r;++l)a[l]=e[l];return new st(a,this._parents)},selection:function(){return this},order:function(){for(var t=this._groups,n=-1,e=t.length;++n<e;)for(var i,r=t[n],o=r.length-1,s=r[o];--o>=0;)(i=r[o])&&(s&&4^i.compareDocumentPosition(s)&&s.parentNode.insertBefore(i,s),s=i);return this},sort:function(t){function n(n,e){return n&&e?t(n.__data__,e.__data__):!n-!e}t||(t=w);for(var e=this._groups,i=e.length,r=new Array(i),o=0;o<i;++o){for(var s,a=e[o],l=a.length,u=r[o]=new Array(l),c=0;c<l;++c)(s=a[c])&&(u[c]=s);u.sort(n)}return new st(r,this._parents).order()},call:function(){var t=arguments[0];return arguments[0]=this,t.apply(null,arguments),this},nodes:function(){return Array.from(this)},node:function(){for(var t=this._groups,n=0,e=t.length;n<e;++n)for(var i=t[n],r=0,o=i.length;r<o;++r){var s=i[r];if(s)return s}return null},size:function(){let t=0;for(const n of this)++t;return t},empty:function(){return!this.node()},each:function(t){for(var n=this._groups,e=0,i=n.length;e<i;++e)for(var r,o=n[e],s=0,a=o.length;s<a;++s)(r=o[s])&&t.call(r,r.__data__,s,o);return this},attr:function(t,n){var i=e(t);if(arguments.length<2){var r=this.node();return i.local?r.getAttributeNS(i.space,i.local):r.getAttribute(i)}return this.each((null==n?i.local?$:x:"function"==typeof n?i.local?b:E:i.local?A:L)(i,n))},style:function(t,n,e){return arguments.length>1?this.each((null==n?M:"function"==typeof n?k:C)(t,n,null==e?"":e)):function(t,n){return t.style.getPropertyValue(n)||T(t).getComputedStyle(t,null).getPropertyValue(n)}(this.node(),t)},property:function(t,n){return arguments.length>1?this.each((null==n?B:"function"==typeof n?N:S)(t,n)):this.node()[t]},classed:function(t,n){var e=z(t+"");if(arguments.length<2){for(var i=D(this.node()),r=-1,o=e.length;++r<o;)if(!i.contains(e[r]))return!1;return!0}return this.each(("function"==typeof n?q:n?R:j)(e,n))},text:function(t){return arguments.length?this.each(null==t?U:("function"==typeof t?V:O)(t)):this.node().textContent},html:function(t){return arguments.length?this.each(null==t?W:("function"==typeof t?Y:X)(t)):this.node().innerHTML},raise:function(){return this.each(Z)},lower:function(){return this.each(F)},append:function(t){var n="function"==typeof t?t:o(t);return this.select((function(){return this.appendChild(n.apply(this,arguments))}))},insert:function(t,n){var e="function"==typeof t?t:o(t),i=null==n?Q:"function"==typeof n?n:a(n);return this.select((function(){return this.insertBefore(e.apply(this,arguments),i.apply(this,arguments)||null)}))},remove:function(){return this.each(G)},clone:function(t){return this.select(t?K:J)},datum:function(t){return arguments.length?this.property("__data__",t):this.node().__data__},on:function(t,n,e){var i,r,o=function(t){return t.trim().split(/^|\s+/).map((function(t){var n="",e=t.indexOf(".");return e>=0&&(n=t.slice(e+1),t=t.slice(0,e)),{type:t,name:n}}))}(t+""),s=o.length;if(!(arguments.length<2)){for(a=n?nt:tt,i=0;i<s;++i)this.each(a(o[i],n,e));return this}var a=this.node().__on;if(a)for(var l,u=0,c=a.length;u<c;++u)for(i=0,l=a[u];i<s;++i)if((r=o[i]).type===l.type&&r.name===l.name)return l.value},dispatch:function(t,n){return this.each(("function"==typeof n?rt:it)(t,n))},[Symbol.iterator]:function*(){for(var t=this._groups,n=0,e=t.length;n<e;++n)for(var i,r=t[n],o=0,s=r.length;o<s;++o)(i=r[o])&&(yield i)}},lt.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x=this._y=NaN,this._point=0},lineEnd:function(){0<this._t&&this._t<1&&2===this._point&&this._context.lineTo(this._x,this._y),(this._line||0!==this._line&&1===this._point)&&this._context.closePath(),this._line>=0&&(this._t=1-this._t,this._line=1-this._line)},point:function(t,n){switch(t=+t,n=+n,this._point){case 0:this._point=1,this._line?this._context.lineTo(t,n):this._context.moveTo(t,n);break;case 1:this._point=2;default:if(this._t<=0)this._context.lineTo(this._x,n),this._context.lineTo(t,n);else{var e=this._x*(1-this._t)+t*this._t;this._context.lineTo(e,this._y),this._context.lineTo(e,n)}}this._x=t,this._y=n}};var ct=Array.prototype.slice;function ht(t){return function(){return t}}const ft=Math.PI,dt=2*ft,pt=1e-6,mt=dt-pt;function _t(t){this._+=t[0];for(let n=1,e=t.length;n<e;++n)this._+=arguments[n]+t[n]}class yt{constructor(t){this._x0=this._y0=this._x1=this._y1=null,this._="",this._append=null==t?_t:function(t){let n=Math.floor(t);if(!(n>=0))throw new Error(`invalid digits: ${t}`);if(n>15)return _t;const e=10**n;return function(t){this._+=t[0];for(let n=1,i=t.length;n<i;++n)this._+=Math.round(arguments[n]*e)/e+t[n]}}(t)}moveTo(t,n){this._append`M${this._x0=this._x1=+t},${this._y0=this._y1=+n}`}closePath(){null!==this._x1&&(this._x1=this._x0,this._y1=this._y0,this._append`Z`)}lineTo(t,n){this._append`L${this._x1=+t},${this._y1=+n}`}quadraticCurveTo(t,n,e,i){this._append`Q${+t},${+n},${this._x1=+e},${this._y1=+i}`}bezierCurveTo(t,n,e,i,r,o){this._append`C${+t},${+n},${+e},${+i},${this._x1=+r},${this._y1=+o}`}arcTo(t,n,e,i,r){if(t=+t,n=+n,e=+e,i=+i,(r=+r)<0)throw new Error(`negative radius: ${r}`);let o=this._x1,s=this._y1,a=e-t,l=i-n,u=o-t,c=s-n,h=u*u+c*c;if(null===this._x1)this._append`M${this._x1=t},${this._y1=n}`;else if(h>pt)if(Math.abs(c*a-l*u)>pt&&r){let f=e-o,d=i-s,p=a*a+l*l,m=f*f+d*d,_=Math.sqrt(p),y=Math.sqrt(h),v=r*Math.tan((ft-Math.acos((p+h-m)/(2*_*y)))/2),g=v/y,w=v/_;Math.abs(g-1)>pt&&this._append`L${t+g*u},${n+g*c}`,this._append`A${r},${r},0,0,${+(c*f>u*d)},${this._x1=t+w*a},${this._y1=n+w*l}`}else this._append`L${this._x1=t},${this._y1=n}`}arc(t,n,e,i,r,o){if(t=+t,n=+n,o=!!o,(e=+e)<0)throw new Error(`negative radius: ${e}`);let s=e*Math.cos(i),a=e*Math.sin(i),l=t+s,u=n+a,c=1^o,h=o?i-r:r-i;null===this._x1?this._append`M${l},${u}`:(Math.abs(this._x1-l)>pt||Math.abs(this._y1-u)>pt)&&this._append`L${l},${u}`,e&&(h<0&&(h=h%dt+dt),h>mt?this._append`A${e},${e},0,1,${c},${t-s},${n-a}A${e},${e},0,1,${c},${this._x1=l},${this._y1=u}`:h>pt&&this._append`A${e},${e},0,${+(h>=ft)},${c},${this._x1=t+e*Math.cos(r)},${this._y1=n+e*Math.sin(r)}`)}rect(t,n,e,i){this._append`M${this._x0=this._x1=+t},${this._y0=this._y1=+n}h${e=+e}v${+i}h${-e}Z`}toString(){return this._}}function vt(t){return t[0]}function gt(t){return t[1]}function wt(t){return t.source}function xt(t){return t.target}function $t(t,n){return t.parent===n.parent?1:2}function Lt(t,n){return t+n.x}function At(t,n){return Math.max(t,n.y)}function Et(){var t=$t,n=1,e=1,i=!1;function r(r){var o,s=0;r.eachAfter((function(n){var e=n.children;e?(n.x=function(t){return t.reduce(Lt,0)/t.length}(e),n.y=function(t){return 1+t.reduce(At,0)}(e)):(n.x=o?s+=t(n,o):0,n.y=0,o=n)}));var a=function(t){for(var n;n=t.children;)t=n[0];return t}(r),l=function(t){for(var n;n=t.children;)t=n[n.length-1];return t}(r),u=a.x-t(a,l)/2,c=l.x+t(l,a)/2;return r.eachAfter(i?function(t){t.x=(t.x-r.x)*n,t.y=(r.y-t.y)*e}:function(t){t.x=(t.x-u)/(c-u)*n,t.y=(1-(r.y?t.y/r.y:1))*e})}return r.separation=function(n){return arguments.length?(t=n,r):t},r.size=function(t){return arguments.length?(i=!1,n=+t[0],e=+t[1],r):i?null:[n,e]},r.nodeSize=function(t){return arguments.length?(i=!0,n=+t[0],e=+t[1],r):i?[n,e]:null},r}function bt(t){var n=0,e=t.children,i=e&&e.length;if(i)for(;--i>=0;)n+=e[i].value;else n=1;t.value=n}function Tt(t,n){t instanceof Map?(t=[void 0,t],void 0===n&&(n=Ct)):void 0===n&&(n=Mt);for(var e,i,r,o,s,a=new St(t),l=[a];e=l.pop();)if((r=n(e.data))&&(s=(r=Array.from(r)).length))for(e.children=r,o=s-1;o>=0;--o)l.push(i=r[o]=new St(r[o])),i.parent=e,i.depth=e.depth+1;return a.eachBefore(Bt)}function Mt(t){return t.children}function Ct(t){return Array.isArray(t)?t[1]:null}function kt(t){void 0!==t.data.value&&(t.value=t.data.value),t.data=t.data.data}function Bt(t){var n=0;do{t.height=n}while((t=t.parent)&&t.height<++n)}function St(t){this.data=t,this.depth=this.height=0,this.parent=null}yt.prototype,St.prototype=Tt.prototype={constructor:St,count:function(){return this.eachAfter(bt)},each:function(t,n){let e=-1;for(const i of this)t.call(n,i,++e,this);return this},eachAfter:function(t,n){for(var e,i,r,o=this,s=[o],a=[],l=-1;o=s.pop();)if(a.push(o),e=o.children)for(i=0,r=e.length;i<r;++i)s.push(e[i]);for(;o=a.pop();)t.call(n,o,++l,this);return this},eachBefore:function(t,n){for(var e,i,r=this,o=[r],s=-1;r=o.pop();)if(t.call(n,r,++s,this),e=r.children)for(i=e.length-1;i>=0;--i)o.push(e[i]);return this},find:function(t,n){let e=-1;for(const i of this)if(t.call(n,i,++e,this))return i},sum:function(t){return this.eachAfter((function(n){for(var e=+t(n.data)||0,i=n.children,r=i&&i.length;--r>=0;)e+=i[r].value;n.value=e}))},sort:function(t){return this.eachBefore((function(n){n.children&&n.children.sort(t)}))},path:function(t){for(var n=this,e=function(t,n){if(t===n)return t;var e=t.ancestors(),i=n.ancestors(),r=null;for(t=e.pop(),n=i.pop();t===n;)r=t,t=e.pop(),n=i.pop();return r}(n,t),i=[n];n!==e;)n=n.parent,i.push(n);for(var r=i.length;t!==e;)i.splice(r,0,t),t=t.parent;return i},ancestors:function(){for(var t=this,n=[t];t=t.parent;)n.push(t);return n},descendants:function(){return Array.from(this)},leaves:function(){var t=[];return this.eachBefore((function(n){n.children||t.push(n)})),t},links:function(){var t=this,n=[];return t.each((function(e){e!==t&&n.push({source:e.parent,target:e})})),n},copy:function(){return Tt(this).eachBefore(kt)},[Symbol.iterator]:function*(){var t,n,e,i,r=this,o=[r];do{for(t=o.reverse(),o=[];r=t.pop();)if(yield r,n=r.children)for(e=0,i=n.length;e<i;++e)o.push(n[e])}while(o.length)}};var Nt=function(t,n,e,i){return new(e||(e=Promise))((function(r,o){function s(t){try{l(i.next(t))}catch(t){o(t)}}function a(t){try{l(i.throw(t))}catch(t){o(t)}}function l(t){var n;t.done?r(t.value):(n=t.value,n instanceof e?n:new e((function(t){t(n)}))).then(s,a)}l((i=i.apply(t,n||[])).next())}))};let zt,Dt=null;const Ht=document.getElementById("ety"),Pt=document.getElementById("tooltip");function It(){return Nt(this,void 0,void 0,(function*(){try{const t=yield fetch(`${Jt}headProgenitorTree/${ln}/filter/${Gt}`);Dt=yield t.json(),console.log(Dt),Rt()}catch(t){console.error(t)}}))}function Rt(){if(Ht.innerHTML="",null===Dt)return;const t=function(t,{layoutAlg:n=Et,width:e=640,padding:i={outer:{vertical:5,horizontal:5},node:{horizontal:1}},stroke:r="#555",strokeWidth:o=1.5,strokeOpacity:s=.4,strokeLinejoin:a="miter",strokeLinecap:l="butt",halo:u="#fff",haloWidth:c=3,curveAlg:h=ut}={}){const f=Tt(t,(t=>t.children));f.count().sort(((t,n)=>{var e,i;return n.height-t.height||(null!==(e=n.value)&&void 0!==e?e:0)-(null!==(i=t.value)&&void 0!==i?i:0)}));const d=e/(f.height+i.node.horizontal),p=n().nodeSize([12,d]).separation(((t,n)=>t.parent==n.parent?2.5:3))(f);let m=1/0,_=-m;p.each((t=>{t.x>_&&(_=t.x),t.x<m&&(m=t.x)}));const y=_-m+24,v=[-d*i.node.horizontal/2-i.outer.horizontal,m-12-i.outer.vertical,e+i.outer.horizontal,y+i.outer.vertical],g=at("svg").attr("version","1.1").attr("xmlns","http://www.w3.org/2000/svg").attr("xmlns:xlink","http://www.w3.org/1999/xlink").attr("xmlns:xhtml","http://www.w3.org/1999/xhtml").attr("viewBox",v).attr("width",e).attr("height",y).attr("style","max-width: 100%; height: auto; height: intrinsic;").attr("font-family","sans-serif").attr("font-size",10);g.append("g").attr("fill","none").attr("stroke",r).attr("stroke-opacity",s).attr("stroke-linecap",l).attr("stroke-linejoin",a).attr("stroke-width",o).selectAll("path").data(p.links()).join("path").attr("d",function(t){let n=wt,e=xt,i=vt,r=gt,o=null,s=null,a=function(t){let n=3;return t.digits=function(e){if(!arguments.length)return n;if(null==e)n=null;else{const t=Math.floor(e);if(!(t>=0))throw new RangeError(`invalid digits: ${e}`);n=t}return t},()=>new yt(n)}(l);function l(){let l;const u=ct.call(arguments),c=n.apply(this,u),h=e.apply(this,u);if(null==o&&(s=t(l=a())),s.lineStart(),u[0]=c,s.point(+i.apply(this,u),+r.apply(this,u)),u[0]=h,s.point(+i.apply(this,u),+r.apply(this,u)),s.lineEnd(),l)return s=null,l+""||null}return l.source=function(t){return arguments.length?(n=t,l):n},l.target=function(t){return arguments.length?(e=t,l):e},l.x=function(t){return arguments.length?(i="function"==typeof t?t:ht(+t),l):i},l.y=function(t){return arguments.length?(r="function"==typeof t?t:ht(+t),l):r},l.context=function(n){return arguments.length?(null==n?o=s=null:s=t(o=n),l):o},l}(h).x((t=>t.y)).y((t=>t.x)));const w=g.append("g").selectAll("a").data(p.descendants()).join("a").attr("xlink:href",(t=>t.data.item.url)).attr("target","_blank").attr("transform",(t=>`translate(${t.y},${t.x})`)).attr("class","node"),x=w.append("text").attr("x",(t=>t.children?-6:6)).attr("text-anchor",(t=>t.children?"end":"start")).attr("paint-order","stroke").attr("stroke",u).attr("stroke-width",c).attr("text-rendering","optimizeLegibility");return x.append("tspan").attr("class","lang").attr("x",0).attr("text-anchor","middle").attr("dy","-1.0em").attr("fill",(t=>Ut(t.data.langDistance))).attr("text-rendering","optimizeLegibility").text((t=>t.data.item.lang)),x.append("tspan").attr("class","term").attr("x",0).attr("text-anchor","middle").attr("dy","1.0em").attr("text-rendering","optimizeLegibility").text((t=>t.data.item.term)),x.append("tspan").attr("class","romanization").attr("x",0).attr("text-anchor","middle").attr("dy","1.0em").attr("text-rendering","optimizeLegibility").text((t=>t.data.item.romanization?`(${t.data.item.romanization})`:"")),w.on("mouseover",((t,n)=>function(t,n){(function(t){var n,e;Pt.innerHTML="";const i=t.data.item,r=t.parent?{lang:t.parent.data.item.lang,term:t.parent.data.item.term,langDistance:t.parent.data.langDistance}:null,o=document.createElement("p");o.classList.add("lang"),o.style.color=Ut(t.data.langDistance),o.textContent=`${i.lang}`,Pt.appendChild(o);const s=document.createElement("p");if(s.innerHTML=`<span class="term">${i.term}</span>`+(i.romanization?` <span class="romanization">(${i.romanization})</span>`:""),Pt.appendChild(s),i.imputed){const t=document.createElement("div");t.classList.add("pos-line"),t.innerHTML='<span class="imputed">(imputed)</span>',Pt.appendChild(t)}else if(i.pos&&i.gloss&&i.pos.length===i.gloss.length){const t=document.createElement("div"),r=null!==(n=i.pos)&&void 0!==n?n:[],o=null!==(e=i.gloss)&&void 0!==e?e:[];for(let n=0;n<r.length;n++){const e=r[n],i=o[n],s=document.createElement("div");s.classList.add("pos-line"),s.innerHTML=`<span class="pos">${e}</span>: <span class="gloss">${i}</span>`,t.appendChild(s)}Pt.appendChild(t)}if(i.etyMode&&r){const t=document.createElement("p"),n=function(t){switch(t){case"derived":case"inherited":case"borrowed":case"back-formation":return"from";case"compound":case"univerbation":case"transfix":case"surface analysis":case"suffix":case"prefix":case"infix":case"confix":case"circumfix":case"blend":case"affix":return"with";case"root":return"reflex of";case"mention":return"in";default:return"of"}}(i.etyMode),e=Ut(r.langDistance);t.innerHTML=`<span class="ety-mode">${i.etyMode}</span> <span class="ety-prep">${n}</span> <span class="parent-lang" style="color: ${e};">${r.lang}</span> <span class="parent-term">${r.term}</span>`,Pt.appendChild(t)}})(n),function(t){const n=Pt.getBoundingClientRect(),e=t.clientX+window.scrollX,i=t.clientY+window.scrollY,r=window.innerWidth/2,o=window.innerHeight/2;let s,a;e<=r&&i<=o?(s=e+10,a=i+10):e>r&&i<=o?(s=e-n.width-10,a=i+10):e<=r&&i>o?(s=e+10,a=i-n.height-10):(s=e-n.width-10,a=i-n.height-10),Pt.style.left=s+"px",Pt.style.top=a+"px"}(t),Pt.style.opacity="1"}(t,n))),w.on("mouseout",Ot),g.node()}(Dt,{width:Ht.clientWidth});null!==t&&(t.setAttribute("id","tree"),Ht.appendChild(t))}window.addEventListener("resize",(function(){window.clearTimeout(zt),zt=window.setTimeout(Rt,500)}));const jt=["#2F2E7A","#0B3577","#143867","#0D3D4D","#06412C","#004300","#224000","#493500","#672001","#740A16","#740549","#730138"],qt="#000000";function Ut(t){return null===t?qt:t<0?jt[0]:t>jt.length?jt[jt.length-1]:jt[t]}function Ot(){Pt.style.opacity="0"}var Vt=function(t,n,e,i){return new(e||(e=Promise))((function(r,o){function s(t){try{l(i.next(t))}catch(t){o(t)}}function a(t){try{l(i.throw(t))}catch(t){o(t)}}function l(t){var n;t.done?r(t.value):(n=t.value,n instanceof e?n:new e((function(t){t(n)}))).then(s,a)}l((i=i.apply(t,n||[])).next())}))};const Wt=document.getElementById("lang-input"),Xt=document.getElementById("lang-suggestions");let Yt,Zt=[],Ft=-1,Qt=!1,Gt=-1;const Jt="127.0.0.1"===window.location.hostname?"http://127.0.0.1:3000/":"https://api.wety.org/";function Kt(){return Vt(this,void 0,void 0,(function*(){const t=encodeURIComponent(Wt.value.toLowerCase());if(t)try{const n=yield fetch(`${Jt}langs/${t}`),e=yield n.json();console.log(e),Zt=e.matches,Xt.innerHTML="",Ft=-1,0!==Zt.length?(Xt.classList.remove("hidden"),Zt.forEach(((t,n)=>{const e=document.createElement("li");e.classList.add("suggestion-item"),e.textContent=t.name,e.addEventListener("pointerup",(()=>{Wt.value=t.name,Gt=t.id,Xt.classList.add("hidden")})),Xt.appendChild(e),n===Ft&&e.classList.add("selected")}))):Xt.classList.add("hidden")}catch(t){console.error(t)}else Xt.innerHTML=""}))}Wt.addEventListener("input",(()=>{window.clearTimeout(Yt),Yt=window.setTimeout(Kt,500)})),Wt.addEventListener("keydown",(t=>{if("ArrowDown"===t.key)t.preventDefault(),Ft<Zt.length-1&&Ft++;else if("ArrowUp"===t.key)t.preventDefault(),Ft>-1&&Ft--;else if(("Tab"===t.key||"Enter"===t.key)&&Ft>-1){t.preventDefault();const n=Zt[Ft];Wt.value=n.name,Gt=n.id,Xt.classList.add("hidden"),Ft=-1}!function(){const t=Xt.getElementsByTagName("li");for(let n=0;n<t.length;n++){const e=t[n];if(n===Ft){e.classList.add("selected");const t=e.getBoundingClientRect(),n=Xt.getBoundingClientRect();t.bottom>n.bottom?Xt.scrollTop+=t.bottom-n.bottom:t.top<n.top&&(Xt.scrollTop-=n.top-t.top)}else e.classList.remove("selected")}}()})),Wt.addEventListener("blur",(()=>{Qt||Xt.classList.add("hidden")})),Wt.addEventListener("focus",(()=>{Xt.classList.remove("hidden")})),Xt.addEventListener("mouseover",(()=>{Qt=!0})),Xt.addEventListener("mouseout",(()=>{Qt=!1}));const tn=document.getElementById("term-input"),nn=document.getElementById("term-suggestions");let en,rn,on=[],sn=-1,an=!1,ln=-1;function un(){return Vt(this,void 0,void 0,(function*(){if(-1===Gt)return void(nn.innerHTML="");const t=encodeURIComponent(tn.value.toLowerCase());if(t)try{const n=yield fetch(`${Jt}items/${Gt}/${t}`),e=yield n.json();console.log(e),on=e.matches,nn.innerHTML="",sn=-1,0!==on.length?(nn.classList.remove("hidden"),on.forEach(((t,n)=>{const e=function(t){var n,e;const i=document.createElement("li");i.classList.add("suggestion-item"),i.addEventListener("pointerup",(()=>{tn.value=t.term,ln=t.id,nn.classList.add("hidden"),-1!==Gt&&(window.clearTimeout(rn),rn=window.setTimeout(It,0))}));const r=document.createElement("div");r.classList.add("term-line"),r.innerHTML=t.term,i.appendChild(r);const o=null!==(n=t.pos)&&void 0!==n?n:[],s=null!==(e=t.gloss)&&void 0!==e?e:[];for(let t=0;t<o.length;t++){const n=o[t],e=s[t],r=document.createElement("div");r.classList.add("pos-line"),r.innerHTML=`<span class="pos">${n}</span>: <span class="gloss">${e}</span>`,i.appendChild(r)}return i}(t.item);nn.appendChild(e),n===sn&&e.classList.add("selected")}))):nn.classList.add("hidden")}catch(t){console.error(t)}else nn.innerHTML=""}))}tn.addEventListener("input",(()=>{window.clearTimeout(en),en=window.setTimeout(un,500)})),tn.addEventListener("keydown",(t=>{if("ArrowDown"===t.key)t.preventDefault(),sn<on.length-1&&sn++;else if("ArrowUp"===t.key)t.preventDefault(),sn>-1&&sn--;else if(("Tab"===t.key||"Enter"===t.key)&&sn>-1){t.preventDefault();const n=on[sn];tn.value=n.item.term,ln=n.item.id,nn.classList.add("hidden"),-1!==Gt&&(window.clearTimeout(rn),rn=window.setTimeout(It,0)),sn=-1}!function(){const t=nn.getElementsByTagName("li");for(let n=0;n<t.length;n++){const e=t[n];if(n===sn){e.classList.add("selected");const t=e.getBoundingClientRect(),n=nn.getBoundingClientRect();t.bottom>n.bottom?nn.scrollTop+=t.bottom-n.bottom:t.top<n.top&&(nn.scrollTop-=n.top-t.top)}else e.classList.remove("selected")}}()})),tn.addEventListener("blur",(()=>{an||nn.classList.add("hidden")})),tn.addEventListener("focus",(()=>{nn.classList.remove("hidden")})),nn.addEventListener("mouseover",(()=>{an=!0})),nn.addEventListener("mouseout",(()=>{an=!1}))})();