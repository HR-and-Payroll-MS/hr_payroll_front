import React, { useState } from "react";
import Dropdown from "../../../Components/Dropdown";
import InputField from "../../../Components/InputField";
import TextEditor from "../../../Components/TextEditor";
import LexicalEditor from "../../../Components/LexicalEditor";

/*
  Simple create announcement trigger + small form modal
  - Minimal UI: title, body, priority, audience
  - Emits onCreate(newAnnouncement) and closes
  - Replace local state submission with API POST when ready
*/

export default function CreateAnnouncement({ onCreate }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [priority, setPriority] = useState("Normal");
  const [audience, setAudience] = useState("All employees");  
  
  // const [savedJSON, setSavedJSON] = useState(null);
  // const [savedHTML, setSavedHTML] = useState("");

  // const handleEditorChange = ({ json, html }) => {
  //   setSavedJSON(json);
  //   setSavedHTML(html);
  // };

  // const sendToServer = () => {
  //   console.log("=== RAW JSON TO SERVER ===");
  //   console.log(savedJSON);

  //   console.log("=== HTML TO SERVER ===");
  //   console.log(savedHTML);

  //   alert("Pretending to send both JSON + HTML to server 😎");
  // };

  const handleChange = (content) => {
    setValue(content);
    console.log("Content was updated:", content);
  }

  function submit() {
    if (!title.trim()) return alert("Add a title");
    const payload = { title, body, priority, audience };
    // TODO: replace with API call:
    // fetch('/api/announcements', { method: 'POST', body: JSON.stringify(payload) })
    onCreate(payload);
    setTitle(""); setBody(""); setPriority("Normal"); setAudience("All employees"); setOpen(false);
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="bg-slate-800 dark:bg-slate-100 dark:text-slate-900 text-white px-4 py-2 rounded"
      >
        + New Announcement
      </button>
    );
  }

  const status = [
      {content:'Low',svg:null},
      {content:'Normal',svg:null},
      {content:'High',svg:null},
      {content:'Urgent',svg:null},
    ];     
  const Audience = [
      {content:'All Employee',svg:null},
      {content:'Department Managers',svg:null},
      {content:'Payroll Officers',svg:null},
      {content:'Employees',svg:null},
    ];     

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
      <div className="bg-white w-full max-w-2xl rounded shadow-lg p-6 z-50">
        <h2 className="text-lg font-semibold mb-3">Create Announcement</h2>

        <div className="space-y-3">
          <div className="flex gap-3">
            
             <Dropdown onChange={(i) => setPriority(i)} options={status} text="text-xs font-semibold" placeholder="Choose Priority" border="border gap-1 border-gray-100"/>
             <Dropdown onChange={(i) => setAudience(i)} options={Audience} text="text-xs font-semibold" placeholder="Choose Audience" border="border gap-1 border-gray-100"/>
   
            {/*<input className="flex-1 border rounded px-3 py-2" value={audience} onChange={(e)=>setAudience(e.target.value)} /> */}
          </div>
          <label className="w-full dark:text-slate-200 text-xs font-semibold ">
              Title <span className="text-red-700">*</span>
            </label>
            <InputField searchMode="input" icon={false} placeholder={"Input Announcement Title"} displayKey="name" onSelect={(i)=>setTitle(i)} />
          {/* <input className="w-full border rounded px-3 py-2" placeholder="Input Announcement Title" value={title} onChange={(e)=>setTitle(e.target.value)} /> */}
          <label className="w-full dark:text-slate-200 text-xs font-semibold ">
              Content <span className="text-red-700">*</span>
            </label>
          {/* <textarea className="w-full border rounded px-3 py-2 h-32" placeholder="Input Content here" value={body} onChange={(e)=>setBody(e.target.value)} /> */}
          <TextEditor onChange={(content)=>setBody(content)}/>
          
         {/* <LexicalEditor onChange={handleEditorChange} /> */}

          <div className="flex justify-start gap-2">
            <button onClick={()=>setOpen(false)} className="px-4 hover:cursor-pointer py-2 border rounded">Cancel</button>
            <button onClick={submit} className="px-4 py-2 bg-slate-800 hover:cursor-pointer text-white rounded">Publish</button>
          </div>
        </div>
      </div>
    </div>
  );
}



// export default function App() {


//   return (
//     <div className="p-6 space-y-6 max-w-2xl mx-auto">
//       <h1 className="text-2xl font-bold">Lexical Demo</h1>

      // <LexicalEditor onChange={handleEditorChange} />

//       <button
//         className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//         onClick={sendToServer}
//       >
//         Save / Send to Server
//       </button>

//       <div>
//         <h2 className="text-lg font-semibold">Saved JSON</h2>
//         <pre className="bg-gray-100 p-3 rounded-lg text-sm overflow-auto">
//           {JSON.stringify(savedJSON, null, 2)}
//         </pre>
//       </div>

//       <div>
//         <h2 className="text-lg font-semibold">HTML Output</h2>
//         <div
//           className="p-3 bg-gray-100 rounded-lg"
//           dangerouslySetInnerHTML={{ __html: savedHTML }}
//         />
//       </div>
//     </div>
//   );
// }
