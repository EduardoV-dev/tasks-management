# Update or Delete a Personal Task: Frontend

## Description

Provide clear detail and edit experiences for a user's tasks, including deliberate deletion confirmation.

## UI

- Routes: `/tasks/:id` and `/tasks/:id/edit`.
- Detail page displays title, description, status, priority, due date, and created/updated timestamps, with "Edit" and "Delete" controls.
- Edit page reuses the create-form field layout, prefilled with task data, plus status selection and a save action.
- Delete opens an accessible confirmation dialog naming the task and explaining it cannot be undone.
- Successful update returns to the detail view with updated data; successful delete returns to `/` with a confirmation message.
- A `404` shows a neutral "Task not found" page rather than an ownership message.
- Use pending states to prevent duplicate updates/deletions and present recoverable network errors inline.
- On mobile, keep the primary edit action visible and make destructive actions visually distinct but not dominant.

## API Contract

- Read `GET /api/tasks/:id`.
- Update `PATCH /api/tasks/:id` with changed allowed fields only.
- Delete `DELETE /api/tasks/:id`.

## Acceptance Criteria

- Users can edit every supported task field and cannot submit an empty update.
- Delete requires explicit confirmation.
- A missing or foreign task never reveals ownership information.
- Dashboard data updates after mutation without stale deleted tasks.

## Dependencies

Task detail API, update/delete APIs, dashboard query invalidation, and authenticated routing.
