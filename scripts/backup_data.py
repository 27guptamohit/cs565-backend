from datetime import datetime
from dotenv import dotenv_values
import requests

config = dotenv_values(".env")
ENDPOINT = config["ENDPOINT"]

timestamp_str = datetime.now().strftime("%Y%m%d-%H%M%S")

users_response = requests.get(f"{ENDPOINT}/api/users", params={"select": b"{\"_id\": 1, \"email\": 1, \"experience\": 1}"})
if users_response.status_code != 200:
    print(f"Unexpected status code for GET /api/users: {users_response.status_code}, exiting")
    exit(1)

users_fpath = f"backups/{timestamp_str}_users_backup.json"

with open(users_fpath, "w") as file:
    raw_data = str(users_response.json()["data"])
    raw_data = raw_data.replace("\'", "\"")
    file.write(raw_data)

print(f"Wrote users backup to {users_fpath}")

sheet_response = requests.get(f"{ENDPOINT}/api/sheets", params={"select": b"{\"_id\": 1, \"name\": 1}"})
if sheet_response.status_code != 200:
    print(f"Unexpected status code for GET /api/sheets: {sheet_response.status_code}, exiting")
    exit(1)

sheets_fpath = f"backups/{timestamp_str}_sheets_backup.json"

with open(sheets_fpath, "w") as file:
    raw_data = str(sheet_response.json()["data"])
    raw_data = raw_data.replace("\'", "\"")
    file.write(raw_data)

print(f"Wrote sheets backup to {sheets_fpath}")

measure_response = requests.get(f"{ENDPOINT}/api/measures", params={"select": b"{\"_id\": 1, \"sheetId\": 1, \"measureNum\": 1, \"responses\": 1, \"goldSymbols\": 1}"})
if measure_response.status_code != 200:
    print(f"Unexpected status code for GET /api/measures: {measure_response.status_code}, exiting")
    exit(1)

measures_fpath = f"backups/{timestamp_str}_measures_backup.json"

with open(measures_fpath, "w") as file:
    raw_data = str(measure_response.json()["data"])
    raw_data = raw_data.replace("\'", "\"")
    file.write(raw_data)

print(f"Wrote measures backup to {measures_fpath}")