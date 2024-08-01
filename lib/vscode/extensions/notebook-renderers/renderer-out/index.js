function k(i,t){let n=Math.pow(10,t);return Math.round(i*n)/n}var x=class{constructor(t,n,s,e=1){this._rgbaBrand=void 0;this.r=Math.min(255,Math.max(0,t))|0,this.g=Math.min(255,Math.max(0,n))|0,this.b=Math.min(255,Math.max(0,s))|0,this.a=k(Math.max(Math.min(1,e),0),3)}static equals(t,n){return t.r===n.r&&t.g===n.g&&t.b===n.b&&t.a===n.a}},T=class i{constructor(t,n,s,e){this._hslaBrand=void 0;this.h=Math.max(Math.min(360,t),0)|0,this.s=k(Math.max(Math.min(1,n),0),3),this.l=k(Math.max(Math.min(1,s),0),3),this.a=k(Math.max(Math.min(1,e),0),3)}static equals(t,n){return t.h===n.h&&t.s===n.s&&t.l===n.l&&t.a===n.a}static fromRGBA(t){let n=t.r/255,s=t.g/255,e=t.b/255,r=t.a,l=Math.max(n,s,e),c=Math.min(n,s,e),a=0,u=0,m=(c+l)/2,b=l-c;if(b>0){switch(u=Math.min(m<=.5?b/(2*m):b/(2-2*m),1),l){case n:a=(s-e)/b+(s<e?6:0);break;case s:a=(e-n)/b+2;break;case e:a=(n-s)/b+4;break}a*=60,a=Math.round(a)}return new i(a,u,m,r)}static _hue2rgb(t,n,s){return s<0&&(s+=1),s>1&&(s-=1),s<1/6?t+(n-t)*6*s:s<1/2?n:s<2/3?t+(n-t)*(2/3-s)*6:t}static toRGBA(t){let n=t.h/360,{s,l:e,a:r}=t,l,c,a;if(s===0)l=c=a=e;else{let u=e<.5?e*(1+s):e+s-e*s,m=2*e-u;l=i._hue2rgb(m,u,n+1/3),c=i._hue2rgb(m,u,n),a=i._hue2rgb(m,u,n-1/3)}return new x(Math.round(l*255),Math.round(c*255),Math.round(a*255),r)}},w=class i{constructor(t,n,s,e){this._hsvaBrand=void 0;this.h=Math.max(Math.min(360,t),0)|0,this.s=k(Math.max(Math.min(1,n),0),3),this.v=k(Math.max(Math.min(1,s),0),3),this.a=k(Math.max(Math.min(1,e),0),3)}static equals(t,n){return t.h===n.h&&t.s===n.s&&t.v===n.v&&t.a===n.a}static fromRGBA(t){let n=t.r/255,s=t.g/255,e=t.b/255,r=Math.max(n,s,e),l=Math.min(n,s,e),c=r-l,a=r===0?0:c/r,u;return c===0?u=0:r===n?u=((s-e)/c%6+6)%6:r===s?u=(e-n)/c+2:u=(n-s)/c+4,new i(Math.round(u*60),a,r,t.a)}static toRGBA(t){let{h:n,s,v:e,a:r}=t,l=e*s,c=l*(1-Math.abs(n/60%2-1)),a=e-l,[u,m,b]=[0,0,0];return n<60?(u=l,m=c):n<120?(u=c,m=l):n<180?(m=l,b=c):n<240?(m=c,b=l):n<300?(u=c,b=l):n<=360&&(u=l,b=c),u=Math.round((u+a)*255),m=Math.round((m+a)*255),b=Math.round((b+a)*255),new x(u,m,b,r)}},f=class f{static fromHex(t){return f.Format.CSS.parseHex(t)||f.red}get hsla(){return this._hsla?this._hsla:T.fromRGBA(this.rgba)}get hsva(){return this._hsva?this._hsva:w.fromRGBA(this.rgba)}constructor(t){if(t)if(t instanceof x)this.rgba=t;else if(t instanceof T)this._hsla=t,this.rgba=T.toRGBA(t);else if(t instanceof w)this._hsva=t,this.rgba=w.toRGBA(t);else throw new Error("Invalid color ctor argument");else throw new Error("Color needs a value")}equals(t){return!!t&&x.equals(this.rgba,t.rgba)&&T.equals(this.hsla,t.hsla)&&w.equals(this.hsva,t.hsva)}getRelativeLuminance(){let t=f._relativeLuminanceForComponent(this.rgba.r),n=f._relativeLuminanceForComponent(this.rgba.g),s=f._relativeLuminanceForComponent(this.rgba.b),e=.2126*t+.7152*n+.0722*s;return k(e,4)}static _relativeLuminanceForComponent(t){let n=t/255;return n<=.03928?n/12.92:Math.pow((n+.055)/1.055,2.4)}getContrastRatio(t){let n=this.getRelativeLuminance(),s=t.getRelativeLuminance();return n>s?(n+.05)/(s+.05):(s+.05)/(n+.05)}isDarker(){return(this.rgba.r*299+this.rgba.g*587+this.rgba.b*114)/1e3<128}isLighter(){return(this.rgba.r*299+this.rgba.g*587+this.rgba.b*114)/1e3>=128}isLighterThan(t){let n=this.getRelativeLuminance(),s=t.getRelativeLuminance();return n>s}isDarkerThan(t){let n=this.getRelativeLuminance(),s=t.getRelativeLuminance();return n<s}lighten(t){return new f(new T(this.hsla.h,this.hsla.s,this.hsla.l+this.hsla.l*t,this.hsla.a))}darken(t){return new f(new T(this.hsla.h,this.hsla.s,this.hsla.l-this.hsla.l*t,this.hsla.a))}transparent(t){let{r:n,g:s,b:e,a:r}=this.rgba;return new f(new x(n,s,e,r*t))}isTransparent(){return this.rgba.a===0}isOpaque(){return this.rgba.a===1}opposite(){return new f(new x(255-this.rgba.r,255-this.rgba.g,255-this.rgba.b,this.rgba.a))}blend(t){let n=t.rgba,s=this.rgba.a,e=n.a,r=s+e*(1-s);if(r<1e-6)return f.transparent;let l=this.rgba.r*s/r+n.r*e*(1-s)/r,c=this.rgba.g*s/r+n.g*e*(1-s)/r,a=this.rgba.b*s/r+n.b*e*(1-s)/r;return new f(new x(l,c,a,r))}makeOpaque(t){if(this.isOpaque()||t.rgba.a!==1)return this;let{r:n,g:s,b:e,a:r}=this.rgba;return new f(new x(t.rgba.r-r*(t.rgba.r-n),t.rgba.g-r*(t.rgba.g-s),t.rgba.b-r*(t.rgba.b-e),1))}flatten(...t){let n=t.reduceRight((s,e)=>f._flatten(e,s));return f._flatten(this,n)}static _flatten(t,n){let s=1-t.rgba.a;return new f(new x(s*n.rgba.r+t.rgba.a*t.rgba.r,s*n.rgba.g+t.rgba.a*t.rgba.g,s*n.rgba.b+t.rgba.a*t.rgba.b))}toString(){return this._toString??(this._toString=f.Format.CSS.format(this)),this._toString}static getLighterColor(t,n,s){if(t.isLighterThan(n))return t;s=s||.5;let e=t.getRelativeLuminance(),r=n.getRelativeLuminance();return s=s*(r-e)/r,t.lighten(s)}static getDarkerColor(t,n,s){if(t.isDarkerThan(n))return t;s=s||.5;let e=t.getRelativeLuminance(),r=n.getRelativeLuminance();return s=s*(e-r)/e,t.darken(s)}};f.white=new f(new x(255,255,255,1)),f.black=new f(new x(0,0,0,1)),f.red=new f(new x(255,0,0,1)),f.blue=new f(new x(0,0,255,1)),f.green=new f(new x(0,255,0,1)),f.cyan=new f(new x(0,255,255,1)),f.lightgrey=new f(new x(211,211,211,1)),f.transparent=new f(new x(0,0,0,0));var A=f;(t=>{let i;(s=>{let n;(v=>{function e(_){return _.rgba.a===1?`rgb(${_.rgba.r}, ${_.rgba.g}, ${_.rgba.b})`:t.Format.CSS.formatRGBA(_)}v.formatRGB=e;function r(_){return`rgba(${_.rgba.r}, ${_.rgba.g}, ${_.rgba.b}, ${+_.rgba.a.toFixed(2)})`}v.formatRGBA=r;function l(_){return _.hsla.a===1?`hsl(${_.hsla.h}, ${(_.hsla.s*100).toFixed(2)}%, ${(_.hsla.l*100).toFixed(2)}%)`:t.Format.CSS.formatHSLA(_)}v.formatHSL=l;function c(_){return`hsla(${_.hsla.h}, ${(_.hsla.s*100).toFixed(2)}%, ${(_.hsla.l*100).toFixed(2)}%, ${_.hsla.a.toFixed(2)})`}v.formatHSLA=c;function a(_){let d=_.toString(16);return d.length!==2?"0"+d:d}function u(_){return`#${a(_.rgba.r)}${a(_.rgba.g)}${a(_.rgba.b)}`}v.formatHex=u;function m(_,d=!1){return d&&_.rgba.a===1?t.Format.CSS.formatHex(_):`#${a(_.rgba.r)}${a(_.rgba.g)}${a(_.rgba.b)}${a(Math.round(_.rgba.a*255))}`}v.formatHexA=m;function b(_){return _.isOpaque()?t.Format.CSS.formatHex(_):t.Format.CSS.formatRGBA(_)}v.format=b;function R(_){let d=_.length;if(d===0||_.charCodeAt(0)!==35)return null;if(d===7){let g=16*E(_.charCodeAt(1))+E(_.charCodeAt(2)),p=16*E(_.charCodeAt(3))+E(_.charCodeAt(4)),o=16*E(_.charCodeAt(5))+E(_.charCodeAt(6));return new t(new x(g,p,o,1))}if(d===9){let g=16*E(_.charCodeAt(1))+E(_.charCodeAt(2)),p=16*E(_.charCodeAt(3))+E(_.charCodeAt(4)),o=16*E(_.charCodeAt(5))+E(_.charCodeAt(6)),L=16*E(_.charCodeAt(7))+E(_.charCodeAt(8));return new t(new x(g,p,o,L/255))}if(d===4){let g=E(_.charCodeAt(1)),p=E(_.charCodeAt(2)),o=E(_.charCodeAt(3));return new t(new x(16*g+g,16*p+p,16*o+o))}if(d===5){let g=E(_.charCodeAt(1)),p=E(_.charCodeAt(2)),o=E(_.charCodeAt(3)),L=E(_.charCodeAt(4));return new t(new x(16*g+g,16*p+p,16*o+o,(16*L+L)/255))}return null}v.parseHex=R;function E(_){switch(_){case 48:return 0;case 49:return 1;case 50:return 2;case 51:return 3;case 52:return 4;case 53:return 5;case 54:return 6;case 55:return 7;case 56:return 8;case 57:return 9;case 97:return 10;case 65:return 10;case 98:return 11;case 66:return 11;case 99:return 12;case 67:return 12;case 100:return 13;case 68:return 13;case 101:return 14;case 69:return 14;case 102:return 15;case 70:return 15}return 0}})(n=s.CSS||(s.CSS={}))})(i=t.Format||(t.Format={}))})(A||(A={}));var B=[],j={"terminal.ansiBlack":{index:0},"terminal.ansiRed":{index:1},"terminal.ansiGreen":{index:2},"terminal.ansiYellow":{index:3},"terminal.ansiBlue":{index:4},"terminal.ansiMagenta":{index:5},"terminal.ansiCyan":{index:6},"terminal.ansiWhite":{index:7},"terminal.ansiBrightBlack":{index:8},"terminal.ansiBrightRed":{index:9},"terminal.ansiBrightGreen":{index:10},"terminal.ansiBrightYellow":{index:11},"terminal.ansiBrightBlue":{index:12},"terminal.ansiBrightMagenta":{index:13},"terminal.ansiBrightCyan":{index:14},"terminal.ansiBrightWhite":{index:15}};for(let i in j){let t=j[i],n=i.substring(13);B[t.index]={colorName:n,colorValue:"var(--vscode-"+i.replace(".","-")+")"}}var U=typeof window<"u"?window.trustedTypes?.createPolicy("notebookRenderer",{createHTML:i=>i,createScript:i=>i}):void 0;var X="\\u0000-\\u0020\\u007f-\\u009f",it=new RegExp("(?:[a-zA-Z][a-zA-Z0-9+.-]{2,}:\\/\\/|data:|www\\.)[^\\s"+X+'"]{2,}[^\\s'+X+`"')}\\],:;.!?]`,"ug"),st=/(?<=^|\s)(?:[a-zA-Z]:(?:(?:\\|\/)[\w\.-]*)+)/,rt=/(?<=^|\s)(?:(?:\~|\.)(?:(?:\\|\/)[\w\.-]*)+)/,lt=new RegExp(`(${st.source}|${rt.source})`),ct=/(?<=^|\s)((?:\~|\.)?(?:\/[\w\.-]*)+)/,ot=/(?:\:([\d]+))?(?:\:([\d]+))?/,at=typeof navigator<"u"?navigator.userAgent&&navigator.userAgent.indexOf("Windows")>=0:!1,ut=new RegExp(`${at?lt.source:ct.source}${ot.source}`,"g"),_t=/<a\s+(?:[^>]*?\s+)?href=(["'])(.*?)\1[^>]*?>.*?<\/a>/gi,mt=2e3,F=class i{shouldGenerateHtml(t){return t&&(!!i.injectedHtmlCreator||!!U)}createHtml(t){return i.injectedHtmlCreator?i.injectedHtmlCreator(t):U?.createHTML(t).toString()}linkify(t,n,s){if(s){let r=t.split(`
`);for(let a=0;a<r.length-1;a++)r[a]=r[a]+`
`;r[r.length-1]||r.pop();let l=r.map(a=>this.linkify(a,n,!1));if(l.length===1)return l[0];let c=document.createElement("span");return l.forEach(a=>c.appendChild(a)),c}let e=document.createElement("span");for(let r of this.detectLinks(t,!!n.trustHtml,n.linkifyFilePaths))try{let l=null;switch(r.kind){case"text":e.appendChild(document.createTextNode(r.value));break;case"web":case"path":e.appendChild(this.createWebLink(r.value));break;case"html":l=document.createElement("span"),l.innerHTML=this.createHtml(r.value),e.appendChild(l);break}}catch{e.appendChild(document.createTextNode(r.value))}return e}createWebLink(t){let n=this.createLink(t);return n.href=t,n}createLink(t){let n=document.createElement("a");return n.textContent=t,n}detectLinks(t,n,s){if(t.length>mt)return[{kind:"text",value:t,captures:[]}];let e=[],r=[],l=[];this.shouldGenerateHtml(n)&&(e.push(_t),r.push("html")),e.push(it),r.push("web"),s&&(e.push(ut),r.push("path"));let c=(a,u)=>{if(u>=e.length){l.push({value:a,kind:"text",captures:[]});return}let m=e[u],b=0,R;for(m.lastIndex=0;(R=m.exec(a))!==null;){let v=a.substring(b,R.index);v&&c(v,u+1);let _=R[0];l.push({value:_,kind:r[u],captures:R.slice(1)}),b=R.index+_.length}let E=a.substring(b);E&&c(E,u+1)};return c(t,0),l}},gt=new F;function J(i,t,n){return gt.linkify(i,t,n)}function O(i,t){let n=document.createElement("span"),s=i.length,e=[],r,l,c,a=!1,u=0,m="";for(;u<s;){let g=!1;if(i.charCodeAt(u)===27&&i.charAt(u+1)==="["){let p=u;u+=2;let o="";for(;u<s;){let L=i.charAt(u);if(o+=L,u++,L.match(/^[ABCDHIJKfhmpsu]$/)){g=!0;break}}if(g){if(z(n,m,t,e,r,l,c),m="",o.match(/^(?:[34][0-8]|9[0-7]|10[0-7]|[0-9]|2[1-5,7-9]|[34]9|5[8,9]|1[0-9])(?:;[349][0-7]|10[0-7]|[013]|[245]|[34]9)?(?:;[012]?[0-9]?[0-9])*;?m$/)){let L=o.slice(0,-1).split(";").filter(D=>D!=="").map(D=>parseInt(D,10));if(L[0]===38||L[0]===48||L[0]===58){let D=L[0]===38?"foreground":L[0]===48?"background":"underline";L[1]===5?_(L,D):L[1]===2&&v(L,D)}else E(L)}}else u=p}g===!1&&(m+=i.charAt(u),u++)}return m&&z(n,m,t,e,r,l,c),n;function b(g,p){g==="foreground"?r=p:g==="background"?l=p:g==="underline"&&(c=p),e=e.filter(o=>o!==`code-${g}-colored`),p!==void 0&&e.push(`code-${g}-colored`)}function R(){let g=r;b("foreground",l),b("background",g)}function E(g){for(let p of g)switch(p){case 0:{e=[],r=void 0,l=void 0;break}case 1:{e=e.filter(o=>o!=="code-bold"),e.push("code-bold");break}case 2:{e=e.filter(o=>o!=="code-dim"),e.push("code-dim");break}case 3:{e=e.filter(o=>o!=="code-italic"),e.push("code-italic");break}case 4:{e=e.filter(o=>o!=="code-underline"&&o!=="code-double-underline"),e.push("code-underline");break}case 5:{e=e.filter(o=>o!=="code-blink"),e.push("code-blink");break}case 6:{e=e.filter(o=>o!=="code-rapid-blink"),e.push("code-rapid-blink");break}case 7:{a||(a=!0,R());break}case 8:{e=e.filter(o=>o!=="code-hidden"),e.push("code-hidden");break}case 9:{e=e.filter(o=>o!=="code-strike-through"),e.push("code-strike-through");break}case 10:{e=e.filter(o=>!o.startsWith("code-font"));break}case 11:case 12:case 13:case 14:case 15:case 16:case 17:case 18:case 19:case 20:{e=e.filter(o=>!o.startsWith("code-font")),e.push(`code-font-${p-10}`);break}case 21:{e=e.filter(o=>o!=="code-underline"&&o!=="code-double-underline"),e.push("code-double-underline");break}case 22:{e=e.filter(o=>o!=="code-bold"&&o!=="code-dim");break}case 23:{e=e.filter(o=>o!=="code-italic"&&o!=="code-font-10");break}case 24:{e=e.filter(o=>o!=="code-underline"&&o!=="code-double-underline");break}case 25:{e=e.filter(o=>o!=="code-blink"&&o!=="code-rapid-blink");break}case 27:{a&&(a=!1,R());break}case 28:{e=e.filter(o=>o!=="code-hidden");break}case 29:{e=e.filter(o=>o!=="code-strike-through");break}case 53:{e=e.filter(o=>o!=="code-overline"),e.push("code-overline");break}case 55:{e=e.filter(o=>o!=="code-overline");break}case 39:{b("foreground",void 0);break}case 49:{b("background",void 0);break}case 59:{b("underline",void 0);break}case 73:{e=e.filter(o=>o!=="code-superscript"&&o!=="code-subscript"),e.push("code-superscript");break}case 74:{e=e.filter(o=>o!=="code-superscript"&&o!=="code-subscript"),e.push("code-subscript");break}case 75:{e=e.filter(o=>o!=="code-superscript"&&o!=="code-subscript");break}default:{d(p);break}}}function v(g,p){if(g.length>=5&&g[2]>=0&&g[2]<=255&&g[3]>=0&&g[3]<=255&&g[4]>=0&&g[4]<=255){let o=new x(g[2],g[3],g[4]);b(p,o)}}function _(g,p){let o=g[2],L=bt(o);if(L)b(p,L);else if(o>=0&&o<=15){if(p==="underline"){b(p,B[o].colorValue);return}o+=30,o>=38&&(o+=52),p==="background"&&(o+=10),d(o)}}function d(g){let p,o;g>=30&&g<=37?(o=g-30,p="foreground"):g>=90&&g<=97?(o=g-90+8,p="foreground"):g>=40&&g<=47?(o=g-40,p="background"):g>=100&&g<=107&&(o=g-100+8,p="background"),o!==void 0&&p&&b(p,B[o]?.colorValue)}}function z(i,t,n,s,e,r,l){if(!i||!t)return;let c=document.createElement("span");c.childElementCount===0&&(c=J(t,n,!0)),c.className=s.join(" "),e&&(c.style.color=typeof e=="string"?e:A.Format.CSS.formatRGB(new A(e))),r&&(c.style.backgroundColor=typeof r=="string"?r:A.Format.CSS.formatRGB(new A(r))),l&&(c.style.textDecorationColor=typeof l=="string"?l:A.Format.CSS.formatRGB(new A(l))),i.appendChild(c)}function bt(i){if(i%1===0)if(i>=16&&i<=231){i-=16;let t=i%6;i=(i-t)/6;let n=i%6;i=(i-n)/6;let s=i,e=255/5;return t=Math.round(t*e),n=Math.round(n*e),s=Math.round(s*e),new x(s,n,t)}else if(i>=232&&i<=255){i-=232;let t=Math.round(i/23*255);return new x(t,t,t)}else return}var G="scrollable",y=5e3,pt=8e3;function ft(i){let t=document.createElement("div");t.classList.add("truncation-message");let n=document.createElement("span");n.textContent="Output is truncated. View as a ",t.appendChild(n);let s=document.createElement("a");s.textContent="scrollable element",s.href=`command:cellOutput.enableScrolling?${i}`,s.ariaLabel="enable scrollable output",t.appendChild(s);let e=document.createElement("span");e.textContent=" or open in a ",t.appendChild(e);let r=document.createElement("a");r.textContent="text editor",r.href=`command:workbench.action.openLargeOutput?${i}`,r.ariaLabel="open output in text editor",t.appendChild(r);let l=document.createElement("span");l.textContent=". Adjust cell output ",t.appendChild(l);let c=document.createElement("a");c.textContent="settings",c.href="command:workbench.action.openSettings?%5B%22%40tag%3AnotebookOutputLayout%22%5D",c.ariaLabel="notebook output settings",t.appendChild(c);let a=document.createElement("span");return a.textContent="...",t.appendChild(a),t}function Et(i){let t=document.createElement("div"),n=document.createElement("a");return n.textContent="...",n.href=`command:workbench.action.openLargeOutput?${i}`,n.ariaLabel="Open full output in text editor",n.title="Open full output in text editor",n.style.setProperty("text-decoration","none"),t.appendChild(n),t}function xt(i,t,n,s){let e=document.createElement("div");e.setAttribute("data-vscode-context",JSON.stringify({webviewSection:"text",outputId:i,preventDefaultContextMenuItems:!0}));let r=t.length;if(r<=n){let c=O(t.join(`
`),s);return e.appendChild(c),e}e.appendChild(O(t.slice(0,n-5).join(`
`),s));let l=document.createElement("div");return l.innerText="...",e.appendChild(l),e.appendChild(O(t.slice(r-5).join(`
`),s)),e.appendChild(ft(i)),e}function Lt(i,t,n){let s=document.createElement("div");return s.setAttribute("data-vscode-context",JSON.stringify({webviewSection:"text",outputId:i,preventDefaultContextMenuItems:!0})),t.length>y&&s.appendChild(Et(i)),s.appendChild(O(t.slice(-1*y).join(`
`),n)),s}var S={};function dt(i,t,n,s){S[t]||(S[t]=0);let e=n.split(/\r\n|\r|\n/g),r=e.length+S[t];return r>pt?!1:(i.appendChild(O(e.join(`
`),s)),S[t]=r,!0)}function I(i,t,n){let{linesLimit:s,error:e,scrollable:r,trustHtml:l,linkifyFilePaths:c}=n,a={linkifyFilePaths:c,trustHtml:l},u=t.split(/\r\n|\r|\n/g);S[i]=S[i]=Math.min(u.length,y);let m;return r?m=Lt(i,u,a):m=xt(i,u,s,a),m.setAttribute("output-item-id",i),e&&m.classList.add("error"),m}function N(i,t,n){let s=i.appendedText?.(),e={linkifyFilePaths:n.linkifyFilePaths,trustHtml:n.trustHtml};if(s&&n.scrollable&&dt(t,i.id,s,e))return;let r=I(i.id,i.text(),n);for(t.replaceWith(r);r.nextSibling;)r.nextSibling.remove()}function Z(i){let t;return t=i.replace(/\u001b\[4\dm/g,""),t=t.replace(/\u001b\[38;.*?\d+m/g,"\x1B[39m"),t=t.replace(/(;32m[ ->]*?)(\d+)(.*)\n/g,(n,s,e,r)=>(r=r.replace(/\u001b\[3\d+m/g,"\x1B[39m"),`${s}${e}${r}
`)),Rt(t)?vt(t):{formattedStack:t}}var At=/\u001b\[.+?m/g,$=/File\s+(?:\u001b\[.+?m)?(.+):(\d+)/,Y=/^((?:\u001b\[.+?m)?[ \->]+?)(\d+)(?:\u001b\[0m)?( .*)/,M=/(?<prefix>Cell\s+(?:\u001b\[.+?m)?In\s*\[(?<executionCount>\d+)\],\s*)(?<lineLabel>line (?<lineNumber>\d+)).*/,H=/(?<prefix>Input\s+?(?:\u001b\[.+?m)(?<cellLabel>In\s*\[(?<executionCount>\d+)\]))(?<postfix>.*)/;function Rt(i){return M.test(i)||H.test(i)||$.test(i)}function P(i){return i.replace(At,"").trim()}function vt(i){let t=i.split(`
`),n,s="";for(let r in t){let l=t[r];if($.test(l)){let c=t[r].match($);n={kind:"file",path:P(c[1])};continue}else if(M.test(l)){n={kind:"cell",path:P(l.replace(M,"vscode-notebook-cell:?execution_count=$<executionCount>"))};let c=l.replace(M,`<a href='${n.path}&line=$<lineNumber>'>line $<lineNumber></a>`);t[r]=l.replace(M,`$<prefix>${c}`),s=s||c;continue}else if(H.test(l)){n={kind:"cell",path:P(l.replace(H,"vscode-notebook-cell:?execution_count=$<executionCount>"))};let c=l.replace(H,`<a href='${n.path}'>$<cellLabel></a>`);t[r]=l.replace(H,`Input ${c}$<postfix>`);continue}else if(!n||l.trim()===""){n=void 0;continue}else if(Y.test(l)){t[r]=l.replace(Y,(c,a,u,m)=>n?.kind==="file"?`${a}<a href='${n?.path}:${u}'>${u}</a>${m}`:`${a}<a href='${n?.path}&line=${u}'>${u}</a>${m}`);continue}}let e=s;return{formattedStack:t.join(`
`),errorLocation:e}}function W(i){for(;i.firstChild;)i.firstChild.remove()}function Tt(i,t){let n=new Blob([i.data()],{type:i.mime}),s=URL.createObjectURL(n),e={dispose:()=>{URL.revokeObjectURL(s)}};if(t.firstChild){let a=t.firstChild;if(a.firstChild&&a.firstChild.nodeName==="IMG"&&a.firstChild instanceof HTMLImageElement)return a.firstChild.src=s,e}let r=document.createElement("img");r.src=s;let l=et(i);l&&(r.alt=l),r.setAttribute("data-vscode-context",JSON.stringify({webviewSection:"image",outputId:i.id,preventDefaultContextMenuItems:!0}));let c=document.createElement("div");return c.classList.add("display"),c.appendChild(r),t.appendChild(c),e}var kt=["type","src","nonce","noModule","async"],nt=i=>{let t=Array.from(i.getElementsByTagName("script"));for(let n=0;n<t.length;n++){let s=t[n],e=document.createElement("script"),r=U?.createScript(s.innerText)??s.innerText;e.text=r;for(let l of kt){let c=s[l]||s.getAttribute&&s.getAttribute(l);c&&e.setAttribute(l,c)}i.appendChild(e).parentNode.removeChild(e)}};function et(i){let t=i.metadata;if(typeof t=="object"&&t&&"vscode_altText"in t&&typeof t.vscode_altText=="string")return t.vscode_altText}function Ut(i,t){if(i.mime.indexOf("svg")>-1){let n=t.querySelector("svg"),s=et(i);if(n&&s){let e=document.createElement("title");e.innerText=s,n.prepend(e)}n&&(n.classList.add("output-image"),n.setAttribute("data-vscode-context",JSON.stringify({webviewSection:"image",outputId:i.id,preventDefaultContextMenuItems:!0})))}}async function Dt(i,t,n,s){W(t);let e=document.createElement("div"),r=i.text(),l=U?.createHTML(r)??r;e.innerHTML=l,Ut(i,e);for(let c of s)if(e=await c.postRender(i,e,n)??e,n.aborted)return;t.appendChild(e),nt(e)}async function wt(i,t,n,s){let e=i.text();for(let a of s)if(e=await a.preEvaluate(i,t,e,n)??e,n.aborted)return;let r=document.createElement("script");r.type="module",r.textContent=e;let l=document.createElement("div"),c=U?.createHTML(r.outerHTML)??r.outerHTML;l.innerHTML=c,t.appendChild(l),nt(l)}function K(){let i=[];return{push:(...n)=>{i.push(...n)},dispose:()=>{i.forEach(n=>n.dispose())}}}function Ot(i,t,n,s){let e=K();W(t);let r;try{r=JSON.parse(i.text())}catch(c){return console.log(c),e}let l=r.name&&r.message?`${r.name}: ${r.message}`:r.name||r.message;if(r.stack){let c=n.settings.minimalError&&!!l?.length;t.classList.add("traceback");let{formattedStack:a,errorLocation:u}=Z(r.stack),m=!c&&q(i,n.settings),R={linesLimit:c?1e3:n.settings.lineLimit,scrollable:m,trustHtml:s,linkifyFilePaths:!1},E=I(i.id,a,R),v=document.createElement("div");v.appendChild(E),t.classList.toggle("word-wrap",n.settings.outputWordWrap),e.push(n.onDidChangeSettings(_=>{t.classList.toggle("word-wrap",_.outputWordWrap)})),c?St(u,l,v,t):(v.classList.toggle("scrollable",m),t.appendChild(v),V(v,e))}else{let c=document.createElement("div");l&&(c.innerText=l,t.appendChild(c))}return t.classList.add("error"),e}function St(i,t,n,s){let e=document.createElement("div"),r=document.createElement("div");r.classList.add("error-output-header"),i&&i.indexOf("<a")===0&&(r.innerHTML=i);let l=document.createElement("span");l.innerText=t,r.appendChild(l),e.appendChild(r);function c(m){let b=document.createElement("li");return b.appendChild(m),b.onmouseover=function(){b.classList.add("hover")},b.onmouseout=function(){b.classList.remove("hover")},b}let a=document.createElement("ul");a.classList.add("error-output-actions"),e.appendChild(a);let u=document.createElement("a");u.innerText="Show Details",u.href="#!",a.appendChild(c(u)),u.onclick=m=>{m.preventDefault();let b=n.style.display==="none";n.style.display=b?"":"none",u.innerText=b?"Hide Details":"Show Details"},e.appendChild(n),n.style.display="none",s.appendChild(e)}function It(i){let t=i.parentElement,n,s=t?.previousSibling;for(;s;){let e=s.firstChild;if(!e||!e.classList.contains("output-stream"))break;n=e.firstChild,s=s?.previousSibling}return n}function Q(i){let t=i.target;t.scrollTop===0?t.classList.remove("more-above"):t.classList.add("more-above")}function h(i){i.ctrlKey||i.shiftKey||(i.code==="ArrowDown"||i.code==="ArrowUp"||i.code==="End"||i.code==="Home"||i.code==="PageUp"||i.code==="PageDown")&&i.stopPropagation()}function V(i,t,n){if(i.classList.contains(G)){let s=i.scrollHeight>i.clientHeight;i.classList.toggle("scrollbar-visible",s),i.scrollTop=n!==void 0?n:i.scrollHeight,s&&(i.addEventListener("scroll",Q),t.push({dispose:()=>i.removeEventListener("scroll",Q)}),i.addEventListener("keydown",h),t.push({dispose:()=>i.removeEventListener("keydown",h)}))}}function Mt(i){let t=i.querySelector("."+G);if(t&&t.scrollHeight-t.scrollTop-t.clientHeight>2)return t.scrollTop}function q(i,t){let n=i.metadata;return typeof n=="object"&&n&&"scrollable"in n&&typeof n.scrollable=="boolean"?n.scrollable:t.outputScrolling}function C(i,t,n,s){let e=K(),r=q(i,s.settings),l={linesLimit:s.settings.lineLimit,scrollable:r,trustHtml:!1,error:n,linkifyFilePaths:s.settings.linkifyFilePaths};t.classList.add("output-stream");let c=r?Mt(t):void 0,a=It(t);if(a){let u=a.querySelector(`[output-item-id="${i.id}"]`);if(u)N(i,u,l);else{let m=I(i.id,i.text(),l);a.appendChild(m)}a.classList.toggle("scrollbar-visible",a.scrollHeight>a.clientHeight),a.scrollTop=c!==void 0?c:a.scrollHeight}else{let u=t.querySelector(`[output-item-id="${i.id}"]`),m=u?.parentElement;if(u&&m)N(i,u,l);else{let b=I(i.id,i.text(),l);for(m=document.createElement("div"),m.appendChild(b);t.firstChild;)t.firstChild.remove();t.appendChild(m)}m.classList.toggle("scrollable",r),t.classList.toggle("word-wrap",s.settings.outputWordWrap),e.push(s.onDidChangeSettings(b=>{t.classList.toggle("word-wrap",b.outputWordWrap)})),V(m,e,c)}return e}function tt(i,t,n){let s=K();W(t);let e=i.text(),r=q(i,n.settings),l={linesLimit:n.settings.lineLimit,scrollable:r,trustHtml:!1,linkifyFilePaths:n.settings.linkifyFilePaths},c=I(i.id,e,l);return c.classList.add("output-plaintext"),t.classList.toggle("word-wrap",n.settings.outputWordWrap),s.push(n.onDidChangeSettings(a=>{t.classList.toggle("word-wrap",a.outputWordWrap)})),c.classList.toggle("scrollable",r),t.appendChild(c),V(c,s),s}var Yt=i=>{let t=new Map,n=new Set,s=new Set,e=i,r=document.createElement("style");return r.textContent=`
	#container div.output.remove-padding {
		padding-left: 0;
		padding-right: 0;
	}
	.output-plaintext,
	.output-stream,
	.traceback {
		display: inline-block;
		width: 100%;
		line-height: var(--notebook-cell-output-line-height);
		font-family: var(--notebook-cell-output-font-family);
		font-size: var(--notebook-cell-output-font-size);
		user-select: text;
		-webkit-user-select: text;
		-ms-user-select: text;
		cursor: auto;
		word-wrap: break-word;
		/* text/stream output container should scroll but preserve newline character */
		white-space: pre;
	}
	/* When wordwrap turned on, force it to pre-wrap */
	#container div.output_container .word-wrap {
		white-space: pre-wrap;
	}
	#container div.output>div {
		padding-left: var(--notebook-output-node-left-padding);
		padding-right: var(--notebook-output-node-padding);
		box-sizing: border-box;
		border-width: 1px;
		border-style: solid;
		border-color: transparent;
	}
	#container div.output>div:focus {
		outline: 0;
		border-color: var(--theme-input-focus-border-color);
	}
	#container div.output .scrollable {
		overflow-y: auto;
		max-height: var(--notebook-cell-output-max-height);
	}
	#container div.output .scrollable.scrollbar-visible {
		border-color: var(--vscode-editorWidget-border);
	}
	#container div.output .scrollable.scrollbar-visible:focus {
		border-color: var(--theme-input-focus-border-color);
	}
	#container div.truncation-message {
		font-style: italic;
		font-family: var(--theme-font-family);
		padding-top: 4px;
	}
	#container div.output .scrollable div {
		cursor: text;
	}
	#container div.output .scrollable div a {
		cursor: pointer;
	}
	#container div.output .scrollable.more-above {
		box-shadow: var(--vscode-scrollbar-shadow) 0 6px 6px -6px inset
	}
	.output-plaintext .code-bold,
	.output-stream .code-bold,
	.traceback .code-bold {
		font-weight: bold;
	}
	.output-plaintext .code-italic,
	.output-stream .code-italic,
	.traceback .code-italic {
		font-style: italic;
	}
	.output-plaintext .code-strike-through,
	.output-stream .code-strike-through,
	.traceback .code-strike-through {
		text-decoration: line-through;
	}
	.output-plaintext .code-underline,
	.output-stream .code-underline,
	.traceback .code-underline {
		text-decoration: underline;
	}
	#container ul.error-output-actions {
		margin: 0px;
		padding: 6px 0px 0px 6px;
		padding-inline-start: 0px;
	}
	#container .error-output-actions li {
		padding: 0px 4px 0px 4px;
		border-radius: 5px;
		height: 20px;
		display: inline-flex;
		cursor: pointer;
		border: solid 1px var(--vscode-notebook-cellToolbarSeparator);
	}
	#container .error-output-actions li.hover {
		background-color: var(--vscode-toolbar-hoverBackground);
	}
	#container .error-output-actions li:focus-within {
		border-color: var(--theme-input-focus-border-color);
	}
	#container .error-output-actions a:focus {
		outline: 0;
	}
	#container .error-output-actions li a {
		color: var(--vscode-foreground);
		text-decoration: none;
	}
	#container .error-output-header a {
		padding-right: 12px;
	}
	`,document.body.appendChild(r),{renderOutputItem:async(l,c,a)=>{switch(c.classList.add("remove-padding"),l.mime){case"text/html":case"image/svg+xml":{if(!i.workspace.isTrusted)return;await Dt(l,c,a,n);break}case"application/javascript":{if(!i.workspace.isTrusted)return;wt(l,c,a,s);break}case"image/gif":case"image/png":case"image/jpeg":case"image/git":{t.get(l.id)?.dispose();let u=Tt(l,c);t.set(l.id,u)}break;case"application/vnd.code.notebook.error":{t.get(l.id)?.dispose();let u=Ot(l,c,e,i.workspace.isTrusted);t.set(l.id,u)}break;case"application/vnd.code.notebook.stdout":case"application/x.notebook.stdout":case"application/x.notebook.stream":{t.get(l.id)?.dispose();let u=C(l,c,!1,e);t.set(l.id,u)}break;case"application/vnd.code.notebook.stderr":case"application/x.notebook.stderr":{t.get(l.id)?.dispose();let u=C(l,c,!0,e);t.set(l.id,u)}break;case"text/plain":{t.get(l.id)?.dispose();let u=tt(l,c,e);t.set(l.id,u)}break;default:if(l.mime.indexOf("text/")>-1){t.get(l.id)?.dispose();let u=tt(l,c,e);t.set(l.id,u)}break}c.querySelector("div")&&(c.querySelector("div").tabIndex=0)},disposeOutputItem:l=>{l?t.get(l)?.dispose():t.forEach(c=>c.dispose())},experimental_registerHtmlRenderingHook:l=>(n.add(l),{dispose:()=>{n.delete(l)}}),experimental_registerJavaScriptRenderingHook:l=>(s.add(l),{dispose:()=>{s.delete(l)}})}};export{Yt as activate};