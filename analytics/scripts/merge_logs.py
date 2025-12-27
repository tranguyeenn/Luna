import os 
import json
import csv

log_dir = "data/manual_logs"
output_csv = "analytics/exports/daily_metrics.csv"

fields = ["date", "sleep_hours", "energy", "focus", "study_minutes"]

rows = []

for filename in sorted(os.listdir(log_dir)):
    if filename.endswith(".json"):
        filepath = os.path.join(log_dir, filename)
    
        with open(filepath, 'r') as f:
            data = json.load(f)
        
        row = {}
        for field in fields:
            row[field] = data.get(field)
        
        rows.append(row)

os.makedirs(os.path.dirname(output_csv), exist_ok=True)

with open(output_csv, "w", newline="") as f:
    writer = csv.DictWriter(f, fieldnames=fields)
    writer.writeheader()
    writer.writerows(rows)

print(f"Saved {len(rows)} rows to {output_csv}")