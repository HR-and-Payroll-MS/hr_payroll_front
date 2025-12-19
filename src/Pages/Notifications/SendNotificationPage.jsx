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

  const receiverOptions = [
    { content: "GROUP" },
    { content: "USER" },
    { content: "ALL" },
  ];

  const groups = [{ content: "Payroll" }];

  async function submit(e) {
    e.preventDefault();

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
    console.log(payload);
    try {
      await axiosPrivate.post("notifications/", payload);
      setTitle("");
      setMessage("");
      setTarget("");
      alert("Notification sent");
    } catch (e) {
      console.error(e);
      alert("Failed to send notification");
    }
  }

  return (
    <form onSubmit={submit} className="mx-auto overflow-y-auto hover-bar h-full p-6 space-y-4">
      <h2 className="text-xl font-bold">Send Notification</h2>

      <Dropdown
        options={receiverOptions}
        placeholder="GROUP"
        onChange={setReceiverType}
      />

      {receiverType === "GROUP" && (
        <Dropdown
          options={groups}
          placeholder="Payroll"
          onChange={setTarget}
        />
      )}

      {receiverType === "USER" && (
        <InputField
          placeholder="User ID"
          icon={false}
          onSelect={setTarget}
        />
      )}

      <InputField placeholder="Title" searchMode="input" icon={false} onSelect={setTitle} />
      <TextEditor onChange={setMessage} />

      <button className="px-4 py-2 bg-slate-800 text-white rounded">
        Send
      </button>
    </form>
  );
}
