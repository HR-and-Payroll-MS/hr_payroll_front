import React, { useEffect, useState } from "react";

export default function PDFViewer({ file, url, onClose }) {
  const [pdfUrl, setPdfUrl] = useState(null);

  useEffect(() => {
    if (file) {
      const localUrl = URL.createObjectURL(file);
      setPdfUrl(localUrl);
      return () => URL.revokeObjectURL(localUrl);
    } else if (url) {
      setPdfUrl(url);
    } else {
      setPdfUrl(null);
    }
  }, [file, url]);

  if (!pdfUrl)
    return <p className="text-gray-500 text-center mt-4">No PDF to display.</p>;

  return (
    <div className="relative w-full h-full border rounded-lg overflow-auto scrollbar-hidden bg-white shadow-md">
      {/* Close button */}
      {onClose && (
        <button onClick={onClose} className="absolute top-2 right-2 z-10 bg-gray-800 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600" >
          ✕
        </button>
      )}

      <iframe src={pdfUrl} title="PDF Viewer" className="w-full h-full scrollbar-hidden border-none"/>
    </div>
  );
}
