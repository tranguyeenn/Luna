# Luna

Luna is a personal, data-first logging and analytics project for understanding patterns in energy, focus, sleep, and study behavior over time.

The project prioritizes consistent data collection before analysis or automation.

---

## Status

**Phase 1 – Offline Data Logging**

At this stage, Luna:
- Logs daily self-reported data via a Python script
- Stores one JSON file per day
- Loads and orders logs for later analysis

Frontend, backend APIs, dashboards, and machine learning are intentionally out of scope.

---
## Structure

```text
Luna/
├── NOW.md
├── README.md
├── analytics/
│   ├── exports/
│   │   ├── daily_metrics.csv
│   │   ├── feature_set.csv
│   │   └── weekly_metrics.csv
│   ├── figures/
│   │   ├── daily_screen_time.png
│   │   ├── energy_trend.png
│   │   └── focus_vs_screen_scatter.png
│   ├── scripts/
│   │   ├── compute_kpis.py
│   │   ├── generate_monthly_report.py
│   │   ├── generate_weekly_summary.py
│   │   └── plot_lifestyle_charts.py
│   └── summaries/
│       ├── monthly/
│       │   └── 2025-12_monthly.md
│       └── weekly/
│           └── 2025-12-15_weekly.md
├── data/
│   ├── interim/
│   │   └── merged_temp.csv
│   ├── manual_logs/
│   │   └── 2025-12-17.json
│   ├── processed/
│   │   ├── device_usage_clean.csv
│   │   ├── energy_focus_clean.csv
│   │   ├── features_daily.csv
│   │   ├── journal_clean.csv
│   │   └── sleep_clean.csv
│   └── raw/
│       ├── device_usage.csv
│       ├── eneergy_focus.csv
│       ├── journal.csv
│       ├── sleep.csv
│       └── tasks.csv
├── docs/
│   ├── analytics/
│   │   └── metrics_definitions.md
│   ├── api/
│   │   ├── endpoints.md
│   │   └── response_examples.md
│   ├── architecture/
│   │   ├── data_flow_diagram.png
│   │   └── system_overview.md
│   ├── datasets/
│   │   ├── schema_sleep.md
│   │   ├── schema_device_usage.md
│   │   ├── schema_energy_focus.md
│   │   ├── schema_journal.md
│   │   └── schema_tasks.md
│   └── roadmap/
│       ├── Q1_2025.md
│       └── features_vision.md
├── environment.yml
├── reports/
│   └── figures/
│       ├── energy_trend.png
│       └── screen_time_plot.png
├── requirements.txt
├── scripts/
│   ├── load_logs.py
│   └── log_day.py
└── src/
    ├── __init__.py
    ├── analytics/
    │   ├── monthly_report.py
    │   └── weekly_summary.py
    ├── cleaning/
    │   ├── clean_device_usage.py
    │   ├── clean_energy_focus.py
    │   ├── clean_journal.py
    │   └── utils_cleaning.py
    ├── features/
    │   ├── build_daily_features.py
    │   └── features_utils.py
    ├── ingestion/
    │   ├── import_device_usage.py
    │   ├── import_focus_energy.py
    │   ├── import_journal.py
    │   └── import_tasks.py
    └── utils/
        ├── merge_utils.py
        ├── plotting_utils.py
        └── time_utils.py
```
---

## Usage

### Daily Logging

Run once per day from the repository root:

```bash
python scripts/log_day.py
```

### Loading Logs

To verify logs are being recorded correctly

```bash
python scripts/load_logs.py
```

---

## Principle

- Data before insight
- Simple over clever
- One responisbility per script
- Manual --> Automated --> Intelligent Progression
