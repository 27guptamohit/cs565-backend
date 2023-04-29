import argparse
import base64
from dotenv import dotenv_values
import json
import os
import requests

config = dotenv_values(".env")
ENDPOINT = config["ENDPOINT"]

parser = argparse.ArgumentParser()
parser.add_argument("sheet_folder_path", help="path to the folder of the sheet to be uploaded")
parser.add_argument("name", help="name of the sheet in the database")

args = parser.parse_args()

with open(f"{args.sheet_folder_path}/sheet.png", "rb") as image_file:
    encoded_image = base64.b64encode(image_file.read()).decode("utf-8")

response = requests.post(f"{ENDPOINT}/api/sheets", json={ "name": args.name, "image": encoded_image })
data = response.json()["data"]

if (response.status_code == 201):
    print(f"Successfully uploaded sheet _id={data['_id']} / name='{data['name']}'")
else:
    print(f"Failed to upload sheet '{args.name}' - status code {response.status_code}")
    exit(1)

sheet_id = data["_id"]

with open(f"{args.sheet_folder_path}/correct_symbols.json", "r") as json_file:
    correct_symbols = json.load(json_file)["correctSymbols"]

for filename in sorted(os.listdir(f"{args.sheet_folder_path}/measures")):
    # TODO: this is hacky, make more robust
    measure_num = int(filename[7:9])

    with open(f"{args.sheet_folder_path}/measures/{filename}", "rb") as image_file:
        encoded_image = base64.b64encode(image_file.read()).decode("utf-8")
    
    payload = {
        "sheetId": sheet_id,
        "measureNum": measure_num,
        "image": encoded_image,
        # measure numbers are 1-indexed
        "goldSymbols": correct_symbols[measure_num - 1]
    }

    response = requests.post(f"{ENDPOINT}/api/measures", json=payload)
    data = response.json()["data"]

    if (response.status_code == 201):
        print(f"Successfully uploaded measure _id={data['_id']} / sheetId='{data['sheetId']}' / measureNum={data['measureNum']}")
    else:
        print(f"Failed to upload measure sheetId='{data['name']}' / measureNum={measure_num} - status code {response.status_code}")