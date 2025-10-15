import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
export default function MainLayout({ darklight, setdarklight }) {
  return (
    <div className={`bg-gray-50 flex h-screen gap-0.5 ${darklight.Magic_Word} dark:bg-slate-900`}>
      <Sidebar darklight={darklight} setdarklight={setdarklight} />
      <div className="flex-1 h-full flex flex-col">
        <Header />
        <div className="h-full p-4 flex-1 overflow-y-scroll scrollbar-hidden">
          <div className="h-full w-full bg-white rounded-md dark:bg-slate-800">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
