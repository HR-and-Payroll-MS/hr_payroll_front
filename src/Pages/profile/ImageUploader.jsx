import CropperModal from "./CropperModal";
import { useImageUpload } from "./useImageUpload";
export default function ImageUploader({ setImage, onClose }) {
  const { handleFile, inputRef, selectedImage } = useImageUpload();

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-lg font-semibold mb-3">Upload Profile Image</h2>
        <div onClick={() => inputRef.current.click()} className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50">
          <p className="text-gray-600 mb-2">Click or drag image here</p>
          <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
        </div>

        {selectedImage && (
          <CropperModal
            file={selectedImage}
            onSave={(output)=>{
              setImage(output);
              onClose();               // closes modal after saving image
            }}
          />
        )}
        {selectedImage&&(setImage(selectedImage))}

        <button className="btn btn-ghost mt-4 w-full" onClick={onClose}>
          Cancel
        </button>

      </div>
    </div>
  );
}
