---
name: implementation-verification
description: Verify that completed work matches an implementation description and acceptance criteria. Use when asked to verify, validate, check, audit, or review an implementation against a specification or acceptance criteria.
---

# Implementation Verification

Independently verify whether an implementation matches its description and acceptance criteria. Report findings only. Never edit code during this skill.

## Inputs

Use the supplied implementation description, acceptance criteria, relevant issue or ticket, and changed files. If the description or criteria are missing, ask for them before issuing a verdict.

## Workflow

1. Convert each acceptance criterion into an observable check. Include explicit requirements from the implementation description that are not repeated in the criteria.
2. Inspect the implementation and its tests. Trace each criterion through the real public interface instead of inferring behavior from code alone.
3. Run the narrowest relevant test, type-check, lint, and build commands available in the project. Record commands that cannot run and why.
4. When the work has a UI, exercise it in a browser when feasible. Check the required states and interactions, keyboard access, focus visibility, labels, responsive behavior, and obvious regressions.
5. For UI work, load `skill("web-design-guidelines")`, fetch its current guidance, and include relevant violations as findings.
6. Produce a criterion-by-criterion matrix with: criterion, evidence, verdict (`pass`, `fail`, or `not verified`), and concise gap.
7. List findings first, ordered by severity and with file and line references where applicable. Do not treat an unrun check or unavailable environment as a pass.

## Verdict

- Return `PASS` only when every criterion passes with evidence and all relevant checks pass.
- Return `FAIL` if any criterion fails, any relevant check fails, or a criterion cannot be verified.
- Do not broaden the review into unrelated refactors or style preferences.

If the verdict is `FAIL`, finish with: `I found gaps. Do you want me to fix them?`
