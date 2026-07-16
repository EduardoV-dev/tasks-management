# View Personal Tasks: Frontend

## Description

Build the primary authenticated dashboard: an at-a-glance task summary and a responsive, queryable list of the user's tasks.

## UI

- Route: `/`.
- App header with product name, "New task" action, and user menu containing session settings and logout.
- Statistics strip with Total, To do, In progress, Completed, and Overdue cards.
- Task workspace with search field, status and priority filters, overdue toggle, sort control, and a clear-filters action.
- Responsive task table on desktop and stacked task cards on mobile. Each item shows title, status, priority, due date, and a link to its details.
- Pagination includes current range, previous/next controls, and disabled states.
- Empty state explains whether no tasks exist or the current filters have no matches, with a create or clear-filters action.
- Use loading skeletons and non-destructive error retry states.

## API Contract

- Fetch `GET /api/tasks` using the visible filters and pagination state.
- Fetch `GET /api/tasks/statistics` for the summary cards.
- Navigate to `GET /api/tasks/:id` data through the detail route.

## Acceptance Criteria

- URL or local query state stays consistent with visible filters and page.
- Search and filter changes reset to page one.
- Only the signed-in user's data is rendered.
- The page remains usable on narrow screens and with keyboard navigation.

## Dependencies

Authentication restoration, list/statistics APIs, and task creation.
