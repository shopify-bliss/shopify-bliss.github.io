import{a as j,r,h as k,i as A,d as u,f as e}from"./index-CMOvAOI6.js";import{L as w}from"./LayoutDashboard-COTbCCi3.js";import{H as U}from"./SupportDashboard-CyTMUA7L.js";import{u as E,a as F}from"./ValidationSchema-m6anahiY.js";import{M as C}from"./Profile-zX8F_9Rq.js";import"./AiBuilderSupport-yaeu0xI2.js";import"./black-logo-KPU1N9jl.js";import"./index-4KdN5x27.js";import"./Error-CNtiXdZS.js";import"./AuthSupport-BsZ_FME2.js";function _({type:o,onOpen:h,onClose:t,refreshData:d,userId:i}){j.defaults.withCredentials=!0;const[N,s]=r.useState([]),[m,D]=r.useState({avatar:"",username:"",phoneNumber:""}),[n,S]=r.useState({userID:"",role:""}),[f,g]=r.useState(!1),v=r.useRef(null),{toastMessage:b,toastPromise:y}=k(),{token:l}=A();r.useEffect(()=>{j.get(u.role,{headers:{Authorization:`Bearer ${l}`}}).then(a=>{s(a.data.data)}).catch(a=>{console.error("Error fetching roles:",a)})},[u.role,l]);const p=r.useCallback(a=>{v.current&&!v.current.contains(a.target)&&g(!1)},[v]);r.useEffect(()=>(f?document.addEventListener("mousedown",p):document.removeEventListener("mousedown",p),()=>{document.removeEventListener("mousedown",p)}),[f]),r.useEffect(()=>{console.log(i),h&&o==="update"&&j.get(`${u.userId}?userID=${i}`,{headers:{Authorization:`Bearer ${l}`}}).then(a=>{console.log(a.data.data),S({userID:a.data.data.user_id,role:a.data.data.role_id})}).catch(a=>{console.error("Error fetching user data:",a)})},[h,o,u.userId,i,l]);const M=r.useCallback(a=>{a.preventDefault(),o==="create"?E.validate(m,{abortEarly:!1}).then(()=>{const c=j.post(u.allusers,m,{headers:{Authorization:`Bearer ${l}`}});y(c,{pending:"Adding user data on progress, please wait..!",success:"Data has been successfully added!",error:"Failed to add data!"},{autoClose:2500,position:"top-center"},()=>{t(),d()}),c.catch(x=>{console.error("Error adding user data:",x)})}).catch(c=>{c.inner.forEach(x=>{b("error",x.message)})}):(console.log(n),F.validate(n,{abortEarly:!1}).then(()=>{const c=j.put(u.updateUserRole,n,{headers:{Authorization:`Bearer ${l}`}});y(c,{pending:"Updating user role data on progress, please wait..!",success:"Data has been successfully updated!",error:"Failed to update data!"},{autoClose:2500,position:"top-center"},()=>{t(),d()}),c.catch(x=>{console.error("Error updating user role data:",x)})}).catch(c=>{c.inner.forEach(x=>{b("error",x.message)})}))},[E,m,n,t,d,b,y,i,l,u]),R=r.useCallback(a=>{a.preventDefault();const c=j.delete(`${u.allusers}?id=${i}`,{headers:{Authorization:`Bearer ${l}`}});y(c,{pending:"deleting user data on progress, please wait..!",success:"Data has been successfully deleted!",error:"Failed to delete data!"},{autoClose:2500,position:"top-center"},()=>{t(),d()}),c.catch(x=>{console.error("Error deleting user data:",x)})},[i,l,t,d]);return e.jsx(e.Fragment,{children:o==="delete"?e.jsx(C,{onClose:t,onOpen:h,type:"confirm",titleModal:"Are you sure you want to delete this?",descModal:"Your content will be permanently deleted. This can't be undone.",children:e.jsxs("div",{className:"confirm-dashboard-action",children:[e.jsx("div",{className:"cancel",onClick:t,children:"cancel"}),e.jsx("div",{className:"confirm",onClick:R,children:"delete"})]})}):e.jsx(C,{titleModal:o==="create"?"Insert Section Data":"Update Section Data",onOpen:h,onClose:t,children:e.jsxs("form",{className:"modal-dashboard-form",onSubmit:M,children:[e.jsxs("div",{className:"modal-dashboard-form-group",children:[e.jsxs("div",{className:"label",children:["Role ",e.jsx("span",{children:"(Required)"})]}),e.jsxs("div",{className:"select-default",onClick:()=>g(!0),children:[e.jsx("div",{className:"text",children:n.role===""?"Choose Role":N.filter(a=>a.role_id===n.role).map(a=>a.role_name)}),e.jsx("span",{className:`material-symbols-outlined ${f?"default-closed":""}`,children:"south_east"})]}),f&&e.jsx("div",{className:"select-list no-more",ref:v,children:N.filter(a=>a.role_id!==n.role).map(a=>e.jsx("div",{className:"select-list-item",onClick:()=>{S({...n,role:a.role_id}),g(!1)},children:e.jsx("div",{className:"name",children:a.role_name})},a.role_id))})]}),e.jsx("button",{type:"submit",children:"Submit"})]})})})}function $({isLoading:o,users:h,setUserId:t,setIsUpdateModalOpen:d,setIsDeleteModalOpen:i,type:N}){return e.jsxs(e.Fragment,{children:[o&&e.jsx("div",{className:"loader-pages",children:e.jsx("div",{className:"loader-pages-item"})}),N==="grid"?e.jsx("div",{className:"display-users-grid",children:h.map(s=>{const m=`/avatar/${s.avatar}`;return e.jsxs("div",{className:"item",children:[e.jsx("img",{className:"item-avatar",src:m,alt:"Avatar's User"}),e.jsx("div",{className:"item-username",children:s.username}),e.jsx("div",{className:"item-email",children:s.email}),e.jsxs("div",{className:"item-phone-number",children:["+",s.phone_number]}),e.jsxs("div",{className:"item-action",children:[e.jsxs("div",{className:`item-action-role ${s.role==="admin"?"":"customer"}`,children:[e.jsx("span",{className:`material-symbols-outlined item-action-role-icon ${s.role==="admin"?"":"customer"}`,children:s.role==="admin"?"manage_accounts":"person"}),e.jsx("span",{className:`item-action-role-text ${s.role==="admin"?"":"customer"}`,children:s.role||"Super Whooo"})]}),e.jsx("span",{className:"material-symbols-rounded item-action-edit",onClick:()=>{d(!0),t(s.user_id)},children:"edit_square"}),e.jsx("span",{className:"material-symbols-rounded item-action-delete",onClick:()=>{i(!0),t(s.user_id)},children:"delete"})]})]},s.user_id)})}):e.jsxs("div",{className:"display-users-list",children:[e.jsxs("div",{className:"head",children:[e.jsx("div",{className:"head-col",children:"No"}),e.jsx("div",{className:"head-col",children:"General Info"}),e.jsx("div",{className:"head-col",children:"Phone Number"}),e.jsx("div",{className:"head-col",children:"Role"}),e.jsx("div",{className:"head-col",children:"Action"})]}),h.map((s,m)=>{const D=`/avatar/${s.avatar}`;return e.jsxs("div",{className:"body",children:[e.jsx("div",{className:"body-col",children:m+1}),e.jsxs("div",{className:"body-col",children:[e.jsx("img",{className:"avatar",src:D,alt:"Avatar's User"}),e.jsxs("div",{className:"info",children:[e.jsx("div",{className:"info-username",children:s.username}),e.jsx("div",{className:"info-email",children:s.email})]})]}),e.jsxs("div",{className:"body-col",children:["+",s.phone_number]}),e.jsx("div",{className:"body-col",children:e.jsx("div",{className:`body-col-role ${s.role==="admin"?"":"customer"}`,children:s.role||"Super Whooo"})}),e.jsxs("div",{className:"body-col",children:[e.jsx("span",{className:"material-symbols-rounded edit",onClick:()=>{d(!0),t(s.user_id)},children:"edit_square"}),e.jsx("span",{className:"material-symbols-rounded delete",onClick:()=>{i(!0),t(s.user_id)},children:"delete"})]})]},s.user_id)})]})]})}function L(){j.defaults.withCredentials=!0;const[o,h]=r.useState([]),[t,d]=r.useState(!1),[i,N]=r.useState("list"),[s,m]=r.useState(!1),[D,n]=r.useState(!1),[S,f]=r.useState(!1),[g,v]=r.useState(""),{token:b}=A(),y=r.useCallback(p=>{N(p)},[]),l=r.useCallback(async()=>{d(!0);try{const p=await j.get(u.allusers,{headers:{Authorization:`Bearer ${b}`}});h(p.data.data)}catch(p){console.error(p)}finally{d(!1)}},[b,u.allusers]);return r.useEffect(()=>{l()},[l]),e.jsx(e.Fragment,{children:e.jsxs("div",{className:"display-users",children:[e.jsx(U,{className:"display-users",title:"Users Management — Display Data",activeDisplay:i,handleDisplayChange:y,setIsCreateModalOpen:m}),i==="grid"?e.jsx($,{isLoading:t,users:o,setUserId:v,setIsUpdateModalOpen:n,setIsDeleteModalOpen:f,type:"grid"}):e.jsx($,{isLoading:t,users:o,setUserId:v,setIsUpdateModalOpen:n,setIsDeleteModalOpen:f,type:"list"}),e.jsx(_,{type:"create",onOpen:s,onClose:()=>m(!1),refreshData:l}),e.jsx(_,{type:"update",onOpen:D,onClose:()=>n(!1),refreshData:l,userId:g}),e.jsx(_,{type:"delete",onOpen:S,onClose:()=>f(!1),refreshData:l,userId:g})]})})}function V(){const{submenuPage:o}=k();return e.jsx(e.Fragment,{children:e.jsx(w,{children:o==="display data"&&e.jsx(L,{})})})}export{V as default};
