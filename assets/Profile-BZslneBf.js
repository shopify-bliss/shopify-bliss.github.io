import{a as w,r,h as P,e as x,j as e}from"./index-mHmsr8ix.js";import{d as k}from"./AuthSupport-CF7Z4N7m.js";import{b as S,u as y}from"./ValidationSchema-HP-qBNNP.js";function _(){w.defaults.withCredentials=!0;const[u,o]=r.useState({oldPassword:"",newPassword:""}),[m,h]=r.useState(!0),[d,g]=r.useState(!0),[i,b]=r.useState({length:!1,uppercase:!1,lowercase:!1,number:!1,special:!1}),{toastPromise:v,toastMessage:f,token:t}=P(),s=r.useCallback(c=>{const{name:a,value:l}=c.target;a==="newPassword"&&b({length:l.length>=8,uppercase:/[A-Z]/.test(l),lowercase:/[a-z]/.test(l),number:/[0-9]/.test(l),special:/[@$!%*?&#^()_\-+=]/.test(l)}),o(p=>({...p,[a]:l}))},[b,o]),n=r.useCallback(c=>{c.preventDefault(),S.validate(u,{abortEarly:!1}).then(()=>{const a=w.put(x.updatePassword,u,{headers:{Authorization:`Bearer ${t}`}});v(a,{pending:"Reset password on progress, please wait..!",success:"Reset password has been successfully updated!",error:"Failed to reset password!"},{autoClose:2500,position:"top-center"}),a.then(l=>{console.log(l.data)}).catch(l=>{console.error("Error updating password:",l)})}).catch(a=>{a.inner.forEach(l=>{f("error",l.message)})})},[u,x.updatePassword,t,v,f]);return e.jsxs("form",{className:"core",onSubmit:n,children:[e.jsxs("div",{className:"core-input",children:[e.jsxs("div",{className:"core-input-group core-input-pw",children:[e.jsx("label",{htmlFor:"oldPassword",children:"Current Password"}),e.jsx("input",{type:`${m?"password":"text"}`,id:"oldPassword",name:"oldPassword",autoComplete:"off",onChange:s}),e.jsx("span",{className:"material-symbols-outlined",onClick:()=>h(!m),children:m?"visibility_off":"visibility"}),e.jsx("div",{className:"input-border"})]}),e.jsxs("div",{className:"core-input-group core-input-pw",children:[e.jsx("label",{htmlFor:"newPassword",children:"Set New Password"}),e.jsx("input",{type:`${d?"password":"text"}`,id:"newPassword",name:"newPassword",autoComplete:"off",onChange:s}),e.jsx("span",{className:"material-symbols-outlined",onClick:()=>g(!d),children:d?"visibility_off":"visibility"}),e.jsx("div",{className:"input-border"})]}),e.jsx(k,{validationPassword:i})]}),e.jsx("button",{className:"core-button",type:"submit",children:"Save"})]})}const A=[{image:"bear.png"},{image:"bee.png"},{image:"butterfly.png"},{image:"chicken.png"},{image:"elephant.png"},{image:"hedgehog.png"},{image:"hippo.png"},{image:"koala.png"},{image:"ladybug.png"},{image:"lion.png"},{image:"llama.png"},{image:"meerkat.png"},{image:"monkey.png"},{image:"panda.png"},{image:"parrot.png"},{image:"penguin.png"},{image:"polar-bear.png"},{image:"puffer-fish.png"},{image:"sea-lion.png"},{image:"sloth.png"},{image:"snake.png"},{image:"spider.png"},{image:"tiger.png"},{image:"turtle.png"},{image:"weasel.png"}];function D({onClose:u}){w.defaults.withCredentials=!0;const{user:o,toastPromise:m,toastMessage:h,token:d,fetchDashboardData:g}=P(),[i,b]=r.useState(o==null?void 0:o.avatar),[v,f]=r.useState(!1),[t,s]=r.useState({username:"",phoneNumber:""}),n=r.useRef(null),c=r.useCallback(p=>{n.current&&!n.current.contains(p.target)&&f(!1)},[n]);r.useEffect(()=>(v?document.addEventListener("mousedown",c):document.removeEventListener("mousedown",c),()=>{document.removeEventListener("mousedown",c)}),[v]),r.useEffect(()=>{o&&s({username:o.username,phoneNumber:o.phone_number})},[o]);const a=r.useCallback(p=>{const{name:j,value:N}=p.target;s({...t,[j]:N})},[t]),l=r.useCallback(p=>{p.preventDefault();const j={avatar:i,username:t.username,phoneNumber:t.phoneNumber};y.validate(j,{abortEarly:!1}).then(()=>{const N=w.put(x.userId,j,{headers:{Authorization:`Bearer ${d}`}});m(N,{pending:"Updating profile data on progress, please wait..!",success:"Data has been successfully updated!",error:"Failed to update data!"},{autoClose:3e3,position:"top-center"},()=>{u(),g()})}).catch(N=>{N.inner.forEach(C=>{h("error",C.message)})})},[y,i,t,x.userId,d,m,u,g,h]);return e.jsxs("form",{className:"core",onSubmit:l,children:[e.jsxs("div",{className:"core-avatar",children:[e.jsxs("div",{className:"core-avatar-selected",children:[e.jsx("img",{src:`/avatar/${i}`,alt:"Avatar's User"}),e.jsx("span",{onClick:()=>f(!0),children:"Select Avatar"})]}),v&&e.jsx("div",{className:"core-avatar-list",ref:n,children:A.map((p,j)=>e.jsx("img",{src:`/avatar/${p.image}`,alt:"Avatar List",onClick:()=>{b(p.image),f(!1)}},j))})]}),e.jsx("div",{className:"core-role"}),e.jsxs("div",{className:"core-input",children:[e.jsxs("div",{className:"core-input-group",children:[e.jsx("label",{htmlFor:"username",children:"Username"}),e.jsx("input",{type:"text",id:"username",name:"username",autoComplete:"off",value:t.username,onChange:a}),e.jsx("div",{className:"input-border"})]}),e.jsxs("div",{className:"core-input-group",children:[e.jsx("label",{htmlFor:"phoneNumber",children:"Phone Number"}),e.jsx("input",{type:"number",id:"phoneNumber",name:"phoneNumber",autoComplete:"off",value:t.phoneNumber,onChange:a}),e.jsx("div",{className:"input-border"})]})]}),e.jsx("button",{className:"core-button",type:"submit",children:"Save"})]})}function E({type:u="form",titleModal:o,descModal:m,children:h,onClose:d=null,onOpen:g=null}){return g?e.jsx(e.Fragment,{children:e.jsx("div",{className:"overlay-modal-dashboard",onClick:d,children:u==="form"?e.jsxs("div",{className:"modal-dashboard",onClick:i=>{i.stopPropagation()},children:[e.jsx("span",{className:"modal-dashboard-title",children:o}),e.jsx("span",{className:"material-symbols-outlined modal-dashboard-close",onClick:d,children:"close"}),h]}):e.jsxs("div",{className:"confirm-dashboard",onClick:i=>{i.stopPropagation()},children:[e.jsx("span",{className:"confirm-dashboard-title",children:o}),e.jsx("span",{className:"confirm-dashboard-desc",children:m}),h]})})}):null}function $({setCurrentSubmenu:u}){w.defaults.withCredentials=!0;const[o,m]=r.useState(new Array(6).fill("")),h=r.useRef(null),{toastMessage:d,toastPromise:g,token:i}=P(),b=r.useCallback((t,s)=>{const n=t.target.value.replace(/[^0-9]/g,"");if(n.length<=1){const c=[...o];c[s]=n,m(c),n&&s<5&&document.getElementById(`code-input-${s+1}`).focus()}},[o]),v=t=>{t.preventDefault();const s=t.clipboardData.getData("text").trim();if(/^\d{6}$/.test(s)){const n=s.split("");m(n),document.getElementById("code-input-5").focus()}else d("error","Invalid code format. Please paste 6 digits.")},f=r.useCallback(t=>{t.preventDefault();const s=o.join("");if(s.length===6){const n=w.post(x.verifyOtpPassword,{otp:parseInt(s)},{headers:{Authorization:`Bearer ${i}`}});g(n,{pending:"Reset password in progress, please wait..",success:"Reset password verified successfully! 🎉",error:"Failed to verify reset password, please try again!"},{position:"top-center"},()=>{h.current===!0&&u("d86578b0-4497-4d43-bdad-0f50af1011aa")}),n.then(c=>{h.current=c.data.success}).catch(c=>{console.error(c)})}else d("error","Please enter all 6 digits.")},[o,x.otpPassword,i,u,g,d]);return e.jsxs("form",{className:"recovery-dashboard",onSubmit:f,children:[e.jsx("div",{className:"recovery-dashboard-text",children:"Please check your email inbox for a 6-digit verification code we have sent to your email address. Enter the code in the field below to confirm your email and complete the reset password process."}),e.jsx("div",{className:"recovery-dashboard-wrapper",children:o.map((t,s)=>e.jsx("input",{id:`code-input-${s}`,className:"code-number",type:"text",maxLength:"1",value:t,onChange:n=>b(n,s),onKeyDown:n=>{n.key==="Backspace"&&!o[s]&&s>0&&document.getElementById(`code-input-${s-1}`).focus()},onPaste:v,autoComplete:"off"},s))}),e.jsx("button",{className:"recovery-dashboard-button",children:"Submit Code"})]})}function F({onClose:u,onOpen:o}){if(!o)return null;w.defaults.withCredentials=!0;const{submenus:m,toastPromise:h,token:d,user:g}=P(),[i,b]=r.useState(m.filter(a=>a.menu_id==="6556df8f-7cd6-4848-b39f-1e6ab4973311"&&a.default===!0)[0].sub_menu_id),[v,f]=r.useState(!1),[t,s]=r.useState(!1),n=r.useCallback(a=>{a==="d86578b0-4497-4d43-bdad-0f50af1011aa"&&!t?f(!0):b(a)},[t]),c=r.useCallback(a=>{a.preventDefault(),b("a14736d9-7bcc-4eef-9be3-2015223cc5ed");const l=w.post(x.sendOtpPassword,{email:g.email},{headers:{Authorization:`Bearer ${d}`}});h(l,{pending:"Sending OTP password on progress, please wait..!",success:"OTP password sent successfully.",error:"Failed to send OTP password."},{position:"top-center",autoClose:2500},()=>{f(!1),s(!0),setTimeout(()=>{s(!1)},6e4)}),l.then(p=>{console.log(p.data)}).catch(p=>{console.error(p)})},[x.sendOtpPassword,d,h]);return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"overlay-modal-menu",onClick:()=>{u()},children:e.jsxs("div",{className:"modal-menu",onClick:a=>{a.stopPropagation()},children:[e.jsxs("div",{className:"modal-menu-nav",children:[e.jsx("div",{className:"modal-menu-nav-title",children:"Menu"}),m.filter(a=>a.menu_id==="6556df8f-7cd6-4848-b39f-1e6ab4973311"&&a.sub_menu_id!=="a14736d9-7bcc-4eef-9be3-2015223cc5ed").map(a=>e.jsx(e.Fragment,{children:e.jsxs("div",{className:`modal-menu-nav-item ${a.sub_menu_id===i?"active":""}`,onClick:()=>n(a.sub_menu_id),children:[e.jsx("div",{className:"name",children:a.name}),e.jsx("div",{className:"border-effect"})]},a.sub_menu_id)})),t&&e.jsx(e.Fragment,{children:m.filter(a=>a.menu_id==="6556df8f-7cd6-4848-b39f-1e6ab4973311"&&a.sub_menu_id==="a14736d9-7bcc-4eef-9be3-2015223cc5ed").map(a=>e.jsx(e.Fragment,{children:e.jsxs("div",{className:`modal-menu-nav-item ${a.sub_menu_id===i?"active":""}`,onClick:()=>n(a.sub_menu_id),children:[e.jsx("div",{className:"name",children:a.name}),e.jsx("div",{className:"border-effect"})]},a.sub_menu_id)}))})]}),e.jsxs("div",{className:"modal-menu-content",children:[e.jsxs("div",{className:"header",children:[e.jsxs("span",{className:"header-title",children:["Profile —"," ",i==="0977a7d1-7ee9-4b68-8e3d-edad0ef87a56"?"Bio":i==="d86578b0-4497-4d43-bdad-0f50af1011aa"?"Password":"Verify OTP"]}),e.jsx("span",{className:"header-close material-symbols-outlined",onClick:u,children:"close"})]}),i==="0977a7d1-7ee9-4b68-8e3d-edad0ef87a56"?e.jsx(D,{onClose:u}):i==="d86578b0-4497-4d43-bdad-0f50af1011aa"&&t?e.jsx(_,{}):e.jsx($,{setCurrentSubmenu:b})]})]})}),e.jsx(E,{type:"confirm",titleModal:"Are you sure you want to reset password?",descModal:"If you sure want to change your password, please check your email for a verification code.",onClose:()=>{f(!1)},onOpen:v,children:e.jsxs("div",{className:"confirm-dashboard-action",children:[e.jsx("div",{className:"cancel",onClick:()=>{f(!1)},children:"cancel"}),e.jsx("div",{className:"confirm",onClick:c,children:"reset"})]})})]})}const M=Object.freeze(Object.defineProperty({__proto__:null,default:F},Symbol.toStringTag,{value:"Module"}));export{E as M,F as P,M as a};
