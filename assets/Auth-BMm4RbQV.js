import{a as g,r as l,u as U,b as D,c as H,t as m,d as C,e as j,f as E,j as o,g as V,L as z,Q as G}from"./index-CDJ0jnDt.js";import{l as Q}from"./black-logo-KPU1N9jl.js";import{s as Z}from"./ValidationSchema-fCLfNoAd.js";import{A as _,a as q,b as B,c as J}from"./AuthSupport-CWB7ohp4.js";function Y({typeMain:c}){g.defaults.withCredentials=!0;const[n,p]=l.useState({email:"",username:"",phoneNumber:"",password:""}),[N,L]=l.useState([]),[P,$]=l.useState(!0),[y,h]=l.useState({length:!1,uppercase:!1,lowercase:!1,number:!1,special:!1}),[w,F]=l.useState(62),S=l.useRef(null),v=l.useRef(null),u=U(),s=D(),[d]=H();l.useEffect(()=>{const r=d.get("message"),t=d.get("shopify-bliss"),e=d.get("role"),a=new URLSearchParams(window.location.search);if(r){m("success",r,{position:"top-center"}),a.delete("message");const i=a.toString()?`${window.location.pathname}?${a.toString()}`:window.location.pathname;window.history.replaceState({},document.title,i)}else if(t&&e){C.set("shopify-bliss",t,{path:"/",secure:!0,sameSite:"Strict"}),a.delete("shopify-bliss"),a.delete("role");const i=a.toString()?`${window.location.pathname}?${a.toString()}`:window.location.pathname;window.history.replaceState({},document.title,i),u("/dashboard",{state:{messageLoginGoogle:"Login successfully!"}})}},[d,u]),l.useEffect(()=>{g.get("https://restcountries.com/v3.1/all").then(r=>{const a=r.data.filter(i=>i.idd&&i.idd.root).map(i=>{const f=i.flags.png,R=i.name.common,x=i.idd.root.replace("+",""),b=i.idd.suffixes,T=`+${x}${b[0]}`,I=parseInt(`${x}${b[0]}`);return{flag:f,name:R,codes:T,valueCodes:I}}).sort((i,f)=>i.name.localeCompare(f.name));L(a)}).catch(r=>{console.error(r)})},[]);const A=l.useCallback(r=>{const{name:t,value:e}=r.target;p(a=>({...a,[t]:e})),t==="password"&&h({length:e.length>=8,uppercase:/[A-Z]/.test(e),lowercase:/[a-z]/.test(e),number:/[0-9]/.test(e),special:/[@$!%*?&#^()_\-+=]/.test(e)})},[p,h]),k=l.useCallback(r=>{if(r.preventDefault(),c==="signup")Z.validate({email:n.email,username:n.username,phoneNumber:n.phoneNumber,password:n.password},{abortEarly:!1}).then(()=>{const t=g.post(j.signupForm,{email:n.email,username:n.username,phoneNumber:w+n.phoneNumber,password:n.password});E(t,{pending:"Signup in progress, please wait..",success:"Signup successful! 🎉",error:"Failed to signup, please try again!"},{autoClose:3500,position:"top-center"},()=>{S.current===!0&&u("/verify-email",{state:{email:n.email}})}),t.then(e=>{S.current=e.data.success,p(""),h({length:!1,uppercase:!1,lowercase:!1,number:!1,special:!1})}).catch(e=>{console.error(e),m("error",e,{position:"top-center"})})}).catch(t=>{t.inner.forEach(e=>{m("error",e.message,{position:"top-center",autoClose:3500})})});else{const t=g.post(j.loginForm,{email:n.email,password:n.password});E(t,{pending:"Login in progress, please wait.",success:"Login successful! 🎉",error:"Failed to login, please try again!"},{position:"top-center"},()=>{v.current===200&&u("/dashboard")}),t.then(e=>{const a=e.data.token;v.current=e.status,C.set("shopify-bliss",a,{path:"/",secure:!0,sameSite:"Strict"}),p("")}).catch(e=>{console.error(e)})}},[n,c]);return l.useEffect(()=>{var r,t,e,a;(r=s.state)!=null&&r.messageLogout?(m("success",s.state.messageLogout),u(s.pathname,{state:{...s.state,messageLogout:void 0},replace:!0})):(t=s.state)!=null&&t.messageNoEmail?(m("warn",s.state.messageNoEmail,{position:"top-center",autoClose:3500}),u(s.pathname,{state:{...s.state,messageNoEmail:void 0},replace:!0})):(e=s.state)!=null&&e.messageTimeout?(m("info",s.state.messageTimeout,{position:"top-center",autoClose:3500}),u(s.pathname,{state:{...s.state,messageTimeout:void 0},replace:!0})):(a=s.state)!=null&&a.messageSessionExpired&&(m("info",s.state.messageSessionExpired,{position:"top-center",autoClose:3500}),u(s.pathname,{state:{...s.state,messageSessionExpired:void 0},replace:!0}))},[s.state,u,s.pathname]),o.jsxs(o.Fragment,{children:[o.jsxs("div",{className:"auth",children:[o.jsx("div",{className:"auth-header",children:o.jsx(_,{type:c})}),o.jsxs("div",{className:"auth-content",children:[o.jsx(q,{logo:Q,type:c}),o.jsxs("div",{className:`auth-content-core ${c==="signup"?"signup":""}`,children:[o.jsx(B,{values:n,hidePassword:P,setHidePassword:$,validationPassword:y,handleChange:A,handleForm:k,type:c,phoneCodes:N,selectedCode:w,setSelectedCode:F}),c==="login"&&o.jsxs(o.Fragment,{children:[o.jsx("div",{className:"divider"}),o.jsx(J,{type:c,toastDevelop:V})]})]}),c==="login"?o.jsx(z,{to:"/recovery",className:"auth-content-problems",children:"Can't Log In"}):""]})]}),o.jsx(G,{})]})}export{Y as default};
