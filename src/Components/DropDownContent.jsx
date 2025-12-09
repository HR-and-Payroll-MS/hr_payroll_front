import { useEffect, useState ,useRef } from "react";
import Icon from "./Icon";


function useOutside(ref, onOutside) {
  useEffect(() => {
    function onDown(e) {
      if (!ref.current || ref.current.contains(e.target)) return;
      onOutside && onOutside();
    }
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [ref, onOutside]);
}

export default function DropDownContent({ children , svgs }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  
  useOutside(ref, () => setOpen(false));

  function handleOpen() {
    setOpen((v) => !v);
  }

//   function handleItemClick(n) {
//     store.markRead(n.id);
//     if (onOpenCenter) onOpenCenter();
//   }

  return (
    <div className="relative" ref={ref}>
      <button onClick={handleOpen} className="relative p-2 rounded-md hover:bg-slate-100">
        {svgs}
      </button>
      {open && (
        <div onClick={() => setOpen(false)} className="absolute -right-0 mt-2 w-36   bg-white rounded-lg shadow-xl z-50">
            {children}
        </div>
      )}
    </div>
  );
}
