import{a as l,b as yt}from"../../chunk-6KMKD42J.mjs";var p=l((me,A)=>{function Tt(t){var r=typeof t;return t!=null&&(r=="object"||r=="function")}A.exports=Tt});var P=l((be,N)=>{var St=typeof global=="object"&&global&&global.Object===Object&&global;N.exports=St});var S=l((pe,R)=>{var Ct=P(),wt=typeof self=="object"&&self&&self.Object===Object&&self,jt=Ct||wt||Function("return this")();R.exports=jt});var F=l((ve,W)=>{var qt=S(),Ot=function(){return qt.Date.now()};W.exports=Ot});var B=l((xe,_)=>{var Et=/\s/;function It(t){for(var r=t.length;r--&&Et.test(t.charAt(r)););return r}_.exports=It});var G=l((ye,M)=>{var kt=B(),Lt=/^\s+/;function At(t){return t&&t.slice(0,kt(t)+1).replace(Lt,"")}M.exports=At});var C=l((Te,D)=>{var Nt=S(),Pt=Nt.Symbol;D.exports=Pt});var X=l((Se,$)=>{var H=C(),U=Object.prototype,Rt=U.hasOwnProperty,Wt=U.toString,m=H?H.toStringTag:void 0;function Ft(t){var r=Rt.call(t,m),e=t[m];try{t[m]=void 0;var i=!0}catch{}var n=Wt.call(t);return i&&(r?t[m]=e:delete t[m]),n}$.exports=Ft});var J=l((Ce,z)=>{var _t=Object.prototype,Bt=_t.toString;function Mt(t){return Bt.call(t)}z.exports=Mt});var Y=l((we,V)=>{var K=C(),Gt=X(),Dt=J(),Ht="[object Null]",Ut="[object Undefined]",Q=K?K.toStringTag:void 0;function $t(t){return t==null?t===void 0?Ut:Ht:Q&&Q in Object(t)?Gt(t):Dt(t)}V.exports=$t});var tt=l((je,Z)=>{function Xt(t){return t!=null&&typeof t=="object"}Z.exports=Xt});var rt=l((qe,et)=>{var zt=Y(),Jt=tt(),Kt="[object Symbol]";function Qt(t){return typeof t=="symbol"||Jt(t)&&zt(t)==Kt}et.exports=Qt});var st=l((Oe,ot)=>{var Vt=G(),nt=p(),Yt=rt(),it=0/0,Zt=/^[-+]0x[0-9a-f]+$/i,te=/^0b[01]+$/i,ee=/^0o[0-7]+$/i,re=parseInt;function ne(t){if(typeof t=="number")return t;if(Yt(t))return it;if(nt(t)){var r=typeof t.valueOf=="function"?t.valueOf():t;t=nt(r)?r+"":r}if(typeof t!="string")return t===0?t:+t;t=Vt(t);var e=te.test(t);return e||ee.test(t)?re(t.slice(2),e?2:8):Zt.test(t)?it:+t}ot.exports=ne});var ct=l((Ee,lt)=>{var ie=p(),w=F(),at=st(),oe="Expected a function",se=Math.max,ae=Math.min;function le(t,r,e){var i,n,c,s,a,u,d=0,v=!1,h=!1,x=!0;if(typeof t!="function")throw new TypeError(oe);r=at(r)||0,ie(e)&&(v=!!e.leading,h="maxWait"in e,c=h?se(at(e.maxWait)||0,r):c,x="trailing"in e?!!e.trailing:x);function y(o){var f=i,g=n;return i=n=void 0,d=o,s=t.apply(g,f),s}function bt(o){return d=o,a=setTimeout(b,r),v?y(o):s}function pt(o){var f=o-u,g=o-d,L=r-f;return h?ae(L,c-g):L}function I(o){var f=o-u,g=o-d;return u===void 0||f>=r||f<0||h&&g>=c}function b(){var o=w();if(I(o))return k(o);a=setTimeout(b,pt(o))}function k(o){return a=void 0,x&&i?y(o):(i=n=void 0,s)}function vt(){a!==void 0&&clearTimeout(a),d=0,i=u=n=a=void 0}function xt(){return a===void 0?s:k(w())}function T(){var o=w(),f=I(o);if(i=arguments,n=this,u=o,f){if(a===void 0)return bt(u);if(h)return clearTimeout(a),a=setTimeout(b,r),y(u)}return a===void 0&&(a=setTimeout(b,r)),s}return T.cancel=vt,T.flush=xt,T}lt.exports=le});var dt=l((Ie,ut)=>{var ce=ct(),ue=p(),de="Expected a function";function fe(t,r,e){var i=!0,n=!0;if(typeof t!="function")throw new TypeError(de);return ue(e)&&(i="leading"in e?!!e.leading:i,n="trailing"in e?!!e.trailing:n),ce(t,r,{leading:i,maxWait:r,trailing:n})}ut.exports=fe});var mt=yt(dt(),1);var ft='<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-left"><polyline points="15 18 9 12 15 6"></polyline></svg>';var ht='<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-right"><polyline points="9 18 15 12 9 6"></polyline></svg>';var j=t=>window.getComputedStyle(t).direction==="rtl",q=(t,r="center")=>{let e=j(t),i=document.documentElement.clientWidth,n=t.getBoundingClientRect();switch(r){case"start":return e?i-n.right:n.left;case"end":return e?i-n.left:n.right;case"center":default:{let c=n.left+n.width/2;return e?i-c:c}}},gt=(t,r="center")=>{let e=window.getComputedStyle(t).scrollSnapAlign;return e==="none"&&(e=r),e};var O=class{constructor(r){this._handleCarouselScroll=(0,mt.default)(this._handleCarouselScroll.bind(this),200),this.navigateToNextItem=this.navigateToNextItem.bind(this),this.carousel=r.root,this.scrollContainer=this.carousel.querySelector('[role="region"][tabindex="0"]'),this.mediaList=this.scrollContainer.querySelector('[role="list"]');let e=document.createElement("ol");e.setAttribute("role","list"),e.classList.add("carousel-controls"),e.setAttribute("aria-label","Navigation controls");let i=n=>{let c=document.createElement("li"),s=document.createElement("button");return s.classList.add("carousel-control",n),s.setAttribute("aria-label",n==="start"?"Previous":"Next"),s.innerHTML=n==="start"?ft:ht,s.addEventListener("click",()=>{s.getAttribute("aria-disabled")!=="true"&&this.navigateToNextItem(n)}),c.appendChild(s),e.appendChild(c),s};this.navControlPrevious=i("start"),this.navControlNext=i("end"),this.carousel.appendChild(e),this.scrollContainer.addEventListener("scroll",this._handleCarouselScroll),this._handleCarouselScroll()}_handleCarouselScroll(){let r=Math.abs(this.scrollContainer.scrollLeft),e=this.scrollContainer.clientWidth+1,i=Math.floor(r)===0,n=Math.ceil(e+r)>=this.scrollContainer.scrollWidth;this.navControlPrevious.setAttribute("aria-disabled",i),this.navControlNext.setAttribute("aria-disabled",n)}navigateToNextItem(r){let e=Array.from(this.mediaList.querySelectorAll(":scope > *"));e=r==="start"?e.reverse():e;let i=q(this.scrollContainer,"center"),n;for(let a of e){let u=gt(a),d=q(a,u);if(r==="start"&&d+1<i||r==="end"&&d-i>1){n=d;break}}if(typeof n=="undefined")return;let s=(j(this.carousel)?-1:1)*(n-i);this.scrollContainer.scrollBy({left:s})}},E=O;var _e=new E({root:document.querySelector("#carousel")}),Be=new E({root:document.querySelector("#slideshow")});
