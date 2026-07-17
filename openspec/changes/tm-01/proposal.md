## Why

The web app only contains its starter screen, so new users cannot create an account or enter the task dashboard. Registration is the first required frontend identity flow and establishes the token handling pattern that later authenticated routes depend on.

## What Changes

- Add a public `/register` screen with accessible account registration fields and client-side validation.
- Submit valid registrations to the existing registration API with credentials, retain the returned access token only in memory, and navigate to the authenticated dashboard.
- Present API validation and duplicate-email failures without exposing password values.

## Capabilities

### New Capabilities
- `account-registration`: Enables a visitor to create an account and enter an authenticated dashboard session.

### Modified Capabilities

None.

## Impact

- Affects the Next.js web application, including the registration route, auth token state, and authenticated-route handling.
- Consumes `POST /api/auth/register`, which must return an access token and set a refresh-token cookie.
- Depends on the backend registration endpoint and the shared auth/dashboard foundation planned in the roadmap.
