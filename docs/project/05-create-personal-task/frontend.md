# Create a Personal Task: Frontend

## Description

Offer a concise task form that exposes only fields the backend permits and returns the user to their task workspace after creation.

## UI

- Route: `/tasks/new`, reachable from a persistent "New task" action.
- Page heading: "Create task" with a cancel link back to the dashboard.
- Fields: required title, optional description, priority select defaulting to Medium, and optional date/time due-date input.
- Use a single-column form with a prominent submit button; use a side summary only on large screens if it adds useful context.
- Show inline validation and retain values on failure.
- After successful creation, show a success message and return to `/` or open the new task detail page.
- Mobile controls use native date/time inputs and full-width actions.

## API Contract

- Submit `POST /api/tasks`; never send a user ID.

## Acceptance Criteria

- The form cannot submit without a valid title.
- Priority and due date map to API-supported values.
- Submission feedback handles loading, validation, and network errors.
- The newly created task becomes visible in the user's task list.

## Dependencies

Authenticated routes, task API client, and dashboard task query invalidation.
