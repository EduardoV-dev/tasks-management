# Log In: Backend

## Description

Authenticate existing credentials and create a separate device session for every successful login.

## Requirements

- Implement public `POST /api/auth/login` with normalized email and password DTO validation.
- Find the user, require `isActive`, and verify the Argon2 password hash.
- Return the same `401 Unauthorized` message, `Invalid email or password`, for unknown email, invalid password, and inactive user.
- Create a session with request user agent and IP when available.
- Issue access and refresh tokens, store only the refresh-token hash, and set the refresh cookie.

## Acceptance Criteria

- Valid credentials return a safe user object and access token.
- Every login creates a new session.
- Failed authentication reveals no account-existence detail.
- No raw refresh token or hash is returned in JSON.

## Tests

- Success, unknown email, wrong password, and inactive account.
- New session creation and refresh-token hashing.

## Dependencies

User model, Argon2 service, session persistence, and token utilities from registration.
