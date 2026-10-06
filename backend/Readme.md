Token-Blacklisting is best done using "Redis". Although for now we will be using Mongodb
JWT blacklisting is a technique where the server maintains a list of tokens that must no longer be accepted, even if their signature and expiration are valid.

Every time a protected API request arrives, the server checks whether the token has been blacklisted.

-> If the token is blacklisted → Reject the request.
-> If the token is valid and not blacklisted → Continue authentication.

Think of it as a revocation list for tokens.




## 🐛 Errors & Fixes

### 1. `pdfParse is not a function`
- **Cause:** The installed `pdf-parse` version uses the newer `PDFParse` API.
- **Fix:** Updated PDF parsing to use `new PDFParse({ data: req.file.buffer })` and `parser.getText()`.

### 2. Mongoose `Cast to embedded failed`
- **Cause:** Field names in the Mongoose schema didn't match the AI response (`techincalQuestions` / `preparationPlans`).
- **Fix:** Corrected the schema field names to `technicalQuestions` and `preparationPlan`.

### 3. `technicalQuestions` returned as an array of strings
- **Cause:** `zod-to-json-schema` generated an invalid/empty JSON schema when used with **Zod 4**.
- **Fix:** Switched from **Zod 4 to Zod 3**, making the generated JSON schema compatible with Gemini structured output.

### 4. Gemini `Unknown name "def" at generation_config.response_schema`
- **Cause:** Passing the Zod schema directly to `responseSchema` was incompatible with the installed `@google/genai` version.
- **Fix:** Converted the Zod schema using `zodToJsonSchema()` and passed the generated JSON schema to Gemini.