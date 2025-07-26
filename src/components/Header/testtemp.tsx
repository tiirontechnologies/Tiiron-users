// CustomEditor.tsx
import React from "react";
import "react-quill/dist/quill.snow.css";
// import "./CustomEditor.css";

// 👇 Custom Bold Icon in JSX (you can replace this with your Figma-matching icon)
const BoldIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 4h9a4 4 0 010 8H6V4zm0 10h10a4 4 0 010 8H6v-8z" />
  </svg>
);

// 👇 Custom Toolbar
const CustomToolbar: React.FC = () => (
  <div id="toolbar">
    <button className="ql-bold">
      <BoldIcon />
    </button>
    <button className="ql-italic" />
    <button className="ql-underline" />
  </div>
);

// 👇 Main Editor Component
const CustomEditor: React.FC = () => {
  return (
    <div>
      <CustomToolbar />
      {/* <ReactQuill
        theme="snow"
        modules={{
          toolbar: {
            container: "#toolbar",
          },
        }}
        formats={["bold", "italic", "underline"]}
      /> */}
    </div>
  );
};

export default CustomEditor;
