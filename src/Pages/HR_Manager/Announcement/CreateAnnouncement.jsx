import React, { useState, useRef } from "react";
import Dropdown from "../../../Components/Dropdown";
import TextEditor from "../../../Components/TextEditor";
import SocialPost from "./SocialPost"; 
import { useAnnouncements } from "../../../Context/AnnouncementContext";

export default function CreateAnnouncement() {
  const { publishAnnouncement } = useAnnouncements();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1); 
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [priority, setPriority] = useState("Normal");
  const [attachments, setAttachments] = useState([]);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const newFiles = files.map(file => {
      const type = file.type.split('/')[0];
      return {
        file,
        name: file.name,
        type: ['image', 'video', 'audio'].includes(type) ? type : 'file',
        url: URL.createObjectURL(file), // Local blob for preview
        size: (file.size / 1024).toFixed(1) + " KB"
      };
    });
    setAttachments(prev => [...prev, ...newFiles]);
  };

  const handlePublish = async () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('body', body);
    formData.append('priority', priority);
    attachments.forEach(item => formData.append('attachments', item.file));

    try {
      await publishAnnouncement(formData);
      resetForm();
    } catch (err) {
      alert("Failed to publish. Ensure backend handles 'attachments' field.");
    }
  };

  const resetForm = () => {
    attachments.forEach(a => URL.revokeObjectURL(a.url)); // Cleanup memory
    setOpen(false); setStep(1); setTitle(""); setBody(""); setAttachments([]);
  };

  if (!open) return (
    <button onClick={() => setOpen(true)} className="dark:bg-slate-600 bg-slate-900 text-white px-5 py-2 rounded dark:shadow-slate-900 dark:shadow dark:inset-shadow-xs dark:inset-shadow-slate-600 font-bold shadow-lg hover:bg-slate-700 transition">
      + New Post
    </button>
  );

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-2xl shadow-2xl flex flex-col max-h-[90vh]">
        <div className="p-5 border-b flex justify-between items-center">
          <div>
            <h2 className="font-black text-xl">{step === 1 ? "Compose News" : "Final Review"}</h2>
            <p className="text-[10px] uppercase font-bold text-slate-400">
              {step === 1 ? "Drafting content" : "This is how it looks for employees"}
            </p>
          </div>
          <button onClick={resetForm} className="text-slate-400 text-2xl hover:text-red-500">×</button>
        </div>
        
        <div className="p-6 overflow-y-auto bg-slate-50/30">
          {step === 1 ? (
            <div className="space-y-4">
              <Dropdown onChange={setPriority} options={[{content:'Normal'},{content:'High'},{content:'Urgent'}]} placeholder="Priority" border="border rounded-lg px-3 py-1 bg-white text-xs font-bold"/>
              <input className="w-full text-2xl font-black outline-none bg-transparent" placeholder="Headline..." value={title} onChange={(e)=>setTitle(e.target.value)} />
              <div className="bg-white rounded-xl border p-2 min-h-[200px]"><TextEditor onChange={setBody} /></div>
              
              <div className="grid grid-cols-4 gap-2">
                {attachments.map((f, i) => (
                  <div key={i} className="relative aspect-square bg-white rounded-lg border overflow-hidden">
                    {f.type === 'image' ? <img src={f.url} className="w-full h-full object-cover" /> : <div className="flex items-center justify-center h-full text-[10px] font-bold text-slate-400 p-1 text-center">{f.name}</div>}
                    <button onClick={() => setAttachments(attachments.filter((_, idx) => idx !== i))} className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs">×</button>
                  </div>
                ))}
              </div>
              <div className="border-2 border-dashed rounded-xl p-6 flex flex-col items-center bg-white cursor-pointer hover:bg-slate-50" onClick={() => fileInputRef.current.click()}>
                <span className="text-2xl mb-1">📎</span>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Attach Media / Documents</span>
                <input type="file" ref={fileInputRef} className="hidden" multiple onChange={handleFileChange} />
              </div>
            </div>
          ) : (
            <div className="border-4 border-blue-100 rounded-3xl p-1">
               <SocialPost announcement={{ title, body, priority, attachments, createdAt: new Date() }} isDetailView={true} />
            </div>
          )}
        </div>

        <div className="p-5 border-t flex gap-3 bg-white rounded-b-2xl">
          {step === 1 ? (
            <button disabled={!title || !body} onClick={() => setStep(2)} className="w-full bg-slate-900 text-white font-black py-4 rounded-xl disabled:opacity-30">
              Continue to Preview →
            </button>
          ) : (
            <>
              <button onClick={() => setStep(1)} className="flex-1 bg-slate-100 font-black py-4 rounded-xl">Back to Edit</button>
              <button onClick={handlePublish} className="flex-[2] bg-green-600 text-white font-black py-4 rounded-xl shadow-lg">Confirm & Publish</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}