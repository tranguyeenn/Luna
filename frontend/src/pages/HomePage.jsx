import React, { useState, useEffect, useMemo } from "react";
import DesktopShell from "../components/layout/DesktopShell.jsx";
import Card from "../components/ui/Card.jsx";

import { getWeather } from "../utils/weather";
import { getCityFromCoords } from "../utils/location";
import { getDeviceUsage, startUsageTracking } from "../utils/usage";
import { computeEnergy, computeFocus } from "../utils/aiModel";

export default function HomePage() {
  const [time, setTime] = useState(new Date());
  const [weather, setWeather] = useState(null);
  const [locationLabel, setLocationLabel] = useState("Loading location...");
  const [intention, setIntention] = useState(localStorage.getItem("intention") || "");

  const [deviceUsage, setDeviceUsage] = useState({ mac: 0, iphone: 0, ipad: 0 });

  const [energy, setEnergy] = useState(null);
  const [focus, setFocus] = useState(null);

  useEffect(() => {
    const today = new Date().toLocaleDateString();
    const last = localStorage.getItem("lastActiveDate");

    if (last !== today) {
      localStorage.setItem("intention", "");
      localStorage.setItem("deviceUsage", JSON.stringify({ mac: 0, iphone: 0, ipad: 0 }));

      setIntention("");
      setDeviceUsage({ mac: 0, iphone: 0, ipad: 0 });

      localStorage.setItem("lastActiveDate", today);
    }
  }, []);

 
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const fallback = async () => {
      const w = await getWeather(33.7490, -84.3880);
      setWeather(w);
      setLocationLabel("Atlanta, GA");
    };

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;

          const loc = await getCityFromCoords(lat, lon);
          setLocationLabel(`${loc.city}, ${loc.state}`);

          const w = await getWeather(lat, lon);
          setWeather(w);
        },
        fallback
      );
    } else fallback();
  }, []);

 
  useEffect(() => {
    startUsageTracking();

    setDeviceUsage(getDeviceUsage());

    const interval = setInterval(() => {
      setDeviceUsage(getDeviceUsage());
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!weather) return;

    const input = {
      weatherTempF: weather.temp,
      phoneUsage: deviceUsage.iphone,
      hour: time.getHours(),
      intention,
    };

    setEnergy(computeEnergy(input));
    setFocus(computeFocus(input));
  }, [weather, deviceUsage, time, intention]);

  function formatMinutes(mins) {
    if (mins < 60) return `${mins} min`;

    const hrs = Math.floor(mins / 60);
    const m = mins % 60;
    return m ? `${hrs} hr ${m} min` : `${hrs} hr`;
  }

  const updateIntention = (e) => {
    const val = e.target.value;
    setIntention(val);
    localStorage.setItem("intention", val);
  };

  return (
    <DesktopShell>
      <h1 className="text-2xl font-semibold mb-4">Home</h1>

      <div className="space-y-4">

        {/* Time */}
        <Card className="py-4">
          <p className="text-3xl font-bold">
            {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </p>
          <p className="text-luna-muted text-sm">
            {time.toLocaleDateString([], { weekday: "long", month: "short", day: "numeric" })}
          </p>
        </Card>

        {/* Weather + Energy + Focus */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="py-3">
            <p className="font-medium text-sm">Weather</p>
            <p className="text-luna-muted text-xs">{locationLabel}</p>
            <p className="text-luna-muted text-xs">
              {weather ? `${weather.temp}°F • ${weather.condition}` : "Loading..."}
            </p>
          </Card>

          <Card className="py-3">
            <p className="font-medium text-sm">Energy</p>
            <p className="text-luna-muted text-xs">
              {energy !== null ? `${energy}/10` : "Loading..."}
            </p>
          </Card>

          <Card className="py-3">
            <p className="font-medium text-sm">Focus</p>
            <p className="text-luna-muted text-xs">{focus || "Loading..."}</p>
          </Card>
        </div>

        {/* Device Usage */}
        <p className="font-medium text-sm">Device Usage</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="py-3">
            <p className="font-medium text-sm">iPhone</p>
            <p className="text-luna-muted text-xs">{formatMinutes(deviceUsage.iphone)}</p>
          </Card>

          <Card className="py-3">
            <p className="font-medium text-sm">iPad</p>
            <p className="text-luna-muted text-xs">{formatMinutes(deviceUsage.ipad)}</p>
          </Card>

          <Card className="py-3">
            <p className="font-medium text-sm">Mac</p>
            <p className="text-luna-muted text-xs">{formatMinutes(deviceUsage.mac)}</p>
          </Card>
        </div>

        {/* Intention */}
        <Card className="py-3">
          <p className="font-medium text-sm mb-1">Intention</p>
          <input
            value={intention}
            onChange={updateIntention}
            className="w-full bg-transparent border border-luna-border rounded-md px-2 py-1 text-xs focus:outline-none"
            placeholder="Set your intention..."
          />
        </Card>

      </div>
    </DesktopShell>
  );
}
