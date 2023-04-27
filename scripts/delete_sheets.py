from dotenv import dotenv_values
import requests

config = dotenv_values(".env")
ENDPOINT = config["ENDPOINT"]

response = requests.get(f"{ENDPOINT}/api/sheets", params={"select": b"{\"_id\": 1}"})

for obj in response.json()["data"]:
    obj_id = obj["_id"]
    response = requests.delete(f"{ENDPOINT}/api/sheets/{obj_id}")
    data = response.json()["data"]

    if (response.status_code == 200):
        print(f"Successfully deleted sheet _id={data['_id']} / '{data['name']}'")
    else:
        print(f"Failed to delete sheet _id={data['_id']} - status code {response.status_code}")