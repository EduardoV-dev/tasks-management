# Log In: Frontend

## Description

Let an existing user authenticate from a minimal public page and enter the task workspace.

## UI

- Route: `/login`.
- Centered card with email and password fields, a primary "Log in" button, and a link to `/register`.
- Keep one generic form-level error: "Invalid email or password." Do not distinguish failed credential causes.
- Disable submission while pending and retain the email after an error.
- On success, save the access token in memory and redirect to `/`.
- Mobile layout is single-column with full-width controls and no hidden labels.

## API Contract

- Submit `POST /api/auth/login` with credentials included for the refresh cookie.

## Acceptance Criteria

- Valid credentials enter the protected application.
- Any `401` is shown as the generic credentials message.
- Loading, network-failure, and keyboard-accessible states are present.
- Password input uses `type="password"` and is never persisted by application state.

## Dependencies

In-memory access-token store and protected-route behavior.
