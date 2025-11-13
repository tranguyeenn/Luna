import React from "react";

export default function Input(props) {
  return (
    <input
      {...props}
      className="w-full px-3 py-2 bg-luna-surface border border-luna-border rounded-md text-sm focus:border-luna-accent focus:outline-none"
    />
  );
}
