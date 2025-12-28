import { useState } from "react";
import Dropdown from "../../Components/Dropdown";
import InputField from "../../Components/InputField";
import TextEditor from "../../Components/TextEditor";
import useAuth from "../../Context/AuthContext";

export default function SendNotificationPage() {
  const { axiosPrivate } = useAuth();

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [receiverType, setReceiverType] = useState("GROUP");
  const [target, setTarget] = useState("");
  const [type, setType] = useState("other");
  
  // This key forces the TextEditor to re-render (clear) on submit
  const [resetKey, setResetKey] = useState(0); 
  const [loading, setLoading] = useState(false);

  const receiverOptions = [
    { content: "GROUP" },
    { content: "USER" },
    { content: "ALL" },
  ];

  // Added more choices here
  const groups = [
    { content: "Payroll" },
    { content: "HR" },
    { content: "Management" },
    { content: "IT" },
    { content: "Marketing" },
    { content: "Interns" },
    { content: "Employee" }
  ];

  async function submit(e) {
    e.preventDefault();
    setLoading(true);

    // Validation
    if (!title || !message) {
      alert("Please fill in Title and Message");
      setLoading(false);
      return;
    }

    if (receiverType !== "ALL" && !target) {
      alert("Please select a Target (Group or User ID)");
      setLoading(false);
      return;
    }

    let payload = {
      title,
      message,
      notification_type: type,
      related_link: "",
    };

    if (receiverType === "USER") {
      payload.recipient_id = Number(target);
    } else if (receiverType === "GROUP") {
      payload.receiver_group = target;
    } else {
      payload.receivers = ["ALL"];
    }

    try {
      await axiosPrivate.post("notifications/", payload);
      
      // Clear all states
      setTitle("");
      setMessage("");
      setTarget("");
      setReceiverType("GROUP");
      
      // Increment key to force TextEditor to wipe clean
      setResetKey(prev => prev + 1);
      
      alert("✅ Notification sent successfully!");
    } catch (e) {
      console.error(e);
      // Show the actual error message from backend if available
      const errorMsg = e.response?.data?.detail || "Failed to send notification. Please try again.";
      alert(`❌ Error: ${errorMsg}`);
    } finally {
      setLoading(false);
    }
  }

  return (
  <form 
    onSubmit={submit} 
    className="mx-auto overflow-y-auto scrollbar-hidden h-full p-5 space-y-5 bg-white dark:bg-slate-900 transition-colors"
  >
    {/* Header Section */}
    <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
      <div>
        <h2 className="text-lg font-black tracking-tight text-slate-800 dark:text-white uppercase">
          Broadcast
        </h2>
        <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
          Send System Notification
        </p>
      </div>
      <div className="w-8 h-1 bg-blue-500 rounded-full" />
    </div>

    {/* Target Selection Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-1.5">
        <label className="block text-[10px] font-black uppercase tracking-tight text-slate-400 dark:text-slate-500">
          Recipient Type
        </label>
        <Dropdown
          options={receiverOptions}
          placeholder="Select Type"
          value={receiverType}
          onChange={(val) => {
            setReceiverType(val);
            setTarget("");
          }}
          className="dark:bg-slate-950"
        />
      </div>

      {receiverType === "GROUP" && (
        <div className="space-y-1.5 animate-in fade-in slide-in-from-left-2 duration-200">
          <label className="block text-[10px] font-black uppercase tracking-tight text-slate-400 dark:text-slate-500">
            Target Group
          </label>
          <Dropdown
            options={groups}
            placeholder="Select Group"
            value={target}
            onChange={setTarget}
            className="dark:bg-slate-950"
          />
        </div>
      )}

      {receiverType === "USER" && (
        <div className="space-y-1.5 animate-in fade-in slide-in-from-left-2 duration-200">
          <label className="block text-[10px] font-black uppercase tracking-tight text-slate-400 dark:text-slate-500">
            User ID Reference
          </label>
          <InputField
            placeholder="e.g., 502"
            icon={false}
            value={target}
            onChangeValue={setTarget}
            type="number"
            border="border-slate-200 dark:border-slate-700"
            maxWidth="bg-slate-50 dark:bg-slate-950 h-9 text-xs"
          />
        </div>
      )}
    </div>

    {/* Content Section */}
    <div className="space-y-4">
      <div className="space-y-1.5">
        <label className="block text-[10px] font-black uppercase tracking-tight text-slate-400 dark:text-slate-500">
          Subject Line
        </label>
        <InputField 
          placeholder="Enter notification title..." 
          searchMode="input" 
          icon={false} 
          value={title}
          onChangeValue={setTitle}
          border="border-slate-200 dark:border-slate-700"
          maxWidth="bg-slate-50 dark:bg-slate-950 h-10 text-xs font-bold"
        />
      </div>

      <div className="space-y-1.5">
        <label className="block text-[10px] font-black uppercase tracking-tight text-slate-400 dark:text-slate-500">
          Message Body
        </label>
        <div className="rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden bg-slate-50 dark:bg-slate-950 transition-all focus-within:ring-2 focus-within:ring-blue-500/10">
          <TextEditor 
            key={resetKey} 
            onChange={setMessage} 
          />
        </div>
      </div>
    </div>

    {/* Action Footer */}
    <div className="pt-4 flex justify-end border-t border-slate-100 dark:border-slate-800">
      <button 
        disabled={loading}
        className={`px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 shadow-md flex items-center gap-2 ${
          loading 
          ? "bg-slate-200 text-slate-400 cursor-not-allowed" 
          : "bg-slate-900 dark:bg-blue-600 text-white hover:opacity-90"
        }`}
      >
        {loading ? (
          <>
            <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Processing...
          </>
        ) : (
          "Dispatch Notification"
        )}
      </button>
    </div>
  </form>
);
}


















// import { useState } from "react";
// import Dropdown from "../../Components/Dropdown";
// import InputField from "../../Components/InputField";
// import TextEditor from "../../Components/TextEditor";
// import useAuth from "../../Context/AuthContext";

// export default function SendNotificationPage() {
//   const { axiosPrivate } = useAuth();

//   const [title, setTitle] = useState("");
//   const [message, setMessage] = useState("");
//   const [receiverType, setReceiverType] = useState("GROUP");
//   const [target, setTarget] = useState("");
//   const [type, setType] = useState("other");

//   const receiverOptions = [
//     { content: "GROUP" },
//     { content: "USER" },
//     { content: "ALL" },
//   ];

//   const groups = [{ content: "Payroll" }];

//   async function submit(e) {
//     e.preventDefault();

//     let payload = {
//       title,
//       message,
//       notification_type: type,
//       related_link: "",
//     };

//     if (receiverType === "USER") {
//       payload.recipient_id = Number(target);
//     } else if (receiverType === "GROUP") {
//       payload.receiver_group = target;
//     } else {
//       payload.receivers = ["ALL"];
//     }
//     console.log(payload);
//     try {
//       await axiosPrivate.post("notifications/", payload);
//       setTitle("");
//       setMessage("");
//       setTarget("");
//       alert("Notification sent");
//     } catch (e) {
//       console.error(e);
//       alert("Failed to send notification");
//     }
//   }

//   return (
//     <form onSubmit={submit} className="mx-auto overflow-y-auto hover-bar h-full p-6 space-y-4">
//       <h2 className="text-xl font-bold">Send Notification</h2>

//       <Dropdown
//         options={receiverOptions}
//         placeholder="GROUP"
//         onChange={setReceiverType}
//       />

//       {receiverType === "GROUP" && (
//         <Dropdown
//           options={groups}
//           placeholder="Payroll"
//           onChange={setTarget}
//         />
//       )}

//       {receiverType === "USER" && (
//         <InputField
//           placeholder="User ID"
//           icon={false}
//           onSelect={setTarget}
//         />
//       )}

//       <InputField placeholder="Title" searchMode="input" icon={false} onSelect={setTitle} />
//       <TextEditor onChange={setMessage} />

//       <button className="px-4 py-2 bg-slate-800 text-white rounded">
//         Send
//       </button>
//     </form>
//   );
// }
