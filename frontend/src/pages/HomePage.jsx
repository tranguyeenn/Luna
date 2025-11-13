import React from "react";
import DesktopShell from "../components/layout/DesktopShell.jsx";
import Card from "../components/ui/Card.jsx";

export default function HomePage() {
  return (
    <DesktopShell>
      <h1 className="text-3xl font-semibold mb-6">Home</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <p className="text-lg font-medium">Welcome to Luna</p>
          <p className="mt-1 text-luna-muted text-sm">
            Your dashboard will grow as you add features.
          </p>
        </Card>

        <Card>
          <p className="text-lg font-medium">Quick Stats</p>
          <p className="mt-1 text-luna-muted text-sm">Coming soon.</p>
        </Card>
      </div>
    </DesktopShell>
  );
}
