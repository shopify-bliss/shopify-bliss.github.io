import{j as e,L as k,r,u as K,a as P,b as y,C as O,c as T,d as Y,e as q,t as p,f as R,g as J,h as I,Q}from"./index-Cj64leMr.js";import{l as Z}from"./black-logo-KPU1N9jl.js";import{s as X}from"./ValidationSchema-vCEiEGay.js";const M="/assets/google-CPEPVHln.png",ee="/assets/facebook-Cq3j-Ek1.png",se="/assets/whatsapp%20(1)-UD0SVKSJ.png";function ae({type:o}){return e.jsxs(e.Fragment,{children:[e.jsxs(k,{to:"/",className:"auth-header-back",children:[e.jsx("span",{className:"material-symbols-outlined",children:"chevron_backward"}),e.jsx("div",{className:"text",children:"Back"})]}),o==="signup"?e.jsx(k,{className:"auth-header-link",to:"/login",children:"Log in"}):o==="login"?e.jsx(k,{className:"auth-header-link",to:"/signup",children:"Create Account"}):e.jsx(k,{className:"auth-header-link",to:"/login",children:"Verify Code"})]})}function te({logo:o,type:m}){return e.jsxs("div",{className:`auth-content-title ${m==="verify"?"verify":""}`,children:[e.jsx("img",{className:"logo",src:o,alt:"Shopify Bliss Logo"}),m==="signup"?e.jsx("div",{className:"text",children:"Create Your Account"}):m==="login"?e.jsxs("div",{className:"text",children:["Log into ",e.jsx("span",{children:"shopify bliss"})]}):e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"text verify",children:"Check Your Email !"}),e.jsx("div",{className:"desc",children:"Please check your email inbox for a 6-digit verification code we have sent to your registered email address. Enter the code in the field below to confirm your email and complete the verification process."})]})]})}function oe({handleForm:o,handleChange:m,values:n,hidePassword:g,setHidePassword:F,validationPassword:f,type:x,phoneCodes:S,selectedCode:$,setSelectedCode:v}){const[j,b]=r.useState(!1),u=r.useRef(null),{search:E,setSearch:w}=K(),N=r.useCallback(a=>{u&&!u.current.contains(a.target)&&b(!1)},[u]);r.useEffect(()=>(j?document.addEventListener("mousedown",N):document.removeEventListener("mousedown",N),()=>{document.removeEventListener("mousedown",N)}),[j]);const L=r.useCallback(a=>{v(a),b(!1)},[]),d=r.useCallback(a=>{w(a.target.value)},[]);return e.jsxs("form",{className:"form",onSubmit:o,children:[e.jsxs("div",{className:"form-group",children:[e.jsx("label",{htmlFor:"email",children:"Email Address"}),e.jsx("input",{className:"form-group-input",type:"text",id:"email",name:"email",autoComplete:"email",placeholder:"example@gmail.com",onChange:m,value:n.email||""}),e.jsx("div",{className:"input-border"})]}),x==="signup"&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"form-group",children:[e.jsx("label",{htmlFor:"username",children:"Username"}),e.jsx("input",{className:"form-group-input",type:"text",id:"username",name:"username",autoComplete:"name",placeholder:"example is me",onChange:m,value:n.username||""}),e.jsx("div",{className:"input-border"})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{htmlFor:"phoneNumber",children:"Phone Number"}),e.jsxs("div",{className:"phone-wrapper-loan",children:[e.jsxs("div",{className:"phone-code",children:[e.jsx("div",{className:"phone-code-default",onClick:()=>b(!0),children:S.filter(a=>a.valueCodes===$).map((a,h)=>{const C=a.flag;return e.jsxs(r.Fragment,{children:[e.jsx("div",{className:"image",children:e.jsx("img",{src:C,alt:a.name})}),e.jsx("div",{className:"code",children:a.codes}),e.jsx("span",{className:"material-symbols-rounded",children:"arrow_drop_down"})]},h)})}),j?e.jsx(e.Fragment,{children:e.jsxs("div",{className:"phone-code-list",ref:u,children:[e.jsx("div",{className:"phone-code-list-search",children:e.jsxs("div",{className:"search-country",children:[e.jsx("span",{className:"material-symbols-rounded",children:"search"}),e.jsx("input",{className:"search-country-input",type:"text",onChange:d,placeholder:"Search country"})]})}),S.filter(a=>{const h=E.toLowerCase();return a.name.toLowerCase().includes(h)||a.codes.includes(h)}).map((a,h)=>{const C=a.flag;return e.jsxs("div",{className:"phone-code-list-item",onClick:()=>L(a.valueCodes),children:[e.jsx("div",{className:"image",children:e.jsx("img",{src:C,alt:a.name})}),e.jsxs("div",{className:"desc",children:[e.jsx("div",{className:"desc-name",children:a.name}),e.jsxs("div",{className:"desc-code",children:["(",a.codes,")"]})]})]},h)})]})}):""]}),e.jsx("input",{className:"form-group-input",type:"number",id:"phoneNumber",name:"phoneNumber",autoComplete:"tel",placeholder:"81234567890",onChange:m,value:n.phoneNumber||""})]}),e.jsx("div",{className:"input-border"})]})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{htmlFor:"password",children:"Password"}),e.jsx("input",{className:"form-group-input",type:g?"password":"text",id:"password",name:"password",autoComplete:"current-password",placeholder:"password",onChange:m,value:n.password||""}),e.jsx("span",{className:"material-symbols-outlined",onClick:()=>F(!g),children:g?"visibility_off":"visibility"}),e.jsx("div",{className:"input-border"})]}),x==="signup"&&e.jsxs("div",{className:"validation-password",children:[e.jsxs("div",{className:`item ${f.length?"done":""}`,children:[e.jsx("span",{className:"material-symbols-rounded",children:"check_circle"}),e.jsx("div",{className:"item-text",children:"Password should be 8 chars minimum."})]}),e.jsxs("div",{className:`item ${f.lowercase?"done":""}`,children:[e.jsx("span",{className:"material-symbols-rounded",children:"check_circle"}),e.jsx("div",{className:"item-text",children:"Password must contain at least one lowercase letter."})]}),e.jsxs("div",{className:`item ${f.uppercase?"done":""}`,children:[e.jsx("span",{className:"material-symbols-rounded",children:"check_circle"}),e.jsx("div",{className:"item-text",children:"Password must contain at least one uppercase letter."})]}),e.jsxs("div",{className:`item ${f.number?"done":""}`,children:[e.jsx("span",{className:"material-symbols-rounded",children:"check_circle"}),e.jsx("div",{className:"item-text",children:"Password must contain at least one number."})]}),e.jsxs("div",{className:`item ${f.special?"done":""}`,children:[e.jsx("span",{className:"material-symbols-rounded",children:"check_circle"}),e.jsx("div",{className:"item-text",children:"Password must contain at least one special character."})]})]}),e.jsx("button",{type:"submit",className:"form-submit",disabled:x==="signup"?!n.email||!n.password||!n.username:!n.email||!n.password,children:x==="signup"?"Sign up":"Log in"})]})}function ne({toastDevelop:o}){return e.jsxs("div",{className:"integration",children:[e.jsxs("button",{className:"integration-item",onClick:()=>{o("continue with WhatsApp")},children:[e.jsx("img",{className:"icon",src:se,alt:"WhatsApp's Logo"}),e.jsx("span",{className:"text",children:"Continue with WhatsApp"})]}),e.jsxs(k,{className:"integration-item",to:P.loginGoogle,children:[e.jsx("img",{className:"icon",src:M,alt:"Google's Logo"}),e.jsx("span",{className:"text",children:"Continue with Google"})]}),e.jsxs("button",{className:"integration-item",onClick:()=>{o("continue with Facebook")},children:[e.jsx("img",{className:"icon",src:ee,alt:"Facebook's Logo"}),e.jsx("span",{className:"text",children:"Continue with Facebook"})]})]})}function ce({typeMain:o}){y.defaults.withCredentials=!0;const m=new O(null,{path:"/"}),[n,g]=r.useState({email:"",username:"",phoneNumber:"",password:""}),[F,f]=r.useState([]),[x,S]=r.useState(!0),[$,v]=r.useState({length:!1,uppercase:!1,lowercase:!1,number:!1,special:!1}),[j,b]=r.useState(62),[u,E]=r.useState(new Array(6).fill("")),w=r.useRef(null),N=r.useRef(null),L=r.useRef(null),d=T(),a=Y(),[h]=q();r.useEffect(()=>{const l=h.get("message"),t=h.get("shopify-bliss"),s=h.get("role"),i=new URLSearchParams(window.location.search);if(l){p("success",l,{position:"top-center"}),i.delete("message");const c=i.toString()?`${window.location.pathname}?${i.toString()}`:window.location.pathname;window.history.replaceState({},document.title,c)}else if(t&&s){m.set("shopify-bliss",t),i.delete("shopify-bliss"),i.delete("role");const c=i.toString()?`${window.location.pathname}?${i.toString()}`:window.location.pathname;window.history.replaceState({},document.title,c),s==="admin"?d("/dashboard",{state:{messageLoginGoogle:"Login successfully!"}}):s==="customer"&&d("/profile",{state:{messageLoginGoogle:"Login successfully!"}})}},[m,d]),r.useEffect(()=>{y.get("https://restcountries.com/v3.1/all").then(l=>{const i=l.data.filter(c=>c.idd&&c.idd.root).map(c=>{const A=c.flags.png,H=c.name.common,_=c.idd.root.replace("+",""),D=c.idd.suffixes,W=`+${_}${D[0]}`,z=parseInt(`${_}${D[0]}`);return{flag:A,name:H,codes:W,valueCodes:z}}).sort((c,A)=>c.name.localeCompare(A.name));f(i)}).catch(l=>{console.error(l)})},[]);const C=r.useCallback(l=>{const{name:t,value:s}=l.target;g(i=>({...i,[t]:s})),t==="password"&&v({length:s.length>=8,uppercase:/[A-Z]/.test(s),lowercase:/[a-z]/.test(s),number:/[0-9]/.test(s),special:/[@$!%*?&#^()_\-+=]/.test(s)})},[g,v]),B=r.useCallback((l,t)=>{const s=l.target.value.replace(/[^0-9]/g,"");if(s.length<=1){const i=[...u];i[t]=s,E(i),s&&t<5&&document.getElementById(`code-input-${t+1}`).focus()}},[u]),G=l=>{l.preventDefault();const t=l.clipboardData.getData("text").trim();if(/^\d{6}$/.test(t)){const s=t.split("");E(s),document.getElementById("code-input-5").focus()}else p("error","Invalid code format. Please paste 6 digits.")},V=r.useCallback(l=>{if(l.preventDefault(),o==="signup")X.validate({email:n.email,username:n.username,phoneNumber:n.phoneNumber,password:n.password},{abortEarly:!1}).then(()=>{const t=y.post(P.signupForm,{email:n.email,username:n.username,phoneNumber:j+n.phoneNumber,password:n.password});R(t,{pending:"Signup in progress, please wait..",success:"Signup successful! 🎉",error:"Failed to signup, please try again!"},{autoClose:3500,position:"top-center"},()=>{N.current===!0&&d("/verify-code",{state:{email:n.email}})}),t.then(s=>{N.current=s.data.success,g(""),v({length:!1,uppercase:!1,lowercase:!1,number:!1,special:!1})}).catch(s=>{console.error(s),p("error",s,{position:"top-center"})})}).catch(t=>{t.inner.forEach(s=>{p("error",s.message,{position:"top-center",autoClose:3500})})});else if(o==="login"){const t=y.post(P.loginForm,{email:n.email,password:n.password});R(t,{pending:"Login in progress, please wait.",success:"Login successful! 🎉",error:"Failed to login, please try again!"},{position:"top-center"},()=>{w.current==="admin"?d("/dashboard"):w.current==="customer"&&d("/profile")}),t.then(s=>{const i=s.data.token;m.set("shopify-bliss",i);const c=J(i);c.role==="admin"||c.role==="customer"?w.current=c.role:p("error","Access denied. Role not recognized."),g("")}).catch(s=>{console.error(s)})}else{const t=u.join("");if(t.length===6){const s=y.post(P.verifyEmail,{code:t,email:a.state.email});R(s,{pending:"Verification in progress, please wait..",success:"Email verified successfully! 🎉",error:"Failed to verify email, please try again!"},{position:"top-center"},()=>{L.current===!0&&d("/login")}),s.then(i=>{L.current=i.data.success}).catch(i=>{console.error(i)})}else p("error","Please enter all 6 digits.")}},[n,o,u]);r.useEffect(()=>{o==="verify"&&!a.state&&d("/login",{state:{messageNoEmail:"Email is missing. Please go back to the previous step (registration) and ensure your email is entered correctly!"}})},[o,d,a.state]),r.useEffect(()=>{var l,t;(l=a.state)!=null&&l.messageLogout?(p("success",a.state.messageLogout),d(a.pathname,{state:{...a.state,messageLogout:void 0},replace:!0})):(t=a.state)!=null&&t.messageNoEmail&&(p("warn",a.state.messageNoEmail,{position:"top-center",autoClose:5e3}),d(a.pathname,{state:{...a.state,messageNoEmail:void 0},replace:!0}))},[a.state,d,p,a.pathname]);const U=o==="verify"?"form":"div";return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"auth",children:[e.jsx("div",{className:"auth-header",children:e.jsx(ae,{type:o})}),e.jsxs("div",{className:"auth-content",children:[e.jsx(te,{logo:Z,type:o}),e.jsxs(U,{className:`auth-content-core ${o==="signup"?"signup":o==="verify"?"verify":""}`,onSubmit:o==="verify"?V:null,children:[o!=="verify"&&e.jsxs(e.Fragment,{children:[e.jsx(oe,{values:n,hidePassword:x,setHidePassword:S,validationPassword:$,handleChange:C,handleForm:V,type:o,phoneCodes:F,selectedCode:j,setSelectedCode:b}),o!=="signup"&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"divider"}),e.jsx(ne,{type:o,toastDevelop:I})]})]}),o==="verify"&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"verify-wrapper",children:u.map((l,t)=>e.jsx("input",{id:`code-input-${t}`,className:"code-number",type:"text",maxLength:"1",value:l,onChange:s=>B(s,t),onKeyDown:s=>{s.key==="Backspace"&&!u[t]&&t>0&&document.getElementById(`code-input-${t-1}`).focus()},onPaste:G},t))}),e.jsx("button",{className:"code-button",children:"Submit Code"})]})]}),o==="login"?e.jsx("span",{className:"auth-content-problems",onClick:()=>I("can't log in"),children:"Can't Log In"}):""]})]}),e.jsx(Q,{})]})}export{ce as default};
