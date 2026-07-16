---
name: frontend-use-case
description: Implement frontend use cases end to end from an implementation description and acceptance criteria. Use when asked to build, finish, fix, or deliver a frontend feature, page, component, or user flow.
---

# Frontend Use Case

Deliver the requested frontend use case completely. Do not stop after a partial implementation, a visual mock, or a passing compile. The implementation description and acceptance criteria are the source of truth.

## Required Skills

At the start, load all of these installed skills and follow the parts that apply to the task:

1. `skill("frontend-design")` for deliberate visual and content decisions.
2. `skill("shadcn")` to inspect and correctly compose available shadcn components when the project uses shadcn.
3. `skill("tdd")` for behavior changes that merit automated tests.
4. `skill("ui-ux-pro-max")` for UX, accessibility, responsive, and interaction guidance.
5. `skill("vercel-react-best-practices")` for React or Next.js code.
6. `skill("web-design-guidelines")` for the final UI quality review.

Do not add dependencies or custom primitives when the existing project, browser platform, or installed shadcn components already cover the need.

## Workflow

1. Extract the implementation description and turn every acceptance criterion into a checkable item. If either is absent, ask for it before implementing.
2. Inspect the existing route, components, styles, tests, design system, and project scripts. Reuse established patterns and components.
3. For a new or materially changed interface, establish a compact design direction using the frontend-design and ui-ux-pro-max guidance. For a small change, preserve the existing visual language instead of inventing a second one.
4. If behavior needs tests, identify the public seam. If the description and criteria do not establish it, ask the user to confirm the seam before writing tests, as required by the TDD skill. Write only behavior-focused tests that protect the criteria.
5. Implement the smallest complete vertical slice. Include loading, empty, error, disabled, and success states when the use case can reach them.
6. For React or Next.js, apply the Vercel guidance proportionally. Avoid speculative memoization and performance work; address real data-fetching, rendering, client-boundary, or bundle concerns.
7. Validate each criterion through the real user-facing interface when feasible. Check keyboard use, visible focus, semantic names, labels, mobile layout, and reduced motion as applicable.
8. Run the narrowest relevant tests, type check, lint, and build commands available in the project. Fix failures caused by this work.
9. Before declaring completion, load fresh web-design-guidelines guidance and review the changed UI. Correct issues that violate the description, criteria, accessibility basics, or established design system.

## Definition Of Done

The use case is done only when:

- Every acceptance criterion has an implementation and verification result.
- Relevant behavior is tested where a confirmed public seam exists.
- The implementation works at desktop and mobile widths when it changes UI.
- The relevant project checks pass, or any unrelated blocker is clearly identified.
- The changed UI has been reviewed against the current web interface guidelines.

In the final response, state the files changed, the checks run, and any criterion that could not be verified. Do not claim completion with unverified criteria.
