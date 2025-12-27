import csv

csv_path = "analytics/exports/daily_metrics.csv"

sleep = []
study = []

with open(csv_path, "r") as f:
    reader = csv.DictReader(f)
    for row in reader:
        sleep.append(float(row["sleep_hours"]))
        study.append(float(row["study_minutes"]))

print("Days logged:", len(sleep))
print("Average sleep:", round(sum(sleep)/len(sleep), 2))
print("Average study minutes:", round(sum(study) / len(study), 2))
print("Max study minutes:", max(study))
print("Min study minutes:", min(study))