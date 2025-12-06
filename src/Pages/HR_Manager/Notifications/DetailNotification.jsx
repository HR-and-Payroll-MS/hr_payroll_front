import React from "react";
import Icon from "../../../Components/Icon";

function DetailNotification({ n, setSelected, store }) {
  return (
    <div className="p-6 h-full mx-auto">
      {/* Back Button */}
      <button
        onClick={() => setSelected(null)}
        className="flex items-center gap-1 text-indigo-600 hover:underline mb-4"
      >
        <Icon name="ArrowLeft" className="w-4 h-4" /> Back
      </button>

      {/* Detail Card */}
      <div className=" h-full p-6 flex flex-col rounded">
        <div className="flex justify-between items-start mb-3">
          <h2 className="text-xl font-semibold">{n.title}</h2>
          <span
            className={`px-2 py-0.5 rounded text-xs font-medium ${
              n.unread ? "bg-indigo-100 text-indigo-700" : "bg-gray-100 text-gray-600"
            }`}
          >
            {n.unread ? "Unread" : "Read"}
          </span>
        </div>
        <div className="bg-amber-50 rounded p-4 flex-1 overflow-y-auto scrollbar-hidden">
            <p className="text-gray-700  mb-4 whitespace-pre-wrap">{n.message}</p>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm text-gray-600 border-t border-slate-200 pt-3">
          <div>
            <b>Category:</b> {n.category}
          </div>
          <div>
            <b>Type:</b> {n.type}
          </div>
          <div>
            <b>Sender:</b> {n.senderRole}
          </div>
          <div>
            <b>Receivers:</b> {n.receivers?.join(", ")}
          </div>
        </div>

        {/* {n.meta && (
          <pre className="bg-gray-50 p-2 rounded mt-4 text-xs border">
            {JSON.stringify(n.meta, null, 2)}
          </pre>
        )} */}

        {/* Action Buttons */}
        <div className="flex gap-3 mt-5">
          {n.unread && (
            <button
              onClick={() => {
                store.markRead(n.id);
                setSelected({ ...n, unread: false });
              }}
              className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Mark as Read
            </button>
          )}
          <button
            onClick={() => {
              store.remove(n.id);
              setSelected(null);
            }}
            className="px-3 py-1 text-red-600 border border-red-600 rounded hover:bg-red-50"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DetailNotification;
