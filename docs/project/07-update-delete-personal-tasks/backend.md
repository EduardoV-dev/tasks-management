# Update or Delete a Personal Task: Backend

## Description

Allow a user to modify or remove only tasks they own, without confirming that another user's task exists.

## Requirements

- Implement protected `PATCH /api/tasks/:id` with UUID validation and a partial update DTO.
- Reject an empty update body.
- Find the task with both `id` and authenticated `userId` before updating.
- Implement protected `DELETE /api/tasks/:id` with the same ownership-aware lookup.
- Return `404` for missing or foreign tasks and `204` after successful deletion.

## Acceptance Criteria

- Owners can update allowed fields and see the updated task.
- Owners can delete their tasks.
- Another user gets `404` for get, update, and delete.
- No endpoint accepts a user ID from the client.

## Tests

- Owner update and delete.
- Empty update rejection.
- Cross-user update/delete returns `404`.
- Deleted tasks are no longer retrievable.

## Dependencies

Task creation, ownership-aware lookup, and list/detail endpoints.
