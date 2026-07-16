# Register an Account: Backend

## Description

Create an account, persist a safe user record, and establish the user's first authenticated session.

## Requirements

- Add `User` and `Session` Prisma models with unique normalized email addresses.
- Implement `POST /api/auth/register` as a public endpoint.
- Validate trimmed name (2-100 chars), lowercase trimmed email (valid, max 254), and password (8-128 chars with uppercase, lowercase, and number).
- Hash the password with Argon2 before persistence.
- Reject duplicate email with `409 Conflict`.
- Create a session, issue access and refresh JWTs, hash and store the refresh token, and set the refresh cookie.
- Return `201` with the access token and safe user fields only.

## Acceptance Criteria

- Valid input creates one user and one session.
- Stored password and refresh token are hashes, never raw values.
- Duplicate normalized email returns `409`.
- The response excludes `passwordHash`, refresh token, and refresh-token hash.
- The cookie is HTTP-only, `sameSite=lax`, scoped to `/api/auth`, and secure in production.

## Tests

- Successful registration and safe response shape.
- Duplicate-email rejection.
- Password and refresh-token hashing.
- Validation failures for every invalid field.

## Dependencies

Foundation: Prisma, configuration, cookie parsing, global validation, and auth token utilities.
