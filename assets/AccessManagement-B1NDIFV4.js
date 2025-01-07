import{a as g,r as t,h as S,e as v,j as e,L as q,u as G}from"./index-mHmsr8ix.js";import{L as J}from"./LayoutDashboard-B8CGz9dD.js";import{H as w}from"./SupportDashboard-Uin9v9p4.js";import{M as F,S as L,A as U,R as P}from"./ValidationSchema-HP-qBNNP.js";import{M as E}from"./Profile-BZslneBf.js";import"./AiBuilderSupport-DUszeaMk.js";import"./black-logo-KPU1N9jl.js";import"./AuthSupport-CF7Z4N7m.js";function O({type:l,onOpen:d,onClose:s,refreshData:o,menuId:c}){g.defaults.withCredentials=!0;const[i,a]=t.useState({name:"",url:""}),{toastMessage:h,toastPromise:x,token:n}=S();t.useEffect(()=>{d&&l==="create"?a({name:"",url:""}):d&&l==="update"&&g.get(`${v.menusId}?id=${c}`).then(m=>{a(m.data.data[0])}).catch(m=>{console.error("Error fetching menu data:",m)})},[d,l,c,v]);const b=m=>{const{name:r,value:u}=m.target;a({...i,[r]:u})},j=t.useCallback(m=>{m.preventDefault(),l==="create"?F.validate(i,{abortEarly:!1}).then(()=>{const r=g.post(v.menus,i,{headers:{Authorization:`Bearer ${n}`}});x(r,{pending:"Adding menu data on progress, please wait..!",success:"Data has been successfully added!",error:"Failed to add data!"},{autoClose:2500,position:"top-center"},()=>{s(),o()}),r.catch(u=>{console.error("Error adding menu data:",u)})}).catch(r=>{r.inner.forEach(u=>{h("error",u.message)})}):F.validate(i,{abortEarly:!1}).then(()=>{const r=g.put(`${v.menus}?id=${c}`,i,{headers:{Authorization:`Bearer ${n}`}});x(r,{pending:"Updating menu data on progress, please wait..!",success:"Data has been successfully updated!",error:"Failed to update data!"},{autoClose:2500,position:"top-center"},()=>{s(),o()}),r.catch(u=>{console.error("Error updating menu data:",u)})}).catch(r=>{r.inner.forEach(u=>{h("error",u.message)})})},[F,i,s,o,h,x,c,n,v]),f=t.useCallback(m=>{m.preventDefault();const r=g.delete(`${v.menus}?id=${c}`,{headers:{Authorization:`Bearer ${n}`}});x(r,{pending:"deleting menu data on progress, please wait..!",success:"Data has been successfully deleted!",error:"Failed to delete data!"},{autoClose:2500,position:"top-center"},()=>{s(),o()}),r.catch(u=>{console.error("Error deleting menu data:",u)})},[c,n,s,o]);return e.jsx(e.Fragment,{children:l==="delete"?e.jsx(E,{onClose:s,onOpen:d,type:"confirm",titleModal:"Are you sure you want to delete this?",descModal:"Your content will be permanently deleted. This can't be undone.",children:e.jsxs("div",{className:"confirm-dashboard-action",children:[e.jsx("div",{className:"cancel",onClick:s,children:"cancel"}),e.jsx("div",{className:"confirm",onClick:f,children:"delete"})]})}):e.jsx(E,{titleModal:l==="create"?"Insert Menu Data":"Update Menu Data",onOpen:d,onClose:s,children:e.jsxs("form",{className:"modal-dashboard-form",onSubmit:j,children:[e.jsxs("div",{className:"modal-dashboard-form-group",children:[e.jsxs("label",{htmlFor:"name",children:["Menu name ",e.jsx("span",{children:"(Required)"})]}),e.jsx("input",{type:"text",id:"name",name:"name",placeholder:"Access Management",value:i.name,onChange:b})]}),e.jsxs("div",{className:"modal-dashboard-form-group",children:[e.jsxs("label",{htmlFor:"url",children:["Menu url ",e.jsx("span",{children:"(Required)"})]}),e.jsx("input",{type:"text",id:"url",name:"url",placeholder:"access-management",value:i.url,onChange:b})]}),e.jsx("button",{type:"submit",children:"Submit"})]})})})}function V({isLoadingMenuMan:l,menus:d,setMenuId:s,setIsUpdateModalOpen:o,setIsDeleteModalOpen:c,type:i}){return e.jsxs(e.Fragment,{children:[l&&e.jsx("div",{className:"loader-pages",children:e.jsx("div",{className:"loader-pages-item"})}),i==="grid"?e.jsx("div",{className:"menu-man-grid",children:d.map(a=>e.jsxs("div",{className:"item",children:[e.jsx("div",{className:"item-name",children:a.name}),e.jsx(q,{to:`/${a.url}`,className:"item-url",children:a.url}),e.jsxs("div",{className:"item-action",children:[e.jsx("span",{className:"material-symbols-rounded item-action-edit",onClick:()=>{o(!0),s(a.menu_id)},children:"edit_square"}),e.jsx("span",{className:"material-symbols-rounded item-action-delete",onClick:()=>{c(!0),s(a.menu_id)},children:"delete"})]})]},a.menu_id))}):e.jsxs("div",{className:"menu-man-list",children:[e.jsxs("div",{className:"head",children:[e.jsx("div",{className:"head-col",children:"No"}),e.jsx("div",{className:"head-col",children:"Name"}),e.jsx("div",{className:"head-col",children:"Url"}),e.jsx("div",{className:"head-col",children:"Action"})]}),d.map((a,h)=>e.jsxs("div",{className:"body",children:[e.jsx("div",{className:"body-col",children:h+1}),e.jsx("div",{className:"body-col",children:a.name}),e.jsx(q,{to:`/${a.url}`,className:"body-col",children:a.url}),e.jsxs("div",{className:"body-col",children:[e.jsx("span",{className:"material-symbols-rounded edit",onClick:()=>{o(!0),s(a.menu_id)},children:"edit_square"}),e.jsx("span",{className:"material-symbols-rounded delete",onClick:()=>{c(!0),s(a.menu_id)},children:"delete"})]})]},a.menu_id))]})]})}function K(){g.defaults.withCredentials=!0;const[l,d]=t.useState("grid"),[s,o]=t.useState(!1),[c,i]=t.useState(!1),[a,h]=t.useState(!1),[x,n]=t.useState(null),{menus:b,fetchDashboardData:j,isLoading:f}=S(),m=t.useCallback(r=>{d(r)},[]);return e.jsx(e.Fragment,{children:e.jsxs("div",{className:"menu-man",children:[e.jsx(w,{className:"menu-man",title:"Menu Management — Menus",activeDisplay:l,handleDisplayChange:m,setIsCreateModalOpen:o}),l==="grid"?e.jsx(V,{isLoadingMenuMan:f,menus:b,setMenuId:n,setIsUpdateModalOpen:i,setIsDeleteModalOpen:h,type:"grid"}):e.jsx(V,{isLoadingMenuMan:f,menus:b,setMenuId:n,setIsUpdateModalOpen:i,setIsDeleteModalOpen:h,type:"list"}),e.jsx(O,{type:"create",onOpen:s,onClose:()=>o(!1),refreshData:j}),e.jsx(O,{type:"update",onOpen:c,onClose:()=>i(!1),refreshData:j,menuId:x}),e.jsx(O,{type:"delete",onOpen:a,onClose:()=>h(!1),refreshData:j,menuId:x})]})})}function z({type:l,onOpen:d,onClose:s,refreshData:o,submenuId:c}){g.defaults.withCredentials=!0;const[i,a]=t.useState(!1),[h,x]=t.useState(""),[n,b]=t.useState(!1),[j,f]=t.useState(""),m=t.useRef(null),{toastMessage:r,toastPromise:u,menus:D,token:y}=S(),C=t.useCallback(N=>{m.current&&!m.current.contains(N.target)&&a(!1)},[m]);t.useEffect(()=>(i?document.addEventListener("mousedown",C):document.removeEventListener("mousedown",C),()=>{document.removeEventListener("mousedown",C)}),[i]),t.useEffect(()=>{d&&l==="create"?(f(""),x(""),b(!1)):d&&l==="update"&&g.get(`${v.submenusId}?id=${c}`,{headers:{Authorization:`Bearer ${y}`}}).then(N=>{f(N.data.data.name),x(N.data.data.menu_id),b(N.data.data.default)}).catch(N=>{console.error("Error fetching submenu data:",N)})},[d,l,c,y,v.submenusId]);const A=t.useCallback(N=>{N.preventDefault();const M={menuID:h,name:j,defaults:n};l==="create"?L.validate(M,{abortEarly:!1}).then(()=>{const p=g.post(v.submenus,M,{headers:{Authorization:`Bearer ${y}`}});u(p,{pending:"Adding submenu data on progress, please wait..!",success:"Data has been successfully added!",error:"Failed to add data!"},{autoClose:2500,position:"top-center"},()=>{s(),o()}),p.catch(_=>{console.error("Error adding submenu data:",_)})}).catch(p=>{p.inner.forEach(_=>{r("error",_.message)})}):L.validate(M,{abortEarly:!1}).then(()=>{const p=g.put(`${v.submenus}?id=${c}`,M,{headers:{Authorization:`Bearer ${y}`}});u(p,{pending:"Updating submenu data on progress, please wait..!",success:"Data has been successfully updated!",error:"Failed to update data!"},{autoClose:2500,position:"top-center"},()=>{s(),o()}),p.catch(_=>{console.error("Error updating submenu data:",_)})}).catch(p=>{p.inner.forEach(_=>{r("error",_.message)})})},[L,j,h,n,s,o,r,u,y,c,v.submenus]),k=t.useCallback(N=>{N.preventDefault();const M=g.delete(`${v.submenus}?id=${c}`,{headers:{Authorization:`Bearer ${y}`}});u(M,{pending:"deleting submenu data on progress, please wait..!",success:"Data has been successfully deleted!",error:"Failed to delete data!"},{autoClose:2500,position:"top-center"},()=>{s(),o()}),M.catch(p=>{console.error("Error deleting submenu data:",p)})},[y,c,s,o,v.submenus,u]);return e.jsx(e.Fragment,{children:l==="delete"?e.jsx(E,{onClose:s,onOpen:d,type:"confirm",titleModal:"Are you sure you want to delete this?",descModal:"Your content will be permanently deleted. This can't be undone.",children:e.jsxs("div",{className:"confirm-dashboard-action",children:[e.jsx("div",{className:"cancel",onClick:s,children:"cancel"}),e.jsx("div",{className:"confirm",onClick:k,children:"delete"})]})}):e.jsx(E,{titleModal:l==="create"?"Insert Submenu Data":"Update Submenu Data",onOpen:d,onClose:s,children:e.jsxs("form",{className:"modal-dashboard-form",onSubmit:A,children:[e.jsxs("div",{className:"modal-dashboard-form-group",children:[e.jsxs("div",{className:"label",children:["Menu Parent ",e.jsx("span",{children:"(Required)"})]}),e.jsxs("div",{className:"select-default",onClick:()=>a(!0),children:[e.jsx("div",{className:"text",children:h===""?"Select Menu Parent":D.filter(N=>N.menu_id===h).map(N=>N.name)}),e.jsx("span",{className:`material-symbols-outlined ${i?"default-closed":""}`,children:"south_east"})]}),i&&e.jsx("div",{className:"select-list",ref:m,children:D.filter(N=>N.menu_id!==h).map(N=>e.jsx("div",{className:"select-list-item",onClick:()=>{x(N.menu_id),a(!1)},children:e.jsx("div",{className:"name",children:N.name})},N.menu_id))})]}),e.jsxs("div",{className:"modal-dashboard-form-group",children:[e.jsxs("label",{htmlFor:"name",children:["Submenu Name ",e.jsx("span",{children:"(Required)"})]}),e.jsx("input",{type:"text",id:"name",name:"name",placeholder:"Analytics XX",value:j,onChange:N=>f(N.target.value)})]}),e.jsxs("div",{className:"modal-dashboard-form-group",children:[e.jsxs("div",{className:"label",children:["Setting Default ",e.jsx("span",{children:"(Required)"})]}),e.jsxs("div",{className:"check-default",onClick:()=>b(!n),children:[e.jsx("span",{class:"material-symbols-outlined",children:n?"task_alt":"circle"}),e.jsx("div",{className:"text",children:n?"True":"Null"})]})]}),e.jsx("button",{type:"submit",children:"Submit"})]})})})}function T({isLoadingSubmenuMan:l,submenus:d,setSubmenuId:s,setIsUpdateModalOpen:o,setIsDeleteModalOpen:c,type:i}){return e.jsxs(e.Fragment,{children:[l&&e.jsx("div",{className:"loader-pages",children:e.jsx("div",{className:"loader-pages-item"})}),i==="grid"?e.jsx("div",{className:"submenu-man-grid",children:d.map(a=>e.jsxs("div",{className:"item",children:[e.jsx("div",{className:"item-name",children:a.name}),e.jsx(q,{className:"item-menu",to:`/${a.menus.url}`,children:a.menus.url}),e.jsxs("div",{className:"item-action",children:[a.default===!0?e.jsx(e.Fragment,{children:e.jsxs("div",{className:"item-action-default",children:[e.jsx("span",{className:"material-symbols-outlined item-action-default-icon",children:"settings"}),e.jsx("span",{className:"item-action-default-text",children:"Default"})]})}):null,e.jsx("span",{className:"material-symbols-rounded item-action-edit",onClick:()=>{o(!0),s(a.sub_menu_id)},children:"edit_square"}),e.jsx("span",{className:"material-symbols-rounded item-action-delete",onClick:()=>{c(!0),s(a.sub_menu_id)},children:"delete"})]})]},a.sub_menu_id))}):e.jsxs("div",{className:"submenu-man-list",children:[e.jsxs("div",{className:"head",children:[e.jsx("div",{className:"head-col",children:"No"}),e.jsx("div",{className:"head-col",children:"Name"}),e.jsx("div",{className:"head-col",children:"Menu"}),e.jsx("div",{className:"head-col",children:"Default"}),e.jsx("div",{className:"head-col",children:"Action"})]}),d.map((a,h)=>e.jsxs("div",{className:"body",children:[e.jsx("div",{className:"body-col",children:h+1}),e.jsx("div",{className:"body-col",children:a.name}),e.jsx("div",{className:"body-col",children:a.menus.name}),e.jsx("div",{className:"body-col",children:a.default===!0?e.jsx("span",{className:"default",children:"Default"}):e.jsx("span",{className:"nope",children:"-"})}),e.jsxs("div",{className:"body-col",children:[e.jsx("span",{className:"material-symbols-rounded edit",onClick:()=>{o(!0),s(a.sub_menu_id)},children:"edit_square"}),e.jsx("span",{className:"material-symbols-rounded delete",onClick:()=>{c(!0),s(a.sub_menu_id)},children:"delete"})]})]},a.sub_menu_id))]})]})}function Q(){g.defaults.withCredentials=!0;const[l,d]=t.useState("grid"),[s,o]=t.useState(!1),[c,i]=t.useState(!1),[a,h]=t.useState(!1),[x,n]=t.useState(null),{submenus:b,fetchDashboardData:j,isLoading:f}=S(),m=t.useCallback(r=>{d(r)},[]);return e.jsx(e.Fragment,{children:e.jsxs("div",{className:"submenu-man",children:[e.jsx(w,{className:"submenu-man",title:"Menu Management — Submenus",activeDisplay:l,handleDisplayChange:m,setIsCreateModalOpen:o}),l==="grid"?e.jsx(T,{isLoadingSubmenuMan:f,submenus:b,setSubmenuId:n,setIsUpdateModalOpen:i,setIsDeleteModalOpen:h,type:"grid"}):e.jsx(T,{isLoadingSubmenuMan:f,submenus:b,setSubmenuId:n,setIsUpdateModalOpen:i,setIsDeleteModalOpen:h,type:"list"}),e.jsx(z,{type:"create",onOpen:s,onClose:()=>o(!1),refreshData:j}),e.jsx(z,{type:"update",onOpen:c,onClose:()=>i(!1),refreshData:j,submenuId:x}),e.jsx(z,{type:"delete",onOpen:a,onClose:()=>h(!1),refreshData:j,submenuId:x})]})})}function Y({type:l,onOpen:d,onClose:s,refreshData:o,accessId:c,roles:i}){g.defaults.withCredentials=!0;const[a,h]=t.useState(!1),[x,n]=t.useState(!1),[b,j]=t.useState(""),[f,m]=t.useState(""),r=t.useRef(null),u=t.useRef(null),{toastMessage:D,toastPromise:y,menus:C,token:A}=S(),k=t.useCallback(p=>{r.current&&!r.current.contains(p.target)?h(!1):u.current&&!u.current.contains(p.target)&&n(!1)},[r,u]);t.useEffect(()=>(a||x?document.addEventListener("mousedown",k):document.removeEventListener("mousedown",k),()=>{document.removeEventListener("mousedown",k)}),[a,x,k]),t.useEffect(()=>{d&&l==="create"&&(m(""),j(""))},[d,l]);const N=t.useCallback(p=>{p.preventDefault();const _={menuID:b,roleID:f};console.log(_),U.validate(_,{abortEarly:!1}).then(()=>{const $=g.post(v.accessManagement,_,{headers:{Authorization:`Bearer ${A}`}});y($,{pending:"Adding access data on progress, please wait..!",success:"Data has been successfully added!",error:"Failed to add data!"},{autoClose:2500,position:"top-center"},()=>{s()}),$.catch(R=>{console.error("Error adding access data:",R)})}).catch($=>{$.inner.forEach(R=>{D("error",R.message)})})},[U,f,b,s,A,c,D,y,v.accessManagement]),M=t.useCallback(p=>{p.preventDefault();const _=g.delete(`${v.accessManagement}?id=${c}`,{headers:{Authorization:`Bearer ${A}`}});y(_,{pending:"deleting access data on progress, please wait..!",success:"Data has been successfully deleted!",error:"Failed to delete data!"},{autoClose:2500,position:"top-center"},()=>{s()}),_.catch($=>{console.error("Error deleting access data:",$)})},[A,y,c,s,v.accessManagement]);return e.jsx(e.Fragment,{children:l==="delete"?e.jsx(E,{onClose:s,onOpen:d,type:"confirm",titleModal:"Are you sure you want to delete this?",descModal:"Your content will be permanently deleted. This can't be undone.",children:e.jsxs("div",{className:"confirm-dashboard-action",children:[e.jsx("div",{className:"cancel",onClick:s,children:"cancel"}),e.jsx("div",{className:"confirm",onClick:M,children:"delete"})]})}):e.jsx(E,{titleModal:"Insert Access Data",onOpen:d,onClose:s,children:e.jsxs("form",{className:"modal-dashboard-form",onSubmit:N,children:[e.jsxs("div",{className:"modal-dashboard-form-group",children:[e.jsxs("div",{className:"label",children:["Role ",e.jsx("span",{children:"(Required)"})]}),e.jsxs("div",{className:"select-default",onClick:()=>n(!0),children:[e.jsx("div",{className:"text",children:f===""?"Choose Role":i.filter(p=>p.role_id===f).map(p=>p.role_name)}),e.jsx("span",{className:`material-symbols-outlined ${x?"default-closed":""}`,children:"south_east"})]}),x&&e.jsx("div",{className:"select-list no-more",ref:u,children:i.filter(p=>p.role_id!==f).map(p=>e.jsx("div",{className:"select-list-item",onClick:()=>{m(p.role_id),n(!1)},children:e.jsx("div",{className:"name",children:p.role_name})},p.role_id))})]}),e.jsxs("div",{className:"modal-dashboard-form-group",children:[e.jsxs("div",{className:"label",children:["Menu ",e.jsx("span",{children:"(Required)"})]}),e.jsxs("div",{className:"select-default",onClick:()=>h(!0),children:[e.jsx("div",{className:"text",children:b===""?"Choose Menu":C.filter(p=>p.menu_id===b).map(p=>p.name)}),e.jsx("span",{className:`material-symbols-outlined ${a?"default-closed":""}`,children:"south_east"})]}),a&&e.jsx("div",{className:"select-list",ref:r,children:C.filter(p=>p.menu_id!==b).map(p=>e.jsx("div",{className:"select-list-item",onClick:()=>{j(p.menu_id),h(!1)},children:e.jsx("div",{className:"name",children:p.name})},p.menu_id))})]}),e.jsx("button",{type:"submit",children:"Submit"})]})})})}function H({accessMenus:l,setAccessId:d,setIsDeleteModalOpen:s,type:o,menus:c,activeRole:i,handleActiveRole:a,roles:h,isLoadingDashboard:x}){return e.jsxs(e.Fragment,{children:[x&&e.jsx("div",{className:"loader-pages",children:e.jsx("div",{className:"loader-pages-item"})}),e.jsxs("div",{className:"access-man-wrapper",children:[e.jsx("div",{className:"access-man-roles",children:h.map(n=>e.jsx("div",{className:`role ${i===n.role_id?"active":""}`,onClick:()=>a(n.role_id),children:n.role_name},n.role_id))}),o==="grid"?e.jsx("div",{className:"access-man-grid",children:c.map(n=>{const b=l.find(f=>f.menu_id===n.menu_id&&f.role_id===i),j=!!b;return e.jsxs("div",{className:"item",children:[e.jsx("div",{className:"item-name",children:n.name}),e.jsx("span",{className:"material-symbols-outlined item-check",children:j?"task_alt":"circle"}),e.jsx("div",{className:"item-action",children:j&&e.jsx("span",{className:"material-symbols-rounded item-action-delete",onClick:()=>{s(!0),d(b.access_id)},children:"delete"})})]},n.menu_id)})}):e.jsxs("div",{className:"access-man-list",children:[e.jsxs("div",{className:"head",children:[e.jsx("div",{className:"head-col",children:"No"}),e.jsx("div",{className:"head-col",children:"Menu"}),e.jsx("div",{className:"head-col",children:"Access"}),e.jsx("div",{className:"head-col",children:"Action"})]}),c.map((n,b)=>{const j=l.find(m=>m.menu_id===n.menu_id&&m.role_id===i),f=!!j;return e.jsxs("div",{className:"body",children:[e.jsx("div",{className:"body-col",children:b+1}),e.jsx("div",{className:"body-col",children:n.name}),e.jsx("div",{className:"body-col material-symbols-outlined",children:f?"task_alt":"circle"}),e.jsx("div",{className:"body-col",children:f&&e.jsx("span",{className:"material-symbols-rounded delete",onClick:()=>{s(!0),d(j.access_id)},children:"delete"})})]},n.menu_id)})]})]})]})}function W(){g.defaults.withCredentials=!0;const[l,d]=t.useState("3de65f44-6341-4b4d-8d9f-c8ca3ea80b80"),[s,o]=t.useState([]),[c,i]=t.useState("list"),[a,h]=t.useState(!1),[x,n]=t.useState(!1),[b,j]=t.useState(null),[f,m]=t.useState(!1),{accessMenus:r,menus:u,token:D,isLoadingDashboard:y,setDashboardLoader:C}=S(),A=t.useCallback(M=>{i(M)},[]),k=t.useCallback(M=>{d(M)},[]),N=t.useCallback(async()=>{if(!f){C(!0);try{const M=await g.get(v.role,{headers:{Authorization:`Bearer ${D}`}});console.log(M.data.data),o(M.data.data),m(!0)}catch(M){console.error(M)}finally{C(!1)}}},[f]);return t.useEffect(()=>{N()},[N]),e.jsx(e.Fragment,{children:e.jsxs("div",{className:"access-man",children:[e.jsx(w,{className:"access-man",title:"Menu Management — Access Menu",activeDisplay:c,handleDisplayChange:A,setIsCreateModalOpen:h}),c==="grid"?e.jsx(H,{roles:s,isLoadingDashboard:y,accessMenus:r,setAccessId:j,setIsDeleteModalOpen:n,type:"grid",menus:u,activeRole:l,handleActiveRole:k}):e.jsx(H,{roles:s,isLoadingDashboard:y,accessMenus:r,setAccessId:j,setIsDeleteModalOpen:n,type:"list",menus:u,activeRole:l,handleActiveRole:k}),e.jsx(Y,{type:"create",onOpen:a,onClose:()=>h(!1),roles:s}),e.jsx(Y,{type:"delete",onOpen:x,onClose:()=>n(!1),accessId:b,roles:s})]})})}function B({type:l,onOpen:d,onClose:s,refreshData:o,roleId:c}){g.defaults.withCredentials=!0;const[i,a]=t.useState({roleName:""}),{toastMessage:h,toastPromise:x,token:n}=S();t.useEffect(()=>{d&&l==="create"?a({roleName:""}):d&&l==="update"&&g.get(`${v.roleId}?id=${c}`,{headers:{Authorization:`Bearer ${n}`}}).then(m=>{console.log(m.data.data),a({roleName:m.data.data.role_name})}).catch(m=>{console.error("Error fetching role data:",m)})},[d,l,c,n,v]);const b=m=>{const{name:r,value:u}=m.target;a({...i,[r]:u})},j=t.useCallback(m=>{m.preventDefault(),l==="create"?P.validate(i,{abortEarly:!1}).then(()=>{const r=g.post(v.role,i,{headers:{Authorization:`Bearer ${n}`}});x(r,{pending:"Adding role data on progress, please wait..!",success:"Data has been successfully added!",error:"Failed to add data!"},{autoClose:2500,position:"top-center"},()=>{s(),o()}),r.catch(u=>{console.error("Error adding role data:",u)})}).catch(r=>{r.inner.forEach(u=>{h("error",u.message)})}):P.validate(i,{abortEarly:!1}).then(()=>{const r=g.put(`${v.role}?id=${c}`,i,{headers:{Authorization:`Bearer ${n}`}});x(r,{pending:"Updating role data on progress, please wait..!",success:"Data has been successfully updated!",error:"Failed to update data!"},{autoClose:2500,position:"top-center"},()=>{s(),o()}),r.catch(u=>{console.error("Error updating role data:",u)})}).catch(r=>{r.inner.forEach(u=>{h("error",u.message)})})},[P,i,n,s,o,h,x,c,v]),f=t.useCallback(m=>{m.preventDefault();const r=g.delete(`${v.role}?id=${c}`,{headers:{Authorization:`Bearer ${n}`}});x(r,{pending:"deleting role data on progress, please wait..!",success:"Data has been successfully deleted!",error:"Failed to delete data!"},{autoClose:2500,position:"top-center"},()=>{s(),o()}),r.catch(u=>{console.error("Error deleting role data:",u)})},[c,n,s,o,x,v]);return e.jsx(e.Fragment,{children:l==="delete"?e.jsx(E,{onClose:s,onOpen:d,type:"confirm",titleModal:"Are you sure you want to delete this?",descModal:"Your content will be permanently deleted. This can't be undone.",children:e.jsxs("div",{className:"confirm-dashboard-action",children:[e.jsx("div",{className:"cancel",onClick:s,children:"cancel"}),e.jsx("div",{className:"confirm",onClick:f,children:"delete"})]})}):e.jsx(E,{titleModal:l==="create"?"Insert Role Data":"Update Role Data",onOpen:d,onClose:s,children:e.jsxs("form",{className:"modal-dashboard-form",onSubmit:j,children:[e.jsxs("div",{className:"modal-dashboard-form-group",children:[e.jsxs("label",{htmlFor:"roleName",children:["Role name ",e.jsx("span",{children:"(Required)"})]}),e.jsx("input",{type:"text",id:"roleName",name:"roleName",placeholder:"Admin",value:i.roleName,onChange:b})]}),e.jsx("button",{type:"submit",children:"Submit"})]})})})}function X({isLoadingRoleMan:l,roles:d,setRoleId:s,setIsUpdateModalOpen:o,setIsDeleteModalOpen:c,type:i}){return e.jsxs(e.Fragment,{children:[l&&e.jsx("div",{className:"loader-pages",children:e.jsx("div",{className:"loader-pages-item"})}),i==="grid"?e.jsx("div",{className:"role-man-grid",children:d.map(a=>e.jsxs("div",{className:"item",children:[e.jsx("div",{className:"item-name",children:a.role_name}),e.jsxs("div",{className:"item-action",children:[e.jsx("span",{className:"material-symbols-rounded item-action-edit",onClick:()=>{o(!0),s(a.role_id)},children:"edit_square"}),e.jsx("span",{className:"material-symbols-rounded item-action-delete",onClick:()=>{c(!0),s(a.role_id)},children:"delete"})]})]},a.role_id))}):e.jsxs("div",{className:"role-man-list",children:[e.jsxs("div",{className:"head",children:[e.jsx("div",{className:"head-col",children:"No"}),e.jsx("div",{className:"head-col",children:"Name"}),e.jsx("div",{className:"head-col",children:"Action"})]}),d.map((a,h)=>e.jsxs("div",{className:"body",children:[e.jsx("div",{className:"body-col",children:h+1}),e.jsx("div",{className:"body-col",children:a.role_name}),e.jsxs("div",{className:"body-col",children:[e.jsx("span",{className:"material-symbols-rounded edit",onClick:()=>{o(!0),s(a.role_id)},children:"edit_square"}),e.jsx("span",{className:"material-symbols-rounded delete",onClick:()=>{c(!0),s(a.role_id)},children:"delete"})]})]},a.role_id))]})]})}function Z(){g.defaults.withCredentials=!0;const[l,d]=t.useState([]),[s,o]=t.useState(!0),[c,i]=t.useState("grid"),[a,h]=t.useState(!1),[x,n]=t.useState(!1),[b,j]=t.useState(!1),[f,m]=t.useState(null),{fetchDashboardData:r,token:u}=S(),D=t.useCallback(C=>{i(C)},[]),y=t.useCallback(async()=>{o(!0);try{const C=await g.get(v.role,{headers:{Authorization:`Bearer ${u}`}});d(C.data.data)}catch(C){console.error("Error fetching roles:",C)}finally{o(!1)}},[u,v]);return t.useEffect(()=>{y()},[y]),e.jsx(e.Fragment,{children:e.jsxs("div",{className:"role-man",children:[e.jsx(w,{className:"role-man",title:"Role Management — Roles",activeDisplay:c,handleDisplayChange:D,setIsCreateModalOpen:h}),c==="grid"?e.jsx(X,{isLoadingRoleMan:s,roles:l,setRoleId:m,setIsUpdateModalOpen:n,setIsDeleteModalOpen:j,type:"grid"}):e.jsx(X,{isLoadingRoleMan:s,roles:l,setRoleId:m,setIsUpdateModalOpen:n,setIsDeleteModalOpen:j,type:"list"}),e.jsx(B,{type:"create",onOpen:a,onClose:()=>h(!1),refreshData:r}),e.jsx(B,{type:"update",onOpen:x,onClose:()=>n(!1),refreshData:r,roleId:f}),e.jsx(B,{type:"delete",onOpen:b,onClose:()=>j(!1),refreshData:r,roleId:f})]})})}function re(){const{submenuPage:l,accessMenus:d,user:s}=S(),o=G();return t.useEffect(()=>{const c=setTimeout(()=>{const i=d==null?void 0:d.some(a=>a.role_id===(s==null?void 0:s.role_id)&&a.menu_id==="b37d4e96-87b0-4480-805e-562ccd798338");console.log(i),i===!1&&o("/403",{replace:!0})},1e4);return()=>clearTimeout(c)},[d,s,o]),e.jsx(e.Fragment,{children:e.jsxs(J,{children:[l==="access"&&e.jsx(W,{}),l==="menu"&&e.jsx(K,{}),l==="submenu"&&e.jsx(Q,{}),l==="role"&&e.jsx(Z,{})]})})}export{re as default};
