// useImageCropper.js
import { useState } from "react";
import getCroppedImg from "./getCroppedImg"; // We'll create this next

export function useImageCropper(file) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  async function getCroppedImage() {
    return await getCroppedImg(file, crop, zoom);
  }

  return { crop, setCrop, zoom, setZoom, getCroppedImage };
}
