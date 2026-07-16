# Register an Account: Frontend

## Description

Provide a focused public registration screen that turns a valid new account into an authenticated dashboard session.

## UI

- Route: `/register`.
- Centered card with product name, "Create your account" heading, and a link to `/login`.
- Fields: name, email, password, confirm password.
- Show concise inline validation, password rules below the password input, and a disabled submit button while submitting.
- On success, store only the returned access token in memory and navigate to `/`.
- Display duplicate-email errors beside the email field; never expose password values in errors.
- On small screens, use a full-width card with comfortable touch targets; preserve labels and visible focus states.

## API Contract

- Submit `POST /api/auth/register` with name, email, and password.
- Send credentials so the browser accepts the refresh-token cookie.

## Acceptance Criteria

- Client validation matches the backend rules and requires matching passwords.
- Successful registration opens the authenticated dashboard.
- API errors are understandable and the form remains editable after failure.
- Keyboard navigation, associated labels, and error announcements work without a mouse.

## Dependencies

Auth token store and authenticated route handling.
