import{h as f,i as x,f as e,r as i,N as p,b as k,u as L,C,L as _}from"./index-BZSCxJql.js";import{L as M}from"./AiBuilderSupport-DIRpQrrE.js";import y from"./Profile-CEge5jb3.js";function E(){const{menus:n,accessMenus:t}=f(),{decoded:o}=x();return e.jsx("div",{className:"layout-dashboard-sidebar",children:n.map(a=>{const c=t.filter(l=>l.role===(o==null?void 0:o.role)&&l.menu_id===a.menu_id&&a.menu_id!=="6556df8f-7cd6-4848-b39f-1e6ab4973311");return e.jsx(i.Fragment,{children:c.map(l=>e.jsxs(p,{to:`/${a.url}`,className:"sidebar-list",children:[e.jsx("div",{className:"sidebar-list-item",children:a.name}),e.jsx("div",{className:"border-effect"})]},l.access_id))},a.menu_id)})})}const P="/assets/pexels-alancabello-1291515-DHvgex6l.jpg";function D(){const[n,t]=i.useState(!1),[o,a]=i.useState(!1),c=i.useRef(null),{submenus:l,activeMenu:h,handleSubmenuPage:v,submenuPage:j,toastDevelop:r,menus:g}=f(),{token:m,decoded:u}=x();k();const N=L(),d=i.useCallback(s=>{c.current&&!c.current.contains(s.target)&&t(!1)},[c]);i.useEffect(()=>(n?document.addEventListener("mousedown",d):document.removeEventListener("mousedown",d),()=>{document.removeEventListener("mousedown",d)}),[n]);const b=i.useCallback(()=>{m&&(new C().remove("shopify-bliss"),N("/login",{state:{messageLogout:"Logout successfully!"}}))},[m]);return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"layout-dashboard-topbar",children:[e.jsx(M,{}),e.jsx("div",{className:"links",children:l.filter(s=>s.menu_id===h).map(s=>e.jsx("div",{className:`links-item ${s.name===j?"active":""}`,onClick:()=>v(s.name),children:s.name},s.sub_menu_id))}),e.jsxs("div",{className:"config",children:[e.jsx("div",{className:"config-help",onClick:()=>{r("help")},children:"Help"}),e.jsxs("div",{className:"config-account",onClick:()=>t(!0),children:[e.jsx("div",{className:"text",children:"Account Setting"}),e.jsx("img",{src:P,alt:"Profile image's"})]}),n?e.jsxs("div",{className:"account-modal",ref:c,children:[e.jsxs("div",{className:"account-modal-profile",children:[e.jsx("div",{className:"username",children:u.username}),e.jsx("div",{className:"email",children:u.email})]}),g.filter(s=>s.menu_id==="6556df8f-7cd6-4848-b39f-1e6ab4973311").map(s=>e.jsx(_,{className:"account-modal-item",onClick:()=>{a(!0),t(!1)},children:s.name},s.menu_id)),e.jsx("div",{className:"account-modal-item",onClick:()=>{r("notifications")},children:"Notifications"}),e.jsx("div",{className:"account-modal-item",onClick:()=>{r("language")},children:"Language"}),e.jsx("div",{className:"account-modal-item",onClick:b,children:"Logout"})]}):""]})]}),o?e.jsx(y,{onOpen:o,onClose:()=>a(!1)}):""]})}function I({children:n}){return e.jsx(e.Fragment,{children:e.jsxs("div",{className:"layout-dashboard",children:[e.jsx(E,{}),e.jsx(D,{}),e.jsx("div",{className:"layout-dashboard-content",children:n})]})})}export{I as L};
