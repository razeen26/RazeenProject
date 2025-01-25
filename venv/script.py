import sqlite3
import json

db_name = "image_db.sqlite"  # Your database file name
backup_file_name = "image_backup.json"

conn = sqlite3.connect(db_name)
cursor = conn.cursor()

# Fetch all rows from the `images` table
cursor.execute("SELECT * FROM images")
rows = cursor.fetchall()

# Get column names
column_names = [description[0] for description in cursor.description]

# Convert rows to dictionaries
data = [dict(zip(column_names, row)) for row in rows]

# Save data to a JSON file
with open(backup_file_name, "w") as backup_file:
    json.dump(data, backup_file, indent=4)

print(f"Database backed up to {backup_file_name}")
conn.close()
