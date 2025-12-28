import React, { useState, useEffect } from "react";

export default function SocialPost({ announcement, isDetailView = false }) {
  const { title, body, priority, createdAt, attachments = [], reads = 0 } = announcement;
  const [expanded, setExpanded] = useState(isDetailView);
  
  // Logic to handle both local preview URLs and server URLs
  const getUrl = (url) => {
    if (!url) return "";
    return (url.startsWith('blob:') || url.startsWith('http')) ? url : `${import.meta.env.VITE_API_URL}${url}`;
  };

  const media = attachments.filter(a => a.type === 'image' || a.type === 'video');
  const files = attachments.filter(a => a.type === 'file');
  const [activeMedia, setActiveMedia] = useState(media[0] || null);

  useEffect(() => { setActiveMedia(media[0]); }, [announcement]);

  return (
    <div className={`bg-white dark:bg-slate-900 overflow-hidden ${isDetailView ? '' : 'rounded-3xl shadow-sm border border-slate-100 mb-8'}`}>
      <div className="p-5 flex gap-4 items-center">
        <div className="w-10 h-10 rounded-full bg-slate-800 text-white flex items-center justify-center font-black text-xs">HR</div>
        <div className="flex-1">
          <div className="font-black text-sm text-slate-800">Human Resources</div>
          <div className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
            {new Date(createdAt).toLocaleDateString()} • {priority} Priority
          </div>
        </div>
      </div>

      <div className="px-6 pb-4">
        <h4 className="text-xl font-black mb-2 text-slate-900">{title}</h4>
        <div className={`text-sm leading-relaxed text-slate-600 ${(!expanded && !isDetailView) ? 'line-clamp-3' : ''}`} 
             dangerouslySetInnerHTML={{ __html: body }} />
        {body.length > 200 && !isDetailView && (
          <button onClick={() => setExpanded(!expanded)} className="text-blue-600 font-bold mt-2 text-xs">
            {expanded ? "Show Less" : "Read More"}
          </button>
        )}
      </div>

      {media.length > 0 && (
        <div className="px-6 pb-6">
          <div className="rounded-2xl overflow-hidden border bg-black aspect-video flex flex-col">
            <div className="flex-1 flex items-center justify-center overflow-hidden">
              {activeMedia?.type === 'image' ? (
                <img src={getUrl(activeMedia.url)} className="w-full h-full object-contain" alt="Preview" />
              ) : (
                <video src={getUrl(activeMedia?.url)} controls className="w-full h-full" />
              )}
            </div>
            {media.length > 1 && (
              <div className="flex gap-2 p-2 bg-white/10 backdrop-blur-md border-t border-white/10 overflow-x-auto">
                {media.map((m, i) => (
                  <button key={i} onClick={() => setActiveMedia(m)} 
                    className={`w-16 h-10 rounded overflow-hidden border-2 flex-shrink-0 transition ${activeMedia?.url === m.url ? 'border-blue-500' : 'border-transparent opacity-50'}`}>
                    {m.type === 'image' ? <img src={getUrl(m.url)} className="w-full h-full object-cover" /> : <div className="bg-slate-700 h-full flex items-center justify-center text-[6px] text-white">VIDEO</div>}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {files.length > 0 && (
        <div className="px-6 pb-6 space-y-2">
          {files.map((f, i) => (
            <a key={i} href={getUrl(f.url)} download={f.name} className="flex items-center justify-between p-3 rounded-xl border bg-slate-50 hover:bg-blue-50 transition group">
              <div className="flex items-center gap-3 truncate">
                <span className="text-xl">📄</span>
                <div className="truncate text-left">
                  <p className="text-xs font-bold truncate text-slate-800">{f.name}</p>
                  <p className="text-[10px] text-slate-400 font-medium">{f.size}</p>
                </div>
              </div>
              <span className="text-blue-600 font-black text-[10px] opacity-0 group-hover:opacity-100 uppercase">Download</span>
            </a>
          ))}
        </div>
      )}

      <div className="px-6 py-4 border-t bg-slate-50/50 flex justify-between items-center text-[10px] font-black text-slate-400">
        <span className="uppercase tracking-widest">{reads} Views</span>
        <span className="uppercase tracking-widest">Company Announcement</span>
      </div>
    </div>
  );
}