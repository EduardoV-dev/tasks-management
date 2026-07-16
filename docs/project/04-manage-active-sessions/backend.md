# Manage Active Sessions: Backend

## Description

Allow users to inspect and revoke only the active device sessions that belong to their account.

## Requirements

- Implement protected `GET /api/sessions` filtered by user ID, non-revoked status, and non-expired status.
- Return session metadata only: ID, user agent, IP address, timestamps, expiry, and `isCurrent`.
- Implement protected `DELETE /api/sessions/:sessionId`; scope the lookup to the authenticated user and mark it revoked.
- Implement `POST /api/auth/logout` to revoke the current session and clear its cookie.
- Implement `POST /api/auth/logout-all` to revoke all active sessions for the authenticated user and clear the current cookie.

## Acceptance Criteria

- A user cannot list or revoke another user's session.
- Session responses never expose refresh-token hashes or raw tokens.
- Revoked sessions cannot refresh.
- Logout endpoints return `204` and clear the refresh cookie.

## Tests

- Two logins create two visible sessions.
- Revoke one session without affecting the other.
- Cross-user revocation fails without exposing the session.
- Logout-all revokes every active session.

## Dependencies

Authenticated guard and refresh-session implementation.
