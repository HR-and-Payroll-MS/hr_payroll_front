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
    <form onSubmit={submit} className="mx-auto overflow-y-auto hover-bar h-full p-6 space-y-4 max-w-3xl">
      <h2 className="text-xl font-bold text-slate-800">Send Notification</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Send To</label>
          <Dropdown
            options={receiverOptions}
            placeholder="Select Type"
            value={receiverType} // Ensure dropdown respects state
            onChange={(val) => {
              setReceiverType(val);
              setTarget(""); // Clear target when switching types
            }}
          />
        </div>

        {receiverType === "GROUP" && (
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Select Group</label>
            <Dropdown
              options={groups}
              placeholder="Select Group"
              value={target} // Ensure dropdown respects state
              onChange={setTarget}
            />
          </div>
        )}

        {receiverType === "USER" && (
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">User ID</label>
            <InputField
              placeholder="Enter User ID (e.g., 5)"
              icon={false}
              value={target} // ⚡️ This forces the input to clear visually
              onChangeValue={setTarget} // Changed from onSelect to standard onChangeValue
              type="number"
            />
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
        <InputField 
          placeholder="Notification Title" 
          searchMode="input" 
          icon={false} 
          value={title} // ⚡️ This forces the input to clear visually
          onChangeValue={setTitle} 
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
        {/* The 'key' prop is the magic trick here. When it changes, React destroys and rebuilds the component */}
        <TextEditor 
          key={resetKey} 
          onChange={setMessage} 
        />
      </div>

      <div className="pt-2">
        <button 
          disabled={loading}
          className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded transition-colors disabled:opacity-50 flex items-center gap-2"
        >
          {loading ? "Sending..." : "Send Notification"}
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
