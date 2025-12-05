import React, { useState } from "react";
import CreateAnnouncement from "./CreateAnnouncement";
import AnnouncementList from "./AnnouncementList";
import AnnouncementDetails from "./AnnouncementDetails";
import Toast from "./Toast";
import Header from "../../../Components/Header"
import FileDrawer from "../../../Components/FileDrawer";
const MOCK_ANNOUNCEMENTS = [
  {
    id: "a1",
    title: "Office closure for holidays",
    body: "All offices will be closed Dec 24 - Jan 2. Payroll dates adjusted accordingly.",
    priority: "Normal",
    audience: "All employees",
    createdAt: "2025-11-01T09:00:00",
    attachments: [],
    reads: 12,
    totalRecipients: 120,
  },
  {
    id: "a2",
    title: "Policy update: Remote work",
    body: "Please review the updated remote work policy in the Policies page.",
    priority: "High",
    audience: "All employees",
    createdAt: "2025-10-15T10:30:00",
    attachments: [],
    reads: 90,
    totalRecipients: 120,
  },
];

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState(MOCK_ANNOUNCEMENTS);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [toast, setToast] = useState(null);

  function openDetails(item) {
    setSelected(item);
    setDrawerOpen(true);
  }

  function closeDetails() {
    setDrawerOpen(false);
    setSelected(null);
  }

  // create a new announcement (local only). Replace with API POST later.
  function handleCreate(newItem) {
    // Example: call POST /api/announcements and then refresh
    // fetch('/api/announcements', { method: 'POST', body: JSON.stringify(newItem) })
    //   .then(res => res.json()).then(saved => setAnnouncements(prev => [saved, ...prev]))
    const toSave = { ...newItem, id: `a${Date.now()}`, createdAt: new Date().toISOString(), reads: 0, totalRecipients: 120 };
    setAnnouncements(prev => [toSave, ...prev]);
    setToast({ type: "success", msg: "Announcement created" });
    setTimeout(() => setToast(null), 3000);
  }

  // simple delete (local). Replace with DELETE API + optimistic UI if desired.
  function handleDelete(id) {
    // fetch(`/api/announcements/${id}`, { method: 'DELETE' })...
    setAnnouncements(prev => prev.filter(a => a.id !== id));
    setToast({ type: "info", msg: "Announcement archived/removed" });
    setTimeout(() => setToast(null), 3000);
    closeDetails();
  }

  return (
    <div className="p-6 flex h-full flex-col min-h-screen">
      <div className="flex items-center justify-between mb-6">  
        <Header  Title={"Announcements"} subTitle={"Create and broadcast announcements to employees."}>
          <CreateAnnouncement onCreate={handleCreate} />
        </Header>
      </div>
        
<div className="h-9/12">
      <AnnouncementList announcements={announcements} onOpen={openDetails} />
</div>

        {drawerOpen && <FileDrawer isModalOpen={drawerOpen} closeModal={closeDetails}>
        {selected && (
            <AnnouncementDetails announcement={selected} onDelete={() => handleDelete(selected.id)} />
        )}
            </FileDrawer>}

      {toast && <Toast type={toast.type} message={toast.msg} /> }
    </div>
  );
}
