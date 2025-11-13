import React from "react";

export default function Card({ children }) {
  return (
    <div className="bg-luna-surface border border-luna-border rounded-lg p-5 shadow-soft">
      {children}
    </div>
  );
}
