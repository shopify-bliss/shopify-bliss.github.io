import{a as p,r as s,m as K,u as U,b as V,e as j,t as o,j as e,n as W,Q as X}from"./index-b4tCd78A.js";import{D as Y}from"./AiBuilderSupport-ZChM1qdV.js";import{F as Z,N as ee,I as ae,P as te,S as se,A as ie,a as re}from"./FirstComponent-BcblqSGI.js";import"./black-logo-KPU1N9jl.js";function le(){p.defaults.withCredentials=!0;const[C,w]=s.useState(null),[g,E]=s.useState([]),[d,A]=s.useState(null),[v,D]=s.useState({}),[F,$]=s.useState({}),[c,L]=s.useState(null),[n,k]=s.useState(null),{token:b,setAiBuilderLoader:S,isLoadingAiBuilder:T,dataElements:M,dataPages:h}=K(),l=U(),u=V(),N=s.useCallback(async()=>{try{S(!0);const f=await p.get(`${j.aiBuilderId}?id=e64c22e7-c694-4eb3-a719-9adff242a33a`,{headers:{Authorization:`Bearer ${b}`}}),I=f.data.data[0].ai_builder_id,[q,G]=await Promise.all([p.get(`${j.aiBuilderSectionsId}?id=${I}`),p.get(`${j.aiBuilderSupportsId}?id=${I}`)]),B=f.data.data[0],x=q.data.data,y=G.data.data.filter(a=>a.support_id==="2bff7888-e861-4341-869b-189af29ad3f8");w(B.site_title),L(B.color_id),k(B.font_id),E([...new Set(x.map(a=>a.page_id))]);const H=x.reduce((a,_)=>{const{page_id:r,section_id:m}=_;return a[r]||(a[r]=[]),a[r].includes(m)||a[r].push(m),a},{});D(H);const P=x.reduce((a,_)=>{const{page_id:r,section_id:m,style_design:J}=_;return a[r]||(a[r]={}),a[r][m]=J,a},{});Object.keys(P).forEach(a=>{P[a][y[0].support_id]=y[0].style_design}),$(P)}catch(t){console.error(t),l("/login",{replace:!0,state:{messageSessionExpired:"Session expired, Please login again."}})}finally{S(!1)}},[b,l,S]);s.useEffect(()=>{b&&N()},[b,N,l]),s.useEffect(()=>{A(g[0])},[g]);const i=s.useMemo(()=>F[d]||{},[F,d]),{firstProduct:z,firstService:O,firstAbout:Q,firstForm:R}=Z({activeSections:v,currentPageId:d});return s.useEffect(()=>{var t;(t=u.state)!=null&&t.messageAiBuilder&&(o("success",u.state.messageAiBuilder),l(u.pathname,{state:{...u.state,messageAiBuilder:void 0},replace:!0}))},[l,u.state,u.pathname]),e.jsx(e.Fragment,{children:T?e.jsx(W,{}):e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"aibuilder-preview",children:[e.jsx(ee,{activePages:g,dataPages:h,activeSections:v,siteTitle:C,currentPageId:d,setCurrentPageId:A,activeNavbar:i["2bff7888-e861-4341-869b-189af29ad3f8"],activeIntro:i["798f1ce0-b732-45a6-838e-f28e137243f7"],toastMessage:o,activeFonts:n,activeColors:c,isPreview:!0}),d!==null&&e.jsx("div",{className:"aibuilder-preview-section",children:M.filter(t=>{var f;return(f=v[d])==null?void 0:f.includes(t.section_id)}).map(t=>e.jsx(s.Fragment,{children:t.section_id==="798f1ce0-b732-45a6-838e-f28e137243f7"?e.jsx(ae,{activeSections:v,currentPageId:d,activeIntro:i["798f1ce0-b732-45a6-838e-f28e137243f7"],activeNavbar:i["2bff7888-e861-4341-869b-189af29ad3f8"],toastMessage:o,activeColors:c,activeFonts:n}):t.section_id==="b42d4d56-d411-4aa8-ae01-52f0c406328a"?e.jsx(te,{activeProducts:i["b42d4d56-d411-4aa8-ae01-52f0c406328a"],activeNavbar:i["2bff7888-e861-4341-869b-189af29ad3f8"],toastMessage:o,activeColors:c,activeFonts:n,firstProduct:z}):t.section_id==="4fd1e0cc-06f3-4554-9f79-ce8e02db03c8"?e.jsx(se,{activeServices:i["4fd1e0cc-06f3-4554-9f79-ce8e02db03c8"],activeNavbar:i["2bff7888-e861-4341-869b-189af29ad3f8"],toastMessage:o,activeColors:c,activeFonts:n,firstService:O}):t.section_id==="1a988ed7-6ddb-44c1-8a9e-2dca26ebb0ed"?e.jsx(ie,{activeAbout:i["1a988ed7-6ddb-44c1-8a9e-2dca26ebb0ed"],activeNavbar:i["2bff7888-e861-4341-869b-189af29ad3f8"],toastMessage:o,activeColors:c,activeFonts:n,firstAbout:Q}):t.section_id==="2089ce88-93a7-4555-8d0d-7f88f1dc3a7e"?e.jsx(re,{activeForm:i["2089ce88-93a7-4555-8d0d-7f88f1dc3a7e"],activeNavbar:i["2bff7888-e861-4341-869b-189af29ad3f8"],toastMessage:o,activeColors:c,activeFonts:n,firstForm:R}):e.jsx("div",{className:"no-element",children:t.name})},t.section_id))}),e.jsx(Y,{dataPages:h,isPreview:!0})]}),e.jsx(X,{})]})})}export{le as default};
