import{f as a,h as n,b as m,u as c,r as d}from"./index-CMOvAOI6.js";import{L as l}from"./LayoutDashboard-COTbCCi3.js";import"./AiBuilderSupport-yaeu0xI2.js";import"./black-logo-KPU1N9jl.js";import"./index-4KdN5x27.js";import"./Profile-zX8F_9Rq.js";import"./AuthSupport-BsZ_FME2.js";import"./ValidationSchema-m6anahiY.js";import"./Error-CNtiXdZS.js";function h(){return a.jsx(a.Fragment,{children:a.jsx("div",{children:"Analytics"})})}function L(){const{submenuPage:e,toastMessage:o,user:s}=n(),t=m(),i=c();return d.useEffect(()=>{var r;(r=t.state)!=null&&r.messageLoginGoogle&&(o("success",t.state.messageLoginGoogle),i(t.pathname,{state:{...t.state,messageLoginGoogle:void 0},replace:!0}))},[t.state,i,o,t.pathname]),a.jsx(a.Fragment,{children:a.jsxs(l,{children:[e==="analytics 1"&&((s==null?void 0:s.role_name)==="admin"?a.jsx("div",{children:"Dashboard Admin"}):(s==null?void 0:s.role_name)==="customer"?a.jsx("div",{children:"Dashboard Customer"}):a.jsx("div",{children:"Dashboard Who"})),e==="analytics 2"&&a.jsx(h,{})]})})}export{L as default};