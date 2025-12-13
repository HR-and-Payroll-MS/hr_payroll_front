import { Camera } from "lucide-react";
import { useState } from "react";
import ImageUploader from "./ImageUploader";

export default function ProfilePicture() {
  const [image, setImage] = useState(null);
  const [open, setOpen] = useState(false); 

  return (
    <>
      <div className="relative rounded-full bg-amber-800 shadow w-28 h-28 ">
        {image?
          (<img src={image} className="w-28 bg-amber-100 h-28 rounded-full border-4 border-white shadow object-cover"/>
          ):(
          <div className='rounded-full bg-slate-800 dark:bg-slate-600 text-slate-100 text-center items-center flex justify-center w-28 text-4xl h-28 border-4 border-white shadow object-cover' >
                  {("Profile Picture" ?? "").split(" ").map(n => n[0]).slice(0, 2).join("") || "NA"}
          </div>)}
          <button onClick={() => setOpen(true)} className="absolute bottom-1 right-1 bg-white p-2 rounded-full shadow hover:bg-gray-100">
            <Camera size={18}/>
          </button>
      </div> {open && (
        <ImageUploader 
          setImage={setImage} 
          onClose={() => setOpen(false)}    // close modal from inside
        />
      )}
    </>
  );
}
