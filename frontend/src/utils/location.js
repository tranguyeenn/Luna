// utils/location.js

export async function getCityFromCoords(lat, lon) {
  try {
    const res = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
    );

    const data = await res.json();

    // BigDataCloud gives clean fields:
    // locality = actual city
    // principalSubdivision = state
    const city = data.locality || "Unknown";
    const state = data.principalSubdivision || "";

    return { city, state };
  } catch (err) {
    console.error("Reverse geocoding failed:", err);
    return { city: "Unknown", state: "" };
  }
}