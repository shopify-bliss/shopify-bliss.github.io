import{j as e,r as t,L as l}from"./index-efJpG4c1.js";function s({type:o,message:i}){const n=t.useRef(null);return t.useEffect(()=>{const r=()=>{if(n.current){const a=window.innerWidth,d=window.innerHeight,c=45/(a/d);n.current.style.transform=`translate(-50%, -50%) rotate(-${c}deg)`}};return window.addEventListener("resize",r),window.addEventListener("load",r),r(),()=>{window.removeEventListener("resize",r),window.removeEventListener("load",r)}},[]),e.jsxs("div",{className:"error-page",children:[e.jsxs(l,{to:"/",children:[e.jsx("svg",{height:"0.8em",width:"0.8em",viewBox:"0 0 2 1",preserveAspectRatio:"none",children:e.jsx("polyline",{fill:"none",stroke:"#777777",strokeWidth:"0.1",points:"0.9,0.1 0.1,0.5 0.9,0.9"})})," ","Home"]}),e.jsx("div",{className:"background-wrapper",children:e.jsx("h1",{id:"visual",ref:n,children:o})}),e.jsx("p",{children:i})]})}function p(){return e.jsx(s,{type:404,message:"Oops! The page you are looking for doesn't exist."})}function u(){return e.jsx(s,{type:403,message:"You’re not allowed to access this page."})}function w(){return e.jsx(s,{type:401,message:"Access Denied. You don't have permission to view this page."})}export{w as Error401,u as Error403,p as Error404};
