import pandas as pd
import json

# Define your file path (using a raw string to avoid escape issues)
file_path = r"C:\Users\rayen\Downloads\Ref_ESG_Globa.xlsx"

# Load the Excel file and select the "Grille d'évaluation" sheet
df = pd.read_excel(file_path, sheet_name="Grille d'évaluation")

# Define the categories based on the headers in the file
categories = {
    "Gouvernance": [],
    "Social": [],
    "Environnement": []
}

# Function to detect the current category header from a cell value
def detect_category(cell_value):
    if pd.isna(cell_value):
        return None
    cell_str = str(cell_value).strip().lower()
    if cell_str.startswith("i - gouvernance"):
        return "Gouvernance"
    elif cell_str.startswith("ii - etre acteur"):
        return "Social"
    elif cell_str.startswith("iii - contribuer"):
        return "Environnement"
    return None

current_category = None

# Iterate through the rows of the DataFrame
for idx, row in df.iterrows():
    # Check the first column for a category header
    header_candidate = row.get("Unnamed: 0")
    new_category = detect_category(header_candidate)
    if new_category:
        current_category = new_category
        continue  # Skip header rows

    # Extract question text and score if available
    question_text = row.get("Unnamed: 2")
    level = row.get("Unnamed: 3")
    score = row.get("Unnamed: 4")

    # Only add rows that have both a question and a numeric score
    if pd.notna(question_text) and pd.notna(score) and pd.notna(level):
        try:
            score = float(score)
        except ValueError:
            continue  # Skip if score is not a valid number

        # If no category has been set yet, skip the row (or you could assign a default category)
        if current_category is None:
            continue

        categories[current_category].append({
            "question": question_text,
            "score": score,
            "niveaux":level
        })

# Save the extracted questions by category as a JSON file
json_file_path = r"C:\Users\rayen\Downloads\grille_evaluation.json"
with open(json_file_path, "w", encoding="utf-8") as json_file:
    json.dump(categories, json_file, indent=4, ensure_ascii=False)

print(f"JSON file saved at: {json_file_path}")
