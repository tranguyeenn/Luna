import json
import os

def load_logs(log_dir="data/manual_logs"):
    logs = []

    for filename in os.listdir(log_dir):
        if filename.endswith(".json"):
            path = os.path.join(log_dir, filename)
            with open(path, "r") as f:
                log = json.load(f)
                logs.append(log)
    
    logs.sort(key = get_date)

    return logs

def get_date(log):
    return log["date"]

logs = load_logs()

print("Days logged:", len(logs))
for log in logs:
    print(log["date"], "Focus:", log["focus"], "Energy:", log["energy"], "Sleep Hours:", log["sleep_hours"], sep=" | ", end="\n----------------------------------------------------------\n") ##Accessing values from the logs dict