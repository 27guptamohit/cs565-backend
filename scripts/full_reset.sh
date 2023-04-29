#!/bin/sh

python scripts/delete_sheets.py
python scripts/delete_measures.py
python scripts/upload_sheet.py test_data/sheet1 sheet1
python scripts/upload_sheet.py test_data/sheet2 sheet2
python scripts/upload_sheet.py test_data/sheet3 sheet3