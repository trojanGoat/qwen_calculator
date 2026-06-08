# Skill: Knowledge & PDF Ingestion

## Trigger
Use this skill when the user asks you to read, analyze, or ingest information from a `.pdf` file, a manual, or an external binary documentation file.

## Workflow
1. Verify the file path provided by the user in the filesystem.
2. Because you cannot read PDFs natively, execute a bash command using `pdftotext [filename] -` to extract the raw text into your terminal output. 
3. Alternatively, write a quick Python script using a PDF extraction library (like `PyPDF2`) to read the document and print it to the console.
4. Read the extracted text, analyze the contents, and output a structured markdown summary or apply the knowledge directly to the project.
