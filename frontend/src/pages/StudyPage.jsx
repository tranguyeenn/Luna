import React, { useState, useEffect, useRef } from "react";

export default function StudyPage() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [remaining, setRemaining] = useState(25 * 60);
  const [running, setRunning] = useState(false);

  const intervalRef = useRef(null);

  // format seconds → 00:00
  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  // update timer
  useEffect(() => {
    if (running && remaining > 0) {
      intervalRef.current = setInterval(() => {
        setRemaining((prev) => prev - 1);
      }, 1000);
    }

    if (remaining === 0) {
      clearInterval(intervalRef.current);
      setRunning(false);
    }

    return () => clearInterval(intervalRef.current);
  }, [running, remaining]);

  // apply new time
  const applyTime = () => {
    const total = minutes * 60 + seconds;
    if (total <= 0) return;
    setRemaining(total);
  };

  const start = () => setRunning(true);
  const pause = () => setRunning(false);
  const reset = () => {
    setRunning(false);
    setRemaining(minutes * 60 + seconds);
  };

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-semibold">Study</h1>
      <p className="text-luna-muted">Use the timer to focus on a session.</p>

      {/* Timer Panel */}
      <div className="bg-luna-surface border border-luna-border rounded-xl p-6 w-full max-w-md">
        <div className="flex items-center gap-4 mb-6">
          <div className="flex flex-col">
            <label className="text-sm text-luna-muted mb-1">Minutes</label>
            <input
              type="number"
              min="0"
              value={minutes}
              onChange={(e) => setMinutes(parseInt(e.target.value) || 0)}
              className="bg-luna-bg border border-luna-border text-white rounded-md px-3 py-2 w-20 text-center"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-luna-muted mb-1">Seconds</label>
            <input
              type="number"
              min="0"
              max="59"
              value={seconds}
              onChange={(e) => setSeconds(parseInt(e.target.value) || 0)}
              className="bg-luna-bg border border-luna-border text-white rounded-md px-3 py-2 w-20 text-center"
            />
          </div>

          <button
            onClick={applyTime}
            className="px-4 py-2 bg-luna-accent text-white rounded-md hover:opacity-90 active:scale-95"
          >
            Set
          </button>
        </div>

        <div className="text-center text-6xl font-mono mb-6 text-white">
          {formatTime(remaining)}
        </div>

        <div className="flex gap-4">
          <button
            onClick={start}
            disabled={running}
            className="flex-1 bg-emerald-500 text-white py-2 rounded-md hover:bg-emerald-400 disabled:opacity-40"
          >
            Start
          </button>
          <button
            onClick={pause}
            disabled={!running}
            className="flex-1 bg-amber-400 text-black py-2 rounded-md hover:bg-amber-300 disabled:opacity-40"
          >
            Pause
          </button>
          <button
            onClick={reset}
            className="flex-1 bg-rose-500 text-white py-2 rounded-md hover:bg-rose-400"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
