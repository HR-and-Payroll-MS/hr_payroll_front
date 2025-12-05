import Cropper from "react-easy-crop";
import { useImageCropper } from "./useImageCropper";
export default function CropperModal({ file, onSave }) {
  const { zoom, setZoom, crop, setCrop, getCroppedImage } = useImageCropper(file);
  return (
    <div className="mt-4">
      <div className="relative w-full h-64 bg-black/80 rounded-md overflow-hidden">
        <Cropper image={file} crop={crop} zoom={zoom} aspect={1} onCropChange={setCrop} onZoomChange={setZoom}/>
      </div>
      <input type="range" min={1} max={3} step={0.1} value={zoom} onChange={e=>setZoom(e.target.value)} className="w-full mt-3"/>
      <button onClick={async ()=>{ const output = await getCroppedImage(); onSave(output); }} className="btn btn-primary w-full mt-4">
        Save Cropped Image
      </button>
    </div>
  );
}
