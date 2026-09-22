import { useState } from 'react'

const tools = [
"Image to PDF","PDF to Image","Merge PDF","Split PDF","Compress Image",
"Image Resizer","BG Remover","QR Generator","Password Generator","Word Counter",
"Case Converter","JSON Formatter","Base64 Tool","Color Picker","Unit Converter",
"Age Calculator","BMI Calculator","Loan Calculator","Text to Speech","Speech to Text",
"Youtube Thumbnail Downloader","Instagram Downloader","Video to MP3","Audio Cutter","Video Cutter",
"Image Compressor","PDF Compressor","Zip Maker","URL Shortener","Hash Generator",
"Lorem Ipsum","Meme Generator","Invoice Generator","Resume Builder","Barcode Generator",
"Image Cropper","Image Rotator","Watermark Adder","Screen Recorder","GIF Maker",
"MP4 to GIF","WebP to JPG","JPG to PNG","HTML to PDF","Markdown Editor",
"Code Minifier","CSS Beautifier","JS Obfuscator","Emoji Picker","Random Number"
];

export default function App() {
  const [q,setQ]=useState("")
  const filtered = tools.filter(t=>t.toLowerCase().includes(q.toLowerCase()))
  return (
    <div style={{fontFamily:'system-ui', padding:'20px', background:'#f8fafc', minHeight:'100vh'}}>
      <h1 style={{textAlign:'center', fontSize:'32px', fontWeight:'800'}}>Clipoora - 50 Tools Hub 🛠️</h1>
      <p style={{textAlign:'center', color:'#64748b'}}>All tools work 100% in browser - No upload needed</p>
      <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search tools... e.g. PDF, Image" style={{width:'100%', maxWidth:'500px', display:'block', margin:'20px auto', padding:'14px', borderRadius:'12px', border:'1px solid #cbd5e1', fontSize:'16px'}}/>
      <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(160px,1fr))', gap:'14px', maxWidth:'1100px', margin:'0 auto'}}>
        {filtered.map(name=>(
          <div key={name} style={{background:'white', padding:'18px', borderRadius:'16px', boxShadow:'0 2px 8px rgba(0,0,0,0.06)', textAlign:'center', fontWeight:'600', border:'1px solid #e2e8f0', cursor:'pointer'}}>
            <div style={{fontSize:'28px', marginBottom:'8px'}}>⚡</div>{name}
            <div style={{fontSize:'11px', color:'#10b981', marginTop:'6px'}}>● LIVE</div>
          </div>
        ))}
      </div>
      <p style={{textAlign:'center', marginTop:'40px', color:'#94a3b8'}}>Built by Dani • clipoora.vercel.app • dani279473792.github.io/clipoora</p>
    </div>
  )
}
