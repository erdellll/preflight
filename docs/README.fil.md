<div align="center">

# ✈️ Preflight

**Handa na bang ilunsad ang iyong vibe-coded app? Malaman mo sa isang command.**

Sinusuri ng Preflight ang iyong proyekto para sa mga leaked key, bukas na database, hindi pa nabe-verify na payment, at mga kulang na pangunahing kailangan sa paglulunsad, at pagkatapos ay bibigyan ka ng report card na may solusyon para sa bawat nakita.

[![License: MIT](https://img.shields.io/badge/license-MIT-34d399.svg)](../LICENSE)
[![Node](https://img.shields.io/badge/node-%E2%89%A520-38bdf8.svg)](../package.json)
[![PRs welcome](https://img.shields.io/badge/PRs-welcome-fbbf24.svg)](../CONTRIBUTING.md)
[![npm version](https://img.shields.io/npm/v/vibe-preflight)](https://www.npmjs.com/package/vibe-preflight)
[![npm downloads](https://img.shields.io/npm/dm/vibe-preflight)](https://www.npmjs.com/package/vibe-preflight)
[![CI](https://github.com/erdellll/preflight/actions/workflows/ci.yml/badge.svg)](https://github.com/erdellll/preflight/actions/workflows/ci.yml)

![Preflight report card](assets/report-card.png)

</div>

```bash
npx vibe-preflight
```

Walang kailangang i-install, walang account, walang network call. Hindi kailanman aalis sa iyong computer ang iyong code.

## Bakit

Madaling gumawa ng app sa isang weekend gamit ang mga AI tool, at ganoon din kadaling mag-ship ng app na may Stripe secret key sa browser bundle o Supabase table na mababasa ng kahit sino. Sinusuri ng Preflight ang mga pagkakamaling pinakamasakit pagkatapos ng launch, bago ka pa mag-launch.

## Subukan mo muna ito sa isang sirang app

```bash
npx vibe-preflight --demo
```

Ini-scan nito ang isang sadyang sirang demo app (peke ang lahat ng secret) para makita mo kung ano ang itsura ng isang bagsak na report.

## Ano ang sinusuri nito

23 checks ngayon, para sa seguridad, reliability, at mga pangunahing kailangan sa paglulunsad. Tingnan ang [lahat ng check](rules.md).

| | |
|---|---|
| 🔑 Live secrets sa client code | 🗄️ Supabase tables na walang row-level security |
| 📄 Mga `.env` file na puwedeng ma-commit | 💳 Stripe webhooks na walang signature check |
| 🌍 CORS na bukas sa lahat ng website | 🚨 Walang error monitoring |
| 🔒 Walang privacy policy | 🔗 Kulang na title, description, o share image |

## Mga opsyon

```bash
npx vibe-preflight [path]          # scan a folder (default: current folder)
npx vibe-preflight --html          # also write a shareable preflight-report.html
npx vibe-preflight --json          # machine-readable output ([JSON format](json.md))
npx vibe-preflight --ignore a,b    # skip checks by id
npx vibe-preflight --fail-on warning   # exit code policy: critical (default) | warning | never
```

Itakda ang NO_COLOR=1 para patayin ang may kulay na output.

Patahimikin ang isang finding na tumuturo sa isang linya gamit ang `// preflight-ignore <check-id>` sa linyang iyon o sa linya sa itaas nito. Ang isang finding tungkol sa buong file (isang na-commit na `.env`, isang hindi pa nabe-verify na webhook) ay gumagamit ng parehong comment sa unang limang linya ng file. Ang anumang gusto mong mawala sa buong proyekto, kasama ang mga finding na walang file, ay gumagamit ng `--ignore <check-id>`.

## Gamitin ito sa CI

```yaml
- run: npx vibe-preflight --fail-on critical
```

Nag-e-exit ang command na may code 1 kapag umabot ang isang finding sa `--fail-on` level, kaya haharangin ng isang leaked key ang merge.
Tingnan ang [docs/ci.md](ci.md) para sa buong workflow.

## Gamitin ito sa loob ng Claude Code

Available ang Preflight bilang isang Claude Code plugin na may `/preflight` command na nagpapatakbo ng scan, nagpapaliwanag ng mga resulta, at nag-aalok na ayusin ang mga kritikal na isyu nang paisa-isa, na nagtatanong bago ang bawat pagbabago.

Sa Claude Code, patakbuhin ang:

```text
/plugin marketplace add erdellll/preflight
/plugin install preflight@preflight
```

Pagkatapos, i-type ang `/preflight` sa anumang proyekto.

## Magdagdag ng check sa loob ng 10 minuto

Ang bawat check ay isang maliit na file lang plus dalawang example folder, isa na dapat nitong i-flag at isa na dapat nitong pabayaan. Walang build step, walang dependencies. Basahin ang [CONTRIBUTING.md](../CONTRIBUTING.md), o pumili ng issue na may label na [`good first issue`](https://github.com/erdellll/preflight/issues?q=is%3Aopen+label%3A%22good+first+issue%22).

## Hindi ito security audit

Nahuhuli ng Preflight ang mga karaniwan at malalaking pagkakamali gamit ang mabilis na pattern checks. Ang malinis na report ay nangangahulugang walang check na nag-trigger, hindi na ligtas ang iyong app. Gamitin ito bilang seatbelt, hindi bilang kapalit ng isang review.

## Mga madalas itanong

**Ipinapadala ba ng Preflight ang aking code sa kung saan?**

Hindi. Buong-buo itong tumatakbo sa iyong local machine, walang network call, at walang kinokolektang telemetry. Hindi kailanman aalis sa iyong computer ang iyong code.

**Ang 100/100 ba na score ay nangangahulugang ligtas ang aking app?**

Hindi. Nangangahulugan lang ito na walang check ng Preflight na nakakita ng isyu. Tingnan ang seksyong [Hindi ito security audit](#hindi-ito-security-audit) para sa higit pang detalye.

**Paano ko papatatahimikin ang isang false positive?**

Gamitin ang `// preflight-ignore <check-id>` sa apektadong linya o `--ignore <check-id>` kapag pinapatakbo ang Preflight. Mangyaring magbukas din ng GitHub issue na may label o pamagat na "False positive" para mapabuti ang check.

**Aling mga stack ang naiintindihan nito?**

Maaaring i-scan ng Preflight ang mga file ng anumang proyekto, ngunit pinakamahusay na gumagana ang mga check nito sa Next.js, Vite, Supabase, Stripe, Express, at simpleng HTML.

**Bakit hindi sinusuri ang isang naka-symlink na file?**

Sadyang nilalaktawan ang mga symbolic link, mga file at folder. Ang pagsunod sa mga ito ay maaaring mag-loop — ang isang folder na naka-link sa sarili nito ay hindi natatapos — at maaaring makabasa ng mga file sa labas ng proyektong hiniling mong i-scan ng Preflight. Kaya hindi nire-report ang isang `.env` na symlink sa isang file sa ibang lugar; kopyahin mo ito papasok, o ituro ang check sa folder na talagang naglalaman nito. Sinasabi rin ito ng comment sa `walk` sa `src/project.js` sa tabi mismo ng code.

## Lisensya

[MIT](../LICENSE). Libre para sa anumang gamit.

## Mga Contributor

Salamat sa lahat ng nagpaganda sa Preflight! 💛

<a href="https://github.com/erdellll/preflight/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=erdellll/preflight" alt="Preflight contributors" />
</a>
