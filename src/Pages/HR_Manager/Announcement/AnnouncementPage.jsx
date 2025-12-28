import React, { useState } from "react";
import CreateAnnouncement from "./CreateAnnouncement";
import SocialPost from "./SocialPost";
import AnnouncementCard from "./AnnouncementCard";
import AnnouncementDetails from "./AnnouncementDetails";
import FileDrawer from "../../../Components/FileDrawer";
import Header from "../../../Components/Header";
import { useAnnouncements } from "../../../Context/AnnouncementContext";
import { getLocalData } from "../../../Hooks/useLocalStorage";

export default function AnnouncementsPage() {
  const { announcements, loading } = useAnnouncements();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const role = getLocalData('role');
  const [view, setView] = useState(role === 'Manager' ? 'list' : 'feed');

  if (loading) return <div className="p-20 text-center font-bold">Loading News Feed...</div>;

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <Header Title="Company Feed">
        {role === 'Manager' && <CreateAnnouncement />}
      </Header>

      <div className="mt-6">
        <div className="flex gap-2 mb-6">
          <button onClick={() => setView('feed')} className={`text-[10px] font-black px-4 py-1.5 rounded-full border ${view === 'feed' ? 'bg-slate-900 text-white' : 'bg-white'}`}>FEED</button>
          <button onClick={() => setView('list')} className={`text-[10px] font-black px-4 py-1.5 rounded-full border ${view === 'list' ? 'bg-slate-900 text-white' : 'bg-white'}`}>LIST</button>
        </div>

        <div className="max-w-3xl mx-auto">
          {view === 'feed' ? (
            announcements.map(a => <SocialPost key={a.id || a._id} announcement={a} />)
          ) : (
            <div className="grid gap-3">
              {announcements.map(a => (
                <AnnouncementCard key={a.id || a._id} announcement={a} onOpen={() => { setSelected(a); setDrawerOpen(true); }} />
              ))}
            </div>
          )}
        </div>
      </div>

      <FileDrawer isModalOpen={drawerOpen} closeModal={() => setDrawerOpen(false)}>
        {selected && <AnnouncementDetails announcement={selected} onClose={() => setDrawerOpen(false)} />}
      </FileDrawer>
    </div>
  );
}



















































// import React, { useState } from "react";
// import CreateAnnouncement from "./CreateAnnouncement";
// import AnnouncementList from "./AnnouncementList";
// import AnnouncementDetails from "./AnnouncementDetails";
// import Toast from "./Toast";
// import Header from "../../../Components/Header";
// import FileDrawer from "../../../Components/FileDrawer";
// import { getLocalData } from "../../../Hooks/useLocalStorage";

// export default function AnnouncementsPage() {
//   const [announcements, setAnnouncements] = useState([]);
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [selected, setSelected] = useState(null);
//   const [toast, setToast] = useState(null);
//   const role = getLocalData('role');

//   const handleCreate = (newItem) => {
//     const fresh = { 
//         ...newItem, 
//         id: Date.now().toString(), 
//         createdAt: new Date().toISOString(), 
//         reads: 0, 
//         totalRecipients: 100 
//     };
//     setAnnouncements([fresh, ...announcements]);
//     setToast({ type: "success", msg: "Announcement Published Successfully" });
//     setTimeout(() => setToast(null), 3000);
//   };

//   const handleDelete = (id) => {
//     setAnnouncements(announcements.filter(a => a.id !== id));
//     setDrawerOpen(false);
//     setToast({ type: "info", msg: "Post Archived" });
//     setTimeout(() => setToast(null), 3000);
//   };

//   return (
//     <div className="p-6 bg-slate-50 dark:bg-slate-950 min-h-screen">
//       <Header Title="Company Feed" subTitle="Official Announcements & News">
//         {role === 'Manager' && <CreateAnnouncement onCreate={handleCreate} />}
//       </Header>

//       <div className="mt-8 h-full">
//         <AnnouncementList announcements={announcements} onOpen={(a) => { setSelected(a); setDrawerOpen(true); }} />
//       </div>

//       {drawerOpen && (
//         <FileDrawer isModalOpen={drawerOpen} closeModal={() => setDrawerOpen(false)}>
//           {selected && <AnnouncementDetails announcement={selected} onDelete={handleDelete} />}
//         </FileDrawer>
//       )}

//       {toast && <Toast message={toast.msg} type={toast.type} />}
//     </div>
//   );
// }