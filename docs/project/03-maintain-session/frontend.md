# Maintain an Authenticated Session: Frontend

## Description

Restore the application session on startup and retry a failed protected request once after refreshing the access token.

## UI and Behavior

- During startup, show a compact neutral loading screen while calling `/api/auth/refresh`, then `/api/auth/me`.
- Keep the access token in application memory only; the browser owns the HTTP-only refresh cookie.
- Attach `Authorization: Bearer <token>` to protected API requests.
- On one `401`, refresh with credentials, update the in-memory token, and retry the original request once.
- If refresh fails, clear in-memory auth and redirect to `/login` with no retry loop.
- Preserve the intended protected destination when practical after login.

## Acceptance Criteria

- Reloading a valid session restores the dashboard without a login prompt.
- An expired access token retries exactly once after a successful refresh.
- A failed refresh reaches `/login` and leaves no stale authenticated UI.
- Refresh requests include browser credentials.

## Dependencies

Login, registration, refresh endpoint, shared API client, and protected layout.
