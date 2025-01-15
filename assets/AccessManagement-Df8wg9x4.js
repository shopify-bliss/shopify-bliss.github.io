import{a as g,r as t,h as S,e as v,j as e,i as L,k as R,L as T,u as Q}from"./index-BLOQ8UXG.js";import{L as W}from"./LayoutDashboard-Dz0qO7u_.js";import{H as F}from"./SupportDashboard-BzR7KOuZ.js";import{M as O,S as z,A as Y,R as B}from"./ValidationSchema-Cjc3T-T2.js";import{M as A}from"./Profile-u7nIDfV3.js";import"./AiBuilderSupport-CQgpAMnV.js";import"./black-logo-KPU1N9jl.js";import"./AuthSupport-B8dEn6s0.js";function q({type:r,onOpen:c,onClose:a,refreshData:u,menuId:d}){g.defaults.withCredentials=!0;const[i,p]=t.useState({name:"",url:""}),{toastMessage:s,toastPromise:l,token:x}=S();t.useEffect(()=>{c&&r==="create"?p({name:"",url:""}):c&&r==="update"&&g.get(`${v.menusId}?id=${d}`).then(o=>{p(o.data.data[0])}).catch(o=>{console.error("Error fetching menu data:",o)})},[c,r,d,v]);const m=o=>{const{name:n,value:h}=o.target;p({...i,[n]:h})},b=t.useCallback(o=>{o.preventDefault(),r==="create"?O.validate(i,{abortEarly:!1}).then(()=>{const n=g.post(v.menus,i,{headers:{Authorization:`Bearer ${x}`}});l(n,{pending:"Adding menu data on progress, please wait..!",success:"Data has been successfully added!",error:"Failed to add data!"},{autoClose:2500,position:"top-center"},()=>{a(),u()}),n.catch(h=>{console.error("Error adding menu data:",h)})}).catch(n=>{n.inner.forEach(h=>{s("error",h.message)})}):O.validate(i,{abortEarly:!1}).then(()=>{const n=g.put(`${v.menus}?id=${d}`,i,{headers:{Authorization:`Bearer ${x}`}});l(n,{pending:"Updating menu data on progress, please wait..!",success:"Data has been successfully updated!",error:"Failed to update data!"},{autoClose:2500,position:"top-center"},()=>{a(),u()}),n.catch(h=>{console.error("Error updating menu data:",h)})}).catch(n=>{n.inner.forEach(h=>{s("error",h.message)})})},[O,i,a,u,s,l,d,x,v]),j=t.useCallback(o=>{o.preventDefault();const n=g.delete(`${v.menus}?id=${d}`,{headers:{Authorization:`Bearer ${x}`}});l(n,{pending:"deleting menu data on progress, please wait..!",success:"Data has been successfully deleted!",error:"Failed to delete data!"},{autoClose:2500,position:"top-center"},()=>{a(),u()}),n.catch(h=>{console.error("Error deleting menu data:",h)})},[d,x,a,u]);return e.jsx(e.Fragment,{children:r==="delete"?e.jsx(A,{onClose:a,onOpen:c,type:"confirm",titleModal:"Are you sure you want to delete this?",descModal:"Your content will be permanently deleted. This can't be undone.",children:e.jsxs("div",{className:"confirm-dashboard-action",children:[e.jsx("div",{className:"cancel",onClick:a,children:"cancel"}),e.jsx("div",{className:"confirm",onClick:j,children:"delete"})]})}):e.jsx(A,{titleModal:r==="create"?"Insert Menu Data":"Update Menu Data",onOpen:c,onClose:a,children:e.jsxs("form",{className:"modal-dashboard-form",onSubmit:b,children:[e.jsxs("div",{className:"modal-dashboard-form-group",children:[e.jsxs("label",{htmlFor:"name",children:["Menu name ",e.jsx("span",{children:"(Required)"})]}),e.jsx("input",{type:"text",id:"name",name:"name",placeholder:"Access Management",value:i.name,onChange:m})]}),e.jsxs("div",{className:"modal-dashboard-form-group",children:[e.jsxs("label",{htmlFor:"url",children:["Menu url ",e.jsx("span",{children:"(Required)"})]}),e.jsx("input",{type:"text",id:"url",name:"url",placeholder:"access-management",value:i.url,onChange:m})]}),e.jsx("button",{type:"submit",children:"Submit"})]})})})}function H({isLoadingDashboard:r,menus:c,setMenuId:a,setIsUpdateModalOpen:u,setIsDeleteModalOpen:d,type:i}){const{search:p}=L();return e.jsxs(e.Fragment,{children:[r&&e.jsx(R,{}),i==="grid"?e.jsx("div",{className:"menu-man-grid",children:c.filter(s=>{const l=p.toLowerCase();return s.name.toLowerCase().includes(l)||s.url.toLowerCase().includes(l)}).map(s=>e.jsxs("div",{className:"item",children:[e.jsx("div",{className:"item-name",children:s.name}),e.jsx(T,{to:`/${s.url}`,className:"item-url",children:s.url}),e.jsxs("div",{className:"item-action",children:[e.jsx("span",{className:"material-symbols-rounded item-action-edit",onClick:()=>{u(!0),a(s.menu_id)},children:"edit_square"}),e.jsx("span",{className:"material-symbols-rounded item-action-delete",onClick:()=>{d(!0),a(s.menu_id)},children:"delete"})]})]},s.menu_id))}):e.jsxs("div",{className:"menu-man-list",children:[e.jsxs("div",{className:"head",children:[e.jsx("div",{className:"head-col",children:"No"}),e.jsx("div",{className:"head-col",children:"Name"}),e.jsx("div",{className:"head-col",children:"Url"}),e.jsx("div",{className:"head-col",children:"Action"})]}),c.filter(s=>{const l=p.toLowerCase();return s.name.toLowerCase().includes(l)||s.url.toLowerCase().includes(l)}).map((s,l)=>e.jsxs("div",{className:"body",children:[e.jsx("div",{className:"body-col",children:l+1}),e.jsx("div",{className:"body-col",children:s.name}),e.jsx(T,{to:`/${s.url}`,className:"body-col",children:s.url}),e.jsxs("div",{className:"body-col",children:[e.jsx("span",{className:"material-symbols-rounded edit",onClick:()=>{u(!0),a(s.menu_id)},children:"edit_square"}),e.jsx("span",{className:"material-symbols-rounded delete",onClick:()=>{d(!0),a(s.menu_id)},children:"delete"})]})]},s.menu_id))]})]})}function Z(){g.defaults.withCredentials=!0;const[r,c]=t.useState("grid"),[a,u]=t.useState(!1),[d,i]=t.useState(!1),[p,s]=t.useState(!1),[l,x]=t.useState(null),{menus:m,fetchDashboardData:b,isLoadingDashboard:j}=S(),o=t.useCallback(n=>{c(n)},[]);return e.jsx(e.Fragment,{children:e.jsxs("div",{className:"menu-man",children:[e.jsx(F,{className:"menu-man",title:"Menu Management — Menus",activeDisplay:r,handleDisplayChange:o,setIsCreateModalOpen:u}),r==="grid"?e.jsx(H,{isLoadingDashboard:j,menus:m,setMenuId:x,setIsUpdateModalOpen:i,setIsDeleteModalOpen:s,type:"grid"}):e.jsx(H,{isLoadingDashboard:j,menus:m,setMenuId:x,setIsUpdateModalOpen:i,setIsDeleteModalOpen:s,type:"list"}),e.jsx(q,{type:"create",onOpen:a,onClose:()=>u(!1),refreshData:b}),e.jsx(q,{type:"update",onOpen:d,onClose:()=>i(!1),refreshData:b,menuId:l}),e.jsx(q,{type:"delete",onOpen:p,onClose:()=>s(!1),refreshData:b,menuId:l})]})})}function U({type:r,onOpen:c,onClose:a,refreshData:u,submenuId:d}){g.defaults.withCredentials=!0;const[i,p]=t.useState(!1),[s,l]=t.useState(""),[x,m]=t.useState(!1),[b,j]=t.useState(""),o=t.useRef(null),{toastMessage:n,toastPromise:h,menus:_,token:y}=S(),C=t.useCallback(N=>{o.current&&!o.current.contains(N.target)&&p(!1)},[o]);t.useEffect(()=>(i?document.addEventListener("mousedown",C):document.removeEventListener("mousedown",C),()=>{document.removeEventListener("mousedown",C)}),[i]),t.useEffect(()=>{c&&r==="create"?(j(""),l(""),m(!1)):c&&r==="update"&&g.get(`${v.submenusId}?id=${d}`,{headers:{Authorization:`Bearer ${y}`}}).then(N=>{j(N.data.data.name),l(N.data.data.menu_id),m(N.data.data.default)}).catch(N=>{console.error("Error fetching submenu data:",N)})},[c,r,d,y,v.submenusId]);const w=t.useCallback(N=>{N.preventDefault();const k={menuID:s,name:b,defaults:x};r==="create"?z.validate(k,{abortEarly:!1}).then(()=>{const D=g.post(v.submenus,k,{headers:{Authorization:`Bearer ${y}`}});h(D,{pending:"Adding submenu data on progress, please wait..!",success:"Data has been successfully added!",error:"Failed to add data!"},{autoClose:2500,position:"top-center"},()=>{a(),u()}),D.catch(f=>{console.error("Error adding submenu data:",f)})}).catch(D=>{D.inner.forEach(f=>{n("error",f.message)})}):z.validate(k,{abortEarly:!1}).then(()=>{const D=g.put(`${v.submenus}?id=${d}`,k,{headers:{Authorization:`Bearer ${y}`}});h(D,{pending:"Updating submenu data on progress, please wait..!",success:"Data has been successfully updated!",error:"Failed to update data!"},{autoClose:2500,position:"top-center"},()=>{a(),u()}),D.catch(f=>{console.error("Error updating submenu data:",f)})}).catch(D=>{D.inner.forEach(f=>{n("error",f.message)})})},[z,b,s,x,a,u,n,h,y,d,v.submenus]),M=t.useCallback(N=>{N.preventDefault();const k=g.delete(`${v.submenus}?id=${d}`,{headers:{Authorization:`Bearer ${y}`}});h(k,{pending:"deleting submenu data on progress, please wait..!",success:"Data has been successfully deleted!",error:"Failed to delete data!"},{autoClose:2500,position:"top-center"},()=>{a(),u()}),k.catch(D=>{console.error("Error deleting submenu data:",D)})},[y,d,a,u,v.submenus,h]);return e.jsx(e.Fragment,{children:r==="delete"?e.jsx(A,{onClose:a,onOpen:c,type:"confirm",titleModal:"Are you sure you want to delete this?",descModal:"Your content will be permanently deleted. This can't be undone.",children:e.jsxs("div",{className:"confirm-dashboard-action",children:[e.jsx("div",{className:"cancel",onClick:a,children:"cancel"}),e.jsx("div",{className:"confirm",onClick:M,children:"delete"})]})}):e.jsx(A,{titleModal:r==="create"?"Insert Submenu Data":"Update Submenu Data",onOpen:c,onClose:a,children:e.jsxs("form",{className:"modal-dashboard-form",onSubmit:w,children:[e.jsxs("div",{className:"modal-dashboard-form-group",children:[e.jsxs("div",{className:"label",children:["Menu Parent ",e.jsx("span",{children:"(Required)"})]}),e.jsxs("div",{className:"select-default",onClick:()=>p(!0),children:[e.jsx("div",{className:"text",children:s===""?"Select Menu Parent":_.filter(N=>N.menu_id===s).map(N=>N.name)}),e.jsx("span",{className:`material-symbols-outlined ${i?"default-closed":""}`,children:"south_east"})]}),i&&e.jsx("div",{className:"select-list",ref:o,children:_.filter(N=>N.menu_id!==s).map(N=>e.jsx("div",{className:"select-list-item",onClick:()=>{l(N.menu_id),p(!1)},children:e.jsx("div",{className:"name",children:N.name})},N.menu_id))})]}),e.jsxs("div",{className:"modal-dashboard-form-group",children:[e.jsxs("label",{htmlFor:"name",children:["Submenu Name ",e.jsx("span",{children:"(Required)"})]}),e.jsx("input",{type:"text",id:"name",name:"name",placeholder:"Analytics XX",value:b,onChange:N=>j(N.target.value)})]}),e.jsxs("div",{className:"modal-dashboard-form-group",children:[e.jsxs("div",{className:"label",children:["Setting Default ",e.jsx("span",{children:"(Required)"})]}),e.jsxs("div",{className:"check-default",onClick:()=>m(!x),children:[e.jsx("span",{class:"material-symbols-outlined",children:x?"task_alt":"circle"}),e.jsx("div",{className:"text",children:x?"True":"Null"})]})]}),e.jsx("button",{type:"submit",children:"Submit"})]})})})}function X({isLoadingDashboard:r,submenus:c,setSubmenuId:a,setIsUpdateModalOpen:u,setIsDeleteModalOpen:d,type:i}){const{search:p}=L();return e.jsxs(e.Fragment,{children:[r&&e.jsx(R,{}),i==="grid"?e.jsx("div",{className:"submenu-man-grid",children:c.filter(s=>{const l=p.toLowerCase();return s.name.toLowerCase().includes(l)||s.menus.url.toLowerCase().includes(l)}).map(s=>e.jsxs("div",{className:"item",children:[e.jsx("div",{className:"item-name",children:s.name}),e.jsx(T,{className:"item-menu",to:`/${s.menus.url}`,children:s.menus.url}),e.jsxs("div",{className:"item-action",children:[s.default===!0?e.jsx(e.Fragment,{children:e.jsxs("div",{className:"item-action-default",children:[e.jsx("span",{className:"material-symbols-outlined item-action-default-icon",children:"settings"}),e.jsx("span",{className:"item-action-default-text",children:"Default"})]})}):null,e.jsx("span",{className:"material-symbols-rounded item-action-edit",onClick:()=>{u(!0),a(s.sub_menu_id)},children:"edit_square"}),e.jsx("span",{className:"material-symbols-rounded item-action-delete",onClick:()=>{d(!0),a(s.sub_menu_id)},children:"delete"})]})]},s.sub_menu_id))}):e.jsxs("div",{className:"submenu-man-list",children:[e.jsxs("div",{className:"head",children:[e.jsx("div",{className:"head-col",children:"No"}),e.jsx("div",{className:"head-col",children:"Name"}),e.jsx("div",{className:"head-col",children:"Menu"}),e.jsx("div",{className:"head-col",children:"Default"}),e.jsx("div",{className:"head-col",children:"Action"})]}),c.filter(s=>{const l=p.toLowerCase();return s.name.toLowerCase().includes(l)||s.menus.url.toLowerCase().includes(l)}).map((s,l)=>e.jsxs("div",{className:"body",children:[e.jsx("div",{className:"body-col",children:l+1}),e.jsx("div",{className:"body-col",children:s.name}),e.jsx("div",{className:"body-col",children:s.menus.name}),e.jsx("div",{className:"body-col",children:s.default===!0?e.jsx("span",{className:"default",children:"Default"}):e.jsx("span",{className:"nope",children:"-"})}),e.jsxs("div",{className:"body-col",children:[e.jsx("span",{className:"material-symbols-rounded edit",onClick:()=>{u(!0),a(s.sub_menu_id)},children:"edit_square"}),e.jsx("span",{className:"material-symbols-rounded delete",onClick:()=>{d(!0),a(s.sub_menu_id)},children:"delete"})]})]},s.sub_menu_id))]})]})}function I(){g.defaults.withCredentials=!0;const[r,c]=t.useState("grid"),[a,u]=t.useState(!1),[d,i]=t.useState(!1),[p,s]=t.useState(!1),[l,x]=t.useState(null),{submenus:m,fetchDashboardData:b,isLoadingDashboard:j}=S(),o=t.useCallback(n=>{c(n)},[]);return e.jsx(e.Fragment,{children:e.jsxs("div",{className:"submenu-man",children:[e.jsx(F,{className:"submenu-man",title:"Menu Management — Submenus",activeDisplay:r,handleDisplayChange:o,setIsCreateModalOpen:u}),r==="grid"?e.jsx(X,{isLoadingDashboard:j,submenus:m,setSubmenuId:x,setIsUpdateModalOpen:i,setIsDeleteModalOpen:s,type:"grid"}):e.jsx(X,{isLoadingDashboard:j,submenus:m,setSubmenuId:x,setIsUpdateModalOpen:i,setIsDeleteModalOpen:s,type:"list"}),e.jsx(U,{type:"create",onOpen:a,onClose:()=>u(!1),refreshData:b}),e.jsx(U,{type:"update",onOpen:d,onClose:()=>i(!1),refreshData:b,submenuId:l}),e.jsx(U,{type:"delete",onOpen:p,onClose:()=>s(!1),refreshData:b,submenuId:l})]})})}function G({type:r,onOpen:c,onClose:a,refreshData:u,accessId:d,roles:i}){g.defaults.withCredentials=!0;const[p,s]=t.useState(!1),[l,x]=t.useState(!1),[m,b]=t.useState(""),[j,o]=t.useState(""),n=t.useRef(null),h=t.useRef(null),{toastMessage:_,toastPromise:y,menus:C,token:w,fetchDashboardData:M}=S(),N=t.useCallback(f=>{n.current&&!n.current.contains(f.target)?s(!1):h.current&&!h.current.contains(f.target)&&x(!1)},[n,h]);t.useEffect(()=>(p||l?document.addEventListener("mousedown",N):document.removeEventListener("mousedown",N),()=>{document.removeEventListener("mousedown",N)}),[p,l,N]),t.useEffect(()=>{c&&r==="create"&&(o(""),b(""))},[c,r]);const k=t.useCallback(f=>{f.preventDefault();const $={menuID:m,roleID:j};Y.validate($,{abortEarly:!1}).then(()=>{const E=g.post(v.accessManagement,$,{headers:{Authorization:`Bearer ${w}`}});y(E,{pending:"Adding access data on progress, please wait..!",success:"Data has been successfully added!",error:"Failed to add data!"},{autoClose:2500,position:"top-center"},()=>{a(),M()}),E.catch(P=>{console.error("Error adding access data:",P)})}).catch(E=>{E.inner.forEach(P=>{_("error",P.message)})})},[Y,j,m,a,M,w,d,_,y]),D=t.useCallback(f=>{f.preventDefault();const $=g.delete(`${v.accessManagement}?id=${d}`,{headers:{Authorization:`Bearer ${w}`}});y($,{pending:"deleting access data on progress, please wait..!",success:"Data has been successfully deleted!",error:"Failed to delete data!"},{autoClose:2500,position:"top-center"},()=>{a(),M()}),$.catch(E=>{console.error("Error deleting access data:",E)})},[w,y,d,a,M]);return e.jsx(e.Fragment,{children:r==="delete"?e.jsx(A,{onClose:a,onOpen:c,type:"confirm",titleModal:"Are you sure you want to delete this?",descModal:"Your content will be permanently deleted. This can't be undone.",children:e.jsxs("div",{className:"confirm-dashboard-action",children:[e.jsx("div",{className:"cancel",onClick:a,children:"cancel"}),e.jsx("div",{className:"confirm",onClick:D,children:"delete"})]})}):e.jsx(A,{titleModal:"Insert Access Data",onOpen:c,onClose:a,children:e.jsxs("form",{className:"modal-dashboard-form",onSubmit:k,children:[e.jsxs("div",{className:"modal-dashboard-form-group",children:[e.jsxs("div",{className:"label",children:["Role ",e.jsx("span",{children:"(Required)"})]}),e.jsxs("div",{className:"select-default",onClick:()=>x(!0),children:[e.jsx("div",{className:"text",children:j===""?"Choose Role":i.filter(f=>f.role_id===j).map(f=>f.role_name)}),e.jsx("span",{className:`material-symbols-outlined ${l?"default-closed":""}`,children:"south_east"})]}),l&&e.jsx("div",{className:"select-list no-more",ref:h,children:i.filter(f=>f.role_id!==j).map(f=>e.jsx("div",{className:"select-list-item",onClick:()=>{o(f.role_id),x(!1)},children:e.jsx("div",{className:"name",children:f.role_name})},f.role_id))})]}),e.jsxs("div",{className:"modal-dashboard-form-group",children:[e.jsxs("div",{className:"label",children:["Menu ",e.jsx("span",{children:"(Required)"})]}),e.jsxs("div",{className:"select-default",onClick:()=>s(!0),children:[e.jsx("div",{className:"text",children:m===""?"Choose Menu":C.filter(f=>f.menu_id===m).map(f=>f.name)}),e.jsx("span",{className:`material-symbols-outlined ${p?"default-closed":""}`,children:"south_east"})]}),p&&e.jsx("div",{className:"select-list",ref:n,children:C.filter(f=>f.menu_id!==m).map(f=>e.jsx("div",{className:"select-list-item",onClick:()=>{b(f.menu_id),s(!1)},children:e.jsx("div",{className:"name",children:f.name})},f.menu_id))})]}),e.jsx("button",{type:"submit",children:"Submit"})]})})})}function J({accessMenus:r,setAccessId:c,setIsDeleteModalOpen:a,type:u,menus:d,activeRole:i,handleActiveRole:p,roles:s,isLoadingDashboard:l}){const{search:x}=L();return e.jsxs(e.Fragment,{children:[l&&e.jsx(R,{}),e.jsxs("div",{className:"access-man-wrapper",children:[e.jsx("div",{className:"access-man-roles",children:s.length>0?s.filter(m=>{const b=x.toLowerCase();return m.role_name.toLowerCase().includes(b)}).map(m=>e.jsx("div",{className:`role ${i===m.role_id?"active":""}`,onClick:()=>p(m.role_id),children:m.role_name},m.role_id)):null}),u==="grid"?e.jsx("div",{className:"access-man-grid",children:d.map(m=>{const b=r.find(o=>o.menu_id===m.menu_id&&o.role_id===i),j=!!b;return e.jsxs("div",{className:"item",children:[e.jsx("div",{className:"item-name",children:m.name}),e.jsx("span",{className:"material-symbols-outlined item-check",children:j?"task_alt":"circle"}),e.jsx("div",{className:"item-action",children:j&&e.jsx("span",{className:"material-symbols-rounded item-action-delete",onClick:()=>{a(!0),c(b.access_id)},children:"delete"})})]},m.menu_id)})}):e.jsxs("div",{className:"access-man-list",children:[e.jsxs("div",{className:"head",children:[e.jsx("div",{className:"head-col",children:"No"}),e.jsx("div",{className:"head-col",children:"Menu"}),e.jsx("div",{className:"head-col",children:"Access"}),e.jsx("div",{className:"head-col",children:"Action"})]}),d.map((m,b)=>{const j=r.find(n=>n.menu_id===m.menu_id&&n.role_id===i),o=!!j;return e.jsxs("div",{className:"body",children:[e.jsx("div",{className:"body-col",children:b+1}),e.jsx("div",{className:"body-col",children:m.name}),e.jsx("div",{className:"body-col material-symbols-outlined",children:o?"task_alt":"circle"}),e.jsx("div",{className:"body-col",children:o&&e.jsx("span",{className:"material-symbols-rounded delete",onClick:()=>{a(!0),c(j.access_id)},children:"delete"})})]},m.menu_id)})]})]})]})}function ee(){g.defaults.withCredentials=!0;const[r,c]=t.useState("3de65f44-6341-4b4d-8d9f-c8ca3ea80b80"),[a,u]=t.useState([]),[d,i]=t.useState("list"),[p,s]=t.useState(!1),[l,x]=t.useState(!1),[m,b]=t.useState(null),{accessMenus:j,menus:o,token:n,isLoadingDashboard:h,setDashboardLoader:_}=S(),y=t.useCallback(M=>{i(M)},[]),C=t.useCallback(M=>{c(M)},[]),w=t.useCallback(async()=>{_(!0);try{const M=await g.get(v.role,{headers:{Authorization:`Bearer ${n}`}});console.log(M.data.data),u(M.data.data)}catch(M){console.error(M)}finally{_(!1)}},[n,_]);return t.useEffect(()=>{w()},[w]),e.jsx(e.Fragment,{children:e.jsxs("div",{className:"access-man",children:[e.jsx(F,{className:"access-man",title:"Menu Management — Access Menu",activeDisplay:d,handleDisplayChange:y,setIsCreateModalOpen:s}),d==="grid"?e.jsx(J,{roles:a,isLoadingDashboard:h,accessMenus:j,setAccessId:b,setIsDeleteModalOpen:x,type:"grid",menus:o,activeRole:r,handleActiveRole:C}):e.jsx(J,{roles:a,isLoadingDashboard:h,accessMenus:j,setAccessId:b,setIsDeleteModalOpen:x,type:"list",menus:o,activeRole:r,handleActiveRole:C}),e.jsx(G,{type:"create",onOpen:p,onClose:()=>s(!1),roles:a}),e.jsx(G,{type:"delete",onOpen:l,onClose:()=>x(!1),accessId:m,roles:a})]})})}function V({type:r,onOpen:c,onClose:a,refreshData:u,roleId:d}){g.defaults.withCredentials=!0;const[i,p]=t.useState({roleName:""}),{toastMessage:s,toastPromise:l,token:x}=S();t.useEffect(()=>{c&&r==="create"?p({roleName:""}):c&&r==="update"&&g.get(`${v.roleId}?id=${d}`,{headers:{Authorization:`Bearer ${x}`}}).then(o=>{console.log(o.data.data),p({roleName:o.data.data.role_name})}).catch(o=>{console.error("Error fetching role data:",o)})},[c,r,d,x,v]);const m=o=>{const{name:n,value:h}=o.target;p({...i,[n]:h})},b=t.useCallback(o=>{o.preventDefault(),r==="create"?B.validate(i,{abortEarly:!1}).then(()=>{const n=g.post(v.role,i,{headers:{Authorization:`Bearer ${x}`}});l(n,{pending:"Adding role data on progress, please wait..!",success:"Data has been successfully added!",error:"Failed to add data!"},{autoClose:2500,position:"top-center"},()=>{a(),u()}),n.catch(h=>{console.error("Error adding role data:",h)})}).catch(n=>{n.inner.forEach(h=>{s("error",h.message)})}):B.validate(i,{abortEarly:!1}).then(()=>{const n=g.put(`${v.role}?id=${d}`,i,{headers:{Authorization:`Bearer ${x}`}});l(n,{pending:"Updating role data on progress, please wait..!",success:"Data has been successfully updated!",error:"Failed to update data!"},{autoClose:2500,position:"top-center"},()=>{a(),u()}),n.catch(h=>{console.error("Error updating role data:",h)})}).catch(n=>{n.inner.forEach(h=>{s("error",h.message)})})},[B,i,x,a,u,s,l,d,v]),j=t.useCallback(o=>{o.preventDefault();const n=g.delete(`${v.role}?id=${d}`,{headers:{Authorization:`Bearer ${x}`}});l(n,{pending:"deleting role data on progress, please wait..!",success:"Data has been successfully deleted!",error:"Failed to delete data!"},{autoClose:2500,position:"top-center"},()=>{a(),u()}),n.catch(h=>{console.error("Error deleting role data:",h)})},[d,x,a,u,l,v]);return e.jsx(e.Fragment,{children:r==="delete"?e.jsx(A,{onClose:a,onOpen:c,type:"confirm",titleModal:"Are you sure you want to delete this?",descModal:"Your content will be permanently deleted. This can't be undone.",children:e.jsxs("div",{className:"confirm-dashboard-action",children:[e.jsx("div",{className:"cancel",onClick:a,children:"cancel"}),e.jsx("div",{className:"confirm",onClick:j,children:"delete"})]})}):e.jsx(A,{titleModal:r==="create"?"Insert Role Data":"Update Role Data",onOpen:c,onClose:a,children:e.jsxs("form",{className:"modal-dashboard-form",onSubmit:b,children:[e.jsxs("div",{className:"modal-dashboard-form-group",children:[e.jsxs("label",{htmlFor:"roleName",children:["Role name ",e.jsx("span",{children:"(Required)"})]}),e.jsx("input",{type:"text",id:"roleName",name:"roleName",placeholder:"Admin",value:i.roleName,onChange:m})]}),e.jsx("button",{type:"submit",children:"Submit"})]})})})}function K({isLoadingDashboard:r,roles:c,setRoleId:a,setIsUpdateModalOpen:u,setIsDeleteModalOpen:d,type:i}){const{search:p}=L();return e.jsxs(e.Fragment,{children:[r&&e.jsx(R,{}),i==="grid"?e.jsx("div",{className:"role-man-grid",children:c.filter(s=>{const l=p.toLowerCase();return s.role_name.toLowerCase().includes(l)}).map(s=>e.jsxs("div",{className:"item",children:[e.jsx("div",{className:"item-name",children:s.role_name}),e.jsxs("div",{className:"item-action",children:[e.jsx("span",{className:"material-symbols-rounded item-action-edit",onClick:()=>{u(!0),a(s.role_id)},children:"edit_square"}),e.jsx("span",{className:"material-symbols-rounded item-action-delete",onClick:()=>{d(!0),a(s.role_id)},children:"delete"})]})]},s.role_id))}):e.jsxs("div",{className:"role-man-list",children:[e.jsxs("div",{className:"head",children:[e.jsx("div",{className:"head-col",children:"No"}),e.jsx("div",{className:"head-col",children:"Name"}),e.jsx("div",{className:"head-col",children:"Action"})]}),c.filter(s=>{const l=p.toLowerCase();return s.role_name.toLowerCase().includes(l)}).map((s,l)=>e.jsxs("div",{className:"body",children:[e.jsx("div",{className:"body-col",children:l+1}),e.jsx("div",{className:"body-col",children:s.role_name}),e.jsxs("div",{className:"body-col",children:[e.jsx("span",{className:"material-symbols-rounded edit",onClick:()=>{u(!0),a(s.role_id)},children:"edit_square"}),e.jsx("span",{className:"material-symbols-rounded delete",onClick:()=>{d(!0),a(s.role_id)},children:"delete"})]})]},s.role_id))]})]})}function se(){g.defaults.withCredentials=!0;const[r,c]=t.useState([]),[a,u]=t.useState("grid"),[d,i]=t.useState(!1),[p,s]=t.useState(!1),[l,x]=t.useState(!1),[m,b]=t.useState(null),{fetchDashboardData:j,token:o,isLoadingDashboard:n,setDashboardLoader:h}=S(),_=t.useCallback(C=>{u(C)},[]),y=t.useCallback(async()=>{h(!0);try{const C=await g.get(v.role,{headers:{Authorization:`Bearer ${o}`}});c(C.data.data)}catch(C){console.error("Error fetching roles:",C)}finally{h(!1)}},[o]);return t.useEffect(()=>{y()},[y]),e.jsx(e.Fragment,{children:e.jsxs("div",{className:"role-man",children:[e.jsx(F,{className:"role-man",title:"Role Management — Roles",activeDisplay:a,handleDisplayChange:_,setIsCreateModalOpen:i}),a==="grid"?e.jsx(K,{isLoadingDashboard:n,roles:r,setRoleId:b,setIsUpdateModalOpen:s,setIsDeleteModalOpen:x,type:"grid"}):e.jsx(K,{isLoadingDashboard:n,roles:r,setRoleId:b,setIsUpdateModalOpen:s,setIsDeleteModalOpen:x,type:"list"}),e.jsx(V,{type:"create",onOpen:d,onClose:()=>i(!1),refreshData:j}),e.jsx(V,{type:"update",onOpen:p,onClose:()=>s(!1),refreshData:j,roleId:m}),e.jsx(V,{type:"delete",onOpen:l,onClose:()=>x(!1),refreshData:j,roleId:m})]})})}function oe(){const{submenuPage:r,accessMenus:c,user:a}=S(),u=Q();return t.useEffect(()=>{const d=setTimeout(()=>{(c==null?void 0:c.some(p=>p.role_id===(a==null?void 0:a.role_id)&&p.menu_id==="b37d4e96-87b0-4480-805e-562ccd798338"))===!1&&u("/403",{replace:!0})},1e4);return()=>clearTimeout(d)},[c,a,u]),e.jsx(e.Fragment,{children:e.jsxs(W,{children:[r==="access"&&e.jsx(ee,{}),r==="menu"&&e.jsx(Z,{}),r==="submenu"&&e.jsx(I,{}),r==="role"&&e.jsx(se,{})]})})}export{oe as default};