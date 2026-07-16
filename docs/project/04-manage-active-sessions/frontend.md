# Manage Active Sessions: Frontend

## Description

Give users a clear security settings page for reviewing devices and ending sessions.

## UI

- Route: `/settings/sessions`.
- Header: "Active sessions" with supporting copy and a danger-outline "Log out all devices" action.
- Present the current session first in a visually distinct card labelled "This device".
- List other sessions in rows/cards showing user agent, IP when available, last used, creation date, expiry, and a "Revoke" action.
- Ask for confirmation before revoking a session or logging out everywhere; use clear irreversible-action language.
- If the current session is revoked, clear memory auth and redirect to `/login`.
- Include loading skeletons, an empty state, and per-action pending feedback.
- On mobile, stack metadata below the device label and keep revoke actions reachable.

## API Contract

- Read `GET /api/sessions`.
- Revoke with `DELETE /api/sessions/:sessionId`.
- Use `POST /api/auth/logout-all` for all-device logout.

## Acceptance Criteria

- The current device is unambiguous.
- Users get clear success or error feedback for revocation actions.
- Session metadata is readable without showing secrets.
- Destructive controls are keyboard accessible and confirmed.

## Dependencies

Session API, auth token store, authenticated application layout.
