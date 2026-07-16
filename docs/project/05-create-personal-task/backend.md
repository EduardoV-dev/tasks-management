# Create a Personal Task: Backend

## Description

Create a task that is automatically owned by the authenticated user.

## Requirements

- Add `Task` Prisma model and `TaskStatus`/`TaskPriority` enums.
- Implement protected `POST /api/tasks`.
- Validate title, optional description, priority, and optional ISO due date.
- Ignore neither accept nor map a client-supplied `userId`; reject it through non-whitelisted DTO validation.
- Persist `userId` from `@CurrentUser()` and return `201` with the created task.

## Acceptance Criteria

- Unauthenticated creation returns `401`.
- A task is persisted with the authenticated user's ID.
- Another user cannot retrieve it through any task endpoint.
- Invalid values and unexpected fields are rejected.

## Tests

- Create task for authenticated user.
- Request with `userId` is rejected.
- Created task is isolated from another user.

## Dependencies

Task schema, Prisma, global validation, and authentication guard.
