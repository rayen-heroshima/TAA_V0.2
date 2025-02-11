import pandas as pd
import json

# ===== CONFIGURATION =====
# Update these paths to point to your actual Excel file and desired output location.
excel_file_path = r"C:\Users\rayen\Downloads\Ref_ESG_Globa.xlsx"
json_file_path = r"C:\Users\rayen\Downloads\grille_evaluation.json"

# ===== READ THE EXCEL FILE =====
# Load the "Grille d'évaluation" sheet
df = pd.read_excel(excel_file_path, sheet_name="Grille d'évaluation")

# ===== HELPER FUNCTION =====
def detect_category(cell_value):
    """
    Given a cell value from column "Unnamed: 0", detect if it is a category header.
    Returns "Gouvernance", "Social", or "Environnement" if found; otherwise, None.
    """
    if pd.isna(cell_value):
        return None
    text = str(cell_value).strip().lower()
    if text.startswith("i - gouvernance"):
        return "Gouvernance"
    elif text.startswith("ii - etre acteur"):
        return "Social"
    elif text.startswith("iii - contribuer"):
        return "Environnement"
    return None

# ===== DATA STRUCTURES =====
# We will store the results in a dictionary.
# For categories that have subtitles (as in your manual example for Gouvernance),
# we will use a dictionary where each subtitle is a key with a "content" list.
data = {}

current_category = None
current_subtitle = None

# ===== PROCESS THE ROWS =====
for idx, row in df.iterrows():
    cell0 = row.get("Unnamed: 0")
    
    # If the cell in column "Unnamed: 0" is not empty, it could be either a category header or a subtitle.
    if pd.notna(cell0) and str(cell0).strip() != "":
        # First, check if it is a category header.
        cat = detect_category(cell0)
        if cat is not None:
            current_category = cat
            # Initialize the category container as a dictionary.
            if current_category not in data:
                data[current_category] = {}
            current_subtitle = None  # Reset subtitle when a new category is encountered.
            continue
        
        # Otherwise, treat it as a subtitle row.
        # (A subtitle row is one that has a nonempty value in "Unnamed: 0" and does not match a category header.)
        current_subtitle = str(cell0).strip()
        if current_category is not None:
            # Initialize this subtitle with a "content" list if not already present.
            if current_subtitle not in data[current_category]:
                data[current_category][current_subtitle] = {"content": []}
        continue  # Skip further processing for a subtitle row.
    
    # If the cell in "Unnamed: 0" is empty, we assume it's a question row.
    # Extract question details from the other columns.
    question_text = row.get("Unnamed: 2")
    niveaux = row.get("Unnamed: 3")
    score = row.get("Unnamed: 4")
    
    # Only process the row if all required fields are present.
    if pd.notna(question_text) and pd.notna(niveaux) and pd.notna(score):
        try:
            score = float(score)
        except ValueError:
            continue  # Skip this row if the score is not a valid number.
        
        qdata = {
            "question": question_text,
            "niveaux": niveaux,
            "score": score
        }
        
        # Ensure that a category (and subtitle) has been detected.
        if current_category is not None:
            # If no subtitle row was encountered for this category, create a default subtitle.
            if current_subtitle is None:
                current_subtitle = "Default"
                if current_subtitle not in data[current_category]:
                    data[current_category][current_subtitle] = {"content": []}
            # Append the question to the current subtitle's "content" list.
            data[current_category][current_subtitle]["content"].append(qdata)

# ===== SAVE THE RESULT AS JSON =====
with open(json_file_path, "w", encoding="utf-8") as f:
    json.dump(data, f, indent=4, ensure_ascii=False)

print(f"JSON file saved at: {json_file_path}")
