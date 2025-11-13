import React from "react";
import Input from "../components/ui/Input.jsx";
import Button from "../components/ui/Button.jsx";

export default function AccessPage() {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-luna-bg">
      <div className="bg-luna-surface p-8 rounded-xl border border-luna-border shadow-soft w-80">
        <h1 className="text-2xl mb-6 font-semibold">Sign In</h1>

        <div className="flex flex-col gap-4">
          <Input placeholder="Email" />
          <Input type="password" placeholder="Password" />
          <Button className="w-full">Continue</Button>
        </div>
      </div>
    </div>
  );
}
