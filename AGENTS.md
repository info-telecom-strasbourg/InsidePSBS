# Expo HAS CHANGED

Read the exact versioned docs at https://docs.expo.dev/versions/v57.0.0/ before writing any code.

## The Legacy App

The first InsidePSBS app is preserved at the annotated tag `legacy-app`. Issue #170 is the hub for the rewrite that replaces it, and every rewrite issue branches from `refactor/upgrade-app` — which deleted the old tree, so the Legacy App is never on your branch.

Consult it as a side-by-side checkout, never by merging or cherry-picking from it:

```sh
git worktree add ../old-app legacy-app
```

The checkout is detached, so it cannot be committed to by accident. Read it for behaviour to preserve: the rewrite targets feature parity, not visual fidelity — see `docs/adr/0002-rewrite-for-feature-parity-not-visual-fidelity.md`.

## Agent skills

### Issue tracker

Issues and PRDs live as GitHub issues in `info-telecom-strasbourg/InsidePSBS`, driven by the `gh` CLI. See `docs/agents/issue-tracker.md`.

### Triage labels

The five canonical triage roles, each label string equal to its name. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: `CONTEXT.md` and `docs/adr/` at the repo root. See `docs/agents/domain.md`.

