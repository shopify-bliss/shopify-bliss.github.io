import{j as s,e as i,a as c,u as m,r as u}from"./index-efJpG4c1.js";import{u as g,L as d}from"./LayoutDashboard-Cog1b7x6.js";import{Error401 as l}from"./Error-Dz5sQgUt.js";import"./SmoothScroll-3nL7fy9T.js";import"./AiBuilderSupport-DUk6RuH0.js";import"./black-logo-KPU1N9jl.js";function p(){return s.jsx(s.Fragment,{children:s.jsx("div",{children:"Password"})})}function P(){const{submenuPage:a,toastMessage:o}=i(),{token:n}=g(),e=c(),t=m();return u.useEffect(()=>{var r;(r=e.state)!=null&&r.messageLoginGoogle&&(o("success",e.state.messageLoginGoogle),t(e.pathname,{state:{...e.state,messageLoginGoogle:void 0},replace:!0}))},[e.state,t,o,e.pathname]),s.jsx(s.Fragment,{children:n?s.jsxs(d,{children:[a==="bio"&&s.jsx("div",{children:"Profile"}),a==="password"&&s.jsx(p,{})]}):s.jsx(l,{})})}export{P as default};
