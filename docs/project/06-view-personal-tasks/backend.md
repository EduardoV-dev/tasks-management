# View Personal Tasks: Backend

## Description

List and summarize only the authenticated user's tasks, with safe search and filtering controls.

## Requirements

- Implement protected `GET /api/tasks` with validated `status`, `priority`, `search`, `sortBy`, `sortOrder`, `page`, `limit`, and `overdue` query parameters.
- Scope the Prisma `where` clause to the authenticated user ID before all other conditions.
- Return paginated data and totals for the current user's matching tasks.
- Implement protected `GET /api/tasks/statistics` with total, TODO, in-progress, completed, and overdue counts scoped to the user.
- Implement protected `GET /api/tasks/:id` using both task ID and user ID, returning `404` when unavailable.

## Acceptance Criteria

- Search, filters, totals, and statistics never include another user's tasks.
- Invalid query values are rejected.
- Unknown or foreign task IDs return `404`.
- Sorting is constrained to approved fields and directions.

## Tests

- List isolation, filtered isolation, pagination totals, and statistics isolation.
- Owner retrieves a task; another user receives `404`.

## Dependencies

Task schema, authentication, and task creation.
