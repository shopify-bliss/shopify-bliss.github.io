import{a as m,r as s,n as K,u as U,b as V,e as j,t as c,j as e,o as W,Q as X}from"./index-C4l_2Wgo.js";import{D as Y}from"./AiBuilderSupport-CVzcLkRa.js";import{F as Z,N as ee,I as te,P as ae,S as se,A as ie,a as re}from"./FirstComponent-qQ6nwwO2.js";import"./black-logo-KPU1N9jl.js";import"./FontsSupport-DfDtMSc6.js";function fe(){m.defaults.withCredentials=!0;const[C,w]=s.useState(null),[g,E]=s.useState([]),[d,F]=s.useState(null),[v,D]=s.useState({}),[h,$]=s.useState({}),[n,L]=s.useState(null),[l,k]=s.useState(null),{token:b,setAiBuilderLoader:S,isLoadingAiBuilder:T,dataElements:M,dataPages:A}=K(),u=U(),r=V(),N=s.useCallback(async()=>{try{S(!0);const t=r.state.aiBuilderId,f=await m.get(`${j.aiBuilderId}?id=${t}`,{headers:{Authorization:`Bearer ${b}`}}),I=f.data.data[0].ai_builder_id,[q,G]=await Promise.all([m.get(`${j.aiBuilderSectionsId}?id=${I}`),m.get(`${j.aiBuilderSupportsId}?id=${I}`)]),B=f.data.data[0],x=q.data.data,y=G.data.data.filter(a=>a.support_id==="2bff7888-e861-4341-869b-189af29ad3f8");w(B.site_title),L(B.color_id),k(B.font_id),E([...new Set(x.map(a=>a.page_id))]);const H=x.reduce((a,_)=>{const{page_id:o,section_id:p}=_;return a[o]||(a[o]=[]),a[o].includes(p)||a[o].push(p),a},{});D(H);const P=x.reduce((a,_)=>{const{page_id:o,section_id:p,style_design:J}=_;return a[o]||(a[o]={}),a[o][p]=J,a},{});Object.keys(P).forEach(a=>{P[a][y[0].support_id]=y[0].style_design}),$(P)}catch(t){console.error(t),u("/login",{replace:!0,state:{messageSessionExpired:"Session expired, Please login again."}})}finally{S(!1)}},[b,u,S,r.state]);s.useEffect(()=>{r.state&&b&&N()},[b,N,u,r.state]),s.useEffect(()=>{F(g[0])},[g]);const i=s.useMemo(()=>h[d]||{},[h,d]),{firstProduct:z,firstService:O,firstAbout:Q,firstForm:R}=Z({activeSections:v,currentPageId:d});return s.useEffect(()=>{var t;(t=r.state)!=null&&t.messageAiBuilder&&(c("success",r.state.messageAiBuilder),u(r.pathname,{state:{...r.state,messageAiBuilder:void 0},replace:!0}))},[u,r.state,r.pathname]),e.jsx(e.Fragment,{children:T?e.jsx(W,{}):e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"aibuilder-preview",children:[e.jsx(ee,{activePages:g,dataPages:A,activeSections:v,siteTitle:C,currentPageId:d,setCurrentPageId:F,activeNavbar:i["2bff7888-e861-4341-869b-189af29ad3f8"],activeIntro:i["798f1ce0-b732-45a6-838e-f28e137243f7"],toastMessage:c,activeFonts:l,activeColors:n,isPreview:!0}),d!==null&&e.jsx("div",{className:"aibuilder-preview-section",children:M.filter(t=>{var f;return(f=v[d])==null?void 0:f.includes(t.section_id)}).map(t=>e.jsx(s.Fragment,{children:t.section_id==="798f1ce0-b732-45a6-838e-f28e137243f7"?e.jsx(te,{activeSections:v,currentPageId:d,activeIntro:i["798f1ce0-b732-45a6-838e-f28e137243f7"],activeNavbar:i["2bff7888-e861-4341-869b-189af29ad3f8"],toastMessage:c,activeColors:n,activeFonts:l}):t.section_id==="b42d4d56-d411-4aa8-ae01-52f0c406328a"?e.jsx(ae,{activeProducts:i["b42d4d56-d411-4aa8-ae01-52f0c406328a"],activeNavbar:i["2bff7888-e861-4341-869b-189af29ad3f8"],toastMessage:c,activeColors:n,activeFonts:l,firstProduct:z}):t.section_id==="4fd1e0cc-06f3-4554-9f79-ce8e02db03c8"?e.jsx(se,{activeServices:i["4fd1e0cc-06f3-4554-9f79-ce8e02db03c8"],activeNavbar:i["2bff7888-e861-4341-869b-189af29ad3f8"],toastMessage:c,activeColors:n,activeFonts:l,firstService:O}):t.section_id==="1a988ed7-6ddb-44c1-8a9e-2dca26ebb0ed"?e.jsx(ie,{activeAbout:i["1a988ed7-6ddb-44c1-8a9e-2dca26ebb0ed"],activeNavbar:i["2bff7888-e861-4341-869b-189af29ad3f8"],toastMessage:c,activeColors:n,activeFonts:l,firstAbout:Q}):t.section_id==="2089ce88-93a7-4555-8d0d-7f88f1dc3a7e"?e.jsx(re,{activeForm:i["2089ce88-93a7-4555-8d0d-7f88f1dc3a7e"],activeNavbar:i["2bff7888-e861-4341-869b-189af29ad3f8"],toastMessage:c,activeColors:n,activeFonts:l,firstForm:R}):e.jsx("div",{className:"no-element",children:t.name})},t.section_id))}),e.jsx(Y,{dataPages:A,isPreview:!0})]}),e.jsx(X,{})]})})}export{fe as default};
