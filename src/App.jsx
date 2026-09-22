import { useState, useRef } from "react"
export default function App(){
const [d,setD]=useState(30)
const [c,setC]=useState("Facts")
const [s,setS]=useState("Why commercial airplanes don't have parachutes? At 35000 feet -54C 900 km/h. 80 ton plane needs stadium size parachute. Real safety is backup systems.")
const [l,setL]=useState("English")
const [r,setR]=useState("9:16")
const [res,setRes]=useState("720p")
const [voice,setVoice]=useState("Deep Male")
const [musicOn,setMusicOn]=useState(true)
const [subsOn,setSubsOn]=useState(true)
const [hookOn,setHookOn]=useState(true)
const [waterOff,setWaterOff]=useState(true)
const [bg,setBg]=useState("Aviation")
const [prog,setProg]=useState(0)
const [gen,setGen]=useState(false)
const [done,setDone]=useState(false)
const [videoUrl,setVideoUrl]=useState("")
const [thumbUrl,setThumbUrl]=useState("")
const [hashs,setHashs]=useState("")
const [subText,setSubText]=useState("")
const cats=["Horror","Islamic","SpaceX","Comedy","Motivation","Crime","History","Tech","Gaming","Business","Mystery","Love","Kids","Facts","AI","Nature","Sports","Monetization","Scary","Curse"]
const voices=["Deep Male","Female Soft","Scary Voice","Kids Voice","Urdu Male","Robot"]
const bgs=["Aviation","Space","Ocean","City","Forest","Desert","Abstract"]
const ress=["720p HD","1080p FHD","2K QHD","4K UHD"]

const getWH=()=>{
let base=720
if(res.includes("1080")) base=1080
if(res.includes("2K")) base=1440
if(res.includes("4K")) base=2160
if(r==="9:16") return {w:base,h:Math.floor(base*16/9)}
if(r==="16:9") return {w:Math.floor(base*16/9),h:base}
return {w:base,h:base}
}

const genHashtags=()=>{
setHashs(`#${c.toLowerCase()} #viral #${res.replace(" ","")} #${r.replace(":","x")} #${voice.replace(" ","")} #shorts #${l} #clipoora`)
}

const genThumb=(canvas)=>{
const tCanvas=document.createElement("canvas")
tCanvas.width=720
tCanvas.height=1280
const tCtx=tCanvas.getContext("2d")
tCtx.drawImage(canvas,0,0,720,1280)
tCtx.fillStyle="#a855f7"
tCtx.fillRect(0,1000,720,80)
tCtx.fillStyle="#fff"
tCtx.font="bold 40px system-ui"
tCtx.textAlign="center"
tCtx.fillText(c.toUpperCase()+" "+res,360,1050)
setThumbUrl(tCanvas.toDataURL())
}

const speak=(text)=>{
if('speechSynthesis' in window){
const u=new SpeechSynthesisUtterance(text.slice(0,200))
u.rate=0.9
u.pitch=voice==="Deep Male"?0.7:voice==="Female Soft"?1.3:voice==="Scary Voice"?0.5:1
u.lang=l==="Urdu"?"ur-PK":l==="Hindi"?"hi-IN":"en-US"
speechSynthesis.speak(u)
}
}

const generateAll=async()=>{
if(!s){alert("Script likho!");return}
setGen(true);setDone(false);setProg(0);setVideoUrl("");genHashtags()
if(hookOn) speak(s)
const {w,h}=getWH()
const canvas=document.createElement("canvas")
canvas.width=w;canvas.height=h
const ctx=canvas.getContext("2d")
const stream=canvas.captureStream(30)
const mime=MediaRecorder.isTypeSupported("video/webm;codecs=vp9")?"video/webm;codecs=vp9":"video/webm"
const recorder=new MediaRecorder(stream,{mimeType:mime})
let chunks=[]
recorder.ondataavailable=e=>{if(e.data.size>0)chunks.push(e.data)}
recorder.onstop=()=>{
const blob=new Blob(chunks,{type:"video/webm"})
setVideoUrl(URL.createObjectURL(blob))
setGen(false);setDone(true);setProg(100)
genThumb(canvas)
}
recorder.start()
let frame=0
const total=d*30
let audioCtx
if(musicOn){try{audioCtx=new (window.AudioContext||window.webkitAudioContext)()}catch{}}
const iv=setInterval(()=>{
const pct=Math.floor((frame/total)*100)
setProg(pct)
let g=ctx.createLinearGradient(0,0,0,h)
if(bg==="Aviation"){g.addColorStop(0,"#0a1420");g.addColorStop(1,"#1a2a4a")}
else if(bg==="Space"){g.addColorStop(0,"#000");g.addColorStop(1,"#1a0a3e")}
else{g.addColorStop(0,"#001f3f");g.addColorStop(1,"#003366")}
ctx.fillStyle=g
ctx.fillRect(0,0,w,h)
ctx.fillStyle="#ffffff08"
for(let i=0;i<6;i++){ctx.beginPath();ctx.arc((frame*1.5+i*150)%w,100+i*40,30,0,Math.PI*2);ctx.fill()}
const parts=s.split(".").filter(x=>x.trim().length>5)
let idx=Math.floor((frame/total)*parts.length)
let cur=parts[Math.min(idx,parts.length-1)]||parts[0]
if(subsOn){
setSubText(cur.slice(0,80))
ctx.fillStyle="rgba(0,0,0,0.7)"
ctx.fillRect(0,h*0.65,w,h*0.15)
ctx.fillStyle="#fff"
ctx.font=`bold ${w*0.045}px system-ui`
ctx.textAlign="center"
let words=cur.split(" ")
let line1=words.slice(0,6).join(" ")
let line2=words.slice(6,12).join(" ")
ctx.fillText(line1,w/2,h*0.7)
ctx.fillText(line2,w/2,h*0.77)
}
ctx.fillStyle="#a855f7"
ctx.fillRect(20,20,260,36)
ctx.fillStyle="#fff"
ctx.font="bold 14px system-ui"
ctx.textAlign="left"
ctx.fillText(`${c} | ${res} | ${r} | ${voice}`,30,43)
ctx.fillStyle="#ffffff60"
ctx.font=`${w*0.02}px system-ui`
ctx.fillText(`${w}x${h} ${res} BG:${bg} Music:${musicOn?"ON":"OFF"}`,20,h-20)
if(waterOff===false){
ctx.fillStyle="rgba(168,85,247,0.6)"
ctx.font="bold 20px system-ui"
ctx.fillText("CLIPOORA",20,90)
}
if(musicOn && audioCtx && frame%90===0){
try{const o=audioCtx.createOscillator();const ga=audioCtx.createGain();o.frequency.value=voice==="Scary Voice"?80:120;ga.gain.value=0.02;o.connect(ga).connect(audioCtx.destination);o.start();o.stop(audioCtx.currentTime+0.3)}catch{}
}
frame++
if(frame>=total){clearInterval(iv);recorder.stop();if(audioCtx)audioCtx.close()}
},1000/30)
}

const downloadVid=()=>{
if(!videoUrl)return
const a=document.createElement("a")
a.href=videoUrl
const {w,h}=getWH()
a.download=`CLIPOORA_${c}_${res}_${w}x${h}_${Date.now()}.webm`
a.click()
}
const downloadThumb=()=>{
if(!thumbUrl)return
const a=document.createElement("a")
a.href=thumbUrl
a.download=`THUMB_${c}_${res}_${Date.now()}.png`
a.click()
}

return(<div style={{background:"#07070a",color:"#fff",minHeight:"100vh",fontFamily:"system-ui"}}>
<div style={{background:"#111113",padding:"12px",borderBottom:"1px solid #222",display:"flex",justifyContent:"space-between"}}><h1 style={{margin:0,color:"#a855f7",fontSize:"18px"}}>CLIPOORA 50 FUNC <span style={{background:"#22c55e",color:"#fff",fontSize:"8px",padding:"2px 6px",borderRadius:"10px"}}>RES ADDED</span></h1><span style={{fontSize:"10px",opacity:0.6}}>{getWH().w}x{getWH().h} {res}</span></div>
<div style={{padding:"10px",maxWidth:"520px",margin:"0 auto"}}>
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"6px",marginBottom:"6px"}}>
<div style={{background:"#141416",border:"1px solid #a855f7",borderRadius:"8px",padding:"8px"}}><b style={{fontSize:"11px"}}>1.Duration {d}s</b><input type="range" min="5" max="60" value={d} onChange={e=>setD(e.target.value)} style={{width:"100%"}}/></div>
<div style={{background:"#141416",border:"1px solid #a855f7",borderRadius:"8px",padding:"8px"}}><b style={{fontSize:"11px"}}>🎥 RESOLUTION (NEW)</b><select value={res} onChange={e=>setRes(e.target.value)} style={{width:"100%",background:"#000",color:"#22c55e",border:"1px solid #a855f7",fontSize:"12px",fontWeight:"700"}}>{ress.map(v=><option key={v}>{v}</option>)}</select><div style={{fontSize:"8px",opacity:0.5,marginTop:"2px"}}>{getWH().w} x {getWH().h}</div></div>
<div style={{background:"#141416",border:"1px solid #333",borderRadius:"8px",padding:"8px"}}><b style={{fontSize:"11px"}}>11.Lang</b><select value={l} onChange={e=>setL(e.target.value)} style={{width:"100%",background:"#000",color:"#fff",border:"1px solid #333",fontSize:"11px"}}><option>English</option><option>Urdu</option><option>Hindi</option></select></div>
<div style={{background:"#141416",border:"1px solid #333",borderRadius:"8px",padding:"8px"}}><b style={{fontSize:"11px"}}>12.Ratio</b><select value={r} onChange={e=>setR(e.target.value)} style={{width:"100%",background:"#000",color:"#fff",border:"1px solid #333",fontSize:"11px"}}><option>9:16</option><option>16:9</option><option>1:1</option></select></div>
<div style={{background:"#141416",border:"1px solid #333",borderRadius:"8px",padding:"8px"}}><b style={{fontSize:"11px"}}>13.Voice</b><select value={voice} onChange={e=>setVoice(e.target.value)} style={{width:"100%",background:"#000",color:"#fff",border:"1px solid #333",fontSize:"11px"}}>{voices.map(v=><option key={v}>{v}</option>)}</select></div>
<div style={{background:"#141416",border:"1px solid #333",borderRadius:"8px",padding:"8px"}}><b style={{fontSize:"11px"}}>16.BG</b><select value={bg} onChange={e=>setBg(e.target.value)} style={{width:"100%",background:"#000",color:"#fff",border:"1px solid #333",fontSize:"11px"}}>{bgs.map(v=><option key={v}>{v}</option>)}</select></div>
</div>
<div style={{background:"#141416",border:"1px solid #333",borderRadius:"8px",padding:"8px",marginBottom:"6px",display:"flex",flexWrap:"wrap",gap:"4px"}}>
{cats.map(x=><button key={x} onClick={()=>setC(x)} style={{padding:"4px 7px",borderRadius:"12px",border:"1px solid",borderColor:c===x?"#a855f7":"#222",background:c===x?"#a855f7":"#1e1e22",color:"#fff",fontSize:"9px"}}>{x}</button>)}
</div>
<div style={{background:"#141416",border:"1px solid #333",borderRadius:"8px",padding:"8px",marginBottom:"6px",display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"6px",fontSize:"11px"}}>
<label><input type="checkbox" checked={musicOn} onChange={e=>setMusicOn(e.target.checked)}/>Music</label>
<label><input type="checkbox" checked={subsOn} onChange={e=>setSubsOn(e.target.checked)}/>Subs</label>
<label><input type="checkbox" checked={hookOn} onChange={e=>setHookOn(e.target.checked)}/>TTS</label>
<label><input type="checkbox" checked={waterOff} onChange={e=>setWaterOff(e.target.checked)}/>NoWater</label>
<label>BG ON</label>
<label>50 Auto</label>
</div>
<div style={{background:"#141416",border:"1px solid #a855f7",borderRadius:"8px",padding:"8px",marginBottom:"8px"}}>
<textarea value={s} onChange={e=>setS(e.target.value)} style={{width:"100%",height:"60px",background:"#000",color:"#fff",border:"1px solid #333",borderRadius:"6px",padding:"6px",fontSize:"12px"}}/>
{subText && <div style={{fontSize:"10px",color:"#22c55e",marginTop:"4px"}}>Live Sub: {subText}</div>}
</div>
{!gen &&!done && <button onClick={generateAll} style={{width:"100%",padding:"14px",background:"#a855f7",color:"#fff",border:"none",borderRadius:"10px",fontWeight:"900",fontSize:"14px"}}>GENERATE {res} {getWH().w}x{getWH().h} - {d}s</button>}
{gen && <div style={{background:"#111",border:"1px solid #a855f7",borderRadius:"10px",padding:"14px",textAlign:"center"}}><b>{prog}% - Rendering {res} {getWH().w}x{getWH().h}</b><div style={{height:"10px",background:"#222",borderRadius:"10px",marginTop:"8px"}}><div style={{width:prog+"%",height:"100%",background:"#a855f7"}}></div></div></div>}
{done && <div style={{background:"#111",border:"1px solid #22c55e",borderRadius:"10px",padding:"10px"}}>
<div style={{color:"#22c55e",textAlign:"center",fontWeight:"800"}}>✅ {res} {getWH().w}x{getWH().h} DONE!</div>
{videoUrl && <video src={videoUrl} controls style={{width:"100%",height:"220px",background:"#000",borderRadius:"8px",marginTop:"8px"}}></video>}
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"6px",marginTop:"8px"}}>
<button onClick={downloadVid} style={{padding:"10px",background:"#22c55e",color:"#fff",border:"none",borderRadius:"6px",fontWeight:"700",fontSize:"12px"}}>📥 {res} Video</button>
<button onClick={downloadThumb} style={{padding:"10px",background:"#a855f7",color:"#fff",border:"none",borderRadius:"6px",fontWeight:"700",fontSize:"12px"}}>🖼️ Thumb</button>
</div>
{hashs && <div style={{background:"#000",border:"1px solid #333",borderRadius:"6px",padding:"6px",marginTop:"6px",fontSize:"10px"}}>{hashs}</div>}
<button onClick={()=>{setDone(false);setProg(0)}} style={{width:"100%",marginTop:"6px",padding:"8px",background:"#222",color:"#fff",border:"1px solid #333",borderRadius:"6px",fontSize:"12px"}}>New {res} Video</button>
</div>}
</div>
</div>)
}
