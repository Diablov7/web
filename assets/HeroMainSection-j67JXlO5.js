import{j as e}from"./ui-CpGTGy3w.js";import{u as h,G as s}from"./index-C7x3__KB.js";import{r as c}from"./vendor-Dneogk0_.js";import"./query-BJQ4iwuL.js";import"./router-BlHvET4b.js";import"./animations-sKniUzcd.js";const u=async t=>{try{const o=`🚀 *New message from Wevolv3 website!* 

👤 *Name:* ${t.name}
📧 *Email:* ${t.email}
📱 *Telegram:* ${t.telegram||"Not provided"}

💬 *Message:*
${t.message}

---
Sent from wevolv3.com`;const a=await(await fetch("/.netlify/functions/sendTelegram",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:t.name,email:t.email,telegram:t.telegram,message:t.message,text:o})})).json();return a&&a.ok===!0}catch(o){return console.error("Erro ao enviar mensagem:",o),!1}},j=()=>{const[t,r]=c.useState({name:"",email:"",telegram:"",message:""}),[o,n]=c.useState(!1),[a,i]=c.useState("idle"),l=d=>{const{name:f,value:g}=d.target;r(p=>({...p,[f]:g}))},x=async d=>{if(d.preventDefault(),!t.name.trim()||!t.email.trim()||!t.message.trim()){alert("Por favor, preencha todos os campos obrigatórios.");return}n(!0),i("idle");try{await u(t)?(i("success"),r({name:"",email:"",telegram:"",message:""}),setTimeout(()=>i("idle"),3e3)):(i("error"),setTimeout(()=>i("idle"),3e3))}catch(f){console.error("Erro ao enviar formulário:",f),i("error"),setTimeout(()=>i("idle"),3e3)}finally{n(!1)}};return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
                 .wevolv3-contact-card {
           position: relative;
           display: flex;
           flex-direction: column;
           gap: 1rem;
           padding: 1.5rem;
           width: 28rem;
           max-width: 100%;
           margin-left: auto;
           margin-right: 0;
           margin-top: 4rem;
           background: rgba(0, 0, 0, 0.85);
           backdrop-filter: blur(20px) saturate(180%);
           border: 1px solid rgba(16, 185, 129, 0.3);
           border-radius: 1.5rem;
           box-shadow: 
             0 8px 32px rgba(0, 0, 0, 0.4),
             0 4px 16px rgba(0, 0, 0, 0.2),
             inset 0 1px 0 rgba(255, 255, 255, 0.1);
           overflow: visible;
           transition: all 0.3s ease;
           z-index: 99999;
           isolation: isolate;
         }

        .wevolv3-contact-card:hover {
          border-color: rgba(16, 185, 129, 0.3);
          box-shadow: 
            0 0 0 1px rgba(16, 185, 129, 0.2),
            0 12px 48px rgba(0, 0, 0, 0.5),
            0 8px 24px rgba(16, 185, 129, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.15);
          transform: translateY(-2px);
        }

                 

        

                 .card-header {
           text-align: center;
           margin-bottom: 1rem;
         }

         .card-title {
           font-size: 1.5rem;
           background: linear-gradient(135deg, #10b981, #3b82f6, #8b5cf6);
           background-clip: text;
           -webkit-background-clip: text;
           -webkit-text-fill-color: transparent;
           font-family: 'Orbitron', monospace;
           font-weight: bold;
           margin: 0 0 1rem 0;
           text-align: center;
           letter-spacing: 0.025em;
           line-height: 1.2;
         }

         .card-subtitle {
           font-size: 1rem;
           color: rgba(148, 163, 184, 0.9);
           text-align: center;
           line-height: 1.5;
           margin: 0;
           max-width: 100%;
         }

        .divider {
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, 
            transparent 0%,
            rgba(16, 185, 129, 0.5) 20%,
            rgba(59, 130, 246, 0.5) 50%,
            rgba(168, 85, 247, 0.5) 80%,
            transparent 100%
          );
          border: none;
          margin: 0.5rem 0;
        }

        .form-container {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .field-group {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .field-label {
          font-size: 0.75rem;
          color: white;
          font-weight: 500;
          font-family: 'Orbitron', monospace;
          text-align: left;
        }

                 .field-input,
         .field-textarea {
           padding: 0.5rem 0.75rem;
           background: rgba(0, 0, 0, 0.4);
           border: 1px solid rgba(255, 255, 255, 0.1);
           border-radius: 0.75rem;
           color: white;
           font-size: 0.875rem;
           transition: all 0.3s ease;
           backdrop-filter: blur(8px) saturate(180%);
         }

                 .field-input:focus,
         .field-textarea:focus {
           outline: none;
           border-color: rgba(16, 185, 129, 0.6);
           background: rgba(0, 0, 0, 0.6);
           box-shadow: 
             0 0 0 3px rgba(16, 185, 129, 0.1),
             0 4px 12px rgba(16, 185, 129, 0.15),
             inset 0 1px 0 rgba(255, 255, 255, 0.1);
           transform: translateY(-1px);
         }

        .field-input::placeholder,
        .field-textarea::placeholder {
          color: hsl(0, 0%, 83%);
          opacity: 0.7;
        }

        .field-textarea {
          resize: none;
          min-height: 45px;
        }

        .submit-button {
          cursor: pointer;
          padding: 0.75rem 1.5rem;
          width: 100%;
          background: linear-gradient(135deg, 
            rgb(16, 185, 129) 0%, 
            rgb(59, 130, 246) 50%,
            rgb(168, 85, 247) 100%
          );
          font-size: 1rem;
          color: white;
          font-weight: 600;
          font-family: 'Orbitron', monospace;
          border: 0;
          border-radius: 1rem;
          box-shadow: 
            0 8px 32px rgba(16, 185, 129, 0.2),
            0 4px 16px rgba(59, 130, 246, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .submit-button:hover:not(:disabled) {
          background: linear-gradient(135deg, 
            rgb(5, 150, 105) 0%, 
            rgb(37, 99, 235) 50%,
            rgb(147, 51, 234) 100%
          );
          transform: translateY(-3px);
          box-shadow: 
            0 12px 48px rgba(16, 185, 129, 0.3),
            0 8px 24px rgba(59, 130, 246, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.3);
        }

        .submit-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, 
            transparent, 
            rgba(255, 255, 255, 0.2), 
            transparent
          );
          transition: left 0.5s;
        }

        .submit-button:hover::before {
          left: 100%;
        }

        .submit-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .submit-button.loading {
          animation: pulse 2s infinite;
        }

        .submit-button.success {
          background: linear-gradient(0deg, rgb(34, 197, 94) 0%, rgb(34, 197, 94) 100%);
        }

        .submit-button.error {
          background: linear-gradient(0deg, rgb(239, 68, 68) 0%, rgb(239, 68, 68) 100%);
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
      `}),e.jsxs("div",{className:"wevolv3-contact-card","data-form-contact":!0,children:[e.jsxs("div",{className:"card-header",children:[e.jsx("h3",{className:"card-title",children:"What are you building today?"}),e.jsx("p",{className:"card-subtitle",children:"Let us know what you're working on - we're listening"})]}),e.jsx("hr",{className:"divider"}),e.jsxs("form",{onSubmit:x,children:[e.jsxs("div",{className:"form-container",children:[e.jsxs("div",{className:"field-group",children:[e.jsx("label",{className:"field-label",children:"Name *"}),e.jsx("input",{type:"text",name:"name",value:t.name,onChange:l,className:"field-input",required:!0})]}),e.jsxs("div",{className:"field-group",children:[e.jsx("label",{className:"field-label",children:"Email *"}),e.jsx("input",{type:"email",name:"email",value:t.email,onChange:l,className:"field-input",required:!0})]}),e.jsxs("div",{className:"field-group",children:[e.jsx("label",{className:"field-label",children:"Telegram"}),e.jsx("input",{type:"text",name:"telegram",value:t.telegram,onChange:l,placeholder:"@yourtelegram",className:"field-input"})]}),e.jsxs("div",{className:"field-group",children:[e.jsx("label",{className:"field-label",children:"Tell us about your project or idea *"}),e.jsx("textarea",{rows:2,name:"message",value:t.message,onChange:l,placeholder:"Share a bit about what you're working on or would like to achieve with marketing...",className:"field-textarea",required:!0})]})]}),e.jsx("button",{type:"submit",className:`submit-button ${o?"loading":""} ${a==="success"?"success":""} ${a==="error"?"error":""}`,disabled:o,children:o?"Sending...":a==="success"?"Sent! ✓":a==="error"?"Error ✗":"Connect"})]})]})]})},S=()=>{const t=h();return e.jsxs("section",{className:`relative h-screen overflow-hidden pt-12 bg-transparent ${t?"font-loaded":"font-loading"}`,style:{paddingTop:"162px"},children:[e.jsx("div",{className:"relative z-20 h-full flex flex-col items-center px-6 sm:px-8 md:px-16 pt-4",children:e.jsx("div",{className:"container mx-auto max-w-7xl text-center",children:e.jsxs("div",{className:"space-y-8 pt-0",children:[e.jsxs("div",{className:"mb-8 mt-0 text-center",children:[e.jsx("h1",{className:"text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black font-orbitron tracking-tighter flex justify-center",children:e.jsx(s,{colors:["#40ffaa","#4079ff","#40ffaa","#4079ff","#40ffaa"],animationSpeed:12,showBorder:!1,className:"text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black font-orbitron tracking-tighter",style:{fontWeight:900},children:"Wevolv3"})}),e.jsx("h2",{className:"text-lg sm:text-xl md:text-2xl font-bold font-orbitron -mt-8 flex justify-center",children:e.jsx(s,{colors:["#40ffaa","#4079ff","#40ffaa","#4079ff","#40ffaa"],animationSpeed:10,showBorder:!1,className:"text-lg sm:text-xl md:text-2xl font-bold font-orbitron",style:{fontWeight:700},children:"Web3 Marketing & Modular Advertising"})})]}),e.jsxs("div",{className:"flex items-start justify-between px-6 sm:px-8 md:px-16 w-full -mt-4",children:[e.jsxs("div",{className:"max-w-lg -ml-32 text-left -mt-8",children:[e.jsx("div",{className:"flex justify-start mb-1",children:e.jsx("div",{className:"text-sm sm:text-base leading-tight",children:e.jsx("em",{children:e.jsx(s,{colors:["#ffffff","#ffffff","#ffffff","#ffffff","#ffd700"],animationSpeed:8,showBorder:!1,className:"text-sm sm:text-base italic",style:{fontStyle:"italic",fontWeight:700},children:"No fancy words."})})})}),e.jsx("div",{className:"flex justify-start",children:e.jsx("div",{className:"text-sm sm:text-base leading-tight",children:e.jsx("em",{children:e.jsx(s,{colors:["#ffffff","#ffffff","#ffffff","#ffffff","#ffd700"],animationSpeed:8,showBorder:!1,className:"text-sm sm:text-base italic",style:{fontStyle:"italic",fontWeight:700},children:"Just real results that move the needle in Web3."})})})}),e.jsx("div",{className:"mt-6 max-w-3xl",children:e.jsxs("div",{className:"space-y-2 text-xs leading-snug text-justify",children:[e.jsx("p",{children:e.jsx(s,{colors:["#ffffff","#ffffff","#ffffff","#ffffff","#ffd700"],animationSpeed:8,showBorder:!1,className:"text-xs font-bold",style:{paddingTop:"0",paddingBottom:"0"},as:"span",children:"Real traction for your Web3 project."})}),e.jsx("p",{children:e.jsx(s,{colors:["#ffffff","#ffffff","#ffffff","#ffffff","#ffd700"],animationSpeed:8,showBorder:!1,className:"text-xs",style:{paddingTop:"0",paddingBottom:"0"},as:"span",children:"You're building in one of the hardest markets on earth. The noise never stops. Communities doubt first, trust later. Trends rise and crash before your roadmap even finishes. You don't just need attention, you need adoption that lasts."})}),e.jsx("p",{children:e.jsx(s,{colors:["#ffffff","#ffffff","#ffffff","#ffffff","#ffd700"],animationSpeed:8,showBorder:!1,className:"text-xs",style:{paddingTop:"0",paddingBottom:"0"},as:"span",children:"That's why Wevolv3 exists. We guide founders through the chaos of crypto with strategies that cut through noise and build momentum. Our campaigns turn strangers into believers, and believers into a community that sustains your vision. Whether you need a complete marketing engine or rapid-fire ad support to back your team, we make sure your project doesn't stall. Your project is the hero. We provide the map, the tools and the guidance to win. Together, we evolve."})})]})})]}),e.jsx("div",{className:"max-w-lg -mr-32 -mt-4",children:e.jsx(j,{})})]})]})})}),e.jsx("div",{className:"absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent"})]})};export{S as default};
