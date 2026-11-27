# Use Preflight in CI

Run Preflight on every pull request so a leaked key or an open database blocks the merge before it lands.

## GitHub Actions

Create `.github/workflows/preflight.yml`:

```yaml
name: Preflight

on:
  pull_request:

permissions:
  contents: read

jobs:
  preflight:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v7
      - uses: actions/setup-node@v7
        with:
          node-version: 20
      - run: npx vibe-preflight --fail-on critical
```

## GitLab CI

Create `.gitlab-ci.yml`:

```yaml
preflight:
  image: node:20
  rules:
    - if: $CI_PIPELINE_SOURCE == 'merge_request_event'
  script:
    - npx vibe-preflight --fail-on critical
```

## Failing the build

`--fail-on` sets the lowest finding level that fails the run: `critical` fails only on critical findings, `warning` also fails on warnings, and `never` always passes, so the report is advisory only.
