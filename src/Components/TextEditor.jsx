import { Editor } from "@tinymce/tinymce-react";

export default function TextEditor({ value, onChange }) {
  return (
    <Editor
      apiKey=""  // Leave empty—it's ignored when using tinymceScriptSrc
      tinymceScriptSrc="https://cdnjs.cloudflare.com/ajax/libs/tinymce/7.0.1/tinymce.min.js"  // Free CDN (update to latest version if needed)
      value={value}
      onEditorChange={onChange}
      init={{
        height: 300,
        menubar: false,
        plugins: "link lists image code table autoresize",
        toolbar:
          "undo redo | bold italic underline | bullist numlist | link image | table | code",
        branding: false,
        statusbar: false,
        content_style:
          "body { font-family: Inter, sans-serif; font-size:14px; padding:12px; }",
      }}
    />
  );
}