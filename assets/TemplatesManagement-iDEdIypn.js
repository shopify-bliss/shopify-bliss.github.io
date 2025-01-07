import{a as g,r,h as D,e as u,j as e,u as k}from"./index-mHmsr8ix.js";import{H as M}from"./SupportDashboard-Uin9v9p4.js";import{t as N,T as C}from"./ValidationSchema-HP-qBNNP.js";import{M as v}from"./Profile-BZslneBf.js";import{L as F}from"./LayoutDashboard-B8CGz9dD.js";import"./AuthSupport-CF7Z4N7m.js";import"./AiBuilderSupport-DUszeaMk.js";import"./black-logo-KPU1N9jl.js";function S({type:n,onOpen:o,onClose:s,refreshData:l,pageId:c}){g.defaults.withCredentials=!0;const[d,a]=r.useState({type:"",icon:"",name_class:""}),{toastMessage:h,toastPromise:x,token:p}=D();r.useEffect(()=>{o&&n==="create"?a({type:"",icon:"",name_class:""}):o&&n==="update"&&g.get(`${u.pagesAiId}?id=${c}`).then(m=>{a(m.data.data)}).catch(m=>{console.error("Error fetching page data:",m)})},[o,n,c,u]);const b=m=>{const{name:i,value:t}=m.target;a({...d,[i]:t})},j=r.useCallback(m=>{m.preventDefault(),n==="create"?N.validate(d,{abortEarly:!1}).then(()=>{const i=g.post(u.pagesAi,d,{headers:{Authorization:`Bearer ${p}`}});x(i,{pending:"Adding page data on progress, please wait..!",success:"Data has been successfully added!",error:"Failed to add data!"},{autoClose:2500,position:"top-center"},()=>{s(),l()}),i.catch(t=>{console.error("Error adding page data:",t)})}).catch(i=>{i.inner.forEach(t=>{h("error",t.message)})}):N.validate(d,{abortEarly:!1}).then(()=>{const i=g.put(`${u.pagesAi}?id=${c}`,d,{headers:{Authorization:`Bearer ${p}`}});x(i,{pending:"Updating page data on progress, please wait..!",success:"Data has been successfully updated!",error:"Failed to update data!"},{autoClose:2500,position:"top-center"},()=>{s(),l()}),i.catch(t=>{console.error("Error updating page data:",t)})}).catch(i=>{i.inner.forEach(t=>{h("error",t.message)})})},[N,d,s,l,h,x,c,p,u]),y=r.useCallback(m=>{m.preventDefault();const i=g.delete(`${u.pagesAi}?id=${c}`,{headers:{Authorization:`Bearer ${p}`}});x(i,{pending:"deleting page data on progress, please wait..!",success:"Data has been successfully deleted!",error:"Failed to delete data!"},{autoClose:2500,position:"top-center"},()=>{s(),l()}),i.catch(t=>{console.error("Error deleting page data:",t)})},[c,p,s,l]);return e.jsx(e.Fragment,{children:n==="delete"?e.jsx(v,{onClose:s,onOpen:o,type:"confirm",titleModal:"Are you sure you want to delete this?",descModal:"Your content will be permanently deleted. This can't be undone.",children:e.jsxs("div",{className:"confirm-dashboard-action",children:[e.jsx("div",{className:"cancel",onClick:s,children:"cancel"}),e.jsx("div",{className:"confirm",onClick:y,children:"delete"})]})}):e.jsx(v,{titleModal:n==="create"?"Insert Page Data":"Update Page Data",onOpen:o,onClose:s,children:e.jsxs("form",{className:"modal-dashboard-form",onSubmit:j,children:[e.jsxs("div",{className:"modal-dashboard-form-group",children:[e.jsxs("label",{htmlFor:"type",children:["Page name ",e.jsx("span",{children:"(Required)"})]}),e.jsx("input",{type:"text",id:"type",name:"type",placeholder:"Home Page",value:d.type,onChange:b})]}),e.jsxs("div",{className:"modal-dashboard-form-group",children:[e.jsxs("label",{htmlFor:"icon",children:["Page icon ",e.jsx("span",{children:"(Required)"})]}),e.jsx("input",{type:"text",id:"icon",name:"icon",placeholder:"home (google material icon)",value:d.icon,onChange:b})]}),e.jsx("button",{type:"submit",children:"Submit"})]})})})}function _({isLoadingTempPages:n,pages:o,setPageId:s,setIsUpdateModalOpen:l,setIsDeleteModalOpen:c,type:d}){return e.jsxs(e.Fragment,{children:[n&&e.jsx("div",{className:"loader-pages",children:e.jsx("div",{className:"loader-pages-item"})}),d==="grid"?e.jsx("div",{className:"temp-pages-grid",children:o.map(a=>e.jsxs("div",{className:"item",children:[e.jsx("span",{className:"material-symbols-rounded item-icon",children:a.icon}),e.jsx("div",{className:"item-name",children:a.type}),e.jsxs("div",{className:"item-action",children:[e.jsx("span",{className:"material-symbols-rounded item-action-edit",onClick:()=>{l(!0),s(a.type_template_id)},children:"edit_square"}),e.jsx("span",{className:"material-symbols-rounded item-action-delete",onClick:()=>{c(!0),s(a.type_template_id)},children:"delete"})]})]},a.type_template_id))}):e.jsxs("div",{className:"temp-pages-list",children:[e.jsxs("div",{className:"head",children:[e.jsx("div",{className:"head-col",children:"No"}),e.jsx("div",{className:"head-col",children:"Icon"}),e.jsx("div",{className:"head-col",children:"Google Material Icon"}),e.jsx("div",{className:"head-col",children:"Name"}),e.jsx("div",{className:"head-col",children:"Action"})]}),o.map((a,h)=>e.jsxs("div",{className:"body",children:[e.jsx("div",{className:"body-col",children:h+1}),e.jsx("span",{className:"material-symbols-rounded body-col",children:a.icon}),e.jsx("div",{className:"body-col",children:a.icon}),e.jsx("div",{className:"body-col",children:a.type}),e.jsxs("div",{className:"body-col",children:[e.jsx("span",{className:"material-symbols-rounded edit",onClick:()=>{l(!0),s(a.type_template_id)},children:"edit_square"}),e.jsx("span",{className:"material-symbols-rounded delete",onClick:()=>{c(!0),s(a.type_template_id)},children:"delete"})]})]},a.type_template_id))]})]})}function P(){g.defaults.withCredentials=!0;const[n,o]=r.useState([]),[s,l]=r.useState(!1),[c,d]=r.useState("grid"),[a,h]=r.useState(!1),[x,p]=r.useState(!1),[b,j]=r.useState(!1),[y,m]=r.useState(null),i=r.useCallback(f=>{d(f)},[]),t=r.useCallback(async()=>{l(!0);try{const f=await g.get(u.pagesAi);o(f.data.data),l(!1)}catch(f){console.error(f),l(!1)}finally{l(!1)}},[u.pagesAi]);return r.useEffect(()=>{t()},[t]),e.jsx(e.Fragment,{children:e.jsxs("div",{className:"temp-pages",children:[e.jsx(M,{className:"temp-pages",title:"Template Management — Pages",activeDisplay:c,handleDisplayChange:i,setIsCreateModalOpen:h}),c==="grid"?e.jsx(_,{isLoadingTempPages:s,pages:n,setPageId:m,setIsUpdateModalOpen:p,setIsDeleteModalOpen:j,type:"grid"}):e.jsx(_,{isLoadingTempPages:s,pages:n,setPageId:m,setIsUpdateModalOpen:p,setIsDeleteModalOpen:j,type:"list"}),e.jsx(S,{type:"create",onOpen:a,onClose:()=>h(!1),refreshData:t}),e.jsx(S,{type:"update",onOpen:x,onClose:()=>p(!1),refreshData:t,pageId:y}),e.jsx(S,{type:"delete",onOpen:b,onClose:()=>j(!1),refreshData:t,pageId:y})]})})}function A({type:n,onOpen:o,onClose:s,refreshData:l,sectionId:c}){g.defaults.withCredentials=!0;const[d,a]=r.useState({name:""}),{toastMessage:h,toastPromise:x,token:p}=D();r.useEffect(()=>{o&&n==="create"?a({name:""}):o&&n==="update"&&g.get(`${u.elementsAiId}?id=${c}`).then(m=>{a(m.data.data[0])}).catch(m=>{console.error("Error fetching section data:",m)})},[o,n,c,u]);const b=m=>{const{name:i,value:t}=m.target;a({...d,[i]:t})},j=r.useCallback(m=>{m.preventDefault(),n==="create"?C.validate(d,{abortEarly:!1}).then(()=>{const i=g.post(u.elementsAi,d,{headers:{Authorization:`Bearer ${p}`}});x(i,{pending:"Adding section data on progress, please wait..!",success:"Data has been successfully added!",error:"Failed to add data!"},{autoClose:2500,position:"top-center"},()=>{s(),l()}),i.catch(t=>{console.error("Error adding section data:",t)})}).catch(i=>{i.inner.forEach(t=>{h("error",t.message)})}):C.validate(d,{abortEarly:!1}).then(()=>{const i=g.put(`${u.elementsAi}?id=${c}`,d,{headers:{Authorization:`Bearer ${p}`}});x(i,{pending:"Updating section data on progress, please wait..!",success:"Data has been successfully updated!",error:"Failed to update data!"},{autoClose:2500,position:"top-center"},()=>{s(),l()}),i.catch(t=>{console.error("Error updating section data:",t)})}).catch(i=>{i.inner.forEach(t=>{h("error",t.message)})})},[C,d,s,l,h,x,c,p,u]),y=r.useCallback(m=>{m.preventDefault();const i=g.delete(`${u.elementsAi}?id=${c}`,{headers:{Authorization:`Bearer ${p}`}});x(i,{pending:"deleting section data on progress, please wait..!",success:"Data has been successfully deleted!",error:"Failed to delete data!"},{autoClose:2500,position:"top-center"},()=>{s(),l()}),i.catch(t=>{console.error("Error deleting section data:",t)})},[c,p,s,l]);return e.jsx(e.Fragment,{children:n==="delete"?e.jsx(v,{onClose:s,onOpen:o,type:"confirm",titleModal:"Are you sure you want to delete this?",descModal:"Your content will be permanently deleted. This can't be undone.",children:e.jsxs("div",{className:"confirm-dashboard-action",children:[e.jsx("div",{className:"cancel",onClick:s,children:"cancel"}),e.jsx("div",{className:"confirm",onClick:y,children:"delete"})]})}):e.jsx(v,{titleModal:n==="create"?"Insert Section Data":"Update Section Data",onOpen:o,onClose:s,children:e.jsxs("form",{className:"modal-dashboard-form",onSubmit:j,children:[e.jsxs("div",{className:"modal-dashboard-form-group",children:[e.jsxs("label",{htmlFor:"name",children:["Section name ",e.jsx("span",{children:"(Required)"})]}),e.jsx("input",{type:"text",id:"name",name:"name",placeholder:"Intro Section",value:d.name,onChange:b})]}),e.jsx("button",{type:"submit",children:"Submit"})]})})})}function E({isLoadingTempSections:n,sections:o,setSectionId:s,setIsUpdateModalOpen:l,setIsDeleteModalOpen:c,type:d}){return e.jsxs(e.Fragment,{children:[n&&e.jsx("div",{className:"loader-pages",children:e.jsx("div",{className:"loader-pages-item"})}),d==="grid"?e.jsx("div",{className:"temp-sections-grid",children:o.map(a=>e.jsxs("div",{className:"item",children:[e.jsx("div",{className:"item-name",children:a.name}),e.jsxs("div",{className:"item-action",children:[e.jsx("span",{className:"material-symbols-rounded item-action-edit",onClick:()=>{l(!0),s(a.section_id)},children:"edit_square"}),e.jsx("span",{className:"material-symbols-rounded item-action-delete",onClick:()=>{c(!0),s(a.section_id)},children:"delete"})]})]},a.section_id))}):e.jsxs("div",{className:"temp-sections-list",children:[e.jsxs("div",{className:"head",children:[e.jsx("div",{className:"head-col",children:"No"}),e.jsx("div",{className:"head-col",children:"Name"}),e.jsx("div",{className:"head-col",children:"Action"})]}),o.map((a,h)=>e.jsxs("div",{className:"body",children:[e.jsx("div",{className:"body-col",children:h+1}),e.jsx("div",{className:"body-col",children:a.name}),e.jsxs("div",{className:"body-col",children:[e.jsx("span",{className:"material-symbols-rounded edit",onClick:()=>{l(!0),s(a.section_id)},children:"edit_square"}),e.jsx("span",{className:"material-symbols-rounded delete",onClick:()=>{c(!0),s(a.section_id)},children:"delete"})]})]},a.section_id))]})]})}function w(){g.defaults.withCredentials=!0;const[n,o]=r.useState([]),[s,l]=r.useState(!1),[c,d]=r.useState("grid"),[a,h]=r.useState(!1),[x,p]=r.useState(!1),[b,j]=r.useState(!1),[y,m]=r.useState(null),i=r.useCallback(f=>{d(f)},[]),t=r.useCallback(async()=>{l(!0);try{const f=await g.get(u.elementsAi);o(f.data.data),l(!1)}catch(f){console.error(f),l(!1)}finally{l(!1)}},[u.elementsAi]);return r.useEffect(()=>{t()},[]),e.jsx(e.Fragment,{children:e.jsxs("div",{className:"temp-sections",children:[e.jsx(M,{className:"temp-sections",title:"Template Management — Sections",activeDisplay:c,handleDisplayChange:i,setIsCreateModalOpen:h}),c==="grid"?e.jsx(E,{isLoadingTempSections:s,sections:n,setSectionId:m,setIsUpdateModalOpen:p,setIsDeleteModalOpen:j,type:"grid"}):e.jsx(E,{isLoadingTempSections:s,sections:n,setSectionId:m,setIsUpdateModalOpen:p,setIsDeleteModalOpen:j,type:"list"}),e.jsx(A,{type:"create",onOpen:a,onClose:()=>h(!1),refreshData:t}),e.jsx(A,{type:"update",onOpen:x,onClose:()=>p(!1),refreshData:t,sectionId:y}),e.jsx(A,{type:"delete",onOpen:b,onClose:()=>j(!1),refreshData:t,sectionId:y})]})})}function T(){return e.jsx(e.Fragment,{children:e.jsx("div",{children:"Colors"})})}function $(){return e.jsx(e.Fragment,{children:e.jsx("div",{children:"Fonts"})})}function V(){const{submenuPage:n,accessMenus:o,user:s}=D(),l=k();return r.useEffect(()=>{const c=setTimeout(()=>{(o==null?void 0:o.some(a=>a.role_id===(s==null?void 0:s.role_id)&&a.menu_id==="e0c2b209-08c0-4c8b-ae0d-77f86b088879"))===!1&&l("/403",{replace:!0})},1e4);return()=>clearTimeout(c)},[o,s,l]),e.jsx(e.Fragment,{children:e.jsxs(F,{children:[n==="overview"&&e.jsx("span",{children:"test"}),n==="pages"&&e.jsx(P,{}),n==="sections"&&e.jsx(w,{}),n==="colors"&&e.jsx(T,{}),n==="fonts"&&e.jsx($,{})]})})}export{V as default};
