## Context

The Next.js app is a starter application with no authentication state, protected-route handling, or registration page. The backend registration contract creates a user and session, returns an access token, and sets an HTTP-only refresh-token cookie. The frontend must validate the same input rules while keeping credentials out of persistent browser storage.

## Goals / Non-Goals

**Goals:**
- Provide an accessible `/register` flow that creates an account and opens the dashboard.
- Keep the access token in module or React memory only and allow the browser to receive the refresh cookie.
- Surface actionable validation and API errors while keeping the form usable after failures.

**Non-Goals:**
- Implement login, token refresh, logout, password recovery, or email verification.
- Persist access tokens in local storage, session storage, or cookies controlled by client JavaScript.
- Build the dashboard task experience beyond the authenticated route shell needed after registration.

## Decisions

### Validate at the form boundary

Use the existing React form and validation libraries if present in the application; otherwise implement the small schema with the installed frontend stack. Trim the name, normalize email to lowercase, and enforce the backend's name, email, password, and confirmation rules before the request.

Client validation provides immediate feedback, while the API remains authoritative for all validation and duplicate-email detection. Duplicating validation only in the API was rejected because it gives poor feedback and does not meet the brief.

### Use a single registration request path

Submit `POST /api/auth/register` with `{ name, email, password }` and `credentials: 'include'`. On a successful response, write only `accessToken` to the in-memory auth store, then navigate to `/`.

The refresh token is intentionally not read by client code because it is delivered as an HTTP-only cookie. Persisting the access token was rejected because it violates the security baseline.

### Map errors to safe, accessible form feedback

Associate duplicate-email responses with the email field. Render general request failures in an announced form-level error region, preserve entered values, and never render submitted password values in error content. Disable submission while the request is pending.

Inline errors and a form-level live region are preferred over toast-only feedback because the errors remain discoverable through keyboard navigation and assistive technology.

### Keep the page responsive with semantic controls

Use labels associated with each control, visible focus styles, and standard inputs/buttons. The card is centered on larger screens and expands to the available width with adequate touch target sizing on small screens.

Native semantic controls are preferred over custom controls because they provide keyboard support and validation semantics without additional code.

## Risks / Trade-offs

- [Backend contract unavailable or differs from the brief] → Keep the API wrapper isolated and align its response/error mapping with the implemented endpoint before integration testing.
- [In-memory access token is lost on reload] → This is intentional; the later session-maintenance story restores access through the refresh cookie.
- [Client/backend validation drifts] → Cover boundary rules in client tests and update the shared schema or tests whenever backend rules change.
