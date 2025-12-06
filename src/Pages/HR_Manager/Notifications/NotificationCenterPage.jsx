import { useState } from "react";
import NotificationCard from "./NotificationCard";
import { ROLE_RECEIVE_TYPES, formatTime } from "./utils";
import useNotificationStore from "./useNotificationStore";
import { MOCK_NOTIFICATIONS } from "./mockData";
import Dropdown from "../../../Components/Dropdown";
import InputField from "../../../Components/InputField";
import Icon from "../../../Components/Icon";
import DetailNotification from "./DetailNotification";

export default function NotificationCenterPage({ role = "EMPLOYEE" }) {
  const store = useNotificationStore(MOCK_NOTIFICATIONS);

  const [filter, setFilter] = useState("all");
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null); // For detail view
  const pageSize = 10;

  const visible = (n) =>
    n.receivers.includes("ALL") ||
    n.receivers.includes(role) ||
    ROLE_RECEIVE_TYPES[role]?.includes(n.category);

  const filtered = store.items
    .filter(visible)
    .filter((n) => (filter === "all" ? true : n.category === filter))
    .filter((n) =>
      q ? (n.title + n.message).toLowerCase().includes(q.toLowerCase()) : true
    );

  const pages = Math.ceil(filtered.length / pageSize) || 1;
  const view = filtered.slice((page - 1) * pageSize, page * pageSize);

  const types = [
    { content: "all" },
    { content: "system" },
    { content: "attendance" },
    { content: "payroll" },
  ];

  
  return selected? (
  <DetailNotification
    n={selected}
    setSelected={setSelected}
    store={store}
  />
): (
    <div className="p-6 w-full flex flex-col h-full mx-auto">
      {/* Header & Filters */}
      <div className="flex justify-between mb-4">
        <h2 className="font-semibold text-xl">Notifications</h2>
        <div className="flex gap-2">
          <InputField placeholder="Search..." onSelect={setQ} />
          <Dropdown onChange={setFilter} placeholder="Filter" padding="p-1.5" options={types} />
        </div>
      </div>

      {/* Notification Cards */}
      <div className="space-y-3 py-3 overflow-y-auto scrollbar-hidden ">
        {view.length > 0 ? (
          view.map((n) => (
            <NotificationCard
              key={n.id}
              n={n}
              canAction={ROLE_RECEIVE_TYPES[role]?.includes(n.category)}
              onView={() => {
                store.markRead(n.id);
                setSelected({ ...n, unread: false });
              }}

              onDelete={() => store.remove(n.id)}
              onMarkRead={() => store.markRead(n.id)}
            />
          ))
        ) : (
          <p className="text-center text-gray-500 mt-10 text-sm">No Notifications</p>
        )}
      </div>

      {/* Pagination */}
      {filtered.length > 0 && (
        <div className="flex justify-between mt-5 text-sm">
          <button
            className="px-3 py-1 border rounded disabled:opacity-40"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Prev
          </button>
          <span>
            Page {page} / {pages}
          </span>
          <button
            className="px-3 py-1 border rounded disabled:opacity-40"
            onClick={() => setPage((p) => Math.min(pages, p + 1))}
            disabled={page === pages}
          >
            Next
          </button>
        </div>
      )}
      

    </div>
  );
}
