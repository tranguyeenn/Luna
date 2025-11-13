import React from "react";

export default function Button({ children, className = "", ...props }) {
  return (
    <button
      {...props}
      className={`px-4 py-2 rounded-md bg-luna-accent text-white text-sm hover:opacity-90 active:scale-95 ${className}`}
    >
      {children}
    </button>
  );
}
