# Skill: Python Path & Filename Sanitizer

## Trigger
Use this skill ONLY when creating a NEW file or when the user explicitly asks to "sanitize" or "cleanup" a name. 

## Workflow
1. **Differentiate Path vs Name:** Identify the directory path separately from the filename using `pathlib.Path`.
2. **Sanitization Logic:**
   - Replace spaces and exclamation marks with underscores `_`.
   - Remove any remaining non-alphanumeric characters (except dots, dashes, and underscores).
   - Python logic: `clean_name = re.sub(r'[^a-zA-Z0-9_\-\.]', '', name.replace(' ', '_'))`
3. **Pathlib Enforcement:** Always construct the final path using `pathlib.Path(directory) / sanitized_filename`. Never use string addition (f-strings) for paths.
4. **Safety Check:** If a file already exists with a different name, ASK the user before renaming it to avoid breaking imports.
