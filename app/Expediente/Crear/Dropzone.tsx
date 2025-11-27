"use client";
import React, { useState, useCallback, useRef } from "react";

export default function Dropzone({ onFilesSelected }) {
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setDragging(false);
      const files = Array.from(e.dataTransfer.files);
      onFilesSelected(files);
    },
    [onFilesSelected]
  );

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    onFilesSelected(files);
  };

  return (
    <div
      onClick={handleClick}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`
        w-full
        h-40
        border-2
        border-dashed
        rounded-xl
        flex
        flex-col
        items-center
        justify-center
        cursor-pointer
        transition
        ${dragging ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-gray-50/30"}
      `}
    >
      <span className="text-8xl text-gray-200 font-light">+</span>

      <p className="text-sm text-gray-300">
        Arrastrá archivos o hacé clic para subir
      </p>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        onChange={handleFileChange}
        className="hidden"
        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
      />
    </div>
  );
}
