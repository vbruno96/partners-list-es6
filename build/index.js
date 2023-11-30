(()=>{"use strict";var e,r={26:(e,r,t)=>{const a=window.wp.blocks,n=window.React,l=window.wp.element,o=window.wp.components,s=window.wp.blockEditor,i=window.wp.apiFetch;var c=t.n(i);const p=JSON.parse('{"u2":"partner-list/partner-list"}');(0,a.registerBlockType)(p.u2,{edit:function({attributes:e,setAttributes:r}){const[t,a]=(0,l.useState)(!1),[i,p]=(0,l.useState)(!1),[u,d]=(0,l.useState)(!1),[m,v]=(0,l.useState)(e.selectedPartners);function f(e){r({selectedPartners:e})}function w(){a(!1),f(m)}return u||async function(){try{const e=await c()({path:"wp/v2/partners?per_page=100"});return await e.reduce((async(e,r)=>{const t=await e;try{const e=await c()({path:`wp/v2/media/${r.featured_media}`});return[...t,{value:r.id.toString(),label:r.title.rendered,imageSrc:e.guid.rendered,linkUrl:r.acf.partner_landing_page}].sort(((e,r)=>e.label.toLowerCase().localeCompare(r.label.toLowerCase())))}catch(e){console.error("Erro ao obter as imagens dos parceiros:",e)}}),Promise.resolve([]))}catch(e){console.error("Erro ao obter a lista de parceiros:",e)}}().then((e=>{p(!0),d(!0),r({partners:e,isDataLoaded:!0})})).then((()=>p(!1))),(0,n.createElement)(n.Fragment,null,(0,n.createElement)("div",{...(0,s.useBlockProps)()},(0,n.createElement)(o.Button,{variant:"primary",onClick:function(){a(!0)}},"Selecionar Parceiros"),m.length>0&&(0,n.createElement)("div",{className:"partners-list"},m.map((r=>{e.partners.find((e=>e.value===r?(0,n.createElement)("a",{href:e.linkUrl,className:"partner"},(0,n.createElement)("img",{src:e.imageSrc,alt:e.label})):(0,n.createElement)("p",null,m.length)))}))),t&&(0,n.createElement)(o.Modal,{className:"partner-list-modal",title:"Selecionar os parceiros",shouldCloseOnClickOutside:!0,onRequestClose:w},i?(0,n.createElement)(o.Spinner,null):e.partners.map((e=>(0,n.createElement)(o.CheckboxControl,{key:e.value,label:e.label,checked:m.includes(e.value),onChange:r=>function(e,r){v(e?e=>[...e,r]:e=>e.filter((e=>e!==r))),f(m)}(r,e.value)}))),(0,n.createElement)("p",null,JSON.stringify(m)),(0,n.createElement)("div",{className:"partner-list-modal-footer"},(0,n.createElement)(o.Button,{variant:"primary",onClick:w},"Salvar")))))},save:function({attributes:e}){return(0,n.createElement)("div",{...s.useBlockProps.save()},e.selectedPartners.map((r=>{if(e.partners.find((e=>e.value===r)))return(0,n.createElement)("a",{href:partner.linkUrl,className:"partner"},(0,n.createElement)("img",{src:partner.imageSrc,alt:partner.label}))})))}})}},t={};function a(e){var n=t[e];if(void 0!==n)return n.exports;var l=t[e]={exports:{}};return r[e](l,l.exports,a),l.exports}a.m=r,e=[],a.O=(r,t,n,l)=>{if(!t){var o=1/0;for(p=0;p<e.length;p++){for(var[t,n,l]=e[p],s=!0,i=0;i<t.length;i++)(!1&l||o>=l)&&Object.keys(a.O).every((e=>a.O[e](t[i])))?t.splice(i--,1):(s=!1,l<o&&(o=l));if(s){e.splice(p--,1);var c=n();void 0!==c&&(r=c)}}return r}l=l||0;for(var p=e.length;p>0&&e[p-1][2]>l;p--)e[p]=e[p-1];e[p]=[t,n,l]},a.n=e=>{var r=e&&e.__esModule?()=>e.default:()=>e;return a.d(r,{a:r}),r},a.d=(e,r)=>{for(var t in r)a.o(r,t)&&!a.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:r[t]})},a.o=(e,r)=>Object.prototype.hasOwnProperty.call(e,r),(()=>{var e={826:0,431:0};a.O.j=r=>0===e[r];var r=(r,t)=>{var n,l,[o,s,i]=t,c=0;if(o.some((r=>0!==e[r]))){for(n in s)a.o(s,n)&&(a.m[n]=s[n]);if(i)var p=i(a)}for(r&&r(t);c<o.length;c++)l=o[c],a.o(e,l)&&e[l]&&e[l][0](),e[l]=0;return a.O(p)},t=globalThis.webpackChunkpartner_list_es6=globalThis.webpackChunkpartner_list_es6||[];t.forEach(r.bind(null,0)),t.push=r.bind(null,t.push.bind(t))})();var n=a.O(void 0,[431],(()=>a(26)));n=a.O(n)})();