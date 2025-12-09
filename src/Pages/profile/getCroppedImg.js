export default async function getCroppedImg(imageSrc, crop, zoom) {
  const image = new Image();
  image.src = imageSrc;
  await new Promise(resolve => image.onload = resolve);

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const naturalWidth = image.naturalWidth;
  const naturalHeight = image.naturalHeight;

  // Convert crop values to pixel units (required for accuracy)
  const scale = naturalWidth / 300; // your cropper container width (adjust if different)
  const pixelX = crop.x * scale * zoom;
  const pixelY = crop.y * scale * zoom;

  canvas.width = naturalWidth / zoom;
  canvas.height = naturalHeight / zoom;

  ctx.drawImage(
    image,
    pixelX, pixelY,
    canvas.width, canvas.height,
    0, 0,
    canvas.width, canvas.height
  );

  return canvas.toDataURL("image/jpeg");
}
