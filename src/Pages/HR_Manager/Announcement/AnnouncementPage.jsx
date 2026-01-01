// import React, { useState } from "react";
// import CreateAnnouncement from "./CreateAnnouncement";
// import SocialPost from "./SocialPost";
// import AnnouncementCard from "./AnnouncementCard";
// import AnnouncementDetails from "./AnnouncementDetails";
// import FileDrawer from "../../../Components/FileDrawer";
// import Header from "../../../Components/Header";
// import { useAnnouncements } from "../../../Context/AnnouncementContext";
// import { getLocalData } from "../../../Hooks/useLocalStorage";

// export default function AnnouncementsPage() {
//   const { announcements, loading } = useAnnouncements();
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [selected, setSelected] = useState(null);
//   const role = getLocalData('role');
//   const [view, setView] = useState(role === 'Manager' ? 'list' : 'feed');

//   // Ensure announcements is always an array
//   const announcementList = Array.isArray(announcements) ? announcements : [];

//   if (loading) {
//     return (
//       <div className="p-20 text-center font-bold text-slate-600">
//         Loading News Feed...
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 bg-slate-50 min-h-screen">
//       <Header Title="Company Feed">
//         {role === 'Manager' && <CreateAnnouncement />}
//       </Header>

//       <div className="mt-6">
//         <div className="flex gap-2 mb-6 max-w-3xl mx-auto">
//           <button
//             onClick={() => setView('feed')}
//             className={`text-[10px] font-black px-4 py-1.5 rounded-full border transition-colors ${
//               view === 'feed'
//                 ? 'bg-slate-900 text-white border-slate-900'
//                 : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
//             }`}
//           >
//             FEED
//           </button>
//           <button
//             onClick={() => setView('list')}
//             className={`text-[10px] font-black px-4 py-1.5 rounded-full border transition-colors ${
//               view === 'list'
//                 ? 'bg-slate-900 text-white border-slate-900'
//                 : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
//             }`}
//           >
//             LIST
//           </button>
//         </div>

//         <div className="max-w-3xl mx-auto">
//           {announcementList.length === 0 ? (
//             <div className="text-center py-12">
//               <p className="text-slate-500 text-lg">
//                 No announcements yet.
//               </p>
//               <p className="text-slate-400 text-sm mt-2">
//                 Check back later or create one if you're a manager!
//               </p>
//             </div>
//           ) : view === 'feed' ? (
//             announcementList.map((a) => (
//               <SocialPost
//                 key={a.id || a._id}
//                 announcement={a}
//               />
//             ))
//           ) : (
//             <div className="grid gap-3">
//               {announcementList.map((a) => (
//                 <AnnouncementCard
//                   key={a.id || a._id}
//                   announcement={a}
//                   onOpen={() => {
//                     setSelected(a);
//                     setDrawerOpen(true);
//                   }}
//                 />
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       <FileDrawer
//         isModalOpen={drawerOpen}
//         closeModal={() => setDrawerOpen(false)}
//       >
//         {selected && (
//           <AnnouncementDetails
//             announcement={selected}
//             onClose={() => setDrawerOpen(false)}
//           />
//         )}
//       </FileDrawer>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import CreateAnnouncement from "./CreateAnnouncement";
import SocialPost from "./SocialPost";
import AnnouncementCard from "./AnnouncementCard";
import AnnouncementDetails from "./AnnouncementDetails";
import FileDrawer from "../../../Components/FileDrawer";
import Header from "../../../Components/Header";

// MOCK DATA: Simulating what the backend would return
const MOCK_ANNOUNCEMENTS = [
  {
    id: "1",
    title: "Welcome to the New Office!",
    body: "<p>We are excited to announce our move to the downtown suite next month.</p>",
    priority: "Normal",
    audience: "All Staff",
    createdAt: new Date().toISOString(),
    reads: 45,
    totalRecipients: 50,
    attachments: []
  },
  {
    id: "2",
    title: "URGENT: Server Maintenance",
    body: "<p>Systems will be down this Sunday from 2 AM to 4 AM EST.</p>",
    priority: "Urgent",
    audience: "IT Dept",
    createdAt: new Date().toISOString(),
    reads: 12,
    totalRecipients: 12,
    attachments: []
  }
];

export default function AnnouncementsPage() {
  // BACKEND NOTE: Replace this mock state with your Context or API fetch call.
  // Example: const { announcements, loading } = useAnnouncements();
  const [announcements, setAnnouncements] = useState(MOCK_ANNOUNCEMENTS);
  const [loading, setLoading] = useState(false);
  
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  // BACKEND NOTE: Ensure 'role' is set in localStorage upon login.
  // Options: 'Manager' (can create/delete) or 'Employee' (view only)
  const role = localStorage.getItem('role') || 'Manager'; 
  const [view, setView] = useState(role === 'Manager' ? 'list' : 'feed');

  // BACKEND NOTE: When connecting to a real API:
  // 1. Use useEffect to fetch data on mount.
  // 2. Handle 'multipart/form-data' for the 'attachments' in CreateAnnouncement.
  // 3. Ensure the backend returns the 'createdAt' in a ISO date format.

  if (loading) {
    return <div className="p-20 text-center font-bold text-slate-600">Loading News Feed...</div>;
  }

  return (
    <div className="p-6 bg-slate-50 dark:bg-slate-800 min-h-screen">
      <Header Title="Company Feed">
        {role === 'Manager' && <CreateAnnouncement />}
      </Header>

      <div className="mt-6">
        <div className="flex gap-2 mb-6 w-full mx-auto">
          <button
            onClick={() => setView('feed')}
            className={`text-[10px] shadow dark:shadow-slate-900 dark:inset-shadow-xs dark:inset-shadow-slate-600 font-black px-4 py-1.5 rounded-full transition-colors ${
              view === 'feed' ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
            }`}
          >
            FEED
          </button>
          <button
            onClick={() => setView('list')}
            className={`text-[10px] shadow dark:shadow-slate-900 dark:inset-shadow-xs dark:inset-shadow-slate-600 font-black px-4 py-1.5 rounded-full transition-colors ${
              view === 'list' ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
            }`}
          >
            LIST
          </button>
        </div>

        <div className="w-full mx-auto">
          {announcements.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-500 text-lg">No announcements yet.</p>
            </div>
          ) : view === 'feed' ? (
            announcements.map((a) => (
              <SocialPost key={a.id} announcement={a} />
            ))
          ) : (
            <div className="grid gap-3">
              {announcements.map((a) => (
                <AnnouncementCard
                  key={a.id}
                  announcement={a}
                  onOpen={() => {
                    setSelected(a);
                    setDrawerOpen(true);
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {drawerOpen&&<FileDrawer isModalOpen={drawerOpen} closeModal={() => setDrawerOpen(false)}>
        {selected && (
          <AnnouncementDetails
            announcement={selected}
            onClose={() => setDrawerOpen(false)}
          />
        )}
      </FileDrawer>}
    </div>
  );
}