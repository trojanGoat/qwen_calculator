# Skill: Project Architect (Organization)

## Trigger
Use this skill when starting a new feature, initializing a project, or when the root folder looks cluttered.

## Workflow
1. **Directory Check:** Use `ls -R` to scan the folder structure. 
2. **Setup:** If they don't exist, create the standard folders: `src/`, `assets/`, `docs/`, `temp/`, and `dist/`.
3. **Migration:** If you find files in the root that belong in subfolders (e.g., a `.py` file in root), move them to the correct directory and update any internal import paths to prevent breakage.
4. **Cleanup:** Empty the `/temp` folder after major tasks are completed to keep the workspace light.

