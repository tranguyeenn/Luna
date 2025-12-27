import csv
import matplotlib.pyplot as plt
import os

CSV_PATH = "analytics/exports/daily_metrics.csv"
FIG_DIR = "analytics/figures"

os.makedirs(FIG_DIR, exist_ok=True)

sleep = []
energy = []
study = []

with open(CSV_PATH, "r") as f:
    reader = csv.DictReader(f)
    for row in reader:
        sleep.append(float(row["sleep_hours"]))
        energy.append(int(row["energy"]))
        study.append(int(row["study_minutes"]))

plt.figure()
plt.scatter(sleep, energy)
plt.xlabel("Sleep Hours")
plt.ylabel("Energy")
plt.title("Sleep vs Energy")
plt.savefig(f"{FIG_DIR}/sleep_vs_energy.png")
plt.show()

plt.figure()
plt.scatter(sleep, study)
plt.xlabel("Sleep Hours")
plt.ylabel("Study Minutes")
plt.title("Sleep vs Study Minutes")
plt.savefig(f"{FIG_DIR}/sleep_vs_study.png")
plt.show()

plt.figure()
plt.scatter(energy, study)
plt.xlabel("Energy")
plt.ylabel("Study Minutes")
plt.title("Energy vs Study Minutes")
plt.savefig(f"{FIG_DIR}/energy_vs_study.png")
plt.show() 