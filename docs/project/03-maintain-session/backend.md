# Maintain an Authenticated Session: Backend

## Description

Renew expired access tokens from a valid refresh-token cookie without exposing the refresh token to client JavaScript.

## Requirements

- Implement public `POST /api/auth/refresh` that reads the configured cookie.
- Verify the refresh JWT, locate its session, reject revoked or expired sessions, compare the token against its Argon2 hash, and require an active user.
- Rotate the refresh token, update its hash and `lastUsedAt`, set a replacement cookie, and return a new access token.
- Add JWT strategy, global auth guard, `@Public()`, `@CurrentUser()`, and authenticated user type.
- Implement protected `GET /api/auth/me` returning safe user fields.

## Acceptance Criteria

- A valid refresh returns a new access token and replacement cookie.
- Expired, revoked, malformed, mismatched, or reused refresh tokens return `401`.
- `/api/auth/me` rejects unauthenticated requests and excludes sensitive fields.

## Tests

- Valid rotation, invalid token, expired session, revoked session, inactive user, and `/me` response shape.

## Dependencies

Registration, login, session persistence, JWT configuration, and cookie parsing.
