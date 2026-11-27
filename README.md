<div align="center">

# ✈️ Preflight

**Is your vibe-coded app ready to launch? Find out in one command.**

Preflight scans your project for leaked keys, open databases, unverified payments and missing launch basics, then gives you a report card with a fix for every finding.

[![License: MIT](https://img.shields.io/badge/license-MIT-34d399.svg)](LICENSE)
[![Node](https://img.shields.io/badge/node-%E2%89%A520-38bdf8.svg)](package.json)
[![PRs welcome](https://img.shields.io/badge/PRs-welcome-fbbf24.svg)](CONTRIBUTING.md)
[![npm version](https://img.shields.io/npm/v/vibe-preflight)](https://www.npmjs.com/package/vibe-preflight)
[![npm downloads](https://img.shields.io/npm/dm/vibe-preflight)](https://www.npmjs.com/package/vibe-preflight)
[![CI](https://github.com/erdellll/preflight/actions/workflows/ci.yml/badge.svg)](https://github.com/erdellll/preflight/actions/workflows/ci.yml)

**English** · [Español](docs/README.es.md) · [Português (BR)](docs/README.pt-BR.md) · [Français](docs/README.fr.md) · [Deutsch](docs/README.de.md) · [Türkçe](docs/README.tr.md) · [Bahasa Indonesia](docs/README.id.md) · [हिन्दी](docs/README.hi.md) · [简体中文](docs/README.zh-CN.md) · [日本語](docs/README.ja.md) · [한국어](docs/README.ko.md) · [বাংলা](docs/README.bn.md)

![Preflight report card](docs/assets/report-card.png)

</div>

```bash
npx vibe-preflight
```

No install, no account, no network calls. Your code never leaves your machine.

## Why

AI tools make it easy to build an app in a weekend, and just as easy to ship it with your Stripe secret key in the browser bundle or a Supabase table anyone can read. Preflight checks for the mistakes that hurt most after launch, before you launch.

## Try it on a broken app first

```bash
npx vibe-preflight --demo
```

Scans a deliberately broken demo app (every secret is fake) so you can see what a failing report looks like.

## What it checks

23 checks today, across security, reliability and launch basics. See [all checks](docs/rules.md).

| | |
|---|---|
| 🔑 Live secrets in client code | 🗄️ Supabase tables without row-level security |
| 📄 `.env` files that can be committed | 💳 Stripe webhooks without signature checks |
| 🌍 CORS open to every website | 🚨 No error monitoring |
| 🔒 No privacy policy | 🔗 Missing title, description or share image |

## Options

```bash
npx vibe-preflight [path]          # scan a folder (default: current folder)
npx vibe-preflight --html          # also write a shareable preflight-report.html
npx vibe-preflight --json          # machine-readable output ([JSON format](docs/json.md))
npx vibe-preflight --ignore a,b    # skip checks by id
npx vibe-preflight --fail-on warning   # exit code policy: critical (default) | warning | never
```
Set NO_COLOR=1 to turn off coloured output.

Silence a finding that points at a line with `// preflight-ignore <check-id>` on that line or the line above. A finding about a whole file (a committed `.env`, an unverified webhook) takes the same comment in the file's first five lines. Anything you want gone project-wide, including findings with no file at all, uses `--ignore <check-id>`.

## Use it in CI

```yaml
- run: npx vibe-preflight --fail-on critical
```

The command exits with code 1 when a finding reaches the `--fail-on` level, so a leaked key blocks the merge.
See [docs/ci.md](docs/ci.md) for a full workflow.

## Use it inside Claude Code

Preflight ships as a Claude Code plugin with a `/preflight` command that runs the scan, explains the results and offers to fix critical issues one at a time, asking before every change.

In Claude Code, run:

```text
/plugin marketplace add erdellll/preflight
/plugin install preflight@preflight
```

Then type `/preflight` in any project.

## Add a check in 10 minutes

Every check is one small file plus two example folders, one it must flag and one it must leave alone. No build step, no dependencies. Read [CONTRIBUTING.md](CONTRIBUTING.md), or pick an issue labelled [`good first issue`](https://github.com/erdellll/preflight/issues?q=is%3Aopen+label%3A%22good+first+issue%22).

## Not a security audit

Preflight catches common, high-impact mistakes with fast pattern checks. A clean report means none of its checks fired, not that your app is secure. Use it as a seatbelt, not a substitute for a review.

## FAQ

**Does Preflight send my code anywhere?**

No. Preflight runs entirely on your local machine, makes no network calls and does not collect telemetry. Your code never leaves your computer.

**Does a 100/100 score mean my app is secure?**

No. It only means that none of Preflight's checks detected an issue. See the [Not a security audit](#not-a-security-audit) section for more details.

**How do I silence a false positive?**

Use `// preflight-ignore <check-id>` on the affected line or `--ignore <check-id>` when running Preflight. Please also open a GitHub issue labelled or titled "False positive" so the check can be improved.

**Which stacks does it understand?**

Preflight can scan any project's files, but its checks work best with Next.js, Vite, Supabase, Stripe, Express and plain HTML.

**Why is a symlinked file not checked?**

Symbolic links are skipped on purpose, both files and folders. Following them can loop — a folder linked into itself never ends — and can read files outside the project you asked Preflight to scan. A `.env` that is a symlink to a file elsewhere is therefore not reported; copy it in, or point the check at the folder that really holds it. The comment on `walk` in `src/project.js` says the same thing next to the code.

## License

[MIT](LICENSE). Free for any use.

## Contributors

Thanks to everyone who has made Preflight better! 💛

<a href="https://github.com/erdellll/preflight/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=erdellll/preflight" alt="Preflight contributors" />
</a>
