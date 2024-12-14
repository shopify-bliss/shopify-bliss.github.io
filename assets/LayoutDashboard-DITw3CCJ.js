var M=Object.defineProperty;var D=(t,e,i)=>e in t?M(t,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[e]=i;var o=(t,e,i)=>D(t,typeof e!="symbol"?e+"":e,i);import{r as v,f as L,j as l,N as W,a as H}from"./index-B1L2C_zm.js";import{C as b,j as O}from"./index--JkIgoLm.js";import{L as I}from"./AiBuilderSupport-BjVXAMsY.js";var V="1.1.16";function z(t,e,i){return Math.max(t,Math.min(e,i))}function P(t,e,i){return(1-i)*t+i*e}function A(t,e,i,s){return P(t,e,1-Math.exp(-i*s))}function C(t,e){return(t%e+e)%e}var U=class{constructor(){o(this,"isRunning",!1);o(this,"value",0);o(this,"from",0);o(this,"to",0);o(this,"currentTime",0);o(this,"lerp");o(this,"duration");o(this,"easing");o(this,"onUpdate")}advance(t){var i;if(!this.isRunning)return;let e=!1;if(this.duration&&this.easing){this.currentTime+=t;const s=z(0,this.currentTime/this.duration,1);e=s>=1;const n=e?1:this.easing(s);this.value=this.from+(this.to-this.from)*n}else this.lerp?(this.value=A(this.value,this.to,this.lerp*60,t),Math.round(this.value)===this.to&&(this.value=this.to,e=!0)):(this.value=this.to,e=!0);e&&this.stop(),(i=this.onUpdate)==null||i.call(this,this.value,e)}stop(){this.isRunning=!1}fromTo(t,e,{lerp:i,duration:s,easing:n,onStart:r,onUpdate:f}){this.from=this.value=t,this.to=e,this.lerp=i,this.duration=s,this.easing=n,this.currentTime=0,this.isRunning=!0,r==null||r(),this.onUpdate=f}};function X(t,e){let i;return function(...s){let n=this;clearTimeout(i),i=setTimeout(()=>{i=void 0,t.apply(n,s)},e)}}var Y=class{constructor(t,e,{autoResize:i=!0,debounce:s=250}={}){o(this,"width",0);o(this,"height",0);o(this,"scrollHeight",0);o(this,"scrollWidth",0);o(this,"debouncedResize");o(this,"wrapperResizeObserver");o(this,"contentResizeObserver");o(this,"resize",()=>{this.onWrapperResize(),this.onContentResize()});o(this,"onWrapperResize",()=>{this.wrapper instanceof Window?(this.width=window.innerWidth,this.height=window.innerHeight):(this.width=this.wrapper.clientWidth,this.height=this.wrapper.clientHeight)});o(this,"onContentResize",()=>{this.wrapper instanceof Window?(this.scrollHeight=this.content.scrollHeight,this.scrollWidth=this.content.scrollWidth):(this.scrollHeight=this.wrapper.scrollHeight,this.scrollWidth=this.wrapper.scrollWidth)});this.wrapper=t,this.content=e,i&&(this.debouncedResize=X(this.resize,s),this.wrapper instanceof Window?window.addEventListener("resize",this.debouncedResize,!1):(this.wrapperResizeObserver=new ResizeObserver(this.debouncedResize),this.wrapperResizeObserver.observe(this.wrapper)),this.contentResizeObserver=new ResizeObserver(this.debouncedResize),this.contentResizeObserver.observe(this.content)),this.resize()}destroy(){var t,e;(t=this.wrapperResizeObserver)==null||t.disconnect(),(e=this.contentResizeObserver)==null||e.disconnect(),this.wrapper===window&&this.debouncedResize&&window.removeEventListener("resize",this.debouncedResize,!1)}get limit(){return{x:this.scrollWidth-this.width,y:this.scrollHeight-this.height}}},_=class{constructor(){o(this,"events",{})}emit(t,...e){var s;let i=this.events[t]||[];for(let n=0,r=i.length;n<r;n++)(s=i[n])==null||s.call(i,...e)}on(t,e){var i;return(i=this.events[t])!=null&&i.push(e)||(this.events[t]=[e]),()=>{var s;this.events[t]=(s=this.events[t])==null?void 0:s.filter(n=>e!==n)}}off(t,e){var i;this.events[t]=(i=this.events[t])==null?void 0:i.filter(s=>e!==s)}destroy(){this.events={}}},x=100/6,g={passive:!1},F=class{constructor(t,e={wheelMultiplier:1,touchMultiplier:1}){o(this,"touchStart",{x:0,y:0});o(this,"lastDelta",{x:0,y:0});o(this,"window",{width:0,height:0});o(this,"emitter",new _);o(this,"onTouchStart",t=>{const{clientX:e,clientY:i}=t.targetTouches?t.targetTouches[0]:t;this.touchStart.x=e,this.touchStart.y=i,this.lastDelta={x:0,y:0},this.emitter.emit("scroll",{deltaX:0,deltaY:0,event:t})});o(this,"onTouchMove",t=>{const{clientX:e,clientY:i}=t.targetTouches?t.targetTouches[0]:t,s=-(e-this.touchStart.x)*this.options.touchMultiplier,n=-(i-this.touchStart.y)*this.options.touchMultiplier;this.touchStart.x=e,this.touchStart.y=i,this.lastDelta={x:s,y:n},this.emitter.emit("scroll",{deltaX:s,deltaY:n,event:t})});o(this,"onTouchEnd",t=>{this.emitter.emit("scroll",{deltaX:this.lastDelta.x,deltaY:this.lastDelta.y,event:t})});o(this,"onWheel",t=>{let{deltaX:e,deltaY:i,deltaMode:s}=t;const n=s===1?x:s===2?this.window.width:1,r=s===1?x:s===2?this.window.height:1;e*=n,i*=r,e*=this.options.wheelMultiplier,i*=this.options.wheelMultiplier,this.emitter.emit("scroll",{deltaX:e,deltaY:i,event:t})});o(this,"onWindowResize",()=>{this.window={width:window.innerWidth,height:window.innerHeight}});this.element=t,this.options=e,window.addEventListener("resize",this.onWindowResize,!1),this.onWindowResize(),this.element.addEventListener("wheel",this.onWheel,g),this.element.addEventListener("touchstart",this.onTouchStart,g),this.element.addEventListener("touchmove",this.onTouchMove,g),this.element.addEventListener("touchend",this.onTouchEnd,g)}on(t,e){return this.emitter.on(t,e)}destroy(){this.emitter.destroy(),window.removeEventListener("resize",this.onWindowResize,!1),this.element.removeEventListener("wheel",this.onWheel,g),this.element.removeEventListener("touchstart",this.onTouchStart,g),this.element.removeEventListener("touchmove",this.onTouchMove,g),this.element.removeEventListener("touchend",this.onTouchEnd,g)}},q=class{constructor({wrapper:t=window,content:e=document.documentElement,eventsTarget:i=t,smoothWheel:s=!0,syncTouch:n=!1,syncTouchLerp:r=.075,touchInertiaMultiplier:f=35,duration:a,easing:c=j=>Math.min(1,1.001-Math.pow(2,-10*j)),lerp:p=.1,infinite:m=!1,orientation:S="vertical",gestureOrientation:u="vertical",touchMultiplier:h=1,wheelMultiplier:w=1,autoResize:y=!0,prevent:d,virtualScroll:E,overscroll:N=!0,autoRaf:T=!1,__experimental__naiveDimensions:R=!1}={}){o(this,"_isScrolling",!1);o(this,"_isStopped",!1);o(this,"_isLocked",!1);o(this,"_preventNextNativeScrollEvent",!1);o(this,"_resetVelocityTimeout",null);o(this,"__rafID",null);o(this,"isTouching");o(this,"time",0);o(this,"userData",{});o(this,"lastVelocity",0);o(this,"velocity",0);o(this,"direction",0);o(this,"options");o(this,"targetScroll");o(this,"animatedScroll");o(this,"animate",new U);o(this,"emitter",new _);o(this,"dimensions");o(this,"virtualScroll");o(this,"onPointerDown",t=>{t.button===1&&this.reset()});o(this,"onVirtualScroll",t=>{if(typeof this.options.virtualScroll=="function"&&this.options.virtualScroll(t)===!1)return;const{deltaX:e,deltaY:i,event:s}=t;if(this.emitter.emit("virtual-scroll",{deltaX:e,deltaY:i,event:s}),s.ctrlKey||s.lenisStopPropagation)return;const n=s.type.includes("touch"),r=s.type.includes("wheel");if(this.isTouching=s.type==="touchstart"||s.type==="touchmove",this.options.syncTouch&&n&&s.type==="touchstart"&&!this.isStopped&&!this.isLocked){this.reset();return}const a=e===0&&i===0,c=this.options.gestureOrientation==="vertical"&&i===0||this.options.gestureOrientation==="horizontal"&&e===0;if(a||c)return;let p=s.composedPath();p=p.slice(0,p.indexOf(this.rootElement));const m=this.options.prevent;if(p.find(d=>{var E,N,T;return d instanceof HTMLElement&&(typeof m=="function"&&(m==null?void 0:m(d))||((E=d.hasAttribute)==null?void 0:E.call(d,"data-lenis-prevent"))||n&&((N=d.hasAttribute)==null?void 0:N.call(d,"data-lenis-prevent-touch"))||r&&((T=d.hasAttribute)==null?void 0:T.call(d,"data-lenis-prevent-wheel")))}))return;if(this.isStopped||this.isLocked){s.preventDefault();return}if(!(this.options.syncTouch&&n||this.options.smoothWheel&&r)){this.isScrolling="native",this.animate.stop(),s.lenisStopPropagation=!0;return}let u=i;this.options.gestureOrientation==="both"?u=Math.abs(i)>Math.abs(e)?i:e:this.options.gestureOrientation==="horizontal"&&(u=e),(!this.options.overscroll||this.options.infinite||this.options.wrapper!==window&&(this.animatedScroll>0&&this.animatedScroll<this.limit||this.animatedScroll===0&&i>0||this.animatedScroll===this.limit&&i<0))&&(s.lenisStopPropagation=!0),s.preventDefault();const h=n&&this.options.syncTouch,y=n&&s.type==="touchend"&&Math.abs(u)>5;y&&(u=this.velocity*this.options.touchInertiaMultiplier),this.scrollTo(this.targetScroll+u,{programmatic:!1,...h?{lerp:y?this.options.syncTouchLerp:1}:{lerp:this.options.lerp,duration:this.options.duration,easing:this.options.easing}})});o(this,"onNativeScroll",()=>{if(this._resetVelocityTimeout!==null&&(clearTimeout(this._resetVelocityTimeout),this._resetVelocityTimeout=null),this._preventNextNativeScrollEvent){this._preventNextNativeScrollEvent=!1;return}if(this.isScrolling===!1||this.isScrolling==="native"){const t=this.animatedScroll;this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity,this.velocity=this.animatedScroll-t,this.direction=Math.sign(this.animatedScroll-t),this.isScrolling="native",this.emit(),this.velocity!==0&&(this._resetVelocityTimeout=setTimeout(()=>{this.lastVelocity=this.velocity,this.velocity=0,this.isScrolling=!1,this.emit()},400))}});o(this,"raf",t=>{const e=t-(this.time||t);this.time=t,this.animate.advance(e*.001),this.options.autoRaf&&(this.__rafID=requestAnimationFrame(this.raf))});window.lenisVersion=V,(!t||t===document.documentElement||t===document.body)&&(t=window),this.options={wrapper:t,content:e,eventsTarget:i,smoothWheel:s,syncTouch:n,syncTouchLerp:r,touchInertiaMultiplier:f,duration:a,easing:c,lerp:p,infinite:m,gestureOrientation:u,orientation:S,touchMultiplier:h,wheelMultiplier:w,autoResize:y,prevent:d,virtualScroll:E,overscroll:N,autoRaf:T,__experimental__naiveDimensions:R},this.dimensions=new Y(t,e,{autoResize:y}),this.updateClassName(),this.targetScroll=this.animatedScroll=this.actualScroll,this.options.wrapper.addEventListener("scroll",this.onNativeScroll,!1),this.options.wrapper.addEventListener("pointerdown",this.onPointerDown,!1),this.virtualScroll=new F(i,{touchMultiplier:h,wheelMultiplier:w}),this.virtualScroll.on("scroll",this.onVirtualScroll),this.options.autoRaf&&(this.__rafID=requestAnimationFrame(this.raf))}destroy(){this.emitter.destroy(),this.options.wrapper.removeEventListener("scroll",this.onNativeScroll,!1),this.options.wrapper.removeEventListener("pointerdown",this.onPointerDown,!1),this.virtualScroll.destroy(),this.dimensions.destroy(),this.cleanUpClassName(),this.__rafID&&cancelAnimationFrame(this.__rafID)}on(t,e){return this.emitter.on(t,e)}off(t,e){return this.emitter.off(t,e)}setScroll(t){this.isHorizontal?this.rootElement.scrollLeft=t:this.rootElement.scrollTop=t}resize(){this.dimensions.resize(),this.animatedScroll=this.targetScroll=this.actualScroll,this.emit()}emit(){this.emitter.emit("scroll",this)}reset(){this.isLocked=!1,this.isScrolling=!1,this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity=0,this.animate.stop()}start(){this.isStopped&&(this.isStopped=!1,this.reset())}stop(){this.isStopped||(this.isStopped=!0,this.animate.stop(),this.reset())}scrollTo(t,{offset:e=0,immediate:i=!1,lock:s=!1,duration:n=this.options.duration,easing:r=this.options.easing,lerp:f=this.options.lerp,onStart:a,onComplete:c,force:p=!1,programmatic:m=!0,userData:S}={}){if(!((this.isStopped||this.isLocked)&&!p)){if(typeof t=="string"&&["top","left","start"].includes(t))t=0;else if(typeof t=="string"&&["bottom","right","end"].includes(t))t=this.limit;else{let u;if(typeof t=="string"?u=document.querySelector(t):t instanceof HTMLElement&&(t!=null&&t.nodeType)&&(u=t),u){if(this.options.wrapper!==window){const w=this.rootElement.getBoundingClientRect();e-=this.isHorizontal?w.left:w.top}const h=u.getBoundingClientRect();t=(this.isHorizontal?h.left:h.top)+this.animatedScroll}}if(typeof t=="number"){if(t+=e,t=Math.round(t),this.options.infinite?m&&(this.targetScroll=this.animatedScroll=this.scroll):t=z(0,t,this.limit),t===this.targetScroll){a==null||a(this),c==null||c(this);return}if(this.userData=S??{},i){this.animatedScroll=this.targetScroll=t,this.setScroll(this.scroll),this.reset(),this.preventNextNativeScrollEvent(),this.emit(),c==null||c(this),this.userData={};return}m||(this.targetScroll=t),this.animate.fromTo(this.animatedScroll,t,{duration:n,easing:r,lerp:f,onStart:()=>{s&&(this.isLocked=!0),this.isScrolling="smooth",a==null||a(this)},onUpdate:(u,h)=>{this.isScrolling="smooth",this.lastVelocity=this.velocity,this.velocity=u-this.animatedScroll,this.direction=Math.sign(this.velocity),this.animatedScroll=u,this.setScroll(this.scroll),m&&(this.targetScroll=u),h||this.emit(),h&&(this.reset(),this.emit(),c==null||c(this),this.userData={},this.preventNextNativeScrollEvent())}})}}}preventNextNativeScrollEvent(){this._preventNextNativeScrollEvent=!0,requestAnimationFrame(()=>{this._preventNextNativeScrollEvent=!1})}get rootElement(){return this.options.wrapper===window?document.documentElement:this.options.wrapper}get limit(){return this.options.__experimental__naiveDimensions?this.isHorizontal?this.rootElement.scrollWidth-this.rootElement.clientWidth:this.rootElement.scrollHeight-this.rootElement.clientHeight:this.dimensions.limit[this.isHorizontal?"x":"y"]}get isHorizontal(){return this.options.orientation==="horizontal"}get actualScroll(){return this.isHorizontal?this.rootElement.scrollLeft:this.rootElement.scrollTop}get scroll(){return this.options.infinite?C(this.animatedScroll,this.limit):this.animatedScroll}get progress(){return this.limit===0?1:this.scroll/this.limit}get isScrolling(){return this._isScrolling}set isScrolling(t){this._isScrolling!==t&&(this._isScrolling=t,this.updateClassName())}get isStopped(){return this._isStopped}set isStopped(t){this._isStopped!==t&&(this._isStopped=t,this.updateClassName())}get isLocked(){return this._isLocked}set isLocked(t){this._isLocked!==t&&(this._isLocked=t,this.updateClassName())}get isSmooth(){return this.isScrolling==="smooth"}get className(){let t="lenis";return this.isStopped&&(t+=" lenis-stopped"),this.isLocked&&(t+=" lenis-locked"),this.isScrolling&&(t+=" lenis-scrolling"),this.isScrolling==="smooth"&&(t+=" lenis-smooth"),t}updateClassName(){this.cleanUpClassName(),this.rootElement.className=`${this.rootElement.className} ${this.className}`.trim()}cleanUpClassName(){this.rootElement.className=this.rootElement.className.replace(/lenis(-\w+)?/g,"").trim()}};const $=typeof window<"u"?v.useLayoutEffect:v.useEffect;function B(){$(()=>{const t=new q({easing:e,duration:2});function e(s){return 1-(1-s)*(1-s)}t.on("scroll",s=>{});function i(s){t.raf(s),requestAnimationFrame(i)}requestAnimationFrame(i)},[])}function k(){const[t,e]=v.useState(null),[i,s]=v.useState(null),n=new b;return v.useEffect(()=>{const r=()=>{const a=n.get("shopify-bliss")||null,c=a?O(a):null;e(a),s(c)};r();const f=setInterval(r,1e3);return()=>clearInterval(f)},[]),{token:t,decoded:i}}function G(){const{menu:t,accessMenu:e}=L(),{decoded:i}=k();return l.jsx("div",{className:"layout-dashboard-sidebar",children:t.map(s=>e.filter(r=>r.role===(i==null?void 0:i.role)&&r.accessMenu===s.id).map(r=>l.jsxs(W,{to:`/${s.url}`,className:"sidebar-list",children:[l.jsx("div",{className:"sidebar-list-item",children:s.name}),l.jsx("div",{className:"border-effect"})]},r.id)))})}const K="/assets/pexels-alancabello-1291515-DHvgex6l.jpg";function Q(){const[t,e]=v.useState(!1),i=v.useRef(null),{submenu:s,activeMenu:n,handleSubmenuPage:r,submenuPage:f,toastDevelop:a}=L(),{token:c,decoded:p}=k(),m=H(),S=v.useCallback(h=>{i.current&&!i.current.contains(h.target)&&e(!1)},[i]);v.useEffect(()=>(t?document.addEventListener("mousedown",S):document.removeEventListener("mousedown",S),()=>{document.removeEventListener("mousedown",S)}),[t]);const u=v.useCallback(()=>{c&&(new b().remove("shopify-bliss"),m("/login",{state:{messageLogout:"Logout successfully!"}}))},[c]);return l.jsxs("div",{className:"layout-dashboard-topbar",children:[l.jsx(I,{}),l.jsx("div",{className:"links",children:s.filter(h=>h.menu_id===n).map(h=>l.jsx("div",{className:`links-item ${h.name===f?"active":""}`,onClick:()=>r(h.name),children:h.name},h.id))}),l.jsxs("div",{className:"config",children:[l.jsx("div",{className:"config-help",onClick:()=>{a("help")},children:"Help"}),l.jsxs("div",{className:"config-account",onClick:()=>e(!0),children:[l.jsx("div",{className:"text",children:"Account Setting"}),l.jsx("img",{src:K,alt:"Profile image's"})]}),t?l.jsxs("div",{className:"account-modal",ref:i,children:[l.jsxs("div",{className:"account-modal-profile",children:[l.jsx("div",{className:"username",children:p.username}),l.jsx("div",{className:"email",children:p.email})]}),l.jsx("div",{className:"account-modal-item",onClick:()=>{a("notifications")},children:"Notifications"}),l.jsx("div",{className:"account-modal-item",onClick:()=>{a("language")},children:"Language"}),l.jsx("div",{className:"account-modal-item",onClick:u,children:"Logout"})]}):""]})]})}function it({children:t}){return l.jsxs(l.Fragment,{children:[l.jsx(B,{}),l.jsxs("div",{className:"layout-dashboard",children:[l.jsx(G,{}),l.jsx(Q,{}),l.jsx("div",{className:"layout-dashboard-content",children:t})]})]})}export{it as L,k as u};
