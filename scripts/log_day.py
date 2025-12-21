import json
from datetime import date
from pathlib import Path

today = date.today().isoformat()

sleep_hours = float(input("Hours slept: "))
energy = max(1, min(5, int(input("Energy (1-5): "))))
focus = max(1, min(5, int(input("Focus (1-5): "))))
study_minutes = int(input("Study minutes: "))
notes = input("Notes(optional): ")

log = {
    "date": today,
    "sleep_hours": sleep_hours,
    "energy": energy,
    "focus": focus,
    "study_minutes": study_minutes,
    "notes": notes
}

log_dir = Path("data/manual_logs")
log_dir.mkdir(parents=True, exist_ok=True)

log_path = log_dir / f"{today}.json"

with open(log_path, "w") as f:
    json.dump(log, f, indent=2)

print(f"Log saved to {today}")
