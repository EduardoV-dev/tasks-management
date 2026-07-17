## 1. Authentication Foundation

- [ ] 1.1 Add an in-memory auth token store and the minimal authenticated dashboard route handling required after registration.
- [ ] 1.2 Add a registration API client that sends `{ name, email, password }` to `POST /api/auth/register` with credentials and maps duplicate-email and general failures safely.

## 2. Registration Experience

- [ ] 2.1 Create the public `/register` route with the product identity, login link, responsive card layout, semantic labels, password rules, and visible focus styles.
- [ ] 2.2 Implement client validation for trimmed name, normalized email, password complexity and length, and matching password confirmation.
- [ ] 2.3 Submit valid data, disable submission while pending, store only the returned access token in memory, and navigate to `/` on success.
- [ ] 2.4 Render inline and announced error feedback, including an email-field duplicate error, while preserving editable form state and never including submitted password values in errors.

## 3. Verification

- [ ] 3.1 Add focused component tests for validation, accessible error output, pending submission, successful navigation/token storage, and duplicate-email recovery.
- [ ] 3.2 Run the web lint, typecheck, and test commands.
