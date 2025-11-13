import React, { useState, useEffect } from "react";

export default function ClockWidget() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  return <div className="text-2xl font-mono">{time.toLocaleTimeString()}</div>;
}
