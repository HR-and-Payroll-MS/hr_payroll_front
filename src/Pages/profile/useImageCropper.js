import { useState } from "react";
import getCroppedImg from "../utils/convertFileToURL";

export function useImageCropper(file) {
  const [crop, setCrop] = useState({x:0,y:0});
  const [zoom, setZoom] = useState(1);

  const getCroppedImage = async ()=> await getCroppedImg(file,crop,zoom);

  return { crop,setCrop, zoom,setZoom, getCroppedImage };
}
