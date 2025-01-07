import{a as p,r,u as b,b as g,e as h,f as y,t as N,j as e,Q as C}from"./index-DnCa19Bm.js";import{l as S}from"./black-logo-KPU1N9jl.js";import{r as w}from"./ValidationSchema-BfBBoEw0.js";import{A as R,a as F}from"./AuthSupport-CIzovNv6.js";function O({typeMain:o}){p.defaults.withCredentials=!0;const[a,l]=r.useState({email:"",oldPassword:"",newPassword:""}),[i,f]=r.useState(!0),[n,v]=r.useState(!0),[E,u]=r.useState({length:!1,uppercase:!1,lowercase:!1,number:!1,special:!1}),m=r.useRef(null);r.useRef(null),r.useRef(null);const x=b();g();const d=r.useCallback(c=>{const{name:t,value:s}=c.target;l(P=>({...P,[t]:s})),t==="newPassword"&&u({length:s.length>=8,uppercase:/[A-Z]/.test(s),lowercase:/[a-z]/.test(s),number:/[0-9]/.test(s),special:/[@$!%*?&#^()_\-+=]/.test(s)})},[l,u]),j=r.useCallback(c=>{c.preventDefault(),o==="recovery"&&w.validate({email:a.email},{abortEarly:!1}).then(()=>{const t=p.post(h.sendOtpPassword,{email:a.email});y(t,{pending:"Recovery in progress, please wait..",success:"Recovery successful! 🎉",error:"Failed to recovery, please try again!"},{autoClose:3500,position:"top-center"},()=>{m.current===!0&&x("/verify-password",{state:{email:a.email}})}),t.then(s=>{m.current=s.data.success,l("")}).catch(s=>{console.error(s)})}).catch(t=>{t.inner.forEach(s=>{N("error",s.message,{position:"top-center",autoClose:3500})})})},[w,h.sendOtpPassword,a,o]);return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"auth",children:[e.jsx("div",{className:"auth-header",children:e.jsx(R,{type:o})}),e.jsxs("div",{className:"auth-content",children:[e.jsx(F,{logo:S,type:o}),e.jsx("div",{className:"auth-content-core recovery",children:e.jsxs("form",{className:"form",onSubmit:j,children:[o==="recovery"?e.jsxs("div",{className:"form-group",children:[e.jsx("label",{htmlFor:"email",children:"Email Address"}),e.jsx("input",{className:"form-group-input",type:"text",id:"email",name:"email",autoComplete:"email",placeholder:"example@gmail.com",onChange:d,value:a.email||""}),e.jsx("div",{className:"input-border"})]}):e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"form-group",children:[e.jsx("label",{htmlFor:"oldPassword",children:"Current Password"}),e.jsx("input",{className:"form-group-input",type:i?"password":"text",id:"oldPassword",name:"oldPassword",autoComplete:"current-password",placeholder:"oldPassword",onChange:d,value:a.oldPassword||""}),e.jsx("span",{className:"material-symbols-outlined",onClick:()=>f(!i),children:i?"visibility_off":"visibility"}),e.jsx("div",{className:"input-border"})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{htmlFor:"newPassword",children:"Set Password"}),e.jsx("input",{className:"form-group-input",type:n?"password":"text",id:"newPassword",name:"newPassword",autoComplete:"current-password",placeholder:"newPassword",onChange:d,value:a.newPassword||""}),e.jsx("span",{className:"material-symbols-outlined",onClick:()=>v(!n),children:n?"visibility_off":"visibility"}),e.jsx("div",{className:"input-border"})]})]}),e.jsx("button",{type:"submit",className:"form-submit",disabled:o==="recovery"?!a.email:!a.oldPassword||!a.newPassword,children:"Submit"})]})})]})]}),e.jsx(C,{})]})}export{O as default};